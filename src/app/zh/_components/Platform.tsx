"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const stats = [
  { v: "80+", k: "AI智能体解析" },
  { v: "15–20%", k: "仅头部人才获认证" },
  { v: "N2+", k: "双语人才日语水平" },
  { v: "3–6个月", k: "远程试用期" },
];

export default function Platform() {
  return (
    <section id="platform" className="py-24 md:py-40 bg-white overflow-hidden border-t border-gray-200">
      <div className="container mx-auto px-6 max-w-7xl relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12 mb-16"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 bg-cyan-600" />
              <span className="text-sm font-bold tracking-widest text-gray-900 uppercase">
                Our Platform
              </span>
            </div>
            <h2 className="text-2xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-tight mb-6">
              OwlMatch_<br />比简历更懂这个人。
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              通过自我介绍视频×AI筛选，在见面之前即可确认海外人才的「人品・日语能力・实力」，这是一个跨境招聘平台。
              覆盖IT人才远程试用录用、中日双语人才推荐、当地短期项目等全场景。
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              href="/zh/service"
              className="group flex items-center justify-center gap-4 px-8 py-5 bg-black text-white font-bold text-base hover:bg-cyan-700 transition-colors"
            >
              <span>了解 OwlMatch</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 border-t border-gray-200"
        >
          {stats.map((s, i) => (
            <div
              key={s.k}
              className={`py-6 md:py-8 pr-6 ${i > 0 ? "md:border-l md:border-gray-200 md:pl-8" : ""}`}
            >
              <div className="font-mono text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-1 tabular-nums">
                {s.v}
              </div>
              <div className="text-xs text-gray-400 font-bold">{s.k}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
