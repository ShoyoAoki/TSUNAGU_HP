"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useContact } from "@/context/ContactContext";

// OwlMatch シネマティック3Dヒーロー（vanilla Three.js + GSAP, client-only）
const OwlHero = dynamic(() => import("./OwlHero.client"), { ssr: false });
import AccessibleTalent from "./AccessibleTalent";
import VideoFeed from "./VideoFeed";
import AiMatching from "./AiMatching";
import WhyOwlMatch from "./WhyOwlMatch";


export default function ServiceDetailClient() {
  const { openContact } = useContact();

  return (
    <>
      <OwlHero />
      <AccessibleTalent />
      <VideoFeed />
      <AiMatching />
      <WhyOwlMatch />
    <div className="min-h-screen bg-[#FAFAF7] relative overflow-hidden">
      <main className="relative z-10">
        {/* CTAセクション（非対称・智枭の∞マーク／中央テンプレ脱却） */}
        <section className="relative overflow-hidden bg-white border-t border-slate-200 py-24 md:py-32 px-6">
          <div className="container mx-auto max-w-7xl relative">
            <div className="flex items-center gap-4 mb-12">
              <span className="font-mono text-[11px] tracking-[0.28em] text-slate-400/80">05 / CONTACT</span>
              <span className="h-px flex-1 bg-slate-200/80" />
            </div>
            <div className="grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-16">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-[34px] md:text-[56px] font-medium tracking-[-0.03em] text-slate-900 leading-[1.12]">
                  会う前に、見抜く。
                </h2>
                <p className="mt-6 max-w-md text-slate-500 text-[15px] leading-[1.75]">
                  AI と認定スクリーニングで、最適な候補を提示します。
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  {/* 青：資料を受け取る（企業向け） */}
                  <button onClick={openContact} className="group inline-flex items-center gap-2.5 bg-cyan-500 text-white px-9 py-4 rounded-xl font-semibold transition-colors duration-200 hover:bg-slate-900">
                    <span>資料を受け取る。</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </button>
                  {/* 白：求職者はこちら → OwlMatch ログイン */}
                  <a href="https://owlmatch.ai/login" target="_blank" rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-700 transition-colors duration-200 hover:border-slate-900 hover:text-slate-900">
                    <span>求職者はこちら</span>
                    <span className="text-slate-400 transition-colors group-hover:text-slate-900">↗</span>
                  </a>
                </div>
                <div className="mt-10 flex md:hidden items-center justify-center" aria-hidden="true">
                  <img src="/images/owlmatch-mark.png" alt="" className="w-[120px]" />
                </div>
              </motion.div>
              <div className="relative hidden md:flex items-center justify-center" aria-hidden="true">
                <img src="/images/owlmatch-mark.png" alt="" className="w-[430px] max-w-none" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
    </>
  );
}
