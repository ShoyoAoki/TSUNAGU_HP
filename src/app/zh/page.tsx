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
import { zh } from "@/lib/i18n/zh";

// Same structure as the Japanese home (src/app/page.tsx). Copy lives in src/lib/i18n/zh.ts.
const t = zh.home;
export const metadata: Metadata = {
  title: { absolute: t.meta.title },
  description: t.meta.description,
  twitter: { title: t.meta.title, description: t.meta.description },
  alternates: { canonical: "/zh", languages: { ja: "/", "zh-Hans": "/zh", "x-default": "/" } },
  openGraph: { title: t.meta.title, description: t.meta.ogDescription, url: "/zh", locale: "zh_CN" },
};
function Hiker({variant,position}:{variant:string;position:string}) {
  return <span className={`${flowStyles.hiker} ${position}`} aria-hidden="true"><Image src={`/images/hikers/${variant}.png`} alt="" width={1280} height={1280} sizes="180px" /></span>;
}
export default function ZhHome() {
  return <main id="main" className="om-page" lang="zh-Hans">
    <ServiceJsonLd name={t.jsonLd.name} description={t.jsonLd.description} path="/zh" />
    <CorporateHero locale="zh" />
    <CorporatePickup locale="zh" />
    <div className={flowStyles.story}>
    <svg className={flowStyles.ribbon} viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true"><path d="M-180 650 C70 650 120 190 470 210 C800 230 970 700 1260 620 C1550 540 1460 100 1180 120 C900 140 860 650 510 760 C240 845 90 720 -140 820" fill="none" stroke="#e4f6fa" strokeWidth="155" strokeLinecap="round"/></svg>
    <section className={`om-section om-wrap ${blinkStyles.philosophy} ${flowStyles.philosophy}`}><div className="om-heading"><h2><span>{t.philosophy.lines[0]}</span><span>{t.philosophy.lines[1]}</span></h2><p>{t.philosophy.copy}</p></div><OwlMatchBlink locale="zh" /><Hiker variant="female" position={flowStyles.hikerMission} /></section>
    <section className={`om-section ${serviceStyles.section} ${flowStyles.services}`} aria-labelledby="services-title">
      <svg className={flowStyles.serviceCurve} viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden="true"><path d="M0 110 C220 -35 390 -15 680 75 C940 160 1130 160 1440 20 L1440 160 L0 160Z" fill="currentColor"/></svg>
      <div className="om-wrap">
        <h2 id="services-title" className={serviceStyles.title}>SERVICE</h2>
        <p className={flowStyles.bridge}>{t.service.bridge}</p><div className={serviceStyles.grid}>{t.service.cards.map((service,i)=><Link className={serviceStyles.card} href={service.href} key={service.href}>
          <div className={serviceStyles.visual}><Image src={service.image === "robotics" ? "/images/corporate-hero/physical-ai-robot-only.png" : `/images/corporate-hero/${service.image}.png`} alt="" width={1200} height={800} sizes="(max-width:700px) 90vw, 30vw" /></div>
          <div className={serviceStyles.body}><span className={serviceStyles.number}>0{i+1}</span><h3>{service.title}</h3><p>{service.copy}</p><span className={serviceStyles.more}>{t.service.more} <span className={flowStyles.roundArrow}><Arrow /></span></span></div>
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
        <div className={flowStyles.productCopy}><h2 id="owlmatch-title"><Image src="/images/consultation/owlmatch-logo.png" alt="OwlMatch" width={800} height={171} unoptimized /></h2><h3>{t.product.heading[0]}<br/>{t.product.heading[1]}</h3><p>{t.product.copy}</p><a className={flowStyles.sectionLink} href={t.product.href} hrefLang="ja">{t.product.link}<span className={flowStyles.roundArrow}><Arrow /></span></a><p className={flowStyles.productNote}>{t.product.note}</p></div>
        <figure className={flowStyles.productScreen}><div className={flowStyles.laptop}><div className={flowStyles.laptopDisplay}><div className={flowStyles.productViewport}><Image src="/images/corporate-hero/owlmatch-product-preview.png" alt={t.product.alt} width={1280} height={720} sizes="(max-width:700px) 90vw, 55vw"/></div></div><div className={flowStyles.laptopBase} aria-hidden="true" /></div></figure>
        <Hiker variant="female-green" position={flowStyles.hikerProduct} />
      </section>
      <section className={`om-wrap ${flowStyles.about}`} aria-labelledby="about-section-title"><h2 id="about-section-title" className={flowStyles.productTitle}>ABOUT US</h2><div><h2 id="about-title">{t.about.heading[0]}<br/>{t.about.heading[1]}</h2></div><div className={flowStyles.aboutCopy}><p>{t.about.copy}</p><div className={flowStyles.aboutLinks}><Link href="/zh/company">{t.about.company}<span className={flowStyles.roundArrow}><Arrow /></span></Link><Link href="/zh/philosophy"><span><span style={{display:"inline-block"}}>{t.about.philosophy[0]}</span><span style={{display:"inline-block"}}>{t.about.philosophy[1]}</span></span><span className={flowStyles.roundArrow}><Arrow /></span></Link></div></div><Hiker variant="male" position={flowStyles.hikerAbout} /></section>
      <section className={flowStyles.contact}><div className={`om-wrap ${flowStyles.contactInner}`}><div><Eyebrow>CONTACT</Eyebrow><h2>{t.contact.heading}</h2><p>{t.contact.copy}</p></div><Link className={flowStyles.contactButton} href="/zh/contact"><span>{t.contact.button}</span><span className={flowStyles.roundArrow}><Arrow /></span></Link>

      </div><Hiker variant="female-green" position={flowStyles.hikerContact} /></section>
    </div>
  </main>;
}
