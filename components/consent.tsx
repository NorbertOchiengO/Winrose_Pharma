'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Analytics } from '@vercel/analytics/next'
import { siteConfig } from '@/lib/site'

const STORAGE_KEY = 'winrose-analytics-consent'
const OPEN_EVENT = 'winrose:open-consent'
type Choice = 'granted' | 'denied'

function readChoice(): Choice | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    return null // storage blocked: treat as "not decided", so analytics stays off
  }
}

function saveChoice(choice: Choice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice)
  } catch {
    /* storage blocked: the choice simply applies for this page view */
  }
}

/** Loads analytics only after an explicit "Accept", and lets visitors change their mind later. */
export function ConsentManager() {
  const [choice, setChoice] = useState<Choice | null>(null)
  const [bannerOpen, setBannerOpen] = useState(false)
  const bannerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const stored = readChoice()
    setChoice(stored)
    setBannerOpen(stored === null)
    const reopen = () => {
      setBannerOpen(true)
      window.setTimeout(() => bannerRef.current?.focus(), 0)
    }
    window.addEventListener(OPEN_EVENT, reopen)
    return () => window.removeEventListener(OPEN_EVENT, reopen)
  }, [])

  if (!siteConfig.analyticsEnabled) return null

  const decide = (next: Choice) => {
    saveChoice(next)
    setChoice(next)
    setBannerOpen(false)
  }

  return (
    <>
      {choice === 'granted' && <Analytics />}
      {bannerOpen && (
        <section
          ref={bannerRef}
          tabIndex={-1}
          aria-labelledby="analytics-consent-title"
          className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-2xl border border-[#6b857e] bg-white p-5 text-[#123b35] shadow-xl outline-offset-4"
        >
          <h2 id="analytics-consent-title" className="font-bold">Help us improve this website?</h2>
          <p className="mt-2 text-sm leading-6 text-[#4f6560]">
            With your permission we use Vercel Web Analytics to count page visits. It is off unless you accept, and the
            site works the same either way. Your choice is saved on this device only. See our{' '}
            <Link href="/cookies" className="font-semibold text-[#0f6b58] underline">Cookies &amp; analytics policy</Link>.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={() => decide('granted')} className="rounded-full bg-[#0f6b58] px-5 py-3 text-sm font-bold text-white">
              Accept analytics
            </button>
            <button type="button" onClick={() => decide('denied')} className="rounded-full border border-[#0f6b58] px-5 py-3 text-sm font-bold text-[#0f6b58]">
              Decline analytics
            </button>
          </div>
        </section>
      )}
    </>
  )
}

/** Footer control that reopens the banner so visitors can change their choice at any time. */
export function ConsentSettingsButton({ className }: { className?: string }) {
  if (!siteConfig.analyticsEnabled) return null
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Analytics settings
    </button>
  )
}
