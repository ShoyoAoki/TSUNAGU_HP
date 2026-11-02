import { MetadataRoute } from 'next'
import { physicalAiPublishedDates } from './news/physical-ai'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL

  // ja/zh の両方が存在するページ（16ページ）。alternates.languages で相互リンクさせる
  const bilingualPages: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
    { path: '', changeFrequency: 'weekly', priority: 1 },
    { path: '/service', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/service/physical-ai', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/service/bilingual', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/service/internship', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/service/process', changeFrequency: 'monthly', priority: 0.7 },
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

  for (const path of ['/news', '/news/space-ai', '/news/china-professionals', '/news/ai-researchers', '/news/stanford-kitchen-robot', '/news/shanghai-drone-delivery', '/news/amazon-unitree-parkour']) {
    entries.push({ url: `${baseUrl}${path}`, changeFrequency: 'monthly', priority: 0.6 })
  }

  for (const slug of Object.keys(physicalAiPublishedDates)) {
    entries.push({ url: `${baseUrl}/news/${slug}`, lastModified: new Date('2026-11-02T00:00:00+09:00'), changeFrequency: 'monthly', priority: 0.6 })
  }

  // 日本語のみのページ（zh版なし・hreflangなし）
  const japaneseOnlyPages: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
    { path: '/guide', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/guide/china-talent-merit-caution', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/guide/china-talent-visa', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/guide/china-talent-methods', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/guide/china-talent-cost', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/guide/china-talent-new-graduates', changeFrequency: 'monthly', priority: 0.7 },
  ]
  for (const page of japaneseOnlyPages) {
    entries.push({ url: `${baseUrl}${page.path}`, lastModified: new Date('2026-10-30'), changeFrequency: page.changeFrequency, priority: page.priority })
  }

  return entries
}
