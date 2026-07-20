import Features from "@/components/Features";
import ServiceSummary from "@/components/ServiceSummary";
import CallToAction from "@/components/CallToAction";

export const metadata = {
  title: "Features | TSUNAGU",
  description: "OwlMatchの特徴と機能。IT人材のリモートトライアル採用、バイリンガル人材の紹介、クロスボーダー・スポット案件まで、AIプラットフォームで採用を自動化。",
  alternates: {
    canonical: "/features",
  },
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
