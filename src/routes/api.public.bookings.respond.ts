import { createFileRoute } from '@tanstack/react-router'
import { createClient } from '@supabase/supabase-js'
import { getSession } from '@/lib/booking-config'
import { createConsultationCheckout } from '@/lib/shopify-checkout.server'

async function enqueueEmail(params: {
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
    console.error('Failed to enqueue email', { template: params.templateName, status: res.status })
  }
}

function getAppOrigin(request: Request): string {
  const forwardedHost = request.headers.get('x-forwarded-host')
  const forwardedProto = request.headers.get('x-forwarded-proto') ?? 'https'
  if (forwardedHost) return `${forwardedProto}://${forwardedHost}`
  return new URL(request.url).origin
}

export const Route = createFileRoute('/api/public/bookings/respond')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        if (!supabaseUrl || !serviceKey) {
          return Response.json({ error: 'Server misconfigured' }, { status: 500 })
        }

        const body = await request.json().catch(() => ({}))
        const token: string | undefined = body?.token
        const action: string | undefined = body?.action
        if (!token || (action !== 'approve' && action !== 'decline')) {
          return Response.json({ error: 'Invalid request' }, { status: 400 })
        }

        const supabase = createClient(supabaseUrl, serviceKey)
        const { data: booking, error } = await (supabase
          .from('consultation_bookings') as any)
          .select('*')
          .eq('approval_token', token)
          .maybeSingle()

        if (error || !booking) {
          return Response.json({ error: 'Invalid or expired link' }, { status: 404 })
        }

        const b = booking as any
        if (b.status === 'confirmed' || b.status === 'declined') {
          return Response.json({ alreadyHandled: true, status: b.status })
        }

        const origin = getAppOrigin(request)
        const priceFormatted = b.price_cents ? `R${(b.price_cents / 100).toFixed(0)}` : ''

        if (action === 'approve') {
          // Build a real Shopify checkout URL for the matching consultation
          // product variant. Payflex (and other Shopify-enabled payment
          // methods) appear automatically on Shopify's hosted checkout.
          const session = getSession(b.session_length)
          let paymentUrl = `${origin}/pay/${b.id}` // safe fallback

          if (session?.shopifyVariantId) {
            const checkout = await createConsultationCheckout({
              variantId: session.shopifyVariantId,
              quantity: 1,
              buyerEmail: b.customer_email,
              bookingId: b.id,
            })
            if (checkout?.checkoutUrl) {
              paymentUrl = checkout.checkoutUrl
            } else {
              console.error('Falling back to placeholder pay link for booking', b.id)
            }
          }

          const { error: upErr } = await (supabase
            .from('consultation_bookings') as any)
            .update({
              status: 'confirmed',
              confirmed_at: new Date().toISOString(),
              payment_link: paymentUrl,
            })
            .eq('id', b.id)

          if (upErr) {
            return Response.json({ error: 'Failed to update booking' }, { status: 500 })
          }

          await enqueueEmail({
            origin,
            serviceKey,
            templateName: 'customer-payment-link',
            recipientEmail: b.customer_email,
            idempotencyKey: `customer-pay-${b.id}`,
            templateData: {
              customerName: b.customer_name,
              agentName: b.preferred_consultant,
              bookingDate: b.booking_date,
              bookingTime: b.booking_time,
              sessionLength: b.session_length,
              priceFormatted,
              paymentUrl,
            },
          })

          return Response.json({ success: true, status: 'confirmed' })
        }

        // Decline
        const { error: upErr } = await (supabase
          .from('consultation_bookings') as any)
          .update({
            status: 'declined',
            declined_at: new Date().toISOString(),
          })
          .eq('id', b.id)

        if (upErr) {
          return Response.json({ error: 'Failed to update booking' }, { status: 500 })
        }

        await enqueueEmail({
          origin,
          serviceKey,
          templateName: 'customer-declined',
          recipientEmail: b.customer_email,
          idempotencyKey: `customer-decline-${b.id}`,
          templateData: {
            customerName: b.customer_name,
            bookingDate: b.booking_date,
            bookingTime: b.booking_time,
          },
        })

        return Response.json({ success: true, status: 'declined' })
      },

      GET: async ({ request }) => {
        // Read booking summary by token (for the agent confirmation page)
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        if (!supabaseUrl || !serviceKey) {
          return Response.json({ error: 'Server misconfigured' }, { status: 500 })
        }
        const url = new URL(request.url)
        const token = url.searchParams.get('token')
        if (!token) return Response.json({ error: 'Token required' }, { status: 400 })

        const supabase = createClient(supabaseUrl, serviceKey)
        const { data: booking } = await (supabase
          .from('consultation_bookings') as any)
          .select('id, customer_name, customer_email, customer_phone, booking_date, booking_time, session_length, preferred_consultant, notes, status, price_cents')
          .eq('approval_token', token)
          .maybeSingle()

        if (!booking) return Response.json({ error: 'Not found' }, { status: 404 })
        return Response.json({ booking })
      },
    },
  },
})
