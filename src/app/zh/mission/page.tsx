import { Metadata } from "next";
import MissionClient from "./MissionClient";

export const metadata: Metadata = {
  title: "MISSION | TSUNAGU",
  description: "以科技连接世界各地的『意志』。为您介绍TSUNAGU的使命。",
  alternates: {
    canonical: "/zh/mission",
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
