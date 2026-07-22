import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL

  // ja/zh の両方が存在するページ（12ページ）。alternates.languages で相互リンクさせる
  const bilingualPages: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
    { path: '', changeFrequency: 'weekly', priority: 1 },
    { path: '/service', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/company', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/contact', changeFrequency: 'yearly', priority: 0.5 },
    { path: '/philosophy', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/mission', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/vision', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/value', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/origin', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/features', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
  ]

  const entries: MetadataRoute.Sitemap = []

  for (const page of bilingualPages) {
    const jaUrl = `${baseUrl}${page.path}`
    const zhUrl = `${baseUrl}/zh${page.path}`
    const languages = {
      ja: jaUrl,
      'zh-Hans': zhUrl,
      'x-default': jaUrl,
    }

    entries.push({
      url: jaUrl,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: { languages },
    })
    entries.push({
      url: zhUrl,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      // zh版はja版よりわずかに優先度を下げる（マスター言語はja）
      priority: Math.max(page.priority - 0.1, 0.1),
      alternates: { languages },
    })
  }

  return entries
}
