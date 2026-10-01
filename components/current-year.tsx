'use client'

import { useEffect, useState } from 'react'

/**
 * Shows the current year. The page is prerendered at build time, so the server value
 * can be stale; the effect corrects it in the visitor's browser.
 */
export function CurrentYear({ buildYear }: { buildYear: number }) {
  const [year, setYear] = useState(buildYear)
  useEffect(() => setYear(new Date().getFullYear()), [])
  return <>{year}</>
}
