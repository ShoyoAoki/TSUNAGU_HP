"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    tag: "Three Divisions",
    title: "3事業部体制",
    jpTitle: "IT人材 × バイリンガル人材 × スポット案件",
    desc: "ITエンジニアのリモートトライアル採用（OwlMatch Remote）、N2以上バイリンガル人材の紹介（OwlMatch Language）、現地スポット案件（OwlMatch Spot）。3つの専門ラインが、企業のニーズに最適な人材と実務をご提案します。",
    col: "md:col-span-2",
    theme: "text-gray-900 border-gray-200"
  },
  {
    tag: "AI Platform",
    title: "OwlMatch",
    jpTitle: "80以上のAIエージェントが採用を自動化",
    desc: "履歴書解析・スキル評価・日本語力判定・マッチングまで、AIが採用パイプライン全体を駆動。IT人材のコーディングテストも、バイリンガル人材の語学力評価も、高精度に自動処理します。",
    col: "md:col-span-1",
    theme: "text-white bg-black border-black"
  },
  {
    tag: "Zero Risk",
    title: "まず試す",
    jpTitle: "採用前に実力を確認できるモデル",
    desc: "IT人材はリモートトライアルで3〜6ヶ月の実績を確認。言語系人材は成功報酬型でリスクゼロ。どちらの事業も「納得してから採用」を実現します。",
    col: "md:col-span-1",
    theme: "text-gray-900 border-gray-200"
  },
  {
    tag: "Trilingual",
    title: "日中英",
    jpTitle: "完全三言語対応プラットフォーム",
    desc: "日本語・簡体字中国語・英語をワンタップで切り替え。CJK表記揺れを吸収する検索エンジンにより、言語の壁を完全に取り払ったマッチングを実現します。",
    col: "md:col-span-2",
    theme: "text-gray-900 border-gray-200"
  },
  {
    tag: "Network",
    title: "直結",
    jpTitle: "中国全土からの人材アクセス",
    desc: "トップ大学のアルムナイネットワーク、WeChat・REDコミュニティ、現地子会社を通じて、ITエンジニアからビジネス系バイリンガル人材まで、幅広い候補者プールに即座にアクセスできます。",
    col: "md:col-span-2",
    theme: "text-gray-900 border-gray-200"
  },
];

export default function Features() {
  const containerRef = useRef(null);

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
                 Why TSUNAGU
               </span>
            </div>
            <h2 className="text-3xl md:text-6xl font-semibold tracking-tight text-black leading-tight">
              Why <br/>
              <span className="text-gray-400">TSUNAGU_</span>
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
              className={`group relative p-10 flex flex-col justify-between h-auto md:h-[420px] bg-white border border-transparent hover:z-10 hover:shadow-2xl transition-all duration-300 ${feature.col} ${feature.theme === 'text-white bg-black border-black' ? 'bg-black text-white' : ''}`}
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
