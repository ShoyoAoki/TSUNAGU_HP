import type { Metadata } from "next";
import { Action, Eyebrow } from "@/components/recruitment/Recruitment";
import { ZhBreadcrumb, ZhEmployerCta, ZhFaq } from "../../_components/Recruitment";
import { zh } from "@/lib/i18n/zh";
// Same structure as src/app/service/process/page.tsx.
const t = zh.servicePages.process;
export const metadata: Metadata = { title: { absolute: t.title }, description: t.description, alternates: { canonical: "/zh/service/process", languages: { ja: "/service/process", "zh-Hans": "/zh/service/process", "x-default": "/service/process" } }, openGraph: { title: t.title, description: t.description, url: "/zh/service/process", locale: "zh_CN" } };
export default function ProcessPage() {
  return <main id="main" className="om-page" lang="zh-Hans"><div className="om-wrap"><ZhBreadcrumb /></div><section className="om-wrap om-detail-hero om-process-hero"><div><Eyebrow>{t.eyebrow}</Eyebrow><h1><span data-motion="hero-line">{t.lines[0]}</span><span data-motion="hero-line"><em>{t.lines[1]}</em></span></h1><p className="om-hero-lead">{t.lead[0]}<br />{t.lead[1]}</p><Action href="/zh/contact">{t.action}</Action></div></section>
    <section className="om-section om-pale"><div className="om-wrap"><div className="om-heading"><Eyebrow>{t.flowEyebrow}</Eyebrow><h2>{t.flowHeading[0]}<br />{t.flowHeading[1]}</h2></div><ol className="om-process-list">{t.steps.map(([title, copy], index) => <li key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol></div></section>
    <section className="om-section om-wrap om-support-grid"><div className="om-heading"><Eyebrow>{t.feeEyebrow}</Eyebrow><h2>{t.feeHeading[0]}<br />{t.feeHeading[1]}</h2></div><div className="om-explainer"><p>{t.fee[0]}</p><p>{t.fee[1]}</p></div></section>
    <ZhFaq /><ZhEmployerCta /></main>;
}
