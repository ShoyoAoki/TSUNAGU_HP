import type { Metadata } from "next";
import Image from "next/image";
import { ServiceShell, ServiceHero, SectionHeading, ServiceProcess, ServiceEnd, s } from "@/components/CorporateService";
const description="日中バイリンガル人材の採用支援。海外営業、営業事務、顧客対応など、実際の業務場面に必要な語学力と経験から人材像を整理します。";
export const metadata:Metadata={title:{absolute:"日中バイリンガル人材の採用支援｜株式会社TSUNAGU"},description,alternates:{canonical:"/service/bilingual"},openGraph:{title:"日中バイリンガル人材の採用支援｜株式会社TSUNAGU",description,url:"/service/bilingual"}};
export default function Page(){return <ServiceShell title="日中バイリンガル人材の採用支援" description={description} path="/service/bilingual">
 <ServiceHero label="BILINGUAL" title={<>二つの言語を<br/>仕事の力へ</>} lead="日本語と中国語を使う現場へ。海外営業・営業事務・顧客対応など、日々の業務を担う人材の採用を支援します。" image="/images/corporate-hero/bilingual.png"/>
 <section className={`${s.wrap} ${s.section} ${s.split}`}><SectionHeading en="BUSINESS ROLES" copy="語学力に加え、業界知識や調整力、顧客とのやり取りの経験を整理します。">言葉の先にある<br/>担当業務から</SectionHeading><div className={s.rows}>{[["海外営業","取引先への連絡・提案、商談準備、社内外の調整。取り扱う商材と担当範囲を確認します。"],["営業事務","受発注、書類確認、資料作成、関係者への連絡。正確さと実務処理の経験を確認します。"],["顧客対応","日本語・中国語での問い合わせ対応やサービス案内。対応チャネルと判断・相談の範囲を整理します。"]].map(([title,copy])=><article className={s.row} key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
 <section className={`${s.wrap} ${s.section}`}><SectionHeading en="LANGUAGE IN PRACTICE">語学を実務の場面で確認</SectionHeading><div className={s.scene}><Image src="/images/corporate-hero/bilingual.png" alt="" width={1200} height={900} sizes="(max-width:700px) 90vw, 50vw"/><ul>{[["話す・聞く","商談、電話、社内会議。誰と、何について、どの程度の説明や調整を行うかを確認します。"],["読む・書く","メール、業務資料、顧客向けの案内。実務で扱う文章の内容と正確さの水準を整理します。"],["伝える・つなぐ","言葉を置き換えるだけでなく、相手の意図を理解して社内外へ共有する経験を確認します。"]].map(([title,copy])=><li key={title}><h3>{title}</h3><p>{copy}</p></li>)}</ul></div><p className={s.note}>ご紹介対象はJLPT N1取得者です。N1の取得と、業務上の交渉・文書作成能力を同じものとして扱わず、職務に必要な対応力を別途確認します。</p></section>
 <section className={`${s.wrap} ${s.section}`}><SectionHeading en="HIRING OPTIONS">経験者も新卒も</SectionHeading><div className={s.comparison}><article><h3>経験を活かす採用</h3><p>業界・商材、担当顧客、使用言語、業務範囲を確認。これまでの経験を、入社後の役割と照らし合わせます。</p></article><article><h3>育成を見据える採用</h3><p>専攻、学生時代の活動、語学の使用経験、学習姿勢を確認。入社時の必須条件と、社内で育成する内容を分けて整理します。</p></article></div></section>
 <ServiceProcess steps={[["業務と言語の整理","担当職種、使用言語、顧客・社内とのやり取り、必要な経験を伺います。"],["人材像の具体化","経験者・新卒の採用方針、必須条件、勤務条件を整理します。"],["紹介・選考・入社相談","候補者をご紹介し、選考中の連絡、条件確認と入社後の相談に対応します。"]]}/>
 <ServiceEnd exclude="bilingual"/>
 </ServiceShell>}
