"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          onClick={scrollToTop}
          className="fixed bottom-10 left-10 z-[60] w-14 h-14 bg-gold text-primary rounded-full flex items-center justify-center shadow-[0_20px_40px_rgba(255,200,61,0.3)] hover:shadow-[0_20px_60px_rgba(255,200,61,0.5)] hover:-translate-y-2 transition-all duration-300 group"
        >
          <ArrowUp size={24} className="group-hover:animate-bounce" />
          <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
