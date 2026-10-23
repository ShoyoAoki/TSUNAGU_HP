import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import CompanyClient from "./CompanyClient";
import { zh } from "@/lib/i18n/zh";

export const metadata: Metadata = {
  title: zh.company.title,
  description: zh.company.description,
  alternates: {
    canonical: "/zh/company",
    languages: {
      ja: "/company",
      "zh-Hans": "/zh/company",
      "x-default": "/company",
    },
  },
  openGraph: { title: zh.company.title, description: zh.company.description, url: "/zh/company", locale: "zh_CN" },
};

// AboutPage構造化データ。zh画面表示の企業情報（本文）と内容を一致させています
const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "公司概况 | 株式会社TSUNAGU",
  url: `${SITE_URL}/zh/company`,
  inLanguage: "zh-Hans",
  mainEntity: {
    "@type": "Organization",
    name: "株式会社TSUNAGU",
    legalName: "株式会社TSUNAGU",
    foundingDate: "2025-03-03",
    founder: {
      "@type": "Person",
      name: "青木翔陽",
    },
    identifier: [
      {
        "@type": "PropertyValue",
        name: "法人番号",
        value: "9340001027157",
      },
      {
        "@type": "PropertyValue",
        name: "有料職業紹介事業許可番号",
        value: "46-ユ-300221",
      },
    ],
    additionalProperty: {
      "@type": "PropertyValue",
      name: "資本金",
      value: "5000000",
      unitText: "JPY",
    },
    address: [
      {
        "@type": "PostalAddress",
        addressCountry: "JP",
        postalCode: "899-5211",
        addressRegion: "鹿児島県",
        addressLocality: "姶良市",
        streetAddress: "加治木町反土4番15番地249",
      },
      {
        "@type": "PostalAddress",
        addressCountry: "JP",
        postalCode: "153-0063",
        addressRegion: "東京都",
        addressLocality: "目黒区",
        streetAddress: "目黒1丁目24-12 オリックス目黒ビル7F",
      },
    ],
    sameAs: ["https://owlmatch.ai"],
  },
};

export default function CompanyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />
      <CompanyClient />
    </>
  );
}
