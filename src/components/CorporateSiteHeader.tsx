"use client";
import {useEffect,useRef,useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";
import {languageDestination} from "./site/navigation";
import {ArrowRight,Menu,X} from "lucide-react";
import s from "./CorporateHeader.module.css";
import {zh as zhText} from "@/lib/i18n/zh";
const links=[["Philosophy","経営理念","/philosophy"],["Service","サービス","/service"],["Company","会社概要","/company"],["News","ニュース","/news"]];
const philosophy=[["Philosophy","経営理念・代表紹介","/philosophy"],["Mission","ミッション","/mission"],["Vision","ビジョン","/vision"],["Value","バリュー","/value"],["Origin","会社名・ロゴ由来","/origin"]];
const services=[["All Services","サービス一覧","/service"],["Physical AI","フィジカルAI人材","/service/physical-ai"],["Bilingual","日中バイリンガル人材","/service/bilingual"],["Internship","インターン採用","/service/internship"]];
const jaText={skip:"本文へ移動",home:"株式会社TSUNAGU トップページ",nav:"企業ナビゲーション",menu:"サイトメニュー",open:"メニューを開く",close:"メニューを閉じる",langGroup:"言語切替 / 切换语言",contact:"採用のご相談",links,philosophy,services};
export default function CorporateSiteHeader({alwaysVisible:requested=false}:{alwaysVisible?:boolean}){
 const pathname=usePathname()||"/";
 // Header.tsx keeps the top-of-page reveal only for "/"; the Chinese home mirrors it.
 const [compact,setCompact]=useState(false);
 const alwaysVisible=(requested&&pathname!=="/zh")||compact;const zh=pathname==="/zh"||pathname.startsWith("/zh/");const other=languageDestination(pathname);
 const t=zh?zhText.header:jaText;const root=zh?"/zh":"/";const contactHref=zh?"/zh/contact":"/contact";
 const lang=<div className={s.lang} role="group" aria-label={t.langGroup}>{zh?<><Link href={other} hrefLang="ja" lang="ja">JA</Link><span aria-current="true" lang="zh-Hans">中文</span></>:<><span aria-current="true" lang="ja">JA</span><Link href={other} hrefLang="zh-Hans" lang="zh-Hans">中文</Link></>}</div>;
 const toggleRef=useRef<HTMLButtonElement>(null);
 const [open,setOpen]=useState(false);const [mega,setMega]=useState<"Philosophy"|"Service"|null>(null);const [visible,setVisible]=useState(alwaysVisible);
 useEffect(()=>{const media=window.matchMedia('(max-width:900px)');const update=()=>{setCompact(media.matches);if(!media.matches)setOpen(false);};update();media.addEventListener('change',update);return()=>media.removeEventListener('change',update);},[]);
 useEffect(()=>{const onScroll=()=>{setVisible(alwaysVisible||scrollY>40);if(!alwaysVisible&&scrollY<=40){setOpen(false);setMega(null);}};onScroll();addEventListener('scroll',onScroll,{passive:true});return()=>removeEventListener('scroll',onScroll);},[alwaysVisible]);
 useEffect(()=>{if(!open)return;const old=document.body.style.overflow;document.body.style.overflow='hidden';const key=(e:KeyboardEvent)=>{if(e.key==='Escape'){setOpen(false);toggleRef.current?.focus();}};addEventListener('keydown',key);return()=>{document.body.style.overflow=old;removeEventListener('keydown',key);};},[open]);
 return <><a className="site-skip" href="#site-content">{t.skip}</a><header onKeyDown={e=>{if(e.key==="Escape")setMega(null);}} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setMega(null);}} style={{visibility:visible?"visible":"hidden",opacity:visible?1:0,transform:visible?"translateY(0)":"translateY(-100%)"}} aria-hidden={!visible} className={s.header} onMouseLeave={()=>setMega(null)}>
 <Link href={root} className={s.brand} aria-label={t.home}><Image src="/images/logo.png" alt="TSUNAGU" width={1600} height={873} priority unoptimized/></Link>
 <div className={s.right}>
 {<nav className={s.nav} aria-label={t.nav}>{t.links.map(([en,ja,href])=><div key={en} onMouseEnter={()=>setMega(en==='Philosophy'||en==='Service'?en:null)} onFocus={()=>setMega(en==='Philosophy'||en==='Service'?en:null)}><Link href={href}><span>{en}</span><small>{ja}</small></Link></div>)}</nav>}
 {lang}
 <button ref={toggleRef} className={s.toggle} aria-label={open?t.close:t.open} aria-expanded={open} aria-controls="corporate-menu" onClick={()=>{setOpen(!open);setMega(null);}}>{open?<X size={28}/>:<Menu size={28}/>}</button>
 <Link className={s.contact} href={contactHref}><span>{t.contact}</span><ArrowRight size={14} aria-hidden="true"/></Link>
 </div>
 {mega&&!open&&<div className={s.mega}><div className={s.megaTitle}>{mega} <ArrowRight size={24}/></div><div className={s.megaLinks}>{(mega==="Service"?t.services:t.philosophy).map(([en,ja,href])=><Link key={en} href={href} onClick={()=>{if(alwaysVisible)setMega(null);}}><strong>{ja}</strong><small>{en}</small></Link>)}</div></div>}
 </header>{open&&<div id="corporate-menu" className={s.menu}><nav aria-label={t.menu}>{t.links.map(([en,ja,href])=><Link key={en} href={href} onClick={()=>{setOpen(false);setMega(null);}}><span>{en}</span><small>{ja}</small></Link>)}</nav><div className={s.menuLang}>{lang}</div></div>}</>;
}
