"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// グリッド背景
const GridBackground = () => (
  <div
    className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
    style={{
      backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
      backgroundSize: '40px 40px',
    }}
  />
);

// 背景に流れるセネカの言葉（装飾的要素）
const BackgroundText = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[10%] left-[-2%] text-[12vw] font-serif italic text-black/[0.01] whitespace-nowrap leading-none uppercase tracking-tighter"
      >
        Non exiguum temporis habemus, sed multum perdidimus.
      </motion.div>
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-[10%] right-[-5%] text-[12vw] font-serif italic text-black/[0.01] whitespace-nowrap leading-none uppercase tracking-tighter"
      >
        Vita, si scias uti, longa est.
      </motion.div>
    </div>
  );
};

const MOBILE_BREAKPOINT = 768;

export default function PhilosophyClient() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 砂時計の回転や位置の制御
  const videoRotate = useTransform(smoothProgress, [0, 1], [0, 360]);
  const videoOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.8, 0.1, 0.1, 0.8]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    setIsMobile(mq.matches);
    const handler = () => setIsMobile(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [mounted]);

  // PCはマスクなし（従来どおり）、モバイルのみ円形マスクで四角枠を隠す
  const wrapperStyle = {
    rotate: videoRotate,
    opacity: videoOpacity,
    ...(isMobile && {
      maskImage: 'radial-gradient(circle at center, black 49%, transparent 50%)',
      WebkitMaskImage: 'radial-gradient(circle at center, black 49%, transparent 50%)',
      maskSize: '72vmin 72vmin',
      WebkitMaskSize: '72vmin 72vmin',
      maskPosition: 'center',
      WebkitMaskPosition: 'center',
      maskRepeat: 'no-repeat',
      WebkitMaskRepeat: 'no-repeat',
    }),
  };

  return (
    <main ref={containerRef} className={`relative min-h-screen bg-white text-black selection:bg-gray-900 selection:text-white font-serif`}>
      <GridBackground />
      <BackgroundText />

      {/* 背景の砂時計ビデオ - PCは変更なし、モバイルのみ円形マスク */}
      <motion.div
        style={wrapperStyle}
        className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden"
      >
        <video
          src="/videos/sandglass.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-auto h-[140vh] md:h-[120vh] object-contain mix-blend-multiply opacity-95"
          style={{
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)'
          }}
        />
      </motion.div>

      <div className="relative z-10">
        {/* 1. ヒーローセクション */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center space-y-12"
          >
            <span className="block text-sm font-mono tracking-[0.4em] text-gray-400 uppercase">Message</span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif tracking-[0.1em] leading-tight whitespace-nowrap">
              把时间，当作生命。
            </h1>

            <div className="pt-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1.5 }}
                className="flex flex-col items-center"
              >
                <span className="text-lg md:text-xl font-serif tracking-widest mb-4">代表取缔役CEO</span>
                <span className="text-xl md:text-2xl font-serif tracking-[0.2em] relative inline-block">
                  青木 翔阳
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.8, duration: 1.2, ease: "easeInOut" }}
                    className="absolute -bottom-4 left-0 w-full h-[1px] bg-black origin-left"
                  />
                </span>
              </motion.div>
            </div>
          </motion.div>

        </section>

        {/* 2. リードメッセージセクション */}
        <section className="max-w-4xl mx-auto px-6 py-40">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5 }}
            className="space-y-24"
          >
            <div className="space-y-12">
              <p className="text-2xl md:text-3xl font-serif leading-relaxed text-gray-800 italic text-center">
                「我们并非被赋予了短暂的生命。<br className="hidden md:block" />
                而是我们自己，把它变短了。」
              </p>
              <p className="text-sm text-gray-500 text-center font-serif">— 塞涅卡《论人生短暂》</p>
            </div>

            <div className="space-y-8 text-lg md:text-xl leading-[2.2] text-gray-700 font-light tracking-wide">
              <p>
                时间，就是生命本身。<br />
                在一切事业活动中，时间都是无法挽回的最大成本。
              </p>
              <p>
                塞涅卡在两千年前所阐述的这一真理，放在今天的商业世界里依然成立。我们常常在无意间浪费着自己拥有的时间，又或者，成为低效系统的牺牲品。
              </p>
              <p>
                OwlMatch为何而存在？正是为了以科技的力量，用最短的距离连接世界各地的『意志』，将人类本应拥有的时间，释放到更有价值的创造之中。
              </p>
              <p>
                国境与物理距离，不应再成为限制。我们将持续构建那条「最短的道路」，让怀抱高洁意志的人们，最大限度地释放自身的潜力。
              </p>
            </div>
          </motion.div>
        </section>

        {/* 代表ポートレート */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <div className="relative w-full max-w-md aspect-square overflow-hidden bg-gray-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/ceo-portrait.jpg"
                alt="株式会社TSUNAGU 代表取缔役CEO 青木翔阳"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* 薄い枠線 */}
              <div className="absolute inset-0 ring-1 ring-black/5 pointer-events-none" />
            </div>

            <div className="mt-10 flex flex-col items-center space-y-2">
              <span className="text-xs font-mono tracking-[0.4em] text-gray-400 uppercase">Representative</span>
              <span className="text-sm md:text-base font-serif text-gray-600">株式会社TSUNAGU 代表取缔役CEO</span>
              <span className="text-xl md:text-2xl font-serif tracking-[0.2em]">青木 翔阳</span>
            </div>
          </motion.div>
        </section>

        {/* 3. MVV統合ストーリーセクション */}
        <section className="max-w-4xl mx-auto px-6 py-40">
          <div className="space-y-40">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2 }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <span className="block text-xs font-mono tracking-[0.3em] text-gray-400 uppercase">Our Story</span>
                <h2 className="text-3xl md:text-5xl font-serif tracking-tight leading-tight">
                  连接意志，<br className="md:hidden" />消融国界。
                </h2>
              </div>

              <div className="space-y-8 text-lg md:text-xl text-gray-700 font-light tracking-wide leading-[2.2]">
                <p>
                  我们的使命——「连接意志」，绝非单纯的匹配。世界各地饱含热忱的意志，不再被国境这道旧有的壁垒所阻挡，而是能瞬时抵达它本应到达的地方。我们坚信这样一个「消除劳动机会的国界」的未来（愿景），并为之全力以赴。
                </p>
                <p>
                  这条路绝不平坦。正因如此，我们发誓要把「时」当作生命，全情投入「今」这一瞬间，并让对「创造」的热忱永不熄灭。
                </p>
                <p>
                  沙漏中沙粒落下的每一个瞬间，其累积正是我们生存过的证明。在有限的时间里，铭刻下能给社会带来持久影响的「无限」价值。
                </p>
                <p>
                  我们将怀揣这个名字与象征（∞），把世界各地正确连接的潜力，在此时此刻付诸实现。
                </p>
              </div>

              <div className="pt-20 text-center">
                <div className="inline-block space-y-4">
                  <p className="text-sm font-mono tracking-[0.4em] text-gray-400 uppercase italic">Bridge border, Build future.</p>
                  <div className="h-[1px] w-full bg-gray-100" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 代表署名（フッター前） */}
        <section className="max-w-4xl mx-auto px-6 pb-60 text-right">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.5 }}
            className="space-y-4"
          >
            <div className="inline-flex flex-col items-end">
              <span className="text-sm font-serif text-gray-600 mb-2">株式会社TSUNAGU 代表取缔役CEO</span>
              <span className="text-xl md:text-2xl font-serif tracking-tighter italic">青木 翔阳</span>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
