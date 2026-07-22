"use client";

import { useEffect } from "react";

/**
 * ルート layout.tsx は <html lang="ja"> を固定で出力するため（日本語ルートを一切変更しない方針）、
 * /zh 配下ではこの小さなクライアントコンポーネントで lang 属性を "zh-Hans" に補正する。
 * globals.css の `html[lang="zh-Hans"] { --font-noto-sans-jp: var(--font-noto-sans-sc); ... }`
 * がこの属性を見て、Tailwind の font-sans / font-serif を簡体字フォントへ自動的に切り替える。
 */
export default function LangCorrector() {
  useEffect(() => {
    const prev = document.documentElement.lang;
    document.documentElement.lang = "zh-Hans";
    return () => {
      document.documentElement.lang = prev;
    };
  }, []);

  return null;
}
