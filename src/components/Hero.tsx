"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowDownRight } from "lucide-react";

export default function Hero() {
  const { language, t } = useLanguage();

  const isAr = language === "ar";
  const titleFont = isAr ? "font-arabic-hero" : "font-english-hero";
  const bodyFont = isAr ? "font-arabic-body" : "font-english-body";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 100, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    },
  } as const;

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden glow-mesh">
      {/* Inflated Floating Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gold/5 rounded-full blur-[120px] animate-float-slow" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px] animate-float-slow [animation-delay:2s]" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-20 pt-32 pb-20 flex flex-col items-center text-center">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
            <motion.img 
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              src="https://imgur.com/gfGxLxQ.png" 
              alt="Saad Nejjai Logo" 
              className="h-32 md:h-48 w-auto object-contain drop-shadow-[0_0_30px_rgba(210,180,140,0.2)]"
            />
            
            <h1 className={cn(
              "text-6xl md:text-8xl lg:text-[9rem] leading-[1.1] tracking-tighter flex flex-wrap justify-center gap-x-6",
              titleFont
            )}>
              <motion.span
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-text-primary"
              >
                {isAr ? "سعد " : "Saad "}
              </motion.span>
              <motion.span
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-gold-gradient relative"
              >
                {isAr ? "نجاعي" : "Nejjai"}
              </motion.span>
            </h1>
          </div>

          <motion.div variants={itemVariants} className="max-w-2xl mx-auto relative">
            <p className={cn("text-2xl md:text-4xl text-text-primary mb-6", titleFont)}>
              {t("tagline")}
            </p>
            <p className={cn("text-lg md:text-xl text-text-secondary leading-relaxed mb-16", bodyFont)}>
              {t("subTagline")}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-8 justify-center items-center mt-8">
            <motion.a 
              href="#portfolio" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "group relative px-12 py-5 bg-gold text-primary overflow-hidden transition-all duration-500 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] pill-glow",
                bodyFont,
                "text-lg font-bold uppercase tracking-widest"
              )}
            >
              <span className="relative z-10 flex items-center gap-4">
                {t("viewWork")}
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="bg-primary/10 rounded-full p-1"
                >
                  <ArrowDownRight size={20} />
                </motion.span>
              </span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "100%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute top-0 right-10 w-[1px] bg-gradient-to-b from-transparent via-gold/20 to-transparent hidden lg:block"
      />
    </section>
  );
}
