"use client";

/**
 * 「AI マッチング」セクション（動画フィードの直下・03 / AI MATCHING）
 * 大量の人材プロフィール（モック・イニシャル表記・日中混在）を敷き詰め、
 * cyan のスキャンライン → 数枚がハイライト＆スコア → 求人要件へ接続線、を一巡してゆるくループ。
 * 白基調エディトリアルのまま「AIが選ぶ」を演出（ダーク/グロー不使用）。reduced-motion で静止最終状態。
 */
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Sparkles, Check } from "lucide-react";

type Person = {
  id: number; initials: string; name: string; role: string;
  tags: string[]; lang: string; loc: string; score?: number;
};

const POOL: Person[] = [
  { id: 1, initials: "W.L", name: "W. Liu", role: "AIエンジニア", tags: ["Python", "LLM"], lang: "日本語 N2", loc: "北京・来日可" },
  { id: 2, initials: "K.T", name: "K. Tanaka", role: "日中バイリンガルBizDev", tags: ["営業", "HSK6"], lang: "中国語 母語級", loc: "東京" },
  { id: 3, initials: "Y.C", name: "Y. Chen", role: "MLエンジニア", tags: ["PyTorch", "RAG"], lang: "日本語 N2", loc: "深圳・来日可", score: 96 },
  { id: 4, initials: "S.S", name: "S. Sato", role: "フルスタック", tags: ["React", "Go"], lang: "中国語 HSK5", loc: "大阪" },
  { id: 5, initials: "R.W", name: "R. Wang", role: "バックエンド", tags: ["Java", "K8s"], lang: "日本語 N1", loc: "上海・リモート" },
  { id: 6, initials: "A.I", name: "A. Ito", role: "データサイエンティスト", tags: ["SQL", "BI"], lang: "中国語 N/A", loc: "東京" },
  { id: 7, initials: "J.Z", name: "J. Zhao", role: "フロントエンド", tags: ["TS", "Next"], lang: "日本語 N3", loc: "広州・リモート" },
  { id: 8, initials: "H.S", name: "H. Sun", role: "AIエンジニア", tags: ["LLM", "AWS"], lang: "日本語 N2", loc: "杭州・来日可" },
  { id: 9, initials: "M.S", name: "M. Suzuki", role: "PM", tags: ["Scrum", "中文"], lang: "中国語 母語級", loc: "東京" },
  { id: 10, initials: "L.X", name: "L. Xu", role: "MLエンジニア", tags: ["PyTorch", "CV"], lang: "日本語 N2", loc: "北京・来日可", score: 94 },
  { id: 11, initials: "T.N", name: "T. Nakamura", role: "インフラ", tags: ["K8s", "Terraform"], lang: "中国語 HSK4", loc: "リモート" },
  { id: 12, initials: "F.G", name: "F. Guo", role: "フルスタック", tags: ["Vue", "Node"], lang: "日本語 N1", loc: "成都・リモート" },
  { id: 13, initials: "N.K", name: "N. Kobayashi", role: "通訳・翻訳", tags: ["日中", "技術"], lang: "中国語 母語級", loc: "東京" },
  { id: 14, initials: "Q.L", name: "Q. Lin", role: "AIエンジニア", tags: ["LLM", "RAG"], lang: "日本語 N1", loc: "深圳・来日可", score: 92 },
  { id: 15, initials: "Y.W", name: "Y. Watanabe", role: "バックエンド", tags: ["Go", "gRPC"], lang: "中国語 HSK5", loc: "名古屋" },
  { id: 16, initials: "B.H", name: "B. Huang", role: "データエンジニア", tags: ["Spark", "ETL"], lang: "日本語 N2", loc: "上海・リモート" },
  { id: 17, initials: "H.Y", name: "H. Yamamoto", role: "フロントエンド", tags: ["React", "UI"], lang: "中国語 HSK4", loc: "東京" },
  { id: 18, initials: "D.Z", name: "D. Zhou", role: "MLエンジニア", tags: ["NLP", "PyTorch"], lang: "日本語 N2", loc: "北京・リモート" },
  { id: 19, initials: "X.W", name: "X. Wu", role: "フルスタック", tags: ["TS", "AWS"], lang: "日本語 N2", loc: "広州・来日可", score: 90 },
  { id: 20, initials: "R.I", name: "R. Ishida", role: "PM", tags: ["PdM", "中文"], lang: "中国語 母語級", loc: "東京" },
  { id: 21, initials: "C.Y", name: "C. Yang", role: "AIエンジニア", tags: ["LLM", "Triton"], lang: "日本語 N3", loc: "杭州・リモート" },
  { id: 22, initials: "K.M", name: "K. Mori", role: "バックエンド", tags: ["Rust", "DB"], lang: "中国語 HSK5", loc: "福岡" },
  { id: 23, initials: "P.S", name: "P. Sun", role: "データサイエンティスト", tags: ["ML", "A/B"], lang: "日本語 N2", loc: "上海・来日可" },
  { id: 24, initials: "T.A", name: "T. Aoki", role: "フロントエンド", tags: ["Next", "三次元"], lang: "中国語 HSK4", loc: "東京" },
];

const MATCHED = POOL.filter((p) => p.score).map((p) => p.id); // 3,10,14,19

const REQ = {
  role: "AI エンジニア（LLM）",
  must: ["Python / LLM", "日本語 N2 以上", "リモート→来日可"],
};

export default function AiMatching() {
  const [phase, setPhase] = useState<"idle" | "scan" | "match">("idle");
  const boardRef = useRef<HTMLDivElement>(null);
  const reqRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [lines, setLines] = useState<{ d: string; len: number }[]>([]);

  // 接続線の座標計算（求人要件カードの下端中央 ← 各マッチカード中央）
  useLayoutEffect(() => {
    const measure = () => {
      const board = boardRef.current, req = reqRef.current;
      if (!board || !req) return;
      const br = board.getBoundingClientRect();
      setSize({ w: br.width, h: br.height });
      const rr = req.getBoundingClientRect();
      const ax = rr.left - br.left + rr.width / 2;
      const ay = rr.top - br.top + rr.height;
      const ls = MATCHED.map((id) => {
        const el = cardRefs.current[id];
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const x = r.left - br.left + r.width / 2;
        const y = r.top - br.top + r.height / 2;
        const cy1 = ay + (y - ay) * 0.4;
        const d = `M ${ax} ${ay} C ${ax} ${cy1}, ${x} ${ay + (y - ay) * 0.6}, ${x} ${y}`;
        const len = Math.hypot(x - ax, y - ay) * 1.25;
        return { d, len };
      }).filter(Boolean) as { d: string; len: number }[];
      setLines(ls);
    };
    // ブレークポイント跨ぎのリサイズ（例: md→モバイル幅）では、ResizeObserver発火時点で
    // board自体のcontent-boxサイズは確定していても、matched カードの order-first/md:order-none
    // によるグリッド再配置（CSSメディアクエリ由来）が同フレーム内で未確定なことがある。
    // かつ並べ替え自体はboardの総サイズを変えないため再発火もされず、古い座標のまま固定されてしまう。
    // rAFを2回挟み、その回避策として並べ替え後のレイアウトが確定してから再計測する。
    const measureSettled = () => {
      requestAnimationFrame(() => requestAnimationFrame(measure));
    };
    measure();
    measureSettled();
    const ro = new ResizeObserver(measureSettled);
    if (boardRef.current) ro.observe(boardRef.current);
    window.addEventListener("resize", measureSettled);
    return () => { ro.disconnect(); window.removeEventListener("resize", measureSettled); };
  }, []);

  // スクロールインで一巡 → ゆるくループ（reduced-motion は静止最終状態）
  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setPhase("match"); return; }
    let timers: ReturnType<typeof setTimeout>[] = [];
    let started = false;
    const run = () => {
      setPhase("scan");
      timers.push(setTimeout(() => setPhase("match"), 2600));
      timers.push(setTimeout(run, 7600));
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) { started = true; run(); }
    }, { threshold: 0.3 });
    io.observe(board);
    return () => { io.disconnect(); timers.forEach(clearTimeout); };
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#FAFAF7] pt-40 pb-28 md:pt-36 md:pb-36 px-6" aria-labelledby="match-heading">
      <style>{`
        @keyframes amScan{0%{transform:translateY(0);opacity:0}8%{opacity:1}92%{opacity:1}100%{transform:translateY(var(--amh,600px));opacity:0}}
        .am-scan{animation:amScan 2.6s cubic-bezier(.4,0,.2,1) forwards}
        .am-line{transition:stroke-dashoffset 1.1s cubic-bezier(.22,1,.36,1) .2s}
        @media (prefers-reduced-motion: reduce){.am-scan{display:none}.am-line{transition:none}}
      `}</style>

      {/* 智枭の目＝正規ロゴマーク（owl.match ∞）を背景モチーフに */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-start justify-center overflow-hidden" aria-hidden="true">
        <img src="/images/owlmatch-mark.png" alt="" className="mt-12 md:mt-6 w-[680px] md:w-[960px] max-w-none"
          style={{ opacity: phase === "match" ? 1 : phase === "scan" ? 0.22 : 0.1, transition: "opacity 1.2s cubic-bezier(.22,1,.36,1)" }} />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-[11px] tracking-[0.28em] text-slate-400/80">03 / AI MATCHING</span>
          <span className="h-px flex-1 bg-slate-200/80" />
        </div>
        <h2 id="match-heading" className="text-[38px] md:text-[58px] font-medium tracking-[-0.03em] text-slate-900 leading-[1.08]">
          最適なマッチングを、AI で。
        </h2>
        <p className="mt-5 max-w-2xl text-slate-500 text-[15px] leading-[1.75] tracking-[0.01em]">
          OwlMatch 認定スクリーニングが、日中の人材プールを走査し、求人要件に最も近い人材を提示する。
        </p>

        {/* 盤面 */}
        <div ref={boardRef} className="relative mt-12 md:mt-16" style={{ ["--amh" as string]: `${size.h}px` }}>
          {/* 求人要件カード */}
          <div ref={reqRef} className="relative z-20 mx-auto mb-8 max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_-16px_rgba(15,23,42,0.18)]">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-cyan-500 text-white"><Sparkles size={14} /></span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">Job Requirement</span>
              <span className="ml-auto font-mono text-[10px] tracking-[0.12em] text-cyan-600 tabular-nums">
                {phase === "match" ? `${MATCHED.length} MATCHES` : "SCANNING…"}
              </span>
            </div>
            <p className="text-[15px] font-semibold text-slate-900">{REQ.role}</p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {REQ.must.map((m) => (
                <span key={m} className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">{m}</span>
              ))}
            </div>
          </div>

          {/* 接続線（SVG） */}
          <svg className="pointer-events-none absolute inset-0 z-10" width={size.w} height={size.h} viewBox={`0 0 ${size.w} ${size.h}`} fill="none">
            {lines.map((l, i) => (
              <path key={i} d={l.d} stroke="#06b6d4" strokeWidth={1.5} strokeLinecap="round"
                className="am-line" style={{ strokeDasharray: l.len, strokeDashoffset: phase === "match" ? 0 : l.len, opacity: phase === "match" ? 0.6 : 0 }} />
            ))}
          </svg>

          {/* スキャンライン */}
          {phase === "scan" && (
            <div className="am-scan pointer-events-none absolute inset-x-0 top-0 z-10 h-px" style={{ background: "linear-gradient(90deg, transparent, #06b6d4, transparent)", boxShadow: "0 0 0 1px rgba(6,182,212,0.06)" }} />
          )}

          {/* 人材プール・グリッド */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 md:gap-3">
            {POOL.map((p) => {
              const matched = phase === "match" && p.score;
              return (
                <div
                  key={p.id}
                  ref={(el) => { cardRefs.current[p.id] = el; }}
                  className={`relative rounded-xl border bg-white p-3 transition-all duration-500 ${p.score ? "order-first md:order-none" : ""}`}
                  style={{
                    borderColor: matched ? "#67e8f9" : "#e7e9ee",
                    boxShadow: matched ? "0 14px 30px -14px rgba(6,182,212,0.4), 0 0 0 1px #06b6d4" : "0 1px 2px rgba(15,23,42,0.04)",
                    transform: matched ? "translateY(-3px) scale(1.03)" : "none",
                    zIndex: matched ? 20 : 1,
                    opacity: phase === "idle" ? 0.85 : matched || phase === "scan" ? 1 : 0.55,
                  }}
                >
                  {matched && (
                    <span className="absolute -right-1.5 -top-1.5 z-10 inline-flex items-center gap-0.5 rounded-full bg-cyan-500 px-1.5 py-0.5 text-[10px] font-bold tabular-nums text-white shadow-sm">
                      <Check size={9} strokeWidth={3} />{p.score}%
                    </span>
                  )}
                  <div className="flex items-center gap-2">
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[10px] font-bold ${matched ? "bg-cyan-50 text-cyan-700" : "bg-slate-100 text-slate-500"}`}>{p.initials}</span>
                    <div className="min-w-0">
                      <p className="truncate text-[12px] font-semibold text-slate-800">{p.name}</p>
                      <p className="truncate text-[10.5px] text-slate-400">{p.role}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded bg-slate-50 px-1.5 py-px text-[9.5px] font-medium text-slate-500">{t}</span>
                    ))}
                  </div>
                  <p className="mt-1.5 truncate text-[9.5px] text-slate-400">{p.lang}・{p.loc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
