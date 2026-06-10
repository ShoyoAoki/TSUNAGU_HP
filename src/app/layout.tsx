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
    description: "中国IT人材のリモートトライアル採用、日中バイリンガル人材の紹介、クロスボーダー・スポット案件。クロスボーダーHRプラットフォーム「OwlMatch」の株式会社TSUNAGU。",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} ${notoSerifJP.variable} font-sans antialiased bg-white text-gray-900`}>
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
