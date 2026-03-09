import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
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
    default: "TSUNAGU | 中国IT人材 × リモートトライアル採用",
    template: "%s | TSUNAGU"
  },
  description: "採用前にリモートで試せる。中国トップ大学のIT人材・バイリンガル人材を、リスクゼロで日本企業へ。AIプラットフォーム「Bridg」でクロスボーダー採用を自動化する株式会社TSUNAGU。",
  keywords: ["TSUNAGU", "中国人採用", "IT人材不足", "クロスボーダーHR", "リモートトライアル", "エンジニア採用", "日中人材", "Bridg", "外国人IT人材", "中国エンジニア"],
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
    title: "TSUNAGU | 中国IT人材 × リモートトライアル採用",
    description: "採用前にリモートで試せる。中国トップ大学のIT人材を、リスクゼロで日本企業へ。クロスボーダーHRプラットフォーム「Bridg」の株式会社TSUNAGU。",
    url: "https://tsunaguinc.co.jp",
    siteName: "TSUNAGU",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: 'https://tsunaguinc.co.jp/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'TSUNAGU - 中国IT人材 × リモートトライアル採用',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TSUNAGU | 中国IT人材 × リモートトライアル採用",
    description: "採用前にリモートで試せる。中国トップ大学のIT人材を、リスクゼロで日本企業へ。株式会社TSUNAGUのオフィシャルサイト。",
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
        <GoogleAnalytics />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
