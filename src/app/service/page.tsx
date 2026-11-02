import type { Metadata } from "next";
import Link from "next/link";
import { ServiceShell, ServiceHero, SectionHeading, ServiceCards, ServiceProcess, ServiceEnd, RoundArrow, s } from "@/components/CorporateService";
import JsonLd from "@/components/JsonLd";
import { guideArticles } from "@/content/guide";
import { serviceIndex as c } from "@/content/service-index";
import p from "./service-index.module.css";
const { title, description } = c.meta;
export const metadata:Metadata={title:{absolute:title},description,alternates:{canonical:"/service"},openGraph:{title,description,url:"/service"},twitter:{title,description}};
export default function Page(){return <ServiceShell title="中国人材採用" description={description} path="/service">
 <JsonLd data={{"@context":"https://schema.org","@type":"FAQPage",mainEntity:c.faq.items.map(item=>({"@type":"Question",name:item.q,acceptedAnswer:{"@type":"Answer",text:item.a}}))}}/>
 <ServiceHero index label="SERVICE / 採用支援サービス" title={<>中国人材採用<span className={p.heroSub}>専門性を事業の力へ</span></>} lead="フィジカルAI分野の新卒採用、日中バイリンガル人材の採用、インターン採用。中国出身の人材の採用を、任せたい仕事の整理から入社後の定着まで支援します。" image="/images/corporate-hero/bilingual.png"/>
 <section className={s.blue}><div className={s.wrap}><SectionHeading en="OUR SERVICES">3つの採用支援</SectionHeading><ServiceCards/></div></section>
 <ServiceProcess steps={[["採用要件の整理","担当業務、必要な経験、勤務条件、採用時期を伺います。必須条件と入社後に育成する内容を分けて考えます。"],["候補者のご紹介・選考","要件に合わせて候補者をご紹介し、面接の日程調整や選考中の連絡を支援します。"],["入社・定着の相談","条件の確認から入社後の相談まで対応します。料金や契約条件は、ご相談時にご説明します。"]]}/>
 <section className={`${s.wrap} ${s.section} ${s.split}`} aria-labelledby="cost-title"><SectionHeading en={c.cost.en}><span id="cost-title">{c.cost.title}</span></SectionHeading><div className={p.cost}>{c.cost.paragraphs.map(para=><p key={para}>{para}</p>)}<Link className={p.textLink} href={c.cost.link.href}>{c.cost.link.label} →</Link></div></section>
 <section className={`${s.wrap} ${s.section}`} aria-labelledby="guide-title"><div className={p.guideHead}><SectionHeading en={c.guide.en}><span id="guide-title">{c.guide.title}</span></SectionHeading><Link className={p.textLink} href={c.guide.listLink.href}>{c.guide.listLink.label} →</Link></div><ul className={p.guideList}>{guideArticles.map(article=><li key={article.slug}><Link href={`/guide/${article.slug}`}>{article.title}<RoundArrow/></Link></li>)}</ul><p className={p.dataLink}><Link href={c.guide.dataLink.href}>{c.guide.dataLink.label} →</Link></p></section>
 <section id="faq" className={`${s.wrap} ${s.section} ${s.split} ${p.faqSection}`} aria-labelledby="faq-title"><SectionHeading en={c.faq.en}><span id="faq-title">{c.faq.title}</span></SectionHeading><div className={p.faq}>{c.faq.items.map(item=><details key={item.q}><summary>{item.q}<span aria-hidden="true">＋</span></summary><p>{item.a}</p></details>)}</div></section>
 <ServiceEnd/>
 </ServiceShell>}
