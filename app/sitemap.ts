import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  // Sitemap URLs must be absolute. Without a configured site URL we publish none rather than wrong ones.
  if (!siteConfig.url) return []
  return ['/', '/order', '/privacy', '/terms', '/cookies', '/returns'].map((path) => ({
    url: `${siteConfig.url}${path}`,
    changeFrequency: path === '/' ? 'monthly' : 'yearly',
  }))
}
