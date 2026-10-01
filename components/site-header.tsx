'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import { ArrowRight, Menu, Plus, X } from 'lucide-react'
import { navLinks } from '@/lib/site'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const menuId = useId()
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Close the mobile menu after navigating to another page.
  useEffect(() => setOpen(false), [pathname])

  // Escape closes the menu and returns focus to the toggle button.
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  const linkProps = (href: string) => (href === pathname ? { 'aria-current': 'page' as const } : {})

  return (
    <header className="sticky top-0 z-40 border-b border-[#dbe9e4] bg-[#fbfdfc]/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-5 lg:px-8">
        <Link href="/" aria-label="Winrose Pharmaceuticals, go to the homepage" className="flex min-w-0 items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#0f6b58] text-white">
            <Plus className="size-5" strokeWidth={3} aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <strong className="block tracking-[.12em]">WINROSE</strong>
            <small className="block tracking-[.18em] text-[#566d68]">PHARMACEUTICALS</small>
          </span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 text-sm font-semibold lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="py-2 hover:text-[#0f6b58]" {...linkProps(link.href)}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-3">
          <Link href="/order" className="hidden rounded-full bg-[#0f6b58] px-5 py-3 text-xs font-bold text-white sm:inline-flex">
            ORDER MEDICINE <ArrowRight className="ml-2 size-4" aria-hidden="true" />
          </Link>
          <button
            ref={buttonRef}
            type="button"
            className="grid size-11 place-items-center rounded-full border border-[#6b857e] lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close main menu' : 'Open main menu'}
            aria-expanded={open}
            aria-controls={menuId}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id={menuId} aria-label="Main (mobile)" className="flex flex-col border-t bg-white px-6 py-3 lg:hidden">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="py-3 font-semibold" {...linkProps(link.href)}>
              {link.label}
            </Link>
          ))}
          <Link href="/order" onClick={() => setOpen(false)} className="my-3 inline-flex items-center justify-center rounded-full bg-[#0f6b58] px-5 py-3 text-sm font-bold text-white">
            Order medicine <ArrowRight className="ml-2 size-4" aria-hidden="true" />
          </Link>
        </nav>
      )}
    </header>
  )
}
