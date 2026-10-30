/**
 * /service/china-talent（中国人材採用の専用ページ）の文面データ。
 * 原稿：03_事業企画/リサーチ/マーケ・HP/中国人材採用_SEO原稿/専用ページ原稿_service-china-talent_2026-10.md
 * 画面・FAQPage JSON-LD・Service JSON-LD はすべてこのファイルから生成する。
 *
 * 守ること：理工系（physical-ai / it-ai）の欄に語学・日本語力を書かない。言語系は bilingual の欄だけに書く。
 * リンク先はリダイレクトしないURLだけを指定する（/service/it-ai・/service/new-graduates は next.config.mjs でリダイレクト中）。
 */
type Link = { label: string; href: string };

export type ChinaTalentField = {
  id: "physical-ai" | "it-ai" | "bilingual";
  en: string;
  title: string;
  copy: string;
  tags: string[];
  link?: Link;
  note?: string;
};

export type ChinaTalentContent = {
  status: "draft" | "ready";
  meta: { title: string; description: string };
  breadcrumb: { home: string; parent: string; current: string };
  hero: { eyebrow: string; title: string; subcopy: string; lead: string; ctaLabel: string; note: string };
  fields: { en: string; title: string; lead: string; items: ChinaTalentField[]; figure: { id: string; caption: string } };
  hiring: { en: string; title: string; lead: string; items: { title: string; label: string; copy: string; link?: Link }[]; note: string };
  flow: { en: string; title: string; steps: { title: string; copy: string }[]; link: Link; figure: { id: string; caption: string } };
  cost: { en: string; title: string; paragraphs: string[]; link: Link };
  guide: { en: string; title: string; listLink: Link; dataLink: Link };
  faq: { en: string; title: string; items: { q: string; a: string }[] };
  cta: { title: string; copy: string; buttonLabel: string; note: string };
  service: { name: string; serviceType: string };
};

export const chinaTalent: ChinaTalentContent = {
  status: "ready",
  meta: {
    title: "中国人材採用の支援内容｜対象人材・流れ・費用｜株式会社TSUNAGU",
    description: "中国出身の人材の採用を支援します。フィジカルAI・ロボティクス、IT・AI、日中バイリンガル（JLPT N1以上）の3領域で、新卒・中途・インターンの採用と入社後の定着をご相談いただけます。",
  },
  breadcrumb: { home: "トップ", parent: "企業の採用支援", current: "中国人材採用" },
  hero: {
    eyebrow: "CHINA TALENT",
    title: "中国人材採用",
    subcopy: "専門性から、採用を考える。",
    lead: "フィジカルAI・ロボティクス、IT・AI、日中バイリンガル。中国出身の人材の採用を、仕事内容の整理から入社後の定着までご相談いただけます。",
    ctaLabel: "採用について相談する",
    note: "初回の採用相談は無料です。",
  },
  fields: {
    en: "TALENT FIELDS",
    title: "3つの領域から選ぶ",
    lead: "担当する仕事から、必要な人材像を整理します。",
    items: [
      { id: "physical-ai", en: "PHYSICAL AI / ROBOTICS", title: "フィジカルAI・ロボティクス", copy: "ロボット制御、知覚・画像認識、シミュレーション。研究・制作経験を担当業務につなげます。", tags: ["ロボット制御", "画像認識", "シミュレーション"], link: { label: "詳しく見る", href: "/service/physical-ai" }, note: "新卒人材が対象です。" },
      { id: "it-ai", en: "IT / AI", title: "IT・AI", copy: "ソフトウェア開発、AI開発、データ分析。開発内容と必要な経験から要件を整理します。", tags: ["ソフトウェア開発", "機械学習", "データ分析"] },
      { id: "bilingual", en: "BILINGUAL", title: "日中バイリンガル", copy: "海外営業、営業事務、顧客対応。JLPT N1以上の人材を、実際の業務場面から選びます。", tags: ["海外営業", "営業事務", "顧客対応"], link: { label: "詳しく見る", href: "/service/bilingual" } },
    ],
    figure: { id: "china-talent-fields", caption: "仕事内容から、必要な専門性を整理する" },
  },
  hiring: {
    en: "HIRING OPTIONS",
    title: "新卒・中途・インターン",
    lead: "採用時期と育成方針に合わせて選べます。",
    items: [
      { title: "新卒", label: "学びを仕事につなぐ", copy: "専攻・研究・制作経験と、入社後に育てる範囲を分けて整理します。", link: { label: "詳しく見る", href: "/guide/china-talent-new-graduates" } },
      { title: "中途", label: "経験を即戦力に", copy: "これまでの担当業務と、入社後の役割を照らし合わせます。" },
      { title: "インターン", label: "学業と両立して働く", copy: "期間・時間・指導体制を決め、学生が担う業務を整理します。", link: { label: "詳しく見る", href: "/service/internship" } },
    ],
    note: "フィジカルAI・ロボティクスは新卒採用のご相談を承ります。",
  },
  flow: {
    en: "PROCESS",
    title: "ご相談から入社まで",
    steps: [
      { title: "採用相談のお申し込み", copy: "フォームから、会社名・連絡先とご相談内容をお送りください。" },
      { title: "仕事内容・採用条件の確認", copy: "仕事内容、必要な経験、勤務地、採用時期を伺います。" },
      { title: "候補者の確認・ご紹介", copy: "ご希望条件をもとに、候補者の経験や希望をご案内します。" },
      { title: "選考・条件の確認", copy: "面接日程などを調整します。採用判断は貴社の選考で行います。" },
      { title: "入社に向けた調整・定着の相談", copy: "入社日を調整し、入社後のご相談に対応します。在留資格・申請手続きについては、ご相談を承ります。" },
    ],
    link: { label: "採用の進め方を詳しく見る", href: "/service/process" },
    figure: { id: "china-talent-flow", caption: "ご相談から入社・定着まで" },
  },
  cost: {
    en: "FEES",
    title: "初回の採用相談は無料です",
    paragraphs: [
      "人材紹介サービスの料金、費用が発生する時期、契約条件は、採用内容を確認したうえで個別にご案内します。",
      "求職者ご本人から手数料はいただきません。",
    ],
    link: { label: "採用にかかる費用の考え方", href: "/guide/china-talent-cost" },
  },
  guide: {
    en: "GUIDE",
    title: "採用前に知っておきたいこと",
    listLink: { label: "採用ガイド一覧", href: "/guide" },
    dataLink: { label: "高度専門職の中国籍は2万2,169人（2025年12月末・出入国在留管理庁）", href: "/news/china-professionals" },
  },
  faq: {
    en: "FAQ",
    title: "よくあるご質問",
    items: [
      { q: "中国人材の採用について、何から相談すればよいですか？", a: "担当してほしい仕事と、採用したい時期からお聞かせください。必要な経験・専門性は、ご相談の中で一緒に整理します。" },
      { q: "どの分野の人材を紹介してもらえますか？", a: "フィジカルAI・ロボティクス、IT・AI、日中バイリンガルの3領域です。フィジカルAI・ロボティクスは新卒人材が対象です。" },
      { q: "日中バイリンガル人材の日本語力の基準はありますか？", a: "ご紹介対象はJLPT N1以上の人材です。資格に加えて、業務で必要な対応力を別途確認します。" },
      { q: "新卒・中途・インターンのどれでも相談できますか？", a: "はい。採用時期と育成方針を伺い、合う採用形態をご提案します。" },
      { q: "相談は無料ですか？", a: "初回の採用相談は無料です。人材紹介サービスの料金、費用が発生する時期、契約条件は、採用内容を確認したうえで個別にご案内します。" },
      { q: "求職者から手数料を取っていますか？", a: "いいえ。求職者ご本人から手数料はいただきません。" },
      { q: "在留資格についても相談できますか？", a: "在留資格・申請手続きについては、ご相談を承ります。申請の実務は、受入企業・候補者ご本人・ご依頼先の行政書士等が進めます。" },
      { q: "採用選考で国籍を条件にできますか？", a: "当社がお預かりする求人では、国籍を応募条件にしません。厚生労働省の「公正な採用選考」の考え方に沿い、仕事に必要な適性・能力で選考いただきます。" },
      { q: "入社後のフォローはありますか？", a: "入社後の働き方や職場でのご相談に対応します。定着支援の内容は、ご相談時にご案内します。" },
      { q: "採用条件が決まっていなくても相談できますか？", a: "はい。仕事内容や採用でお困りのことを伺い、必要な経験・専門性を一緒に整理します。" },
    ],
  },
  cta: {
    title: "中国人材採用のご相談",
    copy: "仕事内容が固まっていなくても大丈夫です。必要な人材像から一緒に整理します。",
    buttonLabel: "採用について相談する",
    note: "初回の採用相談は無料です。",
  },
  service: { name: "中国人材採用", serviceType: "人材紹介" },
};
