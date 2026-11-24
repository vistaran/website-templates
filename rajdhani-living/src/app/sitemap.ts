import type { MetadataRoute } from 'next'

const BASE = 'https://rajdhaniliving.com'

const ROUTES: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }[] = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/kitchen', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/plywood', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/hardware', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/timber', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/sthapatya-architects', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/showcase', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.9, changeFrequency: 'yearly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
