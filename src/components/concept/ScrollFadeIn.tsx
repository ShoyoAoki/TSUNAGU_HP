"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

// スクロールに応じてフェードイン・アウトするセクション。
// fadeIn / fadeOut はスクロール進捗（0〜1）上の区間、yFrom は出現時の縦オフセット
export default function ScrollFadeIn({
  children,
  className,
  fadeIn = [0, 0.4],
  fadeOut = [0.6, 1],
  yFrom = 100,
}: {
  children: ReactNode;
  className?: string;
  fadeIn?: [number, number];
  fadeOut?: [number, number];
  yFrom?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [fadeIn[0], fadeIn[1], fadeOut[0], fadeOut[1]],
    [0, 1, 1, 0]
  );
  const y = useTransform(scrollYProgress, fadeIn, [yFrom, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
}
