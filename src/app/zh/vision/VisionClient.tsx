"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400"]
});

// グリッド背景コンポーネント（トップページと共通のトーン）
const GridBackground = () => (
  <div
    className="fixed inset-0 pointer-events-none opacity-[0.05] z-0"
    style={{
      backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
      backgroundSize: '60px 60px',
    }}
  />
);

function ScrollSection({ text, isTitle }: { text: string; isTitle: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // SBGのような「沈黙」と「説得力」を演出するため、ゆっくりとフェードイン・アウトさせる
  const opacity = useTransform(
    scrollYProgress,
    [0.1, 0.35, 0.65, 0.9],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [0.1, 0.35],
    [40, 0]
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className="min-h-[80vh] flex items-center justify-center py-32"
    >
      <p
        className={`leading-[2.4] whitespace-pre-wrap text-center tracking-[0.15em] font-light ${
          isTitle
            ? "text-2xl md:text-3xl lg:text-4xl text-gray-950"
            : "text-lg md:text-xl lg:text-2xl text-gray-800"
        }`}
      >
        {text}
      </p>
    </motion.div>
  );
}

export default function VisionClient() {
  const sections = [
    {
      text: "以「消除劳动机会的国界」为目标",
      isTitle: true
    },
    {
      text: "世界上，既有劳动力充裕的国家，\n也有劳动力短缺的国家。\n这种失衡，正在阻碍个人的可能性，\n也成为组织成长停滞不前的原因。",
      isTitle: false
    },
    {
      text: "我们将以最前沿的科技，\n消融国境这道壁垒。",
      isTitle: false
    },
    {
      text: "为了实现这一愿景，\n我们将构建让劳动力实现最优配置的机制，\n推动一个「让每个人都能凭借意志放手一搏」的\n无国界未来。",
      isTitle: false
    }
  ];

  return (
    <main className={`relative min-h-screen bg-white text-black overflow-x-hidden ${inter.className}`}>
      <GridBackground />

      <div className="relative z-10">
        {/* ヒーローセクション */}
        <section className="h-screen flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <span className="block text-sm font-mono tracking-[0.4em] text-gray-400 mb-12">VISION</span>
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.05em] sm:tracking-[0.1em] leading-[1.6] text-gray-900">
              消除劳动机会的国界。
            </h1>
          </motion.div>
        </section>

        {/* ステートメントセクション */}
        <div className="container mx-auto px-6 max-w-4xl">
          {sections.map((section, index) => (
            <ScrollSection key={index} text={section.text} isTitle={section.isTitle} />
          ))}
        </div>

        {/* フッターへの余白（沈黙） */}
        <div className="h-[60vh]" />
      </div>
    </main>
  );
}
