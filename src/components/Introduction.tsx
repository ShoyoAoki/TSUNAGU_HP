"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.2
    }
  },
  viewport: { once: true }
};

export default function Introduction() {
  const containerRef = useRef(null);

  return (
    <section id="introduction" ref={containerRef} className="py-32 md:py-48 bg-white relative z-10 overflow-hidden">
      {/* 背景の薄いグリッドライン（継承） */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
           style={{
             backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
             backgroundSize: '40px 40px'
           }}
      />
      
      <div className="container mx-auto px-6 max-w-4xl relative">
        {/* 2. ミッションセクション */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="mb-40"
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="text-sm font-bold tracking-[0.4em] text-black/40 uppercase">MISSION</span>
          </motion.div>
          <motion.h3 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-black mb-10 leading-tight tracking-wider">
            テクノロジーで世界中の「意志」を、つなぐ。
          </motion.h3>
          <motion.div variants={fadeInUp} className="space-y-6">
            <p className="text-lg md:text-xl text-black leading-loose tracking-widest">
              日本では深刻な人材不足が進む一方、<br className="hidden md:block" />
              中国では年間1,200万人の大卒者が就職難に直面しています。<br className="hidden md:block" />
              私たちはAIとプラットフォームの力で、この構造的ミスマッチを解消し、<br className="hidden md:block" />
              国境を超えて「意志ある才能」を最短距離でつなぎます。
            </p>
          </motion.div>
        </motion.div>

        {/* 3. ビジョンセクション */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="mb-40"
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="text-sm font-bold tracking-[0.4em] text-black/40 uppercase">VISION</span>
          </motion.div>
          <motion.h3 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-black mb-10 leading-tight tracking-wider">
            労働機会の国境をなくす。
          </motion.h3>
          <motion.div variants={fadeInUp} className="space-y-6">
            <p className="text-lg md:text-xl text-black leading-loose tracking-widest">
              「採用前にまず試す」リモートトライアルモデルと、<br className="hidden md:block" />
              37のAIエージェントによる採用パイプラインの自動化。<br className="hidden md:block" />
              日本のIT人材不足79万人と、中国のSTEM人材500万人をつなぐ<br className="hidden md:block" />
              クロスボーダーHRプラットフォーム「Bridg」で、ボーダレスな未来を推進します。
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
