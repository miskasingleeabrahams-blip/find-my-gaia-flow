import { createFileRoute, useSearch } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { z } from 'zod'

export const Route = createFileRoute('/unsubscribe')({
  validateSearch: (s) => z.object({ token: z.string().optional() }).parse(s),
  component: UnsubscribePage,
})

function UnsubscribePage() {
  const { token } = useSearch({ from: '/unsubscribe' })
  const [state, setState] = useState<'loading' | 'valid' | 'already' | 'invalid' | 'done'>('loading')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!token) { setState('invalid'); return }
    fetch(`/email/unsubscribe?token=${encodeURIComponent(token)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.valid) setState('valid')
        else if (d.reason === 'already_unsubscribed') setState('already')
        else setState('invalid')
      })
      .catch(() => setState('invalid'))
  }, [token])

  const confirm = async () => {
    if (!token) return
    setSubmitting(true)
    try {
      const r = await fetch('/email/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      const d = await r.json()
      setState(d.success ? 'done' : 'already')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-sm">
        {state === 'loading' && <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />}
        {state === 'invalid' && <p className="text-destructive">This unsubscribe link is invalid or expired.</p>}
        {state === 'already' && <p>You've already unsubscribed. No further emails will be sent.</p>}
        {state === 'done' && <p>You've been unsubscribed successfully.</p>}
        {state === 'valid' && (
          <>
            <h1 className="text-xl font-semibold">Unsubscribe from emails</h1>
            <p className="mt-3 text-muted-foreground">
              Are you sure you want to stop receiving emails from us?
            </p>
            <Button onClick={confirm} disabled={submitting} className="mt-6">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Confirm unsubscribe'}
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
