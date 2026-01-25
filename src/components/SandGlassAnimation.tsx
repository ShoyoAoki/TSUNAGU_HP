"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Phase = 'spark' | 'convergence' | 'formation' | 'transition' | 'completed';

interface SandGlassAnimationProps {
  onTransitionStart?: () => void;
}

export default function SandGlassAnimation({ onTransitionStart }: SandGlassAnimationProps) {
  // 最初から transition フェーズで開始（イントロアニメを削除）
  const [phase, setPhase] = useState<Phase>('transition');

  useEffect(() => {
    // 即座にコンテンツ表示をトリガー
    onTransitionStart?.();
    
    // 一定時間後に完了状態（クリックイベント無効化など）へ
    const timer = setTimeout(() => setPhase('completed'), 2000);
    return () => clearTimeout(timer);
  }, [onTransitionStart]);

  const handleSkip = () => {
    setPhase('completed');
    onTransitionStart?.();
  };

  return (
    <div className={`absolute inset-0 transition-colors duration-1000 ${phase === 'completed' ? 'pointer-events-none' : ''} z-0`}>
      {/* 背景の白膜 - 瞬時に消えるように調整 */}
      <AnimatePresence>
        {phase !== 'completed' && phase !== 'transition' && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-white z-[100]"
          />
        )}
      </AnimatePresence>

      {/* 動画とロゴのコンテナ */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <motion.div
          className="relative flex items-center justify-center w-full h-full"
          initial={false}
          animate={{
            // 右側への配置を最初から行う
            x: typeof window !== 'undefined' && window.innerWidth < 1024 ? "0%" : "30%",
            scale: 0.85,
            opacity: 1
          }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* 無限（砂時計）動画部分 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative flex items-center justify-center"
          >
            {/* 動画要素 - サイズをさらに拡大し、上下の切れを隠す */}
            <video
              src="/videos/sandglass.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-auto h-[75vh] md:h-[90vh] lg:h-[115vh] max-w-none object-contain mix-blend-multiply opacity-95"
              style={{
                maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)'
              }}
            />
          </motion.div>

          {/* TSUNAGU ロゴテキスト - 2行に分割してサイズを調整 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="select-none pointer-events-none absolute left-[65%] md:left-[72%] lg:left-[82%] flex flex-col gap-2"
          >
            <span className="text-xl md:text-2xl lg:text-3xl font-bold tracking-[0.5em] text-black font-mono leading-none">
              TSUNA
            </span>
            <span className="text-xl md:text-2xl lg:text-3xl font-bold tracking-[0.5em] text-black font-mono leading-none">
              GU
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Skip Button - 常に最前面 */}
      <AnimatePresence>
        {phase !== 'completed' && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleSkip}
            className="absolute top-8 right-8 z-[110] px-6 py-2 border border-black/20 rounded-full text-xs font-mono hover:bg-black hover:text-white transition-colors bg-white/50 backdrop-blur-sm"
          >
            SKIP
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
