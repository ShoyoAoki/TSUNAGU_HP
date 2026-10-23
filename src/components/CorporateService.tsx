import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import ServiceJsonLd from "./recruitment/ServiceJsonLd";
import s from "./CorporateService.module.css";
import { zh } from "@/lib/i18n/zh";
export { s };
type Locale = "ja" | "zh";
const prefix = (locale: Locale) => locale === "zh" ? "/zh" : "";
export const services = [
 {slug:"physical-ai",en:"PHYSICAL AI",title:"フィジカルAI人材",copy:"新卒人材のみをご紹介。開発テーマに合わせ、大学・大学院での研究・制作経験を確認します。",image:"/images/corporate-hero/physical-ai-robot-only.png"},
 {slug:"bilingual",en:"BILINGUAL",title:"日中バイリンガル人材",copy:"海外営業・営業事務・顧客対応。二つの言語を使う実務と経験をつなぎます。",image:"/images/corporate-hero/bilingual.png"},
 {slug:"internship",en:"INTERNSHIP",title:"インターン採用",copy:"任せる仕事と学業の両立から、学生が力を発揮できる受入条件を整えます。",image:"/images/corporate-hero/campus.png"},
];
const ja = {
 breadcrumb:"パンくず",consult:"採用について相談する",imageNote:"画像はイメージです",more:"詳しく見る",
 process:<>要件から<br/>入社後まで</>,closingHeading:<>必要な人材を<br/>一緒に考える</>,closingCopy:"採用要件が固まる前から、ご相談いただけます。",closingButton:"採用のご相談",
 notes:["ご紹介の対象はJLPT N1取得者です。資格に加え、業務に必要な経験・日本語での実務対応を確認します。","在留資格・申請手続きについては、ご相談を承ります。","株式会社TSUNAGU　有料職業紹介事業許可番号：46-ユ-300221"],
 related:"その他のサービス",list:"サービス一覧",
};
const zhText = {
 ...zh.service,
 process:<>{zh.service.process[0]}<br/>{zh.service.process[1]}</>,closingHeading:<>{zh.service.closing.heading[0]}<br/>{zh.service.closing.heading[1]}</>,closingCopy:zh.service.closing.copy,closingButton:zh.service.closing.button,
};
const text = (locale: Locale) => locale === "zh" ? zhText : ja;
export function RoundArrow(){return <span className={s.arrow}><ArrowUpRight aria-hidden="true"/></span>}
export function ServiceShell({title,description,path,children,locale="ja"}:{title:string;description:string;path:string;children:ReactNode;locale?:Locale}){return <main id="main" className={s.page} lang={locale==="zh"?"zh-Hans":undefined}><ServiceJsonLd name={`TSUNAGU ${title}`} description={description} path={path}/>{children}</main>}
export function ServiceHero({label,title,lead,image,index=false,locale="ja"}:{label:string;title:ReactNode;lead:string;image:string;index?:boolean;locale?:Locale}){const t=text(locale);const p=prefix(locale);return <header className={`${s.hero} ${index?s.indexHero:""}`}><svg viewBox="0 0 1440 680" preserveAspectRatio="none" aria-hidden="true"><path d="M-100 560C200 680 460 80 770 170S1200 690 1550 390" fill="none" stroke="#e2f3f8" strokeWidth="160"/></svg><div className={s.wrap}><nav className={s.breadcrumb} aria-label={t.breadcrumb}><Link href={p||"/"}>HOME</Link><span>/</span>{index?<span>SERVICE</span>:<><Link href={`${p}/service`}>SERVICE</Link><span>/</span><span>{label}</span></>}</nav><div className={s.heroGrid}><div className={s.heroCopy}><p className={s.eyebrow}>{label}</p><h1>{title}</h1><p className={s.lead}>{lead}</p><Link className={s.textLink} href={`${p}/contact`}>{t.consult}<RoundArrow/></Link></div><figure className={s.heroPhoto}><Image src={image} alt="" width={1200} height={900} priority sizes="(max-width:700px) 100vw, 55vw"/><figcaption>{t.imageNote}</figcaption></figure></div></div></header>}
export function SectionHeading({en,children,copy}:{en:string;children:ReactNode;copy?:string}){return <div className={s.heading}><p className={s.eyebrow}>{en}</p><h2>{children}</h2>{copy&&<p>{copy}</p>}</div>}
export function ServiceCards({exclude,locale="ja"}:{exclude?:string;locale?:Locale}){const t=text(locale);const p=prefix(locale);return <div className={s.cards}>{services.filter(item=>item.slug!==exclude).map(item=>{const copy=locale==="zh"?zh.service.cards[item.slug]:item;return <Link className={s.card} href={`${p}/service/${item.slug}`} key={item.slug}><Image src={item.image} alt="" width={1200} height={900} sizes="(max-width:700px) 90vw, 33vw"/><div><small>{item.en}</small><h3>{copy.title}</h3><p>{copy.copy}</p><span className={s.cardMore}>{t.more}<RoundArrow/></span></div></Link>})}</div>}
export function ServiceProcess({steps,locale="ja"}:{steps:[string,string][];locale?:Locale}){const t=text(locale);return <section className={s.process}><div className={`${s.wrap} ${s.processGrid}`}><SectionHeading en="PROCESS">{t.process}</SectionHeading><ol>{steps.map(([title,copy],i)=><li key={title}><span>0{i+1}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol></div></section>}
export function ServiceEnd({exclude,locale="ja"}:{exclude?:string;locale?:Locale}){const t=text(locale);const p=prefix(locale);return <><section className={s.closing}><div className={s.wrap}><div className={s.closingGrid}><div><p className={s.eyebrow}>CONTACT</p><h2>{t.closingHeading}</h2><p>{t.closingCopy}</p></div><Link className={s.contactLink} href={`${p}/contact`}>{t.closingButton}<RoundArrow/></Link></div><div className={s.notes}>{t.notes.map(note=><p key={note}>{note}</p>)}</div></div></section>{exclude&&<section className={`${s.wrap} ${s.related}`}><div className={s.relatedHeading}><h2>{t.related}</h2><Link href={`${p}/service`}>{t.list}<ArrowUpRight size={18}/></Link></div><ServiceCards exclude={exclude} locale={locale}/></section>}</>}
