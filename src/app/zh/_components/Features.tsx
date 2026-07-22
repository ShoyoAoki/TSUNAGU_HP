"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    tag: "Three Divisions",
    title: "三大事业部",
    jpTitle: "IT人才 × 双语人才 × 短期项目",
    desc: "IT工程师的远程试用录用（OwlMatch Remote）、N2以上双语人才推荐（OwlMatch Language）、当地短期项目（OwlMatch Spot）。三条专业业务线，为企业量身推荐最合适的人才与实务支持。",
    col: "md:col-span-2",
    theme: "text-gray-900 border-gray-200"
  },
  {
    tag: "AI Platform",
    title: "OwlMatch",
    jpTitle: "80个以上的AI智能体让招聘全面自动化",
    desc: "从简历解析、技能评估、日语水平判定到精准匹配，AI驱动整个招聘流程。无论是IT人才的编程测试，还是双语人才的语言能力评估，均可高精度自动完成。",
    col: "md:col-span-1",
    theme: "text-white bg-black border-black"
  },
  {
    tag: "Zero Risk",
    title: "先试用",
    jpTitle: "录用前即可确认实力的模式",
    desc: "IT人才通过远程试用，在3～6个月内验证实际表现；语言人才采用成功报酬制，零风险启动。两大事业均实现「充分认可后再录用」。",
    col: "md:col-span-1",
    theme: "text-gray-900 border-gray-200"
  },
  {
    tag: "Trilingual",
    title: "中日英",
    jpTitle: "完整支持三语言的平台",
    desc: "日语・简体中文・英语一键切换。搭载可识别中日文表记差异的检索引擎，彻底消除语言壁垒，实现精准匹配。",
    col: "md:col-span-2",
    theme: "text-gray-900 border-gray-200"
  },
  {
    tag: "Network",
    title: "直达",
    jpTitle: "覆盖中国全境的人才网络",
    desc: "通过顶尖高校校友网络、微信・小红书社群、以及当地子公司，从IT工程师到商务双语人才，可即时触达广泛的候选人资源池。",
    col: "md:col-span-2",
    theme: "text-gray-900 border-gray-200"
  },
];

export default function Features() {
  const containerRef = useRef(null);

  return (
    <section id="features" ref={containerRef} className="py-24 md:py-40 bg-white relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-6">
               <div className="w-3 h-3 bg-cyan-500" />
               <span className="text-sm font-bold tracking-widest text-black uppercase">
                 Why TSUNAGU
               </span>
            </div>
            <h2 className="text-3xl md:text-6xl font-semibold tracking-tight text-black leading-tight">
              Why <br/>
              <span className="text-gray-400">TSUNAGU_</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-200 bg-gray-100">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className={`group relative p-10 flex flex-col justify-between h-auto md:h-[420px] bg-white border border-transparent hover:z-10 hover:shadow-2xl transition-all duration-300 ${feature.col} ${feature.theme === 'text-white bg-black border-black' ? 'bg-black text-white' : ''}`}
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-current opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-current opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10 flex justify-between items-start">
                <span className="text-xs font-mono uppercase tracking-widest opacity-60 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-current" />
                  {feature.tag}
                </span>
              </div>

              <div className="relative z-10 mt-auto">
                <h3 className="text-4xl md:text-5xl font-bold tracking-tighter leading-none mb-4">
                  {feature.title}
                </h3>
                <p className="text-sm font-bold opacity-80 mb-6 font-mono border-l-2 border-current pl-3 ml-1">
                  {feature.jpTitle}
                </p>
                <p className="text-sm leading-relaxed opacity-80">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
