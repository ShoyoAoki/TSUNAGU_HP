import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import Hero from "./_components/Hero";
import ServiceSummary from "./_components/ServiceSummary";
import Introduction from "./_components/Introduction";
import ProblemSolution from "./_components/ProblemSolution";
import Features from "./_components/Features";
import Platform from "./_components/Platform";
import CallToAction from "./_components/CallToAction";

export const metadata: Metadata = {
  title: "TSUNAGU | 跨境人力资源平台",
  description:
    "中国IT人才的远程试用录用、中日双语人才推荐、跨境短期项目。以AI平台「OwlMatch」连接中日两国的招聘与实务，株式会社TSUNAGU为您提供支持。",
  alternates: {
    canonical: "/zh",
    languages: {
      ja: "/",
      "zh-Hans": "/zh",
      "x-default": "/",
    },
  },
};

// Service構造化データ×3。文言はja版（src/app/page.tsx）と対応させています
const servicesJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "OwlMatch Remote",
    name: "OwlMatch Remote（IT人才事业部）",
    description:
      "为您提供中国顶尖高校的IT工程师・AI人才，先远程试用3～6个月，确认成果后再转为正式录用。零招聘成本即可启动的『先试用』模式，从根本上化解了传统人才中介的风险。",
    provider: { "@type": "Organization", name: "株式会社TSUNAGU" },
    areaServed: "JP",
    url: `${SITE_URL}/zh`,
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "OwlMatch Language",
    name: "OwlMatch Language（语言人才事业部）",
    description:
      "为商社・制造业・服务业等企业，推荐日语能力考试N2以上的中日双语人才。业务覆盖东京・大阪・名古屋・爱知等全日本地区，精选具备『语言能力×实务能力』的人才，实现精准匹配。",
    provider: { "@type": "Organization", name: "株式会社TSUNAGU" },
    areaServed: "JP",
    url: `${SITE_URL}/zh`,
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "OwlMatch Spot",
    name: "OwlMatch Spot（短期项目事业部）",
    description:
      "提供中国・亚洲当地的陪同出差、实地考察、商品调研、AI・数据类单次任务等，以天为单位灵活调配当地人才。短期项目的实绩，将成为转向长期录用（语言人才・OwlMatch Remote）的晋升通道。",
    provider: { "@type": "Organization", name: "株式会社TSUNAGU" },
    areaServed: "JP",
    url: `${SITE_URL}/zh`,
  },
];

export default function ZhHome() {
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
