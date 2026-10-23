import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import flowStyles from "@/components/CorporateFlow.module.css";
import serviceStyles from "@/components/CorporateServices.module.css";
import { Arrow, Eyebrow } from "@/components/recruitment/Recruitment";
import blinkStyles from "@/components/OwlMatchBlink.module.css";
import OwlMatchBlink from "@/components/OwlMatchBlink";
import CorporatePickup from "@/components/CorporatePickup";
import CorporateHero from "@/components/CorporateHero";
import ServiceJsonLd from "@/components/recruitment/ServiceJsonLd";

export const metadata: Metadata = {
  title: "株式会社TSUNAGU｜クロスボーダーHR・人材紹介",
  description: "株式会社TSUNAGUは、クロスボーダーHRプラットフォームOwlMatchの開発・運営、人材紹介・定着支援を行っています。",
  twitter: { title: "株式会社TSUNAGU｜クロスボーダーHR・人材紹介", description: "OwlMatchの開発・運営、人材紹介・定着支援を行う株式会社TSUNAGU。" },
  alternates: { canonical: "/" },
  openGraph: { title: "株式会社TSUNAGU｜クロスボーダーHR・人材紹介", description: "テクノロジーで世界中の『意志』をつなぐ。OwlMatchの開発・運営、人材紹介・定着支援を行う株式会社TSUNAGU。", url: "/" },
};
function Hiker({variant,position}:{variant:string;position:string}) {
  return <span className={`${flowStyles.hiker} ${position}`} aria-hidden="true"><Image src={`/images/hikers/${variant}.png`} alt="" width={1280} height={1280} sizes="180px" /></span>;
}
export default function Home() {
  return <main id="main" className="om-page">
    <ServiceJsonLd name="TSUNAGUの採用支援" description="フィジカルAI人材、日中バイリンガル人材、インターンの採用と定着を支援します。" path="/" />
    <CorporateHero />
    <CorporatePickup />
    <div className={flowStyles.story}>
    <svg className={flowStyles.ribbon} viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true"><path d="M-180 650 C70 650 120 190 470 210 C800 230 970 700 1260 620 C1550 540 1460 100 1180 120 C900 140 860 650 510 760 C240 845 90 720 -140 820" fill="none" stroke="#e4f6fa" strokeWidth="155" strokeLinecap="round"/></svg>
    <section className={`om-section om-wrap ${blinkStyles.philosophy} ${flowStyles.philosophy}`}><div className="om-heading"><h2><span>テクノロジーで</span><span>世界中の『意志』をつなぐ</span></h2><p>クロスボーダーHRプラットフォーム「OwlMatch」の開発・運営と、人材紹介・定着支援を通じて、人と企業をつなぎます。</p></div><OwlMatchBlink /><Hiker variant="female" position={flowStyles.hikerMission} /></section>
    <section className={`om-section ${serviceStyles.section} ${flowStyles.services}`} aria-labelledby="services-title">
      <svg className={flowStyles.serviceCurve} viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden="true"><path d="M0 110 C220 -35 390 -15 680 75 C940 160 1130 160 1440 20 L1440 160 L0 160Z" fill="currentColor"/></svg>
      <div className="om-wrap">
        <h2 id="services-title" className={serviceStyles.title}>SERVICE</h2>
        <p className={flowStyles.bridge}>一人ひとりの専門性を、事業の力へ。</p><div className={serviceStyles.grid}>{[
          {title:"フィジカルAI人材",copy:"フィジカルAI分野の新卒人材を、企業の開発現場へ。",image:"robotics",href:"/service/physical-ai"},
          {title:"日中バイリンガル人材",copy:"日本語と中国語、二つの言語と文化をつなぐ人材。",image:"bilingual",href:"/service/bilingual"},
          {title:"インターン採用",copy:"学生の意欲と、企業の現場をつなぐ採用支援。",image:"campus",href:"/service/internship"},
        ].map((service,i)=><Link className={serviceStyles.card} href={service.href} key={service.href}>
          <div className={serviceStyles.visual}><Image src={service.image === "robotics" ? "/images/corporate-hero/physical-ai-robot-only.png" : `/images/corporate-hero/${service.image}.png`} alt="" width={1200} height={800} sizes="(max-width:700px) 90vw, 30vw" /></div>
          <div className={serviceStyles.body}><span className={serviceStyles.number}>0{i+1}</span><h3>{service.title}</h3><p>{service.copy}</p><span className={serviceStyles.more}>詳しく見る <span className={flowStyles.roundArrow}><Arrow /></span></span></div>
        </Link>)}</div>
      </div>
      <Hiker variant="male-orange" position={flowStyles.hikerService} />
    </section>
    </div>
    <div className={flowStyles.journey}>
      <svg className={flowStyles.serviceExit} viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0H1440V30C1110 175 930 155 650 80C370 5 170 20 0 135Z" fill="#087caf"/></svg>
      <svg className={flowStyles.journeyLine} viewBox="0 0 1440 1300" preserveAspectRatio="none" aria-hidden="true"><path d="M1490 -30C950 110 120 100 150 510C170 840 1200 700 1100 920C1060 1000 920 1030 820 1080C620 1180 260 1200 0 1300H1440C1380 1170 1150 1085 1200 950C1330 600 270 740 250 510C220 200 950 210 1490 70Z" fill="#dceff4"/></svg>
      <section className={`om-wrap ${flowStyles.product}`} aria-labelledby="product-title">
        <h2 id="product-title" className={flowStyles.productTitle}>OUR PRODUCT</h2>
        <div className={flowStyles.productCopy}><h2 id="owlmatch-title"><Image src="/images/consultation/owlmatch-logo.png" alt="OwlMatch" width={800} height={171} unoptimized /></h2><h3>人と企業をつなぐ<br/>プラットフォーム</h3><p>TSUNAGUが開発・運営するクロスボーダーHRプラットフォーム「OwlMatch」。人材紹介・定着支援とともに、人と企業の出会いを支えます。</p><a className={flowStyles.sectionLink} href="https://owlmatch.ai/ja">OwlMatchを見る<span className={flowStyles.roundArrow}><Arrow /></span></a><p className={flowStyles.productNote}>JLPT N1取得者の就職・転職を支援します。</p></div>
        <figure className={flowStyles.productScreen}><div className={flowStyles.laptop}><div className={flowStyles.laptopDisplay}><div className={flowStyles.productViewport}><Image src="/images/corporate-hero/owlmatch-product-preview.png" alt="OwlMatchの日本語トップページ" width={1280} height={720} sizes="(max-width:700px) 90vw, 55vw"/></div></div><div className={flowStyles.laptopBase} aria-hidden="true" /></div></figure>
        <Hiker variant="female-green" position={flowStyles.hikerProduct} />
      </section>
      <section className={`om-wrap ${flowStyles.about}`} aria-labelledby="about-section-title"><h2 id="about-section-title" className={flowStyles.productTitle}>ABOUT US</h2><div><h2 id="about-title">意志をつなぎ<br/>可能性を広げる</h2></div><div className={flowStyles.aboutCopy}><p>株式会社TSUNAGUは、OwlMatchの開発・運営と、人材紹介・定着支援を行っています。技術と言語の専門性を活かし、人と企業をつなぎます。</p><div className={flowStyles.aboutLinks}><Link href="/company">会社概要<span className={flowStyles.roundArrow}><Arrow /></span></Link><Link href="/philosophy">経営理念<span className={flowStyles.roundArrow}><Arrow /></span></Link></div></div><Hiker variant="male" position={flowStyles.hikerAbout} /></section>
      <section className={flowStyles.contact}><div className={`om-wrap ${flowStyles.contactInner}`}><div><Eyebrow>CONTACT</Eyebrow><h2>次の出会いをここから</h2><p>必要な人材や採用時期が固まる前から、ご相談いただけます。</p></div><Link className={flowStyles.contactButton} href="/contact"><span>採用のご相談</span><span className={flowStyles.roundArrow}><Arrow /></span></Link>

      </div><Hiker variant="female-green" position={flowStyles.hikerContact} /></section>
    </div>
  </main>;
}
