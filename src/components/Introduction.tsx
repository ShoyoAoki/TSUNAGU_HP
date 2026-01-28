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
              世界中には膨大な数の「意志」が存在しています。<br className="hidden md:block" />
              また同時に国境という壁に阻まれ、輝きを放てない意志が多くあります。<br className="hidden md:block" />
              私たちは、最新のテクノロジーを駆使し、世界に散らばる意志を最短距離でつなぎます。
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
              ビジョンの実現に向けて、時代に必要とされる最先端のテクノロジーにより、<br className="hidden md:block" />
              「誰もが意志のままに挑戦できる」ボーダレスな未来を推進していきます。
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
