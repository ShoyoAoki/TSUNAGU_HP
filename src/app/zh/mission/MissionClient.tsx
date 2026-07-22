"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// グリッド背景コンポーネント
const GridBackground = () => (
  <div
    className="fixed inset-0 pointer-events-none opacity-[0.05] z-0"
    style={{
      backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
      backgroundSize: '60px 60px',
    }}
  />
);

// 背景の追従ロゴ（背骨）※装飾専用の演出のためマウント後にのみ描画する
const BackgroundLogo = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // スクロールに合わせて不透明度と位置を微調整
  const opacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 0.07, 0.07, 0]);
  const scale = useTransform(smoothProgress, [0, 1], [0.8, 0.9]);

  if (!mounted) return null;

  return (
    <motion.div
      style={{ opacity, scale }}
      className="fixed inset-0 flex items-center justify-center pointer-events-none z-0"
    >
      <video
        src="/videos/sandglass.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-auto h-[100vh] object-contain mix-blend-multiply opacity-50"
        style={{
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)'
        }}
      />
    </motion.div>
  );
};

export default function MissionClient() {
  const paragraphs = [
    {
      text: "世界上存在着无数的『意志』。\n然而与此同时，许多意志被国境这道壁垒所阻挡，无法绽放光芒。",
      weight: 300
    },
    {
      text: "我们运用最前沿的科技，\n以最短的距离，连接散落在世界各地的意志。",
      weight: 300
    },
    {
      text: "意志一旦相连，未来便会改变。",
      weight: 300
    },
    {
      text: "OwlMatch释放世界各地的潜能，\n将本应到来的未来，在此时此刻付诸实现。",
      weight: 300
    }
  ];

  return (
    <main className={`relative min-h-screen bg-white text-black overflow-x-hidden ${inter.className}`}>
      <GridBackground />
      <BackgroundLogo />

      <div className="relative z-10">
        {/* ヒーローセクション */}
        <section className="h-screen flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <span className="block text-sm font-mono tracking-[0.4em] text-gray-400 mb-12">MISSION</span>
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.05em] sm:tracking-[0.1em] leading-[1.6] text-gray-900">
              以科技，<br />
              连接世界各地的<br />
              『意志』。
            </h1>
          </motion.div>
        </section>

        {/* パラグラフセクション */}
        <section className="container mx-auto px-6 max-w-5xl">
          {paragraphs.map((item, index) => (
            <ScrollParagraph key={index} text={item.text} weight={item.weight} />
          ))}
        </section>

        {/* フッターへの余白 */}
        <div className="h-[50vh]" />
      </div>
    </main>
  );
}

function ScrollParagraph({ text, weight }: { text: string; weight: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // 中央付近で最も濃くなるように
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.4],
    [100, 0]
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className="min-h-[60vh] flex items-center justify-center py-20"
    >
      <p
        className="text-xl md:text-3xl lg:text-4xl leading-[2] whitespace-pre-wrap text-center tracking-wider"
        style={{ fontWeight: weight }}
      >
        {text}
      </p>
    </motion.div>
  );
}
