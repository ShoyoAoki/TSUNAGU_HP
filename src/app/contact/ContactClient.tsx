"use client";

import { ContactForm } from "@/components/ContactModal";

export default function ContactClient() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="px-6 pt-16 pb-12 md:pt-24 md:pb-16 border-b border-slate-200">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-blue-700 mb-6">CONTACT</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-7">お問い合わせ</h1>
          <p className="text-sm md:text-base leading-loose text-slate-600">
            採用のご相談、資料請求、取材・提携に関するお問い合わせを承ります。
            <br className="hidden md:block" />下のフォームに必要事項をご入力ください。
          </p>
        </div>
      </section>

      <section aria-labelledby="contact-form-title" className="px-6 py-12 md:py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 id="contact-form-title" className="text-xl md:text-2xl font-bold mb-3">お問い合わせフォーム</h2>
            <p className="text-sm leading-loose text-slate-600">
              通常2営業日以内に、担当者よりご連絡いたします。<br />
              「必須」の項目をご入力のうえ、送信してください。
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded p-5 sm:p-9 md:p-12">
            <ContactForm />
          </div>
        </div>
      </section>

      <section aria-label="所在地" className="px-6 py-12">
        <div className="max-w-3xl mx-auto text-xs leading-loose text-slate-500">
          <p className="font-bold text-slate-700 mb-2">株式会社TSUNAGU</p>
          <p>東京オフィス：東京都目黒区目黒1丁目24-12 オリックス目黒ビル7F</p>
          <p>本社：鹿児島県姶良市加治木町反土4番15番地249</p>
        </div>
      </section>
    </main>
  );
}
