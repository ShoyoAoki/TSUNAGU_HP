export const metadata = {
  title: "服务条款",
  description: "株式会社TSUNAGU的服务使用条款。请在使用前仔细阅读。",
  alternates: {
    canonical: "/zh/terms",
    languages: {
      ja: "/terms",
      "zh-Hans": "/zh/terms",
      "x-default": "/terms",
    },
  },
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-white text-gray-900 pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-16 border-b border-gray-200 pb-8">
          <span className="text-cyan-600 font-bold tracking-widest text-xs uppercase font-mono mb-4 block">
            Legal Document
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            服务条款
          </h1>
          <p className="text-gray-500">
            最后更新日期：2025年4月1日
          </p>
        </div>

        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-cyan-600">
          <p className="text-sm text-gray-500 border border-gray-200 bg-gray-50 px-4 py-3 not-prose">
            本译文仅供参考，如有歧义，以日本语原文为准。
          </p>

          <p>
            本使用条款（以下称「本条款」）规定了株式会社TSUNAGU（以下称「本公司」）在本网站上提供的服务（以下称「本服务」）的使用条件。各位注册用户（以下称「用户」）须遵守本条款使用本服务。
          </p>

          <h3>第1条（适用范围）</h3>
          <ol>
            <li>本条款适用于用户与本公司之间与本服务使用相关的一切关系。</li>
            <li>本公司可能就本服务另行制定本条款以外的使用规则等各类规定（以下称「个别规定」）。无论其名称如何，个别规定均构成本条款的一部分。</li>
            <li>若本条款的规定与前款个别规定的规定相抵触，除个别规定另有约定外，以个别规定的规定为准。</li>
          </ol>

          <h3>第2条（使用注册）</h3>
          <p>
            在本服务中，希望注册者须在同意本条款的前提下，按照本公司规定的方式申请使用注册，并经本公司核准后，注册方为完成。
          </p>

          <h3>第3条（禁止事项）</h3>
          <p>
            用户在使用本服务时，不得从事以下行为。
          </p>
          <ul>
            <li>违反法令或公序良俗的行为</li>
            <li>与犯罪行为相关的行为</li>
            <li>侵犯本服务内容所包含的著作权、商标权及其他知识产权的行为</li>
            <li>破坏或妨碍本公司、其他用户或第三方服务器或网络功能的行为</li>
            <li>将通过本服务获得的信息用于商业用途的行为</li>
          </ul>

          <h3>第4条（知识产权）</h3>
          <p>
            本公司网站及服务相关的知识产权，归本公司或正当权利人所有。
          </p>

          <h3>第5条（服务的变更与中断）</h3>
          <p>
            本公司可在不事先通知的情况下变更服务内容，或中断・终止服务的提供。
          </p>

          <h3>第6条（准据法・管辖）</h3>
          <p>
            本条款的解释以日本法为准据法。因本条款产生纠纷时，以鹿儿岛地方法院为第一审的专属合意管辖法院。
          </p>

          <h3>第7条（条款的变更）</h3>
          <p>
            本公司在认为必要时，可在不通知用户的情况下变更本条款。
          </p>

          <h3>第8条（免责事项）</h3>
          <p>
            本公司不对本服务不存在事实上或法律上的瑕疵（包括安全性、可靠性、准确性、完整性、有效性、特定目的适用性、安全性等方面的缺陷、错误或漏洞、侵权等）作出任何明示或默示的保证。
          </p>
        </div>
      </div>
    </main>
  );
}
