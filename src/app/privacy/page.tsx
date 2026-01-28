import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white text-gray-900 pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-16 border-b border-gray-200 pb-8">
          <span className="text-cyan-600 font-bold tracking-widest text-xs uppercase font-mono mb-4 block">
            Legal Document
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            プライバシーポリシー
          </h1>
          <p className="text-gray-500">
            最終更新日: 2024年1月1日
          </p>
        </div>

        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-cyan-600">
          <p>
            株式会社TSUNAGU（以下「当社」といいます。）は、本ウェブサイト上で提供するサービス（以下「本サービス」といいます。）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます。）を定めます。
          </p>

          <h3>第1条（個人情報）</h3>
          <p>
            「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報及び容貌、指紋、声紋にかかるデータ、及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。
          </p>

          <h3>第2条（個人情報の収集方法）</h3>
          <p>
            当社は、ユーザーが利用登録をする際に氏名、生年月日、住所、電話番号、メールアドレス、銀行口座番号、クレジットカード番号、運転免許証番号などの個人情報をお尋ねすることがあります。また、ユーザーと提携先などとの間でなされたユーザーの個人情報を含む取引記録や決済に関する情報を、当社の提携先（情報提供元、広告主、広告配信先などを含みます。以下、｢提携先｣といいます。）などから収集することがあります。
          </p>

          <h3>第3条（個人情報を収集・利用する目的）</h3>
          <p>
            当社が個人情報を収集・利用する目的は、以下のとおりです。
          </p>
          <ul>
            <li>当社サービスの提供・運営のため</li>
            <li>ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）</li>
            <li>ユーザーが利用中のサービスの新機能、更新情報、キャンペーン等及び当社が提供する他のサービスの案内のメールを送付するため</li>
            <li>メンテナンス、重要なお知らせなど必要に応じたご連絡のため</li>
            <li>利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの特定をし、ご利用をお断りするため</li>
            <li>ユーザーにご自身の登録情報の閲覧や変更、削除、ご利用状況の閲覧を行っていただくため</li>
            <li>上記の利用目的に付随する目的</li>
          </ul>

          {/* 
            TODO: 実際の運用に合わせて条文を追加・修正してください。
            これは一般的なテンプレートです。
          */}
          
          <h3>第4条（お問い合わせ窓口）</h3>
          <p>
            本ポリシーに関するお問い合わせは、下記の窓口までお願いいたします。
          </p>
          <div className="bg-gray-50 p-6 border border-gray-200 mt-4 not-prose">
            <p className="font-bold mb-2">株式会社TSUNAGU 個人情報取扱担当</p>
            <p className="text-sm text-gray-600">
              Eメールアドレス: info@tsunaguinc.co.jp<br />
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

