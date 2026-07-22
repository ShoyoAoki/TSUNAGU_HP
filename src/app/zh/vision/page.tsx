import VisionClient from "./VisionClient";

export const metadata = {
  title: "Vision",
  description: "消除劳动机会的国界。株式会社TSUNAGU的愿景。",
  alternates: {
    canonical: "/zh/vision",
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
