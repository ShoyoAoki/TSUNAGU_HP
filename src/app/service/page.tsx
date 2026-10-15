import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, Concerns, EmployerCta, Eyebrow, Faq, PhotoHero, ServiceOverview } from "@/components/recruitment/Recruitment";
import ServiceJsonLd from "@/components/recruitment/ServiceJsonLd";

export const metadata: Metadata = {
  title: "中国人材の採用支援｜OwlMatch",
  description: "中国人材の採用を、OwlMatchにご相談ください。フィジカルAI・ロボティクス・AI人材、バイリンガル人材・新卒バイリンガル人材、インターンの採用を支援します。人材像・費用・採用の流れを無料相談で整理します。",
  alternates: { canonical: "/service" },
  openGraph: { title: "中国人材の採用支援｜OwlMatch", description: "技術人材、バイリンガル人材・新卒バイリンガル人材、インターン採用。3つの領域で中国人材の採用を支援します。", url: "/service" },
};
export default function ServicePage() {
  return <main id="main" className="om-page">
    <ServiceJsonLd name="OwlMatch 中国人材の採用支援" description="フィジカルAI・ロボティクス・AI人材、バイリンガル人材・新卒バイリンガル人材、インターン採用の3領域で中国人材の採用を支援します。" path="/service" />
    <PhotoHero employer /><Concerns employer /><ServiceOverview />
    <section className="om-section om-support-dark"><div className="om-wrap om-support-grid"><div className="om-heading"><Eyebrow>無料相談でわかること</Eyebrow><h2>人材・費用・<br />採用の流れ</h2><p>「自社の条件で採用できるか知りたい」という段階から、ご相談いただけます。</p><Link className="om-text-link" href="/service/process">採用の進め方を詳しく見る <Arrow /></Link></div><div className="om-consultation-topics">{[
      ["人材像", "紹介できる人材", "仕事内容や必要な経験・日本語力を伺い、どのような人材をご紹介できるか確認します。"],
      ["費用", "採用にかかる費用", "人材紹介の料金や、費用が発生する時期・条件をご説明します。"],
      ["進め方", "採用までの流れ", "候補者のご紹介から選考・入社までの流れと、貴社にご準備いただくことをご説明します。"],
    ].map(([label, title, copy]) => <article key={label}><span>{label}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div></section>
    <Faq /><EmployerCta />
  </main>;
}
