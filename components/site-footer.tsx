import Link from 'next/link'
import { CurrentYear } from '@/components/current-year'
import { ConsentSettingsButton } from '@/components/consent'
import { siteConfig, whatsappLink } from '@/lib/site'

const linkClass = 'inline-block py-1 hover:text-[#0f6b58] hover:underline'

export function SiteFooter() {
  const whatsapp = whatsappLink()
  return (
    <footer className="border-t border-[#dbe9e4] bg-white px-5 pb-24 pt-12 text-sm text-[#566d68] sm:pb-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <strong className="tracking-[.12em] text-[#123b35]">WINROSE PHARMACEUTICALS</strong>
            <p className="mt-3 max-w-xs leading-6">Shooters Stage, Utawala, Nairobi.</p>
            {siteConfig.ppbLicence && <p className="mt-3 leading-6">Premises licence no. {siteConfig.ppbLicence}</p>}
            {siteConfig.pharmacist && <p className="mt-1 leading-6">Pharmacist: {siteConfig.pharmacist}</p>}
          </div>
          <nav aria-label="Explore">
            <h2 className="font-bold text-[#123b35]">Explore</h2>
            <ul className="mt-3">
              <li><Link href="/#about" className={linkClass}>About</Link></li>
              <li><Link href="/#services" className={linkClass}>Services</Link></li>
              <li><Link href="/order" className={linkClass}>Order medicines</Link></li>
              <li><Link href="/#location" className={linkClass}>Opening hours and location</Link></li>
            </ul>
          </nav>
          <div>
            <h2 className="font-bold text-[#123b35]">Contact</h2>
            <ul className="mt-3">
              {whatsapp && (
                <li>
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    Chat on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              )}
              {siteConfig.phone && siteConfig.phoneDigits && (
                <li><a href={`tel:+${siteConfig.phoneDigits}`} className={linkClass}>Call {siteConfig.phone}</a></li>
              )}
              {siteConfig.email && (
                <li><a href={`mailto:${siteConfig.email}`} className={`${linkClass} break-all`}>{siteConfig.email}</a></li>
              )}
              {siteConfig.address && <li className="py-1 leading-6">{siteConfig.address}</li>}
            </ul>
          </div>
          <nav aria-label="Legal">
            <h2 className="font-bold text-[#123b35]">Legal</h2>
            <ul className="mt-3">
              <li><Link href="/privacy" className={linkClass}>Privacy Policy</Link></li>
              <li><Link href="/terms" className={linkClass}>Terms &amp; Conditions</Link></li>
              <li><Link href="/cookies" className={linkClass}>Cookies &amp; analytics</Link></li>
              <li><Link href="/returns" className={linkClass}>Returns &amp; refunds</Link></li>
              <li><ConsentSettingsButton className={`${linkClass} text-left`} /></li>
            </ul>
          </nav>
        </div>
        <p className="mt-10 max-w-3xl border-t border-[#dbe9e4] pt-6 text-xs leading-5">
          Information on this website is general and does not replace advice from a pharmacist or doctor. In an emergency,
          go to the nearest hospital or contact emergency services.
        </p>
        <p className="mt-3">
          © <CurrentYear buildYear={new Date().getFullYear()} /> {siteConfig.legalName ?? siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
