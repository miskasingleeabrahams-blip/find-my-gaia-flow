import {
  Body, Button, Container, Head, Heading, Html, Preview, Section, Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

const SITE_NAME = 'GaiaBerry'

interface CustomerPaymentLinkProps {
  customerName?: string
  agentName?: string
  bookingDate?: string
  bookingTime?: string
  sessionLength?: string
  priceFormatted?: string
  paymentUrl?: string
}

const CustomerPaymentLink = ({
  customerName = 'there',
  agentName = 'your consultant',
  bookingDate = '',
  bookingTime = '',
  sessionLength = '',
  priceFormatted = '',
  paymentUrl = '#',
}: CustomerPaymentLinkProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your consultation is confirmed — please complete payment</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Your booking is confirmed 🌿</Heading>
        <Text style={text}>Hi {customerName},</Text>
        <Text style={text}>
          Wonderful news — <strong>{agentName}</strong> has confirmed your consultation.
          To secure your slot, please complete payment below.
        </Text>

        <Section style={card}>
          <Text style={cardLabel}>Date & time</Text>
          <Text style={cardValue}>{bookingDate} at {bookingTime}</Text>

          <Text style={cardLabel}>Session length</Text>
          <Text style={cardValue}>{sessionLength}</Text>

          <Text style={cardLabel}>Amount</Text>
          <Text style={priceStyle}>{priceFormatted}</Text>
        </Section>

        <Section style={{ textAlign: 'center', margin: '30px 0' }}>
          <Button href={paymentUrl} style={payBtn}>Pay & confirm slot</Button>
        </Section>

        <Text style={footer}>
          Your appointment is held for 24 hours. — {SITE_NAME}
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: CustomerPaymentLink,
  subject: 'Your consultation is confirmed — complete payment',
  displayName: 'Customer — payment link after confirmation',
  previewData: {
    customerName: 'Jane',
    agentName: 'Ronelle',
    bookingDate: 'Mon, 12 May 2025',
    bookingTime: '10:00',
    sessionLength: '30 minutes',
    priceFormatted: 'R200',
    paymentUrl: 'https://example.com/pay/abc',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '560px' }
const h1 = { fontSize: '24px', fontWeight: 'bold', color: '#2d4a2b', margin: '0 0 16px' }
const text = { fontSize: '14px', color: '#3a3a3a', lineHeight: '1.6', margin: '0 0 12px' }
const card = { backgroundColor: '#f7f5f0', borderRadius: '8px', padding: '20px', margin: '20px 0' }
const cardLabel = { fontSize: '11px', fontWeight: 600, color: '#7a7a7a', textTransform: 'uppercase' as const, letterSpacing: '0.5px', margin: '12px 0 4px' }
const cardValue = { fontSize: '14px', color: '#2d2d2d', margin: '0 0 8px' }
const priceStyle = { fontSize: '20px', color: '#2d4a2b', fontWeight: 700, margin: '0 0 8px' }
const payBtn = { backgroundColor: '#2d4a2b', color: '#ffffff', padding: '14px 32px', borderRadius: '6px', textDecoration: 'none', fontSize: '15px', fontWeight: 600 }
const footer = { fontSize: '12px', color: '#999999', margin: '30px 0 0', textAlign: 'center' as const }
