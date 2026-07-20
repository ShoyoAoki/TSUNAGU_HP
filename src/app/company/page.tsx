import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import CompanyClient from "./CompanyClient";

export const metadata: Metadata = {
  title: "会社概要",
  description: "株式会社TSUNAGU（クロスボーダーHRプラットフォームOwlMatch運営）の会社概要。設立2025年3月3日・資本金500万円・代表取締役 青木翔陽。本社：鹿児島県姶良市、東京オフィス：東京都目黒区。有料職業紹介事業許可番号 46-ユ-300221。",
  alternates: {
    canonical: "/company",
  },
};

// AboutPage構造化データ。画面表示の企業情報（本文）と内容を一致させています
const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "会社概要 | 株式会社TSUNAGU",
  url: `${SITE_URL}/company`,
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
