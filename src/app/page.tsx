import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import flowStyles from "@/components/CorporateFlow.module.css";
import serviceStyles from "@/components/CorporateServices.module.css";
import { Arrow, Eyebrow } from "@/components/recruitment/Recruitment";
import CorporatePickup from "@/components/CorporatePickup";
import CorporateHero from "@/components/CorporateHero";
import ServiceJsonLd from "@/components/recruitment/ServiceJsonLd";
import { serviceIndex } from "@/content/service-index";
import faqStyles from "@/app/service/service-index.module.css";
import homeStyles from "./home.module.css";

const homeFaqQuestions = ["中国人材の採用について、何から相談すればよいですか？", "どの分野の人材を紹介してもらえますか？", "相談は無料ですか？", "在留資格についても相談できますか？", "採用条件が決まっていなくても相談できますか？"];
const homeFaq = homeFaqQuestions.map(q => serviceIndex.faq.items.find(item => item.q === q)!);
const homeTitle = "株式会社TSUNAGU｜中国人材の紹介・定着支援";
const homeDescription = "中国人材採用・人材紹介の株式会社TSUNAGU。フィジカルAI、IT・AI、日中バイリンガル（JLPT N1以上）の人材紹介と、入社後の定着支援を行います。";
export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: homeDescription,
  twitter: { title: homeTitle, description: homeDescription },
  alternates: { canonical: "/", languages: { ja: "/", "zh-Hans": "/zh", "x-default": "/" } },
  openGraph: { title: homeTitle, description: homeDescription, url: "/" },
};
const services = [
  {
    title: "フィジカルAI人材",
    copy: "ロボット制御や機械学習に取り組む新卒人材を、企業の開発現場へ。",
    image: "physical-ai-robot-only",
    href: "/service/physical-ai",
  },
  {
    title: "日中バイリンガル人材",
    copy: "海外営業や顧客対応などに、日本語と中国語を活かせる人材を。",
    image: "bilingual",
    href: "/service/bilingual",
  },
  {
    title: "インターン採用",
    copy: "任せたい業務や受け入れの目的に合わせ、学生の採用を支援します。",
    image: "campus",
    href: "/service/internship",
  },
];

const supportSteps = [
  {
    title: "採用要件の整理",
    copy: "担当業務や採用時期を伺い、必要な経験や専門性を一緒に整理します。",
  },
  {
    title: "候補者のご紹介",
    copy: "採用要件に合う候補者をお探しし、ご紹介時に経験や希望をお伝えします。",
  },
  {
    title: "入社後の定着支援",
    copy: "入社後の働き方や職場でのご相談に対応します。支援内容は個別にご案内します。",
  },
];

export default function Home() {
  return (
    <main id="main" className={`om-page ${homeStyles.home}`}>
      <ServiceJsonLd name="TSUNAGUの採用支援" description="フィジカルAI人材、日中バイリンガル人材、インターンの採用と定着を支援します。" path="/" />
      <CorporateHero />

      <section className={`om-wrap ${homeStyles.section} ${homeStyles.services}`} aria-labelledby="services-title">
        <h2 id="services-title" className={homeStyles.heading}>3つの採用支援</h2>
        <div className={`${serviceStyles.grid} ${homeStyles.serviceGrid}`}>
          {services.map(service => (
            <Link className={`${serviceStyles.card} ${homeStyles.serviceCard}`} href={service.href} key={service.href}>
              <div className={`${serviceStyles.visual} ${homeStyles.serviceImage}`}>
                <Image src={`/images/corporate-hero/${service.image}.png`} alt="" width={1200} height={800} sizes="(max-width: 700px) 120px, 30vw" />
              </div>
              <div className={`${serviceStyles.body} ${homeStyles.serviceBody}`}>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <span className={`${serviceStyles.more} ${homeStyles.serviceMore}`} aria-hidden="true"><span>詳しく見る</span><Arrow /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={homeStyles.support} aria-labelledby="support-title">
        <div className={`om-wrap ${homeStyles.section} ${homeStyles.supportInner}`}>
          <div>
            <h2 id="support-title" className={homeStyles.heading}>採用前から入社後まで</h2>
            <p className={homeStyles.lead}>仕事内容や採用条件が決まる前から、ご相談いただけます。</p>
            <Link className={homeStyles.textAction} href="/service/process">採用の進め方を見る <Arrow /></Link>
          </div>
          <ol className={homeStyles.steps} role="list">
            {supportSteps.map((step, index) => (
              <li key={step.title}>
                <span aria-hidden="true" className={homeStyles.stepNumber}>0{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`om-wrap ${flowStyles.product} ${homeStyles.product}`} aria-labelledby="owlmatch-title">
        <div className={homeStyles.productCopy}>
          <h2 id="owlmatch-title"><Image src="/images/consultation/owlmatch-logo.png" alt="OwlMatch" width={800} height={171} unoptimized /></h2>
          <h3>人と企業をつなぐ<br />採用プラットフォーム</h3>
          <p className={homeStyles.lead}>TSUNAGUが開発・運営するクロスボーダーHRプラットフォームです。</p>
          <a className={homeStyles.textAction} href="https://owlmatch.ai/ja">OwlMatchを見る <Arrow /></a>
        </div>
        <figure className={flowStyles.productScreen}>
          <div className={flowStyles.laptop}>
            <div className={flowStyles.laptopDisplay}>
              <div className={flowStyles.productViewport}>
                <Image src="/images/corporate-hero/owlmatch-product-preview.png" alt="OwlMatchの日本語トップページ" width={1280} height={720} sizes="(max-width: 700px) 90vw, 55vw" />
              </div>
            </div>
            <div className={flowStyles.laptopBase} aria-hidden="true" />
          </div>
        </figure>
      </section>

      <div className={homeStyles.news}><CorporatePickup /></div>

      <section className={homeStyles.company} aria-labelledby="company-title">
        <div className={`om-wrap ${homeStyles.section} ${homeStyles.companyInner}`}>
          <div>
            <h2 id="company-title" className={homeStyles.heading}>株式会社TSUNAGU</h2>
            <p className={homeStyles.mission}>テクノロジーで世界中の『意志』をつなぐ</p>
            <p className={homeStyles.license}>有料職業紹介事業許可番号 46-ユ-300221</p>
          </div>
          <div className={homeStyles.companyLinks}>
            <Link className={homeStyles.textAction} href="/company">会社概要 <Arrow /></Link>
            <Link className={homeStyles.textAction} href="/philosophy">経営理念・代表紹介 <Arrow /></Link>
          </div>
        </div>
      </section>

      <section className={`om-wrap ${homeStyles.section} ${homeStyles.faq}`} aria-labelledby="home-faq-title">
        <div>
          <h2 id="home-faq-title" className={homeStyles.heading}>よくあるご質問</h2>
          <Link className={homeStyles.textAction} href="/service#faq">すべての質問を見る <Arrow /></Link>
        </div>
        <div className={faqStyles.faq}>
          {homeFaq.map(item => (
            <details key={item.q}>
              <summary>{item.q}<span aria-hidden="true">＋</span></summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={homeStyles.contact} aria-labelledby="home-contact-title">
        <div className={`om-wrap ${homeStyles.section} ${homeStyles.contactInner}`}>
          <div>
            <Eyebrow>初回のご相談は無料</Eyebrow>
            <h2 id="home-contact-title" className={homeStyles.heading}>中国人材の採用相談</h2>
            <p className={homeStyles.lead}>任せたい仕事や採用のお悩みをお聞かせください。</p>
          </div>
          <Link className={homeStyles.contactButton} href="/contact">採用について相談する <Arrow /></Link>
        </div>
      </section>
    </main>
  );
}
