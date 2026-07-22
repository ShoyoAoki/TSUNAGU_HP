import { Metadata } from "next";
import ValueClient from "./ValueClient";

export const metadata: Metadata = {
  title: "VALUE | TSUNAGU",
  description: "把时间，当作生命。为您介绍TSUNAGU的4项行动准则。",
  alternates: {
    canonical: "/zh/value",
    languages: {
      ja: "/value",
      "zh-Hans": "/zh/value",
      "x-default": "/value",
    },
  },
};

export default function ValuePage() {
  return <ValueClient />;
}
