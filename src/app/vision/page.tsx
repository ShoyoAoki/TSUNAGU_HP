import VisionClient from "./VisionClient";

export const metadata = {
  title: "Vision",
  description: "労働機会の国境をなくす。株式会社TSUNAGUのビジョン。",
  alternates: {
    canonical: "/vision",
    languages: {
      ja: "/vision",
      "zh-Hans": "/zh/vision",
      "x-default": "/vision",
    },
  },
};

export default function VisionPage() {
  return <VisionClient />;
}
