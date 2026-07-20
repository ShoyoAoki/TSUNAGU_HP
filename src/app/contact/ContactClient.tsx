"use client";

import { Mail, Clock, MapPin } from "lucide-react";
import { useContact } from "@/context/ContactContext";

// Square Pixel Grid Component（他ページと共通のトーン）
const PixelGrid = ({ className }: { className?: string }) => (
  <div
    className={`absolute inset-0 pointer-events-none opacity-[0.03] ${className}`}
    style={{
      backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
      backgroundSize: '40px 40px',
    }}
  />
);

const infoItems = [
  {
    icon: Mail,
    label: "対応内容",
    en: "What we handle",
    value: "採用のご相談、資料請求、取材・提携に関するお問い合わせを承ります。",
  },
  {
    icon: Clock,
    label: "返信目安",
    en: "Response time",
    value: "通常2営業日以内に、担当者よりご連絡いたします。",
  },
  {
    icon: MapPin,
    label: "所在地",
    en: "Location",
    value: "東京オフィス：東京都目黒区目黒1丁目24-12 オリックス目黒ビル7F\n本社：鹿児島県姶良市加治木町反土4番15番地249",
  },
];

export default function ContactClient() {
  const { openContact } = useContact();

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-48 pb-24 overflow-hidden border-b border-gray-100">
        <PixelGrid />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-cyan-500" />
              <span className="text-sm font-mono font-bold text-cyan-500 uppercase tracking-[0.2em]">Contact</span>
              <div className="w-12 h-px bg-cyan-500" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-8 leading-tight">
              お問い合わせ
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              中国人ITエンジニアのリモートトライアル採用、日中バイリンガル人材の紹介、クロスボーダー・スポット案件について、下記フォームよりお気軽にご相談ください。初期費用なし・成功報酬型でご案内します。
            </p>
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {infoItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="bg-white p-8 border border-gray-200 relative group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gray-200 group-hover:bg-cyan-500 transition-colors" />
                  <Icon className="w-6 h-6 text-cyan-600 mb-4" strokeWidth={1.5} />
                  <h2 className="text-lg font-bold text-gray-900 mb-1">{item.label}</h2>
                  <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-4">{item.en}</p>
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{item.value}</p>
                </div>
              );
            })}
          </div>

          <div className="max-w-5xl mx-auto text-center">
            <button
              onClick={openContact}
              className="inline-flex items-center gap-3 px-10 py-5 bg-black text-white font-semibold text-base md:text-lg hover:bg-gray-800 transition-colors rounded-sm"
            >
              <Mail className="w-5 h-5" strokeWidth={1.5} />
              お問い合わせフォームを開く
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
