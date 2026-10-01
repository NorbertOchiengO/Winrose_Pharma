import type { Metadata } from 'next'
import { Fill, LegalPage } from '@/components/legal-page'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Returns & refunds',
  description: 'How to raise a problem with an order from Winrose Pharmaceuticals, and the pharmacy\'s returns and refunds position.',
  alternates: { canonical: '/returns' },
}

export default function ReturnsPage() {
  return (
    <LegalPage
      title="Returns & refunds"
      intro="This website only lets you send an order request. Payment and handover happen with the pharmacy, so any return or refund is handled by the pharmacy directly."
    >
      <section>
        <h2>If something is wrong with your order</h2>
        <p>
          If an item is missing, damaged, incorrect or expired, contact the pharmacy as soon as possible
          {siteConfig.phone || siteConfig.email ? ' on ' : ''}
          {siteConfig.phone}
          {siteConfig.phone && siteConfig.email ? ' or ' : ''}
          {siteConfig.email && <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>}
          {!siteConfig.phone && !siteConfig.email && <> using the WhatsApp chat your order was arranged in, or at the shop</>}. Please have your order details ready.
        </p>
      </section>

      <section>
        <h2>Returns and refund conditions</h2>
        <p>
          Time limit for reporting a problem: <Fill label="e.g. number of days. Winrose Pharmaceuticals to confirm" />.
        </p>
        <p>
          Whether dispensed or opened medicines and temperature-sensitive products can be returned: <Fill label="Pharmacy policy to confirm. Medicines may have safety restrictions" />.
        </p>
        <p>
          How refunds or replacements are given (for example M-Pesa, cash or replacement item): <Fill label="Winrose Pharmaceuticals to confirm" />.
        </p>
      </section>

      <section>
        <h2>Your legal rights</h2>
        <p>Nothing on this page limits your rights under Kenyan consumer protection law.</p>
      </section>
    </LegalPage>
  )
}
