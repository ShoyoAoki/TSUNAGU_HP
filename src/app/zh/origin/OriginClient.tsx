"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

// グリッド背景コンポーネント（Hero.tsxのものを踏襲しつつ調整）
const GridBackground = () => (
  <div
    className="fixed inset-0 pointer-events-none opacity-[0.05] z-0"
    style={{
      backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
      backgroundSize: '60px 60px',
    }}
  />
);

// 背景に流れるセネカの言葉（装飾的要素）
const BackgroundText = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[5%] left-[-2%] text-[10vw] font-serif italic text-black/[0.015] whitespace-nowrap leading-none uppercase tracking-tighter"
      >
        Non exiguum temporis habemus, sed multum perdidimus.
      </motion.div>
      <motion.div
        style={{ y: y3 }}
        className="absolute top-[45%] right-[-10%] text-[8vw] font-serif italic text-black/[0.01] whitespace-nowrap leading-none uppercase tracking-widest"
      >
        Life is long if you know how to use it.
      </motion.div>
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-[5%] left-[-5%] text-[10vw] font-serif italic text-black/[0.015] whitespace-nowrap leading-none uppercase tracking-tighter"
      >
        Vita, si scias uti, longa est.
      </motion.div>
    </div>
  );
};

export default function OriginClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main ref={containerRef} className="relative min-h-screen bg-white text-black selection:bg-gray-100 selection:text-black">
      <GridBackground />
      <BackgroundText />

      <div className="relative z-10">
        {/* ヒーローセクション：中央に大きくロゴを配置 */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-4xl flex flex-col items-center"
          >
            {/* 砂時計/無限ロゴのビジュアル（既存の動画を応用） */}
            <div className="relative w-full flex flex-col items-center justify-center">
              <video
                src="/videos/sandglass.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-auto h-[45vh] max-h-[500px] object-contain mix-blend-multiply opacity-90"
                style={{
                  maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
                }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1.5 }}
              className="mt-4 text-center flex flex-col items-center"
            >
              {/* 公式ロゴ画像：タイトルのすぐ上に配置 */}
              <div className="mb-6">
                <Image
                  src="/images/logo.png"
                  alt="TSUNAGU"
                  width={600}
                  height={150}
                  className="w-[260px] md:w-[400px] h-auto"
                  priority
                />
              </div>

              <span className="block text-sm font-mono tracking-[0.4em] text-gray-400 mb-4 uppercase">
                Origins of Name and Logo
              </span>
              <h1 className="text-2xl md:text-3xl font-serif tracking-widest text-gray-900">
                公司名与LOGO的由来
              </h1>
            </motion.div>
          </motion.div>
        </section>

        {/* コンテンツセクション */}
        <div className="max-w-4xl mx-auto px-6 pb-40 space-y-40">

          {/* 1. 社名の由来 */}
          <Section
            title="连接世界各地的『意志』。"
            label="COMPANY NAME"
          >
            <p className="leading-relaxed">
              「株式会社TSUNAGU」这一名称，蕴含着我们借助科技消融国境与时间的壁垒、以最短距离连接散布世界各地的高洁意志的坚定决心。
              我们提供的平台「OwlMatch（智枭）」，如同猫头鹰般即使在黑暗中也能洞察最合适的人才，实现跨越国家・行业・语言的全方位匹配——「Owl Match＝All Match」这一双关寓意，正是我们哲学的具体体现。
            </p>
          </Section>

          {/* 2. ロゴの由来 */}
          <Section
            title="在有限的时间里，创造无限的价值。"
            label="LOGO DESIGN"
          >
            <div className="space-y-8">
              <p className="leading-relaxed">
                我们的LOGO，是将沙漏与「无限（∞）」结合而成的造型。
              </p>

              <div className="py-12 border-y border-black/5">
                <p className="text-xl md:text-2xl font-serif italic text-gray-800 leading-relaxed text-center mb-6">
                  「我们并非被赋予了短暂的生命。而是我们自己，把它变短了。」
                </p>
                <p className="text-sm text-gray-500 text-right font-serif">— 塞涅卡《论人生短暂》</p>
              </div>

              <p className="leading-relaxed">
                时间就是生命本身，是无法挽回的最大成本。<br />
                全情投入沙漏中沙粒落下的那一瞬间（当下），持续倾注热忱。<br />
                我们相信，这样的积累，终将把「有限的时间」升华为「无限的价值」。
              </p>
            </div>
          </Section>

          {/* 3. 結び */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2 }}
            className="text-center space-y-8 pt-20"
          >
            <div className="w-12 h-[1px] bg-black mx-auto mb-12" />
            <p className="text-lg md:text-xl font-serif leading-loose tracking-wider">
              我们将怀揣这个名字与象征，<br />
              持续实现一个让世界各地的潜能得以正确连接的未来。
            </p>
          </motion.section>

        </div>
      </div>
    </main>
  );
}

function Section({ title, label, children }: { title: string; label: string; children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-12"
    >
      <div className="space-y-4">
        <span className="block text-xs font-mono tracking-[0.3em] text-gray-400 uppercase">
          {label}
        </span>
        <h2 className="text-3xl md:text-4xl font-serif tracking-tight leading-tight">
          {title}
        </h2>
      </div>
      <div className="text-lg md:text-xl text-gray-700 font-sans font-light tracking-wide leading-loose">
        {children}
      </div>
    </motion.section>
  );
}
