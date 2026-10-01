import type { Metadata, Viewport } from 'next'
import { ConsentManager } from '@/components/consent'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { siteConfig } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: siteConfig.url ? new URL(siteConfig.url) : undefined,
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    locale: 'en_KE',
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    // Social previews need an absolute URL, so the image is only added once the site URL is known.
    ...(siteConfig.url ? { images: [{ url: '/winrose-pharmacy.webp', width: 1312, height: 816, alt: 'A pharmacist showing a customer a medicine bottle at a pharmacy counter' }] } : {}),
  },
  twitter: { card: 'summary_large_image' },
}

// The design is light-only, so declare that rather than letting OS dark mode restyle form controls.
export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0f6b58',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="light">
      <body className="bg-[#fbfdfc] text-[#123b35] antialiased">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-[#0f6b58] px-5 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main" className="min-h-[60vh]">
          {children}
        </main>
        <SiteFooter />
        <ConsentManager />
      </body>
    </html>
  )
}
