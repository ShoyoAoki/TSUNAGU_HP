import ServiceDetailClient from "./ServiceDetailClient";

export const metadata = {
  title: "Service | Bridg",
  description: "Bridgの採用支援サービス。日本企業とアジアの才能を最短距離でつなぐ、特定技能・高度人材の採用に特化した最適化プラットフォーム。",
};

export default function ServicePage() {
  return (
    <>
      <ServiceDetailClient />
    </>
  );
}
