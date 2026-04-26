import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { format } from 'date-fns'
import { CalendarIcon, Loader2, CheckCircle2 } from 'lucide-react'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import {
  AGENTS,
  SESSION_OPTIONS,
  getAvailableTimes,
  isDateBookable,
  type SessionId,
} from '@/lib/booking-config'

export const Route = createFileRoute('/book')({
  head: () => ({
    meta: [
      { title: 'Book a Consultation — GaiaBerry' },
      {
        name: 'description',
        content: 'Book a 15 or 30 minute follow-up consultation with a GaiaBerry consultant. Mon-Fri 9am-6pm, Sat 9am-1pm.',
      },
    ],
  }),
  component: BookPage,
})

function BookPage() {
  const [agentId, setAgentId] = useState<string>('')
  const [sessionId, setSessionId] = useState<SessionId>('30min')
  const [date, setDate] = useState<Date | undefined>()
  const [time, setTime] = useState<string>('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const slotMinutes = sessionId === '15min' ? 15 : 30
  const availableTimes = useMemo(
    () => (date ? getAvailableTimes(date, slotMinutes) : []),
    [date, slotMinutes]
  )

  const canSubmit =
    agentId && sessionId && date && time && name && email && phone && !submitting

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit || !date) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/public/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: name,
          customer_email: email,
          customer_phone: phone,
          agent_id: agentId,
          session_id: sessionId,
          booking_date: format(date, 'yyyy-MM-dd'),
          booking_time: time,
          notes: notes || null,
        }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || 'Failed to submit')
      }
      setDone(true)
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="mx-auto max-w-2xl px-4 py-16">
          <div className="rounded-2xl border bg-card p-10 text-center shadow-sm">
            <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
            <h1 className="mt-4 text-2xl font-semibold">Booking request sent</h1>
            <p className="mt-3 text-muted-foreground">
              Your consultant has been notified. As soon as they confirm your slot, you'll
              receive an email with a payment link to secure your appointment.
            </p>
            <Button asChild className="mt-6">
              <Link to="/">Back to home</Link>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-3xl font-semibold tracking-tight">Book your consultation</h1>
        <p className="mt-2 text-muted-foreground">
          Mon-Fri 9am-6pm · Sat 9am-1pm · Closed Sundays
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-7">
          <div className="space-y-2">
            <Label>Choose your consultant</Label>
            <RadioGroup value={agentId} onValueChange={setAgentId} className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {AGENTS.map((a) => (
                <label
                  key={a.id}
                  htmlFor={`agent-${a.id}`}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors',
                    agentId === a.id ? 'border-primary bg-primary/5' : 'hover:bg-muted'
                  )}
                >
                  <RadioGroupItem value={a.id} id={`agent-${a.id}`} />
                  <div>
                    <div className="font-medium">{a.name}</div>
                    <div className="text-xs text-muted-foreground">{a.location}</div>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Session length</Label>
            <RadioGroup value={sessionId} onValueChange={(v) => { setSessionId(v as SessionId); setTime('') }} className="grid grid-cols-2 gap-2">
              {SESSION_OPTIONS.map((s) => (
                <label
                  key={s.id}
                  htmlFor={`session-${s.id}`}
                  className={cn(
                    'flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors',
                    sessionId === s.id ? 'border-primary bg-primary/5' : 'hover:bg-muted'
                  )}
                >
                  <span className="flex items-center gap-2">
                    <RadioGroupItem value={s.id} id={`session-${s.id}`} />
                    <span className="font-medium">{s.label}</span>
                  </span>
                  <span className="font-semibold">{s.priceFormatted}</span>
                </label>
              ))}
            </RadioGroup>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => { setDate(d); setTime('') }}
                    disabled={(d) => !isDateBookable(d)}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Time</Label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                disabled={!date}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:opacity-50"
              >
                <option value="">{date ? 'Select a time' : 'Pick a date first'}</option>
                {availableTimes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Your name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Anything we should know? (optional)</Label>
            <Textarea id="notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>

          <Button type="submit" disabled={!canSubmit} size="lg" className="w-full">
            {submitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending request...</>) : 'Request booking'}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Your consultant will confirm before you're asked to pay.
          </p>
        </form>
      </main>
      <SiteFooter />
    </div>
  )
}
