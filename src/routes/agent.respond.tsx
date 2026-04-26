import { createFileRoute, useSearch } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { z } from 'zod'

const searchSchema = z.object({
  token: z.string().optional(),
  action: z.enum(['approve', 'decline']).optional(),
})

export const Route = createFileRoute('/agent/respond')({
  validateSearch: (s) => searchSchema.parse(s),
  component: AgentRespondPage,
})

function AgentRespondPage() {
  const { token, action } = useSearch({ from: '/agent/respond' })
  const [booking, setBooking] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<'confirmed' | 'declined' | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!token) { setError('Missing token'); setLoading(false); return }
    fetch(`/api/public/bookings/respond?token=${encodeURIComponent(token)}`)
      .then(async (r) => {
        if (!r.ok) throw new Error('Booking not found')
        return r.json()
      })
      .then((d) => {
        setBooking(d.booking)
        if (d.booking?.status === 'confirmed' || d.booking?.status === 'declined') {
          setResult(d.booking.status)
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [token])

  const respond = async (chosen: 'approve' | 'decline') => {
    if (!token) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/public/bookings/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, action: chosen }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      setResult(chosen === 'approve' ? 'confirmed' : 'declined')
    } catch (e: any) {
      setError(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <CenterCard><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></CenterCard>
  }
  if (error) {
    return <CenterCard><p className="text-destructive">{error}</p></CenterCard>
  }
  if (result === 'confirmed') {
    return <CenterCard>
      <CheckCircle2 className="h-14 w-14 text-primary" />
      <h1 className="mt-4 text-2xl font-semibold">Booking confirmed</h1>
      <p className="mt-2 text-muted-foreground">The customer has been emailed a payment link.</p>
    </CenterCard>
  }
  if (result === 'declined') {
    return <CenterCard>
      <XCircle className="h-14 w-14 text-muted-foreground" />
      <h1 className="mt-4 text-2xl font-semibold">Booking declined</h1>
      <p className="mt-2 text-muted-foreground">The customer has been notified to rebook.</p>
    </CenterCard>
  }

  return (
    <CenterCard>
      <h1 className="text-2xl font-semibold">Booking request</h1>
      <div className="mt-6 w-full space-y-3 rounded-lg bg-muted p-5 text-left text-sm">
        <Row label="Customer" value={booking?.customer_name} />
        <Row label="Email" value={booking?.customer_email} />
        <Row label="Phone" value={booking?.customer_phone} />
        <Row label="Date & time" value={`${booking?.booking_date} at ${booking?.booking_time}`} />
        <Row label="Session" value={booking?.session_length} />
        {booking?.notes && <Row label="Notes" value={booking.notes} />}
      </div>
      <div className="mt-6 flex w-full flex-col gap-2 sm:flex-row">
        <Button
          onClick={() => respond('approve')}
          disabled={submitting}
          className="flex-1"
          size="lg"
        >
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Approve booking'}
        </Button>
        <Button
          onClick={() => respond('decline')}
          disabled={submitting}
          variant="outline"
          className="flex-1"
          size="lg"
        >
          Decline
        </Button>
      </div>
      {action && (
        <p className="mt-3 text-xs text-muted-foreground">
          You clicked "{action}" — please confirm above.
        </p>
      )}
    </CenterCard>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-0.5 font-medium">{value}</div>
    </div>
  )
}

function CenterCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="flex w-full max-w-md flex-col items-center rounded-2xl border bg-card p-8 text-center shadow-sm">
        {children}
      </div>
    </div>
  )
}
