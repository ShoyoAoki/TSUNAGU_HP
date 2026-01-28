"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import ContactModal from "@/components/ContactModal";
import dynamic from "next/dynamic";

// 砂時計アニメーションコンポーネントを動的インポート（SSR無効化）
const SandGlassAnimation = dynamic(() => import("@/components/SandGlassAnimation"), {
  ssr: false,
  loading: () => <div className="w-full h-full min-h-screen flex items-center justify-center bg-white" />
});

// シンプルなグリッドパターン背景
const GridBackground = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div 
      className="absolute inset-0 pointer-events-none opacity-[0.08]"
      style={{ 
        backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }}
    />
  );
};

// タイピングアニメーションコンポーネント
const TypingHeadline = ({ 
  active, 
  onComplete 
}: { 
  active: boolean;
  onComplete: () => void;
}) => {
  const [displayText, setDisplayText] = useState<string[]>(["", ""]);
  const [messageIndex, setMessageIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'waiting' | 'deleting'>('typing');
  const [activeLine, setActiveLine] = useState(0);
  const [isFirstCycleComplete, setIsFirstCycleComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const messages = [
    ["テクノロジーで世界中の", "『意志』を、つなぐ。"],
    ["日本企業と中国の人材をつなぐ、", "採用支援サービス。"]
  ];

  const typingSpeed = 120;
  const deletingSpeed = 40;
  const waitDuration = 3000;

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (!active) return;

    let timeout: NodeJS.Timeout;
    const currentLines = messages[messageIndex];

    if (phase === 'typing') {
      const targetText = currentLines[activeLine];
      const currentText = displayText[activeLine];

      if (currentText.length < targetText.length) {
        timeout = setTimeout(() => {
          setDisplayText(prev => {
            const next = [...prev];
            next[activeLine] = targetText.slice(0, currentText.length + 1);
            return next;
          });
        }, typingSpeed);
      } else if (activeLine < currentLines.length - 1) {
        // 次の行へ
        timeout = setTimeout(() => {
          setActiveLine(prev => prev + 1);
        }, typingSpeed);
      } else {
        // 現在のメッセージのタイピング完了
        setPhase('waiting');
        if (!isFirstCycleComplete) {
          onComplete();
          setIsFirstCycleComplete(true);
        }
      }
    } else if (phase === 'waiting') {
      timeout = setTimeout(() => {
        setPhase('deleting');
      }, waitDuration);
    } else if (phase === 'deleting') {
      const currentText = displayText[activeLine];

      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(prev => {
            const next = [...prev];
            next[activeLine] = currentText.slice(0, -1);
            return next;
          });
        }, deletingSpeed);
      } else if (activeLine > 0) {
        // 前の行の消去へ
        setActiveLine(prev => prev - 1);
      } else {
        // すべて消去完了
        setPhase('typing');
        setMessageIndex(prev => (prev + 1) % messages.length);
        setActiveLine(0);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, phase, activeLine, messageIndex, active, isFirstCycleComplete, onComplete]);

  return (
    <div className="min-h-[140px] md:min-h-[180px] lg:min-h-[220px] flex flex-col justify-center mb-10 overflow-visible">
      <h1 className="text-[22px] sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-[1.5] font-sans">
        <div className="relative whitespace-nowrap overflow-visible">
          {displayText[0]}
          {(phase === 'typing' || phase === 'deleting') && activeLine === 0 && (
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100 ml-1 inline-block bg-gray-900 w-[2px] h-[1em] align-middle`} />
          )}
        </div>
        <div className="relative mt-2 whitespace-nowrap overflow-visible">
          {displayText[1]}
          {((phase === 'typing' || phase === 'deleting') && activeLine === 1) || phase === 'waiting' ? (
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100 ml-1 inline-block bg-gray-900 w-[2px] h-[1em] align-middle`} />
          ) : null}
        </div>
      </h1>
    </div>
  );
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleTransitionStart = () => {
    setShowContent(true);
  };

  const handleTypingComplete = () => {
    setTimeout(() => {
      setIsTypingComplete(true);
    }, 1000); // 完了後少し待ってから他を表示
  };

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // マウント前は何も表示しないか、不一致を避けるための最小限の構成にする
  if (!isMounted) {
    return <section className="relative w-full min-h-screen bg-white pt-16 md:pt-20" />;
  }

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.5
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section ref={ref} className="relative w-full min-h-screen flex items-center overflow-hidden bg-white selection:bg-gray-200 selection:text-black pt-16 md:pt-20">
      {isMounted && <SandGlassAnimation onTransitionStart={handleTransitionStart} />}
      
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      
      {/* 背景グリッドパターン */}
      <GridBackground />

      <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
          
          {/* 左側コンテンツ - テキストとボタン */}
          <motion.div 
            className="max-w-none"
            initial="hidden"
            animate={showContent ? "visible" : "hidden"}
            variants={contentVariants}
          >
            <div className="mb-4">
              <motion.span 
                className="inline-block py-1 px-3 bg-gray-100 text-gray-800 text-xs font-bold tracking-widest uppercase rounded-sm mb-6"
                variants={itemVariants}
              >
                Cross-Border Recruitment Platform
              </motion.span>
            </div>

            {/* タイピングアニメーションヘッドライン */}
            <TypingHeadline 
              active={showContent} 
              onComplete={handleTypingComplete} 
            />

            {/* サブテキストとボタン - タイピング完了後にフェードイン */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isTypingComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              {/* サブテキスト */}
              <div className="mb-10">
                <p className="text-base md:text-lg text-gray-600 mb-4 leading-[1.8] font-normal">
                  日本企業と中国のポテンシャルを最短距離でつなぐ。<br className="hidden md:inline" />
                  特定技能・高度人材の導入から定着までをトータル支援。
                </p>
                
                <p className="text-xs font-mono text-gray-400 tracking-wide">
                  // BRIDGE BORDER, BUILD FUTURE.
                </p>
              </div>

              {/* CTAボタン */}
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                {/* お問い合わせボタン - 黒背景 */}
                <motion.button 
                  onClick={() => setIsContactOpen(true)}
                  className="group relative px-8 py-4 bg-black text-white font-semibold text-sm md:text-base overflow-hidden transition-all duration-200 rounded-sm"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    お問い合わせ
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  </span>
                  
                  {/* ホバー時の背景エフェクト */}
                  <motion.div
                    className="absolute inset-0 bg-gray-800"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
                
                {/* 資料ダウンロードボタン - 白背景・枠線あり */}
                <motion.button 
                  className="px-8 py-4 bg-white text-black font-semibold text-sm md:text-base border-2 border-gray-900 relative transition-all duration-200 rounded-sm"
                  whileHover={{ 
                    scale: 1.02,
                    backgroundColor: "#f9fafb",
                    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">資料ダウンロード</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* 右側コンテンツ - 空間確保用 */}
          <div className="hidden lg:block min-h-[700px]" />

        </div>
      </div>

      {/* モバイル表示用の砂時計アニメーション（必要な場合は別途調整） */}
      <div className="lg:hidden absolute inset-0 pointer-events-none opacity-10 overflow-hidden">
      </div>
    </section>
  );
}
