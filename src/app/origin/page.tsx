import { Metadata } from "next";
import OriginClient from "./OriginClient";

export const metadata: Metadata = {
  title: "ORIGIN | TSUNAGU",
  description: "株式会社TSUNAGUの社名とロゴの由来をご紹介します。有限な時間の中で、無限の価値を創造する私たちの決意を込めています。",
};

export default function OriginPage() {
  return <OriginClient />;
}
