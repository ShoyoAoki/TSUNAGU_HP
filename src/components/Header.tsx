"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import ContactModal from "@/components/ContactModal";

const navItems = [
  { name: "Mission", jp: "ミッション", href: "#" },
  { name: "Features", jp: "特徴・機能", href: "#" },
  { name: "Platform", jp: "仕組み", href: "#" },
  { name: "Company", jp: "会社概要", href: "#" },
];

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const headerOpacity = useTransform(scrollY, [0, 50], [0, 1]);

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
      setIsScrolled(scrollY > 50);
      setIsPastHero(scrollY > window.innerHeight - 100);
    };
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <>
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "py-4" : "py-6"
        }`}
      >
        {/* Backdrop Filter Background */}
        <motion.div 
          className="absolute inset-0 bg-white/80 backdrop-blur-md border-b border-gray-200"
          style={{ opacity: headerOpacity }}
        />

        <div className="container mx-auto px-6 relative flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10 group" onClick={() => setIsMenuOpen(false)}>
            <span className="text-2xl font-bold tracking-tighter text-gray-900 font-mono flex items-center gap-1">
              <div className={`w-3 h-3 bg-cyan-500 transition-transform duration-300 ${isMenuOpen ? 'rotate-45' : 'group-hover:rotate-45'}`} />
              Bridg.
            </span>
          </Link>

          {/* Right Side Content */}
          <div className="flex items-center gap-8 relative z-10 ml-auto">
            {/* Desktop Nav - Only show when NOT past hero */}
            {!isPastHero && (
              <div className="hidden md:flex items-center gap-8">
                <nav className="flex items-center gap-8">
                  {navItems.map((item) => (
                    <Link 
                      key={item.name} 
                      href={item.href}
                      className="text-sm font-medium text-gray-600 hover:text-black transition-colors relative group font-mono flex flex-col items-center leading-none"
                    >
                      <span className="relative z-10 text-base">{item.name}</span>
                      <span className="text-[10px] text-gray-400 group-hover:text-cyan-600 transition-colors font-sans font-bold mt-1">{item.jp}</span>
                      <span className="absolute -left-3 top-0 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-500">[</span>
                      <span className="absolute -right-3 top-0 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-500">]</span>
                    </Link>
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
              className={`relative z-50 p-2 transition-colors ${isMenuOpen ? 'text-black' : 'text-gray-900'} ${!isPastHero ? 'md:hidden' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
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

            <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10 pt-24 md:pt-0">
               <nav className="flex flex-col gap-4 md:gap-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
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
              <span>Bridg Inc. © {new Date().getFullYear()}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
