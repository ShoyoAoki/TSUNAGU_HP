"use client";

/**
 * 「WHY OWLMATCH」説得セクション（AiMatching の下・SERVICE の前・04）
 * 上段：越境採用の3つの壁を「放射状の円ダイアグラム」で視覚化（中心=智枭∞、周囲=3つの壁、cyan線で接続）。
 * 下段：従来の人材紹介 vs OwlMatch の比較表（6軸）。料金は前面化せずマイクロコピーのみ。
 * 白基調エディトリアル。グロー不使用。reduced-motion で静止最終状態。
 */
import { useEffect, useRef } from "react";
import { Check, Minus } from "lucide-react";

// 放射状ノード（中心からの角度・%座標）。top=-90°, 30°, 150°（120°等配）
const WALLS = [
  { name: "言語の壁", problem: "「話せる」が、曖昧。", x: "50%", y: "16%" },
  { name: "実力の壁", problem: "書類では、見えない。", x: "79%", y: "67%" },
  { name: "ミスマッチ", problem: "勘で選び、揺れる。", x: "21%", y: "67%" },
];

const ROWS: { axis: string; old: string; owl: string }[] = [
  { axis: "費用・報酬", old: "着手金・紹介料が先に発生。返金も複雑", owl: "完全成功報酬。採用が決まるまで、ゼロ。" },
  { axis: "言語・実務", old: "曖昧な自己申告", owl: "日本語 N2 以上・中国語実務を基準で。" },
  { axis: "マッチング", old: "担当者の勘に依存", owl: "AI が、意志とスキルを照合。" },
  { axis: "法・契約・在留", old: "企業まかせ", owl: "許可事業として、契約も在留も設計。" },
  { axis: "スピード", old: "数週間〜数カ月", owl: "要件確定から、最短で会える。" },
  { axis: "中国の人材プール", old: "届きにくい", owl: "即戦力プールに、直接つながる。" },
];

export default function WhyOwlMatch() {
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = diagramRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { el.classList.add("is-on"); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("is-on"); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#FAFAF7] py-28 md:py-36 px-6" aria-labelledby="why-heading">
      <style>{`
        @keyframes wdDraw{to{stroke-dashoffset:0}}
        @keyframes wdPulse{0%{transform:translate(-50%,-50%) scale(.92);opacity:.4}80%{opacity:0}100%{transform:translate(-50%,-50%) scale(1.72);opacity:0}}
        .wd-line{stroke-dasharray:230;stroke-dashoffset:230}
        .is-on .wd-line{animation:wdDraw .9s cubic-bezier(.22,1,.36,1) forwards}
        .wd-node,.wd-core{opacity:0;transform:translate(-50%,-50%) scale(.86);transition:opacity .6s ease,transform .6s cubic-bezier(.22,1,.36,1)}
        .is-on .wd-node,.is-on .wd-core{opacity:1;transform:translate(-50%,-50%) scale(1)}
        .wd-pulse{transform:translate(-50%,-50%);opacity:0}
        .is-on .wd-pulse{animation:wdPulse 3.4s ease-out infinite}
        @media (prefers-reduced-motion: reduce){.wd-line{stroke-dashoffset:0;animation:none}.wd-node,.wd-core{transition:none}.is-on .wd-pulse{animation:none}}
      `}</style>

      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-[11px] tracking-[0.28em] text-slate-400/80">04 / WHY OWLMATCH</span>
          <span className="h-px flex-1 bg-slate-200/80" />
        </div>
        <h2 id="why-heading" className="text-[38px] md:text-[58px] font-medium tracking-[-0.03em] text-slate-900 leading-[1.08]">
          越境採用の壁は、仕組みで壊す。
        </h2>

        {/* 放射状ダイアグラム（ブループリント風の背景で空間を埋める／視覚優位の主役） */}
        <div className="relative -mx-6 mt-12 md:mt-16 px-6">
          {/* ドットグリッド背景（精密図面の質感・端でフェード） */}
          <div className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1.4px)",
              backgroundSize: "28px 28px",
              opacity: 0.5,
              WebkitMaskImage: "radial-gradient(ellipse 62% 70% at 50% 50%, #000 30%, transparent 78%)",
              maskImage: "radial-gradient(ellipse 62% 70% at 50% 50%, #000 30%, transparent 78%)",
            }} />

          <div ref={diagramRef} className="relative mx-auto aspect-square w-full max-w-[720px]">
            {/* 同心円・軌道目盛り・接続線 */}
            <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
              <circle cx="300" cy="300" r="276" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="1 9" opacity="0.7" />
              <circle cx="300" cy="300" r="198" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="2 7" />
              <circle cx="300" cy="300" r="130" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="1 8" opacity="0.6" />
              {Array.from({ length: 36 }).map((_, k) => {
                const a = (k / 36) * Math.PI * 2;
                const r1 = 238, r2 = k % 3 === 0 ? 230 : 234;
                const f = (n: number) => (300 + n).toFixed(2);
                return <line key={k} x1={f(r1 * Math.cos(a))} y1={f(r1 * Math.sin(a))} x2={f(r2 * Math.cos(a))} y2={f(r2 * Math.sin(a))} stroke="#cbd5e1" strokeWidth="1" strokeLinecap="round" opacity="0.7" />;
              })}
              <line className="wd-line" style={{ animationDelay: "0.15s" }} x1="300" y1="300" x2="300" y2="102" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" />
              <line className="wd-line" style={{ animationDelay: "0.3s" }} x1="300" y1="300" x2="471" y2="399" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" />
              <line className="wd-line" style={{ animationDelay: "0.45s" }} x1="300" y1="300" x2="129" y2="399" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" />
            </svg>

            {/* 中心のパルスリング（呼吸する） */}
            <span className="wd-pulse absolute left-1/2 top-1/2 z-10 h-[170px] w-[170px] md:h-[200px] md:w-[200px] rounded-full border border-cyan-300" aria-hidden="true" />
            <span className="wd-pulse absolute left-1/2 top-1/2 z-10 h-[170px] w-[170px] md:h-[200px] md:w-[200px] rounded-full border border-cyan-300" style={{ animationDelay: "1.6s" }} aria-hidden="true" />

            {/* 中心ノード：智枭の∞マーク */}
            <div className="wd-core absolute left-1/2 top-1/2 z-20 grid h-[170px] w-[170px] md:h-[200px] md:w-[200px] place-items-center rounded-full border border-cyan-200 bg-white text-center shadow-[0_18px_40px_-18px_rgba(6,182,212,0.45)]">
              <div>
                <img src="/images/owlmatch-mark.png" alt="OwlMatch" className="mx-auto w-[100px] md:w-[120px]" />
                <span className="mt-1 block font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-cyan-700">Break through</span>
              </div>
            </div>

            {/* 3つの壁ノード（円） */}
            {WALLS.map((w, i) => (
              <div key={w.name} className="wd-node absolute z-20 grid h-[152px] w-[152px] md:h-[186px] md:w-[186px] place-items-center rounded-full border border-slate-200 bg-white px-4 text-center shadow-[0_12px_30px_-14px_rgba(15,23,42,0.22)]"
                style={{ left: w.x, top: w.y, transitionDelay: `${0.3 + i * 0.12}s` }}>
                <div>
                  <p className="text-[21px] md:text-[25px] font-semibold text-slate-900">{w.name}</p>
                  <p className="mt-2 text-[13px] md:text-[15px] text-slate-400 leading-[1.55]">{w.problem}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 比較表：従来の人材紹介 vs OwlMatch */}
        <div className="mt-20 md:mt-28">
          <h3 className="text-[20px] md:text-[24px] font-semibold tracking-[-0.01em] text-slate-900">
            従来の人材紹介と、何が違うか。
          </h3>

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="grid grid-cols-[1fr_1fr] md:grid-cols-[180px_1fr_1fr]">
              <div className="hidden md:block border-b border-slate-200 px-6 py-4" />
              <div className="border-b border-r border-slate-200 px-5 md:px-6 py-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">従来の人材紹介</span>
              </div>
              <div className="relative border-b border-slate-200 px-5 md:px-6 py-4">
                <span className="absolute inset-x-0 top-0 h-[2px] bg-cyan-500" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-700">OwlMatch</span>
              </div>
            </div>

            {ROWS.map((r, i) => (
              <div key={r.axis} className={`grid grid-cols-[1fr_1fr] md:grid-cols-[180px_1fr_1fr] ${i < ROWS.length - 1 ? "border-b border-slate-100" : ""}`}>
                <div className="col-span-2 md:col-span-1 border-b border-slate-100 md:border-b-0 md:border-r px-5 md:px-6 py-3 md:py-5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">{r.axis}</span>
                </div>
                <div className="flex items-start gap-2.5 border-r border-slate-100 px-5 md:px-6 py-4 md:py-5">
                  <Minus size={15} className="mt-0.5 shrink-0 text-slate-300" />
                  <span className="text-[13px] md:text-[14px] text-slate-400 leading-[1.55]">{r.old}</span>
                </div>
                <div className="flex items-start gap-2.5 bg-cyan-50/40 px-5 md:px-6 py-4 md:py-5">
                  <Check size={15} strokeWidth={2.4} className="mt-0.5 shrink-0 text-cyan-600" />
                  <span className="text-[13px] md:text-[14px] font-medium text-slate-800 leading-[1.55]">{r.owl}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 font-mono text-[11px] tracking-[0.04em] text-slate-400">
            費用が発生するのは、採用が決まったときだけ。
          </p>
        </div>
      </div>
    </section>
  );
}
