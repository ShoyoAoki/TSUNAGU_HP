"use client";

import { motion } from "framer-motion";

const features = [
  {
    id: "01",
    title: "多様な層を網羅する独自の人材データベース",
    desc: "北京大学・清華大学をはじめとするトップ層から、現場の即戦力となる特定技能人材まで幅広く網羅。 IT・エンジニア、マーケティング、製造、外食など、貴社の成長フェーズと現場のニーズに最適化した「意志ある才能」を提案します。従来の画一的な採用市場では出会えない、層の厚い人材プールがBridgの強みです。",
    color: "bg-cyan-500",
    shadow: "shadow-[4px_4px_0px_0px_#06b6d4]",
  },
  {
    id: "02",
    title: "動画 × 価値観マッチ",
    desc: "履歴書だけでは分からない「人柄」や「熱量」を動画レジュメで可視化。Bridg独自のRPG風診断で、スキルだけでなくカルチャーマッチ度も測定。",
    color: "bg-purple-500",
    shadow: "shadow-[4px_4px_0px_0px_#a855f7]",
  },
  {
    id: "03",
    title: "独自コミュニティによる即時接続",
    desc: "独自のコミュニティを形成しています。既に形成された強固なネットワークを活用することで、ゼロからの母集団形成を排し、必要な才能との最短距離での接続を可能にします。",
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
