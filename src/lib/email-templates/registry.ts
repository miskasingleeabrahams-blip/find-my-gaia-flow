import type { ComponentType } from 'react'

export interface TemplateEntry {
  component: ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  displayName?: string
  previewData?: Record<string, any>
  /** Fixed recipient — overrides caller-provided recipientEmail when set. */
  to?: string
}

import { template as agentBookingNotification } from './agent-booking-notification'
import { template as customerPaymentLink } from './customer-payment-link'
import { template as customerDeclined } from './customer-declined'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'agent-booking-notification': agentBookingNotification,
  'customer-payment-link': customerPaymentLink,
  'customer-declined': customerDeclined,
}
