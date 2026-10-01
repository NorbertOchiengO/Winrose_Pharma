import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The page you were looking for could not be found.',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-start px-5 py-20 lg:px-8 lg:py-28">
      <p className="text-xs font-bold uppercase tracking-[.15em] text-[#0f6b58]">Error 404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-6xl">We couldn&apos;t find that page.</h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-[#4f6560]">
        The link may be out of date or the address may have been typed incorrectly. You can head back to the homepage or
        send an order request to the pharmacy.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Link href="/" className="inline-flex items-center rounded-full bg-[#0f6b58] px-6 py-4 text-sm font-bold text-white">
          Go to the homepage <ArrowRight className="ml-2 size-4" aria-hidden="true" />
        </Link>
        <Link href="/order" className="inline-flex items-center rounded-full border border-[#0f6b58] px-6 py-4 text-sm font-bold text-[#0f6b58]">
          Order medicines <MessageCircle className="ml-2 size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
