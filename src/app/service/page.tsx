import ServiceDetailClient from "./ServiceDetailClient";

export const metadata = {
  title: "Service | TSUNAGU",
  description: "IT人材のリモートトライアル採用（BRJ事業）と、日中バイリンガル人材の紹介（言語系事業）。TSUNAGUの2つの事業で、クロスボーダー採用を支援します。",
};

export default function ServicePage() {
  return (
    <>
      <ServiceDetailClient />
    </>
  );
}
