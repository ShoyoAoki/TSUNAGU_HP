"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Platform() {
  return (
    <section id="platform" className="py-24 md:py-40 bg-gray-50 overflow-hidden border-t border-gray-200">
      <div className="container mx-auto px-6 max-w-7xl relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 bg-gray-900" />
              <span className="text-sm font-bold tracking-widest text-gray-900 uppercase">
                Service Model
              </span>
            </div>
            <h2 className="text-2xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-tight mb-6">
              3 Tracks<br/>to Japan_
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              IT人材のリモートトライアル採用（BRJ）から、日中バイリンガル人材の紹介まで。
              TSUNAGUは2つの事業部体制で、最適な採用モデルをご提案します。
            </p>
          </div>

          <Link
            href="/service"
            className="group flex items-center gap-4 px-8 py-5 bg-black text-white font-bold text-base hover:bg-gray-800 transition-colors shrink-0"
          >
            <span>サービス詳細を見る</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
