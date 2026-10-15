import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Action, Arrow, Breadcrumb, Eyebrow } from "@/components/recruitment/Recruitment";
import ServiceJsonLd from "@/components/recruitment/ServiceJsonLd";

const description = "フィジカルAI・ロボティクス・AI人材の採用支援。開発テーマに合わせた要件整理から、人材紹介・選考まで支援します。初回相談は無料です。";
export const metadata: Metadata = {
  title: "フィジカルAI・ロボティクス・AI人材の採用支援｜OwlMatch",
  description,
  alternates: { canonical: "/service/physical-ai" },
  openGraph: { title: "フィジカルAI・ロボティクス・AI人材の採用支援｜OwlMatch", description, url: "/service/physical-ai" },
};

const concerns = [
  { label: "実機への実装", question: <>AIを実機で動かせる<br />人材が見つからない。</>, support: "実機経験者のご紹介", detail: "制御やセンサー連携を経験した中国人材を探します。" },
  { label: "専門領域の選定", question: <>制御・認識・学習、<br />どの専門性が必要か迷う。</>, support: "技術領域・役割の整理", detail: "開発テーマから、必要な技術と担当範囲を整理します。" },
  { label: "研究から実装", question: <>研究の実績だけでは、<br />実装経験が見えない。</>, support: "開発経験の具体化", detail: "使用した実機・開発環境・本人の担当範囲を確認します。" },
];
const fields = [
  { title: "ロボット制御", examples: "ROS 2・動作計画" },
  { title: "知覚・画像認識", examples: "画像認識・SLAM" },
  { title: "シミュレーション", examples: "Isaac Sim・検証" },
  { title: "ロボット学習", examples: "模倣学習・強化学習" },
  { title: "AIモデル開発", examples: "機械学習・生成AI" },
  { title: "データ分析・基盤", examples: "分析・データ処理" },
];
const steps = [
  { title: "ご相談", copy: "開発テーマ・採用課題の共有" },
  { title: "要件整理", copy: "経験・スキル・勤務条件の確認" },
  { title: "人材紹介・選考", copy: "候補者の紹介・選考日程の調整" },
];

export default function PhysicalAiPage() {
  return <main id="main" className="om-page om-physical-lp">
    <ServiceJsonLd name="OwlMatch フィジカルAI・ロボティクス・AI人材の採用支援" description={description} path="/service/physical-ai" />
    <div className="om-wrap"><Breadcrumb current="フィジカルAI・ロボティクス・AI人材" /></div>

    <section className="om-wrap om-plp-hero" aria-labelledby="physical-ai-title">
      <div className="om-plp-hero-copy">
        <Eyebrow>中国人材の採用支援</Eyebrow>
        <h1 id="physical-ai-title"><span data-motion="hero-line">フィジカルAI・</span><span data-motion="hero-line">ロボティクス・AI人材</span><span data-motion="hero-line"><em>採用支援</em></span></h1>
        <p className="om-plp-lead">中国の技術力を、日本の開発現場へ。<br />採用要件の整理から、人材紹介・選考まで。</p>
        <Action href="/contact">採用について相談する</Action>
        <p className="om-plp-hero-note">初回相談無料<span aria-hidden="true"> ／ </span>新卒・中途に対応</p>
      </div>
      <figure className="om-plp-photo">
        <div data-motion="hero-photo"><Image src="/images/consultation/physical-ai-lab.webp" alt="ロボットの動作を検証する開発現場のイメージ" width={1536} height={1024} unoptimized priority sizes="(max-width: 700px) 100vw, 50vw" /></div>
        <figcaption>画像はイメージです</figcaption>
      </figure>
    </section>

    <section className="om-plp-section om-plp-evidence om-plp-evidence-us" aria-labelledby="physical-ai-evidence">
      <div className="om-wrap">
        <div className="om-heading om-plp-heading"><Eyebrow>Global Talent</Eyebrow><h2 id="physical-ai-evidence">数字で見る中国人材</h2></div>
        <div className="om-plp-evidence-grid">
          <article className="om-plp-evidence-case">
            <div className="om-plp-case-head"><h3>米国機関のAI研究者</h3><span>2025年論文</span></div>
            <p className="om-plp-case-result"><strong>35.7<span>%</span></strong></p>
            <p className="om-plp-case-copy">中国の大学学部出身者の割合</p>
            <p className="om-plp-case-note">調査対象：米国機関に所属する3,514人</p>
          </article>
          <article className="om-plp-evidence-case om-plp-evidence-data">
            <div className="om-plp-case-head"><h3>世界のAI研究者</h3><span>2025年論文</span></div>
            <p className="om-plp-case-result"><strong>57.4<span>%</span></strong></p>
            <p className="om-plp-case-copy">中国の大学学部出身者の割合</p>
            <p className="om-plp-case-note">調査対象：経歴を確認できた10,280人</p>
          </article>
        </div>
        <p className="om-plp-evidence-note">NeurIPS 2025採択論文の著者を対象とした調査（所属先は2026年時点）。国籍・民族別やフィジカルAI限定の集計ではありません。</p>
        <aside className="om-plp-technology" aria-labelledby="physical-ai-technology">
          <div><span>2026.06 / 技術事例</span><h3 id="physical-ai-technology">人型ロボットの開発基盤</h3></div>
          <p>NVIDIAが、中国Unitreeの機体とIsaac GR00Tを組み合わせた研究用設計を発表。AIとロボットの制御・学習をつなぐ取り組みです。<small>製品は2026年後半の提供予定として発表。</small></p>
        </aside>
        <details className="om-plp-references">
          <summary>出典・集計方法</summary>
          <ul>
            <li><a href="https://carnegieendowment.org/features/whos-ahead-in-the-global-ai-talent-race" target="_blank" rel="noopener noreferrer">Carnegie：Who’s Ahead in the Global AI Talent Race?</a>（2026年9月23日公開）／ <a href="https://assets.carnegieendowment.org/files/Ma_AI%20Talent-2026-updated.pdf" target="_blank" rel="noopener noreferrer">原図・調査方法</a>（PDF 7–8頁）</li>
            <li>NeurIPS 2025の著者25,677人のうち、学部・大学院・所属先の経歴が揃う10,280人を集計した非無作為標本。割合は学部所在地で分類し、中国に香港を含みます。所属国は機関・雇用主の所在国に基づき、本人の勤務地と異なる場合があります。</li>
            <li>華僑・華人全体の割合ではありません。海外の大学学部を卒業した中国系人材は、その大学の所在地に分類されます。</li>
            <li><a href="https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-NVIDIA-Isaac-GR00T-Reference-Humanoid-Robot-for-Academic-Research/default.aspx" target="_blank" rel="noopener noreferrer">NVIDIA：Isaac GR00T研究用人型ロボットの発表</a>（2026年6月1日）。中国企業の技術を組み込んだ開発事例であり、中国籍・中国系エンジニアの人数や採用実績を示すものではありません。</li>
          </ul>
        </details>
        <p className="om-plp-evidence-note">公開調査・技術事例の紹介であり、当社の紹介実績や提携を示すものではありません。</p>
      </div>
    </section>

    <section className="om-wrap om-plp-section om-plp-bridge" aria-labelledby="physical-ai-fields">
      <div className="om-heading om-plp-heading"><h2 id="physical-ai-fields">貴社の開発テーマ</h2><p>その専門性を、貴社の開発へ。</p></div>
      <div className="om-plp-fields">{fields.map(field => <article key={field.title}><h3>{field.title}</h3><p>{field.examples}</p></article>)}</div>
    </section>

    <section className="om-plp-section om-plp-concerns" aria-labelledby="physical-ai-support">
      <div className="om-wrap">
        <div className="om-heading om-plp-heading"><Eyebrow>Support</Eyebrow><h2 id="physical-ai-support">フィジカルAI採用</h2><p>研究・学習から、実機への実装まで。開発段階に合う人材探しを支援します。</p></div>
        <div className="om-plp-concern-grid">{concerns.map(concern => <article className="om-plp-concern" key={concern.label}>
          <div className="om-plp-question"><span>{concern.label}</span><p>{concern.question}</p></div>
          <div className="om-plp-answer"><span>OwlMatchの支援</span><h3>{concern.support}</h3><p>{concern.detail}</p></div>
        </article>)}</div>
        <p className="om-plp-disclaimer">ご紹介の可否は、採用条件と候補者の状況により異なります。</p>
      </div>
    </section>

    <section className="om-plp-section om-plp-process" aria-labelledby="physical-ai-process">
      <div className="om-wrap">
        <div className="om-heading om-plp-heading"><Eyebrow>Process</Eyebrow><h2 id="physical-ai-process">採用の流れ</h2></div>
        <ol className="om-plp-steps">{steps.map((step, index) => <li key={step.title}><span className="om-plp-step-number" aria-hidden="true">0{index + 1}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div></li>)}</ol>
        <Link className="om-text-link om-plp-process-link" href="/service/process">採用の流れ・料金の詳細 <Arrow /></Link>
      </div>
    </section>

    <section className="om-plp-section om-plp-contact" aria-labelledby="physical-ai-contact">
      <div className="om-wrap om-plp-contact-inner">
        <div className="om-heading om-plp-heading"><Eyebrow>Contact</Eyebrow><h2 id="physical-ai-contact">採用のご相談</h2><p>必要な人材像の整理から、ご相談を承ります。</p></div>
        <div className="om-plp-contact-action"><Action href="/contact">無料相談のお申し込み</Action><p>初回相談無料</p></div>
      </div>
    </section>
  </main>;
}
