// Agents available for booking. Jeorgia is intentionally excluded from notifications.
export interface Agent {
  id: string
  name: string
  email: string
  location: string
}

export const AGENTS: Agent[] = [
  { id: 'ronelle', name: 'Ronelle', email: 'rponnadu13@gmail.com', location: 'KZN' },
  { id: 'rhodanthe', name: 'Rhodanthe', email: 'Rhodanthe.Heyns@icloud.com', location: 'CPT' },
  { id: 'samiya', name: 'Samiya', email: 'sayedsamiya786@gmail.com', location: 'CPT' },
  { id: 'nafeesah', name: 'Nafeesah', email: 'glowwithnafeesahmo@gmail.com', location: 'CPT' },
]

// Shopify ProductVariant GIDs — used to build a real Shopify cart checkout
// so Payflex (and other Shopify-enabled payment methods) work automatically.
export const SESSION_OPTIONS = [
  {
    id: '15min',
    label: '15 minutes',
    priceCents: 10000,
    priceFormatted: 'R100',
    shopifyVariantId: 'gid://shopify/ProductVariant/45645917290550',
    shopifyVariantNumericId: '45645917290550',
  },
  {
    id: '30min',
    label: '30 minutes',
    priceCents: 20000,
    priceFormatted: 'R200',
    shopifyVariantId: 'gid://shopify/ProductVariant/45645918011446',
    shopifyVariantNumericId: '45645918011446',
  },
] as const

// Map session label (as stored in DB) back to a session option
export function getSessionByLabel(label: string) {
  return SESSION_OPTIONS.find((s) => s.label === label)
}

export type SessionId = typeof SESSION_OPTIONS[number]['id']

export function getAgentByEmail(email: string): Agent | undefined {
  return AGENTS.find((a) => a.email.toLowerCase() === email.toLowerCase())
}

export function getAgentById(id: string): Agent | undefined {
  return AGENTS.find((a) => a.id === id)
}

export function getSession(id: string) {
  return SESSION_OPTIONS.find((s) => s.id === id)
}

// Mon=1..Sat=6 are open; Sun=0 closed.
// Mon-Fri: 9am-6pm. Sat: 9am-1pm.
export function getAvailableTimes(date: Date, slotMinutes: 15 | 30): string[] {
  const day = date.getDay()
  if (day === 0) return []
  const startHour = 9
  const endHour = day === 6 ? 13 : 18
  const slots: string[] = []
  for (let h = startHour; h < endHour; h++) {
    for (let m = 0; m < 60; m += slotMinutes) {
      slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
    }
  }
  return slots
}

export function isDateBookable(date: Date): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  if (date < today) return false
  return date.getDay() !== 0 // not Sunday
}
