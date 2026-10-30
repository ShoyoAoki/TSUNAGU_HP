import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { ServiceShell, ServiceHero, SectionHeading, RoundArrow, s } from "@/components/CorporateService";
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

/** 配列を行ごとに <br/> でつなぐ */
const lines = (items: string[]) => items.map((line, i) => <Fragment key={i}>{i > 0 && <br />}{line}</Fragment>);

export default function ChinaTalentPage() {
  return <ServiceShell title="中国人材採用" description={c.meta.description} path={path}>
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: c.faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
    }} />
    <JsonLd data={breadcrumbJsonLd([
      { name: "トップ", url: SITE_URL },
      { name: "採用支援サービス", url: `${SITE_URL}/service` },
      { name: "中国人材採用", url: `${SITE_URL}${path}` },
    ])} />

    <ServiceHero label={c.hero.eyebrow} title={lines(c.hero.titleLines)} lead={c.hero.lead} image="/images/corporate-hero/team.png" />
    {c.status === "draft" && <p className={p.draft}>原稿待ち（仮の文面を表示しています）</p>}

    <section className={`${s.wrap} ${s.section}`} aria-labelledby="fields-title">
      <SectionHeading en={c.fields.en} copy={c.fields.intro}><span id="fields-title">{lines(c.fields.titleLines)}</span></SectionHeading>
      <div className={p.fields}>{c.fields.items.map((field) => <article key={field.id} className={p.field}>
        <small>{field.en}</small>
        <h3>{field.title}</h3>
        <p>{field.copy}</p>
        <div className={s.tags}>{field.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        {field.href && <Link className={p.fieldLink} href={field.href}>{field.linkLabel ?? "詳しく見る"}<RoundArrow /></Link>}
      </article>)}</div>
      <p className={s.note}>{c.fields.note}</p>
    </section>

    <section className={`${s.wrap} ${s.section}`} aria-labelledby="hiring-title">
      <SectionHeading en={c.hiring.en} copy={c.hiring.intro}><span id="hiring-title">{lines(c.hiring.titleLines)}</span></SectionHeading>
      <div className={p.hiring}>{c.hiring.items.map((item) => <article key={item.title}>
        <h3>{item.title}</h3>
        <p>{item.copy}</p>
        {item.href && <Link className={p.textLink} href={item.href}>{item.linkLabel ?? "詳しく見る"} →</Link>}
      </article>)}</div>
    </section>

    <section className={s.process} aria-labelledby="flow-title">
      <div className={`${s.wrap} ${s.processGrid}`}>
        <div>
          <SectionHeading en={c.flow.en} copy={c.flow.intro}><span id="flow-title">{lines(c.flow.titleLines)}</span></SectionHeading>
          {c.flow.figureId && <div className={p.figure}><GuideFigure id={c.flow.figureId} caption={c.flow.figureCaption ?? ""} /></div>}
        </div>
        <ol>{c.flow.steps.map((step, i) => <li key={step.title}><span>{String(i + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div></li>)}</ol>
      </div>
    </section>

    <section className={`${s.wrap} ${s.section} ${s.split}`} aria-labelledby="cost-title">
      <SectionHeading en={c.cost.en}><span id="cost-title">{lines(c.cost.titleLines)}</span></SectionHeading>
      <div className={p.cost}>{c.cost.paragraphs.map((para) => <p key={para}>{para}</p>)}<Link className={p.textLink} href="/guide/china-talent-cost">中国人材採用の費用の考え方を読む →</Link></div>
    </section>

    <section className={`${s.wrap} ${s.section} ${s.split}`} aria-labelledby="faq-title">
      <SectionHeading en={c.faq.en}><span id="faq-title">{c.faq.title}</span></SectionHeading>
      <div className={p.faq}>{c.faq.items.map((item) => <details key={item.q}>
        <summary>{item.q}<span aria-hidden="true">＋</span></summary>
        <p>{item.a}</p>
      </details>)}</div>
    </section>

    <section className={`${s.wrap} ${s.section}`} aria-labelledby="guide-title">
      <div className={p.guideHead}>
        <SectionHeading en={c.guide.en} copy={c.guide.intro}><span id="guide-title">{c.guide.title}</span></SectionHeading>
        <Link className={p.textLink} href="/guide">記事一覧へ →</Link>
      </div>
      <ul className={p.guideList}>{guideArticles.map((article) => <li key={article.slug}><Link href={`/guide/${article.slug}`}>{article.title}<RoundArrow /></Link></li>)}</ul>
    </section>

    <section className={s.closing}>
      <div className={s.wrap}>
        <div className={s.closingGrid}>
          <div><p className={s.eyebrow}>CONTACT</p><h2>{lines(c.cta.titleLines)}</h2><p>{c.cta.copy}</p></div>
          <Link className={s.contactLink} href="/contact">{c.cta.buttonLabel}<RoundArrow /></Link>
        </div>
        <div className={s.notes}>
          <p>在留資格・申請手続きについては、ご相談を承ります。</p>
          <p>株式会社TSUNAGU　有料職業紹介事業許可番号：46-ユ-300221</p>
        </div>
      </div>
    </section>
  </ServiceShell>;
}
