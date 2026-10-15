"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { candidateSignup, employerContact, languageDestination, serviceLinks } from "./site/navigation";

function Navigation({ close }: { close?: () => void }) {
  const pathname = usePathname();
  const zh = pathname === "/zh" || pathname.startsWith("/zh/");
  const prefix = zh ? "/zh" : "";
  const item = (href: string, label: string, featured = false) => (
    <Link href={href} key={href} onClick={close} aria-current={pathname === href ? "page" : undefined} className={featured ? "site-nav-featured" : undefined}>
      <span>{label.split("・").map((part, index, parts) => <span className="site-nav-term" key={index}>{part}{index < parts.length - 1 ? "・" : ""}</span>)}</span><span aria-hidden="true">↗</span>
    </Link>
  );
  return <nav className="site-navigation" aria-label={zh ? "主要导航" : "メインナビゲーション"}>
    <div className="site-nav-group">
      <p>{zh ? "OwlMatch 服务" : "OwlMatch のサービス"}</p>
      {item(zh ? "/zh" : "/", zh ? "首页" : "就職・転職をお考えの方")}
      {item(`${prefix}/service`, zh ? "服务介绍" : "中国人材を採用したい企業様")}
      {!zh && serviceLinks.map(link => item(link.href, link.label, link.href.endsWith("physical-ai")))}
      {zh && item("/service/physical-ai", "具身智能・机器人（日本語）", true)}
    </div>
    <div className="site-nav-group site-company-links">
      <p>{zh ? "关于 TSUNAGU" : "TSUNAGU について"}</p>
      {item(`${prefix}/company`, zh ? "公司概况" : "会社概要")}
      {item(`${prefix}/philosophy`, zh ? "经营理念" : "経営理念")}
      <div className="site-nav-small">
        {item(`${prefix}/mission`, zh ? "使命" : "ミッション")}
        {item(`${prefix}/vision`, zh ? "愿景" : "ビジョン")}
        {item(`${prefix}/value`, zh ? "价值观" : "バリュー")}
        {item(`${prefix}/origin`, zh ? "公司名与标志" : "社名・ロゴの由来")}
      </div>
      {item(`${prefix}/contact`, zh ? "联系我们" : "会社へのお問い合わせ")}
    </div>
  </nav>;
}
function Brand() {
  const pathname = usePathname();
  return <Link href={pathname.startsWith("/zh") ? "/zh" : "/"} className="site-brand" aria-label="OwlMatch・株式会社TSUNAGU トップページ">
    <Image src="/images/consultation/owlmatch-logo.png" unoptimized alt="OwlMatch" width={800} height={171} priority />
    <span>株式会社TSUNAGUの人材紹介サービス</span>
  </Link>;
}
export default function Header() {
  const pathname = usePathname();
  const zh = pathname.startsWith("/zh");
  const [open, setOpen] = useState(false);
  const drawer = useRef<HTMLDialogElement>(null);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const el = drawer.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
    const previous = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  const langLabel = zh ? "日本語" : pathname.startsWith("/service/") ? "中文・服务总览" : "中文";
  return <>
    <a className="site-skip" href="#site-content">{zh ? "跳至正文" : "本文へ移動"}</a>
    <header className="site-topbar">
      <div className="site-header-brand"><Brand /></div>
      <div className="site-header-actions">
        <Link className="site-button site-button-orange" href={employerContact}><span className="site-desktop-label">{zh ? "企业招聘咨询" : "中国人材の採用相談"}</span><span className="site-mobile-label">{zh ? "招聘咨询" : "企業の採用相談"}</span><ArrowUpRight size={17} aria-hidden="true" /></Link>
        <Link className="site-button site-button-blue site-header-candidate" href={candidateSignup}>{zh ? "免费求职咨询" : "無料面談に申し込む"}<ArrowUpRight size={17} aria-hidden="true" /></Link>
        <button className="site-menu-toggle" type="button" aria-label={zh ? "打开菜单" : "メニューを開く"} aria-haspopup="dialog" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(true)}><Menu size={25} /><span>MENU</span></button>
      </div>
    </header>
    <dialog ref={drawer} id="site-menu" className="site-drawer" aria-label={zh ? "网站菜单" : "サイトメニュー"} onCancel={() => setOpen(false)} onClose={() => setOpen(false)} onClick={event => { if (event.target === event.currentTarget) setOpen(false); }}>
      <div className="site-drawer-inner">
        <div className="site-drawer-head"><Brand /><button type="button" autoFocus onClick={() => setOpen(false)} aria-label={zh ? "关闭菜单" : "メニューを閉じる"}><X size={26} /></button></div>
        <Navigation close={() => setOpen(false)} />
        <Link className="site-button site-button-blue" href={candidateSignup}>{zh ? "免费求职咨询" : "無料面談に申し込む"}<ArrowUpRight size={18} aria-hidden="true" /></Link>
        <Link className="site-drawer-lang" href={languageDestination(pathname)} onClick={() => setOpen(false)}>{langLabel} ↗</Link>
        <p className="site-drawer-company">運営：株式会社TSUNAGU<br />有料職業紹介事業許可番号：46-ユ-300221</p>
      </div>
    </dialog>
  </>;
}
