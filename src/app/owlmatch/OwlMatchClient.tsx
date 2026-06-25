"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Lenis from "lenis";
import { ArrowRight, Play, Pause, Volume2, Maximize2, Subtitles, ChevronRight } from "lucide-react";
import { useContact } from "@/context/ContactContext";

/* ================================================================
   OwlMatch LP v10 — プロレベル再実装
   仕様書: PART 1-7 全面反映
   シャオは最大2箇所のみ（S07 Agent Wall / S10 Final CTA）
================================================================ */

const INK = "#0A2540";
const LINE = "#E5EAF0";
const SKY = "#F4FAFC";
const SKYDEEP = "#E7F4FB";
const CYAN = "#0891B2";

/* ----------------------------------------------------------------
   入場モーション規律（全コンポーネント共通）
---------------------------------------------------------------- */
const upIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
};

/* ----------------------------------------------------------------
   シャオ（浮遊アニメ付き）— 最大2箇所のみ使用
---------------------------------------------------------------- */
const Shao = ({
  pose,
  width,
  alt = "OwlMatchの案内役フクロウ シャオ",
  float = true,
  delay = 0,
  className = "",
}: {
  pose: string;
  width: number;
  alt?: string;
  float?: boolean;
  delay?: number;
  className?: string;
}) => (
  <div className={`relative inline-block ${className}`} role="img" aria-label={alt}>
    <motion.div
      animate={float ? { y: [0, -5, 0] } : undefined}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <Image
        src={`/images/shao/shao-${pose}.png`}
        alt={alt}
        width={width}
        height={Math.round(width * 1.06)}
        className="relative w-full h-auto"
        style={{ width }}
      />
    </motion.div>
  </div>
);

/* ----------------------------------------------------------------
   セクション見出し（v10: サイズ引き上げ + タイト感）
---------------------------------------------------------------- */
const SectionHead = ({
  en,
  children,
  light = false,
  lead,
  align = "left",
}: {
  en: string;
  children: React.ReactNode;
  light?: boolean;
  lead?: string;
  align?: "left" | "center";
}) => (
  <div className={`mb-14 md:mb-20 ${align === "center" ? "text-center" : ""}`}>
    <motion.div
      {...upIn}
      className={`flex items-center gap-3 mb-5 ${align === "center" ? "justify-center" : ""}`}
    >
      <span
        className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase px-[10px] py-[4px]"
        style={{
          background: light ? "rgba(255,255,255,0.12)" : INK,
          color: light ? "#E7F4FB" : "#E7F4FB",
          borderRadius: "4px",
        }}
      >
        {en}
      </span>
    </motion.div>
    <motion.h2
      {...upIn}
      transition={{ ...upIn.transition, delay: 0.08 }}
      className={`font-black leading-[1.15] ${light ? "text-white" : ""}`}
      style={{
        fontSize: "clamp(36px, 5.5vw, 72px)",
        color: light ? undefined : INK,
        letterSpacing: "-0.025em",
      }}
    >
      {children}
    </motion.h2>
    {lead && (
      <motion.p
        {...upIn}
        transition={{ ...upIn.transition, delay: 0.15 }}
        className={`mt-6 text-[15px] leading-[1.9] max-w-xl ${light ? "text-white/55" : "text-gray-500"} ${align === "center" ? "mx-auto" : ""}`}
      >
        {lead}
      </motion.p>
    )}
  </div>
);

/* ----------------------------------------------------------------
   プロダクトUIモック（card基盤スタイル）
---------------------------------------------------------------- */
const card = {
  borderColor: LINE,
  boxShadow: "0 1px 3px rgba(10,37,64,0.06), 0 8px 24px rgba(10,37,64,0.08)",
};

/* ── Hero 候補者自動サイクルデータ ── */
const CANDIDATES = [
  {
    initial: "劉",
    name: "劉 さん（28）",
    role: "バックエンドエンジニア / 上海",
    subtitle: "日本で、バックエンドの仕事がしたいです。",
    scores: { tech: 92, lang: 88, fit: 96 },
    match: 94,
    tags: ["Go", "AWS", "React", "日本語N1"],
  },
  {
    initial: "王",
    name: "王 さん（31）",
    role: "フロントエンドエンジニア / 北京",
    subtitle: "日本で、フロントエンドの仕事がしたいです。",
    scores: { tech: 89, lang: 91, fit: 85 },
    match: 89,
    tags: ["React", "TypeScript", "Vue", "日本語N2"],
  },
  {
    initial: "陳",
    name: "陳 さん（26）",
    role: "データエンジニア / 深圳",
    subtitle: "日本でデータ基盤の構築に携わりたいです。",
    scores: { tech: 94, lang: 85, fit: 92 },
    match: 91,
    tags: ["Python", "Spark", "BigQuery", "日本語N2"],
  },
];

/* ── CandidateCycler（HeroMock内で使用） ── */
const CandidateCycler = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % CANDIDATES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const c = CANDIDATES[idx];

  return (
    <div className="relative bg-white rounded-xl border overflow-hidden" style={card}>
      {/* LIVE バッジ */}
      <span className="absolute top-3 right-3 bg-cyan-600 text-white font-mono text-[9px] px-2 py-0.5 flex items-center gap-1.5 z-10">
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className="w-1.5 h-1.5 rounded-full bg-white"
        />
        LIVE
      </span>

      {/* タイトルバー */}
      <div className="flex items-center gap-2 px-4 h-10 border-b" style={{ borderColor: LINE }}>
        <span className="w-2.5 h-2.5 rounded-full bg-[#E5EAF0]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#E5EAF0]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#E5EAF0]" />
        <div className="ml-4 flex-1 max-w-[240px] h-6 rounded-md bg-[#F6F8FA] flex items-center px-3 font-mono text-[10px] text-gray-400">
          owlmatch.ai/matching
        </div>
      </div>

      <div className="grid grid-cols-5">
        {/* 動画パネル */}
        <div className="col-span-3 border-r" style={{ borderColor: LINE }}>
          <div className="relative aspect-[4/3] bg-[#0E2235] overflow-hidden">
            <div className="absolute -top-10 -left-10 w-44 h-44 rounded-full bg-cyan-500/15 blur-[50px]" aria-hidden />
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="absolute inset-0 flex items-center justify-center"
                aria-live="polite"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#16435E] to-[#0F2C42] border border-white/10 flex items-center justify-center">
                  <span className="text-white/85 text-2xl font-black">{c.initial}</span>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-3 inset-x-0 flex justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`sub-${idx}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="bg-black/55 text-white text-[10px] px-2.5 py-1 rounded font-bold"
                  aria-live="polite"
                >
                  {c.subtitle}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="absolute top-3 left-3 bg-black/45 text-white/90 text-[9px] font-mono px-2 py-1 rounded">
              自己紹介 — 01:24
            </span>
          </div>
          {/* コントロールバー */}
          <div className="px-4 py-3">
            <div className="relative h-[3px] rounded-full bg-[#EEF2F5] mb-2.5">
              <div className="absolute left-0 top-0 h-full w-[62%] rounded-full bg-cyan-600" />
              <span className="absolute left-[62%] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-cyan-600 border-2 border-white shadow" />
            </div>
            <div className="flex items-center justify-between text-gray-400">
              <div className="flex items-center gap-3">
                <Pause className="w-3.5 h-3.5" />
                <Volume2 className="w-3.5 h-3.5" />
                <span className="font-mono text-[9px]">00:52 / 01:24</span>
              </div>
              <div className="flex items-center gap-3">
                <Subtitles className="w-3.5 h-3.5 text-cyan-600" />
                <Maximize2 className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>

        {/* 候補者情報パネル */}
        <div className="col-span-2 p-4 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={`info-${idx}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col h-full"
              aria-live="polite"
            >
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-black text-sm" style={{ color: INK }}>{c.name}</h3>
                  <span className="text-[8px] font-mono font-bold text-cyan-700 border border-cyan-600/40 rounded-sm px-1.5 py-0.5">
                    認定済
                  </span>
                </div>
                <p className="text-[10px] text-gray-500 font-medium">{c.role}</p>
              </div>

              <div className="rounded-lg border p-3 mb-3" style={{ borderColor: LINE, background: SKYDEEP }}>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-[9px] font-bold text-gray-500">マッチスコア</span>
                  <span className="font-mono font-black text-xl text-cyan-700 tabular-nums">{c.match}</span>
                </div>
                {[
                  { k: "技術", v: c.scores.tech },
                  { k: "日本語", v: c.scores.lang },
                  { k: "適性", v: c.scores.fit },
                ].map((row, i) => (
                  <div key={row.k} className="flex items-center gap-2 mb-1.5 last:mb-0">
                    <span className="text-[9px] text-gray-400 w-9 shrink-0 font-medium">{row.k}</span>
                    <div className="flex-1 h-1 rounded-full bg-[#E5EDF2] overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-cyan-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${row.v}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                      />
                    </div>
                    <span className="font-mono text-[9px] text-gray-500 tabular-nums w-5 text-right">{row.v}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1 mb-auto">
                {c.tags.map((t) => (
                  <span key={t} className="text-[9px] font-bold text-gray-600 bg-[#F1F5F8] rounded-sm px-1.5 py-0.5">
                    {t}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-1.5 mt-3">
                <button className="h-8 rounded-md text-[10px] font-bold text-gray-500 border bg-white" style={{ borderColor: LINE }}>
                  スキップ
                </button>
                <button className="h-8 rounded-md text-[10px] font-black text-white bg-cyan-600">
                  面談に進む
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------
   MockVideo / MockReport / MockRanking（ProductTour用）
---------------------------------------------------------------- */
const MockVideo = () => (
  <div className="bg-white border overflow-hidden" style={{ ...card, borderRadius: "0" }}>
    <div className="relative aspect-video bg-[#0E2235]">
      <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-cyan-500/15 blur-[50px]" aria-hidden />
      <div className="absolute left-5 bottom-4 flex items-center gap-2.5">
        <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[#16435E] to-[#0F2C42] border border-white/15 flex items-center justify-center text-white/85 text-xs font-black">
          王
        </span>
        <span className="text-white/70 text-[10px] font-bold">王 さん / フロントエンド</span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
          <Play className="w-4 h-4 fill-cyan-700 text-cyan-700 translate-x-px" />
        </span>
      </div>
      <div className="absolute bottom-3 inset-x-0 flex justify-center">
        <span className="bg-black/55 text-white text-[10px] px-2.5 py-1 rounded font-bold">
          日本で、フロントエンドの仕事がしたいです。
        </span>
      </div>
      <span className="absolute top-3 right-3 bg-black/45 text-white/90 text-[9px] font-mono px-1.5 py-0.5 rounded-sm">
        01:24
      </span>
    </div>
    <div className="p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="font-black text-sm" style={{ color: INK }}>自己紹介動画</span>
        <span className="font-mono text-[9px] text-gray-400">日本語 / 中国語 字幕</span>
      </div>
      <p className="text-[11px] text-gray-500 leading-relaxed">
        話す日本語・表情・熱量。書類では見えない「その人」が、90秒でわかります。
      </p>
    </div>
  </div>
);

const MockReport = () => (
  <div className="relative bg-white border p-6" style={{ ...card, borderRadius: "0" }}>
    <div className="flex items-center justify-between mb-6">
      <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
        AI Screening Report
      </span>
      <span className="font-mono text-[9px] text-gray-400">#A-2406</span>
    </div>
    {[
      { k: "技術テスト", v: 92, note: "上位 8%" },
      { k: "日本語コミュニケーション", v: 88, note: "N1 相当" },
      { k: "職務経歴の整合性", v: 96, note: "検証済み" },
      { k: "カルチャーフィット", v: 90, note: "高適合" },
    ].map((row, i) => (
      <div key={row.k} className="mb-4 last:mb-0">
        <div className="flex items-baseline justify-between mb-1.5">
          <span className="text-[12px] font-bold" style={{ color: INK }}>{row.k}</span>
          <span className="font-mono text-[10px] text-gray-400">{row.note}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-[5px] rounded-full bg-[#EEF2F5] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-cyan-600"
              initial={{ width: 0 }}
              whileInView={{ width: `${row.v}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.25 + i * 0.12, ease: "easeOut" }}
            />
          </div>
          <span className="font-mono text-xs font-bold tabular-nums w-6 text-right" style={{ color: INK }}>
            {row.v}
          </span>
        </div>
      </div>
    ))}
    {/* CERTIFIED スタンプ */}
    <motion.div
      className="absolute -right-3 -bottom-3 rotate-[-6deg] border-2 border-cyan-600 text-cyan-700 font-mono text-[9px] font-black tracking-[0.18em] px-2.5 py-1.5 bg-white"
      initial={{ scale: 0, rotate: -20 }}
      whileInView={{ scale: 1, rotate: -6 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 280, damping: 22, delay: 1.4 }}
      style={{ borderRadius: "2px" }}
      aria-hidden
    >
      OWLMATCH CERTIFIED
    </motion.div>
  </div>
);

const MockRanking = () => (
  <div className="bg-white border overflow-hidden" style={{ ...card, borderRadius: "0" }}>
    <div className="flex items-center justify-between px-5 h-11 border-b" style={{ borderColor: LINE }}>
      <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
        Match Results
      </span>
      <span className="font-mono text-[9px] text-gray-400">バックエンド / 東京</span>
    </div>
    {[
      { initial: "陳", name: "陳 さん", role: "フロントエンド・5年", score: 96, top: true },
      { initial: "張", name: "張 さん", role: "SRE・7年", score: 91, top: false },
      { initial: "李", name: "李 さん", role: "データ基盤・4年", score: 89, top: false },
      { initial: "王", name: "王 さん", role: "バックエンド・6年", score: 87, top: false },
    ].map((c, i) => (
      <motion.div
        key={c.name}
        initial={i === 0 ? { opacity: 0, x: 20 } : { opacity: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: 0.15 + i * 0.1,
          ...(i === 0 ? { type: "spring", stiffness: 200 } : {}),
        }}
        className={`flex items-center gap-3.5 px-5 py-3 border-b last:border-0 ${c.top ? "bg-[#F2FAFC]" : ""}`}
        style={{ borderColor: LINE }}
      >
        <span className="font-mono text-[10px] text-gray-300 font-bold w-4">{i + 1}</span>
        <span
          className="w-8 h-8 rounded-full border flex items-center justify-center text-[11px] font-black"
          style={{ borderColor: LINE, color: INK, background: SKYDEEP }}
        >
          {c.initial}
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-[12px] font-black truncate" style={{ color: INK }}>{c.name}</div>
          <div className="text-[10px] text-gray-400 font-medium truncate">{c.role}</div>
        </div>
        <div className="w-16 h-1 rounded-full bg-[#EEF2F5] overflow-hidden hidden sm:block">
          <div className="h-full bg-cyan-600 rounded-full" style={{ width: `${c.score}%` }} />
        </div>
        <span
          className={`font-mono text-sm font-black tabular-nums ${c.top ? "text-cyan-700" : ""}`}
          style={c.top ? undefined : { color: INK }}
        >
          {c.score}
        </span>
      </motion.div>
    ))}
  </div>
);

/* ----------------------------------------------------------------
   ファネルSVG
---------------------------------------------------------------- */
const FunnelSVG = () => (
  <motion.svg
    viewBox="0 0 320 380"
    width="100%"
    aria-label="OwlMatchのAIスクリーニングファネル図"
    className="max-w-[320px] mx-auto"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-60px" }}
  >
    <motion.path
      d="M20,40 L300,40 L240,140 L80,140 Z"
      fill={SKYDEEP}
      stroke={LINE}
      strokeWidth="1.5"
      variants={{
        hidden: { opacity: 0, pathLength: 0 },
        visible: { opacity: 1, pathLength: 1 },
      }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
    />
    <motion.text x="160" y="82" textAnchor="middle" fill={INK} fontSize="13" fontWeight="700" fontFamily="monospace"
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} transition={{ delay: 0.4 }}>
      登録候補者
    </motion.text>
    <motion.text x="160" y="100" textAnchor="middle" fill={CYAN} fontSize="11" fontWeight="700" fontFamily="monospace"
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} transition={{ delay: 0.5 }}>
      100%
    </motion.text>
    <motion.path
      d="M80,140 L240,140 L220,220 L100,220 Z"
      fill="white" stroke={LINE} strokeWidth="1.5"
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      transition={{ duration: 0.6, delay: 0.5 }}
    />
    <motion.text x="160" y="170" textAnchor="middle" fill={INK} fontSize="11" fontWeight="700" fontFamily="monospace"
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} transition={{ delay: 0.75 }}>
      AIエージェント
    </motion.text>
    <motion.text x="160" y="188" textAnchor="middle" fill={CYAN} fontSize="11" fontWeight="800" fontFamily="monospace"
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} transition={{ delay: 0.85 }}>
      80体が審査
    </motion.text>
    <motion.path d="M155,205 L165,205 M160,200 L160,218" stroke={CYAN} strokeWidth="1.5" strokeLinecap="round"
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} transition={{ delay: 0.9 }} />
    <motion.path
      d="M100,220 L220,220 L210,310 L110,310 Z"
      fill={SKYDEEP} stroke={CYAN} strokeWidth="2"
      variants={{ hidden: { opacity: 0, scaleY: 0, originY: "220px" }, visible: { opacity: 1, scaleY: 1 } }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
    />
    <motion.text x="160" y="255" textAnchor="middle" fill={INK} fontSize="12" fontWeight="700" fontFamily="monospace"
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} transition={{ delay: 1.2 }}>
      OwlMatch認定
    </motion.text>
    <motion.text x="160" y="275" textAnchor="middle" fill={CYAN} fontSize="11" fontWeight="800" fontFamily="monospace"
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} transition={{ delay: 1.3 }}>
      上位 15〜20%
    </motion.text>
    <motion.rect x="110" y="318" width="100" height="30" rx="2" fill="white" stroke={CYAN} strokeWidth="2"
      variants={{ hidden: { opacity: 0, scale: 0 }, visible: { opacity: 1, scale: 1 } }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.5 }} />
    <motion.text x="160" y="337" textAnchor="middle" fill={CYAN} fontSize="8" fontWeight="900" fontFamily="monospace" letterSpacing="2"
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} transition={{ delay: 1.7 }}>
      OWLMATCH CERTIFIED
    </motion.text>
    <motion.line x1="30" y1="40" x2="30" y2="140" stroke={LINE} strokeWidth="1" strokeDasharray="3 4"
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} transition={{ delay: 0.3 }} />
    <motion.line x1="290" y1="40" x2="290" y2="140" stroke={LINE} strokeWidth="1" strokeDasharray="3 4"
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} transition={{ delay: 0.3 }} />
  </motion.svg>
);

/* ----------------------------------------------------------------
   データ（コピーはトンマナ確定稿 — 変更禁止）
---------------------------------------------------------------- */
const numbers = [
  { v: "80+", label: "AIエージェント", sub: "多面的な審査を自動実行" },
  { v: "15〜20%", label: "OwlMatch認定率", sub: "厳選された人材が届く" },
  { v: "3〜6ヶ月", label: "リモートトライアル", sub: "実績を確認してから採用" },
  { v: "3ヶ月", label: "入社後フォロー期間", sub: "早期離職を最小化" },
];

const pains = [
  { no: "01", t: "実力が、見えない。", d: "履歴書とポートフォリオだけでは、実際の技術水準とコミュニケーション能力を確かめようがない。" },
  { no: "02", t: "日本語力が、測れない。", d: "資格の有無と実務レベルの日本語は別物です。会話・ニュアンスまで、現状の評価手段では判断できない。" },
  { no: "03", t: "人柄が、確かめられない。", d: "時差と距離を越えた複数回の面談は、現実的ではない。採用の前に、相手の本質を知る手段がない。" },
];

const chapters = [
  {
    no: "01",
    en: "Video Profile",
    jp: "動画で、出会う。",
    desc: "候補者全員が、日本語による自己紹介動画を登録しています。話し方・表情・熱量——書類では決して伝わらない『その人』を、面談の前に確かめることができます。字幕は日本語・中国語の両方に対応。",
    mock: <MockVideo />,
  },
  {
    no: "02",
    en: "AI Screening",
    jp: "AIが、見抜く。",
    desc: "履歴書解析・技術テスト・日本語力評価まで、80以上のAIエージェントが多面的に審査します。厳格なスクリーニングを通過した上位15〜20%の候補者のみが、『OwlMatch認定』として企業に届きます。",
    mock: <MockReport />,
  },
  {
    no: "03",
    en: "Match Score",
    jp: "スコアで、決める。",
    desc: "技術適合度・日本語力・カルチャーフィットを統合したマッチスコアで、候補者を定量的に比較検討できます。勘や印象による選考を排し、根拠のある意思決定を実現します。",
    mock: <MockRanking />,
  },
];

const journey = [
  { no: "01", t: "動画登録", time: "当日〜", d: "候補者が日本語の自己紹介動画を登録。話し方・表情・熱量を、書類の前に確かめられます。" },
  { no: "02", t: "AI審査", time: "数日以内", d: "80以上のAIエージェントが履歴書解析・技術テスト・日本語力評価を多面的に実行します。" },
  { no: "03", t: "OwlMatch認定", time: "〜1週間", d: "審査を通過した上位15〜20%のみに「OwlMatch認定」を付与。企業に届くのは、厳選された人材のみです。" },
  { no: "04", t: "動画で選考", time: "〜3週間", d: "マッチスコアと動画を組み合わせた選考。初回面談の前に、候補者の実力と人柄を把握できます。" },
  { no: "05", t: "リモートトライアル", time: "3〜6ヶ月", d: "3〜6ヶ月のリモート参画で、実際の業務パフォーマンスとチームフィットを検証します。" },
  { no: "06", t: "来日・入社", time: "合意後", d: "双方合意の上で正社員契約へ移行。ビザ申請から入国手続きまで、TSUNAGUがサポートします。" },
  { no: "07", t: "定着フォロー", time: "入社後3ヶ月間", d: "入社後3ヶ月間、TSUNAGUが定着状況を継続的にフォロー。早期離職リスクを最小化します。" },
];

/* AIエージェント名（実在80体から抜粋） */
const AGENT_PILLS = [
  { name: "resume_analyzer", cat: "tech" },
  { name: "japanese_eval", cat: "lang" },
  { name: "it_skill_eval", cat: "tech" },
  { name: "visa_legal", cat: "fit" },
  { name: "company_research", cat: "fit" },
  { name: "culture_fit", cat: "fit" },
  { name: "video_analysis", cat: "lang" },
  { name: "tech_test_runner", cat: "tech" },
  { name: "nlp_scorer", cat: "lang" },
  { name: "career_consistency", cat: "fit" },
  { name: "market_fit", cat: "fit" },
  { name: "communication_eval", cat: "lang" },
  { name: "motivation_checker", cat: "fit" },
  { name: "interview_preparer", cat: "fit" },
  { name: "match_scorer", cat: "tech" },
  { name: "onboarding_risk", cat: "fit" },
  { name: "retention_predictor", cat: "fit" },
  { name: "compliance_check", cat: "fit" },
  { name: "ai_screening", cat: "tech" },
  { name: "person_analyzer", cat: "fit" },
  { name: "progress_report", cat: "tech" },
  { name: "comprehensive_eval", cat: "tech" },
  { name: "candidate_proposal", cat: "fit" },
  { name: "crm_manager", cat: "tech" },
];

const DOT_COLORS: Record<string, string> = {
  tech: CYAN,
  lang: "#22c55e",
  fit: "#f59e0b",
};

const services = [
  {
    tag: "Remote",
    sub: "IT系人材",
    title: "リモートトライアル採用——まず試す、それから採用する。",
    desc: "中国トップ大学のITエンジニア・AI人材を、3〜6ヶ月のリモートトライアルで検証してから正社員採用。採用コストゼロでミスマッチリスクを根本から排除します。",
    points: ["リモートトライアル 3〜6ヶ月", "納得してから正社員化", "来日・定着サポート"],
    barColor: "group-hover:bg-cyan-600",
    badge: { label: "REMOTE IT", bg: CYAN, text: "#FFFFFF" },
    mockContent: (
      <div className="p-4" style={{ background: SKYDEEP }}>
        {[
          { k: "技術", v: 92 },
          { k: "日本語", v: 88 },
          { k: "適性", v: 96 },
        ].map((row) => (
          <div key={row.k} className="flex items-center gap-2 mb-2 last:mb-0">
            <span className="text-[9px] text-gray-500 w-9 shrink-0 font-bold">{row.k}</span>
            <div className="flex-1 h-1 rounded-full bg-white/60 overflow-hidden">
              <div className="h-full rounded-full bg-cyan-600" style={{ width: `${row.v}%` }} />
            </div>
            <span className="font-mono text-[9px] text-gray-500 tabular-nums w-5 text-right">{row.v}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    tag: "Language",
    sub: "日中バイリンガル人材",
    title: "N2以上のバイリンガル人材を、成功報酬で紹介する。",
    desc: "日本語能力試験N2以上・中国語ネイティブのバイリンガル人材を、商社・メーカー・サービス業へ紹介。初期費用ゼロの成功報酬型で、採用リスクを最小化します。",
    points: ["N2以上のバイリンガル", "初期費用ゼロ・成功報酬型", "全国の主要都市圏に対応"],
    barColor: "group-hover:bg-cyan-400",
    badge: { label: "LANGUAGE", bg: INK, text: "#FFFFFF" },
    mockContent: (
      <div className="p-4 flex items-center gap-4" style={{ background: SKYDEEP }}>
        <div
          className="w-12 h-12 shrink-0 flex items-center justify-center border-2 border-cyan-600 font-mono text-[11px] font-black text-cyan-700"
          style={{ borderRadius: "2px" }}
        >
          N2+
        </div>
        <div className="flex-1">
          <div className="text-[9px] text-gray-500 font-bold mb-1.5">日本語評価</div>
          <div className="h-1.5 rounded-full bg-white/60 overflow-hidden">
            <div className="h-full rounded-full bg-cyan-600 w-[88%]" />
          </div>
          <div className="text-[8px] font-mono text-cyan-700 mt-1">88 / 100</div>
        </div>
      </div>
    ),
  },
  {
    tag: "Spot",
    sub: "スポット案件",
    title: "現地人材を日単位で稼働させる、スポット対応。",
    desc: "中国・アジアでの視察、アテンド、リサーチ、AI・データ系タスクまで。現地在住の登録人材を日単位でアサインし、実績データは本採用への昇格ファネルに接続します。",
    points: ["日本から飛ばずに現地稼働", "日単位のスポット依頼", "実績データを本採用に接続"],
    barColor: "group-hover:bg-amber-400",
    badge: { label: "SPOT", bg: "#D97706", text: "#FFFFFF" },
    mockContent: (
      <div className="p-4 bg-white">
        <svg viewBox="0 0 220 80" className="w-full" aria-hidden>
          {Array.from({ length: 20 }).map((_, row) =>
            Array.from({ length: 44 }).map((_, col) => {
              const isHighlight = (row === 6 && col >= 18 && col <= 24) ||
                (row === 7 && col >= 16 && col <= 26) ||
                (row === 8 && col >= 14 && col <= 28) ||
                (row === 9 && col >= 12 && col <= 30) ||
                (row === 10 && col >= 11 && col <= 31) ||
                (row === 11 && col >= 12 && col <= 30) ||
                (row === 12 && col >= 14 && col <= 28);
              return (
                <circle
                  key={`${row}-${col}`}
                  cx={col * 5 + 2.5}
                  cy={row * 4 + 2}
                  r={isHighlight ? 1.4 : 0.8}
                  fill={isHighlight ? CYAN : "#D1E8F2"}
                  opacity={isHighlight ? 0.9 : 0.5}
                />
              );
            })
          )}
        </svg>
      </div>
    ),
  },
];

const faqs = [
  {
    q: "初期費用と成功報酬の仕組みを教えてください。",
    a: "初期費用はかかりません。OwlMatch Remoteはリモートトライアル期間中の費用もゼロ。正社員採用が確定した時点で成功報酬が発生する設計です。OwlMatch Languageも同様に、成功報酬型でスタートできます。",
  },
  {
    q: "候補者の日本語力は、どのように確認できますか？",
    a: "全候補者が日本語による自己紹介動画を登録しており、話し方・流暢さ・表現力を事前に確認できます。加えて、80以上のAIエージェントが日本語力評価を自動実行し、N2以上の水準を客観的に検証した上で認定しています。",
  },
  {
    q: "入社後のフォローアップはどこまで対応していますか？",
    a: "入社後3ヶ月間、TSUNAGUが定着状況を継続的にフォローします。候補者・企業双方への定期的なヒアリングを通じて、早期離職リスクを最小化します。追加費用は発生しません。",
  },
];

/* ================================================================
   ProductTour — ピン留めスクロールテリング
================================================================ */
const ProductTour = () => {
  const [activeChapter, setActiveChapter] = useState(0);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = chapterRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx >= 0) setActiveChapter(idx);
          }
        });
      },
      { threshold: 0.5 }
    );
    const refs = chapterRefs.current;
    refs.forEach((el) => el && observer.observe(el));
    return () => {
      refs.forEach((el) => el && observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const mocks = [<MockVideo key="video" />, <MockReport key="report" />, <MockRanking key="ranking" />];

  return (
    <>
      {/* デスクトップ：ピン留めスクロールテリング */}
      <div className="hidden md:grid md:grid-cols-[5fr_7fr] gap-0 items-start">
        {/* 左：sticky モック */}
        <div className="sticky top-[15vh] pr-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeChapter}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {mocks[activeChapter]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 右：テキスト3ブロック */}
        <div>
          {chapters.map((ch, i) => (
            <div
              key={ch.no}
              ref={(el) => { chapterRefs.current[i] = el; }}
              className={`min-h-[60vh] flex flex-col justify-center py-16 pl-10 border-l-2 transition-all duration-300 ${
                activeChapter === i ? "border-l-cyan-600" : "border-l-transparent"
              }`}
            >
              <motion.div
                {...upIn}
                className={`transition-opacity duration-300 ${activeChapter === i ? "opacity-100" : "opacity-30"}`}
              >
                {/* 装飾番号（バクラク方式）*/}
                <span
                  className="font-mono font-black leading-none select-none pointer-events-none block mb-3"
                  style={{ fontSize: "clamp(80px, 10vw, 120px)", color: "#F0F4F7", lineHeight: 1 }}
                  aria-hidden
                >
                  {ch.no}
                </span>
                <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-cyan-700 uppercase block mb-4">
                  {ch.en}
                </span>
                <h3
                  className="font-black tracking-tight leading-[1.4] mb-6"
                  style={{ fontSize: "clamp(24px, 3.5vw, 48px)", color: INK }}
                >
                  {ch.jp}
                </h3>
                <p className="text-[13px] md:text-[15px] text-gray-500 leading-[2.1] max-w-md">{ch.desc}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* モバイル：縦3章 */}
      <div className="md:hidden space-y-20">
        {chapters.map((ch, i) => (
          <div key={ch.no}>
            <motion.div {...upIn} transition={{ ...upIn.transition, delay: i * 0.08 }} className="mb-6">
              <span
                className="font-mono font-black leading-none select-none pointer-events-none block mb-2"
                style={{ fontSize: "72px", color: "#F0F4F7", lineHeight: 1 }}
                aria-hidden
              >
                {ch.no}
              </span>
              <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-cyan-700 uppercase block mb-3">
                {ch.en}
              </span>
              <h3
                className="font-black tracking-tight leading-[1.4] mb-5"
                style={{ fontSize: "clamp(24px, 6vw, 36px)", color: INK }}
              >
                {ch.jp}
              </h3>
              <p className="text-[13px] text-gray-500 leading-[2.1]">{ch.desc}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {ch.mock}
            </motion.div>
          </div>
        ))}
      </div>
    </>
  );
};

/* ================================================================
   メイン
================================================================ */
export default function OwlMatchClient() {
  const { openContact } = useContact();

  /* Journey IntersectionObserver */
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  /* Lenis スムーススクロール */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95 });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  /* Journey IntersectionObserver */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = stepRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx >= 0) setActiveStep(idx);
          }
        });
      },
      { threshold: 0.6 }
    );
    const refs = stepRefs.current;
    refs.forEach((el) => el && observer.observe(el));
    return () => {
      refs.forEach((el) => el && observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-white" style={{ color: INK }}>

      {/* ============ S00: HERO ============ */}
      <section
        className="relative pt-28 md:pt-36 pb-0 overflow-hidden min-h-[100svh] flex flex-col"
        style={{
          background: "linear-gradient(180deg, #E7F4FB 0%, #F4FAFC 50%, #FFFFFF 100%)",
        }}
      >
        <div className="relative z-10 px-6 md:px-[7vw] flex-1">
          {/* Hero: 左40% / 右60% — UIモックが主役 */}
          <div className="grid lg:grid-cols-[2fr_3fr] gap-10 lg:gap-16 items-center">

            {/* 左エリア */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* OwlMatchロゴ */}
                <Image
                  src="/images/owlmatch-logo.png"
                  alt="OwlMatch"
                  width={300}
                  height={86}
                  priority
                  className="w-[180px] md:w-[220px] h-auto mix-blend-multiply -ml-2 mb-8"
                />

                {/* セクションラベルピル */}
                <div className="mb-8">
                  <span
                    className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase px-[10px] py-[4px]"
                    style={{ background: INK, color: "#E7F4FB", borderRadius: "4px" }}
                  >
                    VIDEO-FIRST — CROSS-BORDER HIRING
                  </span>
                </div>

                {/* H1 */}
                <h1
                  className="font-black leading-[1.1] mb-7"
                  style={{
                    fontSize: "clamp(44px, 7vw, 88px)",
                    color: INK,
                    letterSpacing: "-0.03em",
                  }}
                >
                  <span className="whitespace-nowrap">会う前に、</span>
                  <br />
                  <span className="whitespace-nowrap">ここまで見える。</span>
                </h1>

                {/* 本文 */}
                <p className="text-[13px] md:text-[15px] text-gray-500 leading-[2.1] max-w-[340px] mb-10">
                  フクロウのように暗闇でも最適な人材を見抜き、国・業界・言語を超えて
                  全方位につなぐ——クロスボーダーHRプラットフォーム。
                  自己紹介動画と80以上のAIエージェントが、採用の不確実性を根本から排除します。
                </p>

                {/* CTA2ボタン */}
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <button
                    onClick={openContact}
                    className="group h-[54px] px-10 bg-[#0A2540] text-white text-sm font-black tracking-wide hover:bg-cyan-700 transition-colors flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-cyan-600 focus-visible:ring-offset-2"
                    style={{ borderRadius: 0 }}
                    aria-label="無料相談フォームを開く"
                  >
                    無料相談する
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={openContact}
                    className="group h-[54px] px-8 border-[1.5px] border-[#0A2540] text-[#0A2540] text-sm font-black tracking-wide hover:bg-[#0A2540] hover:text-white transition-colors flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-cyan-600 focus-visible:ring-offset-2"
                    style={{ borderRadius: 0 }}
                    aria-label="認定候補者の動画資料を請求する"
                  >
                    認定候補者の動画を見る
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* 小バッジ弾幕4個 */}
                <div className="flex flex-wrap gap-2">
                  {["認定率 15〜20%", "80+ AI Agents", "N2以上確認済み", "初期費用ゼロ"].map((label) => (
                    <span
                      key={label}
                      className="font-mono text-[10px] font-bold px-3 py-1.5"
                      style={{
                        background: "transparent",
                        border: `1px solid rgba(8,145,178,0.4)`,
                        color: CYAN,
                        borderRadius: "4px",
                      }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* 右エリア：CandidateCyclerを右カラム幅いっぱいに展開 */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="pt-12 lg:pt-8"
            >
              <div
                style={{
                  transform: "perspective(1200px) rotateY(-4deg) rotateX(2deg)",
                  transformOrigin: "center center",
                  boxShadow: "0 40px 80px -20px rgba(10,37,64,0.25), 0 0 0 1px rgba(10,37,64,0.06)",
                  borderRadius: "12px",
                }}
              >
                <CandidateCycler />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ S01: SOCIAL PROOF BAND ============ */}
      <section className="bg-white border-t border-b" style={{ borderColor: LINE }}>
        <div className="px-6 md:px-[7vw] h-[80px] md:h-[100px] flex items-center overflow-hidden">
          {/* 横スクロールアニメ（InfiniteScroll pattern）*/}
          <div className="relative w-full overflow-hidden" aria-label="OwlMatchの信頼指標">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              className="flex items-center gap-0 whitespace-nowrap"
            >
              {[...Array(2)].map((_, setIdx) => (
                <div key={setIdx} className="flex items-center">
                  {[
                    "有料職業紹介事業許可 46-ユ-300221",
                    "80+ AIエージェント 自社開発",
                    "認定通過率 上位15〜20%",
                    "初期費用・トライアル費用ゼロ",
                    "動画＋AIの選考設計",
                  ].map((item, i) => (
                    <span key={`${setIdx}-${i}`} className="flex items-center">
                      <span
                        className="font-mono text-[11px] font-bold px-8"
                        style={{ color: "#9CA3AF", letterSpacing: "0.05em" }}
                      >
                        {item}
                      </span>
                      <span className="font-mono text-[11px]" style={{ color: "#D1D5DB" }}>·</span>
                    </span>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ S02: PROBLEM ============ */}
      <section id="problem" className="relative py-24 md:py-36 bg-white scroll-mt-20">
        <div className="px-6 md:px-[7vw]">
          <SectionHead en="PROBLEM">
            海外採用の不確実性は、すべて
            <br />
            {'『見えない』ことに起因する。'}
          </SectionHead>

          {/* グリッドパネル */}
          <div className="grid grid-cols-1 md:grid-cols-3 border border-[#E5EAF0]">
            {pains.map((p, i) => (
              <motion.div
                key={p.no}
                {...upIn}
                transition={{ ...upIn.transition, delay: i * 0.08 }}
                className={`relative p-9 md:p-11 bg-white hover:bg-[#FAFCFD] transition-colors ${i < 2 ? "md:border-r" : ""} ${i >= 1 ? "max-md:border-t" : ""}`}
                style={{ borderColor: LINE }}
              >
                {/* 大番号装飾（バクラク方式）*/}
                <span
                  className="font-mono font-black leading-none select-none pointer-events-none block mb-4"
                  style={{ fontSize: "80px", color: "#F0F4F7", lineHeight: 1 }}
                  aria-hidden
                >
                  {p.no}
                </span>
                <h3
                  className="font-black tracking-tight leading-[1.45] mb-4"
                  style={{ fontSize: "clamp(20px, 2.5vw, 30px)", color: INK }}
                >
                  {p.t}
                </h3>
                <p className="text-[12px] md:text-[13px] text-gray-500 leading-[2.0]">
                  {p.d}
                </p>
              </motion.div>
            ))}
          </div>

          {/* 転換文カード（シャオなし・テキストのみ）*/}
          <div
            className="mt-16 md:mt-24 border-l-4 border-cyan-600 p-8 md:p-12"
            style={{ background: SKYDEEP }}
          >
            <motion.div {...upIn}>
              <p className="text-lg md:text-[24px] font-bold leading-[2]" style={{ color: INK }}>
                フクロウは、暗闇の中でも正確に見抜く。
                <br />
                OwlMatchは、その目を採用に実装しました——
                <span className="text-cyan-700">会う前に、実力・言語・人柄のすべてが見える</span>
                採用設計です。
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ S03: 紺バンド① — 宣言バンド ============ */}
      <section
        className="relative py-16 md:py-20 overflow-hidden"
        style={{ background: INK }}
      >
        {/* 静的装飾SVG */}
        <svg
          viewBox="0 0 400 200"
          width={320}
          aria-hidden
          className="absolute pointer-events-none hidden lg:block"
          style={{ opacity: 0.04, right: "-2vw", top: "50%", transform: "translateY(-50%)" }}
        >
          <path
            d="M200,100 C200,55 270,30 330,100 C390,170 390,30 330,100 C270,170 200,145 200,100 C200,55 130,30 70,100 C10,170 10,30 70,100 C130,170 200,145 200,100"
            fill="none" stroke="white" strokeWidth={0.8}
          />
        </svg>

        <div className="relative z-10 px-6 md:px-[7vw]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <span
                className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase px-[10px] py-[4px] inline-block mb-5"
                style={{ background: "rgba(255,255,255,0.12)", color: "#E7F4FB", borderRadius: "4px" }}
              >
                SOLUTION
              </span>
              <motion.h2
                {...upIn}
                className="font-black text-white leading-[1.15]"
                style={{ fontSize: "clamp(28px, 4vw, 52px)", letterSpacing: "-0.025em" }}
              >
                動画で出会い、AIが見抜き、
                <br className="hidden md:block" />
                スコアで決める。
              </motion.h2>
            </div>
            <motion.div
              {...upIn}
              transition={{ ...upIn.transition, delay: 0.12 }}
              className="flex flex-col sm:flex-row gap-4 shrink-0"
            >
              <button
                onClick={openContact}
                className="group h-[54px] px-10 font-black text-sm tracking-wide flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 transition-colors"
                style={{ background: CYAN, color: "white", borderRadius: 0 }}
                aria-label="無料相談フォームを開く"
              >
                無料相談する
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={openContact}
                className="group h-[54px] px-8 font-black text-sm tracking-wide flex items-center gap-3 border border-white/40 text-white hover:bg-white hover:text-[#0A2540] transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
                style={{ borderRadius: 0 }}
                aria-label="認定候補者の動画資料を請求する"
              >
                認定候補者の動画を見る
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ S04: PRODUCT（ProductTour）============ */}
      <section className="relative py-24 md:py-36 bg-white">
        <div className="px-6 md:px-[7vw]">
          <SectionHead
            en="PRODUCT"
            lead="国境の向こうの候補者が、会う前に見えてきます。"
          >
            動画 × AI × スコア。
          </SectionHead>

          <ProductTour />
        </div>
      </section>

      {/* ============ S05: NUMBERS（数字4個・独立セクション）============ */}
      <section className="relative py-24 md:py-32" style={{ background: "#F5F7FA" }}>
        <div className="px-6 md:px-[7vw]">
          <motion.div
            {...upIn}
            className="text-center mb-16"
          >
            <span
              className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase px-[10px] py-[4px]"
              style={{ background: INK, color: "#E7F4FB", borderRadius: "4px" }}
            >
              BY THE NUMBERS
            </span>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4">
            {numbers.map((item, i) => (
              <motion.div
                key={item.v}
                {...upIn}
                transition={{ ...upIn.transition, delay: i * 0.1 }}
                className={`px-6 md:px-8 py-8 md:py-12 text-center ${i < 3 ? "md:border-r" : ""} ${i % 2 === 0 && i < 2 ? "max-md:border-r" : ""} ${i >= 2 ? "max-md:border-t" : ""}`}
                style={{ borderColor: LINE }}
              >
                <div
                  className="font-mono font-black tabular-nums mb-3 leading-none whitespace-nowrap"
                  style={{
                    fontSize: "clamp(32px, 4.2vw, 60px)",
                    color: INK,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {item.v}
                </div>
                <div
                  className="text-[14px] font-bold mb-2"
                  style={{ color: CYAN }}
                >
                  {item.label}
                </div>
                <div className="text-[12px]" style={{ color: "#9CA3AF" }}>
                  {item.sub}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ S06: JOURNEY ============ */}
      <section className="relative py-24 md:py-36 bg-white">
        <div className="px-6 md:px-[7vw]">
          <SectionHead
            en="HOW IT WORKS"
            lead="OwlMatchは、マッチングを終点にしません。候補者の動画登録から入社後の定着フォローまで——7つのステップを、一気通貫で設計・支援します。"
          >
            動画登録から定着支援まで、
            <br />
            7つのステップで完結する。
          </SectionHead>

          {/* デスクトップ: 2カラムSticky */}
          <div className="hidden md:grid md:grid-cols-[2fr_3fr] gap-0 items-start">
            {/* 左: Sticky詳細エリア（シャオ削除→大番号装飾）*/}
            <div className="sticky top-[15vh] pr-16" style={{ overflow: "visible" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* 時間軸ラベル */}
                  <span className="font-mono text-[10px] text-cyan-700 font-bold block mb-2">
                    {journey[activeStep].time}
                  </span>
                  {/* 大番号装飾（Timeeの番号装飾構造）*/}
                  <span
                    className="font-mono font-black leading-none select-none pointer-events-none block mb-2"
                    style={{ fontSize: "120px", color: "#EBF0F5", lineHeight: 1 }}
                    aria-hidden
                  >
                    [{journey[activeStep].no}]
                  </span>
                  <h4
                    className="font-black tracking-tight mb-4"
                    style={{ fontSize: "clamp(22px, 2.5vw, 36px)", color: INK }}
                  >
                    {journey[activeStep].t}
                  </h4>
                  <p className="text-[13px] text-gray-500 leading-[2.0]">{journey[activeStep].d}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 右: ステップ列 */}
            <div>
              {journey.map((j, i) => (
                <div
                  key={j.no}
                  ref={(el) => { stepRefs.current[i] = el; }}
                  onClick={() => setActiveStep(i)}
                  className={`flex items-start gap-6 py-9 border-b cursor-pointer group transition-all
                    ${activeStep === i
                      ? "border-l-2 border-l-cyan-600 pl-5"
                      : "pl-0 hover:border-l-2 hover:border-l-cyan-200 hover:pl-5"
                    }`}
                  style={{ borderBottomColor: LINE, marginLeft: activeStep === i ? "-2px" : "0" }}
                >
                  {/* ステップ番号バッジ（直角）*/}
                  <span
                    className={`font-mono text-[11px] font-bold w-10 h-10 flex items-center justify-center border shrink-0 transition-all
                      ${activeStep === i
                        ? "bg-cyan-700 text-white border-cyan-700"
                        : "bg-white text-cyan-700 border-[#E5EAF0] group-hover:border-cyan-400"
                      }`}
                    style={{ borderRadius: 0 }}
                  >
                    {j.no}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="font-mono text-[10px] text-cyan-700 block mb-1">{j.time}</span>
                    <h4
                      className={`font-black text-lg tracking-tight mb-1 transition-colors
                        ${activeStep === i ? "" : "text-gray-400 group-hover:text-gray-700"}`}
                      style={activeStep === i ? { color: INK } : undefined}
                    >
                      {j.t}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* モバイル: 縦タイムライン */}
          <div className="md:hidden relative max-w-4xl">
            <div
              className="absolute left-[7px] top-3 bottom-3 w-px"
              style={{ background: "#CBD8E2" }}
              aria-hidden
            />
            {journey.map((j, i) => (
              <motion.div
                key={j.no}
                {...upIn}
                transition={{ ...upIn.transition, delay: i * 0.06 }}
                className="relative pl-12 pb-11 last:pb-0"
              >
                {/* ダイヤ型ノード */}
                <span
                  className="absolute left-0 top-1.5 w-[15px] h-[15px] border-2 border-cyan-600 bg-white rotate-45"
                  aria-hidden
                />
                <div>
                  <span className="font-mono text-[10px] font-bold text-cyan-700 block mb-0.5">{j.time}</span>
                  <span className="font-mono text-[11px] font-bold text-cyan-700 block mb-1">{j.no}</span>
                  <h4 className="text-lg font-black tracking-tight mb-2">{j.t}</h4>
                  <p className="text-[12px] text-gray-500 leading-[1.9]">{j.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ S07: AGENT WALL（新設）============ */}
      <section className="relative py-24 md:py-36 overflow-hidden" style={{ background: INK }}>
        {/* 装飾グリッドライン */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
          aria-hidden
        />

        <div className="relative z-10 px-6 md:px-[7vw]">
          <div className="grid md:grid-cols-[2fr_3fr] gap-12 md:gap-16 items-start">

            {/* 左カラム: コピー */}
            <div>
              <motion.div {...upIn} className="flex items-center gap-3 mb-5">
                <span
                  className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase px-[10px] py-[4px]"
                  style={{ background: "rgba(255,255,255,0.12)", color: "#E7F4FB", borderRadius: "4px" }}
                >
                  SCREENING ENGINE
                </span>
              </motion.div>

              {/* H2左外側にシャオ1箇所目（56px）*/}
              <div className="flex items-start gap-4">
                <div className="shrink-0 mt-1" aria-label="OwlMatchの案内役フクロウ シャオ">
                  <Shao
                    pose="think"
                    width={56}
                    float
                    delay={0.3}
                    alt="エージェント群を監督するシャオ"
                  />
                </div>
                <motion.h2
                  {...upIn}
                  transition={{ ...upIn.transition, delay: 0.08 }}
                  className="font-black text-white leading-[1.15]"
                  style={{ fontSize: "clamp(28px, 4vw, 56px)", letterSpacing: "-0.025em" }}
                >
                  80体のAIエージェントが、
                  <br />
                  同時に審査する。
                </motion.h2>
              </div>

              <motion.p
                {...upIn}
                transition={{ ...upIn.transition, delay: 0.15 }}
                className="mt-6 text-[15px] leading-[1.9] max-w-sm"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                履歴書解析・技術テスト・日本語力評価・カルチャーフィット——それぞれの専門AIが、並列で多面評価を実行します。人間の目では追えない精度と速度で、候補者の実像を数値化します。
              </motion.p>

              <motion.div
                {...upIn}
                transition={{ ...upIn.transition, delay: 0.22 }}
                className="mt-8"
              >
                <button
                  onClick={openContact}
                  className="group h-[54px] px-10 font-black text-sm tracking-wide flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 transition-colors"
                  style={{ background: CYAN, color: "white", borderRadius: 0 }}
                  aria-label="採用の仕組みを詳しく見る"
                >
                  採用の仕組みを詳しく見る
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </div>

            {/* 右カラム: エージェントバッジ密集 */}
            <motion.div
              {...upIn}
              transition={{ ...upIn.transition, delay: 0.1 }}
              className="flex flex-wrap gap-2.5"
            >
              {AGENT_PILLS.map((agent, i) => (
                <motion.span
                  key={agent.name}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-2 font-mono text-[11px] font-medium px-3 py-2"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.8)",
                    borderRadius: "9999px",
                  }}
                >
                  <span
                    className="shrink-0"
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: DOT_COLORS[agent.cat],
                      display: "inline-block",
                    }}
                    aria-hidden
                  />
                  {agent.name}
                </motion.span>
              ))}
              {/* 残り件数バッジ */}
              <span
                className="flex items-center font-mono text-[11px] font-bold px-3 py-2"
                style={{
                  background: "rgba(8,145,178,0.2)",
                  border: "1px solid rgba(8,145,178,0.4)",
                  color: "#67E8F9",
                  borderRadius: "9999px",
                }}
              >
                + 56 more agents
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ S08: SERVICES（修正）============ */}
      <section className="relative py-24 md:py-36 bg-white">
        <div className="px-6 md:px-[7vw]">
          <SectionHead en="SERVICES">
            3つのラインで、日中をつなぐ。
          </SectionHead>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <motion.div
                key={svc.tag}
                {...upIn}
                transition={{ ...upIn.transition, delay: i * 0.08 }}
                className="flex flex-col bg-white border group hover:border-cyan-400 transition-all overflow-hidden"
                style={{ borderColor: LINE, borderRadius: "12px" }}
              >
                {/* 上端カラーバー */}
                <div className={`h-[3px] bg-[#E5EAF0] transition-colors ${svc.barColor}`} />

                {/* UIモック断片 */}
                <div className="border-b" style={{ borderColor: LINE }}>
                  {svc.mockContent}
                </div>

                <div className="p-8 flex flex-col flex-1">
                  {/* カテゴリバッジ + chevron */}
                  <div className="flex items-start justify-between mb-7">
                    <div>
                      <span
                        className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase inline-block px-2 py-1 mb-2"
                        style={{ background: svc.badge.bg, color: svc.badge.text, borderRadius: "4px" }}
                      >
                        {svc.badge.label}
                      </span>
                      <p className="font-mono text-[10px] font-bold text-cyan-700 uppercase block">
                        [ {svc.tag} ]
                      </p>
                      <p className="text-[11px] font-bold text-gray-400 mt-0.5">{svc.sub}</p>
                    </div>
                    {/* → chevron */}
                    <ChevronRight
                      className="w-5 h-5 text-gray-300 group-hover:text-cyan-600 transition-colors mt-1 shrink-0"
                      aria-hidden
                    />
                  </div>

                  <h4 className="text-lg font-black tracking-tight leading-[1.6] mb-4">{svc.title}</h4>
                  <p className="text-[13px] text-gray-500 leading-[1.9] mb-7 flex-1">{svc.desc}</p>
                  <ul className="space-y-3 border-t pt-6" style={{ borderColor: LINE }}>
                    {svc.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-[13px] font-bold">
                        <span className="font-mono text-[10px] text-cyan-600 mr-1 shrink-0 mt-0.5">→</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...upIn} className="mt-14 flex items-center justify-between">
            <p className="hidden md:block text-[13px] text-gray-400 font-medium">
              どのラインが合うかわからない場合も、ヒアリングからご提案します。
            </p>
            <Link
              href="/service"
              className="group inline-flex items-center gap-3 text-sm font-black border-b-2 border-cyan-600 pb-1.5 hover:text-cyan-700 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-600 focus-visible:ring-offset-2"
            >
              サービスの詳細を見る
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============ S09: FAQ（背景薄グレー）============ */}
      <section className="relative py-24 md:py-32" style={{ background: "#F5F7FA" }}>
        <div className="px-6 md:px-[7vw] max-w-4xl">
          <SectionHead en="FAQ">
            よくあるご質問
          </SectionHead>
          {faqs.map((f, i) => (
            <motion.div
              key={f.q}
              {...upIn}
              transition={{ ...upIn.transition, delay: i * 0.07 }}
              className="py-9 md:py-11 border-t grid md:grid-cols-12 gap-3 md:gap-8 group hover:border-t-cyan-300 transition-colors"
              style={{ borderColor: LINE }}
            >
              <div className="md:col-span-5 flex items-start gap-4">
                <span
                  className="font-mono text-[11px] font-bold text-cyan-600 border border-cyan-600/30 w-8 h-8 flex items-center justify-center shrink-0 mt-1"
                  style={{ borderRadius: 0 }}
                >
                  Q{i + 1}
                </span>
                <h3 className="font-black text-base md:text-lg tracking-tight leading-relaxed">{f.q}</h3>
              </div>
              <p className="md:col-span-7 text-[13px] md:text-sm text-gray-500 leading-[2] md:pt-0.5">{f.a}</p>
            </motion.div>
          ))}
          <div className="border-t border-b" style={{ borderColor: LINE }} />

          {/* FAQ後: テキストリンクのみ（シャオ削除）*/}
          <motion.div
            {...upIn}
            transition={{ ...upIn.transition, delay: 0.1 }}
            className="mt-12 flex items-center gap-3"
          >
            <span className="text-[13px] text-gray-500">まだ質問がある方は</span>
            <button
              onClick={openContact}
              className="group inline-flex items-center gap-2 text-sm font-black border-b-2 border-cyan-600 pb-1 hover:text-cyan-700 transition-colors"
              aria-label="お問い合わせフォームを開く"
            >
              お問い合わせはこちら
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ============ S10: FINAL CTA（紺フル）============ */}
      <section
        className="relative py-24 md:py-36 overflow-hidden"
        style={{ background: INK }}
      >
        {/* 装飾グリッドライン */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
          aria-hidden
        />

        <div className="relative z-10 px-6 md:px-[7vw] text-center">

          {/* CERTIFIEDスタンプ（シャオ代替・プロダクトアイデンティティ）*/}
          <motion.div
            className="flex justify-center mb-10"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 240, damping: 22, delay: 0.1 }}
          >
            <div
              className="relative"
              style={{ transform: "rotate(-8deg)" }}
            >
              <div
                className="font-mono text-[13px] font-black tracking-[0.25em] px-5 py-3 border-2"
                style={{
                  color: "#67E8F9",
                  borderColor: "#67E8F9",
                  background: "rgba(8,145,178,0.08)",
                  borderRadius: "2px",
                }}
              >
                OWLMATCH CERTIFIED
              </div>
              {/* シャオ2箇所目（80px・yatta）*/}
              <div className="absolute -right-10 -top-10">
                <Shao
                  pose="yatta"
                  width={72}
                  float
                  delay={0.5}
                  alt="認定を喜ぶシャオ"
                />
              </div>
            </div>
          </motion.div>

          <motion.h2
            {...upIn}
            transition={{ ...upIn.transition, delay: 0.08 }}
            className="font-black text-white leading-[1.3] mb-7"
            style={{ fontSize: "clamp(28px, 4vw, 56px)", letterSpacing: "-0.025em" }}
          >
            まず、認定候補者の
            <span style={{ color: "#67E8F9" }}>動画</span>
            を<br className="hidden md:block" />
            ご覧ください。
          </motion.h2>

          <motion.p
            {...upIn}
            transition={{ ...upIn.transition, delay: 0.13 }}
            className="text-[13px] md:text-[15px] leading-[2.1] max-w-lg mx-auto mb-12"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            初期費用はかかりません。成功報酬型でスタートし、
            貴社の要件に合うOwlMatch認定候補者を、動画とマッチスコアとともにご提案します。
          </motion.p>

          <motion.div
            {...upIn}
            transition={{ ...upIn.transition, delay: 0.18 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <button
              onClick={openContact}
              className="group h-[54px] px-12 text-base font-black tracking-wide flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 transition-colors"
              style={{ background: CYAN, color: "white", borderRadius: 0 }}
              aria-label="無料相談フォームを開く"
            >
              無料相談する
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={openContact}
              className="group h-[54px] px-10 text-base font-black tracking-wide flex items-center gap-3 border-2 border-white/40 text-white hover:bg-white hover:text-[#0A2540] transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
              style={{ borderRadius: 0 }}
              aria-label="認定候補者の動画資料を請求する"
            >
              認定候補者の動画を見る
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <motion.div
            {...upIn}
            transition={{ ...upIn.transition, delay: 0.24 }}
            className="flex flex-col items-center gap-2"
          >
            <a
              href="mailto:aoki-shoyo@tsunaguinc.co.jp"
              className="font-mono text-xs hover:text-cyan-400 transition-colors border-b pb-0.5"
              style={{ color: "rgba(255,255,255,0.4)", borderColor: "rgba(255,255,255,0.2)" }}
            >
              aoki-shoyo@tsunaguinc.co.jp
            </a>
            <Link
              href="/terms"
              className="font-mono text-[10px] transition-colors hover:text-cyan-400"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              有料職業紹介事業許可番号 46-ユ-300221
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
