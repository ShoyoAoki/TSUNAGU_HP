import type { Metadata } from "next";
import { Action, Breadcrumb, EmployerCta, Eyebrow, Faq } from "@/components/recruitment/Recruitment";
export const metadata: Metadata = { title: "採用の進め方・よくある質問｜OwlMatch", description: "OwlMatchの中国人材採用支援の進め方。ご相談、要件整理、候補者のご紹介、選考・入社までの流れと、費用や在留資格の相談範囲をご案内します。", alternates: { canonical: "/service/process" } };
export default function ProcessPage() {
  return <main id="main" className="om-page"><div className="om-wrap"><Breadcrumb current="採用の進め方" /></div><section className="om-wrap om-detail-hero om-process-hero"><div><Eyebrow>採用の進め方</Eyebrow><h1><span data-motion="hero-line">ご相談から</span><span data-motion="hero-line"><em>採用の一歩を具体的に</em></span></h1><p className="om-hero-lead">必要な人材、費用、選考の流れ。<br />気になっていることから、ご相談いただけます。</p><Action>採用について相談する</Action></div></section>
    <section className="om-section om-pale"><div className="om-wrap"><div className="om-heading"><Eyebrow>ご相談から入社まで</Eyebrow><h2>採用に向けて<br />条件と進め方を整理します</h2></div><ol className="om-process-list">{[
      ["採用相談のお申し込み", "フォームに会社名・連絡先と、ご相談内容をご記入ください。担当者から連絡し、相談日時と実施方法を調整します。"],
      ["仕事内容・採用条件の確認", "仕事内容、必要なスキル・日本語力、勤務地、採用時期の希望を伺います。サービスの料金や契約条件もご説明します。"],
      ["候補者の確認・ご紹介", "ご希望条件をもとに候補者の状況を確認します。ご紹介できる場合は、候補者の経験や希望をご案内します。"],
      ["選考・条件の確認", "貴社の選考を進めるため、面接日程などを調整します。専門スキルを含む採用判断は、貴社の選考で確認いただきます。"],
      ["入社に向けた調整・ご相談", "労働条件の確認や入社日の調整をお手伝いします。在留資格・申請手続きについては、ご相談を承ります。"],
    ].map(([title, copy], index) => <li key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol></div></section>
    <section className="om-section om-wrap om-support-grid"><div className="om-heading"><Eyebrow>費用・契約条件</Eyebrow><h2>初回の採用相談は<br />無料です</h2></div><div className="om-explainer"><p>人材紹介サービスの料金、費用が発生する時期、契約条件は、採用内容を確認したうえで個別にご案内します。</p><p>候補者の紹介可否や採用時期は、ご希望条件と候補者の状況によって異なります。</p></div></section>
    <Faq /><EmployerCta /></main>;
}
