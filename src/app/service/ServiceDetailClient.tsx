"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useContact } from "@/context/ContactContext";

type TabKey = "remote" | "lang" | "spot";

const processes = [
  {
    id: "01",
    title: "AIスクリーニング & OwlMatch 認定",
    desc: "中国トップ大学のネットワークから優秀な候補者を募集。80以上のAIエージェントが履歴書解析・技術テスト・日本語力評価を自動実行し、上位15〜20%を「OwlMatch 認定」として厳選します。",
  },
  {
    id: "02",
    title: "リモートトライアル（3〜6ヶ月）",
    desc: "認定エンジニアを貴社のプロジェクトにリモートで参画させます。実際の業務パフォーマンス・コミュニケーション・カルチャーフィットを、採用コストゼロで確認。納得してから次のステップへ。",
  },
  {
    id: "03",
    title: "正社員採用 & 定着支援",
    desc: "双方合意の上で正社員契約へ移行。来日サポートと入社後3ヶ月のフォローアップで、定着率を最大化します。",
  },
];

const tracks = [
  {
    id: "Track A",
    title: "リモートトライアル → 来日・正社員化",
    desc: "中核モデル。中国在住のまま3〜6ヶ月リモートで実績を積み、成果確認後に来日・正社員転換。採用前にミスマッチを潰しきる「まず試す」モデル。",
    highlight: true,
  },
  {
    id: "Track B",
    title: "紹介予定派遣 → 正社員転換",
    desc: "早期に日本で働きたい人材を紹介予定派遣で受け入れ。6ヶ月の派遣期間で双方の適合度を見極めた上で正社員転換します。",
    highlight: false,
  },
  {
    id: "Track C",
    title: "プロジェクト参画型",
    desc: "ビザ不要のリモートプロジェクトに直接アサイン。SES多重下請けを排し、エンジニアに80%以上を還元する設計です。",
    highlight: false,
  },
];

const langFeatures = [
  {
    id: "01",
    title: "N2以上のバイリンガル人材",
    desc: "日本語能力試験N2以上、中国語ネイティブのバイリンガル人材を厳選。商社・メーカー・サービス業で即戦力として活躍できる語学力と実務スキルを持つ候補者をご紹介します。",
  },
  {
    id: "02",
    title: "全国対応 / 主要都市圏に強み",
    desc: "東京・大阪・名古屋・愛知をはじめ、全国の企業様にご対応。中国ビジネスに強みを持つ商社・メーカー・サービス業を中心に、地域の商習慣に合わせたコンサルティングを提供します。",
  },
  {
    id: "03",
    title: "成功報酬型 → SaaS移行モデル",
    desc: "初期費用ゼロの成功報酬型でスタート。採用実績を積み重ねた企業様には、より効率的なSaaS型プラットフォーム「OwlMatch」での継続利用をご案内します。",
  },
];

const langSteps = [
  { id: "01", title: "ヒアリング", desc: "求める人材像・業務内容・語学レベルを詳しくお伺いし、最適な候補者像を設定します。" },
  { id: "02", title: "候補者ご紹介", desc: "データベースから条件に合う候補者を厳選し、履歴書・スキルシートとともにご紹介します。" },
  { id: "03", title: "面接・選考", desc: "面接日程の調整、通訳サポート、選考アドバイスまでトータルで支援します。" },
  { id: "04", title: "入社・定着支援", desc: "内定後のビザ手続き支援、入社後のフォローアップで早期離職を防止します。" },
];

const spotFeatures = [
  {
    id: "01",
    title: "中国・アジア現地のスポット案件に対応",
    desc: "中国アテンド代行、現地視察・商材調査、リサーチ、AI・データ系の単発タスクなど。日本から現地に飛ばずに、現地在住の優秀な人材を「日単位」で稼働させられます。",
  },
  {
    id: "02",
    title: "案件で実証 → 採用へつなぐファネル",
    desc: "スポットの稼働実績は第三者検証された「実績バッジ」になり、本線採用（言語系・OwlMatch Remote）への自然な昇格ファネルに。実力が見えにくいクロスボーダー人材の最大ボトルネックを解消します。",
  },
  {
    id: "03",
    title: "クロスボーダー固有の対応",
    desc: "GFW（金盾）回避のファイル受け渡し、PIPL（中国個人情報保護法）への対応、商業秘密リスクの整理まで、日本企業が単独では対応しづらい論点をTSUNAGUが引き受けます。",
  },
];

const spotProcesses = [
  {
    id: "01",
    title: "案件ヒアリング",
    desc: "業務内容・必要言語・稼働日数・成果物形式（レポート / 写真 / 動画 等）をお伺いし、案件ブリーフに落とし込みます。",
  },
  {
    id: "02",
    title: "現地人材のアサイン",
    desc: "現地在住の登録人材から、業務内容に最適な候補者を選抜。事前に簡易面談を行い、品質基準とNG事項を共有します。",
  },
  {
    id: "03",
    title: "稼働・納品",
    desc: "TSUNAGUがハブとなり、稼働中のコミュニケーション・成果物の受け渡しを安全に橋渡し。クロスボーダー特有のファイル送受信課題も解消します。",
  },
  {
    id: "04",
    title: "実績データ化 / 本線へ昇格",
    desc: "稼働後の評価データを蓄積し、ご希望に応じて言語系本線採用・OwlMatch Remoteの候補者プールへ接続します。",
  },
];

export default function ServiceDetailClient() {
  const { openContact } = useContact();
  const [activeTab, setActiveTab] = useState<TabKey>("remote");

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
                  Cross-Border HR Platform
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-900 mb-8 leading-tight font-mono">
                SERVICE_
              </h1>
              <p className="max-w-2xl text-lg md:text-xl text-gray-600 leading-relaxed">
                IT人材のリモートトライアル採用、日中バイリンガル人材の紹介、そして現地スポット案件まで。<br className="hidden md:block" />
                TSUNAGUは3つの事業で、日中をつなぐ採用と実務を支援します。
              </p>
            </motion.div>

            {/* 事業部タブ切り替え */}
            <div className="mt-12 relative max-w-3xl">
              <div
                role="tablist"
                aria-label="サービス事業部"
                className="flex gap-0 border-b-2 border-gray-200 overflow-x-auto scrollbar-hide"
              >
                <button
                  id="tab-remote"
                  role="tab"
                  aria-selected={activeTab === "remote"}
                  aria-controls="panel-remote"
                  onClick={() => setActiveTab("remote")}
                  className={`px-5 md:px-6 py-4 text-sm font-bold tracking-wide transition-all border-b-2 -mb-[2px] whitespace-nowrap flex-shrink-0 ${
                    activeTab === "remote"
                      ? "border-[#70C1D1] text-gray-900 bg-white"
                      : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <span className="font-mono text-xs block mb-1">OwlMatch Remote</span>
                  IT系人材事業部
                </button>
                <button
                  id="tab-lang"
                  role="tab"
                  aria-selected={activeTab === "lang"}
                  aria-controls="panel-lang"
                  onClick={() => setActiveTab("lang")}
                  className={`px-5 md:px-6 py-4 text-sm font-bold tracking-wide transition-all border-b-2 -mb-[2px] whitespace-nowrap flex-shrink-0 ${
                    activeTab === "lang"
                      ? "border-purple-500 text-gray-900 bg-white"
                      : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <span className="font-mono text-xs block mb-1">Language</span>
                  言語系人材事業部
                </button>
                <button
                  id="tab-spot"
                  role="tab"
                  aria-selected={activeTab === "spot"}
                  aria-controls="panel-spot"
                  onClick={() => setActiveTab("spot")}
                  className={`px-5 md:px-6 py-4 text-sm font-bold tracking-wide transition-all border-b-2 -mb-[2px] whitespace-nowrap flex-shrink-0 ${
                    activeTab === "spot"
                      ? "border-teal-500 text-gray-900 bg-white"
                      : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <span className="font-mono text-xs block mb-1">OwlMatch Spot</span>
                  スポット案件事業部
                </button>
              </div>
              {/* モバイル: 右端のフェードで「もっと右にタブがある」ことを示す */}
              <div
                aria-hidden="true"
                className="md:hidden pointer-events-none absolute right-0 top-0 bottom-[2px] w-8 bg-gradient-to-l from-[#F2F2F2] to-transparent"
              />
            </div>
          </div>
        </section>

        {/* ===== Owl Match Remote（IT系人材事業部）セクション ===== */}
        {activeTab === "remote" && (
          <div id="panel-remote" role="tabpanel" aria-labelledby="tab-remote" tabIndex={0} className="focus:outline-none">
            {/* 概要 */}
            <section className="py-16 md:py-20 bg-white border-y border-gray-200">
              <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-[#70C1D1]" />
                  <span className="text-sm font-bold tracking-[0.2em] text-gray-900 uppercase">
                    OwlMatch Remote
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
                  IT人材のリモートトライアル採用_
                </h2>
                <div className="w-12 h-1 bg-[#70C1D1] mb-8" />
                <p className="max-w-3xl text-base md:text-lg text-gray-600 leading-relaxed">
                  中国トップ大学を中心に厳選したITエンジニア・AI人材を、リモートファーストで日本のITスタートアップへ。
                  「OwlMatch 認定」のスクリーニングと、3つの採用モデルで、貴社に最適な形での採用をご提案します。
                </p>
              </div>
            </section>

            {/* 3つのTrackセクション */}
            <section className="py-24 bg-white">
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
                        "80以上のAIエージェントによる高精度スクリーニング",
                        "中国トップ大学の優秀な人材に直結",
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
          </div>
        )}

        {/* ===== 言語系人材事業部セクション ===== */}
        {activeTab === "lang" && (
          <div id="panel-lang" role="tabpanel" aria-labelledby="tab-lang" tabIndex={0} className="focus:outline-none">
            {/* 言語系 概要セクション */}
            <section className="py-24 bg-white border-y border-gray-200">
              <div className="container mx-auto px-6 max-w-7xl">
                <div className="mb-16">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-purple-500" />
                    <span className="text-sm font-bold tracking-[0.2em] text-gray-900 uppercase">
                      Language Division
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
                    日中バイリンガル人材の採用支援_
                  </h2>
                  <div className="w-12 h-1 bg-purple-500" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-24">
                  <div>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      日本語能力試験N2以上の中国語・日本語バイリンガル人材を、商社・メーカー・サービス業を中心にご紹介。
                      東京・大阪・名古屋・愛知をはじめ全国の企業様に対応し、中国ビジネスに不可欠な「言語力×実務力」を持つ人材を厳選してマッチングします。
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {["商社", "メーカー", "サービス業", "貿易", "通訳・翻訳"].map((tag) => (
                        <span key={tag} className="px-3 py-1.5 bg-purple-50 text-purple-700 text-xs font-bold tracking-wide border border-purple-100">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="relative bg-[#0A0A0A] p-10 overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `linear-gradient(to right, #a855f7 1px, transparent 1px), linear-gradient(to bottom, #a855f7 1px, transparent 1px)`,
                          backgroundSize: '40px 40px',
                          maskImage: 'radial-gradient(circle at center, black, transparent)'
                        }}
                      />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="h-px w-8 bg-purple-500" />
                        <span className="text-purple-400 text-xs font-bold tracking-[0.4em] uppercase">Target</span>
                      </div>
                      <p className="text-white text-2xl md:text-3xl font-bold leading-tight tracking-tight mb-4">
                        N2以上 ×<br />中国語ネイティブ
                      </p>
                      <p className="text-white/40 text-sm font-mono tracking-wide">
                        Bilingual Talent for Japan
                      </p>
                    </div>
                  </div>
                </div>

                {/* 言語系の特徴 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-gray-200">
                  {langFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 }}
                      className="p-8 md:p-12 border-r border-b border-gray-200 hover:bg-white transition-colors group bg-[#F9F9F9]"
                    >
                      <div className="flex justify-between items-start mb-12">
                        <span className="text-4xl font-mono font-bold text-gray-200 group-hover:text-purple-500 transition-colors">
                          {feature.id}
                        </span>
                        <div className="w-8 h-px bg-gray-200 group-hover:bg-purple-500 group-hover:w-12 transition-all duration-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">
                        {feature.title}
                      </h3>
                      <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                        {feature.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* 言語系 採用フロー */}
            <section className="py-24 px-6">
              <div className="container mx-auto max-w-7xl">
                <div className="mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
                    採用の流れ_
                  </h2>
                  <div className="w-12 h-1 bg-purple-500" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-t border-l border-gray-200">
                  {langSteps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 }}
                      className="p-8 border-r border-b border-gray-200 hover:bg-white transition-colors group bg-[#F9F9F9]"
                    >
                      <span className="text-3xl font-mono font-bold text-gray-200 group-hover:text-purple-500 transition-colors block mb-6">
                        {step.id}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        {step.title}
                      </h3>
                      <p className="text-gray-500 leading-relaxed text-sm">
                        {step.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ===== Owl Match Spot（スポット案件事業部）セクション ===== */}
        {activeTab === "spot" && (
          <div id="panel-spot" role="tabpanel" aria-labelledby="tab-spot" tabIndex={0} className="focus:outline-none">
            {/* Spot 概要セクション */}
            <section className="py-24 bg-white border-y border-gray-200">
              <div className="container mx-auto px-6 max-w-7xl">
                <div className="mb-16">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-teal-500" />
                    <span className="text-sm font-bold tracking-[0.2em] text-gray-900 uppercase">
                      OwlMatch Spot
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
                    クロスボーダー・スポット案件_
                  </h2>
                  <div className="w-12 h-1 bg-teal-500" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-24">
                  <div>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      中国・アジア現地での視察、アテンド、リサーチ、商材調査、AI・データ系の単発タスクまで。
                      日本から飛ばずに、現地の優秀な人材を「日単位」で稼働させられる、クロスボーダー特化のスポット案件サービスです。
                    </p>
                    <p className="text-base text-gray-500 leading-relaxed mb-6">
                      実績が見えにくい中国人材の最大のボトルネックは「実力の不可視性」。
                      OwlMatch Spotで積み上げた稼働実績は、そのまま言語系本線採用・OwlMatch Remoteへの自然な昇格ファネルになります。
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {["現地アテンド", "視察代行", "商材リサーチ", "通訳", "AI・データ"].map((tag) => (
                        <span key={tag} className="px-3 py-1.5 bg-teal-50 text-teal-700 text-xs font-bold tracking-wide border border-teal-100">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="relative bg-[#0A0A0A] p-10 overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `linear-gradient(to right, #14b8a6 1px, transparent 1px), linear-gradient(to bottom, #14b8a6 1px, transparent 1px)`,
                          backgroundSize: '40px 40px',
                          maskImage: 'radial-gradient(circle at center, black, transparent)'
                        }}
                      />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="h-px w-8 bg-teal-500" />
                        <span className="text-teal-400 text-xs font-bold tracking-[0.4em] uppercase">Spot Engagement</span>
                      </div>
                      <p className="text-white text-2xl md:text-3xl font-bold leading-tight tracking-tight mb-4">
                        案件で実証 →<br />採用へつなぐ
                      </p>
                      <p className="text-white/40 text-sm font-mono tracking-wide">
                        Proof-of-Work for Cross-Border Hiring
                      </p>
                    </div>
                  </div>
                </div>

                {/* Spot の特徴 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-gray-200">
                  {spotFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 }}
                      className="p-8 md:p-12 border-r border-b border-gray-200 hover:bg-white transition-colors group bg-[#F9F9F9]"
                    >
                      <div className="flex justify-between items-start mb-12">
                        <span className="text-4xl font-mono font-bold text-gray-200 group-hover:text-teal-500 transition-colors">
                          {feature.id}
                        </span>
                        <div className="w-8 h-px bg-gray-200 group-hover:bg-teal-500 group-hover:w-12 transition-all duration-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">
                        {feature.title}
                      </h3>
                      <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                        {feature.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Spot 案件の流れ */}
            <section className="py-24 px-6">
              <div className="container mx-auto max-w-7xl">
                <div className="mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
                    案件の流れ_
                  </h2>
                  <div className="w-12 h-1 bg-teal-500" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-t border-l border-gray-200">
                  {spotProcesses.map((step, index) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 }}
                      className="p-8 border-r border-b border-gray-200 hover:bg-white transition-colors group bg-[#F9F9F9]"
                    >
                      <span className="text-3xl font-mono font-bold text-gray-200 group-hover:text-teal-500 transition-colors block mb-6">
                        {step.id}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        {step.title}
                      </h3>
                      <p className="text-gray-500 leading-relaxed text-sm">
                        {step.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

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
                {activeTab === "spot"
                  ? <>まずは1案件、<br />試してみませんか？_</>
                  : <>まずはリモートで、<br />試してみませんか？_</>}
              </h2>

              <button
                onClick={openContact}
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
