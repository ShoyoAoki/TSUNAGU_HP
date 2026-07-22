import { Metadata } from "next";
import OriginClient from "./OriginClient";

export const metadata: Metadata = {
  title: "ORIGIN | TSUNAGU",
  description:
    "为您介绍株式会社TSUNAGU公司名称与LOGO的由来。其中蕴含着我们在有限的时间里创造无限价值的决心。",
  alternates: {
    canonical: "/zh/origin",
    languages: {
      ja: "/origin",
      "zh-Hans": "/zh/origin",
      "x-default": "/origin",
    },
  },
};

export default function OriginPage() {
  return <OriginClient />;
}
