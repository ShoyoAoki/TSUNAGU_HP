import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, CandidateCta, Concerns, Eyebrow, Faq, PhotoHero, candidateFaq } from "@/components/recruitment/Recruitment";
import ServiceJsonLd from "@/components/recruitment/ServiceJsonLd";

export const metadata: Metadata = {
  title: "中国人の方専用｜日本での就職・転職支援 OwlMatch",
  description: "中国人の方専用の就職・転職支援。OwlMatchでは求人紹介、応募書類・面接の準備から入社後の相談まで支援します。新卒・既卒・転職の方へ、日本語・中国語で無料オンライン面談を行います。",
  alternates: { canonical: "/" },
  openGraph: { title: "中国人の方専用｜日本での就職・転職支援 OwlMatch", description: "求人紹介から応募書類・面接の準備まで。中国人の方の日本での仕事探しを、日本語・中国語でサポートします。", url: "/" },
};
export default function Home() {
  return <main id="main" className="om-page">
    <ServiceJsonLd name="OwlMatch 中国人の方の就職・転職支援" description="中国人の方を対象に、求人紹介、応募書類・面接の準備から入社後の相談まで支援します。日本語・中国語で無料オンライン面談を行います。" path="/" />
    <PhotoHero />
    <Concerns />
    <section className="om-section om-wrap om-support-grid"><div className="om-heading"><Eyebrow>中国人の就職・転職を支えるOwlMatch</Eyebrow><h2>OwlMatchの<br />就職・転職支援</h2><p>まだ応募したい仕事が決まっていなくても、<br />いま考えていることからお話しください。</p></div><div className="om-support-points">{[
      ["話す", "日本語・中国語対応", "話しやすい言語で、経験や希望を伺います。オンラインで面談します。"],
      ["整理する", "仕事選び・応募準備", "希望する仕事や働き方を伺い、応募に向けて必要な準備を一緒に整理します。"],
      ["相談する", "無料の就職・転職相談", "ご相談にあたり、ご本人から費用はいただきません。当社の手数料は、採用企業からいただきます。"],
    ].map(([label, title, copy]) => <article key={label}><span>{label}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></section>
    <section className="om-section om-pale"><div className="om-wrap"><div className="om-heading"><Eyebrow>無料面談までの流れ</Eyebrow><h2>無料面談までの3ステップ</h2></div><ol className="om-steps">{[
      ["登録・希望日時の入力", "新卒・既卒、または転職の入口から登録し、面談の希望日時を入力します。"],
      ["メール確認・日程調整", "登録後に届くメールから、メールアドレスを確認します。その後、担当者と面談日時を調整します。"],
      ["オンラインで無料面談", "ご経験や希望、いまの悩みをお聞きします。仕事選びや応募の進め方を一緒に考えます。"],
    ].map(([title, copy], i) => <li key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol><p className="om-fine-print">希望日時の入力だけでは、面談の予約は確定しません。</p></div></section>
    <Faq questions={candidateFaq} />
    <CandidateCta />
    <section className="om-wrap om-employer-entry"><div><Eyebrow>採用担当者の皆様へ</Eyebrow><h2>中国人材の採用支援</h2><p>フィジカルAI・ロボティクス・AI人材、バイリンガル人材・新卒バイリンガル人材、インターンの採用をご相談いただけます。</p></div><Link className="site-button site-button-orange" href="/service">企業向けの採用支援を見る<Arrow /></Link></section>
  </main>;
}
