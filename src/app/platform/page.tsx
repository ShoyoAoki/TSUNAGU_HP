import Platform from "@/components/Platform";
import CallToAction from "@/components/CallToAction";

export const metadata = {
  title: "Platform | TSUNAGU",
  description: "Bridgのプラットフォーム。多言語対応、価値観スコアリング、データドリブンな採用。",
};

export default function PlatformPage() {
  return (
    <main className="pt-20">
      <Platform />
      <CallToAction />
    </main>
  );
}
