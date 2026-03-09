"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ContactModal from "@/components/ContactModal";

const processes = [
  {
    id: "01",
    title: "AIスクリーニング & 候補者厳選",
    desc: "北京大学・清華大学をはじめとするトップ大学のネットワークから候補者を募集。37のAIエージェントが履歴書解析・技術テスト・日本語力評価を自動実行し、上位15〜20%を「Bridg認定」として厳選します。",
  },
  {
    id: "02",
    title: "リモートトライアル（3〜6ヶ月）",
    desc: "認定エンジニアを貴社のプロジェクトにリモートで参画させます。実際の業務パフォーマンス・コミュニケーション・カルチャーフィットを、採用コストゼロで確認。納得してから次のステップへ。",
  },
  {
    id: "03",
    title: "正社員採用 & 来日支援",
    desc: "双方合意の上で正社員契約へ移行。ビザ申請・住居手配・銀行口座開設・生活オリエンテーションまでワンストップでサポート。入社後3ヶ月のフォローアップで定着率を最大化します。",
  },
];

const tracks = [
  {
    id: "Track A",
    title: "リモートトライアル → 正社員",
    desc: "中核モデル。中国在住のまま3〜6ヶ月リモートで実績を積み、成果確認後にビザ取得・来日・正社員転換。",
    highlight: true,
  },
  {
    id: "Track B",
    title: "派遣 → 正社員転換",
    desc: "早期来日を希望する人材をTSUNAGUがビザスポンサーとなり派遣。6ヶ月後に正社員転換。",
    highlight: false,
  },
  {
    id: "Track C",
    title: "プロジェクト参画型",
    desc: "ビザ不要のリモートプロジェクトに直接アサイン。SES多重下請けを排し、エンジニアに80%以上を還元。",
    highlight: false,
  },
];

export default function ServiceDetailClient() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F2F2F2] relative overflow-hidden">
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

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
                  Bridg Remote to Japan
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-900 mb-8 leading-tight font-mono">
                SERVICE_
              </h1>
              <p className="max-w-2xl text-lg md:text-xl text-gray-600 leading-relaxed">
                採用前に、まずリモートで試してみませんか？<br className="hidden md:block" />
                中国トップ大学のIT人材を、リスクゼロで正社員採用できる新しいモデルです。
              </p>
            </motion.div>
          </div>
        </section>

        {/* 3つのTrackセクション */}
        <section className="py-24 bg-white border-y border-gray-200">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
                3つの採用モデル_
              </h2>
              <div className="w-12 h-1 bg-[#70C1D1]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-gray-200">
              {tracks.map((track, index) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`p-8 md:p-12 border-r border-b border-gray-200 transition-colors group ${track.highlight ? 'bg-gray-900 text-white' : 'hover:bg-[#F9F9F9]'}`}
                >
                  <div className="flex justify-between items-start mb-8">
                    <span className={`text-sm font-mono font-bold tracking-wider px-3 py-1 ${track.highlight ? 'bg-cyan-500 text-black' : 'bg-gray-100 text-gray-600'}`}>
                      {track.id}
                    </span>
                    {track.highlight && (
                      <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">Recommended</span>
                    )}
                  </div>
                  <h3 className={`text-2xl font-bold mb-6 ${track.highlight ? 'text-white' : 'text-gray-900'}`}>
                    {track.title}
                  </h3>
                  <p className={`leading-relaxed text-sm md:text-base ${track.highlight ? 'text-gray-300' : 'text-gray-500'}`}>
                    {track.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* プロセスセクション */}
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
                Track A の流れ_
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
                  className="p-8 md:p-12 border-r border-b border-gray-200 hover:bg-white transition-colors group bg-[#F9F9F9]"
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
        <section className="py-24 md:py-40 px-6 bg-white border-t border-gray-200">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-8 leading-tight">
                  なぜTSUNAGUが<br />選ばれるのか_
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                  従来のエージェント型採用では「年収35%の手数料」を払っても、ミスマッチのリスクは残ります。
                  TSUNAGUは「まず試す」モデルで、このリスクを根本から解消します。
                </p>
                <ul className="space-y-4">
                  {[
                    "採用コストゼロでリモートトライアル開始",
                    "37のAIエージェントによる高精度スクリーニング",
                    "北京大学・清華大学のトップ人材に直結",
                    "ビザ・住居・生活セットアップまでワンストップ",
                    "入社後3ヶ月のフォローアップで定着支援"
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

                <div className="absolute top-8 left-8 w-12 h-px bg-[#70C1D1]/40" />
                <div className="absolute top-8 left-8 w-px h-12 bg-[#70C1D1]/40" />
                <div className="absolute bottom-8 right-8 w-12 h-px bg-[#70C1D1]/40" />
                <div className="absolute bottom-8 right-8 w-px h-12 bg-[#70C1D1]/40" />

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="h-px w-8 bg-[#70C1D1]" />
                    <span className="text-[#70C1D1] text-xs font-bold tracking-[0.4em] uppercase opacity-80">Zero Risk Model</span>
                  </div>
                  <h3 className="text-white text-4xl md:text-6xl font-bold leading-tight tracking-tighter">
                    まず試す、<br />それから採用_
                  </h3>
                  <div className="pt-4">
                    <p className="text-white/40 text-sm font-mono tracking-[0.3em] uppercase">
                      Remote Trial →<br />Full-Time Hiring
                    </p>
                  </div>
                </div>

                <div className="absolute top-10 right-10 flex flex-col gap-1.5">
                  <div className="w-6 h-0.5 bg-white/20" />
                  <div className="w-6 h-0.5 bg-white/20" />
                  <div className="w-4 h-0.5 bg-[#70C1D1]" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTAセクション */}
        <section className="py-32 md:py-48 bg-[#0A0A0A] text-white relative overflow-hidden">
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
                まずはリモートで、<br />試してみませんか？_
              </h2>

              <button
                onClick={() => setIsContactOpen(true)}
                className="group relative inline-flex items-center gap-4 bg-white text-black px-12 py-6 rounded-sm font-bold transition-all hover:bg-[#70C1D1] hover:text-white overflow-hidden"
              >
                <span className="relative z-10">無料相談する</span>
              </button>

              <div className="mt-16 flex justify-center gap-12 text-white/20 font-mono text-xs tracking-[0.2em] uppercase">
                <span>Zero Risk</span>
                <span>AI Screening</span>
                <span>Full Support</span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
