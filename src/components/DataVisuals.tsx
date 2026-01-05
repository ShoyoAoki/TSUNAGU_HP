"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function DataVisuals() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="py-40 bg-white relative overflow-hidden">
       {/* Background: Smart Grid Pattern */}
       <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
            style={{ 
              backgroundImage: 'linear-gradient(#111827 1px, transparent 1px), linear-gradient(90deg, #111827 1px, transparent 1px)', 
              backgroundSize: '32px 32px' 
            }} 
       />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row gap-20 items-center">
          
          {/* Left Content */}
          <div className="md:w-1/3">
             <span className="text-sm font-bold tracking-[0.2em] text-cyan-600 uppercase mb-6 block">
               ANALYTICS
             </span>
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight"
            >
              Data Insights
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
               className="text-gray-500 text-lg leading-relaxed mb-12 font-medium"
            >
              エンジニアリング部門とプロダクト部門が最高のパフォーマンスを示しており、組織健全性が非常に高い状態を維持しています。
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-10 bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-100/50"
            >
              <div className="text-xs font-bold text-cyan-600 uppercase tracking-wider mb-2">Target Metric</div>
              <div className="text-6xl font-bold text-gray-900 mb-2 tracking-tight">85%</div>
              <div className="text-sm font-medium text-gray-400">Employee Retention Rate</div>
              
              {/* Modern Progress Bar */}
              <div className="w-full h-3 bg-gray-100 rounded-full mt-8 overflow-hidden">
                 <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    transition={{ duration: 1.5, ease: "circOut", delay: 0.4 }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                 />
              </div>
            </motion.div>
          </div>

          {/* Right Visuals (Dashboard Mockup) */}
          <div className="md:w-2/3 w-full">
            <motion.div
              style={{ y }}
              initial={{ opacity: 0, rotateX: 10 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-white rounded-[2.5rem] border border-gray-200 shadow-2xl shadow-gray-200/50 p-10 md:p-14 relative perspective-1000"
            >
              {/* Floating Elements for 3D Feel */}
              <motion.div 
                 animate={{ y: [0, -10, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute -top-10 -right-10 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 z-20 hidden md:block"
              >
                  <div className="text-xs font-bold text-gray-400 uppercase mb-1">Total Users</div>
                  <div className="text-2xl font-bold text-gray-900">12,450</div>
              </motion.div>

              {/* Window Header */}
              <div className="flex items-center justify-between mb-12 pb-6 border-b border-gray-100">
                <h3 className="font-bold text-xl text-gray-900">Department Performance</h3>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* Bar Chart Mockup */}
                <div className="space-y-8">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Performance Score</h4>
                  {[
                    { label: "Eng", val: 92, color: "bg-cyan-500" },
                    { label: "Prod", val: 88, color: "bg-purple-500" },
                    { label: "Sales", val: 74, color: "bg-yellow-500" },
                    { label: "Ops", val: 65, color: "bg-gray-400" },
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-3">
                      <div className="flex justify-between text-xs font-bold text-gray-500">
                        <span>{item.label}</span>
                        <span>{item.val}%</span>
                      </div>
                      <div className="h-2.5 w-full bg-gray-50 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.val}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + idx * 0.1, duration: 1, ease: "easeOut" }}
                          className={`h-full ${item.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Donut Chart Mockup */}
                <div className="flex flex-col items-center justify-center relative">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-8 self-start w-full">eNPS Distribution</h4>
                  
                  <div className="relative w-48 h-48">
                      {/* Background Ring */}
                      <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                        <path
                          className="text-gray-50"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        />
                        <motion.path
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 0.65 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                          className="text-cyan-500"
                          strokeDasharray="100, 100"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.span 
                          initial={{ opacity: 0, scale: 0.5 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1, type: "spring" }}
                          className="text-5xl font-bold text-gray-900"
                        >
                          65%
                        </motion.span>
                        <span className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-wide">PROMOTERS</span>
                      </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
