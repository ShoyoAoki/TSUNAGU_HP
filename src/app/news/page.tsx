import type { Metadata } from "next";
import s from "./news.module.css";

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
    <section className={s.empty} aria-label="ニュース掲載状況">
      <p>Coming soon</p>
    </section>
  </main>;
}
