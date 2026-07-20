// サイト全体の正規URL起点。本番はVercel側の仕様で "tsunaguinc.co.jp" → "www.tsunaguinc.co.jp" へ
// 308リダイレクトされるため、canonical・og:url・JSON-LD・sitemap・llms.txt等は
// 必ずリダイレクト後の実体URL（www付き）を参照すること。
export const SITE_URL = "https://www.tsunaguinc.co.jp";
