import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-white text-gray-900 pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-16 border-b border-gray-200 pb-8">
          <span className="text-cyan-600 font-bold tracking-widest text-xs uppercase font-mono mb-4 block">
            Legal Document
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            利用規約
          </h1>
          <p className="text-gray-500">
            最終更新日: 2024年1月1日
          </p>
        </div>

        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-cyan-600">
          <p>
            この利用規約（以下，「本規約」といいます。）は，株式会社Bridg（以下，「当社」といいます。）がこのウェブサイト上で提供するサービス（以下，「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます。
          </p>

          <h3>第1条（適用）</h3>
          <ol>
            <li>本規約は，ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されるものとします。</li>
            <li>当社は本サービスに関し，本規約のほか，ご利用にあたってのルール等，各種の定め（以下，「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず，本規約の一部を構成するものとします。</li>
            <li>本規約の規定が前項の個別規定の規定と矛盾する場合には，個別規定において特段の定めなき限り，個別規定の規定が優先されるものとします。</li>
          </ol>

          <h3>第2条（利用登録）</h3>
          <p>
            本サービスにおいては，登録希望者が本規約に同意の上，当社の定める方法によって利用登録を申請し，当社がこれを承認することによって，利用登録が完了するものとします。
          </p>

          <h3>第3条（禁止事項）</h3>
          <p>
            ユーザーは，本サービスの利用にあたり，以下の行為をしてはなりません。
          </p>
          <ul>
            <li>法令または公序良俗に違反する行為</li>
            <li>犯罪行為に関連する行為</li>
            <li>本サービスの内容等，本サービスに含まれる著作権，商標権ほか知的財産権を侵害する行為</li>
            <li>当社，ほかのユーザー，またはその他第三者のサーバーまたはネットワークの機能を破壊したり，妨害したりする行為</li>
            <li>本サービスによって得られた情報を商業的に利用する行為</li>
          </ul>

          {/* 
            TODO: 実際のサービス内容に合わせて条文を追加・修正してください。
            これは一般的なテンプレートです。
          */}

          <h3>第4条（免責事項）</h3>
          <p>
             当社は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
          </p>
        </div>
      </div>
    </main>
  );
}

