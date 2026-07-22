"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const problems = [
  {
    id: "01",
    en: "Japan Labor Crisis",
    jp: "日益严峻的人才短缺",
    desc: "预计到2030年，日本IT人才缺口最高将达79万人。与此同时，制造业、商社等行业对具备中文能力的双语人才需求也日益紧迫。能否用好外籍人才，已成为日本经济持续增长的关键。",
    stat: "79",
    unit: "万人",
    statLabel: "2030年 IT人才缺口预测",
    theme: "from-gray-900 to-gray-800"
  },
  {
    id: "02",
    en: "China Youth Crisis",
    jp: "中国年轻一代的就业难题",
    desc: "中国青年失业率已达18.9%，大学毕业生人数每年高达1,222万，创历史新高。从IT工程师到商务双语人才，众多优秀年轻人正在寻找施展才华的舞台。",
    stat: "1,222",
    unit: "万人",
    statLabel: "中国 年度大学毕业生人数",
    theme: "from-cyan-900/40 to-blue-900/40"
  },
  {
    id: "03",
    en: "Bilingual Demand",
    jp: "持续攀升的双语人才需求",
    desc: "中日贸易额每年超过40万亿日元。中日双语商务人才的需求正在东京・大阪・名古屋・爱知等全日本范围内持续扩大，但具备N2以上实务水平的人才却长期供不应求。",
    stat: "40",
    unit: "万亿日元+",
    statLabel: "中日贸易额（年）",
    theme: "from-blue-900/40 to-purple-900/40"
  },
  {
    id: "04",
    en: "Market Size",
    jp: "巨大的市场机遇",
    desc: "中日跨境人才市场的TAM约为8,400亿日元。IT人才与双语人才的供需缺口都在持续扩大，TSUNAGU正以两大事业布局，抓住这一结构性机遇。",
    stat: "8,400",
    unit: "亿日元",
    statLabel: "TAM（中日人才通道）",
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
              / Cross-Border Talent Gap
            </span>
            <h2 className="text-3xl md:text-6xl font-semibold tracking-tight leading-none">
              Structural<br/>
              <span className="text-gray-500">Arbitrage_</span>
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
              className="group relative h-auto md:h-[420px] p-8 flex flex-col justify-between bg-black border-r border-gray-800 last:border-r-0 hover:bg-gray-900 transition-colors duration-300"
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
