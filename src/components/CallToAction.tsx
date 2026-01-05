"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";

const PixelGrid = ({ className }: { className?: string }) => (
  <div className={`absolute inset-0 pointer-events-none opacity-20 ${className}`}
       style={{ 
         backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
         backgroundSize: '40px 40px' 
       }} 
  />
);

import { useState } from "react";
import ContactModal from "@/components/ContactModal";

export default function CallToAction() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section className="relative py-40 bg-black overflow-hidden text-white border-t border-gray-800">
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      {/* Background Elements */}
      <PixelGrid />
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-cyan-900/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-purple-900/10 blur-[100px] pointer-events-none" />

      {/* Decorative Pixels */}
      <div className="absolute top-20 left-[10%] w-4 h-4 bg-cyan-500 animate-pulse" />
      <div className="absolute bottom-20 right-[15%] w-6 h-6 border border-purple-500 opacity-50" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 mb-8 border border-gray-800 bg-gray-900/50 px-4 py-1.5 backdrop-blur-sm">
            <span className="w-2 h-2 bg-green-500 animate-pulse rounded-full" />
            <span className="text-xs font-mono font-bold text-gray-300 tracking-widest uppercase">
              Accepting New Partners
            </span>
          </div>

          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-10 leading-[0.9]">
            Ready to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
              Revolutionize?
            </span>
          </h2>

          <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto leading-relaxed">
            採用の常識を、テクノロジーで書き換える。<br />
            Bridgは、本気で組織を変えたい企業のためのプラットフォームです。
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => setIsContactOpen(true)}
              className="group relative w-full sm:w-auto px-10 py-5 bg-cyan-500 text-black font-bold text-lg overflow-hidden transition-transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <Mail className="w-5 h-5" />
                お問い合わせ
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>

            <button className="group w-full sm:w-auto px-10 py-5 bg-transparent border border-white text-white font-bold text-lg hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3">
              <Download className="w-5 h-5" />
              資料ダウンロード
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Decoration Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-yellow-500 opacity-50" />
    </section>
  );
}

