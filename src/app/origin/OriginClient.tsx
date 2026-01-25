"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
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
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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
                社名とロゴの由来
              </h1>
            </motion.div>
          </motion.div>
        </section>

        {/* コンテンツセクション */}
        <div className="max-w-4xl mx-auto px-6 pb-40 space-y-40">
          
          {/* 1. 社名の由来 */}
          <Section 
            title="世界中の「意志」を、つなぐ。"
            label="COMPANY NAME"
          >
            <p className="leading-relaxed">
              「株式会社TSUNAGU」という社名には、テクノロジーによって国境や時間の壁を溶かし、世界に散らばる高潔な意志を最短距離で結びつけたいという強い決意を込めています。
            </p>
          </Section>

          {/* 2. ロゴの由来 */}
          <Section 
            title="有限な時間の中で、無限の価値を。"
            label="LOGO DESIGN"
          >
            <div className="space-y-8">
              <p className="leading-relaxed">
                私たちのロゴは、砂時計と「無限（∞）」を組み合わせた造形をしています。
              </p>
              
              <div className="py-12 border-y border-black/5">
                <p className="text-xl md:text-2xl font-serif italic text-gray-800 leading-relaxed text-center mb-6">
                  「我々は短い寿命を授かったのではない。我々がそれを短くしているのだ」
                </p>
                <p className="text-sm text-gray-500 text-right font-serif">— セネカ『人生の短さについて』</p>
              </div>

              <p className="leading-relaxed">
                時間は命そのものであり、取り戻すことのできない最大のコストです。<br />
                砂時計の砂が落ちるその一瞬（今）に没頭し、情熱を注ぎ続けること。<br />
                その積み重ねが「有限な時間」を「無限の価値」へと昇華させると、私たちは信じています。
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
              私たちは、この名と象徴を胸に、<br />
              世界中のポテンシャルが正しく繋がる未来を実装していきます。
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
