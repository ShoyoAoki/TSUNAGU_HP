"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const processes = [
  {
    id: "01",
    title: "ターゲットの選定と母集団形成",
    desc: "独自のデータベースから、貴社の要件（高度人材・特定技能）に合致する層を特定。動画レジュメを活用し、スキルだけでなく「意志」の強い候補者を迅速に集めます。",
  },
  {
    id: "02",
    title: "精度を極めるスクリーニング",
    desc: "「価値観スコアリング」により、履歴書だけでは見えないカルチャーマッチ度を測定。早期離職のリスクを最小化し、長く活躍できる人材を厳選します。",
  },
  {
    id: "03",
    title: "意思決定と採用の確定",
    desc: "オンライン選考を最短距離でセットアップ。条件交渉から合意までをBridgがサポートし、スピード感のある採用決定を実現します。",
  },
];

export default function ServiceDetailClient() {
  return (
    <div className="min-h-screen bg-[#F2F2F2] relative overflow-hidden">
      {/* 背景グリッド */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <main className="relative z-10">
        {/* ヒーローセクション */}
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 bg-[#70C1D1]" />
                <span className="text-sm font-bold tracking-[0.2em] text-gray-900 uppercase">
                  採用プロセスの最適化
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-900 mb-8 leading-tight font-mono">
                SERVICE_
              </h1>
              <p className="max-w-2xl text-lg md:text-xl text-gray-600 leading-relaxed">
                日本企業とアジアの才能を最短距離でつなぐ。<br className="hidden md:block" />
                特定技能・高度人材の「採用」に特化した最適化プラットフォーム「Bridg」。
              </p>
            </motion.div>
          </div>
        </section>

        {/* プロセスセクション */}
        <section className="py-24 bg-white border-y border-gray-200">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
                採用プロセス_
              </h2>
              <div className="w-12 h-1 bg-[#70C1D1]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-gray-200">
              {processes.map((process, index) => (
                <motion.div
                  key={process.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="p-8 md:p-12 border-r border-b border-gray-200 hover:bg-[#F9F9F9] transition-colors group"
                >
                  <div className="flex justify-between items-start mb-12">
                    <span className="text-4xl font-mono font-bold text-gray-200 group-hover:text-[#70C1D1] transition-colors">
                      {process.id}
                    </span>
                    <div className="w-8 h-px bg-gray-200 group-hover:bg-[#70C1D1] group-hover:w-12 transition-all duration-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {process.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                    {process.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 価値提案セクション */}
        <section className="py-24 md:py-40 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-8 leading-tight">
                  構造的なミスマッチの<br />解消_
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                  「採用コストの高騰」という構造的ミスマッチを、テクノロジーで解決します。
                  従来の紹介モデルでは不可能だった、透明性の高いデータと効率的なプロセスにより、
                  最高の人材を、最適なコストで。
                </p>
                <ul className="space-y-4">
                  {[
                    "紹介手数料の適正化",
                    "ミスマッチによる早期離職の防止",
                    "採用リードタイムの劇的な短縮",
                    "データに基づく意思決定の支援"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-900 font-medium">
                      <div className="w-1.5 h-1.5 bg-[#70C1D1]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative aspect-[4/3] md:aspect-square bg-[#0A0A0A] rounded-sm p-12 overflow-hidden flex flex-col justify-center border border-white/5 shadow-2xl"
              >
                {/* 背景の抽象的な幾何学装飾 */}
                <div className="absolute inset-0 opacity-20">
                  <div 
                    className="absolute inset-0" 
                    style={{
                      backgroundImage: `linear-gradient(to right, #70C1D1 1px, transparent 1px), linear-gradient(to bottom, #70C1D1 1px, transparent 1px)`,
                      backgroundSize: '60px 60px',
                      maskImage: 'radial-gradient(circle at center, black, transparent)'
                    }}
                  />
                </div>

                {/* 装飾的なコーナーライン */}
                <div className="absolute top-8 left-8 w-12 h-px bg-[#70C1D1]/40" />
                <div className="absolute top-8 left-8 w-px h-12 bg-[#70C1D1]/40" />
                <div className="absolute bottom-8 right-8 w-12 h-px bg-[#70C1D1]/40" />
                <div className="absolute bottom-8 right-8 w-px h-12 bg-[#70C1D1]/40" />

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="h-px w-8 bg-[#70C1D1]" />
                    <span className="text-[#70C1D1] text-xs font-bold tracking-[0.4em] uppercase opacity-80">Core Value</span>
                  </div>
                  <h3 className="text-white text-4xl md:text-6xl font-bold leading-tight tracking-tighter">
                    効率の<br />最大化_
                  </h3>
                  <div className="pt-4">
                    <p className="text-white/40 text-sm font-mono tracking-[0.3em] uppercase">
                      Optimization of<br />Recruitment Process
                    </p>
                  </div>
                </div>
                
                {/* 右上の三本線（メニューアイコン風の装飾） */}
                <div className="absolute top-10 right-10 flex flex-col gap-1.5">
                  <div className="w-6 h-0.5 bg-white/20" />
                  <div className="w-6 h-0.5 bg-white/20" />
                  <div className="w-4 h-0.5 bg-[#70C1D1]" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* お問い合わせセクション */}
        <section className="py-32 md:py-48 bg-[#0A0A0A] text-white relative overflow-hidden">
          {/* 背景の装飾的なグリッド */}
          <div 
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(#70C1D1 1px, transparent 1px), linear-gradient(90deg, #70C1D1 1px, transparent 1px)`,
              backgroundSize: '100px 100px'
            }}
          />
          
          <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="w-12 h-px bg-[#70C1D1]" />
                <span className="text-[#70C1D1] text-xs font-bold tracking-[0.5em] uppercase">Contact</span>
                <div className="w-12 h-px bg-[#70C1D1]" />
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold mb-12 leading-tight tracking-tighter">
                次世代の採用インフラを、<br />貴社に。_
              </h2>
              
              <button className="group relative inline-flex items-center gap-4 bg-white text-black px-12 py-6 rounded-sm font-bold transition-all hover:bg-[#70C1D1] hover:text-white overflow-hidden">
                <span className="relative z-10">詳細はこちら</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
              </button>
              
              <div className="mt-16 flex justify-center gap-12 text-white/20 font-mono text-xs tracking-[0.2em] uppercase">
                <span>Efficiency</span>
                <span>Transparency</span>
                <span>Global Talent</span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
