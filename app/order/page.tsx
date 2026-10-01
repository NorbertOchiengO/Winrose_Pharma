'use client'

import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react'
import Link from 'next/link'
import { AlertCircle, CheckCircle2, Minus, Plus, Search, ShoppingBag } from 'lucide-react'
import { siteConfig, whatsappLink } from '@/lib/site'

const products = [
  { id: 'MED001', name: 'Paracetamol 500mg', category: 'Pain Relief', description: 'Everyday pain and fever relief.', unit: '20 tablets' },
  { id: 'MED002', name: 'Vitamin C 1000mg', category: 'Vitamins', description: 'Daily immune support supplement.', unit: '30 tablets' },
  { id: 'MED003', name: 'Digital Thermometer', category: 'Medical Supplies', description: 'Fast, easy temperature checks at home.', unit: '1 unit' },
  { id: 'MED004', name: 'Antiseptic Solution', category: 'First Aid', description: 'Everyday first-aid and wound care.', unit: '100ml' },
]

type Product = (typeof products)[number]
type CartItem = { product: Product; quantity: number }
type Errors = Partial<Record<'name' | 'phone' | 'request' | 'consent', string>>

const MAX_QUANTITY = 99
const inputClass = 'mt-2 h-12 w-full rounded-xl border border-[#6b857e] bg-white px-3 aria-[invalid=true]:border-[#b42318]'

/** Accepts 07XXXXXXXX, 01XXXXXXXX, +2547XXXXXXXX and 2547XXXXXXXX (spaces, dashes, brackets allowed). */
function normalisePhone(value: string) {
  const match = value.replace(/[\s\-()]/g, '').match(/^(?:\+?254|0)([17]\d{8})$/)
  return match ? `+254${match[1]}` : null
}

function Field({ id, label, optional, hint, error, children }: { id: string; label: string; optional?: boolean; hint?: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {optional && <span className="font-normal text-[#566d68]"> (optional)</span>}
      </label>
      {hint && <p id={`${id}-hint`} className="mt-1 text-xs leading-5 text-[#566d68]">{hint}</p>}
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm font-semibold text-[#b42318]">
          <span className="sr-only">Error: </span>{error}
        </p>
      )}
    </div>
  )
}

const describedBy = (id: string, hint?: boolean, error?: string) => [hint ? `${id}-hint` : '', error ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined

export default function OrderPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All categories')
  const [cart, setCart] = useState<CartItem[]>([])
  const [customer, setCustomer] = useState({ name: '', phone: '', location: '', notes: '' })
  const [service, setService] = useState('')
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [attempt, setAttempt] = useState(0)
  const [sentUrl, setSentUrl] = useState<string | null>(null)
  const [announcement, setAnnouncement] = useState('')
  const summaryRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  const orderingAvailable = whatsappLink() !== null
  const categories = ['All categories', ...Array.from(new Set(products.map((product) => product.category)))]
  const filtered = useMemo(
    () => products.filter((product) => `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(query.trim().toLowerCase()) && (category === 'All categories' || product.category === category)),
    [query, category],
  )
  const count = cart.reduce((total, item) => total + item.quantity, 0)
  const quantityOf = (id: string) => cart.find((item) => item.product.id === id)?.quantity ?? 0
  const errorEntries = Object.entries(errors) as [keyof Errors, string][]

  // Move focus to the error summary after a failed submit, and to the confirmation after a successful one.
  useEffect(() => {
    if (attempt > 0 && errorEntries.length > 0) summaryRef.current?.focus()
  }, [attempt])
  useEffect(() => {
    if (sentUrl) successRef.current?.focus()
  }, [sentUrl])

  const add = (product: Product) => {
    const next = Math.min(MAX_QUANTITY, quantityOf(product.id) + 1)
    setCart((current) => (current.some((item) => item.product.id === product.id) ? current.map((item) => (item.product.id === product.id ? { ...item, quantity: next } : item)) : [...current, { product, quantity: 1 }]))
    setAnnouncement(`Added ${product.name}. You now have ${next} in your request.`)
    setSentUrl(null)
  }
  const change = (product: Product, amount: number) => {
    const next = Math.min(MAX_QUANTITY, Math.max(0, quantityOf(product.id) + amount))
    setCart((current) => current.map((item) => (item.product.id === product.id ? { ...item, quantity: next } : item)).filter((item) => item.quantity > 0))
    setAnnouncement(next === 0 ? `Removed ${product.name} from your request.` : `${product.name}: ${next} in your request.`)
    setSentUrl(null)
  }
  const clearCart = () => {
    setCart([])
    setAnnouncement('Your request has been cleared.')
    setSentUrl(null)
  }
  const startAgain = () => {
    setCart([])
    setCustomer({ name: '', phone: '', location: '', notes: '' })
    setService('')
    setConsent(false)
    setErrors({})
    setAttempt(0)
    setSentUrl(null)
    setAnnouncement('Started a new request.')
  }

  const validate = (): Errors => {
    const found: Errors = {}
    if (!customer.name.trim()) found.name = 'Enter your full name so the pharmacist knows who to reply to.'
    if (customer.phone.trim() && !normalisePhone(customer.phone)) found.phone = 'Enter a valid Kenyan mobile number, for example 0712 345 678 or +254 712 345 678.'
    if (cart.length === 0 && !service && !customer.notes.trim()) found.request = 'Add at least one product, choose a service, or describe what you need in the notes.'
    if (!consent) found.consent = 'Tick the box to confirm you understand how your details will be used.'
    return found
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const found = validate()
    setErrors(found)
    setAttempt((value) => value + 1)
    if (Object.keys(found).length > 0) return

    const phone = customer.phone.trim() ? normalisePhone(customer.phone) : null
    const items = cart.length ? cart.map((item) => `${item.quantity} × ${item.product.name}`).join('\n') : 'No products selected'
    const message = `Hello Winrose Pharmaceuticals,\n\nI would like to place an order.\n\nCUSTOMER DETAILS\nName: ${customer.name.trim()}\nPhone: ${phone ?? 'Not provided'}\nLocation: ${customer.location.trim() || 'Not provided'}\n\nORDER\n${items}\n\nSERVICE\n${service || 'None'}\n\nNOTES\n${customer.notes.trim() || 'None'}\n\nPlease confirm availability and next steps.`
    const url = whatsappLink(message)
    if (!url) return
    setSentUrl(url)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <section aria-labelledby="order-title" className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[.15em] text-[#0f6b58]">Medicine order request</p>
        <h1 id="order-title" className="mt-4 text-5xl font-semibold tracking-[-.04em]">Let&apos;s get your order started.</h1>
        <p className="mt-4 max-w-xl text-lg leading-8 text-[#4f6560]">
          Browse the catalogue and send your request to Winrose Pharmaceuticals through WhatsApp. You can review the message before you send it. Availability, pricing, and prescription requirements are confirmed by the pharmacy.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
          <section aria-labelledby="catalogue-title">
            <h2 id="catalogue-title" className="sr-only">Medicines and supplies</h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="relative flex-1">
                <span className="sr-only">Search medicines or supplies</span>
                <Search aria-hidden="true" className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#566d68]" />
                <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search medicines or supplies" className="h-14 w-full rounded-2xl border border-[#6b857e] bg-white pl-12 pr-4" />
              </label>
              <select aria-label="Filter by category" value={category} onChange={(event) => setCategory(event.target.value)} className="h-14 rounded-2xl border border-[#6b857e] bg-white px-4 sm:w-56">
                {categories.map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>
            <p role="status" className="sr-only">{filtered.length === 1 ? '1 product shown' : `${filtered.length} products shown`}</p>

            <ul className="mt-8 grid gap-5 sm:grid-cols-2">
              {filtered.map((product) => {
                const inRequest = quantityOf(product.id)
                return (
                  <li key={product.id}>
                    <article className="h-full rounded-3xl border bg-white p-5">
                      <div aria-hidden="true" className="grid h-36 place-items-center rounded-2xl bg-[#eef8f4]"><ShoppingBag className="size-10 text-[#0f6b58]" /></div>
                      <p className="mt-5 text-xs font-bold uppercase tracking-wider text-[#0f6b58]">{product.category}</p>
                      <h3 className="mt-2 text-lg font-bold">{product.name}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#566d68]">{product.description}</p>
                      <p className="mt-2 text-xs text-[#566d68]">{product.unit} · Availability confirmed by pharmacy</p>
                      <button type="button" onClick={() => add(product)} aria-label={`Add to order: ${product.name}`} className="mt-5 w-full rounded-full bg-[#0f6b58] px-4 py-3 text-sm font-bold text-white">
                        Add to order
                      </button>
                      {inRequest > 0 && <p className="mt-2 text-center text-xs font-semibold text-[#0f6b58]">In your request: {inRequest}</p>}
                    </article>
                  </li>
                )
              })}
            </ul>
            {filtered.length === 0 && <p className="mt-8 rounded-2xl bg-[#f0f7f4] p-8 text-center">No products match your search. Try another word or category, or describe what you need in the notes of your request.</p>}
          </section>

          <section id="request" aria-labelledby="request-title" className="h-fit rounded-3xl border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 id="request-title" className="text-2xl font-bold">Your request</h2>
              <span className="rounded-full bg-[#eef8f4] px-3 py-1 text-sm font-bold text-[#0f6b58]">{count === 1 ? '1 item' : `${count} items`}</span>
            </div>
            <p role="status" className="sr-only">{announcement}</p>

            {!orderingAvailable && (
              <div role="alert" className="mt-4 flex gap-3 rounded-2xl border border-[#b42318] bg-[#fef3f2] p-4 text-sm leading-6 text-[#7a1a12]">
                <AlertCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
                <p>Online ordering is temporarily unavailable. Please visit the pharmacy at Shooters Stage, Utawala{siteConfig.phone ? ` or call ${siteConfig.phone}` : ''}.</p>
              </div>
            )}

            {cart.length === 0 ? (
              <p className="mt-6 rounded-2xl bg-[#f0f7f4] p-6 text-center text-[#4f6560]">Your request is empty. Add medicines from the list, or describe what you need in the notes below.</p>
            ) : (
              <>
                <ul className="mt-4 divide-y">
                  {cart.map((item) => (
                    <li key={item.product.id} className="flex items-center justify-between gap-3 py-4">
                      <span>
                        <strong className="text-sm">{item.product.name}</strong>
                        <small className="block text-[#566d68]">{item.product.unit}</small>
                      </span>
                      <span className="flex items-center gap-2">
                        <button type="button" onClick={() => change(item.product, -1)} className="grid size-11 place-items-center rounded-full border border-[#6b857e]" aria-label={`Decrease quantity of ${item.product.name}`}><Minus aria-hidden="true" className="size-4" /></button>
                        <span aria-label={`Quantity: ${item.quantity}`} className="min-w-6 text-center font-semibold">{item.quantity}</span>
                        <button type="button" onClick={() => change(item.product, 1)} disabled={item.quantity >= MAX_QUANTITY} className="grid size-11 place-items-center rounded-full border border-[#6b857e] disabled:opacity-50" aria-label={`Increase quantity of ${item.product.name}`}><Plus aria-hidden="true" className="size-4" /></button>
                      </span>
                    </li>
                  ))}
                </ul>
                <button type="button" onClick={clearCart} className="mt-2 text-sm font-semibold text-[#0f6b58] underline">Clear all items from this request</button>
              </>
            )}

            <form noValidate onSubmit={onSubmit} className="mt-5 flex flex-col gap-4" aria-label="Order request details">
              {errorEntries.length > 0 && (
                <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-2xl border border-[#b42318] bg-[#fef3f2] p-4 text-sm text-[#7a1a12]">
                  <p className="font-bold">Please fix the following before sending:</p>
                  <ul className="mt-2 list-disc pl-5">
                    {errorEntries.map(([key, message]) => (
                      <li key={key}><a href={key === 'request' ? '#order-notes' : `#order-${key}`} className="underline">{message}</a></li>
                    ))}
                  </ul>
                </div>
              )}

              <Field id="order-name" label="Full name" error={errors.name}>
                <input id="order-name" required aria-required="true" aria-invalid={!!errors.name} aria-describedby={describedBy('order-name', false, errors.name)} autoComplete="name" value={customer.name} onChange={(event) => setCustomer({ ...customer, name: event.target.value })} className={inputClass} placeholder="First and last name" />
              </Field>
              <Field id="order-phone" label="Phone number" optional hint="Only needed if different from the WhatsApp number you are sending from." error={errors.phone}>
                <input id="order-phone" type="tel" inputMode="tel" autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={describedBy('order-phone', true, errors.phone)} value={customer.phone} onChange={(event) => setCustomer({ ...customer, phone: event.target.value })} className={inputClass} placeholder="0712 345 678 or +254 712 345 678" />
              </Field>
              <Field id="order-location" label="Location" optional>
                <input id="order-location" value={customer.location} onChange={(event) => setCustomer({ ...customer, location: event.target.value })} className={inputClass} placeholder="Delivery area, or write “pickup”" />
              </Field>
              <Field id="order-service" label="Service request" optional>
                <select id="order-service" value={service} onChange={(event) => setService(event.target.value)} className={`${inputClass} px-3`}>
                  <option value="">No service</option>
                  <option>General Consultation</option>
                  <option>Medication Guidance</option>
                  <option>Blood Pressure Check</option>
                  <option>Blood Glucose Test</option>
                  <option>First Aid Assistance</option>
                </select>
              </Field>
              <Field id="order-notes" label="Additional notes" optional hint="Share only what the pharmacist needs, such as brand or strength. Send photos of prescriptions in the WhatsApp chat. Please don't include ID or payment details." error={errors.request}>
                <textarea id="order-notes" aria-invalid={!!errors.request} aria-describedby={describedBy('order-notes', true, errors.request)} value={customer.notes} onChange={(event) => setCustomer({ ...customer, notes: event.target.value })} className="mt-2 min-h-24 w-full rounded-xl border border-[#6b857e] bg-white p-3 aria-[invalid=true]:border-[#b42318]" placeholder="For example: brand preference, quantity, or prescription details" />
              </Field>

              <p className="text-xs leading-5 text-[#566d68]">Prescription verification may be required before your order can be confirmed. This website does not process payments.</p>

              <div>
                <label htmlFor="order-consent" className="flex items-start gap-3 text-sm leading-6">
                  <input id="order-consent" type="checkbox" required aria-required="true" aria-invalid={!!errors.consent} aria-describedby={describedBy('order-consent', false, errors.consent)} checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-1 size-5 shrink-0 accent-[#0f6b58]" />
                  <span>
                    I understand my name, location, notes and order details will be put into a WhatsApp message to Winrose Pharmaceuticals and used as described in the{' '}
                    <Link href="/privacy" target="_blank" className="font-semibold text-[#0f6b58] underline">Privacy Policy<span className="sr-only"> (opens in a new tab)</span></Link>.
                  </span>
                </label>
                {errors.consent && <p id="order-consent-error" className="mt-2 text-sm font-semibold text-[#b42318]"><span className="sr-only">Error: </span>{errors.consent}</p>}
              </div>

              <button type="submit" disabled={!orderingAvailable} className="rounded-full bg-[#25d366] px-5 py-4 font-bold text-[#0b2f29] disabled:opacity-60">
                Send order via WhatsApp
              </button>

              {sentUrl && (
                <div ref={successRef} tabIndex={-1} role="status" className="rounded-2xl border border-[#0f6b58] bg-[#eef8f4] p-4 text-sm leading-6">
                  <p className="flex items-start gap-2 font-bold text-[#0b4a3d]"><CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0" /> Your request is ready to send.</p>
                  <p className="mt-2">WhatsApp should have opened in a new tab with your message written out. <strong>Press Send in WhatsApp to deliver it</strong>. The pharmacy has not received it until you do.</p>
                  <p className="mt-3">
                    <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0f6b58] underline">Nothing opened? Open WhatsApp with my request<span className="sr-only"> (opens in a new tab)</span></a>
                  </p>
                  <button type="button" onClick={startAgain} className="mt-3 font-semibold text-[#0f6b58] underline">Start a new request</button>
                </div>
              )}
            </form>
          </section>
        </div>
      </section>

      {count > 0 && (
        <a href="#request" className="fixed inset-x-5 bottom-5 z-30 rounded-full bg-[#0f6b58] px-5 py-4 text-center text-sm font-bold text-white shadow-lg lg:hidden">
          View your request ({count === 1 ? '1 item' : `${count} items`})
        </a>
      )}
    </>
  )
}
