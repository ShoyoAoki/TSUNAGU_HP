"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import ContactModal from "@/components/ContactModal";

const GridBackground = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div 
      className="absolute inset-0 pointer-events-none opacity-[0.05]"
      style={{ 
        backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }}
    />
  );
};

export default function CallToAction() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section className="relative py-32 md:py-48 bg-white overflow-hidden text-gray-900 border-t border-gray-100">
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      
      {/* Background Elements */}
      <GridBackground />
      
      <div className="container mx-auto px-6 relative z-10 max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight mb-10 leading-[1.2] text-gray-900">
            採用の未来を、<br />
            共に創りませんか？
          </h2>

          <p className="text-lg md:text-xl text-gray-600 mb-16 max-w-2xl mx-auto leading-relaxed">
            採用の常識を、テクノロジーで書き換える。<br />
            Bridgは、本気で組織を変えたい企業のためのプラットフォームです。
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* お問い合わせボタン - 黒背景 */}
            <motion.button 
              onClick={() => setIsContactOpen(true)}
              className="group relative w-full sm:w-auto px-10 py-5 bg-black text-white font-semibold text-base md:text-lg overflow-hidden transition-all duration-200 rounded-sm"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <Mail className="w-5 h-5" />
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
              className="group w-full sm:w-auto px-10 py-5 bg-white text-black font-semibold text-base md:text-lg border-2 border-gray-900 relative transition-all duration-200 rounded-sm"
              whileHover={{ 
                scale: 1.02,
                backgroundColor: "#f9fafb",
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <Download className="w-5 h-5" />
                資料ダウンロード
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

