import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Providers from "@/components/Providers";
import { SITE_URL } from "@/lib/site";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  weight: ["400", "500", "700"],
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  variable: "--font-noto-serif-jp",
  weight: ["400", "700"],
});

export const viewport: Viewport = {
  themeColor: "#06b6d4", // Cyan-500
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TSUNAGU | クロスボーダーHRプラットフォーム",
    template: "%s | TSUNAGU"
  },
  description: "中国IT人材のリモートトライアル採用、日中バイリンガル人材の紹介、クロスボーダー・スポット案件。AIプラットフォーム「OwlMatch」で日中をつなぐ採用と実務を支援する株式会社TSUNAGU。",
  keywords: ["TSUNAGU", "OwlMatch", "中国人採用", "IT人材不足", "クロスボーダーHR", "リモートトライアル", "エンジニア採用", "日中人材", "外国人IT人材", "中国エンジニア", "バイリンガル人材", "言語系人材", "日中バイリンガル", "スポット案件", "中国アテンド"],
  authors: [{ name: "TSUNAGU Inc." }],
  creator: "TSUNAGU Inc.",
  publisher: "TSUNAGU Inc.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "TSUNAGU | クロスボーダーHRプラットフォーム",
    description: "中国IT人材のリモートトライアル採用、日中バイリンガル人材の紹介、クロスボーダー・スポット案件。クロスボーダーHRプラットフォーム「OwlMatch」の株式会社TSUNAGU。",
    url: SITE_URL,
    siteName: "TSUNAGU",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'TSUNAGU - クロスボーダーHRプラットフォーム',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TSUNAGU | クロスボーダーHRプラットフォーム",
    description: "中国IT人材のリモートトライアル採用、日中バイリンガル人材の紹介、クロスボーダー・スポット案件。クロスボーダーHRプラットフォーム「OwlMatch」の株式会社TSUNAGU。",
    creator: "@tsunagu_inc",
    images: [`${SITE_URL}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// AI検索エンジン・従来型検索エンジン向けの構造化データ（Organization + WebSite）
// 記載情報は全て確定済みの一次情報のみを使用しています（会社概要ページ src/app/company/page.tsx と一致）
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "株式会社TSUNAGU",
  legalName: "株式会社TSUNAGU",
  alternateName: "TSUNAGU Inc.",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
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
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "TSUNAGU | クロスボーダーHRプラットフォーム",
  url: SITE_URL,
  publisher: {
    "@type": "Organization",
    name: "株式会社TSUNAGU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} ${notoSerifJP.variable} font-sans antialiased bg-white text-gray-900`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Providers>
          <GoogleAnalytics />
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
