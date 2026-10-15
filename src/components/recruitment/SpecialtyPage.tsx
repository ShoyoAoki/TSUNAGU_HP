import Link from "next/link";
import type { ReactNode } from "react";
import { Action, Arrow, Breadcrumb, EmployerCta, Eyebrow } from "./Recruitment";
import ServiceJsonLd from "./ServiceJsonLd";
export type SpecialtyContent = { slug: string; title: string; eyebrow: string; headline: string; heroTitle?: ReactNode; ctaLabel?: string; lead: string; icon: string; roles: { title: string; copy: string; tags: string[] }[]; points: { title: string; copy: string }[] };
export default function SpecialtyPage({ content }: { content: SpecialtyContent }) {
  const serviceName = content.title.endsWith("採用") ? `${content.title}支援` : `${content.title}の採用支援`;
  return <main id="main" className="om-page">
    <ServiceJsonLd name={`OwlMatch ${serviceName}`} description={content.lead} path={`/service/${content.slug}`} />
    <div className="om-wrap"><Breadcrumb current={content.title} /></div>
    <section className="om-wrap om-detail-hero om-specialty-hero"><div><Eyebrow>{content.eyebrow}</Eyebrow><h1>{content.heroTitle ?? <><span data-motion="hero-line">{content.headline}</span><span data-motion="hero-line"><em>{content.title}の採用支援。</em></span></>}</h1><p className="om-hero-lead">{content.lead}</p><Action>{content.ctaLabel ?? `${content.title}の採用を相談する`}</Action><p className="om-fine-print">初回相談無料・アカウント登録不要</p></div><aside className="om-service-scope"><p className="om-scope-caption">ご相談いただける職種・分野</p><dl>{content.roles.map(role => <div key={role.title}><dt>{role.title}</dt><dd>{role.tags.join(" / ")}</dd></div>)}</dl><p className="om-scope-note">仕事内容に合わせて、採用要件を具体化します。</p></aside></section>
    <section className="om-section om-pale"><div className="om-wrap"><div className="om-heading"><Eyebrow>ご相談いただける職種・分野</Eyebrow><h2>対象職種・業務</h2></div><div className="om-requirements">{content.roles.map(role => <article key={role.title}><h3>{role.title}</h3><p>{role.copy}</p><div className="om-tags">{role.tags.map(tag => <span key={tag}>{tag}</span>)}</div></article>)}</div><p className="om-fine-print">掲載している職種・分野は一例です。ご紹介できる人材は、ご希望条件と候補者の状況により個別に確認します。</p></div></section>
    <section className="om-section om-wrap om-support-grid"><div className="om-heading"><Eyebrow>ご相談で整理すること</Eyebrow><h2>採用要件の整理</h2><p>必要な経験、スキル、日本語力を、仕事内容と一緒に整理します。</p><Link href="/service/process" className="om-text-link">採用の進め方を見る <Arrow /></Link></div><div className="om-detail-points">{content.points.map(point => <article key={point.title}><h3>{point.title}</h3><p>{point.copy}</p></article>)}</div></section>
    {content.slug === "it-ai" && <section className="om-wrap om-related"><div><Eyebrow>ロボット・実機を扱う開発について</Eyebrow><h2>フィジカルAI・ロボティクス人材を<br />お探しの企業様へ。</h2></div><Link href="/service/physical-ai" className="om-text-link">専門領域の採用支援を見る <Arrow /></Link></section>}
    <EmployerCta />
  </main>;
}
