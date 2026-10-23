import type { Metadata } from "next";
import { ServiceShell, ServiceHero, SectionHeading, ServiceProcess, ServiceEnd, s } from "@/components/CorporateService";
const description="フィジカルAI・ロボティクス・AI分野の新卒人材に限定した採用支援。開発テーマ、技術領域、実機・開発環境、大学・大学院での研究や実習経験から採用要件を整理します。";
export const metadata:Metadata={title:{absolute:"フィジカルAI新卒人材の採用支援｜株式会社TSUNAGU"},description,alternates:{canonical:"/service/physical-ai"},openGraph:{title:"フィジカルAI新卒人材の採用支援｜株式会社TSUNAGU",description,url:"/service/physical-ai"}};
const fields=[
 ["ロボット制御","動作計画や制御の実装・検証。対象機体と制御範囲を整理します。",["ROS 2","動作計画","制御"]],
 ["知覚・画像認識","カメラやセンサーから環境を捉える処理。扱うデータと評価方法を確認します。",["画像認識","SLAM","センサー"]],
 ["シミュレーション・学習","仮想環境での検証や学習。実機への移行で担う役割を整理します。",["Isaac Sim","模倣学習","強化学習"]],
 ["AIモデル・データ基盤","モデル開発、データ処理、評価。研究と運用のどちらを担うかを明確にします。",["機械学習","モデル評価","データ処理"]],
] as const;
export default function Page(){return <ServiceShell title="フィジカルAI新卒人材の採用支援" description={description} path="/service/physical-ai">
 <ServiceHero label="PHYSICAL AI" title={<>技術を<br/>実装する人へ</>} lead="フィジカルAI・ロボティクス・AI分野の新卒人材に限定した採用支援。開発テーマから必要な専門性を整理し、大学・大学院での研究・制作経験を具体的な担当業務につなげます。" image="/images/corporate-hero/physical-ai-robot-only.png"/>
 <section className={`${s.wrap} ${s.section}`}><SectionHeading en="TECHNICAL FIELDS" copy="技術名を並べるだけでなく、開発工程のどこを担う人材が必要かを整理します。以下は採用要件を考える際の領域例です。">開発テーマから<br/>必要な専門性へ</SectionHeading><div className={s.technical}>{fields.map(([title,copy,tags])=><article key={title}><h3>{title}</h3><p>{copy}</p><div className={s.tags}>{tags.map(tag=><span key={tag}>{tag}</span>)}</div></article>)}</div>
 <div className={s.panel}><h3>経験を具体的に確認する</h3><div className={s.checks}>{[["実機・開発環境","使用した機体、センサー、言語、フレームワークを確認します。"],["本人の担当範囲","チーム全体の成果と本人の設計・実装・検証を分けて確認します。"],["検証と改善","どの課題に取り組み、どう評価し、何を改善したかを確認します。"]].map(([title,copy])=><div key={title}><h4>{title}</h4><p>{copy}</p></div>)}</div></div></section>
 <section className={`${s.wrap} ${s.section} ${s.split}`}><SectionHeading en="ROLE DESIGN">研究と開発を<br/>役割でつなぐ</SectionHeading><div className={s.rows}>{[["新卒採用","研究テーマや制作経験、基礎知識、学習の進め方を確認。入社時に求める力と育成する範囲を整理します。"],["配属と育成","研究や実習で身につけた力を確認し、配属先で任せる業務と入社後に学ぶ範囲を整理します。"]].map(([title,copy])=><article className={s.row} key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
 <ServiceProcess steps={[["開発課題の共有","対象製品、開発段階、チーム構成と不足している役割を伺います。"],["技術要件と経験の整理","必須技術、実機経験、担当範囲、勤務条件を具体化します。"],["候補者の紹介・選考","候補者の経験を確認してご紹介し、技術面接の日程調整や連絡を支援します。"],["入社・定着の相談","入社条件の確認と、配属後の相談に対応します。"]]}/>
 <ServiceEnd exclude="physical-ai"/>
 </ServiceShell>}
