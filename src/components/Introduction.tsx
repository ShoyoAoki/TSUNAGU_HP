"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Card = ({ title, desc, accent, bg, delay }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
      className={`p-10 bg-white rounded-3xl border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${bg} group relative overflow-hidden h-full flex flex-col`}
    >
      {/* Top Accent Line */}
      <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-${accent.replace('border-', '')} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      <h3 className="text-sm font-bold tracking-widest text-gray-400 mb-6 group-hover:text-gray-900 transition-colors">
        {title}
      </h3>
      <p className="text-gray-900 font-bold leading-relaxed text-xl mt-auto">
        {desc}
      </p>
    </motion.div>
  )
}

export default function Introduction() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="py-40 bg-white relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32 text-center relative"
        >
          {/* Background Text for Depth */}
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] md:text-[14rem] font-black text-gray-50/80 -z-10 pointer-events-none select-none">
            VISION
          </span>

          <span className="text-cyan-600 font-bold tracking-wider text-sm uppercase mb-6 block">
            Mission & Vision
          </span>
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 leading-[1.1] mb-8">
            人材が豊富な国と<br/>
            労働力が不足している国をつなぎ、<br />
            <span className="relative inline-block px-4">
              <span className="relative z-10">アジアの力を最大化する</span>
              <span className="absolute bottom-2 left-0 w-full h-4 bg-cyan-200/40 -z-0 transform -skew-x-12"></span>
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
          {[
            { 
              title: "MISSION", 
              desc: "「人材が豊富な国」と「労働力が不足している国」をつなぎ、企業と人の成長機会を促進しアジアの力を最大化し、労働革命を起こす。",
              accent: "border-cyan-500",
              bg: "hover:bg-cyan-50/30"
            },
            { 
              title: "VISION", 
              desc: "アジア全域において、国籍に関わらず誰もが最適な機会にアクセスできる社会インフラとなる。アジアの熱量を、日本企業の新たな成長エンジンに。",
              accent: "border-purple-500",
              bg: "hover:bg-purple-50/30"
            },
            { 
              title: "VALUE", 
              desc: "意志を繋ぐテクノロジー：表面的な条件や効率性よりも、「人の本音」と「企業の熱量」の可視化を最優先する。",
              accent: "border-yellow-500",
              bg: "hover:bg-yellow-50/30"
            }
          ].map((item, i) => (
             <Card key={i} {...item} delay={i * 0.15} />
          ))}
        </div>

        <div className="relative">
          {/* Parallax Image/Element Placeholder */}
          <motion.div style={{ y }} className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full blur-3xl opacity-50 z-0" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[3rem] bg-gray-50 p-12 md:p-32 overflow-hidden z-10"
          >
             {/* Decorative Grid */}
             <div className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                  backgroundSize: '40px 40px'
                }}
              />

            <div className="relative z-10 max-w-5xl mx-auto text-center">
              <h3 className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase mb-12">
                Philosophy
              </h3>
              <p className="text-4xl md:text-6xl font-bold text-gray-900 leading-[1.2] mb-16 tracking-tight">
                テキストでは伝わらない温度感を<br/>
                テクノロジーの力で解き明かし、<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600">
                互いの「意志」が共鳴する出会い
                </span>
                だけを創出する。
              </p>
              <div className="max-w-3xl mx-auto">
                <p className="text-xl text-gray-600 leading-relaxed font-medium">
                  Bridgは単なる求人掲示板ではなく、Z世代の行動様式に最適化した「コミュニティ型」のプラットフォームです。動画と診断を通じて「直感」に訴えかけるUXを提供し、既存媒体にはない高いエンゲージメントを生み出します。
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
