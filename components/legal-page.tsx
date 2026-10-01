import type { ReactNode } from 'react'
import { legalLastUpdated } from '@/lib/site'

/**
 * Renders a value from the site config, or a highlighted "[…]" field when the business
 * hasn't supplied it yet. Highlighted fields carry `data-placeholder` so they are easy to find.
 */
export function Fill({ value, label }: { value?: string | null; label: string }) {
  if (value) return <>{value}</>
  return (
    <mark data-placeholder="true" className="rounded bg-[#ffe58a] px-1 font-semibold text-[#3d2e00]">
      [{label}]
    </mark>
  )
}

/**
 * `draft` shows a notice above the page while it still contains highlighted [ … ] fields.
 * Once Winrose Pharmaceuticals has completed the fields and had the page reviewed, pass `draft={false}`.
 */
export function LegalPage({ title, intro, draft = true, children }: { title: string; intro?: string; draft?: boolean; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 lg:px-8 lg:py-20">
      <p className="text-xs font-bold uppercase tracking-[.15em] text-[#0f6b58]">Winrose Pharmaceuticals</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">{title}</h1>
      <p className="mt-3 text-sm text-[#566d68]">Last updated: {legalLastUpdated}</p>
      {draft && (
        <p role="note" className="mt-6 rounded-2xl border border-[#8a6d00] bg-[#fff8dc] p-4 text-sm leading-6 text-[#3d2e00]">
          <strong>Draft for review.</strong> Fields highlighted like <mark className="rounded bg-[#ffe58a] px-1 font-semibold">[this]</mark> must be completed by Winrose Pharmaceuticals, and this page should be checked by a qualified adviser before it is relied on.
        </p>
      )}
      {intro && <p className="mt-6 text-lg leading-8 text-[#4f6560]">{intro}</p>}
      <div className="legal mt-10 space-y-10 leading-7 text-[#2c4a44] [&_a]:font-semibold [&_a]:text-[#0f6b58] [&_a]:underline [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-[#123b35] [&_li]:mt-2 [&_p+p]:mt-4 [&_ul]:list-disc [&_ul]:pl-6">
        {children}
      </div>
    </div>
  )
}
