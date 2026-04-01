"use client";

import { motion } from "framer-motion";

const features = [
  {
    id: "01",
    label: "BRJ",
    title: "IT系人材事業部",
    desc: "中国トップ大学のITエンジニア・AI人材を、まずリモートで3〜6ヶ月トライアル。成果を見てから正社員採用へ。採用コストゼロで始められる「まず試す」モデルが、従来の人材紹介のリスクを根本から解消します。",
    color: "bg-cyan-500",
    shadow: "shadow-[4px_4px_0px_0px_#06b6d4]",
  },
  {
    id: "02",
    label: "Language",
    title: "言語系人材事業部",
    desc: "日本語能力試験N2以上の中国語・日本語バイリンガル人材を、商社・メーカー・サービス業を中心にご紹介。愛知・東海エリアを軸に、中国ビジネスに不可欠な「語学力×実務力」を持つ人材を厳選してマッチングします。",
    color: "bg-purple-500",
    shadow: "shadow-[4px_4px_0px_0px_#a855f7]",
  },
];

// Pixel Pattern Component
const PixelDecor = ({ className }: { className?: string }) => (
  <div className={`flex gap-1 ${className}`}>
    <div className="w-1 h-1 bg-current opacity-20" />
    <div className="w-1 h-1 bg-current opacity-40" />
    <div className="w-1 h-1 bg-current opacity-60" />
    <div className="w-1 h-1 bg-current opacity-80" />
    <div className="w-1 h-1 bg-current" />
  </div>
);

export default function ServiceSummary() {
  return (
    <section className="py-24 bg-white border-b border-gray-200 relative z-20">
      {/* Background Grid - Subtle */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
           style={{
             backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
             backgroundSize: '20px 20px'
           }}
      />

      <div className="container mx-auto px-6 max-w-7xl relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
        >
          {features.map((feature, index) => (
            <div 
              key={index}
              className="relative bg-white border-2 border-black p-8"
            >
              {/* Hard Shadow Box */}
              <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 -z-10" />

              {/* Accent Bar */}
              <div className={`absolute top-0 left-0 w-full h-1 ${feature.color}`} />
              
              {/* Header */}
              <div className="flex items-baseline justify-between mb-6">
                <span className="text-3xl font-semibold font-mono tracking-tight text-gray-900">
                  {feature.id}
                </span>
                <PixelDecor className="text-gray-400" />
              </div>

              <span className="font-mono text-[10px] tracking-widest uppercase text-gray-500">
                {feature.label}
              </span>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 tracking-tight mt-1">
                {feature.title}
              </h3>
              
              <p className="text-sm font-medium text-gray-600 leading-relaxed">
                {feature.desc}
              </p>

              {/* Corner Accents */}
              <div className="absolute bottom-2 right-2 w-2 h-2 bg-black" />
              <div className="absolute top-2 left-2 w-1 h-1 bg-black" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
