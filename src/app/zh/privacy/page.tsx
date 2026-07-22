export const metadata = {
  title: "隐私政策",
  description: "株式会社TSUNAGU的隐私政策。为您说明个人信息的处理方式。",
  alternates: {
    canonical: "/zh/privacy",
    languages: {
      ja: "/privacy",
      "zh-Hans": "/zh/privacy",
      "x-default": "/privacy",
    },
  },
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white text-gray-900 pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-16 border-b border-gray-200 pb-8">
          <span className="text-cyan-600 font-bold tracking-widest text-xs uppercase font-mono mb-4 block">
            Legal Document
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            隐私政策
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
            株式会社TSUNAGU（以下称「本公司」）就本网站上提供的服务（以下称「本服务」）中用户个人信息的处理方式，制定以下隐私政策（以下称「本政策」）。
          </p>

          <h3>第1条（个人信息）</h3>
          <p>
            「个人信息」是指日本《个人信息保护法》所称的「个人信息」，即与在世个人相关的信息，包括通过其中所含的姓名、出生日期、住址、电话号码、联系方式等描述可识别特定个人的信息，以及容貌、指纹、声纹数据，健康保险证保险者编号等仅凭该信息本身即可识别特定个人的信息（个人识别信息）。
          </p>

          <h3>第2条（个人信息的收集方法）</h3>
          <p>
            本公司在用户办理使用注册时，可能会询问姓名、出生日期、住址、电话号码、邮箱地址、银行账号、信用卡号、驾照号码等个人信息。此外，本公司还可能从合作伙伴（包括信息提供方、广告主、广告投放对象等，以下称「合作伙伴」）等处收集用户与合作伙伴之间产生的、包含用户个人信息的交易记录及支付相关信息。
          </p>

          <h3>第3条（收集・使用个人信息的目的）</h3>
          <p>
            本公司收集・使用个人信息的目的如下。
          </p>
          <ul>
            <li>为提供及运营本公司服务</li>
            <li>为回复用户的咨询（包括进行身份确认）</li>
            <li>为向用户发送其正在使用的服务的新功能、更新信息、活动等，以及本公司提供的其他服务的介绍邮件</li>
            <li>为因维护、重要通知等需要而进行的必要联络</li>
            <li>为识别违反使用条款的用户，或以不正当・不当目的使用服务的用户，并拒绝其使用</li>
            <li>为让用户查阅、变更、删除本人的注册信息，以及查阅使用情况</li>
            <li>与上述使用目的相关联的其他目的</li>
          </ul>

          <h3>第4条（向第三方提供信息）</h3>
          <p>
            除以下情形外，本公司不会在未经本人事先同意的情况下向第三方提供个人信息。
          </p>
          <ul>
            <li>基于法令规定的情形</li>
            <li>为保护人的生命、身体或财产而有必要的情形</li>
            <li>为提升公共卫生水平或推动儿童健康成长而特别有必要的情形</li>
          </ul>

          <h3>第5条（安全管理措施）</h3>
          <p>
            本公司将采取必要且适当的措施，防止个人信息的泄露、灭失或损毁，并进行其他个人信息安全管理。
          </p>

          <h3>第6条（信息的披露・更正・删除）</h3>
          <p>
            若本人要求披露、更正、删除个人信息等，本公司将在合理期限内予以处理。
          </p>

          <h3>第7条（Cookie的使用）</h3>
          <p>
            本公司网站为提升便利性及进行访问分析而使用Cookie。用户可通过浏览器设置限制Cookie的使用。
          </p>

          <h3>第8条（政策的变更）</h3>
          <p>
            除法令及本政策另有规定的事项外，本政策的内容可在不通知用户的情况下进行变更。
          </p>

          <h3>第9条（咨询窗口）</h3>
          <p>
            有关本政策的咨询，请联系以下窗口。
          </p>
          <div className="bg-gray-50 p-6 border border-gray-200 mt-4 not-prose">
            <p className="font-bold mb-2">株式会社TSUNAGU 个人信息处理负责部门</p>
            <p className="text-sm text-gray-600">
              电子邮箱：info@tsunaguinc.co.jp<br />
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
