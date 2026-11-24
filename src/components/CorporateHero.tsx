"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./CorporateHero.module.css";
import { zh } from "@/lib/i18n/zh";
const slides = [
  { title: "中国人材採用・人材紹介・定着支援", label: "人と企業をつなぐ", copy: "事業の成長に必要な人材を、国境を越えて。採用から入社後の定着まで、企業の課題に向き合います。", image: "team", alt: "明るいオフィスで協働するビジネスパーソンのイメージ", href: "/service" },
  { title: "フィジカルAI人材", label: "技術を実社会へ", copy: "フィジカルAI分野の新卒人材のみをご紹介。大学・大学院での研究や制作で培った専門性を、企業の開発現場につなぎます。", image: "physical-ai-robot-only", alt: "研究開発環境に立つヒューマノイドロボット", href: "/service/physical-ai" },
  { title: "日中バイリンガル人材", label: "言葉の先の協働へ", copy: "日本語と中国語、二つの言語と文化をつなぐ人材。JLPT N1以上の人材を対象に、企業に合う人材をご紹介します。", image: "bilingual", alt: "オフィスで資料を確認する二人のイメージ", href: "/service/bilingual" },
  { title: "インターン採用支援", label: "次の世代とともに", copy: "学生の意欲と、企業の現場をつなぐ。受入目的や業務内容に合わせて、インターン採用を支援します。", image: "campus", alt: "大学キャンパスで話し合う学生のイメージ", href: "/service/internship" },
];
const ja = { section: "TSUNAGUの採用支援", carousel: "カルーセル", slide: "スライド", cta: "事業紹介を見る", video: "砂時計を模した無限のアニメーション", position: (n: number, title: string) => `${n}枚目：${title}`, h1: ["中国人材採用", "人材紹介・定着支援"], parts: [["フィジカルAI","人材"],["日中バイリンガル","人材"],["インターン","採用支援"]] };
export default function CorporateHero({ locale = "ja" }: { locale?: "ja" | "zh" }) {
  const t = locale === "zh" ? zh.hero : ja;
  const items = locale === "zh" ? slides.map((slide, i) => ({ ...slide, ...zh.hero.slides[i] })) : slides;
  const [active, setActive] = useState(0);
  const [focused, setFocused] = useState(false);
  const [paused, setPaused] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(true);
  const video = useRef<HTMLVideoElement>(null);
  const touch = useRef<{x:number;y:number}|null>(null);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const width = window.matchMedia("(max-width: 700px)");
    const updateMotion = () => setReduced(motion.matches);
    const updateWidth = () => setMobile(width.matches);
    const visibility = () => setHidden(document.hidden);
    updateMotion();
    updateWidth();
    visibility();
    motion.addEventListener("change", updateMotion);
    width.addEventListener("change", updateWidth);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      motion.removeEventListener("change", updateMotion);
      width.removeEventListener("change", updateWidth);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  const manuallyPaused = mobile && paused;
  const running = !focused && !manuallyPaused && !hidden && !reduced;
  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setActive(i => (i + 1) % items.length), mobile ? 6500 : 3000);
    return () => window.clearTimeout(timer);
  }, [running, active, items.length, mobile]);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (active === 0 && !hidden && !reduced && !manuallyPaused) void element.play().catch(() => {});
    else element.pause();
  }, [active, hidden, reduced, manuallyPaused]);
  const pauseLabel = locale === "zh" ? "暂停轮播" : "自動切り替えを一時停止";
  const move = (n:number) => setActive(i => (i+n+items.length)%items.length);
  return <section className={styles.hero} aria-label={t.section} aria-roledescription={t.carousel} onFocusCapture={e=>{if((e.target as HTMLElement).matches?.(':focus-visible'))setFocused(true);}} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))setFocused(false);}}>
    <div className={styles.viewport} onTouchStart={e=>{touch.current={x:e.touches[0].clientX,y:e.touches[0].clientY};}} onTouchEnd={e=>{if(!touch.current)return;const dx=e.changedTouches[0].clientX-touch.current.x;const dy=e.changedTouches[0].clientY-touch.current.y;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy))move(dx<0?1:-1);touch.current=null;}}>
      <div className={styles.track} style={{transform:`translateX(-${active*100}%)`}}>
        {items.map((slide, i) => (
          <article key={slide.image} className={`${styles.slide} ${i === 0 ? styles.sandglassSlide : ""}`} data-image={slide.image} lang={locale === "zh" ? "zh-Hans" : "ja"} aria-hidden={i !== active} aria-label={`${i + 1} / ${items.length}`} aria-roledescription={t.slide}>
            <div className={styles.copy}>
              <div className={styles.text}>
                <p className={styles.eyebrow}>{slide.label}</p>
                {i === 0
                  ? <h1><span>{t.h1[0]}</span><span>{t.h1[1]}</span></h1>
                  : <h2>{t.parts[i - 1].map((part, j) => <span key={part}>{j > 0 && <wbr />}<span className={styles.phrase}>{part}</span></span>)}</h2>}
                <p className={styles.description}>{slide.copy}</p>
              </div>
              <div className={styles.photo}>
                {i === 0
                  ? <video ref={video} src="/videos/sandglass.mp4" poster="/images/corporate-hero/sandglass-poster.webp" muted loop playsInline preload="metadata" className={styles.sandglass} aria-label={t.video} />
                  : <Image src={`/images/corporate-hero/${slide.image}.png`} alt={slide.alt} fill sizes="(max-width: 600px) calc(100vw - 44px), (max-width: 700px) 560px, 100vw" className={styles.image} />}
              </div>
              <Link href={slide.href} tabIndex={i === active ? 0 : -1} className={styles.cta}>{t.cta} <span aria-hidden="true">↗</span></Link>
            </div>
          </article>
        ))}
      </div>
    </div>
    <div className={styles.controls}>
      <div className={styles.dots}>{items.map((s,i)=><button key={s.image} aria-label={t.position(i+1,s.title)} aria-current={active===i?"true":undefined} onClick={()=>setActive(i)}><span /></button>)}</div>
      {mobile && !reduced && <button type="button" className={styles.pause} aria-label={pauseLabel} aria-pressed={paused} onClick={() => setPaused(value => !value)}>
        <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d={paused ? "M5 2.5 13 8l-8 5.5v-11Z" : "M4 3h2.5v10H4zM9.5 3H12v10H9.5z"} />
        </svg>
      </button>}
    </div>
    <p className={styles.srOnly} aria-live={running?'off':'polite'}>{t.position(active+1,items[active].title)}</p>
  </section>;
}
