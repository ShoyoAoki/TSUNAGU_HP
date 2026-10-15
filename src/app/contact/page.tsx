import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "株式会社TSUNAGUへのお問い合わせページです。中国人材の採用のご相談、資料請求、取材・提携に関するお問い合わせを承ります。通常2営業日以内にご返信いたします。",
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
