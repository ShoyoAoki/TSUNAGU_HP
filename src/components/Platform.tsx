"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const platformFeatures = [
  {
    id: "001",
    title: "Tri-Lingual",
    jp: "完全三言語対応",
    desc: "日本語・簡体字・英語に対応。オンライン完結で地理的制約を排除。",
  },
  {
    id: "002",
    title: "Tech Stack",
    jp: "技術的優位性",
    desc: "Next.js 13 + Supabaseによる、エンタープライズレベルの安全性と速度。",
  },
  {
    id: "003",
    title: "Mobile First",
    jp: "モバイルファースト",
    desc: "スマホネイティブな操作感で、アプリダウンロードの壁を取り払う。",
  },
  {
    id: "004",
    title: "Scoring",
    jp: "価値観スコアリング",
    desc: "「カルチャー」「働き方」「ビジョン」の一致度を数値化しミスマッチを防ぐ。",
  },
];

export default function Platform() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section id="platform" ref={ref} className="py-24 md:py-40 bg-gray-50 overflow-hidden border-t border-gray-200">
      <div className="container mx-auto px-6 max-w-7xl relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 md:flex items-end justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-6">
               <div className="w-2 h-2 bg-gray-900" />
               <span className="text-sm font-bold tracking-widest text-gray-900 uppercase">
                 Core Technology
               </span>
            </div>
            <h2 className="text-2xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-tight">
              TSUNAGU<br/>Platform_
            </h2>
          </div>
          
          {/* Tetris-like Block Cluster Decoration */}
          <div className="hidden md:flex gap-1 items-end opacity-20">
             <div className="w-4 h-4 bg-black" />
             <div className="w-4 h-8 bg-black" />
             <div className="w-4 h-12 bg-black" />
             <div className="w-4 h-4 bg-black" />
             <div className="w-4 h-8 bg-black" />
          </div>
        </motion.div>

        {/* Horizontal Scroll Layout for Desktop */}
        <div className="relative">
          <div className="hidden md:flex border-t-2 border-black">
            {platformFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex-1 pt-8 pr-8 group cursor-default border-r border-gray-300 last:border-r-0 pl-8 first:pl-0 hover:bg-white transition-colors duration-300"
              >
                <div className="flex justify-between items-start mb-6">
                   <span className="text-xs font-mono text-gray-400 block bg-gray-100 px-1 group-hover:bg-cyan-100 group-hover:text-cyan-900 transition-colors">
                     {feature.id}
                   </span>
                   <div className="w-2 h-2 bg-gray-300 group-hover:bg-cyan-500 transition-colors" />
                </div>
                
                <h3 className="text-3xl font-bold text-gray-900 mb-2 group-hover:translate-x-1 transition-transform">
                  {feature.title}
                </h3>
                <p className="text-xs font-bold text-gray-400 mb-6 uppercase tracking-wider group-hover:text-cyan-600 transition-colors">
                  {feature.jp}
                </p>
                <p className="text-gray-500 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden grid grid-cols-1 gap-12">
             {platformFeatures.map((feature, index) => (
              <div key={index} className="border-t-2 border-black pt-6">
                <span className="text-xs font-mono text-gray-400 mb-2 block">{feature.id}</span>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
