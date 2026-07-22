"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useContact } from "@/context/ContactContext";
import { ArrowRight } from "lucide-react";
import { getStrings } from "@/lib/i18n/strings";

const footerNavItemsJa = [
  {
    name: "Philosophy",
    jp: "経営理念",
    href: "/philosophy",
    subItems: [
      { name: "Philosophy", jp: "経営理念", href: "/philosophy" },
      { name: "Mission", jp: "ミッション", href: "/mission" },
      { name: "Vision", jp: "ビジョン", href: "/vision" },
      { name: "Value", jp: "バリュー", href: "/value" },
      { name: "Origin", jp: "会社名・ロゴ由来", href: "/origin" },
    ]
  },
  { name: "Service", jp: "サービス", href: "/service" },
  { name: "Company", jp: "会社概要", href: "/company" },
];

const footerNavItemsZh = [
  {
    name: "Philosophy",
    jp: "经营理念",
    href: "/zh/philosophy",
    subItems: [
      { name: "Philosophy", jp: "经营理念", href: "/zh/philosophy" },
      { name: "Mission", jp: "使命", href: "/zh/mission" },
      { name: "Vision", jp: "愿景", href: "/zh/vision" },
      { name: "Value", jp: "价值观", href: "/zh/value" },
      { name: "Origin", jp: "公司名与LOGO由来", href: "/zh/origin" },
    ]
  },
  { name: "Service", jp: "服务", href: "/zh/service" },
  { name: "Company", jp: "公司概况", href: "/zh/company" },
];

export default function Footer() {
  const { openContact } = useContact();
  const pathname = usePathname();
  const isZh = pathname.startsWith("/zh");
  const footerNavItems = isZh ? footerNavItemsZh : footerNavItemsJa;
  const t = getStrings(isZh ? "zh" : "ja");

  return (
    <footer id="company" className="relative z-10 bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Section */}
          <div className="md:col-span-4">
            <Link href={isZh ? "/zh" : "/"} className="inline-block mb-6">
              <Image
                src="/images/logo.png"
                alt="TSUNAGU"
                width={360}
                height={90}
                priority
                style={{ height: "90px", width: "auto" }}
                className="block transition-opacity duration-300 hover:opacity-80"
              />
            </Link>
            <p className="text-gray-500 font-medium text-sm leading-relaxed max-w-xs">
              {t.footer.tagline}
            </p>
          </div>
          
          {/* Navigation Section */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerNavItems.map((item) => (
              <div key={item.name}>
                <Link 
                  href={item.href}
                  className="text-sm font-bold text-gray-900 hover:text-cyan-600 transition-colors block mb-4"
                >
                  <span className="font-mono block text-[10px] text-cyan-600 uppercase tracking-widest mb-1">{item.name}</span>
                  {item.jp}
                </Link>
                {item.subItems && (
                  <ul className="space-y-2">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.name}>
                        <Link 
                          href={subItem.href}
                          className="text-xs text-gray-500 hover:text-cyan-600 transition-colors"
                        >
                          {subItem.jp}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
              &copy; {new Date().getFullYear()} TSUNAGU Inc.
            </p>
            <div className="flex gap-6">
              <Link href={isZh ? "/zh/privacy" : "/privacy"} className="text-[10px] font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-wider">{t.footer.privacy}</Link>
              <Link href={isZh ? "/zh/terms" : "/terms"} className="text-[10px] font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-wider">{t.footer.terms}</Link>
              <Link href={isZh ? pathname.slice(3) || "/" : `/zh${pathname === "/" ? "" : pathname}`} className="text-[10px] font-bold text-gray-400 hover:text-cyan-600 transition-colors uppercase tracking-wider">{isZh ? t.langSwitch.ja : t.langSwitch.zh}</Link>
            </div>
          </div>

          <button
            onClick={openContact}
            className="flex items-center gap-2 text-[10px] font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-wider group"
          >
            {t.cta.contact}
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 法定表示・NAP（社名・許可番号・所在地） */}
        <p className="mt-6 pt-6 border-t border-gray-100 text-[10px] text-gray-400 text-center leading-relaxed">
          {t.footer.legalLine}
        </p>
      </div>
    </footer>
  );
}
