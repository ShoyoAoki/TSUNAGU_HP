import type { Metadata } from "next";
import SpecialtyPage, { type SpecialtyContent } from "@/components/recruitment/SpecialtyPage";
const description = "ソフトウェア開発、AI開発、データ分析などを担う中国人材の採用支援。開発内容と必要な経験から、新卒・中途の採用要件を整理します。";
export const metadata: Metadata = { title: "IT・AI人材の採用支援｜OwlMatch", description, alternates: { canonical: "/service/it-ai" }, openGraph: { title: "IT・AI人材の採用支援｜OwlMatch", description, url: "/service/it-ai" } };
const content: SpecialtyContent = {
  slug: "it-ai", title: "IT・AI人材", eyebrow: "ソフトウェア・AI開発を担う人材へ", headline: "開発するものから人材を考える", lead: description, icon: "code",
  roles: [
    { title: "ソフトウェア開発", copy: "Webサービスや業務システムの設計・実装・保守を担う仕事。", tags: ["フロントエンド", "バックエンド", "業務システム"] },
    { title: "AI開発", copy: "機械学習モデルやAI機能を、サービス・業務に組み込む仕事。", tags: ["機械学習", "AI機能の実装", "モデルの検証"] },
    { title: "データ分析", copy: "データを整理・分析し、業務やサービスの判断に役立てる仕事。", tags: ["データ処理", "分析", "可視化"] },
  ],
  points: [
    { title: "開発環境と担当範囲", copy: "使用する言語・技術、チームの役割分担、入社後に任せたい開発内容を確認します。" },
    { title: "必要な経験の具体化", copy: "技術名だけでなく、どの規模・段階の開発経験が必要かを整理します。技術面の選考は採用企業で行います。" },
    { title: "チームで働くための条件", copy: "勤務地、働き方、日本語でのコミュニケーション、入社時期の希望を確認します。" },
  ],
};
export default function Page() { return <SpecialtyPage content={content} />; }
