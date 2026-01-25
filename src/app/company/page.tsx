import CallToAction from "@/components/CallToAction";

export const metadata = {
  title: "Company | Bridg",
  description: "Bridgの会社概要。日本とアジアの架け橋となる次世代の採用インフラを構築します。",
};

export default function CompanyPage() {
  return (
    <main className="pt-20">
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">Company</h1>
            <p className="text-lg text-gray-600">会社概要</p>
          </div>

          <div className="border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <dt className="text-sm font-bold text-gray-500 uppercase tracking-widest">Company Name</dt>
                <dd className="text-lg font-bold text-gray-900 md:col-span-2">株式会社つなぐ (TSUNAGU Inc.)</dd>
              </div>
              <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <dt className="text-sm font-bold text-gray-500 uppercase tracking-widest">Vision</dt>
                <dd className="text-lg text-gray-700 md:col-span-2">アジアの力を最大化する社会インフラの構築</dd>
              </div>
              <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <dt className="text-sm font-bold text-gray-500 uppercase tracking-widest">Business</dt>
                <dd className="text-lg text-gray-700 md:col-span-2">
                  クロスボーダー型採用プラットフォーム「Bridg」の開発・運営<br />
                  ハイクラス人材のスカウト・コンサルティング
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
      <CallToAction />
    </main>
  );
}
