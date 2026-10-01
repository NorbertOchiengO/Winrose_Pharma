import type { Metadata } from 'next'
import Link from 'next/link'
import { Fill, LegalPage } from '@/components/legal-page'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'The terms for using the Winrose Pharmaceuticals website and sending an order request through WhatsApp.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      intro="These terms apply when you use this website and when you send an order request to Winrose Pharmaceuticals through it."
    >
      <section>
        <h2>About us</h2>
        <p>
          This website is operated by <Fill value={siteConfig.legalName} label="Registered business name" /> (trading as {siteConfig.name}), at Shooters Stage, Utawala,
          Nairobi. Premises licence (Pharmacy and Poisons Board): <Fill value={siteConfig.ppbLicence} label="PPB premises licence number" />. Superintendent pharmacist:{' '}
          <Fill value={siteConfig.pharmacist} label="Pharmacist name and PPB registration number" />.
        </p>
      </section>

      <section>
        <h2>How ordering works</h2>
        <ul>
          <li>The order page lets you build a request and send it to the pharmacy as a WhatsApp message. The website does not take payment.</li>
          <li>A request is not an accepted order. The pharmacy confirms availability, price, delivery or pickup, and any prescription requirement with you on WhatsApp.</li>
          <li>Prescription-only medicines are supplied only against a valid prescription and after pharmacist verification.</li>
          <li>The pharmacy may decline or amend a request, for example if an item is unavailable or a prescription is missing or unclear.</li>
          <li>Payment arrangements, such as M-Pesa Till, are agreed with the pharmacy when your order is confirmed.</li>
        </ul>
      </section>

      <section>
        <h2>Health information</h2>
        <p>
          Content on this website is general information. It is not medical advice and does not replace advice from a pharmacist or doctor. Do not delay or ignore
          professional advice because of something you read here. In an emergency, go to the nearest hospital or contact emergency services.
        </p>
      </section>

      <section>
        <h2>Using the website</h2>
        <ul>
          <li>Give accurate information in your request, and only submit information about another person if you are entitled to.</li>
          <li>Do not misuse the website, attempt to disrupt it, or use it to send unlawful, abusive or misleading content.</li>
          <li>The website&apos;s content, name and logo belong to Winrose Pharmaceuticals or are used with permission. Please do not copy them without permission.</li>
        </ul>
      </section>

      <section>
        <h2>Accuracy and availability</h2>
        <p>
          We try to keep the website accurate and available, but product lists, opening hours and services can change, and the website may occasionally be unavailable. Details
          are confirmed by the pharmacy when you contact us. Nothing in these terms limits any right you have under Kenyan consumer protection law.
        </p>
      </section>

      <section>
        <h2>Privacy, returns and changes</h2>
        <p>
          How we handle personal information is explained in the <Link href="/privacy">Privacy Policy</Link> and <Link href="/cookies">Cookies &amp; analytics policy</Link>. Returns and refunds are covered in{' '}
          <Link href="/returns">Returns &amp; refunds</Link>. We may update these terms; the date at the top shows when they last changed.
        </p>
      </section>

      <section>
        <h2>Governing law</h2>
        <p>These terms are governed by the laws of Kenya. <Fill label="Confirm governing law and dispute process with your adviser" /></p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          {siteConfig.email ? <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> : <Fill label="Contact email" />}
          {' · '}
          <Fill value={siteConfig.phone} label="Contact phone number" />
        </p>
      </section>
    </LegalPage>
  )
}
