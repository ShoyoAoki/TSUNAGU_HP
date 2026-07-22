"use client";

import { motion } from "framer-motion";

const features = [
  {
    id: "01",
    label: "OwlMatch Remote",
    title: "IT人才事业部",
    desc: "为您提供中国顶尖高校的IT工程师・AI人才，先远程试用3～6个月，确认成果后再转为正式录用。零招聘成本即可启动的『先试用』模式，从根本上化解了传统人才中介的风险。",
    color: "bg-cyan-500",
    shadow: "shadow-[4px_4px_0px_0px_#06b6d4]",
  },
  {
    id: "02",
    label: "OwlMatch Language",
    title: "语言人才事业部",
    desc: "为商社・制造业・服务业等企业，推荐日语能力考试N2以上的中日双语人才。业务覆盖东京・大阪・名古屋・爱知等全日本地区，精选具备『语言能力×实务能力』的人才，实现精准匹配。",
    color: "bg-purple-500",
    shadow: "shadow-[4px_4px_0px_0px_#a855f7]",
  },
  {
    id: "03",
    label: "OwlMatch Spot",
    title: "短期项目事业部",
    desc: "提供中国・亚洲当地的陪同出差、实地考察、商品调研、AI・数据类单次任务等，以天为单位灵活调配当地人才。短期项目的实绩，将成为转向长期录用（语言人才・OwlMatch Remote）的晋升通道。",
    color: "bg-teal-500",
    shadow: "shadow-[4px_4px_0px_0px_#14b8a6]",
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
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
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
