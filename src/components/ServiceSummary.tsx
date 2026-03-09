"use client";

import { motion } from "framer-motion";

const features = [
  {
    id: "01",
    title: "リモートで試して、納得してから採用",
    desc: "中国のIT人材をまず3〜6ヶ月リモートで受け入れ、実際のパフォーマンスを確認してから正社員採用へ。採用コストゼロで始められる「Track A」モデルが、従来の人材紹介のリスクを根本から解消します。",
    color: "bg-cyan-500",
    shadow: "shadow-[4px_4px_0px_0px_#06b6d4]",
  },
  {
    id: "02",
    title: "北京大学・清華大学のトップ人材に直結",
    desc: "CEO自身が北京大学出身。トップ大学のアルムナイネットワークを活用し、中国STEM年間500万人超の卒業生から厳選された即戦力エンジニア・バイリンガル人材を直接ご提案します。",
    color: "bg-purple-500",
    shadow: "shadow-[4px_4px_0px_0px_#a855f7]",
  },
  {
    id: "03",
    title: "採用から定着まで、ワンストップ支援",
    desc: "リモートワーク開始から、ビザ申請・来日・住居手配・生活セットアップまで完全サポート。採用後3ヶ月のフォローアップで定着率を最大化。競合にはない「来日後の定着支援」がTSUNAGUの強みです。",
    color: "bg-yellow-500",
    shadow: "shadow-[4px_4px_0px_0px_#eab308]",
  }
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
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
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

              <h3 className="text-lg font-semibold text-gray-900 mb-4 tracking-tight">
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
