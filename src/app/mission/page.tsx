import { Metadata } from "next";
import MissionClient from "./MissionClient";

export const metadata: Metadata = {
  title: "MISSION | TSUNAGU",
  description: "テクノロジーで世界中の『意志』を、つなぐ。TSUNAGUのミッションをご紹介します。",
  alternates: {
    canonical: "/mission",
    languages: {
      ja: "/mission",
      "zh-Hans": "/zh/mission",
      "x-default": "/mission",
    },
  },
};

export default function MissionPage() {
  return <MissionClient />;
}
