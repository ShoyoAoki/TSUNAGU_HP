import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

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
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://bridg.inc"), // TODO: 本番ドメインに変更してください
  title: {
    default: "Bridg | Bridging Talent Across Asia",
    template: "%s | Bridg"
  },
  description: "中国の「就職難」と日本の「人手不足」をつなぐ、クロスボーダー型採用プラットフォーム。AIとデータで組織のポテンシャルを最大化します。",
  keywords: ["採用", "HR", "クロスボーダー", "グローバル採用", "エンジニア採用", "日中人材", "AIマッチング"],
  authors: [{ name: "Bridg Inc." }],
  creator: "Bridg Inc.",
  publisher: "Bridg Inc.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Bridg | 次世代グローバル採用プラットフォーム",
    description: "データとAIで、国境を越えた最適なマッチングを実現。日本の人手不足とアジアの才能をつなぐ、新しい採用インフラ。",
    url: "https://bridg.inc",
    siteName: "Bridg",
    locale: "ja_JP",
    type: "website",
    // images: [
    //   {
    //     url: '/og-image.png', // publicフォルダに画像を追加してください
    //     width: 1200,
    //     height: 630,
    //     alt: 'Bridg Platform',
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bridg | 次世代グローバル採用プラットフォーム",
    description: "国境を越えた才能のマッチングで、組織の未来を変える。",
    creator: "@bridg_inc", // TODO: 公式アカウントがあれば設定
    // images: ['/og-image.png'],
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
        <GoogleAnalytics />
        <SmoothScroll>
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
