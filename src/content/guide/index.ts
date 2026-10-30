import type { GuideArticle } from "./types";
import { chinaTalentMeritCaution } from "./articles/china-talent-merit-caution";
import { chinaTalentVisa } from "./articles/china-talent-visa";
import { chinaTalentMethods } from "./articles/china-talent-methods";
import { chinaTalentCost } from "./articles/china-talent-cost";
import { chinaTalentNewGraduates } from "./articles/china-talent-new-graduates";

/** /guide の掲載順 */
export const guideArticles: GuideArticle[] = [
  chinaTalentMeritCaution,
  chinaTalentVisa,
  chinaTalentMethods,
  chinaTalentCost,
  chinaTalentNewGraduates,
];

export function getGuideArticle(slug: string) {
  return guideArticles.find((article) => article.slug === slug);
}

/** /guide 一覧ページの文面。原稿：03_事業企画/リサーチ/マーケ・HP/中国人材採用_SEO原稿/guide一覧リード_2026-10.md */
export const guideIndex = {
  metaTitle: "中国人材採用ガイド｜株式会社TSUNAGU",
  description: "中国出身の人材の採用を検討する企業向けのガイドです。メリットと注意点、在留資格の基礎、採用方法の比較、費用の内訳、新卒採用の進め方を、公的統計と公表情報をもとに解説します。",
  eyebrow: "GUIDE",
  title: "中国人材採用ガイド",
  lead: "中国出身の人材の採用を検討する企業のための解説記事です。在留資格、採用方法、費用、新卒採用まで、採用前に確認したいことを公的統計と公表情報をもとに整理しました。",
  /** リード下のリンク行（行内記法可） */
  leadLink: "[中国人材採用](/service/china-talent)のサービス内容を見る",
  cta: {
    heading: "中国人材採用のご相談",
    copy: "記事を読んで気になったことから、ご相談いただけます。初回の採用相談は無料です。",
  },
  status: "ready" as "draft" | "ready",
};

/** 記事の執筆者表示（画面と JSON-LD で共用） */
export const GUIDE_AUTHOR = {
  name: "株式会社TSUNAGU",
  credential: "有料職業紹介事業 許可番号46-ユ-300221",
};
