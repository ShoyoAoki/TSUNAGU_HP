"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    tag: "Discover",
    title: "Video Feed",
    jpTitle: "動画フィード",
    desc: "TikTok風の縦型動画フィードを実装。5秒間の「ティーザー動画」で、企業のカルチャーやオフィスの雰囲気を直感的に伝達。AIアルゴリズムが「相性の良い企業」をレコメンドします。",
    col: "md:col-span-2",
    theme: "text-gray-900 border-gray-200"
  },
  {
    tag: "Diagnosis",
    title: "Gamification",
    jpTitle: "ゲーミフィケーション診断",
    desc: "堅苦しい適性検査を廃止し、RPG風診断を開発。楽しみながら価値観や働き方の志向性を入力させることで、深層心理に基づいた高精度なマッチングデータを取得。",
    col: "md:col-span-1",
    theme: "text-white bg-black border-black"
  },
  {
    tag: "Community",
    title: "Mentoring",
    jpTitle: "コミュニティ & メンタリング",
    desc: "「大学・学部別」「ビザの悩み」など、テーマごとのコミュニティ機能を提供。メンターとのQ&Aを通じて、就職前からプラットフォームへの帰属意識を高めます。",
    col: "md:col-span-1",
    theme: "text-gray-900 border-gray-200"
  },
  {
    tag: "Search",
    title: "Multilingual",
    jpTitle: "多言語対応 & CJK検索",
    desc: "日本語・簡体字・英語をワンタップで切り替え可能。表記揺れを吸収する高度な検索エンジンにより、言語の壁を超えたスムーズな求人検索を実現。",
    col: "md:col-span-1",
    theme: "text-gray-900 border-gray-200"
  },
  {
    tag: "Analytics",
    title: "Dashboard",
    jpTitle: "データドリブン・ダッシュボード",
    desc: "応募数や面接進捗だけでなく、KPIをリアルタイムで可視化。「公平性監査」機能により、国籍や性別によるバイアスがかかっていないかをモニタリング可能。",
    col: "md:col-span-1",
    theme: "text-cyan-900 bg-cyan-50 border-cyan-100"
  },
  {
    tag: "Scout",
    title: "Direct",
    jpTitle: "ダイレクト・スカウト",
    desc: "データベース上の候補者に対し、直接アプローチが可能。コミュニティでの活動状況や「価値観マッチ度」を参照しながら、「刺さるスカウト」を実現します。",
    col: "md:col-span-2",
    theme: "text-gray-900 border-gray-200"
  },
];

export default function Features() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section id="features" ref={containerRef} className="py-24 md:py-40 bg-white relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-6">
               <div className="w-3 h-3 bg-cyan-500" />
               <span className="text-sm font-bold tracking-widest text-black uppercase">
                 Platform Features
               </span>
            </div>
            <h2 className="text-3xl md:text-6xl font-semibold tracking-tight text-black leading-tight">
              Designed for <br/>
              <span className="text-gray-400">Gen-Z_</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-200 bg-gray-100">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className={`group relative p-10 flex flex-col justify-between h-[420px] bg-white border border-transparent hover:z-10 hover:shadow-2xl transition-all duration-300 ${feature.col} ${feature.theme === 'text-white bg-black border-black' ? 'bg-black text-white' : ''}`}
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-current opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-current opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10 flex justify-between items-start">
                <span className="text-xs font-mono uppercase tracking-widest opacity-60 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-current" />
                  {feature.tag}
                </span>
              </div>

              <div className="relative z-10 mt-auto">
                <h3 className="text-4xl md:text-5xl font-bold tracking-tighter leading-none mb-4">
                  {feature.title}
                </h3>
                <p className="text-sm font-bold opacity-80 mb-6 font-mono border-l-2 border-current pl-3 ml-1">
                  {feature.jpTitle}
                </p>
                <p className="text-sm leading-relaxed opacity-80">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
