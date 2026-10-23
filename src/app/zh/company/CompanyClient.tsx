"use client";

import { motion } from "framer-motion";
import { LICENSE_NO, zh } from "@/lib/i18n/zh";

// Same layout as src/app/company/CompanyClient.tsx. Copy lives in src/lib/i18n/zh.ts.
const t = zh.company;

// Square Pixel Grid Component
const PixelGrid = ({ className }: { className?: string }) => (
  <div className={`absolute inset-0 pointer-events-none opacity-[0.03] ${className}`}
       style={{
         backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
         backgroundSize: '40px 40px'
       }}
  />
);

export default function CompanyClient() {
  const companyInfo = [
    ...t.info,
    {
      label: t.businessLabel,
      en: "Business",
      value: (
        <ul className="space-y-2">
          {t.business.map((line) => <li key={line}>・{line}</li>)}
        </ul>
      )
    },
    {
      label: t.licenseLabel,
      en: "License Number",
      value: LICENSE_NO
    },
  ];

  const globalNetwork = t.network;

  return (
    <main className="min-h-screen bg-white" lang="zh-Hans">
      {/* Hero Section */}
      <section className="relative pt-48 pb-24 overflow-hidden border-b border-gray-100">
        <PixelGrid />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-cyan-500" />
                <span className="text-sm font-mono font-bold text-cyan-500 uppercase tracking-[0.2em]">Company Profile</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-900 mb-8 leading-tight">
                {t.heading}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Profile Table Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-end gap-4 mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">{t.infoHeading}</h2>
                <span className="text-sm font-mono text-gray-400 mb-1">/ Corporate Information</span>
              </div>

              <div className="grid grid-cols-1 border-t border-gray-900">
                {companyInfo.map((info, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-12 border-b border-gray-100 group hover:bg-gray-50 transition-colors"
                  >
                    <div className="md:col-span-4 py-8 md:pr-8">
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-gray-900">{info.label}</span>
                        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mt-1">{info.en}</span>
                      </div>
                    </div>
                    <div className="md:col-span-8 py-8 flex items-center">
                      <div className="text-gray-700 font-medium leading-relaxed">
                        {info.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Network Section */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <PixelGrid className="opacity-[0.02]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-end gap-4 mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">{t.networkHeading}</h2>
                <span className="text-sm font-mono text-gray-400 mb-1">/ Global Network</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {globalNetwork.map((group, groupIndex) => (
                  <div key={groupIndex} className="bg-white p-8 border border-gray-200 relative group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gray-200 group-hover:bg-cyan-500 transition-colors" />
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-900">{group.category}</h3>
                      <p className="text-[10px] font-mono text-cyan-600 uppercase tracking-widest mt-1">{group.en}</p>
                    </div>

                    <div className="space-y-6">
                      {group.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="relative pl-4 border-l border-gray-100">
                          <div className="mb-1">
                            <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-wider">{item.location}</span>
                          </div>
                          <h4 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h4>
                          <p className="text-sm text-gray-500 font-medium">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 bg-white border border-gray-200">
                <p className="text-sm font-bold text-gray-900 mb-1">{t.trustTitle}</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {t.trust}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
