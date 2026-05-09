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
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, x: isAr ? 50 : -50, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      x: 0, 
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    },
  } as const;

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden glow-mesh">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gold/5 rounded-full blur-[120px] animate-float-slow z-0" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px] animate-float-slow [animation-delay:2s] z-0" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-20 pt-32 pb-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center"
        >
          {/* Left Column: Logo (Parallel to text height) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, x: -50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center lg:justify-start order-2 lg:order-1"
          >
            <img 
              src="https://imgur.com/gfGxLxQ.png" 
              alt="Saad Nejjai Logo" 
              className="w-full max-w-[300px] md:max-w-[450px] lg:max-w-full h-auto object-contain drop-shadow-[0_0_50px_rgba(210,180,140,0.15)]"
            />
          </motion.div>

          {/* Right Column: Text Content (Right Aligned) */}
          <div className="flex flex-col items-center lg:items-end text-center lg:text-right order-1 lg:order-2">
            <motion.h1 
              variants={itemVariants}
              className={cn(
                "text-7xl md:text-8xl lg:text-[11rem] leading-[0.9] tracking-tighter mb-4",
                titleFont
              )}
            >
              <div className="text-text-primary mb-2">
                {isAr ? "سعد" : "Saad"}
              </div>
              <div className="text-gold-gradient">
                {isAr ? "نجاعي" : "Nejjai"}
              </div>
            </motion.h1>

            <motion.div variants={itemVariants} className="mt-8 space-y-6">
              <p className={cn("text-3xl md:text-5xl text-text-primary font-medium", titleFont)}>
                {t("tagline")}
              </p>
              <p className={cn("text-lg md:text-2xl text-text-secondary leading-relaxed max-w-xl lg:ml-auto", bodyFont)}>
                {t("subTagline")}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-12">
              <motion.a 
                href="#portfolio" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "group relative px-14 py-6 bg-gold text-primary overflow-hidden transition-all duration-500 rounded-full shadow-[0_0_30px_rgba(210,180,140,0.2)] hover:shadow-[0_0_60px_rgba(210,180,140,0.4)]",
                  bodyFont,
                  "text-xl font-bold uppercase tracking-widest flex items-center gap-4"
                )}
              >
                <span className="relative z-10">{t("viewWork")}</span>
                <ArrowDownRight size={24} className="relative z-10" />
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "100%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute top-0 left-10 w-[1px] bg-gradient-to-b from-transparent via-gold/20 to-transparent hidden lg:block"
      />
    </section>
  );
}
