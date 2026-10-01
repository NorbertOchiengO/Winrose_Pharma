'use client'

import Link from 'next/link'

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section role="alert" className="mx-auto flex max-w-3xl flex-col items-start px-5 py-20 lg:px-8 lg:py-28">
      <p className="text-xs font-bold uppercase tracking-[.15em] text-[#0f6b58]">Something went wrong</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">This page failed to load.</h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-[#4f6560]">
        Please try again. If the problem continues, go back to the homepage and try again in a few minutes.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className="rounded-full bg-[#0f6b58] px-6 py-4 text-sm font-bold text-white">
          Try again
        </button>
        <Link href="/" className="rounded-full border border-[#0f6b58] px-6 py-4 text-sm font-bold text-[#0f6b58]">
          Go to the homepage
        </Link>
      </div>
    </section>
  )
}
