import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/private/', // 管理画面などがあれば除外
      },
      {
        // AI検索・生成AIクローラーへの明示的な許可（GEO/LLMO対策）
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'ClaudeBot',
          'Claude-Web',
          'Claude-SearchBot',
          'anthropic-ai',
          'PerplexityBot',
          'Perplexity-User',
          'Google-Extended',
          'cohere-ai',
          'CCBot',
        ],
        allow: '/',
      },
    ],
    sitemap: 'https://tsunaguinc.co.jp/sitemap.xml',
  }
}

