import {
  Body, Container, Head, Heading, Html, Preview, Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

const SITE_NAME = 'GaiaBerry'

interface CustomerDeclinedProps {
  customerName?: string
  bookingDate?: string
  bookingTime?: string
}

const CustomerDeclined = ({
  customerName = 'there',
  bookingDate = '',
  bookingTime = '',
}: CustomerDeclinedProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your consultation slot is unavailable — please rebook</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>About your consultation request</Heading>
        <Text style={text}>Hi {customerName},</Text>
        <Text style={text}>
          Unfortunately your requested slot on <strong>{bookingDate} at {bookingTime}</strong> is
          no longer available. We'd love to still see you — please head back to our site
          to choose another time that works for you.
        </Text>
        <Text style={text}>
          Thank you for your patience and understanding.
        </Text>
        <Text style={footer}>— The {SITE_NAME} team</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: CustomerDeclined,
  subject: 'Your consultation slot is unavailable — please rebook',
  displayName: 'Customer — booking declined',
  previewData: {
    customerName: 'Jane',
    bookingDate: 'Mon, 12 May 2025',
    bookingTime: '10:00',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#2d4a2b', margin: '0 0 16px' }
const text = { fontSize: '14px', color: '#3a3a3a', lineHeight: '1.6', margin: '0 0 12px' }
const footer = { fontSize: '12px', color: '#999999', margin: '30px 0 0' }
