"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

// Pixel Grid Background Component
const PixelGrid = ({ className }: { className?: string }) => (
  <div className={`absolute inset-0 pointer-events-none opacity-[0.03] ${className}`}
       style={{ 
         backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
         backgroundSize: '32px 32px' 
       }} 
  />
);

// RPG Status Bar Component
const StatusBar = ({ value, color, delay }: { value: number; color: string; delay: number }) => {
  return (
    <div className="relative w-full h-2 bg-gray-200 overflow-hidden" style={{ imageRendering: 'pixelated' }}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay, ease: "easeOut" }}
        className={`h-full ${color}`}
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)`
        }}
      />
      {/* Pixel pattern overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1' height='1' fill='%23000'/%3E%3C/svg%3E")`
      }} />
    </div>
  );
};

// Pixel Icon Component (RPG-style) - Fixed pattern for consistency
const PixelIcon = ({ color, className, pattern }: { color: string; className?: string; pattern?: number[] }) => {
  // Default pattern: diamond shape
  const defaultPattern = [0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0];
  const pixelPattern = pattern || defaultPattern;
  
  return (
    <div className={`relative ${className}`}>
      <div className="grid grid-cols-4 gap-0.5 w-12 h-12">
        {pixelPattern.map((opacity, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: opacity === 1 ? 0.9 : 0.2 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.02 }}
            className={`${color} ${opacity === 1 ? 'opacity-90' : 'opacity-20'}`}
          />
        ))}
      </div>
    </div>
  );
};

const Card = ({ title, desc, accent, bg, delay, color, level, statValue }: any) => {
  const colorMap: { [key: string]: string } = {
    'border-cyan-500': 'bg-cyan-500',
    'border-purple-500': 'bg-purple-500',
    'border-yellow-500': 'bg-yellow-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
      className={`p-8 bg-white border-2 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 ${bg} group relative overflow-hidden h-full flex flex-col`}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Pixel Grid Background */}
      <PixelGrid />
      
      {/* RPG-style Corner Decorations */}
      <div className="absolute top-2 left-2 w-3 h-3 border-2 border-gray-900" />
      <div className="absolute top-2 right-2 w-3 h-3 border-2 border-gray-900" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-2 border-gray-900" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-2 border-gray-900" />
      
      {/* Top Accent Bar - RPG style */}
      <div className={`absolute top-0 left-0 w-full h-2 ${colorMap[accent] || 'bg-cyan-500'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} 
           style={{
             backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(255,255,255,0.2) 4px, rgba(255,255,255,0.2) 8px)`
           }} />
      
      {/* Level Badge - RPG style */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <PixelIcon 
            color={colorMap[accent] || 'bg-cyan-500'} 
            pattern={title === 'MISSION' ? [0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0] : 
                     title === 'VISION' ? [1,0,1,0,0,1,0,1,1,0,1,0,1,0,1,0] :
                     [1,1,1,1,1,0,0,1,1,0,0,1,1,1,1,1]}
          />
          <div>
            <h3 className="text-xs font-bold tracking-widest text-gray-400 mb-1 group-hover:text-gray-900 transition-colors font-mono uppercase">
              {title}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-600 font-mono">LV.</span>
              <span className="text-lg font-bold text-gray-900 font-mono">{level}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold text-gray-500 font-mono uppercase">Power</span>
          <span className="text-xs font-bold text-gray-900 font-mono">{statValue}%</span>
        </div>
        <StatusBar value={statValue} color={colorMap[accent] || 'bg-cyan-500'} delay={delay + 0.2} />
      </div>
      
      {/* Description */}
      <p className="text-gray-900 font-bold leading-relaxed text-lg mt-auto relative z-10">
        {desc}
      </p>
      
      {/* Bottom Pixel Pattern */}
      <div className="absolute bottom-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
           style={{
             backgroundImage: `repeating-linear-gradient(90deg, ${colorMap[accent] || 'bg-cyan-500'}, ${colorMap[accent] || 'bg-cyan-500'} 2px, transparent 2px, transparent 4px)`
           }} />
    </motion.div>
  )
}

export default function Introduction() {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="py-24 md:py-40 bg-white relative z-10 overflow-hidden">
      {/* Pixel Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
           style={{
             backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
             backgroundSize: '40px 40px'
           }}
      />
      
      {/* Decorative Pixel Blocks */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-cyan-500/20 opacity-60" />
      <div className="absolute top-40 right-20 w-6 h-6 border-2 border-purple-500/30 opacity-40" />
      <div className="absolute bottom-40 left-20 w-4 h-4 bg-yellow-500/20 opacity-60" />
      
      <div className="container mx-auto px-6 max-w-7xl relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32 text-center relative"
        >
          {/* RPG-style Section Label */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-cyan-500" />
              <div className="w-2 h-2 bg-purple-500" />
              <div className="w-2 h-2 bg-yellow-500" />
            </div>
            <span className="text-cyan-600 font-bold tracking-[0.3em] text-sm uppercase font-mono">
              Mission & Vision
            </span>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-yellow-500" />
              <div className="w-2 h-2 bg-purple-500" />
              <div className="w-2 h-2 bg-cyan-500" />
            </div>
          </div>

          {/* Background Text for Depth - RPG style */}
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[5rem] md:text-[14rem] font-black text-gray-50/60 -z-10 pointer-events-none select-none font-mono"
                style={{ 
                  textShadow: '4px 4px 0px rgba(0,0,0,0.1)',
                  imageRendering: 'pixelated'
                }}>
            VISION
          </span>

          <h2 className="text-4xl md:text-7xl font-bold text-gray-900 leading-[1.1] mb-8 relative z-10">
            人材が豊富な国と<br/>
            労働力が不足している国をつなぎ、<br />
            <span className="relative inline-block px-4">
              <span className="relative z-10">アジアの力を最大化する</span>
              <span className="absolute bottom-2 left-0 w-full h-4 bg-cyan-200/40 -z-0 transform -skew-x-12"></span>
            </span>
          </h2>
          
          {/* Pixel Decorative Line */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="w-1 h-1 bg-gray-400"
              />
            ))}
          </div>
        </motion.div>

        {/* RPG-style Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex items-center gap-4 justify-center"
        >
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-cyan-500" />
            <div className="w-2 h-2 bg-purple-500" />
            <div className="w-2 h-2 bg-yellow-500" />
          </div>
          <span className="text-xs font-bold tracking-[0.3em] text-gray-400 uppercase font-mono">
            Core Values
          </span>
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-yellow-500" />
            <div className="w-2 h-2 bg-purple-500" />
            <div className="w-2 h-2 bg-cyan-500" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-40 relative">
          {/* Background Pixel Pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
               style={{
                 backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                 backgroundSize: '24px 24px'
               }}
          />
          
          {[
            { 
              title: "MISSION", 
              desc: "「人材が豊富な国」と「労働力が不足している国」をつなぎ、企業と人の成長機会を促進しアジアの力を最大化し、労働革命を起こす。",
              accent: "border-cyan-500",
              bg: "hover:bg-cyan-50/30",
              color: "bg-cyan-500",
              level: 99,
              statValue: 95
            },
            { 
              title: "VISION", 
              desc: "アジア全域において、国籍に関わらず誰もが最適な機会にアクセスできる社会インフラとなる。アジアの熱量を、日本企業の新たな成長エンジンに。",
              accent: "border-purple-500",
              bg: "hover:bg-purple-50/30",
              color: "bg-purple-500",
              level: 98,
              statValue: 92
            },
            { 
              title: "VALUE", 
              desc: "意志を繋ぐテクノロジー：表面的な条件や効率性よりも、「人の本音」と「企業の熱量」の可視化を最優先する。",
              accent: "border-yellow-500",
              bg: "hover:bg-yellow-50/30",
              color: "bg-yellow-500",
              level: 100,
              statValue: 98
            }
          ].map((item, i) => (
             <Card key={i} {...item} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}
