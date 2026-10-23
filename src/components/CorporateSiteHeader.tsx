"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {ArrowRight,Menu,X} from "lucide-react";
import s from "./CorporateHeader.module.css";
const links=[["Philosophy","経営理念・代表紹介","/philosophy"],["Service","サービス","/service"],["Company","会社概要","/company"],["News","ニュース","/news"]];
const philosophy=[["Philosophy","経営理念・代表紹介","/philosophy"],["Mission","ミッション","/mission"],["Vision","ビジョン","/vision"],["Value","バリュー","/value"],["Origin","会社名・ロゴ由来","/origin"]];
const services=[["All Services","サービス一覧","/service"],["Physical AI","フィジカルAI人材","/service/physical-ai"],["Bilingual","日中バイリンガル人材","/service/bilingual"],["Internship","インターン採用","/service/internship"]];
export default function CorporateSiteHeader({alwaysVisible=false}:{alwaysVisible?:boolean}){
 const [open,setOpen]=useState(false);const [mega,setMega]=useState<"Philosophy"|"Service"|null>(null);const [visible,setVisible]=useState(alwaysVisible);
 useEffect(()=>{const onScroll=()=>{setVisible(alwaysVisible||scrollY>40);if(!alwaysVisible&&scrollY<=40){setOpen(false);setMega(null);}};onScroll();addEventListener('scroll',onScroll,{passive:true});return()=>removeEventListener('scroll',onScroll);},[alwaysVisible]);
 useEffect(()=>{if(!open)return;const old=document.body.style.overflow;document.body.style.overflow='hidden';const key=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false);};addEventListener('keydown',key);return()=>{document.body.style.overflow=old;removeEventListener('keydown',key);};},[open]);
 return <><a className="site-skip" href="#site-content">本文へ移動</a><header onKeyDown={e=>{if(e.key==="Escape")setMega(null);}} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setMega(null);}} style={{visibility:visible?"visible":"hidden",opacity:visible?1:0,transform:visible?"translateY(0)":"translateY(-100%)"}} aria-hidden={!visible} className={s.header} onMouseLeave={()=>setMega(null)}>
 <Link href="/" className={s.brand} aria-label="株式会社TSUNAGU トップページ"><Image src="/images/logo.png" alt="TSUNAGU" width={1600} height={873} priority unoptimized/></Link>
 <div className={s.right}>
 {<nav className={s.nav} aria-label="企業ナビゲーション">{links.map(([en,ja,href])=><div key={en} onMouseEnter={()=>setMega(en==='Philosophy'||en==='Service'?en:null)} onFocus={()=>setMega(en==='Philosophy'||en==='Service'?en:null)}><Link href={href}><span>{en}</span><small>{ja}</small></Link></div>)}</nav>}
 <button className={s.toggle} aria-label={open?'メニューを閉じる':'メニューを開く'} aria-expanded={open} aria-controls="corporate-menu" onClick={()=>{setOpen(!open);setMega(null);}}>{open?<X size={28}/>:<Menu size={28}/>}</button>
 <Link className={s.contact} href="/contact"><span>採用のご相談</span><ArrowRight size={14} aria-hidden="true"/></Link>
 </div>
 {mega&&!open&&<div className={s.mega}><div className={s.megaTitle}>{mega} <ArrowRight size={24}/></div><div className={s.megaLinks}>{(mega==="Service"?services:philosophy).map(([en,ja,href])=><Link key={en} href={href} onClick={()=>{if(alwaysVisible)setMega(null);}}><strong>{ja}</strong><small>{en}</small></Link>)}</div></div>}
 </header>{open&&<div id="corporate-menu" className={s.menu}><nav aria-label="サイトメニュー">{links.map(([en,ja,href])=><Link key={en} href={href} onClick={()=>{setOpen(false);setMega(null);}}><span>{en}</span><small>{ja}</small></Link>)}</nav></div>}</>;
}
