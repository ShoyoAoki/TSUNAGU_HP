/**
 * TSUNAGU コーポレートサイト共通文字列辞書。
 * Header / Footer / ContactModal など、複数ページで再利用される「原子的」な文字列（CTA・
 * フォームラベル・バリデーション/エラー文言・フッター法定表示等）をここに集約する。
 *
 * 現状は ja / zh の2キーのみ実装。将来 en / zh-Hant を追加する場合は
 * Locale 型にキーを追加し、各セクションに翻訳を足すだけで済む as const 構造にしている。
 *
 * 各コンテンツページ本体（Hero見出し・本文コピー等）はこのファイルでは管理せず、
 * src/app/{page}/{Page}Client.tsx / src/app/zh/{page}/{Page}Client.tsx に
 * 直接ハードコードする方針（このリポジトリの既存パターンに合わせる）。
 */

export const locales = ["ja", "zh"] as const;
export type Locale = (typeof locales)[number];

export const strings = {
  ja: {
    nav: {
      philosophy: { name: "Philosophy", jp: "経営理念" },
      mission: { name: "Mission", jp: "ミッション" },
      vision: { name: "Vision", jp: "ビジョン" },
      value: { name: "Value", jp: "バリュー" },
      origin: { name: "Origin", jp: "会社名・ロゴ由来" },
      service: { name: "Service", jp: "サービス" },
      company: { name: "Company", jp: "会社概要" },
    },
    cta: {
      contact: "お問い合わせ",
      contactEn: "Contact",
      contactUs: "Contact Us",
      download: "資料ダウンロード",
      menu: "Menu",
    },
    footer: {
      tagline: "テクノロジーで世界中の『意志』をつなぐ",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      copyright: (year: number) => `© ${year} TSUNAGU Inc.`,
      legalLine:
        "株式会社TSUNAGU｜有料職業紹介事業許可番号 46-ユ-300221｜東京オフィス：東京都目黒区目黒1-24-12 オリックス目黒ビル7F",
    },
    langSwitch: {
      label: "言語",
      ja: "日本語",
      zh: "中文",
    },
    contactModal: {
      title: "CONTACT",
      companyLabel: "会社名",
      companyPlaceholder: "株式会社○○",
      nameLabel: "お名前",
      namePlaceholder: "山田 太郎",
      emailLabel: "メール",
      emailPlaceholder: "example@company.co.jp",
      phoneLabel: "電話番号",
      phonePlaceholder: "03-1234-5678",
      messageLabel: "お問い合わせ内容",
      messagePlaceholder: "ご用件をご記入ください...",
      required: "必須",
      submit: "送信する",
      submitting: "送信中...",
      successTitle: "送信完了",
      successBody: "お問い合わせありがとうございます。\n担当者より順次ご連絡させていただきます。",
      close: "閉じる",
      errorGeneric: "送信に失敗しました。時間をおいて再度お試しください。",
    },
  },
  zh: {
    nav: {
      philosophy: { name: "Philosophy", jp: "经营理念" },
      mission: { name: "Mission", jp: "使命" },
      vision: { name: "Vision", jp: "愿景" },
      value: { name: "Value", jp: "价值观" },
      origin: { name: "Origin", jp: "公司名与LOGO由来" },
      service: { name: "Service", jp: "服务" },
      company: { name: "Company", jp: "公司概况" },
    },
    cta: {
      contact: "联系我们",
      contactEn: "Contact",
      contactUs: "Contact Us",
      download: "下载资料",
      menu: "菜单",
    },
    footer: {
      tagline: "以科技连接世界各地的『意志』",
      privacy: "隐私政策",
      terms: "服务条款",
      copyright: (year: number) => `© ${year} TSUNAGU Inc.`,
      legalLine:
        "株式会社TSUNAGU｜有料職業紹介事業許可番号 46-ユ-300221（收费职业介绍许可）｜东京办公室：东京都目黑区目黑1-24-12 Orix目黑大厦7F",
    },
    langSwitch: {
      label: "语言",
      ja: "日本語",
      zh: "中文",
    },
    contactModal: {
      title: "联系我们",
      companyLabel: "公司名称",
      companyPlaceholder: "示例：株式会社◯◯",
      nameLabel: "姓名",
      namePlaceholder: "张 三",
      emailLabel: "邮箱",
      emailPlaceholder: "example@company.com",
      phoneLabel: "电话号码",
      phonePlaceholder: "090-1234-5678",
      messageLabel: "咨询内容",
      messagePlaceholder: "请填写您的咨询内容……",
      required: "必填",
      submit: "提交",
      submitting: "提交中...",
      successTitle: "提交成功",
      successBody: "感谢您的咨询。\n我们的负责人将尽快与您联系。",
      close: "关闭",
      errorGeneric: "提交失败，请稍后重试。",
    },
  },
} as const;

export function getStrings(locale: Locale) {
  return strings[locale];
}
