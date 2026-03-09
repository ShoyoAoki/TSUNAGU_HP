"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    tag: "Core Model",
    title: "Track A",
    jpTitle: "リモートトライアル → 正社員採用",
    desc: "中国在住のIT人材をまずリモートで3〜6ヶ月受け入れ。実績を見てから正社員として採用・来日。採用コストゼロで始められ、ミスマッチリスクを根本から排除する、TSUNAGUの中核モデルです。",
    col: "md:col-span-2",
    theme: "text-gray-900 border-gray-200"
  },
  {
    tag: "Scoring",
    title: "Bridg Score",
    jpTitle: "3層エンジニア評価システム",
    desc: "自動メトリクス（GitHub・コーディングテスト）＋ 企業評価 ＋ ピアレビューの3層構造で、候補者のスキルと適性を透明・公平に数値化。バイアス検出機能も搭載。",
    col: "md:col-span-1",
    theme: "text-white bg-black border-black"
  },
  {
    tag: "AI Screening",
    title: "37 Agents",
    jpTitle: "AI駆動の採用オペレーション",
    desc: "履歴書解析・技術スクリーニング・日本語力評価・マッチングエンジンなど、37のAIエージェントが採用パイプライン全体を自動化。少人数チームで大量の採用を高品質に処理します。",
    col: "md:col-span-1",
    theme: "text-gray-900 border-gray-200"
  },
  {
    tag: "Trilingual",
    title: "日中英",
    jpTitle: "完全三言語対応プラットフォーム",
    desc: "日本語・簡体字中国語・英語をワンタップで切り替え。CJK表記揺れを吸収する検索エンジンにより、言語の壁を完全に取り払ったマッチングを実現します。",
    col: "md:col-span-1",
    theme: "text-gray-900 border-gray-200"
  },
  {
    tag: "Relocation",
    title: "来日支援",
    jpTitle: "ビザ・住居・生活セットアップ",
    desc: "ビザ申請代行から住居手配、銀行口座開設、生活オリエンテーションまで。入社後3ヶ月のフォローアップチェックインで、早期離職を防止し定着率を最大化します。",
    col: "md:col-span-1",
    theme: "text-cyan-900 bg-cyan-50 border-cyan-100"
  },
  {
    tag: "Community",
    title: "Network",
    jpTitle: "北京大学発のタレントネットワーク",
    desc: "北京大・清華大・上海交通大など中国トップ大学のアルムナイネットワーク、WeChat・REDコミュニティを活用。ゼロからの母集団形成を排し、即座に高品質な候補者プールにアクセスできます。",
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
              How It <br/>
              <span className="text-gray-400">Works_</span>
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
