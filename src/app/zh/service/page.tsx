import type { Metadata } from "next";
import { ServiceShell, ServiceHero, SectionHeading, ServiceCards, ServiceProcess, ServiceEnd, s } from "@/components/CorporateService";
import { zh } from "@/lib/i18n/zh";
// Same structure as src/app/service/page.tsx (ServiceShell layout on main).
const t = zh.servicePages.index;
export const metadata:Metadata={title:{absolute:t.title},description:t.description,alternates:{canonical:"/zh/service",languages:{ja:"/service","zh-Hans":"/zh/service","x-default":"/service"}},openGraph:{title:t.title,description:t.description,url:"/zh/service",locale:"zh_CN"}};
export default function Page(){return <ServiceShell locale="zh" title={t.shell} description={t.description} path="/zh/service">
 <ServiceHero locale="zh" index label={t.label} title={<>{t.heading[0]}<br/>{t.heading[1]}</>} lead={t.lead} image="/images/corporate-hero/bilingual.png"/>
 <section className={s.blue}><div className={s.wrap}><SectionHeading en="OUR SERVICES">{t.cardsHeading}</SectionHeading><ServiceCards locale="zh"/></div></section>
 <ServiceProcess locale="zh" steps={t.steps}/>
 <ServiceEnd locale="zh"/>
 </ServiceShell>}
