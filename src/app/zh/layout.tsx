import { SITE_URL } from "@/lib/site";
import LangCorrector from "./_components/LangCorrector";

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLdZh) }}
      />
      <LangCorrector />
      {children}
    </>
  );
}
