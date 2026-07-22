import { Metadata } from "next";
import PhilosophyClient from "./PhilosophyClient";

export const metadata: Metadata = {
  title: "PHILOSOPHY | TSUNAGU",
  description:
    "代表寄语：把时间，当作生命。为您介绍株式会社TSUNAGU的经营理念，以及代表取缔役CEO 青木翔阳的寄语。",
  alternates: {
    canonical: "/zh/philosophy",
    languages: {
      ja: "/philosophy",
      "zh-Hans": "/zh/philosophy",
      "x-default": "/philosophy",
    },
  },
};

export default function PhilosophyPage() {
  return <PhilosophyClient />;
}
