"use client";

/**
 * 「アクセスできる人材」3D回転カルーセル（ヒーロー直下）
 * OwlMatch本体トンマナ準拠：cyan基調アクセント / 白基調ソリッドカード / 背景写真クロスフェード。
 * アイコンは単体・大サイズ・はみ出し・丸枠なし（歯車=自作シャープ矩形歯/対話バブル/位置ピン）。
 * ※原型不変・ミクロ洗練のみ（余白/タイポ階層/影/スクリム濃度/イージング）。
 */
import { useState } from "react";
import { MessagesSquare, MapPin, ArrowRight, type LucideIcon } from "lucide-react";

/** シャープな矩形歯のソリッド歯車（lucideの丸い歯を嫌うCEO指示・参照画像準拠） */
function SharpGear({ size, color, className, style }: { size: number; color: string; className?: string; style?: React.CSSProperties }) {
  const teeth = 8, c = 50, outR = 48, ringR = 37, holeR = 16, tw = 15;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} fill={color} className={className} style={style} shapeRendering="geometricPrecision">
      {Array.from({ length: teeth }).map((_, i) => (
        <rect key={i} x={c - tw / 2} y={c - outR} width={tw} height={outR - ringR + 8} transform={`rotate(${(360 / teeth) * i} ${c} ${c})`} />
      ))}
      <path fillRule="evenodd" d={`M${c - ringR} ${c}a${ringR} ${ringR} 0 1 0 ${2 * ringR} 0a${ringR} ${ringR} 0 1 0 ${-2 * ringR} 0ZM${c - holeR} ${c}a${holeR} ${holeR} 0 1 0 ${2 * holeR} 0a${holeR} ${holeR} 0 1 0 ${-2 * holeR} 0Z`} />
    </svg>
  );
}

type Talent = {
  label: string; name: string; img: string; accent: string;
  Glyph?: LucideIcon; gear?: boolean; spin?: boolean; lead: string; tags: string[]; service: string;
};

const TALENTS: Talent[] = [
  { label: "LANGUAGE", name: "言語人材", img: "/images/talent/language.jpg", Glyph: MessagesSquare, accent: "#e8930c",
    lead: "N2以上の、日中バイリンガル。", tags: ["日本語 N2 以上", "商社・メーカー・サービス業", "初期費用ゼロ・成功報酬"], service: "OwlMatch Language" },
  { label: "ROBOTICS / AI / IT", name: "ロボット・AI・IT人材", img: "/images/talent/tech.jpg", gear: true, spin: true, accent: "#06b6d4",
    lead: "中国の、ロボット・AI・IT人材。", tags: ["OwlMatch 認定スクリーニング", "ロボティクス・AI・IT", "リモートで試して採用"], service: "OwlMatch Remote" },
  { label: "CROSS-BORDER", name: "スポット人材", img: "/images/talent/spot.jpg", Glyph: MapPin, accent: "#6366f1",
    lead: "日単位で動く、現地スポット人材。", tags: ["中国現地スポット案件", "日単位の稼働で実証", "クロスボーダー対応（PIPL）"], service: "OwlMatch Spot" },
];

const SLOT = [
  { x: "0%", z: 0, ry: 0, scale: 1, op: 1, zi: 30 },
  { x: "76%", z: -200, ry: -18, scale: 0.85, op: 0.66, zi: 20 },
  { x: "-76%", z: -200, ry: 18, scale: 0.85, op: 0.66, zi: 20 },
];
const EASE = "cubic-bezier(.22,1,.36,1)";

export default function AccessibleTalent() {
  const [active, setActive] = useState(1);
  const n = TALENTS.length;
  const rotate = (d: number) => setActive((a) => (a + d + n) % n);

  return (
    <section className="relative overflow-hidden bg-[#FAFAF7] pt-40 pb-28 md:pt-36 md:pb-36 px-6" aria-labelledby="talent-heading">
      <style>{`@keyframes tspin{to{transform:rotate(360deg)}} .t-spin{animation:tspin 18s linear infinite;transform-origin:50% 50%}
        .t-card{transition:transform .9s ${EASE},opacity .9s ${EASE},box-shadow .4s ${EASE}}
        .t-front:hover{transform:translateX(-50%) translateY(-6px)!important;box-shadow:0 36px 64px -20px rgba(15,23,42,.20)!important}`}</style>

      {/* 背景：人材タイプごとの写真（クロスフェード） */}
      <div className="pointer-events-none absolute inset-0">
        {TALENTS.map((t, i) => (
          <div key={t.name} className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${t.img})`, opacity: i === active ? 1 : 0, transition: `opacity .9s ${EASE}` }} />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(250,250,247,0.98) 0%, rgba(250,250,247,0.80) 30%, rgba(250,250,247,0.65) 60%, rgba(250,250,247,0.92) 100%)" }} />

      <div className="container mx-auto max-w-7xl relative">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-[11px] tracking-[0.28em] text-slate-400/80">01 / ACCESS TO TALENT</span>
          <span className="h-px flex-1 bg-slate-200/80" />
        </div>
        <h2 id="talent-heading" className="text-[38px] md:text-[58px] font-medium tracking-[-0.03em] text-slate-900 leading-[1.08]">
          どんな人材に、<br className="hidden md:block" />アクセスできるか。
        </h2>
        <p className="mt-5 max-w-2xl text-slate-400 text-[15px] leading-[1.75] tracking-[0.01em]">
          OwlMatch は、日中をまたぐ3つの人材プールへの入口です——言語、ロボット・AI・IT、スポット。
        </p>

        {/* 3D カルーセル */}
        <div className="mt-16 md:mt-20 relative" style={{ perspective: "2000px" }}>
          <div className="relative mx-auto h-[580px] md:h-[540px]" style={{ transformStyle: "preserve-3d" }}>
            {TALENTS.map((t, i) => {
              const slot = SLOT[(i - active + n) % n];
              const front = slot.zi === 30;
              const G = t.Glyph;
              return (
                <article
                  key={t.name}
                  onClick={() => !front && setActive(i)}
                  aria-hidden={!front}
                  className={`t-card absolute left-1/2 top-0 w-[88vw] max-w-[420px] rounded-2xl border border-slate-200/70 ${front ? "bg-white/55 backdrop-blur-sm t-front" : "bg-white"}`}
                  style={{
                    transform: `translateX(-50%) translateX(${slot.x}) translateZ(${slot.z}px) rotateY(${slot.ry}deg) scale(${slot.scale})`,
                    opacity: slot.op, zIndex: slot.zi,
                    cursor: front ? "default" : "pointer",
                    boxShadow: front
                      ? "0 28px 56px -20px rgba(15,23,42,0.16)"
                      : "0 12px 28px -16px rgba(15,23,42,0.10)",
                  }}
                >
                  {/* アイコン単体（丸枠なし・各種カラー・大きく）。歯車はシャープ矩形歯のソリッドSVG */}
                  {t.gear ? (
                    <SharpGear size={front ? 126 : 106} color={t.accent}
                      className={`pointer-events-none absolute ${front && t.spin ? "t-spin" : ""}`}
                      style={{ top: front ? -20 : -12, right: front ? 20 : 16, filter: "drop-shadow(0 6px 14px rgba(15,23,42,0.14))", transition: `all .5s ${EASE}` }} />
                  ) : (
                    G && <G size={front ? 122 : 102} strokeWidth={1.8} color={t.accent}
                      strokeLinecap="square" strokeLinejoin="miter"
                      className="pointer-events-none absolute"
                      style={{ top: front ? -16 : -10, right: front ? 20 : 16, filter: "drop-shadow(0 6px 14px rgba(15,23,42,0.14))", transition: `all .5s ${EASE}` }} />
                  )}

                  <div className="px-9 md:px-11" style={{ paddingTop: 108, paddingBottom: 40 }}>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.26em] text-slate-400/90">{t.label}</span>
                    <h3 className="mt-2 text-[28px] md:text-[30px] font-bold text-slate-900 leading-[1.12] tracking-[-0.025em]">{t.name}</h3>
                    <p className="mt-3 text-[15px] font-normal text-slate-500 leading-[1.65]">{t.lead}</p>

                    <ul className="mt-5 flex flex-col gap-2">
                      {t.tags.map((tag) => (
                        <li key={tag} className="inline-flex items-center gap-2.5 text-[12px] text-slate-500 leading-[1.5]">
                          <span className="h-[4px] w-[4px] shrink-0 rounded-full" style={{ background: t.accent }} />{tag}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 pt-5 flex items-center justify-between border-t border-slate-200/60">
                      <span className="font-mono text-[10px] uppercase tracking-[0.20em] text-slate-400">{t.service}</span>
                      <span className="group inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200/80 transition-colors duration-150 hover:border-transparent hover:bg-[var(--ac)]" style={{ ["--ac" as string]: t.accent }}>
                        <ArrowRight size={14} strokeWidth={2} className="text-slate-500 transition-colors duration-150 group-hover:text-white" />
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <button type="button" onClick={() => rotate(-1)} aria-label="前の人材へ"
            className="absolute left-0 md:left-1 top-1/2 -translate-y-1/2 z-40 grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white/90 text-slate-600 shadow-sm transition-all duration-200 hover:scale-105 hover:border-cyan-500 hover:text-cyan-600 active:scale-95">
            <span className="text-lg leading-none">‹</span>
          </button>
          <button type="button" onClick={() => rotate(1)} aria-label="次の人材へ"
            className="absolute right-0 md:right-1 top-1/2 -translate-y-1/2 z-40 grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white/90 text-slate-600 shadow-sm transition-all duration-200 hover:scale-105 hover:border-cyan-500 hover:text-cyan-600 active:scale-95">
            <span className="text-lg leading-none">›</span>
          </button>
        </div>

        <div className="mt-5 flex justify-center gap-2.5">
          {TALENTS.map((t, i) => (
            <button key={i} type="button" onClick={() => setActive(i)} aria-label={`${t.name}へ`}
              className="h-[3px] rounded-full" style={{ width: i === active ? 28 : 6, background: i === active ? t.accent : "#e2e8f0", transition: `all .4s ${EASE}` }} />
          ))}
        </div>
      </div>
    </section>
  );
}
