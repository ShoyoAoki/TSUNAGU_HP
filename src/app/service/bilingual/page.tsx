import type { Metadata } from "next";
import SpecialtyPage, { type SpecialtyContent } from "@/components/recruitment/SpecialtyPage";
const description = "日本語と中国語を活かす、海外営業・営業事務・カスタマーサポートなどの採用支援。実務経験者から新卒まで、業務内容と語学力に合う中国人材をお探しします。";
export const metadata: Metadata = { title: "バイリンガル人材・新卒バイリンガル人材｜OwlMatch", description, alternates: { canonical: "/service/bilingual" }, openGraph: { title: "バイリンガル人材・新卒バイリンガル人材｜OwlMatch", description, url: "/service/bilingual" } };
const content: SpecialtyContent = {
  slug: "bilingual", title: "バイリンガル人材・新卒バイリンガル人材", eyebrow: "日本語・中国語を活かす、新卒・中途採用", headline: "バイリンガル人材・新卒バイリンガル人材",
  heroTitle: <><span data-motion="hero-line">バイリンガル人材・</span><span data-motion="hero-line">新卒バイリンガル人材</span><span data-motion="hero-line"><em>採用支援</em></span></>,
  ctaLabel: "バイリンガル人材の採用相談", lead: description, icon: "language",
  roles: [
    { title: "海外営業", copy: "中国語圏の取引先との連絡・提案など、営業活動を担う仕事。", tags: ["顧客対応", "商談", "社内外の調整"] },
    { title: "営業事務", copy: "書類の確認や受発注、社内外との連絡などを支える仕事。", tags: ["受発注", "資料作成", "連絡・調整"] },
    { title: "カスタマーサポート", copy: "日本語・中国語で、お客様からの問い合わせに対応する仕事。", tags: ["問い合わせ対応", "サービス案内", "情報共有"] },
  ],
  points: [
    { title: "業務で使う言語", copy: "会話・メール・資料作成など、実務で求められる日本語と中国語の使い方を確認します。" },
    { title: "実務経験・専門性", copy: "業界知識、顧客対応、事務処理など、業務を担ううえで必要な経験を整理します。" },
    { title: "新卒バイリンガル採用", copy: "専攻・学生時代の経験・語学力から人材像を整理し、入社時に必要な力と育成する内容を分けて考えます。" },
  ],
};
export default function Page() { return <SpecialtyPage content={content} />; }
