/**
 * 採用ガイド（/guide）の記事データ型。
 *
 * 原稿の流し込み手順：
 *   1. src/content/guide/articles/<slug>.ts の各フィールドを原稿で置き換える
 *   2. body には原稿の Markdown 本文をそのまま貼る（対応記法は markdown.ts 冒頭を参照）
 *   3. 図解は body に [[figure:ID|キャプション]] と書き、ID に対応する線画SVGを figures.tsx に登録する
 *   4. 原稿を入れ終えたら status を "ready" にする（"draft" の間は noindex で出力される）
 */
export type GuideStatus = "draft" | "ready";

export type GuideArticle = {
  /** URL の末尾。/guide/<slug> */
  slug: string;
  /** 画面の h1 */
  title: string;
  /** <title>。ブランド名まで含めた完成形を書く（title template は適用しない） */
  metaTitle: string;
  /** meta description / OG description */
  description: string;
  /** h1 直下のリード文。段落は空行で区切る */
  lead: string;
  /** 一覧カードに出す短い説明。省略時は description */
  summary?: string;
  /** YYYY-MM-DD */
  publishedAt: string;
  /** YYYY-MM-DD */
  updatedAt: string;
  /** 記事末の関連記事。slug を3本 */
  related: [string, string, string];
  /** 記事末CTA。heading と copy を原稿どおりに入れる */
  cta: { heading: string; copy: string };
  /** 本文 Markdown */
  body: string;
  status: GuideStatus;
};

/** Markdown を解析した結果のブロック。描画は src/app/guide/GuideBody.tsx */
export type GuideBlock =
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][]; caption?: string }
  | { type: "note"; text: string }
  | { type: "figure"; id: string; caption: string }
  | { type: "faq"; items: { q: string; a: string }[] };
