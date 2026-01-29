import Link from "next/link";

const footerNavItems = [
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

export default function Footer() {
  return (
    <footer id="company" className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Section */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <img 
                src="/images/logo.png" 
                alt="TSUNAGU" 
                width={240}
                height={60}
                className="block h-7 md:h-8 w-auto transition-opacity duration-300 hover:opacity-80"
              />
            </Link>
            <p className="text-gray-500 font-medium text-sm leading-relaxed max-w-xs">
              テクノロジーで世界中の『意志』をつなぐ
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
              <Link href="/privacy" className="text-[10px] font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-wider">Privacy Policy</Link>
              <Link href="/terms" className="text-[10px] font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-wider">Terms of Service</Link>
            </div>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-xs font-bold text-gray-400 hover:text-black transition-colors">Twitter (X)</a>
            <a href="#" className="text-xs font-bold text-gray-400 hover:text-black transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
