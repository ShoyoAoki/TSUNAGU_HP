import type { Metadata } from "next";
import SpecialtyPage, { type SpecialtyContent } from "@/components/recruitment/SpecialtyPage";
const description = "日本企業への就職を目指す中国人新卒人材の採用支援。学んだことや取り組んだこと、語学力、希望職種から、入社後の役割に合う人材像を整理します。";
export const metadata: Metadata = { title: "中国人新卒人材の採用支援｜OwlMatch", description, alternates: { canonical: "/service/new-graduates" }, openGraph: { title: "中国人新卒人材の採用支援｜OwlMatch", description, url: "/service/new-graduates" } };
const content: SpecialtyContent = {
  slug: "new-graduates", title: "新卒人材", eyebrow: "日本での就職を目指す中国人新卒人材へ", headline: "学びと意欲を次の仕事へ", lead: description, icon: "graduate",
  roles: [
    { title: "語学力を活かす仕事", copy: "日本語・中国語を使い、顧客や取引先とのやり取りを担う仕事。", tags: ["海外営業", "営業事務", "顧客対応"] },
    { title: "IT・AI分野の仕事", copy: "情報系の学びや開発経験を、ソフトウェア・AI開発につなげる仕事。", tags: ["ソフトウェア開発", "AI・データ関連職"] },
    { title: "理工系の学びを活かす仕事", copy: "研究や制作で培った知識を、開発や技術に関わる業務へ活かす仕事。", tags: ["研究テーマ", "制作・開発経験", "専門知識"] },
  ],
  points: [
    { title: "何を学びどう取り組んできたか", copy: "専攻、研究、制作などの経験から、入社後の業務とのつながりを整理します。" },
    { title: "仕事と働き方の希望", copy: "希望する職種、日本で働くうえで大切にしていること、勤務地や入社時期を確認します。" },
    { title: "入社後に育てる部分", copy: "入社時に必要な知識・語学力と、配属後に習得する業務を分けて、採用要件を考えます。" },
  ],
};
export default function Page() { return <SpecialtyPage content={content} />; }
