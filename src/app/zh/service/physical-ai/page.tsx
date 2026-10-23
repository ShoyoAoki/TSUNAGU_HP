import type { Metadata } from "next";
import { ServiceShell, ServiceHero, SectionHeading, ServiceProcess, ServiceEnd, s } from "@/components/CorporateService";
import { zh } from "@/lib/i18n/zh";
// Same structure as src/app/service/physical-ai/page.tsx.
const t = zh.servicePages.physicalAi;
export const metadata:Metadata={title:{absolute:t.title},description:t.description,alternates:{canonical:"/zh/service/physical-ai",languages:{ja:"/service/physical-ai","zh-Hans":"/zh/service/physical-ai","x-default":"/service/physical-ai"}},openGraph:{title:t.title,description:t.description,url:"/zh/service/physical-ai",locale:"zh_CN"}};
export default function Page(){return <ServiceShell locale="zh" title={t.shell} description={t.description} path="/zh/service/physical-ai">
 <ServiceHero locale="zh" label="PHYSICAL AI" title={<>{t.heading[0]}<br/>{t.heading[1]}</>} lead={t.lead} image="/images/corporate-hero/physical-ai-robot-only.png"/>
 <section className={`${s.wrap} ${s.section}`}><SectionHeading en="TECHNICAL FIELDS" copy={t.fieldsCopy}>{t.fieldsHeading[0]}<br/>{t.fieldsHeading[1]}</SectionHeading><div className={s.technical}>{t.fields.map(([title,copy,tags])=><article key={title}><h3>{title}</h3><p>{copy}</p><div className={s.tags}>{tags.map(tag=><span key={tag}>{tag}</span>)}</div></article>)}</div>
 <div className={s.panel}><h3>{t.panel}</h3><div className={s.checks}>{t.checks.map(([title,copy])=><div key={title}><h4>{title}</h4><p>{copy}</p></div>)}</div></div></section>
 <section className={`${s.wrap} ${s.section} ${s.split}`}><SectionHeading en="ROLE DESIGN">{t.roleHeading[0]}<br/>{t.roleHeading[1]}</SectionHeading><div className={s.rows}>{t.roles.map(([title,copy])=><article className={s.row} key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
 <ServiceProcess locale="zh" steps={t.steps}/>
 <ServiceEnd locale="zh" exclude="physical-ai"/>
 </ServiceShell>}
