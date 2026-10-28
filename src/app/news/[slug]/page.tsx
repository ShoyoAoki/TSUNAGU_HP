import type { Metadata } from "next";
import { notFound } from "next/navigation";
import s from "../article.module.css";
import { physicalAi } from "../physical-ai";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return Object.keys(physicalAi).map((slug) => ({ slug })); }
export const dynamicParams = false;
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = physicalAi[(await params).slug];
  return a ? { title: a.title, description: a.description, alternates: { canonical: `/news/${(await params).slug}` }, openGraph: { title: a.title, description: a.description, url: `/news/${(await params).slug}`, type: "article", publishedTime: "2026-10-26T00:00:00+09:00", modifiedTime: "2026-10-28T00:00:00+09:00" } } : {};
}
export default async function ArticlePage({ params }: Props) {
  const a = physicalAi[(await params).slug];
  if (!a) notFound();
  return <main className={s.article} dangerouslySetInnerHTML={{ __html: a.html }} />;
}
