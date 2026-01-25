"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const problems = [
  {
    id: "01",
    en: "Labor Shortage",
    jp: "働き手の消失",
    desc: "日本の生産年齢人口は減少の一途を辿り、2030年には644万人の不足が予測されています。",
    stat: "644",
    unit: "万人",
    statLabel: "2030年 予測不足数",
    theme: "from-gray-900 to-gray-800"
  },
  {
    id: "02",
    en: "IT Talent Gap",
    jp: "IT人材の枯渇",
    desc: "国の成長を左右するIT分野において、2030年までに約79万人の人材不足が警鐘されています。",
    stat: "79",
    unit: "万人",
    statLabel: "IT人材不足予測",
    theme: "from-cyan-900/40 to-blue-900/40"
  },
  {
    id: "03",
    en: "High Cost",
    jp: "採用コストの高騰",
    desc: "既存エージェントの「年収35%」という手数料構造が、企業の成長と採用の流動性を阻害しています。",
    stat: "35",
    unit: "%",
    statLabel: "平均紹介手数料",
    theme: "from-blue-900/40 to-purple-900/40"
  },
  {
    id: "04",
    en: "Talent Surplus",
    jp: "才能の供給過多",
    desc: "中国では年間1,000万人の大卒者が排出される一方、ポスト不足により優秀層が溢れています。",
    stat: "1,000",
    unit: "万人",
    statLabel: "中国 年間大卒者数",
    theme: "from-purple-900/40 to-pink-900/40"
  },
];

// Sharp Square Grid
const SquareGrid = ({ className }: { className?: string }) => (
  <div className={`absolute inset-0 z-0 pointer-events-none opacity-10 ${className}`}
       style={{ 
         backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', 
         backgroundSize: '40px 40px' 
       }}>
  </div>
);

export default function ProblemSolution() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} className="py-24 md:py-40 bg-black text-white relative overflow-hidden font-mono">
       {/* Precise Grid Background */}
       <div className="absolute inset-0 z-0">
         <div className="absolute top-0 left-0 w-full h-full bg-black" />
         <SquareGrid />
         
         {/* Sharp Rectangular Overlays */}
         <div className="absolute top-0 right-0 w-[40vw] h-[40vh] bg-white/5 border-l border-b border-white/10" />
         <div className="absolute bottom-0 left-0 w-[30vw] h-[60vh] bg-white/5 border-r border-t border-white/10" />

         {/* Square Data Points */}
         <div className="absolute top-1/4 left-10 w-4 h-4 bg-cyan-500/80" />
         <div className="absolute top-[28%] left-10 w-4 h-4 bg-cyan-500/40" />
         
         <div className="absolute bottom-1/3 right-20 w-8 h-8 border border-purple-500/60" />
         <div className="absolute bottom-[30%] right-[70px] w-4 h-4 bg-purple-500/80" />
       </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-32 flex justify-between items-end border-b border-gray-800 pb-10"
        >
          <div>
            <span className="text-cyan-500 text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-cyan-500 animate-pulse"></span>
              / System Imbalance
            </span>
            <h2 className="text-3xl md:text-6xl font-semibold tracking-tight leading-none">
              Structural<br/>
              <span className="text-gray-500">Mismatch_</span>
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-gray-800">
          {problems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative h-[420px] p-8 flex flex-col justify-between bg-black border-r border-gray-800 last:border-r-0 hover:bg-gray-900 transition-colors duration-300"
            >
               {/* Hover Grid Effect */}
               <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')]" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs text-gray-500 border border-gray-700 px-2 py-1 bg-black">
                    {item.id}
                  </span>
                  <div className="w-2 h-2 bg-gray-800 group-hover:bg-cyan-500 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.jp}</h3>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-6">{item.en}</p>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="relative z-10">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold tracking-tighter text-white group-hover:text-cyan-400 transition-colors">
                    {item.stat}
                  </span>
                  <span className="text-sm text-gray-500">{item.unit}</span>
                </div>
                {/* Square Progress Bar */}
                <div className="w-full h-2 bg-gray-900 mt-4 flex gap-0.5">
                   {[...Array(10)].map((_, i) => (
                     <motion.div 
                       key={i}
                       initial={{ opacity: 0 }}
                       whileInView={{ opacity: 1 }}
                       transition={{ delay: 0.5 + i * 0.05 }}
                       className={`flex-1 ${i < 7 ? 'bg-cyan-900 group-hover:bg-cyan-500' : 'bg-gray-800'} transition-colors`} 
                     />
                   ))}
                </div>
                <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest">
                  {item.statLabel}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
