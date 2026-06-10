"use client";

import { useEffect } from "react";
import { Mail, ArrowRight } from "lucide-react";
import { useContact } from "@/context/ContactContext";

export default function ContactPage() {
  const { openContact } = useContact();

  // ページ到達時にフォームモーダルを自動で開く（URLは /contact のまま維持）
  useEffect(() => {
    openContact();
  }, [openContact]);

  return (
    <main className="min-h-screen bg-white pt-40 pb-24">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-cyan-500" />
            <span className="text-sm font-mono font-bold text-cyan-600 uppercase tracking-[0.2em]">Contact</span>
            <div className="w-12 h-px bg-cyan-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900 mb-8">
            お問い合わせ
          </h1>
          <p className="text-gray-600 leading-[1.9] mb-12">
            サービスに関するご相談・ご質問は、お問い合わせフォームよりお気軽にご連絡ください。
            担当者より順次ご連絡させていただきます。
          </p>

          <button
            onClick={openContact}
            className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-bold hover:bg-cyan-600 transition-colors group"
          >
            <Mail className="w-5 h-5" />
            フォームを開く
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="mt-12 text-sm text-gray-500">
            メールでのご連絡:{" "}
            <a href="mailto:contact@tsunaguinc.co.jp" className="text-cyan-700 underline underline-offset-4 hover:text-cyan-600">
              contact@tsunaguinc.co.jp
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
