"use client";

/**
 * 「OwlMatch 動画フィード」セクション（アクセスできる人材の直下）
 * 小红书(RED)風マソンリー。5列が交互方向（上/下/上/下/上）に無限スクロール、段々にずらす。
 * カード＝ポスター＋タイトル＋投稿者(OwlMatch公式)＋いいね。クリックでページ内モーダル再生。
 * ※UI先行（ポスター静止画）。動画は出来次第 videoSrc に差し込む後差し構造。
 */
import { useState, useRef, useEffect } from "react";
import { Play, Heart, X } from "lucide-react";

type Video = {
  id: number; title: string; poster: string; videoSrc?: string;
  likes: string; dur: string; aspect: string;
};

const P = (n: number) => `/images/video-feed/vf_${String(n).padStart(2, "0")}.jpg`;

const VIDEOS: Video[] = [
  { id: 1, title: "青木翔陽 CEO に聞く、OwlMatch のこれから。", poster: P(8), videoSrc: "/videos/owlmatch-feed/vf01_interview.mp4", likes: "3.7万", dur: "0:04", aspect: "3/4" },
  { id: 2, title: "オフィスツアー｜TSUNAGU 東京。", poster: P(1), videoSrc: "/videos/owlmatch-feed/vf02_office_v1.mp4", likes: "8,540", dur: "0:04", aspect: "4/5" },
  { id: 3, title: "30秒でわかる、OwlMatch。", poster: P(3), videoSrc: "/videos/owlmatch-feed/vf03_product.mp4", likes: "10万+", dur: "0:04", aspect: "9/16" },
  { id: 4, title: "中国の AI 人材を、リモートで。", poster: P(13), videoSrc: "/videos/owlmatch-feed/vf04_airemote.mp4", likes: "2.4万", dur: "0:04", aspect: "4/5" },
  { id: 5, title: "言語人材マッチングの、舞台裏。", poster: P(4), videoSrc: "/videos/owlmatch-feed/vf05_lang.mp4", likes: "1.2万", dur: "0:04", aspect: "3/4" },
  { id: 6, title: "なぜ、いま越境採用なのか。", poster: P(11), videoSrc: "/videos/owlmatch-feed/vf06_why.mp4", likes: "6,210", dur: "0:04", aspect: "4/5" },
  { id: 7, title: "面談はこう進む｜OwlMatch 体験。", poster: P(9), videoSrc: "/videos/owlmatch-feed/vf07_interviewflow.mp4", likes: "9,830", dur: "0:04", aspect: "9/16" },
  { id: 8, title: "スポット人材という、新しい選択。", poster: P(6), videoSrc: "/videos/owlmatch-feed/vf08_spot.mp4", likes: "4,402", dur: "0:04", aspect: "3/4" },
  { id: 9, title: "メンバーが語る、TSUNAGU のカルチャー。", poster: P(5), videoSrc: "/videos/owlmatch-feed/vf09_culture.mp4", likes: "1.8万", dur: "0:04", aspect: "4/5" },
  { id: 10, title: "数字で見る、OwlMatch。", poster: P(15), videoSrc: "/videos/owlmatch-feed/vf10_numbers.mp4", likes: "2,103", dur: "0:04", aspect: "3/4" },
  { id: 11, title: "日中をつなぐ、一日。", poster: P(2), videoSrc: "/videos/owlmatch-feed/vf11_day.mp4", likes: "5.1万", dur: "0:04", aspect: "9/16" },
  { id: 12, title: "採用担当者の、リアルな声。", poster: P(12), videoSrc: "/videos/owlmatch-feed/vf12_recruiter.mp4", likes: "7,640", dur: "0:04", aspect: "4/5" },
  { id: 13, title: "エンジニアの、リモート就業。", poster: P(14), videoSrc: "/videos/owlmatch-feed/vf13_engineer.mp4", likes: "1.1万", dur: "0:04", aspect: "3/4" },
  { id: 14, title: "認定スクリーニングの、仕組み。", poster: P(16), videoSrc: "/videos/owlmatch-feed/vf14_screening.mp4", likes: "3,275", dur: "0:04", aspect: "4/5" },
  { id: 15, title: "はじめての、OwlMatch。", poster: P(7), videoSrc: "/videos/owlmatch-feed/vf15_start.mp4", likes: "10万+", dur: "0:04", aspect: "9/16" },
  { id: 16, title: "現場で活きる、バイリンガル人材。", poster: P(10), videoSrc: "/videos/owlmatch-feed/vf16_bilingual.mp4", likes: "8,910", dur: "0:04", aspect: "3/4" },
  { id: 17, title: "OwlMatch が選ばれる理由。", poster: P(3), videoSrc: "/videos/owlmatch-feed/vf17_chosen.mp4", likes: "2.9万", dur: "0:04", aspect: "4/5" },
  { id: 18, title: "チームで挑む、越境採用。", poster: P(1), videoSrc: "/videos/owlmatch-feed/vf18_team.mp4", likes: "6,058", dur: "0:04", aspect: "3/4" },
  { id: 19, title: "AI が、最適なマッチを。", poster: P(13), videoSrc: "/videos/owlmatch-feed/vf19_aimatch.mp4", likes: "4.3万", dur: "0:04", aspect: "9/16" },
  { id: 20, title: "面談から、内定まで。", poster: P(9), videoSrc: "/videos/owlmatch-feed/vf20_offer.mp4", likes: "5,720", dur: "0:04", aspect: "4/5" },
];

// 5列に振り分け（縦マソンリー・md以上）
const COLS = 5;
const columns = Array.from({ length: COLS }, (_, c) => VIDEOS.filter((_, i) => i % COLS === c));
// 列ごとの方向・速度・位相（段々・交互）
const COL = [
  { dir: "up", dur: 42, delay: 0, off: 0 },
  { dir: "down", dur: 48, delay: -9, off: -260 },
  { dir: "up", dur: 44, delay: -22, off: -120 },
  { dir: "down", dur: 50, delay: -6, off: -380 },
  { dir: "up", dur: 46, delay: -16, off: -190 },
];

// モバイル（<768px）用：横2段マーキー。row1=偶数index(id 1,3,5…19)/row2=奇数index(id 2,4,6…20)。全20本を欠落なくカバー
const ROW1 = VIDEOS.filter((_, i) => i % 2 === 0);
const ROW2 = VIDEOS.filter((_, i) => i % 2 === 1);

/** フィードのタイル。動画は画面内に入った時だけ自動再生（無音ループ）して負荷を抑える */
function Tile({ v, onOpen, widthClass = "w-full" }: { v: Video; onOpen: (v: Video) => void; widthClass?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) el.play().catch(() => {});
        else el.pause();
      }),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <button type="button" onClick={() => onOpen(v)}
      className={`group block ${widthClass} shrink-0 text-left rounded-2xl overflow-hidden bg-white border border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow duration-200 hover:shadow-[0_14px_30px_-14px_rgba(15,23,42,0.18)]`}>
      <div className="relative w-full" style={{ aspectRatio: "9 / 16" }}>
        {v.videoSrc ? (
          <video ref={ref} src={`${v.videoSrc}?v=2`} poster={v.poster} muted loop playsInline preload="metadata"
            className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <img src={v.poster} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        )}
        <span className="absolute right-2.5 top-2.5 grid h-7 w-7 place-items-center rounded-full bg-black/40 backdrop-blur-[2px] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <Play size={12} className="translate-x-[1px] text-white" fill="white" />
        </span>
        <span className="absolute right-2 bottom-2 rounded-md bg-black/55 px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-white">{v.dur}</span>
      </div>
      <div className="px-3 pt-2.5 pb-3">
        <p className="text-[12.5px] font-medium leading-[1.5] text-slate-800 line-clamp-2">{v.title}</p>
        <div className="mt-2.5 flex items-center justify-between gap-2">
          <span className="flex min-w-0 items-center gap-1.5">
            <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-cyan-500 text-[8px] font-bold text-white">O</span>
            <span className="truncate text-[11px] text-slate-500">OwlMatch公式</span>
          </span>
          <span className="flex shrink-0 items-center gap-1 text-[11px] text-slate-400">
            <Heart size={11} />{v.likes}
          </span>
        </div>
      </div>
    </button>
  );
}

export default function VideoFeed() {
  const [active, setActive] = useState<Video | null>(null);
  const [paused1, setPaused1] = useState(false);
  const [paused2, setPaused2] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#FAFAF7] pt-40 pb-28 md:pt-36 md:pb-36 px-6" aria-labelledby="feed-heading">
      <style>{`
        @keyframes vfUp{from{transform:translateY(0)}to{transform:translateY(-50%)}}
        @keyframes vfDown{from{transform:translateY(-50%)}to{transform:translateY(0)}}
        @keyframes vfLeft{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes vfRight{from{transform:translateX(-50%)}to{transform:translateX(0)}}
        .vf-col:hover .vf-track{animation-play-state:paused}
        @media (prefers-reduced-motion: reduce){.vf-track,.vf-track-h{animation:none!important}}
      `}</style>

      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-[11px] tracking-[0.28em] text-slate-400/80">02 / VIDEO FEED</span>
          <span className="h-px flex-1 bg-slate-200/80" />
        </div>
        <h2 id="feed-heading" className="text-[38px] md:text-[58px] font-medium tracking-[-0.03em] text-slate-900 leading-[1.08]">
          動画でわかる、越境採用。
        </h2>
        <p className="mt-5 max-w-2xl text-slate-500 text-[15px] leading-[1.75] tracking-[0.01em]">
          OwlMatch は、中国の人材と日本の企業を動画でつなぐ、クロスボーダー HR プラットフォーム。
        </p>
      </div>

      {/* モバイル（<768px）：横2段オートマーキー。全20本を欠落なく2段に配分 */}
      <div className="relative mx-auto mt-14 max-w-7xl md:hidden">
        <div className="flex flex-col gap-3 overflow-hidden">
          <div className="relative w-full overflow-hidden"
            onTouchStart={() => setPaused1(true)} onTouchEnd={() => setPaused1(false)}>
            <div className="vf-track-h flex gap-3 will-change-transform"
              style={{ animation: "vfLeft 34s linear infinite", animationPlayState: paused1 ? "paused" : "running" }}>
              {[...ROW1, ...ROW1].map((v, k) => (
                <Tile key={`r1-${v.id}-${k}`} v={v} onOpen={setActive} widthClass="w-[140px] sm:w-[160px]" />
              ))}
            </div>
          </div>
          <div className="relative w-full overflow-hidden"
            onTouchStart={() => setPaused2(true)} onTouchEnd={() => setPaused2(false)}>
            <div className="vf-track-h flex gap-3 will-change-transform"
              style={{ animation: "vfRight 38s linear infinite", animationPlayState: paused2 ? "paused" : "running" }}>
              {[...ROW2, ...ROW2].map((v, k) => (
                <Tile key={`r2-${v.id}-${k}`} v={v} onOpen={setActive} widthClass="w-[140px] sm:w-[160px]" />
              ))}
            </div>
          </div>
        </div>
        {/* 左右フェード（端で自然に消える） */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#FAFAF7] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#FAFAF7] to-transparent" />
      </div>

      {/* 5列マソンリー・フィード（md以上） */}
      <div className="relative mx-auto mt-14 md:mt-16 max-w-7xl hidden md:block">
        <div className="flex gap-3 md:gap-4 h-[620px] sm:h-[700px] md:h-[780px] overflow-hidden">
          {columns.map((col, ci) => {
            const cfg = COL[ci];
            const loop = [...col, ...col];
            return (
              <div key={ci} className="vf-col relative flex-1 overflow-hidden">
                <div className="vf-track flex flex-col gap-3 md:gap-4 will-change-transform"
                  style={{ marginTop: cfg.off, animation: `${cfg.dir === "up" ? "vfUp" : "vfDown"} ${cfg.dur}s linear infinite`, animationDelay: `${cfg.delay}s` }}>
                  {loop.map((v, k) => (
                    <Tile key={`${v.id}-${k}`} v={v} onOpen={setActive} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        {/* 上下フェード（端で自然に消える） */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#FAFAF7] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FAFAF7] to-transparent" />
      </div>

      {/* モーダル再生（videoSrc が無ければポスター＋近日公開） */}
      {active && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm" onClick={() => setActive(null)}>
          <div className="relative w-full max-w-[400px] overflow-hidden rounded-2xl bg-black shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full" style={{ aspectRatio: "9/16", maxHeight: "82vh" }}>
              {active.videoSrc ? (
                <video src={`${active.videoSrc}?v=2`} controls autoPlay className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <>
                  <img src={active.poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-75" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40">
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-white/90">
                      <Play size={26} className="translate-x-[2px] text-slate-900" fill="currentColor" />
                    </span>
                    <span className="text-[12px] tracking-[0.1em] text-white/85">近日公開</span>
                  </div>
                </>
              )}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4">
                <p className="text-[13px] font-medium leading-snug text-white">{active.title}</p>
                <p className="mt-1 text-[11px] text-white/70">OwlMatch公式 ・ ♡ {active.likes}</p>
              </div>
            </div>
            <button type="button" onClick={() => setActive(null)} aria-label="閉じる"
              className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70">
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
