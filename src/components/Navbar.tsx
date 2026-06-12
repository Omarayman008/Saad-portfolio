"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { key: "home", href: "#home" },
    { key: "about", href: "#about" },
    { key: "services", href: "#services" },
    { key: "portfolio", href: "#portfolio" },
    { key: "contact", href: "#contact" },
  ];

  const langs = [
    { code: "ar", label: "AR" },
    { code: "tr", label: "TR" },
    { code: "en", label: "EN" },
  ];

  const isAr = language === "ar";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "py-4 bg-black/50 backdrop-blur-2xl" : "py-8"
      )}
    >
      <div className={cn(
        "container mx-auto px-6 md:px-12 relative flex justify-between items-center",
        isAr ? "flex-row" : "flex-row-reverse"
      )}>
        <div className="flex-shrink-0 z-10">
          <div className="flex gap-3">
            {langs.map((l) => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code as any)}
                className={cn(
                  "flex items-center justify-center w-9 h-9 rounded-xl border text-[10px] font-bold transition-all duration-500",
                  language === l.code 
                    ? "bg-white border-white text-black shadow-xl" 
                    : "border-white/10 text-white/40 hover:border-white/30 hover:text-white"
                )}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center">
          <ul className="flex gap-10 items-center text-xs uppercase tracking-[0.3em] font-bold">
            {navLinks.map((link) => (
              <li key={link.key}>
                <a
                  href={link.href}
                  className="text-white/40 hover:text-white transition-all duration-300 relative group"
                >
                  <span className={cn(isAr ? "font-arabic-body text-sm tracking-normal" : "font-english-body")}>
                    {t(link.key)}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-shrink-0 z-10">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative h-10 w-auto cursor-pointer"
          >
            <Image 
              src="/images/local_cache/gfGxLxQ.png" 
              alt="Saad Nejjai" 
              width={200}
              height={80}
              className="h-full w-auto object-contain drop-shadow-[0_0_15px_rgba(255,200,61,0.3)]"
            />
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
