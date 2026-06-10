import { MetadataRoute } from 'next'

// コンテンツを更新したらこの日付も更新する
const LAST_CONTENT_UPDATE = new Date('2026-06-10')

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tsunaguinc.co.jp'

  const routes: Array<{
    path: string
    changeFrequency: 'weekly' | 'monthly' | 'yearly'
    priority: number
  }> = [
    { path: '', changeFrequency: 'weekly', priority: 1 },
    { path: '/service', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/company', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/philosophy', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/mission', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/vision', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/value', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/origin', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/platform', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/features', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/contact', changeFrequency: 'yearly', priority: 0.5 },
    { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
  ]

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency,
    priority,
  }))
}
