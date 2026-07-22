import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "株式会社TSUNAGUへのお問い合わせページです。中国人ITエンジニアのリモートトライアル採用、日中バイリンガル人材紹介、クロスボーダー・スポット案件についてのご相談を承ります。通常2営業日以内にご返信いたします。",
  alternates: {
    canonical: "/contact",
    languages: {
      ja: "/contact",
      "zh-Hans": "/zh/contact",
      "x-default": "/contact",
    },
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
