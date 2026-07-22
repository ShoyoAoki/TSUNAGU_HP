import type { Metadata } from "next";
import ServiceSummary from "../_components/ServiceSummary";
import Features from "../_components/Features";
import CallToAction from "../_components/CallToAction";

export const metadata: Metadata = {
  title: "Features | TSUNAGU",
  description:
    "OwlMatch的特色与功能。从IT人才远程试用录用，到双语人才推荐，再到跨境短期项目，AI平台让招聘全面自动化。",
  alternates: {
    canonical: "/zh/features",
    languages: {
      ja: "/features",
      "zh-Hans": "/zh/features",
      "x-default": "/features",
    },
  },
};

export default function FeaturesPage() {
  return (
    <main className="pt-20">
      <ServiceSummary />
      <Features />
      <CallToAction />
    </main>
  );
}
