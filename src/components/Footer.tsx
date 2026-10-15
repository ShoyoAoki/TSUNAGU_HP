"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { languageDestination, serviceLinks } from "./site/navigation";

export default function Footer() {
  const pathname = usePathname();
  const zh = pathname.startsWith("/zh");
  const prefix = zh ? "/zh" : "";
  return <footer className="site-footer">
    <div className="site-footer-main">
      <div className="site-footer-brand"><Image src="/images/consultation/owlmatch-logo.png" unoptimized alt="OwlMatch" width={800} height={171} /><p>{zh ? "运营公司：株式会社TSUNAGU" : "運営：株式会社TSUNAGU"}<br />{zh ? "收费职业介绍业务许可编号" : "有料職業紹介事業許可番号"}：46-ユ-300221</p></div>
      <nav aria-label={zh ? "页脚导航" : "フッターナビゲーション"}>
        <Link href={`${prefix}/service`}>{zh ? "服务介绍" : "中国人材の採用支援"}</Link>
        {!zh && serviceLinks.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        <Link href={`${prefix}/company`}>{zh ? "公司概况" : "会社概要"}</Link><Link href={`${prefix}/philosophy`}>{zh ? "经营理念" : "経営理念"}</Link>
        <Link href={`${prefix}/contact`}>{zh ? "联系我们" : "お問い合わせ"}</Link>
      </nav>
    </div>
    <div className="site-footer-bottom"><small>© {new Date().getFullYear()} TSUNAGU Inc.</small><div><Link href={`${prefix}/privacy`}>{zh ? "隐私政策" : "プライバシーポリシー"}</Link><Link href={`${prefix}/terms`}>{zh ? "使用条款" : "利用規約"}</Link><Link href={languageDestination(pathname)}>{zh ? "日本語" : "中文"}</Link></div></div>
  </footer>;
}
