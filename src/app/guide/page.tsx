import type { Metadata } from "next";
import Link from "next/link";
import g from "./guide.module.css";
import { GuideBreadcrumb, GuideCta, formatDate } from "./GuideParts";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";
import { guideArticles, guideIndex } from "@/content/guide";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: guideIndex.metaTitle },
  description: guideIndex.description,
  alternates: { canonical: "/guide" },
  openGraph: { title: guideIndex.metaTitle, description: guideIndex.description, url: "/guide" },
  twitter: { title: guideIndex.metaTitle, description: guideIndex.description },
  // 原稿流し込み前（status: "draft"）は検索結果に出さない
  ...(guideIndex.status === "draft" ? { robots: { index: false, follow: true } } : {}),
};

export default function GuideIndexPage() {
  return <main id="main" className={g.page}>
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: guideIndex.title,
      itemListElement: guideArticles.map((article, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE_URL}/guide/${article.slug}`, name: article.title })),
    }} />
    <JsonLd data={breadcrumbJsonLd([
      { name: "トップ", url: SITE_URL },
      { name: "採用ガイド", url: `${SITE_URL}/guide` },
    ])} />

    <div className={g.wrap}>
      <GuideBreadcrumb />
      <header className={`${g.header} ${g.column}`}>
        <p className={g.eyebrow}>{guideIndex.eyebrow}</p>
        <h1>{guideIndex.title}</h1>
        {guideIndex.status === "draft" && <p className={g.draftBadge}>原稿待ち（仮のリードを表示しています）</p>}
        <div className={g.lead}>{guideIndex.lead.split(/\n{2,}/).map((para, i) => <p key={i}>{para}</p>)}</div>
        <p className={g.serviceLink}>当社の支援内容は「<Link href="/service/china-talent">中国人材採用</Link>」のページでご案内しています。</p>
      </header>

      <section className={g.related} aria-labelledby="guide-list-title">
        <h2 id="guide-list-title" className={g.sectionTitle}>記事一覧</h2>
        <ul className={g.list}>{guideArticles.map((article) => <li key={article.slug}>
          <Link href={`/guide/${article.slug}`}>
            <h3 className={g.listTitle}>{article.title}</h3>
            <p className={g.listSummary}>{article.summary ?? article.description}</p>
            <time className={g.listDate} dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
          </Link>
        </li>)}</ul>
      </section>
    </div>

    <GuideCta heading="中国人材の採用相談" copy="仕事内容や必要なスキルが決まる前から、ご相談いただけます。" />
  </main>;
}
