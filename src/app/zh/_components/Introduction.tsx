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
        {/* 2. 使命 */}
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
            以科技连接世界各地的「意志」。
          </motion.h3>
          <motion.div variants={fadeInUp} className="space-y-6">
            <p className="text-lg md:text-xl text-black leading-loose tracking-widest">
              日本正面临严峻的人才短缺，<br className="hidden md:block" />
              而中国每年有1,200万大学毕业生面临就业难题。<br className="hidden md:block" />
              无论是IT工程师，还是商务双语人才——<br className="hidden md:block" />
              我们借助AI与平台的力量，化解这一结构性错配，<br className="hidden md:block" />
              跨越国境，以最短距离连接「怀抱意志的人才」。
            </p>
          </motion.div>
        </motion.div>

        {/* 3. 愿景 */}
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
            消除劳动机会的国界。
          </motion.h3>
          <motion.div variants={fadeInUp} className="space-y-6">
            <p className="text-lg md:text-xl text-black leading-loose tracking-widest">
              IT工程师的「先试用」远程试用模式。<br className="hidden md:block" />
              双语人才的成功报酬型精准匹配。<br className="hidden md:block" />
              80个以上的AI智能体，让两大事业的招聘流程全面自动化。<br className="hidden md:block" />
              以跨境人力资源平台「OwlMatch」，推进无国界的未来。
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
