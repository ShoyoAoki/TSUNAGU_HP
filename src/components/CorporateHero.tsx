"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./CorporateHero.module.css";
import { zh } from "@/lib/i18n/zh";
const slides = [
  { title: "バイリンガル人材・技術人材の採用支援", label: "人と企業をつなぐ", copy: "事業の成長に必要な人材を、国境を越えて。採用から入社後の定着まで、企業の課題に向き合います。", image: "team", alt: "明るいオフィスで協働するビジネスパーソンのイメージ", href: "/service" },
  { title: "フィジカルAI人材", label: "技術を実社会へ", copy: "フィジカルAI分野の新卒人材のみをご紹介。大学・大学院での研究や制作で培った専門性を、企業の開発現場につなぎます。", image: "physical-ai-robot-only", alt: "研究開発環境に立つヒューマノイドロボット", href: "/service/physical-ai" },
  { title: "日中バイリンガル人材", label: "言葉の先の協働へ", copy: "日本語と中国語、二つの言語と文化をつなぐ人材。JLPT N1取得者を対象に、企業に合う人材をご紹介します。", image: "bilingual", alt: "オフィスで資料を確認する二人のイメージ", href: "/service/bilingual" },
  { title: "インターン採用支援", label: "次の世代とともに", copy: "学生の意欲と、企業の現場をつなぐ。受入目的や業務内容に合わせて、インターン採用を支援します。", image: "campus", alt: "大学キャンパスで話し合う学生のイメージ", href: "/service/internship" },
];
const ja = { section: "TSUNAGUの採用支援", carousel: "カルーセル", slide: "スライド", cta: "事業紹介を見る", video: "砂時計を模した無限のアニメーション", position: (n: number, title: string) => `${n}枚目：${title}`, h1: ["バイリンガル人材・", "技術人材の採用支援"], parts: [["フィジカルAI","人材"],["日中バイリンガル","人材"],["インターン","採用支援"]] };
export default function CorporateHero({ locale = "ja" }: { locale?: "ja" | "zh" }) {
  const t = locale === "zh" ? zh.hero : ja;
  const items = locale === "zh" ? slides.map((slide, i) => ({ ...slide, ...zh.hero.slides[i] })) : slides;
  const [active, setActive] = useState(0);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(true);
  const video = useRef<HTMLVideoElement>(null);
  const touch = useRef<{x:number;y:number}|null>(null);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    const visibility = () => setHidden(document.hidden);
    update(); visibility(); media.addEventListener('change', update); document.addEventListener('visibilitychange', visibility);
    return () => {media.removeEventListener('change', update);document.removeEventListener('visibilitychange', visibility);};
  }, []);
  const running = !focused && !hidden && !reduced;
  useEffect(() => {if (!running) return; const timer = setInterval(() => setActive(i => (i + 1) % items.length), 3000); return () => clearInterval(timer);}, [running, active]);
  useEffect(() => { const el=video.current;if(!el)return;if(active===0&&!hidden&&!reduced){void el.play().catch(()=>{});}else{el.pause();}},[active,hidden,reduced]);
  const move = (n:number) => setActive(i => (i+n+items.length)%items.length);
  return <section className={styles.hero} aria-label={t.section} aria-roledescription={t.carousel} onFocusCapture={e=>{if((e.target as HTMLElement).matches?.(':focus-visible'))setFocused(true);}} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))setFocused(false);}}>
    <div className={styles.viewport} onTouchStart={e=>{touch.current={x:e.touches[0].clientX,y:e.touches[0].clientY};}} onTouchEnd={e=>{if(!touch.current)return;const dx=e.changedTouches[0].clientX-touch.current.x;const dy=e.changedTouches[0].clientY-touch.current.y;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy))move(dx<0?1:-1);touch.current=null;}}>
      <div className={styles.track} style={{transform:`translateX(-${active*100}%)`}}>
        {items.map((slide,i)=><article key={slide.image} className={`${styles.slide} ${i===0?styles.sandglassSlide:""}`} aria-hidden={i!==active} aria-label={`${i+1} / 4`} aria-roledescription={t.slide}>
          <div className={styles.copy}><p className={styles.eyebrow}>{slide.label}</p>{i===0?<h1><span>{t.h1[0]}</span><span>{t.h1[1]}</span></h1>:<h2>{t.parts[i-1].map((part,j)=><span key={part}>{j>0&&<wbr/>}<span className={styles.phrase}>{part}</span></span>)}</h2>}<p className={styles.description}>{slide.copy}</p><Link href={slide.href} tabIndex={i===active?0:-1} className={styles.cta}>{t.cta} <span aria-hidden="true">↗</span></Link></div>
          <div className={styles.photo}>{i===0?<video ref={video} src="/videos/sandglass.mp4" muted loop playsInline preload="auto" className={styles.sandglass} aria-label={t.video} />:<Image src={`/images/corporate-hero/${slide.image}.png`} alt={slide.alt} fill sizes="100vw" priority={i===0} className={styles.image}/>}</div>
        </article>)}
      </div>
    </div>
    <div className={styles.controls}>
      <div className={styles.dots}>{items.map((s,i)=><button key={s.image} aria-label={t.position(i+1,s.title)} aria-current={active===i?"true":undefined} onClick={()=>setActive(i)}><span /></button>)}</div>
    </div>
    <p className={styles.srOnly} aria-live={running?'off':'polite'}>{t.position(active+1,items[active].title)}</p>
  </section>;
}
