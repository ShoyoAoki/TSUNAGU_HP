import type { Metadata } from "next";
import Image from "next/image";
import { ServiceShell, ServiceHero, SectionHeading, ServiceProcess, ServiceEnd, s } from "@/components/CorporateService";
import { zh } from "@/lib/i18n/zh";
// Same structure as src/app/service/bilingual/page.tsx.
const t = zh.servicePages.bilingual;
export const metadata:Metadata={title:{absolute:t.title},description:t.description,alternates:{canonical:"/zh/service/bilingual",languages:{ja:"/service/bilingual","zh-Hans":"/zh/service/bilingual","x-default":"/service/bilingual"}},openGraph:{title:t.title,description:t.description,url:"/zh/service/bilingual",locale:"zh_CN"}};
export default function Page(){return <ServiceShell locale="zh" title={t.shell} description={t.description} path="/zh/service/bilingual">
 <ServiceHero locale="zh" label="BILINGUAL" title={<>{t.heading[0]}<br/>{t.heading[1]}</>} lead={t.lead} image="/images/corporate-hero/bilingual.png"/>
 <section className={`${s.wrap} ${s.section} ${s.split}`}><SectionHeading en="BUSINESS ROLES" copy={t.rolesCopy}>{t.rolesHeading[0]}<br/>{t.rolesHeading[1]}</SectionHeading><div className={s.rows}>{t.roles.map(([title,copy])=><article className={s.row} key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
 <section className={`${s.wrap} ${s.section}`}><SectionHeading en="LANGUAGE IN PRACTICE">{t.sceneHeading}</SectionHeading><div className={s.scene}><Image src="/images/corporate-hero/bilingual.png" alt="" width={1200} height={900} sizes="(max-width:700px) 90vw, 50vw"/><ul>{t.scenes.map(([title,copy])=><li key={title}><h3>{title}</h3><p>{copy}</p></li>)}</ul></div><p className={s.note}>{t.note}</p></section>
 <section className={`${s.wrap} ${s.section}`}><SectionHeading en="HIRING OPTIONS">{t.optionsHeading}</SectionHeading><div className={s.comparison}>{t.options.map(([title,copy])=><article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
 <ServiceProcess locale="zh" steps={t.steps}/>
 <ServiceEnd locale="zh" exclude="bilingual"/>
 </ServiceShell>}
