import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "联系我们",
  description:
    "株式会社TSUNAGU联系页面。诚邀您咨询中国IT工程师的远程试用录用、中日双语人才推荐、跨境短期项目等相关事宜。我们通常会在2个工作日内回复。",
  alternates: {
    canonical: "/zh/contact",
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
