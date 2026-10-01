import type { Metadata } from 'next'
import Link from 'next/link'
import { Fill, LegalPage } from '@/components/legal-page'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Winrose Pharmaceuticals handles the personal information you share when you use this website or send an order request.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This policy explains what personal information this website handles, why, who else receives it, and the choices you have. It is written around how the website actually works today."
    >
      <section>
        <h2>Who we are</h2>
        <p>
          This website is operated by <Fill value={siteConfig.legalName} label="Registered business name" /> (trading as {siteConfig.name}), a pharmacy
          at Shooters Stage, Utawala, Nairobi. We decide why and how your personal information is used, which makes us the &ldquo;data controller&rdquo; under
          Kenya&apos;s Data Protection Act, 2019.
        </p>
        <p>
          Contact for privacy questions and requests:{' '}
          {siteConfig.email ? <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> : <Fill label="Contact email for privacy requests" />}. Address:{' '}
          <Fill value={siteConfig.address} label="Physical address" />.
        </p>
        <p>Office of the Data Protection Commissioner (ODPC) registration: <Fill value={siteConfig.odpcRegistration} label="ODPC registration number, or remove this line if not applicable" />.</p>
      </section>

      <section>
        <h2>What information we handle, and why</h2>
        <p><strong>Order request form.</strong> If you use the order page, you may enter:</p>
        <ul>
          <li>your full name (required, so the pharmacist knows who they are replying to);</li>
          <li>a phone number, delivery area and notes (all optional);</li>
          <li>the products and any service you select.</li>
        </ul>
        <p>
          We use this only to respond to your request: to confirm availability and price, check prescription requirements, and arrange pickup or delivery.
          Information about your medicines or health that you type into the notes, or send in the WhatsApp chat (for example a prescription photo), is health
          information, which the Data Protection Act treats as sensitive personal data. Please share only what the pharmacist needs.
        </p>
        <p>
          <strong>How your request reaches us.</strong> The website does not send your request to our servers and does not store it. When you press the send
          button, your browser builds a WhatsApp message from what you entered and opens WhatsApp. Nothing reaches the pharmacy until you press Send in WhatsApp.
          Once you do, the message is handled by WhatsApp (see &ldquo;Who else receives your information&rdquo; below) and by the pharmacy on its WhatsApp account.
        </p>
        <p>
          <strong>Website usage statistics (only if you accept).</strong> If you accept analytics in the banner, we use Vercel Web Analytics to count page visits
          and see which pages are used. If you decline, or do not answer, it is not loaded. See the <Link href="/cookies">Cookies &amp; analytics policy</Link>.
        </p>
        <p>
          <strong>Hosting records.</strong> Like most websites, the company that hosts this site receives standard technical information when a page is requested,
          such as IP address, browser type and the page requested. This is used to deliver the site and keep it secure.
        </p>
        <p>We do not use the order form for marketing, and the website has no account sign-up, payment form or contact form beyond the order request.</p>
      </section>

      <section>
        <h2>Our basis for using your information</h2>
        <p>
          We use your order-request details because you ask us to, and we rely on your consent for the sensitive information you choose to share, which is why the
          order form asks you to confirm before sending. We rely on your consent for analytics. <Fill label="Confirm lawful bases with your adviser" />
        </p>
      </section>

      <section>
        <h2>Who else receives your information</h2>
        <ul>
          <li><strong>WhatsApp (Meta).</strong> Messages sent through WhatsApp are processed by WhatsApp under its own terms and privacy policy.</li>
          <li><strong>Delivery riders.</strong> To deliver an order, your name, phone number and delivery location may be shared with the person delivering it. <Fill label="Confirm whether riders are employees or a third party" /></li>
          <li><strong>Our hosting and analytics providers.</strong> As described above. Vercel provides analytics if you accept it.</li>
          <li><strong>Authorities</strong>, where we are legally required to disclose information.</li>
        </ul>
        <p>These providers may process information outside Kenya. We do not sell your personal information.</p>
      </section>

      <section>
        <h2>How long we keep it</h2>
        <p>
          The website itself keeps none of your order details. WhatsApp conversations and any dispensing or order records held by the pharmacy are kept for:{' '}
          <Fill label="Retention period, e.g. as required by pharmacy and tax rules. Winrose Pharmaceuticals to confirm" />. Your analytics choice is stored in your browser until you clear it.
        </p>
      </section>

      <section>
        <h2>Your rights</h2>
        <p>Under the Data Protection Act, 2019 you have the right to:</p>
        <ul>
          <li>be told how your personal data is used;</li>
          <li>access the personal data we hold about you;</li>
          <li>object to its processing;</li>
          <li>ask us to correct inaccurate data or delete data we no longer need;</li>
          <li>receive your data in a portable format, where applicable.</li>
        </ul>
        <p>
          To use these rights, contact us using the details above. You can also complain to the Office of the Data Protection Commissioner at{' '}
          <a href="https://www.odpc.go.ke" target="_blank" rel="noopener noreferrer">www.odpc.go.ke<span className="sr-only"> (opens in a new tab)</span></a>.
        </p>
      </section>

      <section>
        <h2>Children</h2>
        <p>This website is intended for adults. If you are ordering for a child, please do so as a parent or guardian.</p>
      </section>

      <section>
        <h2>Changes to this policy</h2>
        <p>If we change how the website handles personal information, we will update this page and the date at the top.</p>
      </section>
    </LegalPage>
  )
}
