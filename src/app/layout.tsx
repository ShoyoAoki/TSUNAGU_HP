import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Providers from "@/components/Providers";

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
  metadataBase: new URL("https://tsunaguinc.co.jp"),
  title: {
    default: "TSUNAGU | クロスボーダーHRプラットフォーム",
    template: "%s | TSUNAGU"
  },
  description: "中国IT人材のリモートトライアル採用と、日中バイリンガル人材の紹介。AIプラットフォーム「Bridg」でクロスボーダー採用を支援する株式会社TSUNAGU。",
  keywords: ["TSUNAGU", "中国人採用", "IT人材不足", "クロスボーダーHR", "リモートトライアル", "エンジニア採用", "日中人材", "Bridg", "外国人IT人材", "中国エンジニア", "バイリンガル人材", "言語系人材", "日中バイリンガル"],
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
    description: "中国IT人材のリモートトライアル採用と、日中バイリンガル人材の紹介。クロスボーダーHRプラットフォーム「Bridg」の株式会社TSUNAGU。",
    url: "https://tsunaguinc.co.jp",
    siteName: "TSUNAGU",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: 'https://tsunaguinc.co.jp/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'TSUNAGU - クロスボーダーHRプラットフォーム',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TSUNAGU | クロスボーダーHRプラットフォーム",
    description: "中国IT人材のリモートトライアル採用と、日中バイリンガル人材の紹介。クロスボーダーHRプラットフォーム「Bridg」の株式会社TSUNAGU。",
    creator: "@tsunagu_inc",
    images: ['https://tsunaguinc.co.jp/opengraph-image'],
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

// 検索エンジン向けの企業情報（リッチリザルト・ナレッジグラフ対応）
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "株式会社TSUNAGU",
  alternateName: "TSUNAGU Inc.",
  url: "https://tsunaguinc.co.jp",
  logo: "https://tsunaguinc.co.jp/images/logo.png",
  description:
    "中国IT人材のリモートトライアル採用と、日中バイリンガル人材の紹介。AIプラットフォーム「Bridg」でクロスボーダー採用を支援する株式会社TSUNAGU。",
  foundingDate: "2025-03-03",
  founder: {
    "@type": "Person",
    name: "青木 翔陽",
  },
  address: [
    {
      "@type": "PostalAddress",
      postalCode: "899-5211",
      addressRegion: "鹿児島県",
      addressLocality: "姶良市",
      streetAddress: "加治木町反土4番15番地249",
      addressCountry: "JP",
    },
    {
      "@type": "PostalAddress",
      postalCode: "153-0063",
      addressRegion: "東京都",
      addressLocality: "目黒区",
      streetAddress: "目黒1丁目24-12 オリックス目黒ビル 7F",
      addressCountry: "JP",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@tsunaguinc.co.jp",
    contactType: "customer support",
    availableLanguage: ["ja", "zh", "en"],
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
