import type { GuideArticle } from "../types";
import { PLACEHOLDER_BODY } from "./_placeholder";

// 【原稿待ち】title / metaTitle / description / lead / cta / body は仮。原稿で置き換えたら status を "ready" にする
export const chinaTalentVisa: GuideArticle = {
  slug: "china-talent-visa",
  title: "中国人材採用と在留資格の基礎",
  metaTitle: "中国人材採用と在留資格の基礎｜株式会社TSUNAGU",
  description: "【原稿待ち】中国人材採用と在留資格の基礎の記事説明文が入ります。",
  lead: "【原稿待ち】リード文が入ります。",
  publishedAt: "2026-10-30",
  updatedAt: "2026-10-30",
  related: ["china-talent-new-graduates", "china-talent-merit-caution", "china-talent-methods"],
  cta: { heading: "【原稿待ち】CTA見出し", copy: "【原稿待ち】CTAの説明文が入ります。" },
  body: PLACEHOLDER_BODY,
  status: "draft",
};
