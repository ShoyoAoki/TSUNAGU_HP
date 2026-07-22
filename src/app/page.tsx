import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import Hero from "@/components/Hero";
import ServiceSummary from "@/components/ServiceSummary";
import Introduction from "@/components/Introduction";
import ProblemSolution from "@/components/ProblemSolution";
import Features from "@/components/Features";
import Platform from "@/components/Platform";
import CallToAction from "@/components/CallToAction";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: {
      ja: "/",
      "zh-Hans": "/zh",
      "x-default": "/",
    },
  },
};

// Service構造化データ×3。文言はホームページの表示テキスト（components/ServiceSummary.tsx）と一致させています
const servicesJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "OwlMatch Remote",
    name: "OwlMatch Remote（IT系人材事業部）",
    description:
      "中国トップ大学のITエンジニア・AI人材を、まずリモートで3〜6ヶ月トライアル。成果を見てから正社員採用へ。採用コストゼロで始められる「まず試す」モデルが、従来の人材紹介のリスクを根本から解消します。",
    provider: { "@type": "Organization", name: "株式会社TSUNAGU" },
    areaServed: "JP",
    url: SITE_URL,
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "OwlMatch Language",
    name: "OwlMatch Language（言語系人材事業部）",
    description:
      "日本語能力試験N2以上の中国語・日本語バイリンガル人材を、商社・メーカー・サービス業を中心にご紹介。東京・大阪・名古屋・愛知をはじめ全国の企業様に対応し、中国ビジネスに不可欠な「語学力×実務力」を持つ人材を厳選してマッチングします。",
    provider: { "@type": "Organization", name: "株式会社TSUNAGU" },
    areaServed: "JP",
    url: SITE_URL,
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "OwlMatch Spot",
    name: "OwlMatch Spot（スポット案件事業部）",
    description:
      "中国・アジア現地でのアテンド、視察、商材リサーチ、AI・データ系の単発タスクまで、日単位で稼働する現地人材を提供。スポット稼働の実績が本線採用（言語系・OwlMatch Remote）への昇格ファネルになります。",
    provider: { "@type": "Organization", name: "株式会社TSUNAGU" },
    areaServed: "JP",
    url: SITE_URL,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-cyan-100 selection:text-cyan-900">
      {servicesJsonLd.map((service) => (
        <script
          key={service.serviceType}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
        />
      ))}
      <Hero />
      <ServiceSummary />
      <Introduction />
      <ProblemSolution />
      <Features />
      <Platform />
      <CallToAction />
    </main>
  );
}
