import type { Metadata } from 'next'
import Link from 'next/link'
import { ConsentSettingsButton } from '@/components/consent'
import { LegalPage } from '@/components/legal-page'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Cookies & analytics',
  description: 'What this website stores on your device, which third parties it loads, and how to change your analytics choice.',
  alternates: { canonical: '/cookies' },
}

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookies & analytics"
      intro="This page lists what the website stores on your device and which outside services it uses, so you can decide what to allow."
      draft={false}
    >
      <section>
        <h2>Cookies</h2>
        <p>This website does not set any cookies of its own.</p>
      </section>

      <section>
        <h2>What is stored on your device</h2>
        {siteConfig.analyticsEnabled ? (
          <p>
            One item in your browser&apos;s local storage, named <code>winrose-analytics-consent</code>. It records whether you accepted or declined analytics so we
            do not have to ask on every visit. It is not sent to us or to anyone else, and you can remove it by clearing this site&apos;s data in your browser.
          </p>
        ) : (
          <p>Nothing. The website does not store anything on your device.</p>
        )}
      </section>

      <section>
        <h2>Analytics</h2>
        {siteConfig.analyticsEnabled ? (
          <>
            <p>
              We use Vercel Web Analytics to count visits to pages. <strong>It is switched off until you press &ldquo;Accept analytics&rdquo;</strong> and the site works exactly
              the same if you decline. We do not use advertising or cross-site tracking tools.
            </p>
            <p>
              If you change your mind, use the button below. Withdrawing consent takes full effect the next time a page loads.
            </p>
            <p><ConsentSettingsButton className="rounded-full border border-[#0f6b58] px-5 py-3 text-sm font-bold !text-[#0f6b58] !no-underline" /></p>
          </>
        ) : (
          <p>This website does not currently use analytics or advertising trackers.</p>
        )}
      </section>

      <section>
        <h2>Outside services and links</h2>
        <ul>
          <li>
            <strong>WhatsApp.</strong> The order page and some buttons open WhatsApp. When you follow those links you leave this website, and WhatsApp (Meta) applies its own
            cookie and privacy practices.
          </li>
          <li><strong>Embedded content.</strong> The website does not embed maps, videos, social feeds or other third-party widgets.</li>
          <li><strong>Fonts and images.</strong> They are served from this website, not from outside font or image services.</li>
        </ul>
        <p>For how personal information is handled more broadly, see the <Link href="/privacy">Privacy Policy</Link>.</p>
      </section>
    </LegalPage>
  )
}
