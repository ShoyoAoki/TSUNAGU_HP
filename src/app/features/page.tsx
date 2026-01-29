import Features from "@/components/Features";
import ServiceSummary from "@/components/ServiceSummary";
import CallToAction from "@/components/CallToAction";

export const metadata = {
  title: "Features | TSUNAGU",
  description: "Bridgの特徴と機能。中国ハイクラス人材、動画マッチング、成果報酬型採用。",
};

export default function FeaturesPage() {
  return (
    <main className="pt-20">
      <ServiceSummary />
      <Features />
      <CallToAction />
    </main>
  );
}
