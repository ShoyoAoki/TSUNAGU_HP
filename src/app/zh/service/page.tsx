import type { Metadata } from "next";
import ServiceDetailClient from "./ServiceDetailClient";

export const metadata: Metadata = {
  title: "OwlMatch | 跨境人力资源平台 | TSUNAGU",
  description:
    "OwlMatch（智枭）是株式会社TSUNAGU运营的跨境人力资源平台。通过 OwlMatch Remote（IT人才远程试用录用）／ OwlMatch Language（中日双语人才推荐）／ OwlMatch Spot（跨境短期项目）三条业务线，为连接中日两国的招聘与实务提供支持。",
  alternates: {
    canonical: "/zh/service",
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
