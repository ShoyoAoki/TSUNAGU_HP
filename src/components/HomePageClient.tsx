"use client";

import dynamic from "next/dynamic";

const HomeClient = dynamic(() => import("@/components/HomeClient"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <p className="text-gray-500">読み込み中...</p>
    </div>
  ),
});

export default function HomePageClient() {
  return <HomeClient />;
}
