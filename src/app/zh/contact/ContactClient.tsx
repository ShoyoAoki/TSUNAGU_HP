"use client";

import { ContactForm } from "@/components/ContactModal";
import { zh } from "@/lib/i18n/zh";

// Same layout and form as src/app/contact/ContactClient.tsx. ContactForm switches its copy by pathname.
const t = zh.contact;

export default function ContactClient() {
  return (
    <main className="min-h-screen bg-white text-slate-900" lang="zh-Hans">
      <section className="px-6 pt-16 pb-12 md:pt-24 md:pb-16 border-b border-slate-200">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-blue-700 mb-6">CONTACT</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-7">{t.title}</h1>
          <p className="text-sm md:text-base leading-loose text-slate-600">
            {t.lead[0]}
            <br className="hidden md:block" />{t.lead[1]}
          </p>
        </div>
      </section>

      <section aria-labelledby="contact-form-title" className="px-6 py-12 md:py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 id="contact-form-title" className="text-xl md:text-2xl font-bold mb-3">{t.formHeading}</h2>
            <p className="text-sm leading-loose text-slate-600">
              {t.formLead[0]}<br />
              {t.formLead[1]}
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded p-5 sm:p-9 md:p-12">
            <ContactForm />
          </div>
        </div>
      </section>

      <section aria-label={t.addressLabel} className="px-6 py-12">
        <div className="max-w-3xl mx-auto text-xs leading-loose text-slate-500">
          <p className="font-bold text-slate-700 mb-2">{t.company}</p>
          <p>{t.tokyo}</p>
          <p>{t.head}</p>
        </div>
      </section>
    </main>
  );
}
