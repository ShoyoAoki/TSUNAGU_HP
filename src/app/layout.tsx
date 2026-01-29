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
  metadataBase: new URL("https://tsunaguinc.co.jp"),
  title: {
    default: "TSUNAGU | Bridging Talent Across Asia",
    template: "%s | TSUNAGU"
  },
  description: "テクノロジーで世界中の『意志』を、つなぐ。日本企業と中国のポテンシャルを最短距離でつなぐ、株式会社TSUNAGUのオフィシャルサイト。",
  keywords: ["TSUNAGU", "採用", "HR", "クロスボーダー", "グローバル採用", "エンジニア採用", "日中人材", "AIマッチング"],
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
    title: "TSUNAGU | Bridging Talent Across Asia",
    description: "テクノロジーで世界中の『意志』を、つなぐ。日本企業と中国のポテンシャルを最短距離でつなぐ、株式会社TSUNAGUのオフィシャルサイト。",
    url: "https://tsunaguinc.co.jp",
    siteName: "TSUNAGU",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: 'https://tsunaguinc.co.jp/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'TSUNAGU - Bridging Talent Across Asia',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TSUNAGU | Bridging Talent Across Asia",
    description: "テクノロジーで世界中の『意志』を、つなぐ。株式会社TSUNAGUのオフィシャルサイト。",
    creator: "@tsunagu_inc", // TODO: 公式アカウントがあれば設定
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
