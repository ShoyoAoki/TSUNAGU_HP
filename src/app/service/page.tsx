import type { Metadata } from "next";
import { ServiceShell, ServiceHero, SectionHeading, ServiceCards, ServiceProcess, ServiceEnd, s } from "@/components/CorporateService";
const description="株式会社TSUNAGUの採用支援。フィジカルAI分野の新卒人材、日中バイリンガル人材、インターンの3領域で、担当業務と必要な経験から採用要件を整理します。";
export const metadata:Metadata={title:{absolute:"採用支援サービス｜株式会社TSUNAGU"},description,alternates:{canonical:"/service"},openGraph:{title:"採用支援サービス｜株式会社TSUNAGU",description,url:"/service"}};
export default function Page(){return <ServiceShell title="採用支援サービス" description={description} path="/service">
 <ServiceHero index label="SERVICE / 採用支援サービス" title={<>専門性を<br/>事業の力へ</>} lead="フィジカルAI分野の新卒採用、日中バイリンガル人材の採用、インターン採用。任せたい仕事から必要な人材像を整理し、採用と定着を支援します。" image="/images/corporate-hero/bilingual.png"/>
 <section className={s.blue}><div className={s.wrap}><SectionHeading en="OUR SERVICES">3つの採用支援</SectionHeading><ServiceCards/></div></section>
 <ServiceProcess steps={[["採用要件の整理","担当業務、必要な経験、勤務条件、採用時期を伺います。必須条件と入社後に育成する内容を分けて考えます。"],["候補者のご紹介・選考","要件に合わせて候補者をご紹介し、面接の日程調整や選考中の連絡を支援します。"],["入社・定着の相談","条件の確認から入社後の相談まで対応します。料金や契約条件は、ご相談時にご説明します。"]]}/>
 <ServiceEnd/>
 </ServiceShell>}
