import ServiceDetailClient from "./ServiceDetailClient";

export const metadata = {
  title: "OwlMatch | クロスボーダーHRプラットフォーム | TSUNAGU",
  description: "OwlMatch（智枭）は、株式会社TSUNAGUが運営するクロスボーダーHRプラットフォーム。OwlMatch Remote（IT人材のリモートトライアル採用）／ OwlMatch Language（日中バイリンガル人材の紹介）／ OwlMatch Spot（クロスボーダー・スポット案件）の3ラインで、日中をつなぐ採用と実務を支援します。",
  alternates: {
    canonical: "/service",
    languages: {
      ja: "/service",
      "zh-Hans": "/zh/service",
      "x-default": "/service",
    },
  },
};

export default function ServicePage() {
  return (
    <>
      <ServiceDetailClient />
    </>
  );
}
