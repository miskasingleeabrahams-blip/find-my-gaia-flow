import {
  Body, Button, Container, Head, Heading, Html, Preview, Section, Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

const SITE_NAME = 'GaiaBerry'

interface AgentBookingNotificationProps {
  agentName?: string
  customerName?: string
  customerEmail?: string
  customerPhone?: string
  bookingDate?: string
  bookingTime?: string
  sessionLength?: string
  notes?: string
  approveUrl?: string
  declineUrl?: string
}

const AgentBookingNotification = ({
  agentName = 'there',
  customerName = 'A customer',
  customerEmail = '',
  customerPhone = '',
  bookingDate = '',
  bookingTime = '',
  sessionLength = '',
  notes = '',
  approveUrl = '#',
  declineUrl = '#',
}: AgentBookingNotificationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New booking request from {customerName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New consultation booking</Heading>
        <Text style={text}>Hi {agentName},</Text>
        <Text style={text}>
          You have a new consultation request. Please review and confirm or decline below.
        </Text>

        <Section style={card}>
          <Text style={cardLabel}>Customer</Text>
          <Text style={cardValue}>{customerName}</Text>
          <Text style={cardValue}>{customerEmail}</Text>
          <Text style={cardValue}>{customerPhone}</Text>

          <Text style={cardLabel}>Date & time</Text>
          <Text style={cardValue}>{bookingDate} at {bookingTime}</Text>

          <Text style={cardLabel}>Session length</Text>
          <Text style={cardValue}>{sessionLength}</Text>

          {notes ? (
            <>
              <Text style={cardLabel}>Notes from customer</Text>
              <Text style={cardValue}>{notes}</Text>
            </>
          ) : null}
        </Section>

        <Section style={{ textAlign: 'center', margin: '30px 0' }}>
          <Button href={approveUrl} style={approveBtn}>Approve booking</Button>
        </Section>
        <Section style={{ textAlign: 'center', margin: '10px 0 30px' }}>
          <Button href={declineUrl} style={declineBtn}>Decline booking</Button>
        </Section>

        <Text style={footer}>
          Approving will send the customer a payment link automatically. — {SITE_NAME}
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: AgentBookingNotification,
  subject: (data: Record<string, any>) =>
    `New booking: ${data.customerName ?? 'Customer'} — ${data.bookingDate ?? ''}`,
  displayName: 'Agent — new booking notification',
  previewData: {
    agentName: 'Ronelle',
    customerName: 'Jane Doe',
    customerEmail: 'jane@example.com',
    customerPhone: '+27 82 123 4567',
    bookingDate: 'Mon, 12 May 2025',
    bookingTime: '10:00',
    sessionLength: '30 minutes',
    notes: 'Looking for advice on PCOS support.',
    approveUrl: 'https://example.com/agent/respond?token=abc&action=approve',
    declineUrl: 'https://example.com/agent/respond?token=abc&action=decline',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#2d4a2b', margin: '0 0 16px' }
const text = { fontSize: '14px', color: '#3a3a3a', lineHeight: '1.6', margin: '0 0 12px' }
const card = { backgroundColor: '#f7f5f0', borderRadius: '8px', padding: '20px', margin: '20px 0' }
const cardLabel = { fontSize: '11px', fontWeight: 600, color: '#7a7a7a', textTransform: 'uppercase' as const, letterSpacing: '0.5px', margin: '12px 0 4px' }
const cardValue = { fontSize: '14px', color: '#2d2d2d', margin: '0 0 8px' }
const approveBtn = { backgroundColor: '#2d4a2b', color: '#ffffff', padding: '12px 28px', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }
const declineBtn = { backgroundColor: '#ffffff', color: '#7a3a3a', padding: '11px 27px', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: 600, border: '1px solid #d4c4c4' }
const footer = { fontSize: '12px', color: '#999999', margin: '30px 0 0', textAlign: 'center' as const }
