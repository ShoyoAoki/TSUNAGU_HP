"use client";

import { motion } from "framer-motion";
import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter"
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
    symbol: "时",
    title: "把时间当作「生命」，以最短时间创造最大成果",
    description: "时间是无法挽回的最大成本。在一切工作中，我们都将时间视为与生命同等的分量，以高密度的行动，在有限的时间里创造最大的成果。"
  },
  {
    symbol: "今",
    title: "不为过去与未来所忧，全情投入眼前的这一刻",
    description: "创造未来的，唯有当下的不断积累。在沙漏中沙粒落下的每一个瞬间，全力投入眼前的工作，才能开拓出通往确定成长与未来的道路。"
  },
  {
    symbol: "创造",
    title: "在热忱的尽头，实现本应到来的未来",
    description: "未来不是等待而来，而是靠自己的双手创造出来的。将充满热忱的「当下」不断连接，把延伸出的「本应存在的世界」具体地实现出来，为社会提供新的可能性。"
  },
  {
    symbol: "无限",
    title: "以有限的时间，留下无限的价值",
    description: "我们的时间有限，但创造的价值没有极限。通过完成跨越世代与国界、被不断传颂与延续的事业，为社会镌刻下永恒的「生存证明」。"
  }
];

export default function ValueClient() {
  return (
    <main className={`relative min-h-screen bg-white text-black overflow-x-hidden ${inter.variable} font-sans selection:bg-gray-900 selection:text-white`}>
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
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.1em] sm:tracking-[0.2em] leading-[1.4] text-gray-950 mb-16">
              把时间，当作生命
            </h1>
            <div className="h-px w-24 bg-gray-200 mx-auto mb-16" />
            <p className="text-lg md:text-2xl text-gray-600 leading-[2.8] tracking-[0.1em] font-light max-w-3xl mx-auto">
              为了在有限的时间中创造最大的价值，<br className="hidden md:block" />
              我们确立了4项行动准则。
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
