import type { Metadata } from "next";
import { ServiceShell, ServiceHero, SectionHeading, ServiceProcess, ServiceEnd, s } from "@/components/CorporateService";
import { zh } from "@/lib/i18n/zh";
// Same structure as src/app/service/internship/page.tsx.
const t = zh.servicePages.internship;
export const metadata:Metadata={title:{absolute:t.title},description:t.description,alternates:{canonical:"/zh/service/internship",languages:{ja:"/service/internship","zh-Hans":"/zh/service/internship","x-default":"/service/internship"}},openGraph:{title:t.title,description:t.description,url:"/zh/service/internship",locale:"zh_CN"}};
export default function Page(){return <ServiceShell locale="zh" title={t.shell} description={t.description} path="/zh/service/internship">
 <ServiceHero locale="zh" label="INTERNSHIP" title={<>{t.heading[0]}<br/>{t.heading[1]}</>} lead={t.lead} image="/images/corporate-hero/campus.png"/>
 <section className={`${s.wrap} ${s.section} ${s.split}`}><SectionHeading en="WORK DESIGN" copy={t.workCopy}>{t.workHeading[0]}<br/>{t.workHeading[1]}</SectionHeading><div className={s.rows}>{t.work.map(([title,copy])=><article className={s.row} key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
 <section className={`${s.wrap} ${s.section}`}><SectionHeading en="ACCEPTANCE PLAN" copy={t.planCopy}>{t.planHeading[0]}<br/>{t.planHeading[1]}</SectionHeading><div className={s.intake}>{t.intake.map(([title,copy])=><article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div><div className={s.panel}><h3>{t.panel}</h3><div className={s.comparison}>{t.compare.map(([title,copy])=><article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
 <ServiceProcess locale="zh" steps={t.steps}/>
 <ServiceEnd locale="zh" exclude="internship"/>
 </ServiceShell>}
