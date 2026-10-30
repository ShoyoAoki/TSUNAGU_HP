import Link from "next/link";
import g from "./guide.module.css";

export const formatDate = (iso: string) => iso.replaceAll("-", ".");

export function GuideBreadcrumb({ current }: { current?: string }) {
  return <nav className={g.breadcrumb} aria-label="パンくず">
    <Link href="/">トップ</Link><span aria-hidden="true">/</span>
    {current ? <><Link href="/guide">採用ガイド</Link><span aria-hidden="true">/</span><span aria-current="page">{current}</span></> : <span aria-current="page">採用ガイド</span>}
  </nav>;
}

/** 記事末・一覧末の相談導線。ボタン文言は原稿のCTA指定（「中国人材採用について詳しく見る」／「採用について相談する」） */
export function GuideCta({ heading, copy }: { heading: string; copy: string }) {
  return <section className={g.cta} aria-labelledby="guide-cta-title">
    <div className={`${g.wrap} ${g.ctaInner}`}>
      <div>
        <p className={g.eyebrow}>CONTACT</p>
        <h2 id="guide-cta-title">{heading}</h2>
        <p>{copy}</p>
      </div>
      <div className={g.ctaActions}>
        <Link className={g.button} href="/service/china-talent"><span>中国人材採用について詳しく見る</span><span aria-hidden="true">→</span></Link>
        <Link className={`${g.button} ${g.buttonPrimary}`} href="/contact">採用について相談する<span aria-hidden="true">↗</span></Link>
      </div>
    </div>
  </section>;
}
