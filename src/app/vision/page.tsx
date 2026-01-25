"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
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

export default function VisionPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sections = [
    {
      text: "「労働機会の国境をなくす」を目指して",
      isTitle: true
    },
    {
      text: "世界には、労働力が豊富な国と、\n労働力が不足している国が存在しています。\nこの不均衡は、個人の可能性を阻害し、\n組織の成長機会を停滞させる要因となっています。",
      isTitle: false
    },
    {
      text: "私たちは、この国境という壁を\n最新のテクノロジーによって溶かします。",
      isTitle: false
    },
    {
      text: "ビジョンの実現に向けて、\n労働力が最適に配置される仕組みを構築し、\n「誰もが意志のままに挑戦できる」\nボーダレスな未来を推進していきます。",
      isTitle: false
    }
  ];

  if (!mounted) return null;

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
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.1em] leading-[1.6] text-gray-900">
              労働機会の国境をなくす。
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
