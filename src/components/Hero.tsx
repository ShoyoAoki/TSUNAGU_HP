"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

import ContactModal from "@/components/ContactModal";
import { useState } from "react";

// Square Pixel Grid Component
const PixelGrid = ({ className }: { className?: string }) => (
  <div className={`absolute inset-0 pointer-events-none opacity-[0.05] ${className}`}
       style={{ 
         backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
         backgroundSize: '40px 40px' 
       }} 
  />
);

// Tetris-like Block Cluster
const PixelCluster = ({ className }: { className?: string }) => (
  <div className={`absolute flex flex-wrap w-16 h-16 ${className}`}>
    <div className="w-8 h-8 bg-cyan-500/20" />
    <div className="w-8 h-8 bg-transparent" />
    <div className="w-8 h-8 bg-cyan-500/40" />
    <div className="w-8 h-8 bg-cyan-500/10" />
  </div>
);

export default function Hero() {
  const ref = useRef(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative w-full min-h-screen md:h-[120vh] flex items-center justify-center overflow-hidden bg-white selection:bg-cyan-200 selection:text-black">
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      {/* Background Grid */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0 pointer-events-none">
        <PixelGrid />
        
        {/* Sharp Rectangular Accents - No Rounded Shapes */}
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[600px] border-r border-gray-100 bg-gray-50/30 transform" />
        <div className="absolute bottom-0 right-[10%] w-[300px] h-[400px] bg-gray-50 border-l border-t border-gray-200" />

        {/* Square Accents (Replacing Dots) */}
        <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-cyan-500 opacity-60" />
        <div className="absolute top-1/4 right-1/3 w-8 h-8 border border-gray-300 opacity-40" />
        <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-purple-500 opacity-60" />
        
        {/* Cluster Accents */}
        <PixelCluster className="top-[15%] right-[15%]" />
        <PixelCluster className="bottom-[20%] left-[10%] opacity-50 rotate-90" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-20 min-h-screen md:h-screen flex flex-col justify-center py-20 md:py-0">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 mb-10 hover:border-cyan-500 transition-colors cursor-default">
               <div className="flex gap-1">
                 <div className="w-2 h-2 bg-cyan-500" />
                 <div className="w-2 h-2 bg-purple-500" />
                 <div className="w-2 h-2 bg-yellow-500" />
               </div>
              <span className="text-sm font-bold text-gray-900 tracking-widest uppercase font-mono">Next Gen HR Platform</span>
            </div>

            <h1 className="text-4xl md:text-8xl font-bold tracking-tighter text-gray-900 mb-6 leading-[1.1]">
              中国のハイクラス人材を、<br className="hidden md:block" />
              <span className="relative inline-block">
                <span className="relative z-10">ダイレクト採用。</span>
                <span className="absolute bottom-2 left-0 w-full h-4 bg-cyan-200/50 -z-0" />
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-500 mb-12 font-medium leading-relaxed max-w-3xl mx-auto">
              <span className="block text-gray-400 font-mono text-sm tracking-widest uppercase mb-4">Bridging Talent Across Asia</span>
              日本企業と中国のハイクラス人材をつなぐ、<br />
              完全成果報酬型・クロスボーダー採用プラットフォーム「Bridg」
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-0 justify-center items-center"
            >
              <button 
                onClick={() => setIsContactOpen(true)}
                className="group relative px-12 py-6 bg-black text-white font-bold text-lg overflow-hidden transition-all hover:bg-cyan-600"
              >
                <span className="relative z-10 flex items-center gap-4">
                  お問い合わせ
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                </span>
                {/* Pixel Hover Effect */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              
              <button className="px-12 py-6 bg-white text-black font-bold text-lg border-y border-r border-gray-900 hover:bg-gray-50 transition-all">
                資料ダウンロード
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
    </section>
  );
}
