import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { employerContact, candidateSignup } from "@/components/site/navigation";

export function Arrow() { return <span aria-hidden="true" className="om-arrow">↗</span>; }
export function Action({ children, href = employerContact, white = false }: { children: ReactNode; href?: string; white?: boolean }) {
  return <Link className={`om-action${white ? " om-action-white" : ""}`} href={href}>{children}<Arrow /></Link>;
}
export function Eyebrow({ children }: { children: ReactNode }) { return <p className="om-eyebrow">{children}</p>; }
export function PhotoHero({ employer = false }: { employer?: boolean }) {
  return <section className={`om-wrap om-hero${employer ? " om-employer-hero" : ""}`}>
    <div className="om-hero-copy">
      <Eyebrow>{employer ? "中国人材の採用をお考えの企業様へ" : "中国人の方専用"}</Eyebrow>
      <h1>{employer ? <><span data-motion="hero-line">中国人材の</span><span data-motion="hero-line"><em>採用支援</em></span></> : <><span data-motion="hero-line">中国人のための</span><span data-motion="hero-line">日本での</span><span data-motion="hero-line"><em>就職・転職支援</em></span></>}</h1>
      <p className="om-hero-lead">{employer ? <>フィジカルAI・ロボティクス・AI人材、<br />バイリンガル人材・新卒バイリンガル人材、インターン採用。<br />3つの領域で、中国人材の採用を支援します。</> : <>求人紹介から、応募書類・面接の準備まで。<br />日本語・中国語で、仕事探しをサポートします。</>}</p>
      <Action href={employer ? employerContact : candidateSignup}>{employer ? "採用について相談する" : "無料面談に申し込む"}</Action>
      <p className="om-hero-meta">{employer ? "初回相談無料・アカウント登録不要" : "新卒・既卒・転職の方へ"}<span>{employer ? "採用条件が決まる前から、ご相談いただけます。" : "日本語・中国語 ／ オンライン"}</span></p>
      <p className="om-fine-print">{employer ? "送信後、担当者から日程調整のご連絡をします。" : "登録後にメールを確認し、面談日程を調整します。"}</p>
    </div>
    <figure className="om-hero-visual"><div className="om-hero-image-frame" data-motion="hero-photo"><Image src="/images/consultation/hero.webp" unoptimized alt="明るいオフィスで話し合う人たち" width={941} height={1672} priority sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 42vw" /></div><figcaption>写真はイメージです</figcaption></figure>
  </section>;
}
type Concern = { label: string; question: ReactNode; title: ReactNode; description: string };
const employerConcerns: Concern[] = [
  { label: "人材探し", question: <>中国語を使える人材が、<br />なかなか見つからない。</>, title: <>日中バイリンガル<br />人材のご紹介</>, description: "仕事内容と必要な語学力を伺い、条件に合う候補者をお探しします。" },
  { label: "スキルの見極め", question: <>技術や経験が、<br />仕事に合うか不安。</>, title: <>専門スキルに合う<br />人材の探索</>, description: "開発内容や必要な経験を整理し、フィジカルAI・ロボティクス・AI分野の候補者を探します。" },
  { label: "新卒採用", question: <>新卒採用では、<br />何を見ればいいか迷う。</>, title: <>学び・希望と<br />人材像の整理</>, description: "専攻や取り組んできたこと、希望職種を踏まえ、入社後の役割を考えます。" },
  { label: "初めての中国人材採用", question: <>費用も進め方も、<br />まだよく分からない。</>, title: <>採用費用・<br />選考の流れ</>, description: "料金・契約条件と、候補者のご紹介から選考・入社までの流れをご説明します。" },
];
const candidateConcerns: Concern[] = [
  { label: "仕事選び", question: <>自分に合う仕事が<br />見つからない。</>, title: <>希望に合う<br />求人のご紹介</>, description: "経験・得意なこと・働き方の希望を伺い、条件に合う求人をご案内します。" },
  { label: "書類・面接", question: <>書類や面接で、<br />うまく伝えられない。</>, title: <>応募書類の作成・<br />面接対策</>, description: "これまでの経験を整理し、応募書類の作成や面接の準備をサポートします。" },
  { label: "初めての就職", question: <>職歴がなく、<br />何を伝えればいいか迷う。</>, title: <>学生時代の経験・<br />強みの整理</>, description: "学んだことや取り組んだことを振り返り、応募先に伝える内容を一緒に考えます。" },
  { label: "入社前・入社後", question: <>条件や入社後のこと、<br />誰に聞けばいい？</>, title: <>条件の確認・<br />入社後の相談</>, description: "労働条件の確認・入社日調整をお手伝いし、入社後のご相談にも対応します。" },
];
export function Concerns({ employer = false }: { employer?: boolean }) {
  return <section className="om-section om-concerns"><div className="om-wrap">
    <div className="om-heading om-heading-split"><div><Eyebrow>{employer ? "採用担当者の皆様へ" : "仕事選びから応募まで"}</Eyebrow><h2>{employer ? "中国人材採用のお悩み" : "就職・転職のお悩み"}</h2></div><p>{employer ? <>まだ採用条件が決まっていなくても大丈夫。<br />いまのお困りごとから、お話しください。</> : "仕事選びや応募の進め方を、一緒に考えます。"}</p></div>
    <div className="om-concern-grid">{(employer ? employerConcerns : candidateConcerns).map((item) => <article className="om-concern-card" key={item.label}><div className="om-concern-top"><p className="om-concern-label">{item.label}</p><p className="om-concern-question">{item.question}</p></div><div className="om-concern-support"><span>OwlMatchでできること</span><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div>
    <p className="om-fine-print">{employer ? "ご紹介できる人材は、ご希望条件と候補者の状況により個別に確認します。" : "ご紹介できる求人は、ご希望の条件や募集状況によって異なります。"}</p>
  </div></section>;
}
export const specialties = [
  { slug: "bilingual", kicker: "日本語と中国語を活かす採用", title: "バイリンガル人材・新卒バイリンガル人材", description: "海外営業・営業事務・カスタマーサポートなど。実務経験者と新卒の両面から、語学力を活かせる人材の採用を支援します。", tags: ["中途採用", "新卒採用", "日本語・中国語"], icon: "language" },
  { slug: "internship", kicker: "学生の力を、事業の現場へ", title: "インターン採用", description: "中国語を活かす業務を中心に、学生インターンの採用を支援します。担当業務・勤務条件を整理し、候補者をお探しします。", tags: ["学生インターン", "業務内容の整理", "勤務条件の確認"], icon: "graduate" },
];
export function TechnicalScope({ compact = false }: { compact?: boolean }) {
  const fields = [
    ["ロボット制御", "ROS 2 / C++ / 動作計画"],
    ["知覚・画像認識", "画像認識 / SLAM"],
    ["シミュレーション", "Isaac Sim / 検証・評価"],
    ["ロボット学習", "模倣学習 / 強化学習"],
  ];
  return <div className={`om-service-scope${compact ? " om-scope-compact" : ""}`}>
    <p className="om-scope-caption">ご相談いただける技術領域</p>
    <dl>{fields.map(([field, examples]) => <div key={field}><dt>{field}</dt><dd>{examples}</dd></div>)}</dl>
    <p className="om-scope-note">開発テーマと担当業務から、必要な経験を整理します。</p>
  </div>;
}
export function ServiceOverview() {
  return <section className="om-section om-wrap">
    <div className="om-heading om-heading-split"><div><Eyebrow>採用をご相談いただける領域</Eyebrow><h2>3つの採用支援</h2></div><p>専門スキル・語学力・経験を整理し、<br />ご希望に合う候補者をお探しします。</p></div>
    <Link href="/service/physical-ai" className="om-physical-feature"><div className="om-feature-copy"><Eyebrow>Physical AI / Robotics / AI</Eyebrow><h3>フィジカルAI・<br />ロボティクス・AI人材</h3><p>ロボット制御からAIモデル開発・データ分析まで。<br />開発テーマに合う中国人材の採用を支援します。</p><span className="om-text-link">技術人材の採用支援を見る <Arrow /></span></div><figure className="om-feature-photo"><div><Image src="/images/consultation/physical-ai-lab.webp" alt="ロボットの動作を検証する開発現場のイメージ" width={1536} height={1024} unoptimized sizes="(max-width: 700px) 100vw, 45vw" /></div><figcaption>画像はイメージです</figcaption></figure></Link>
    <div className="om-specialty-grid">{specialties.map(item => <Link key={item.slug} href={`/service/${item.slug}`} className="om-specialty om-specialty-text"><p className="om-eyebrow">{item.kicker}</p><h3>{item.slug === "bilingual" ? <>バイリンガル人材・<wbr />新卒バイリンガル人材</> : item.title}</h3><p>{item.description}</p><div className="om-tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div><span className="om-text-link">詳しく見る <Arrow /></span></Link>)}</div>
    <p className="om-fine-print">掲載している技術・職種はご相談内容の一例です。ご紹介できる人材は、ご希望条件と候補者の状況により個別に確認します。</p>
  </section>;
}
export function EmployerCta() {
  return <section className="om-section om-end-cta"><div className="om-wrap om-end-inner"><div><Eyebrow>OwlMatch 法人向け無料相談</Eyebrow><h2>中国人材の<br />採用相談</h2><p>仕事内容や必要なスキルが決まる前から、ご相談いただけます。</p></div><div className="om-application"><span className="om-application-badge">初回相談無料・アカウント登録不要</span><h3>無料相談のお申し込み</h3><p>フォームに会社名・連絡先と、ご相談内容をご記入ください。担当者から相談日時の調整についてご連絡します。</p><Action white>無料相談の申込フォームへ</Action></div></div></section>;
}
export function CandidateCta() {
  return <section className="om-section om-candidate-cta"><div className="om-wrap"><div className="om-heading om-centered"><Eyebrow>中国人の方専用・無料オンライン面談</Eyebrow><h2>日本での就職・転職<br />無料オンライン面談</h2><p>現在の状況に合う入口から、お申し込みください。</p></div><div className="om-application-grid"><article><span>これから、初めての就職へ</span><h3>新卒・既卒の方</h3><p>学生の方・就業経験のない方はこちら。</p><Action white href="https://owlmatch.ai/signup?track=newgrad">新卒・既卒の方の無料面談</Action></article><article><span>経験を、次の仕事へ</span><h3>転職をお考えの方</h3><p>就業経験のある方はこちら。</p><Action white href="https://owlmatch.ai/career">転職の方の無料面談</Action></article></div><p className="om-application-note">OwlMatchへの登録後、メールアドレスを確認し、担当者と面談日時を調整します。<br />日本語・中国語対応 ／ オンライン面談</p></div></section>;
}
export const employerFaq = [
  ["採用条件が決まっていなくても相談できますか？", "はい。仕事内容や採用でお困りのことを伺い、必要な経験・スキル・語学力を一緒に整理します。"],
  ["相談は無料ですか？", "最初の採用相談は無料です。人材紹介サービスの料金や契約条件は、ご相談時にご案内します。"],
  ["在留資格についても相談できますか？", "在留資格・申請手続きについては、ご相談を承ります。申請の実務は、受入企業・候補者ご本人・ご依頼先の行政書士等が進めます。"],
  ["アカウント登録は必要ですか？", "無料相談のお申し込みに、アカウント登録は必要ありません。お問い合わせフォームからご連絡ください。"],
];
export const candidateFaq = [
  ["どのような人が対象ですか？", "日本での就職・転職を希望する中国人の方を対象としたサービスです。新卒・既卒の方も、就業経験のある方もご相談いただけます。"],
  ["職歴がなくても相談できますか？", "はい。学生時代に学んだことや取り組んだことから、一緒に強みを整理します。"],
  ["まだ転職するか決めていなくても大丈夫ですか？", "はい。ご希望や現在の状況を伺い、今後の仕事選びや活動の進め方を整理します。"],
  ["日本語に自信がなくても相談できますか？", "日本語・中国語でご相談いただけます。求人ごとに求められる言語力は異なるため、面談で確認します。"],
  ["相談には費用がかかりますか？", "ご相談にあたり、ご本人から費用はいただきません。当社の手数料は、採用企業からいただきます。"],
  employerFaq[2],
];
export function Faq({ questions = employerFaq }: { questions?: string[][] }) {
  return <section className="om-section om-wrap om-faq"><div className="om-heading"><Eyebrow>ご相談前の確認事項</Eyebrow><h2>よくあるご質問</h2></div><div>{questions.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">＋</span></summary><p>{answer}</p></details>)}</div></section>;
}
export function Breadcrumb({ current }: { current: string }) { return <nav className="om-breadcrumb" aria-label="パンくず"><Link href="/">トップ</Link><span aria-hidden="true">/</span><Link href="/service">企業の採用支援</Link><span aria-hidden="true">/</span><span aria-current="page">{current}</span></nav>; }
