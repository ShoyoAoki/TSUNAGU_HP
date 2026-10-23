import type { Metadata } from "next";
import s from "../article.module.css";
import { articles } from "../content";
export const metadata: Metadata = {title: "スターシップの飛行を支える中国系エンジニア", description: "ソフトウェア開発からエンジンの飛行運用へ。SpaceXで専門分野を広げた中国系エンジニアの仕事と経歴を報道から紹介。", alternates: {canonical: "/news/space-ai"}};
export default function ArticlePage(){return <main className={s.article} dangerouslySetInnerHTML={{__html:articles["space-ai"]}}/>;}
