import OwlMatchClient from "./OwlMatchClient";

// 注：next.config.mjsのredirects()により "/owlmatch" は "/service" へ恒久リダイレクトされるため、
// このページは実際には配信されません（SEO資産は/serviceへ一本化済み）。到達不能ですがcanonicalは実体を指しておきます。
export const metadata = {
  title: "OwlMatch | 労働機会の国境を、なくす",
  description:
    "OwlMatchは、自己紹介動画と80以上のAIエージェントで海外人材と日本企業をつなぐクロスボーダーHRプラットフォーム。リモートトライアル採用から日中バイリンガル紹介、現地スポット案件まで。",
  alternates: {
    canonical: "/service",
  },
};

export default function OwlMatchPage() {
  return <OwlMatchClient />;
}
