"use client";

import CallToAction from "../_components/CallToAction";
import { motion } from "framer-motion";

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
    { label: "公司名称", en: "Company Name", value: "株式会社TSUNAGU" },
    { label: "成立日期", en: "Founded", value: "2025年3月3日" },
    { label: "注册资本", en: "Capital", value: "500万日元" },
    { label: "代表取缔役CEO", en: "CEO", value: "青木 翔阳" },
    {
      label: "总部地址",
      en: "Head Office",
      value: "〒899-5211 日本鹿儿岛县姶良市加治木町反土4番15番地249"
    },
    {
      label: "东京办公室",
      en: "Tokyo Office",
      value: "〒153-0063 日本东京都目黑区目黑１丁目２４−１２ Orix目黑大厦 7F"
    },
    {
      label: "业务内容",
      en: "Business",
      value: (
        <ul className="space-y-2">
          <li>・跨境人力资源平台「OwlMatch」的开发与运营</li>
          <li>・海外IT人才的远程试用录用支持（OwlMatch Remote事业）</li>
          <li>・中日双语人才的招聘咨询服务（OwlMatch Language事业）</li>
          <li>・跨境短期项目的运营（OwlMatch Spot事业）</li>
          <li>・有偿职业介绍事业（许可编号 46-ユ-300221）</li>
        </ul>
      )
    },
    {
      label: "有偿职业介绍许可编号",
      en: "License Number",
      value: "46-ユ-300221"
    },
  ];

  const globalNetwork = [
    {
      category: "子公司",
      en: "Subsidiary",
      items: [
        { name: "北京福城人才资源有限公司", location: "中国北京", description: "基于资本关系的直营据点" }
      ]
    },
    {
      category: "合作伙伴",
      en: "Partner",
      items: [
        { name: "山东国信国际经济技术合作有限公司", location: "中国山东省", description: "战略业务合作伙伴" }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-white">
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
                公司概况
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
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">企业信息</h2>
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
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">全球网络</h2>
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
                <p className="text-sm font-bold text-gray-900 mb-1">高度透明的合作体系</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  株式会社TSUNAGU明确区分了通过子公司进行的直接运营，与经过严格筛选的合作伙伴之间的协作关系。
                  以此在各地区实现合规经营与高品质服务的兼顾。
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CallToAction />
    </main>
  );
}
