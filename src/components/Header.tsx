"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import ContactModal from "@/components/ContactModal";

const navItems = [
  { 
    name: "Philosophy", 
    jp: "経営理念", 
    href: "/philosophy",
    dropdown: [
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

// ヘッダーを透過させるページのリスト
const TRANSPARENT_HEADER_PAGES = ["/", "/mission", "/vision", "/value", "/philosophy", "/origin", "/service", "/company"];

// Square Pixel Grid Component (Reused for consistency)
const PixelGrid = ({ className }: { className?: string }) => (
  <div className={`absolute inset-0 pointer-events-none opacity-[0.05] ${className}`}
       style={{ 
         backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
         backgroundSize: '40px 40px' 
       }} 
  />
);

export default function Header() {
  const pathname = usePathname();
  const isTransparentPage = TRANSPARENT_HEADER_PAGES.includes(pathname);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const updateScroll = () => {
      const scrollY = window.scrollY;
      setIsPastHero(isTransparentPage ? scrollY > window.innerHeight - 100 : false);
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, [isTransparentPage]);

  return (
    <>
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 py-6"
        onMouseLeave={() => setHoveredItem(null)}
      >
        {/* Backdrop Filter Background */}
        <motion.div 
          className="absolute inset-0 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm"
          initial={false}
          animate={{ opacity: isTransparentPage ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          style={{ pointerEvents: 'none' }}
        />

        <div className="w-full relative flex items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="relative z-10 group flex-shrink-0" onClick={() => setIsMenuOpen(false)}>
            <img
              src="/images/logo.png"
              alt="TSUNAGU"
              width={240}
              height={60}
              className="block h-7 md:h-8 w-auto transition-opacity duration-300 group-hover:opacity-80"
            />
          </Link>

          {/* Right Side Content */}
          <div className="flex items-center gap-8 relative z-10 ml-auto">
            {/* Desktop Nav - Only show when NOT past hero */}
            {!isPastHero && (
              <div className="hidden md:flex items-center gap-8">
                <nav className="flex items-center gap-8">
                  {navItems.map((item) => (
                    <div 
                      key={item.name}
                      className="relative"
                      onMouseEnter={() => setHoveredItem(item.name)}
                    >
                      <Link 
                        href={item.href}
                        className="text-sm font-medium text-gray-600 hover:text-black transition-colors relative group font-mono flex flex-col items-center leading-none py-2"
                      >
                        <span className="relative z-10 text-base">{item.name}</span>
                        <span className="text-[10px] text-gray-400 group-hover:text-cyan-600 transition-colors font-sans font-bold mt-1">{item.jp}</span>
                        <span className="absolute -left-3 top-2 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-500">[</span>
                        <span className="absolute -right-3 top-2 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-500">]</span>
                      </Link>
                    </div>
                  ))}
                </nav>

                {/* CTA Button */}
                <button 
                  onClick={() => setIsContactOpen(true)}
                  className="px-5 py-2.5 bg-black text-white text-sm font-bold hover:bg-cyan-600 transition-colors flex items-center gap-2 group"
                >
                  <span className="font-mono">Contact</span>
                  <span className="text-xs opacity-70 border-l border-gray-600 pl-2 ml-1">お問い合わせ</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}

            {/* Hamburger Menu Toggle - Show on Mobile OR when past hero on Desktop */}
            <button 
              className={`relative z-50 p-2 transition-colors ${isMenuOpen ? 'text-black' : 'text-gray-900'} ${(!isTransparentPage || isPastHero) ? '' : 'md:hidden'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {hoveredItem && navItems.find(n => n.name === hoveredItem)?.dropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-full left-0 w-full bg-black text-white py-12 border-t border-white/10 overflow-hidden"
              onMouseEnter={() => setHoveredItem(hoveredItem)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <PixelGrid className="opacity-[0.03] !invert" />
              <div className="w-full relative z-10 px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                  <div className="md:col-span-1">
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tighter mb-4 flex items-center gap-4">
                      {hoveredItem}
                      <ArrowRight className="w-6 h-6 text-cyan-500" />
                    </h3>
                    <div className="w-12 h-1 bg-cyan-500" />
                  </div>
                  <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                    {navItems.find(n => n.name === hoveredItem)?.dropdown?.map((subItem) => (
                      <Link 
                        key={subItem.name} 
                        href={subItem.href}
                        className="group flex items-center justify-between border-b border-white/10 pb-4 hover:border-cyan-500 transition-colors"
                      >
                        <div className="flex flex-col">
                          <span className="text-lg font-bold tracking-tight group-hover:text-cyan-400 transition-colors">
                            {subItem.jp}
                          </span>
                          <span className="text-xs font-mono text-gray-500 uppercase tracking-widest mt-1">
                            {subItem.name}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-cyan-500" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-white flex flex-col"
          >
            {/* Background Decorations */}
            <PixelGrid />
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 border-l border-gray-100 hidden md:block" />
            
            {/* Decorative Tech Elements */}
            <div className="absolute top-32 left-10 w-2 h-2 bg-cyan-500 animate-pulse" />
            <div className="absolute bottom-20 left-20 w-px h-32 bg-gray-300" />
            <div className="absolute top-1/2 right-20 w-32 h-32 border border-gray-200 rounded-full opacity-50 hidden md:block" />

            <div className="w-full h-full flex flex-col justify-center relative z-10 pt-24 md:pt-0 px-4">
               <nav className="flex flex-col gap-4 md:gap-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                    className="flex flex-col gap-2"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="group flex items-end gap-4 md:gap-8"
                    >
                      <span className="text-xs md:text-sm font-mono font-bold text-cyan-500 mb-2 md:mb-4">
                        0{index + 1}
                      </span>
                      <div className="flex flex-col relative z-20">
                         <span className="text-4xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gray-200 group-hover:text-black group-hover:bg-none transition-all duration-300 leading-none">
                          {item.name}
                        </span>
                        <span className="text-sm md:text-lg font-bold text-gray-400 group-hover:text-cyan-600 transition-colors pl-1">
                          {item.jp}
                        </span>
                      </div>
                      <div className="flex items-center justify-center relative z-20 ml-4 mb-auto h-[40px] md:h-[72px]">
                        <ArrowRight className="w-6 h-6 md:w-8 md:h-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-cyan-500" />
                      </div>
                    </Link>

                    {/* Mobile Sub-items */}
                    {item.dropdown && (
                      <div className="flex flex-wrap gap-x-6 gap-y-2 ml-10 md:ml-20 mt-2 mb-4">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-sm font-bold text-gray-500 hover:text-cyan-600 transition-colors flex items-center gap-1"
                          >
                            <span>{subItem.jp}</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </nav>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-12 md:mt-16 flex flex-col md:flex-row gap-8 items-start md:items-center"
              >
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsContactOpen(true);
                  }}
                  className="group relative px-8 py-4 bg-black text-white text-lg font-bold overflow-hidden hover:bg-cyan-600 transition-colors"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <span className="font-mono">Contact Us</span>
                    <span className="w-px h-4 bg-gray-600 mx-1" />
                    <span>お問い合わせ</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                <div className="flex gap-6 text-sm font-bold text-gray-400">
                  <a href="#" className="hover:text-black transition-colors">Twitter (X)</a>
                  <a href="#" className="hover:text-black transition-colors">LinkedIn</a>
                  <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
                </div>
              </motion.div>
            </div>

            {/* Bottom Status Bar */}
            <div className="absolute bottom-0 left-0 w-full h-12 border-t border-gray-100 flex items-center justify-between px-6 bg-white text-[10px] font-mono text-gray-400 uppercase tracking-widest">
              <span>System: Online</span>
              <span>TSUNAGU Inc. © {new Date().getFullYear()}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
