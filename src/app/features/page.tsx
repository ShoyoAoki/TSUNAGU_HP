import Features from "@/components/Features";
import ServiceSummary from "@/components/ServiceSummary";
import CallToAction from "@/components/CallToAction";

export const metadata = {
  title: "Features",
  description: "Bridgの特徴と機能。IT人材のリモートトライアル採用からバイリンガル人材の紹介まで、AIプラットフォームで採用を自動化。",
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
