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

/** /guide 一覧ページの見出しとリード。【原稿待ち】lead は原稿で置き換える */
export const guideIndex = {
  metaTitle: "中国人材採用ガイド｜株式会社TSUNAGU",
  description: "【原稿待ち】中国人材採用ガイドの説明文が入ります。",
  eyebrow: "採用ガイド",
  title: "中国人材採用ガイド",
  lead: "【原稿待ち】一覧ページのリード文が入ります。",
  status: "draft" as "draft" | "ready",
};

/** 記事の執筆者表示（画面と JSON-LD で共用） */
export const GUIDE_AUTHOR = {
  name: "株式会社TSUNAGU",
  credential: "有料職業紹介事業 許可番号46-ユ-300221",
};
