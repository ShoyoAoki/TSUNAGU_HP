import type { Metadata } from "next";
import s from "../article.module.css";
import { article } from "./content";
export const metadata: Metadata = {
  title: "世界のAI開発を支える中国出身の研究者たち",
  description: "李飛飛、何愷明、陳天奇、梁文鋒と研究チームの成果を紹介。画像認識から空間生成、推論モデルまで、AIの基盤をつくる仕事をたどります。",
  alternates: { canonical: "/news/ai-researchers" },
};
export default function ArticlePage() {
  return <main className={s.article} dangerouslySetInnerHTML={{ __html: article }} />;
}
