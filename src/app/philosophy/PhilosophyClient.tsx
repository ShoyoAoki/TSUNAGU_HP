"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Inter, Noto_Serif_JP } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSerifJP = Noto_Serif_JP({ 
  subsets: ["latin"], 
  weight: ["400", "700"],
  variable: "--font-noto-serif-jp" 
});

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

export default function PhilosophyClient() {
  const [mounted, setMounted] = useState(false);
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

  if (!mounted) return null;

  return (
    <main ref={containerRef} className={`relative min-h-screen bg-white text-black selection:bg-gray-900 selection:text-white ${notoSerifJP.variable} ${inter.variable}`}>
      <GridBackground />
      <BackgroundText />

      {/* 背景の砂時計ビデオ - 回転は維持しつつ円形マスクで四角枠を隠す（モバイルでも丸く見える） */}
      <motion.div 
        style={{ 
          rotate: videoRotate, 
          opacity: videoOpacity,
          maskImage: 'radial-gradient(circle at center, black 49%, transparent 50%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 49%, transparent 50%)',
          maskSize: '72vmin 72vmin',
          WebkitMaskSize: '72vmin 72vmin',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
        }}
        className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden"
      >
        <video
          src="/videos/sandglass.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-auto h-[140vh] md:h-[120vh] object-contain mix-blend-multiply"
          style={{
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)'
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
              時を、命と捉える。
            </h1>
            
            <div className="pt-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1.5 }}
                className="flex flex-col items-center"
              >
                <span className="text-lg md:text-xl font-serif tracking-widest mb-4">代表取締役</span>
                <span className="text-xl md:text-2xl font-serif tracking-[0.2em] relative inline-block">
                  青木 翔陽
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
                「我々は短い寿命を授かったのではない。<br className="hidden md:block" />
                我々がそれを短くしているのだ」
              </p>
              <p className="text-sm text-gray-500 text-center font-serif">— セネカ『生の短さについて』</p>
            </div>

            <div className="space-y-8 text-lg md:text-xl leading-[2.2] text-gray-700 font-light tracking-wide">
              <p>
                時間は、命そのものです。<br />
                そして、あらゆる事業活動において、時間は取り戻すことのできない最大のコストです。
              </p>
              <p>
                セネカが二千年も前に説いたこの真理は、現代のビジネスにおいても何ら変わりません。私たちは、自分たちが持っている時間を浪費している。あるいは、非効率なシステムの犠牲になっています。
              </p>
              <p>
                Bridgがなぜ存在するのか。それは、テクノロジーの力で世界中の『意志』を最短距離でつなぎ、人類が本来持っているはずの時間を、より価値ある創造へと解放するためです。
              </p>
              <p>
                国境や物理的な距離は、もはや制約であってはなりません。私たちは、高潔な意志を持つ人々が、そのポテンシャルを最大化できる「最短の道」を実装していきます。
              </p>
            </div>
          </motion.div>
        </section>

        {/* 代表ポートレート（プレースホルダー） */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="relative aspect-[21/9] bg-gray-50 overflow-hidden group"
          >
            {/* モノクロームのポートレートを想定したグレー背景 */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 grayscale" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-mono tracking-[0.4em] text-gray-400 uppercase">Representative Portrait</span>
            </div>
            {/* 装飾的なグリッド */}
            <div className="absolute inset-0 opacity-[0.1] pointer-events-none"
                 style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
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
                  意志を繋ぎ、<br className="md:hidden" />国境を溶かす。
                </h2>
              </div>
              
              <div className="space-y-8 text-lg md:text-xl text-gray-700 font-light tracking-wide leading-[2.2]">
                <p>
                  私たちのミッションである「意志をつなぐ」こと。それは、単なるマッチングではありません。世界に散らばる情熱的な意志が、国境という旧来の壁に阻まれることなく、あるべき場所へと瞬時に届く。そのような「労働機会の国境をなくす」未来（ビジョン）を、私たちは本気で信じています。
                </p>
                <p>
                  その道のりは決して平坦ではありません。だからこそ、私たちは「時」を命と捉え、「今」この瞬間に没頭し、「創造」への熱狂を絶やさないことを誓います。
                </p>
                <p>
                  砂時計の砂が落ちるその一瞬、一瞬の積み重ねこそが、私たちの生きた証となります。有限な時間の中で、社会に永続的なインパクトを与える「無限」の価値を刻み込んでいく。
                </p>
                <p>
                  私たちは、この名と象徴（∞）を胸に、世界中のポテンシャルが正しく繋がる未来を、今、この瞬間に実装していきます。
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
              <span className="text-sm font-serif text-gray-600 mb-2">株式会社TSUNAGU 代表取締役</span>
              <span className="text-xl md:text-2xl font-serif tracking-tighter italic">青木 翔陽</span>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
