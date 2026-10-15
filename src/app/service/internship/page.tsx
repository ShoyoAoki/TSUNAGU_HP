import type { Metadata } from "next";
import SpecialtyPage, { type SpecialtyContent } from "@/components/recruitment/SpecialtyPage";

const description = "中国語を活かす業務を中心に、学生インターンの採用を支援します。担当業務・勤務日数・期間などを整理し、学業と両立できる条件から候補者をお探しします。";
export const metadata: Metadata = {
  title: "インターン採用支援｜OwlMatch",
  description,
  alternates: { canonical: "/service/internship" },
  openGraph: { title: "インターン採用支援｜OwlMatch", description, url: "/service/internship" },
};

const content: SpecialtyContent = {
  slug: "internship", title: "インターン採用", eyebrow: "中国語を活かす、学生インターン", headline: "インターン採用",
  heroTitle: <span data-motion="hero-line"><em>インターン採用</em></span>,
  ctaLabel: "インターン採用を相談する", lead: description, icon: "graduate",
  roles: [
    { title: "SNS・コンテンツ", copy: "中国語の投稿づくりや情報発信など、SNS運用を支える業務。", tags: ["投稿企画", "コンテンツ制作", "運用補助"] },
    { title: "リサーチ", copy: "中国語の情報収集や整理など、事業の検討材料をまとめる業務。", tags: ["市場調査", "情報整理", "資料作成"] },
    { title: "営業・事業サポート", copy: "資料作成や連絡の補助など、チームの日々の活動を支える業務。", tags: ["営業補助", "資料作成", "連絡・調整"] },
  ],
  points: [
    { title: "担当業務・受入体制", copy: "任せる仕事と、社内で指導・相談を担当する方を確認します。" },
    { title: "勤務条件・学業との両立", copy: "勤務日数・時間・期間・勤務地を整理し、授業や試験との両立を確認します。" },
    { title: "語学力・経験", copy: "業務に必要な日本語・中国語の水準と、学生時代の活動や制作経験を確認します。" },
  ],
};

export default function Page() { return <SpecialtyPage content={content} />; }
