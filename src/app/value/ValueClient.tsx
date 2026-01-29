"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Inter, Noto_Sans_JP } from "next/font/google";
import Image from "next/image";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter"
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-noto-sans-jp"
});

// グリッド背景コンポーネント（TSUNAGUのアイデンティティ）
const GridBackground = () => (
  <div 
    className="fixed inset-0 pointer-events-none opacity-[0.05] z-0"
    style={{ 
      backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
      backgroundSize: '80px 80px', // 少し大きめのグリッドでゆとりを持たせる
    }}
  />
);

// 背景の巨大ロゴ（砂時計）
const BackgroundLogo = () => (
  <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
    <div className="relative w-[100%] h-[100%] opacity-[0.04] flex items-center justify-center">
      <Image
        src="/images/logo.png"
        alt=""
        width={1000}
        height={1000}
        className="object-contain grayscale"
        priority
      />
    </div>
  </div>
);

const values = [
  {
    symbol: "時",
    title: "時間を「命」と捉え、最短で最大の成果を出す",
    description: "時間は取り戻すことのできない最大のコストです。全ての業務において時間を命と同等の重さと捉え、密度濃く行動することで、限られた時間の中で最大の成果を生み出します。"
  },
  {
    symbol: "今",
    title: "過去や未来を憂わず、目の前の瞬間に没頭する",
    description: "未来を創るのは、今の積み重ねでしかありません。砂時計の砂が落ちるその一瞬、目の前の仕事に全力を注ぎ続けることで、確実な成長と未来への道が拓かれます。"
  },
  {
    symbol: "創造",
    title: "熱狂の先に、あるべき未来を実装する",
    description: "未来は待つものではなく、自らの手で創り出すものです。熱狂した「今」をつなぎ合わせ、その延長線上にある「あるべき世界」を具体的に形にすることで、社会に新たな可能性を提供します。"
  },
  {
    symbol: "無限",
    title: "有限な時間で、無限の価値を残す",
    description: "私たちの時間は有限ですが、生み出す価値に限界はありません。世代や国境を超えて語り継がれ、つながり続ける仕事を成し遂げることで、社会に永続的な「生きた証」を刻みます。"
  }
];

export default function ValueClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className={`relative min-h-screen bg-white text-black overflow-x-hidden ${inter.variable} ${notoSansJP.variable} font-sans selection:bg-gray-900 selection:text-white`}>
      <GridBackground />
      <BackgroundLogo />

      <div className="relative z-10">
        {/* 1. イントロダクション */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-5xl"
          >
            <span className="block text-sm font-mono tracking-[0.6em] text-gray-400 mb-16 uppercase">Value</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.2em] leading-[1.4] text-gray-950 mb-16">
              時を、命と捉える
            </h1>
            <div className="h-px w-24 bg-gray-200 mx-auto mb-16" />
            <p className="text-lg md:text-2xl text-gray-600 leading-[2.8] tracking-[0.1em] font-light max-w-3xl mx-auto">
              私たちは、限られた時間の中で最大の価値を生み出すため、<br className="hidden md:block" />
              4つの行動指針を掲げています。
            </p>
          </motion.div>
        </section>

        {/* 2. バリュー・グリッド */}
        <section className="container mx-auto px-6 py-12 max-w-6xl">
          <div className="space-y-48 md:space-y-72">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className={`flex flex-col ${index % 2 === 1 ? 'md:items-end' : 'md:items-start'}`}
              >
                <div className={`max-w-2xl w-full ${index % 2 === 1 ? 'md:text-right' : 'md:text-left'}`}>
                  {/* 一文字（あるいは象徴）の強調 */}
                  <div className={`mb-14 flex ${index % 2 === 1 ? 'md:justify-end' : 'md:justify-start'}`}>
                    <div className="relative inline-block">
                      <span className="text-8xl md:text-9xl font-light text-gray-950 tracking-tighter block mb-2">
                        {value.symbol}
                      </span>
                      <motion.div 
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className={`absolute bottom-0 h-0.5 bg-gray-950 w-full origin-${index % 2 === 1 ? 'right' : 'left'}`}
                      />
                    </div>
                  </div>

                  {/* タイトル */}
                  <h2 className="text-2xl md:text-4xl font-normal tracking-[0.05em] leading-[1.6] mb-12 text-gray-950">
                    <span className="inline-block border-l-4 border-gray-900 pl-6 md:pl-8 md:border-l-0 md:pl-0">
                      {value.title}
                    </span>
                  </h2>

                  {/* 説明文 */}
                  <p className="text-lg md:text-xl text-gray-500 leading-[2.6] tracking-[0.08em] font-light">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3. エピローグ / 余韻 */}
        <section className="h-[80vh] flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <div className="mb-12 opacity-20">
              <Image
                src="/images/logo.png"
                alt=""
                width={80}
                height={80}
                className="mx-auto grayscale"
              />
            </div>
            <p className="text-xs font-mono tracking-[0.5em] text-gray-400 uppercase">
              // BRIDGE BORDER, BUILD FUTURE.
            </p>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
