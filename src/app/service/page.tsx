import ServiceDetailClient from "./ServiceDetailClient";

export const metadata = {
  title: "Service | TSUNAGU",
  description: "Owl Match Remote（IT人材のリモートトライアル採用）、言語系本線採用（日中バイリンガル人材の紹介）、Owl Match Spot（クロスボーダー・スポット案件）。TSUNAGUの3つの事業で、日中をつなぐ採用と実務を支援します。",
};

export default function ServicePage() {
  return (
    <>
      <ServiceDetailClient />
    </>
  );
}
