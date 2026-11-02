import type { Metadata } from "next";
import { notFound } from "next/navigation";
import s from "../article.module.css";
import { physicalAi, physicalAiPublishedDates } from "../physical-ai";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return Object.keys(physicalAi).map((slug) => ({ slug })); }
export const dynamicParams = false;
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = physicalAi[(await params).slug];
  return a ? { title: a.title, description: a.description, alternates: { canonical: `/news/${(await params).slug}` }, openGraph: { ...((await params).slug === "china-japan-internship" ? { images: [{ url: "/images/news/china-japan-internship.png", width: 1200, height: 675, alt: a.title }] } : {}), title: a.title, description: a.description, url: `/news/${(await params).slug}`, type: "article", publishedTime: `${physicalAiPublishedDates[(await params).slug] || "2026-10-26"}T00:00:00+09:00`, modifiedTime: physicalAiPublishedDates[(await params).slug] ? "2026-11-02T00:00:00+09:00" : "2026-10-28T00:00:00+09:00" } } : {};
}
export default async function ArticlePage({ params }: Props) {
  const a = physicalAi[(await params).slug];
  if (!a) notFound();
  return <main className={s.article} dangerouslySetInnerHTML={{ __html: a.html }} />;
}
