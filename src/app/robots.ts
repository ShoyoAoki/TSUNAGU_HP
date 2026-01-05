import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // 管理画面などがあれば除外
    },
    sitemap: 'https://bridg.inc/sitemap.xml', // TODO: 本番ドメインに変更してください
  }
}

