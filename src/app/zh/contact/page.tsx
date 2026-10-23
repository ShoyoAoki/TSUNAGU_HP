import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import { zh } from "@/lib/i18n/zh";

export const metadata: Metadata = {
  title: zh.contact.title,
  description: zh.contact.description,
  alternates: {
    canonical: "/zh/contact",
    languages: {
      ja: "/contact",
      "zh-Hans": "/zh/contact",
      "x-default": "/contact",
    },
  },
  openGraph: { title: zh.contact.title, description: zh.contact.description, url: "/zh/contact", locale: "zh_CN" },
};

export default function ContactPage() {
  return <ContactClient />;
}
