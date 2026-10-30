import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SectionHeading, RoundArrow, s } from "@/components/CorporateService";
import { GuideFigure } from "@/components/guide/GuideBody";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";
import { chinaTalent as c } from "@/content/china-talent";
import { guideArticles } from "@/content/guide";
import { SITE_URL } from "@/lib/site";
import p from "./page.module.css";

const path = "/service/china-talent";
export const metadata: Metadata = {
  title: { absolute: c.meta.title },
  description: c.meta.description,
  alternates: { canonical: path },
  openGraph: { title: c.meta.title, description: c.meta.description, url: path },
  twitter: { title: c.meta.title, description: c.meta.description },
  // 原稿流し込み前（status: "draft"）は検索結果に出さない
  ...(c.status === "draft" ? { robots: { index: false, follow: true } } : {}),
};

export default function ChinaTalentPage() {
  return <main id="main" className={s.page}>
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "Service",
      name: c.service.name,
      serviceType: c.service.serviceType,
      description: c.meta.description,
      url: `${SITE_URL}${path}`,
      provider: { "@type": "Organization", name: "株式会社TSUNAGU", url: SITE_URL },
      areaServed: "JP",
    }} />
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: c.faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
    }} />
    <JsonLd data={breadcrumbJsonLd([
      { name: c.breadcrumb.home, url: SITE_URL },
      { name: c.breadcrumb.parent, url: `${SITE_URL}/service` },
      { name: c.breadcrumb.current, url: `${SITE_URL}${path}` },
    ])} />

    <header className={s.hero}>
      <svg viewBox="0 0 1440 680" preserveAspectRatio="none" aria-hidden="true"><path d="M-100 560C200 680 460 80 770 170S1200 690 1550 390" fill="none" stroke="#e2f3f8" strokeWidth="160"/></svg>
      <div className={s.wrap}>
        <nav className={s.breadcrumb} aria-label="パンくず"><Link href="/">{c.breadcrumb.home}</Link><span aria-hidden="true">/</span><Link href="/service">{c.breadcrumb.parent}</Link><span aria-hidden="true">/</span><span aria-current="page">{c.breadcrumb.current}</span></nav>
        <div className={s.heroGrid}>
          <div className={s.heroCopy}>
            <p className={s.eyebrow}>{c.hero.eyebrow}</p>
            <h1>{c.hero.title}</h1>
            <p className={p.subcopy}>{c.hero.subcopy}</p>
            <p className={s.lead}>{c.hero.lead}</p>
            <Link className={s.textLink} href="/contact">{c.hero.ctaLabel}<RoundArrow /></Link>
            <p className={p.heroNote}>{c.hero.note}</p>
          </div>
          <figure className={s.heroPhoto}><Image src="/images/corporate-hero/team.png" alt="" width={1200} height={900} priority sizes="(max-width:700px) 100vw, 55vw" /><figcaption>画像はイメージです</figcaption></figure>
        </div>
      </div>
    </header>

    <section className={`${s.wrap} ${s.section}`} aria-labelledby="fields-title">
      <SectionHeading en={c.fields.en} copy={c.fields.lead}><span id="fields-title">{c.fields.title}</span></SectionHeading>
      <div className={p.figure}><GuideFigure id={c.fields.figure.id} caption={c.fields.figure.caption} /></div>
      <div className={p.fields}>{c.fields.items.map((field) => <article key={field.id} className={p.field}>
        <small>{field.en}</small>
        <h3>{field.title}</h3>
        <p>{field.copy}</p>
        <div className={s.tags}>{field.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        {field.note && <p className={p.fieldNote}>{field.note}</p>}
        {field.link && <Link className={p.fieldLink} href={field.link.href} aria-label={`${field.title}の${field.link.label}`}>{field.link.label}<RoundArrow /></Link>}
      </article>)}</div>
    </section>

    <section className={`${s.wrap} ${s.section}`} aria-labelledby="hiring-title">
      <SectionHeading en={c.hiring.en} copy={c.hiring.lead}><span id="hiring-title">{c.hiring.title}</span></SectionHeading>
      <div className={p.hiring}>{c.hiring.items.map((item) => <article key={item.title}>
        <h3>{item.title}</h3>
        <p className={p.hiringLabel}>{item.label}</p>
        <p>{item.copy}</p>
        {item.link && <Link className={p.textLink} href={item.link.href} aria-label={`${item.title}の${item.link.label}`}>{item.link.label} →</Link>}
      </article>)}</div>
      <p className={s.note}>{c.hiring.note}</p>
    </section>

    <section className={s.process} aria-labelledby="flow-title">
      <div className={`${s.wrap} ${s.processGrid}`}>
        <div>
          <SectionHeading en={c.flow.en}><span id="flow-title">{c.flow.title}</span></SectionHeading>
          <Link className={p.textLink} href={c.flow.link.href}>{c.flow.link.label} →</Link>
        </div>
        <ol>{c.flow.steps.map((step, i) => <li key={step.title}><span>{String(i + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div></li>)}</ol>
      </div>
      <div className={`${s.wrap} ${p.flowFigure}`}><GuideFigure id={c.flow.figure.id} caption={c.flow.figure.caption} /></div>
    </section>

    <section className={`${s.wrap} ${s.section} ${s.split}`} aria-labelledby="cost-title">
      <SectionHeading en={c.cost.en}><span id="cost-title">{c.cost.title}</span></SectionHeading>
      <div className={p.cost}>{c.cost.paragraphs.map((para) => <p key={para}>{para}</p>)}<Link className={p.textLink} href={c.cost.link.href}>{c.cost.link.label} →</Link></div>
    </section>

    <section className={`${s.wrap} ${s.section}`} aria-labelledby="guide-title">
      <div className={p.guideHead}>
        <SectionHeading en={c.guide.en}><span id="guide-title">{c.guide.title}</span></SectionHeading>
        <Link className={p.textLink} href={c.guide.listLink.href}>{c.guide.listLink.label} →</Link>
      </div>
      <ul className={p.guideList}>{guideArticles.map((article) => <li key={article.slug}><Link href={`/guide/${article.slug}`}>{article.title}<RoundArrow /></Link></li>)}</ul>
      <p className={p.dataLink}><Link href={c.guide.dataLink.href}>{c.guide.dataLink.label} →</Link></p>
    </section>

    <section className={`${s.wrap} ${s.section} ${s.split}`} aria-labelledby="faq-title">
      <SectionHeading en={c.faq.en}><span id="faq-title">{c.faq.title}</span></SectionHeading>
      <div className={p.faq}>{c.faq.items.map((item) => <details key={item.q}>
        <summary>{item.q}<span aria-hidden="true">＋</span></summary>
        <p>{item.a}</p>
      </details>)}</div>
    </section>

    <section className={s.closing}>
      <div className={s.wrap}>
        <div className={s.closingGrid}>
          <div><p className={s.eyebrow}>CONTACT</p><h2>{c.cta.title}</h2><p>{c.cta.copy}</p></div>
          <div><Link className={s.contactLink} href="/contact">{c.cta.buttonLabel}<RoundArrow /></Link><p className={p.ctaNote}>{c.cta.note}</p></div>
        </div>
        <div className={s.notes}>
          <p>株式会社TSUNAGU　有料職業紹介事業許可番号：46-ユ-300221</p>
        </div>
      </div>
    </section>
  </main>;
}
