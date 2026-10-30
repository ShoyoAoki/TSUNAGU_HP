import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import g from "../guide.module.css";
import { GuideBreadcrumb, GuideCta, formatDate } from "../GuideParts";
import GuideBody from "@/components/guide/GuideBody";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";
import { GUIDE_AUTHOR, getGuideArticle, guideArticles } from "@/content/guide";
import { parseGuideMarkdown } from "@/content/guide/markdown";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guideArticles.map((article) => ({ slug: article.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getGuideArticle((await params).slug);
  if (!article) return {};
  const path = `/guide/${article.slug}`;
  return {
    title: { absolute: article.metaTitle },
    description: article.description,
    alternates: { canonical: path },
    openGraph: {
      title: article.metaTitle,
      description: article.description,
      url: path,
      type: "article",
      publishedTime: `${article.publishedAt}T00:00:00+09:00`,
      modifiedTime: `${article.updatedAt}T00:00:00+09:00`,
      authors: [GUIDE_AUTHOR.name],
    },
    twitter: { title: article.metaTitle, description: article.description },
    // 原稿流し込み前（status: "draft"）は検索結果に出さない
    ...(article.status === "draft" ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function GuideArticlePage({ params }: Props) {
  const article = getGuideArticle((await params).slug);
  if (!article) notFound();
  const url = `${SITE_URL}/guide/${article.slug}`;
  const blocks = parseGuideMarkdown(article.body);
  const toc = blocks.flatMap((block) => block.type === "h2" ? [block] : []);
  const related = article.related.map(getGuideArticle).filter((item): item is NonNullable<typeof item> => Boolean(item));
  const organization = { "@type": "Organization", name: GUIDE_AUTHOR.name, url: SITE_URL };

  return <main id="main" className={g.page}>
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.description,
      datePublished: `${article.publishedAt}T00:00:00+09:00`,
      dateModified: `${article.updatedAt}T00:00:00+09:00`,
      inLanguage: "ja",
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      url,
      image: `${SITE_URL}/opengraph-image`,
      author: organization,
      publisher: { ...organization, logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.png` } },
    }} />
    <JsonLd data={breadcrumbJsonLd([
      { name: "トップ", url: SITE_URL },
      { name: "採用ガイド", url: `${SITE_URL}/guide` },
      { name: article.title, url },
    ])} />

    <div className={g.wrap}>
      <GuideBreadcrumb current={article.title} />
      <header className={`${g.header} ${g.column}`}>
        <p className={g.eyebrow}>採用ガイド</p>
        <h1>{article.title}</h1>
        {article.status === "draft" && <p className={g.draftBadge}>原稿待ち（仮の本文を表示しています）</p>}
        <div className={g.lead}>{article.lead.split(/\n{2,}/).map((para, i) => <p key={i}>{para}</p>)}</div>
        <dl className={g.meta}>
          <div><dt>公開日</dt><dd><time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time></dd></div>
          <div><dt>更新日</dt><dd><time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time></dd></div>
          <div><dt>執筆</dt><dd>{GUIDE_AUTHOR.name}（{GUIDE_AUTHOR.credential}）</dd></div>
        </dl>
        <p className={g.serviceLink}>当社の支援内容は「<Link href="/service/china-talent">中国人材採用</Link>」のページでご案内しています。</p>
      </header>

      <div className={g.layout}>
        <article className={g.column} aria-label="本文">
          <GuideBody blocks={blocks} />
        </article>
        {toc.length > 1 && <nav className={g.toc} aria-label="目次">
          <p>目次</p>
          <ol>{toc.map((item) => <li key={item.id}><a href={`#${item.id}`}>{item.text.replace(/\*\*|\[|\]\([^)]*\)/g, "")}</a></li>)}</ol>
        </nav>}
      </div>
    </div>

    <GuideCta heading={article.cta.heading} copy={article.cta.copy} />

    <section className={`${g.wrap} ${g.related}`} aria-labelledby="related-title">
      <h2 id="related-title" className={g.sectionTitle}>関連記事</h2>
      <div className={g.relatedGrid}>{related.map((item) => <Link key={item.slug} href={`/guide/${item.slug}`}>
        <span className={g.listTitle}>{item.title}</span>
        <span className={g.listSummary}>{item.summary ?? item.description}</span>
      </Link>)}</div>
      <p className={g.serviceLink}><Link href="/guide">採用ガイドの記事一覧へ</Link></p>
    </section>
  </main>;
}
