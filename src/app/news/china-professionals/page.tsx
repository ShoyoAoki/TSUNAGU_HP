import type { Metadata } from "next";
import s from "../article.module.css";
import { articles } from "../content";
export const metadata: Metadata = {title: "高度専門職の中国籍は2万2169人で67.3％ 東京の外国人雇用でも最多", description: "2025年末の高度専門職の中国籍在留者は2万2169人で67.3％。東京の外国人雇用届出でも中国籍が最多となった。", alternates: {canonical: "/news/china-professionals"}};
export default function ArticlePage(){return <main className={s.article} dangerouslySetInnerHTML={{__html:articles["china-professionals"]}}/>;}
