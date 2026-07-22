import { Metadata } from "next";
import PhilosophyClient from "./PhilosophyClient";

export const metadata: Metadata = {
  title: "PHILOSOPHY | TSUNAGU",
  description: "代表メッセージ：時を、命と捉える。株式会社TSUNAGUの経営理念と、代表取締役 青木翔陽からのメッセージをご紹介します。",
  alternates: {
    canonical: "/philosophy",
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
