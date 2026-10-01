/**
 * Single source of truth for business details.
 *
 * Nothing in here is invented. Anything the pharmacy has not supplied is `null`
 * and is either hidden from the page or rendered as a clearly highlighted
 * "[…]" field on the legal pages (see <Fill /> in components/legal-page.tsx).
 *
 * Set these as environment variables (see .env.example) — NEXT_PUBLIC_* values
 * are inlined at build time, so redeploy after changing them.
 */

function clean(value: string | undefined) {
  const trimmed = value?.trim()
  return trimmed ? trimmed : null
}

/** Kenyan numbers entered as 07…/01… are converted to international format. Returns digits only. */
function toInternationalDigits(raw: string | undefined) {
  if (!raw) return null
  let digits = raw.replace(/\D/g, '')
  if (digits.startsWith('0')) digits = `254${digits.slice(1)}`
  if (!/^\d{11,15}$/.test(digits)) return null
  // 254700000000 was the placeholder shipped in the original build. It is not a real pharmacy number.
  if (digits === '254700000000') return null
  return digits
}

const whatsappDigits = toInternationalDigits(process.env.NEXT_PUBLIC_PHARMACY_WHATSAPP)
const phoneDigits = toInternationalDigits(process.env.NEXT_PUBLIC_PHARMACY_PHONE)

const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
const explicitUrl = clean(process.env.NEXT_PUBLIC_SITE_URL)

export const siteConfig = {
  name: 'Winrose Pharmaceuticals',
  /** Registered business name, if different from the trading name above. */
  legalName: clean(process.env.NEXT_PUBLIC_PHARMACY_LEGAL_NAME),
  tagline: 'Community pharmacy in Utawala, Nairobi',
  description:
    'Winrose Pharmaceuticals is a community pharmacy at Shooters Stage, Utawala. Send prescription and over-the-counter medicine requests on WhatsApp, and ask about in-store health checks and delivery.',
  /** Absolute site URL, used for canonical links, sitemap and social previews. */
  url: explicitUrl ?? (vercelUrl ? `https://${vercelUrl}` : null),
  whatsappDigits,
  phone: clean(process.env.NEXT_PUBLIC_PHARMACY_PHONE),
  phoneDigits,
  email: clean(process.env.NEXT_PUBLIC_PHARMACY_EMAIL),
  address: clean(process.env.NEXT_PUBLIC_PHARMACY_ADDRESS),
  /** Pharmacy and Poisons Board premises licence number. */
  ppbLicence: clean(process.env.NEXT_PUBLIC_PHARMACY_PPB_LICENCE),
  /** Name and PPB registration number of the superintendent pharmacist. */
  pharmacist: clean(process.env.NEXT_PUBLIC_PHARMACY_PHARMACIST),
  /** Office of the Data Protection Commissioner registration number, if registered. */
  odpcRegistration: clean(process.env.NEXT_PUBLIC_PHARMACY_ODPC_REGISTRATION),
  /** Vercel Web Analytics is only loaded after the visitor accepts. Set to "false" to remove it and the consent banner. */
  analyticsEnabled:
    process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== 'false',
} as const

export const legalLastUpdated = '1 October 2026'

/** Builds a wa.me link, or `null` when no real WhatsApp number has been configured. */
export function whatsappLink(message?: string) {
  if (!siteConfig.whatsappDigits) return null
  const base = `https://wa.me/${siteConfig.whatsappDigits}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Medicines', href: '/order' },
  { label: 'Contact', href: '/#location' },
] as const
