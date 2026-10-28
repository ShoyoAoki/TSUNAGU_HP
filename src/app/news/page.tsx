import type { Metadata } from "next";
import s from "./news.module.css";
import a from "./article.module.css";
import { listing } from "./listing";
import { physicalAiCards } from "./physical-ai";

const description = "株式会社TSUNAGUからのお知らせを掲載するニュースページです。";
export const metadata: Metadata = {
  title: { absolute: "ニュース｜株式会社TSUNAGU" },
  description,
  alternates: { canonical: "/news" },
  openGraph: { title: "ニュース｜株式会社TSUNAGU", description, url: "/news" },
};

export default function NewsPage() {
  return <main className={s.page}>
    <header className={s.heading}>
      <h1>NEWS</h1>
      <p>ニュース</p>
    </header>
    <section className={`${a.article} ${s.listing}`} aria-label="ニュース一覧" dangerouslySetInnerHTML={{__html:listing.replace('<div class="articles">', '<div class="articles">' + physicalAiCards)}} />
  </main>;
}
