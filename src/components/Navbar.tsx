"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
        scrolled ? "py-4 bg-black/50 backdrop-blur-2xl border-b border-white/5" : "py-8"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center flex-row-reverse">
        {/* Logo moved to the right */}
        <div className={cn(
          "text-2xl font-bold tracking-[0.2em] uppercase text-white",
          isAr ? "font-arabic-hero" : "font-english-hero"
        )}>
          Saad
        </div>

        {/* Links and Language on the left */}
        <div className="flex items-center gap-10">
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

          <ul className="hidden md:flex gap-10 items-center text-xs uppercase tracking-[0.3em] font-bold">
            {navLinks.map((link) => (
              <li key={link.key}>
                <a
                  href={link.href}
                  className="text-white/40 hover:text-white transition-all duration-300 relative group"
                >
                  <span className={isAr ? "font-arabic-body text-sm tracking-normal" : "font-english-body"}>
                    {t(link.key)}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.nav>
  );
}
