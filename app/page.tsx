'use client'

import { useId, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronDown, MessageCircle, ShieldCheck, Stethoscope } from 'lucide-react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { siteConfig, whatsappLink } from '@/lib/site'

const services = [
  { title: 'Prescription & OTC Medication', description: 'Quick, reliable filling of official prescriptions and over-the-counter health remedies.', details: 'Prescription verification, chronic-care medicines, and guidance on correct dosage and usage.' },
  { title: 'Rapid Health Screenings', description: 'In-store health monitoring and fast-result checks without long hospital queues.', details: 'Rapid malaria tests, blood pressure, random blood sugar, BMI, and weight checks.' },
  { title: 'Minor Wound Care & First Aid', description: 'Immediate assistance for minor household and workplace injuries.', details: 'Sterile dressing, antiseptic cleaning, bandaging, and first-aid kit refill guidance.' },
  { title: 'Reproductive & Family Health', description: 'Discrete, supportive access to reproductive wellness products and guidance.', details: 'Pregnancy tests, family planning supplies, intimate care, and deworming support.' },
  { title: 'Chronic Medication Support', description: 'Practical monthly supply support for long-term health conditions.', details: 'Refill reminders, medication reviews, and guidance for temperature-sensitive medicines.' },
]

const faqs = [
  ['Do I need a doctor\'s prescription to order antibiotics?', 'Yes. Prescription-only medicines such as antibiotics require a valid doctor\'s prescription and pharmacist verification.'],
  ['How does doorstep delivery in Utawala work?', 'Delivery is arranged by the pharmacy once your order request is confirmed. Availability and timing are confirmed with you on WhatsApp before anything is sent out.'],
  ['Can I pay using M-Pesa?', 'Yes. M-Pesa Till payments can be arranged for confirmed walk-in pickup and delivery orders.'],
  ['Do I pay online?', 'No. The website does not process online payments. Your request is confirmed by the pharmacy through WhatsApp.'],
]

const steps = ['Choose products or snap your prescription', 'Connect with our pharmacist on WhatsApp', 'Confirm price and delivery or pickup', 'Receive your order at home or collect']

function FaqItem({ question, answer, open, onToggle }: { question: string; answer: string; open: boolean; onToggle: () => void }) {
  const id = useId()
  return (
    <div>
      <h3>
        <button
          type="button"
          className="flex w-full items-center justify-between gap-6 py-6 text-left font-semibold"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-button`}
        >
          {question}
          <ChevronDown aria-hidden="true" className={`size-5 shrink-0 text-[#0f6b58] transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-button`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 leading-7 text-[#4f6560]">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Page() {
  const [faq, setFaq] = useState(0)
  const whatsapp = whatsappLink()

  return (
    <MotionConfig reducedMotion="user">
      <section aria-labelledby="hero-title" className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="mb-6 inline-flex rounded-full bg-[#eef8f4] px-3 py-2 text-xs font-bold tracking-[.12em] text-[#0f6b58]">SHOOTERS STAGE · UTAWALA</p>
          <h1 id="hero-title" className="text-5xl font-semibold leading-none tracking-[-.05em] sm:text-7xl">
            Genuine medicines,<br /><span className="text-[#0f6b58]">quick care.</span>
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-8 text-[#4f6560]">
            Fast prescription refills, over-the-counter remedies, basic health screenings, and convenient delivery across Utawala.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/order" className="rounded-full bg-[#0f6b58] px-6 py-4 text-sm font-bold text-white">
              Order via WhatsApp <MessageCircle aria-hidden="true" className="ml-2 inline size-4" />
            </Link>
            <a href="#services" className="rounded-full border border-[#0f6b58] px-6 py-4 text-sm font-bold text-[#0f6b58]">Explore services</a>
          </div>
        </motion.div>
        <div className="overflow-hidden rounded-[2rem] bg-[#e4f5ee] p-3">
          <Image
            src="/winrose-pharmacy.webp"
            width={1312}
            height={816}
            preload
            sizes="(min-width: 1024px) 560px, 100vw"
            alt="A pharmacist showing a customer a medicine bottle at a pharmacy counter"
            className="h-[420px] w-full rounded-[1.5rem] object-cover"
          />
        </div>
      </section>

      <section aria-label="Highlights" className="border-y bg-white">
        <ul className="mx-auto grid max-w-7xl gap-5 px-5 py-6 sm:grid-cols-3 lg:px-8">
          <li className="flex items-center gap-3 font-semibold"><ShieldCheck aria-hidden="true" className="shrink-0 text-[#0f6b58]" /> Prescription checks where required</li>
          <li className="flex items-center gap-3 font-semibold"><MessageCircle aria-hidden="true" className="shrink-0 text-[#0f6b58]" /> Order requests via WhatsApp</li>
          <li className="flex items-center gap-3 font-semibold"><Stethoscope aria-hidden="true" className="shrink-0 text-[#0f6b58]" /> Guidance on using your medicines</li>
        </ul>
      </section>

      <section id="about" aria-labelledby="about-title" className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.15em] text-[#0f6b58]">About Winrose</p>
          <h2 id="about-title" className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Healthcare you can count on.</h2>
        </div>
        <div className="text-lg leading-8 text-[#4f6560]">
          <p>Winrose Pharmaceuticals is a community-focused pharmacy committed to making everyday healthcare more accessible and convenient. We provide pharmaceutical products, basic health services, consultations, and practical support for our customers.</p>
          <p className="mt-6 font-semibold text-[#123b35]">Our mission</p>
          <p>To provide accessible, reliable, and professional pharmaceutical services to our community.</p>
        </div>
      </section>

      <section id="services" aria-labelledby="services-title" className="bg-[#eaf6f1] px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[.15em] text-[#0f6b58]">Core healthcare services</p>
          <h2 id="services-title" className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Practical support for everyday health.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-3xl bg-white p-7 shadow-sm"
              >
                <div className="mb-8 grid size-11 place-items-center rounded-2xl bg-[#dff2e9] text-[#0f6b58]"><Stethoscope aria-hidden="true" className="size-5" /></div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 leading-7 text-[#4f6560]">{service.description}</p>
                <p className="mt-5 border-t border-[#e3eee9] pt-5 text-sm leading-6 text-[#4f6560]">{service.details}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="how-title" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.15em] text-[#0f6b58]">How it works</p>
            <h2 id="how-title" className="mt-4 text-4xl font-semibold tracking-[-.04em]">From need to care, simply.</h2>
          </div>
          <ol className="grid gap-5 sm:grid-cols-2">
            {steps.map((step, index) => (
              <li key={step} className="rounded-2xl border border-[#dbe9e4] p-5">
                <span className="text-sm font-bold text-[#0f6b58]" aria-hidden="true">0{index + 1}</span>
                <p className="mt-3 font-semibold">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="location" aria-labelledby="location-title" className="on-dark bg-[#123b35] px-5 py-20 text-white lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.15em] text-[#9ce0c4]">Find us in Utawala</p>
            <h2 id="location-title" className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Care close to home.</h2>
            <p className="mt-6 max-w-lg leading-8 text-[#c0d8d0]">
              Shooters Stage, Utawala, near Lily Square and the Eastern Bypass feeder road. Serving Utawala, Benedicta, Airways, Mihang&apos;o, Githunguri, and surrounding areas.
            </p>
            <ul className="mt-6 space-y-2 text-[#c0d8d0]">
              {siteConfig.address && <li>{siteConfig.address}</li>}
              {siteConfig.phone && siteConfig.phoneDigits && (
                <li>Phone: <a href={`tel:+${siteConfig.phoneDigits}`} className="font-semibold text-white underline">{siteConfig.phone}</a></li>
              )}
              {siteConfig.email && (
                <li>Email: <a href={`mailto:${siteConfig.email}`} className="break-all font-semibold text-white underline">{siteConfig.email}</a></li>
              )}
            </ul>
            {whatsapp && (
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center rounded-full bg-[#9ce0c4] px-6 py-4 font-bold text-[#123b35]">
                Chat with the pharmacy on WhatsApp <MessageCircle aria-hidden="true" className="ml-2 size-5 shrink-0" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </div>
          <div className="rounded-3xl bg-white/10 p-7">
            <h3 className="text-xl font-semibold">Opening hours</h3>
            <div className="mt-6 flex flex-col gap-4 text-[#c0d8d0]">
              <p className="flex justify-between gap-5 border-b border-white/15 pb-4"><span>Monday – Saturday</span><strong className="text-right text-white">7:00 AM – 10:00 PM</strong></p>
              <p className="flex justify-between gap-5"><span>Sunday &amp; public holidays</span><strong className="text-right text-white">8:00 AM – 9:00 PM</strong></p>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" aria-labelledby="faq-title" className="mx-auto max-w-4xl px-5 py-20 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-[.15em] text-[#0f6b58]">Questions</p>
        <h2 id="faq-title" className="mt-4 text-center text-4xl font-semibold tracking-[-.04em]">Frequently asked questions</h2>
        <div className="mt-10 divide-y divide-[#dbe9e4] border-y border-[#dbe9e4]">
          {faqs.map(([question, answer], index) => (
            <FaqItem key={question} question={question} answer={answer} open={faq === index} onToggle={() => setFaq(faq === index ? -1 : index)} />
          ))}
        </div>
      </section>

      <Link
        href="/order"
        aria-label="Order medicines"
        className="fixed bottom-5 right-5 z-30 grid size-14 place-items-center rounded-full bg-[#0f6b58] text-white shadow-lg"
      >
        <MessageCircle aria-hidden="true" className="size-6" />
      </Link>
    </MotionConfig>
  )
}
