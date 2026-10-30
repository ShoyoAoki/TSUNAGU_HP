/**
 * /service/china-talent（中国人材採用の専用ページ）の文面データ。
 * 画面・FAQPage JSON-LD・Service JSON-LD はすべてこのファイルから生成する。
 *
 * 原稿の流し込み手順：
 *   - 「【原稿待ち】」の文字列を原稿で置き換える。配列の要素数は原稿に合わせて増減してよい
 *   - 改行を入れたい見出しは titleLines のように配列で持つ（1要素＝1行）
 *   - figureId は src/content/guide/figures.tsx に登録した線画SVGの ID。未登録なら点線の図解枠が出る
 *   - 入れ終えたら status を "ready" にする（"draft" の間は noindex で出力される）
 *
 * 守ること：理工系（physical-ai / it-ai）の欄に語学・日本語力を書かない。言語系は bilingual の欄だけに書く。
 */
export type ChinaTalentField = {
  id: "physical-ai" | "it-ai" | "bilingual";
  en: string;
  title: string;
  copy: string;
  tags: string[];
  /** 既存の詳細ページ。リダイレクトするURL（/service/it-ai 等）は指定しない */
  href?: string;
  linkLabel?: string;
};

export type ChinaTalentContent = {
  status: "draft" | "ready";
  meta: { title: string; description: string };
  hero: { eyebrow: string; titleLines: string[]; lead: string; ctaLabel: string; note: string };
  fields: { en: string; titleLines: string[]; intro: string; items: ChinaTalentField[]; note: string };
  hiring: { en: string; titleLines: string[]; intro: string; items: { title: string; copy: string; href?: string; linkLabel?: string }[] };
  flow: { en: string; titleLines: string[]; intro: string; figureId?: string; figureCaption?: string; steps: { title: string; copy: string }[] };
  cost: { en: string; titleLines: string[]; paragraphs: string[] };
  faq: { en: string; title: string; items: { q: string; a: string }[] };
  guide: { en: string; title: string; intro: string };
  cta: { titleLines: string[]; copy: string; buttonLabel: string };
};

export const chinaTalent: ChinaTalentContent = {
  status: "draft",
  meta: {
    title: "中国人材採用の支援｜株式会社TSUNAGU",
    description: "【原稿待ち】中国人材採用の専用ページの説明文が入ります。",
  },
  hero: {
    eyebrow: "CHINA TALENT / 中国人材採用",
    titleLines: ["【原稿待ち】", "中国人材採用"],
    lead: "【原稿待ち】ファーストビューのリード文が入ります。",
    ctaLabel: "採用について相談する",
    note: "初回相談無料・アカウント登録不要",
  },
  fields: {
    en: "TALENT FIELDS",
    titleLines: ["【原稿待ち】", "対象人材の3領域"],
    intro: "【原稿待ち】対象人材の説明が入ります。",
    items: [
      { id: "physical-ai", en: "PHYSICAL AI", title: "フィジカルAI人材", copy: "【原稿待ち】フィジカルAI人材の説明が入ります。", tags: ["【原稿待ち】"], href: "/service/physical-ai", linkLabel: "フィジカルAI人材の採用支援" },
      { id: "it-ai", en: "IT / AI", title: "IT・AI人材", copy: "【原稿待ち】IT・AI人材の説明が入ります。", tags: ["【原稿待ち】"] },
      { id: "bilingual", en: "BILINGUAL", title: "日中バイリンガル人材", copy: "【原稿待ち】日中バイリンガル人材の説明が入ります。", tags: ["JLPT N1以上", "【原稿待ち】"], href: "/service/bilingual", linkLabel: "日中バイリンガル人材の採用支援" },
    ],
    note: "【原稿待ち】ご紹介できる人材は、ご希望条件と候補者の状況により個別に確認します。",
  },
  hiring: {
    en: "HIRING OPTIONS",
    titleLines: ["【原稿待ち】", "採用形態"],
    intro: "【原稿待ち】採用形態の説明が入ります。",
    items: [
      { title: "新卒採用", copy: "【原稿待ち】新卒採用の説明が入ります。", href: "/guide/china-talent-new-graduates", linkLabel: "新卒採用の進め方を読む" },
      { title: "中途採用", copy: "【原稿待ち】中途採用の説明が入ります。" },
      { title: "インターン", copy: "【原稿待ち】インターンの説明が入ります。", href: "/service/internship", linkLabel: "インターン採用支援" },
    ],
  },
  flow: {
    en: "PROCESS",
    titleLines: ["【原稿待ち】", "ご相談から入社まで"],
    intro: "【原稿待ち】流れの説明が入ります。",
    figureId: "china-talent-flow",
    figureCaption: "【原稿待ち】図解のキャプション",
    steps: [
      { title: "【原稿待ち】手順1", copy: "【原稿待ち】" },
      { title: "【原稿待ち】手順2", copy: "【原稿待ち】" },
      { title: "【原稿待ち】手順3", copy: "【原稿待ち】" },
      { title: "【原稿待ち】手順4", copy: "【原稿待ち】在留資格・申請手続きについては、ご相談を承ります。" },
    ],
  },
  cost: {
    en: "FEES",
    titleLines: ["初回の採用相談は", "無料です"],
    paragraphs: [
      "人材紹介サービスの料金、費用が発生する時期、契約条件は、採用内容を確認したうえで個別にご案内します。",
      "【原稿待ち】費用の考え方の説明が入ります。",
    ],
  },
  faq: {
    en: "FAQ",
    title: "よくあるご質問",
    items: [
      { q: "【原稿待ち】質問1", a: "【原稿待ち】回答1" },
      { q: "【原稿待ち】質問2", a: "【原稿待ち】回答2" },
      { q: "在留資格についても相談できますか？", a: "在留資格・申請手続きについては、ご相談を承ります。" },
    ],
  },
  guide: {
    en: "GUIDE",
    title: "採用ガイド",
    intro: "【原稿待ち】採用ガイドへの導入文が入ります。",
  },
  cta: {
    titleLines: ["中国人材の", "採用相談"],
    copy: "仕事内容や必要なスキルが決まる前から、ご相談いただけます。",
    buttonLabel: "採用のご相談",
  },
};
