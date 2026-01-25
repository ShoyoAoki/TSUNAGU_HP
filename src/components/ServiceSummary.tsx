"use client";

import { motion } from "framer-motion";

const features = [
  {
    id: "01",
    title: "中国ハイクラス人材",
    desc: "北京大・清華大をはじめとするTOP大学出身者や、IT・エンジニア領域の優秀な若手層など、日本の労働市場では出会えない人材データベース。",
    color: "bg-cyan-500",
    shadow: "shadow-[4px_4px_0px_0px_#06b6d4]",
  },
  {
    id: "02",
    title: "動画 × 価値観マッチ",
    desc: "履歴書だけでは分からない「人柄」や「熱量」を動画レジュメで可視化。独自のRPG風診断で、スキルだけでなくカルチャーマッチ度も測定。",
    color: "bg-purple-500",
    shadow: "shadow-[4px_4px_0px_0px_#a855f7]",
  },
  {
    id: "03",
    title: "初期費用0円・成果報酬",
    desc: "採用決定まで費用は一切不要。従来の人材紹介エージェントよりも低コストな手数料設定で、リスクのないグローバル採用を支援します。",
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
