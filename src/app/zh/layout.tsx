import { Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import LangCorrector from "./_components/LangCorrector";

// 簡体字フォントは /zh 配下だけで読み込む（ルート layout に置くと日本語ページにも
// 約470KBの @font-face CSS が配信され、表示開始が遅れるため）。
// globals.css の html[lang="zh-Hans"] が参照するので :root に変数を定義する。
const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: false,
});

const notoSerifSC = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
  preload: false,
});

const scFontVars = `:root{--font-noto-sans-sc:${notoSansSC.style.fontFamily};--font-noto-serif-sc:${notoSerifSC.style.fontFamily};}`;

// zh用 WebSite 構造化データ（inLanguage: zh-Hans）。
// Organization の構造化データはルート layout.tsx が既に出力しているため複製しない。
const websiteJsonLdZh = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "TSUNAGU | 跨境人力资源平台",
  url: `${SITE_URL}/zh`,
  inLanguage: "zh-Hans",
  publisher: {
    "@type": "Organization",
    name: "株式会社TSUNAGU",
  },
};

export default function ZhLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: scFontVars }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLdZh) }}
      />
      <LangCorrector />
      {children}
    </>
  );
}
