import Link from "next/link";
import { Action, Eyebrow } from "@/components/recruitment/Recruitment";
import { zh } from "@/lib/i18n/zh";

/*
 * zh copies of Breadcrumb / Faq / EmployerCta from src/components/recruitment/Recruitment.tsx.
 * That file is being rewritten on feat/service-lp-2026-10, and its copy is hard-coded in Japanese,
 * so the Chinese versions live here with the same markup and class names.
 */
const t = zh.servicePages.process;

export function ZhBreadcrumb() {
  return <nav className="om-breadcrumb" aria-label={t.breadcrumb.label}><Link href="/zh">{t.breadcrumb.home}</Link><span aria-hidden="true">/</span><Link href="/zh/service">{t.breadcrumb.service}</Link><span aria-hidden="true">/</span><span aria-current="page">{t.breadcrumb.current}</span></nav>;
}

export function ZhFaq() {
  return <section className="om-section om-wrap om-faq"><div className="om-heading"><Eyebrow>{t.faqEyebrow}</Eyebrow><h2>{t.faqHeading}</h2></div><div>{t.faq.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">＋</span></summary><p>{answer}</p></details>)}</div></section>;
}

export function ZhEmployerCta() {
  const c = t.cta;
  return <section className="om-section om-end-cta"><div className="om-wrap om-end-inner"><div><Eyebrow>{c.eyebrow}</Eyebrow><h2>{c.heading[0]}<br />{c.heading[1]}</h2><p>{c.copy}</p></div><div className="om-application"><span className="om-application-badge">{c.badge}</span><h3>{c.title}</h3><p>{c.body}</p><Action white href="/zh/contact">{c.action}</Action></div></div></section>;
}
