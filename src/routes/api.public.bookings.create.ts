import { createFileRoute } from '@tanstack/react-router'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'
import { AGENTS, SESSION_OPTIONS } from '@/lib/booking-config'

const BookingSchema = z.object({
  customer_name: z.string().min(1).max(120),
  customer_email: z.string().email().max(200),
  customer_phone: z.string().min(5).max(40),
  agent_id: z.enum(['ronelle', 'rhodanthe', 'samiya', 'nafeesah']),
  session_id: z.enum(['15min', '30min']),
  booking_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  booking_time: z.string().regex(/^\d{2}:\d{2}$/),
  notes: z.string().max(2000).optional().nullable(),
})

function getAppOrigin(request: Request): string {
  const forwardedHost = request.headers.get('x-forwarded-host')
  const forwardedProto = request.headers.get('x-forwarded-proto') ?? 'https'
  if (forwardedHost) return `${forwardedProto}://${forwardedHost}`
  return new URL(request.url).origin
}

async function enqueueEmailViaSendRoute(params: {
  origin: string
  serviceKey: string
  templateName: string
  recipientEmail: string
  idempotencyKey: string
  templateData: Record<string, any>
}) {
  const res = await fetch(`${params.origin}/lovable/email/transactional/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${params.serviceKey}`,
    },
    body: JSON.stringify({
      templateName: params.templateName,
      recipientEmail: params.recipientEmail,
      idempotencyKey: params.idempotencyKey,
      templateData: params.templateData,
    }),
  })
  if (!res.ok) {
    const txt = await res.text()
    console.error('Failed to enqueue email', { template: params.templateName, status: res.status, body: txt })
  }
}

export const Route = createFileRoute('/api/public/bookings/create')({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }),
      POST: async ({ request }) => {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        if (!supabaseUrl || !serviceKey) {
          return Response.json({ error: 'Server misconfigured' }, { status: 500 })
        }

        let parsed
        try {
          const body = await request.json()
          parsed = BookingSchema.parse(body)
        } catch (err) {
          return Response.json({ error: 'Invalid input', details: String(err) }, { status: 400 })
        }

        const agent = AGENTS.find((a) => a.id === parsed.agent_id)
        const session = SESSION_OPTIONS.find((s) => s.id === parsed.session_id)
        if (!agent || !session) {
          return Response.json({ error: 'Invalid agent or session' }, { status: 400 })
        }

        const supabase = createClient(supabaseUrl, serviceKey)

        const { data: booking, error } = await supabase
          .from('consultation_bookings')
          .insert({
            customer_name: parsed.customer_name,
            customer_email: parsed.customer_email,
            customer_phone: parsed.customer_phone,
            session_length: session.label,
            preferred_consultant: agent.name,
            agent_email: agent.email,
            booking_date: parsed.booking_date,
            booking_time: parsed.booking_time,
            price_cents: session.priceCents,
            notes: parsed.notes ?? null,
            status: 'pending_agent_approval',
          } as any)
          .select('*')
          .single()

        if (error || !booking) {
          console.error('Failed to insert booking', error)
          return Response.json({ error: 'Failed to create booking' }, { status: 500 })
        }

        const origin = getAppOrigin(request)
        const approveUrl = `${origin}/agent/respond?token=${(booking as any).approval_token}&action=approve`
        const declineUrl = `${origin}/agent/respond?token=${(booking as any).approval_token}&action=decline`

        // Notify the agent
        await enqueueEmailViaSendRoute({
          origin,
          serviceKey,
          templateName: 'agent-booking-notification',
          recipientEmail: agent.email,
          idempotencyKey: `agent-notify-${(booking as any).id}`,
          templateData: {
            agentName: agent.name,
            customerName: parsed.customer_name,
            customerEmail: parsed.customer_email,
            customerPhone: parsed.customer_phone,
            bookingDate: parsed.booking_date,
            bookingTime: parsed.booking_time,
            sessionLength: session.label,
            notes: parsed.notes ?? '',
            approveUrl,
            declineUrl,
          },
        })

        return Response.json({ success: true, bookingId: (booking as any).id }, {
          headers: { 'Access-Control-Allow-Origin': '*' },
        })
      },
    },
  },
})
