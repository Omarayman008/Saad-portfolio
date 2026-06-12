"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowDownRight } from "lucide-react";
import Image from "next/image";

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
    hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
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
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          {/* Logo Replacement for Name */}
          <motion.div 
            variants={itemVariants}
            className="mb-12"
          >
            <Image 
              src="/images/local_cache/gfGxLxQ.png" 
              alt="Saad Nejjai Logo" 
              width={800}
              height={400}
              className="w-full max-w-[300px] md:max-w-[500px] h-auto object-contain drop-shadow-[0_0_50px_rgba(255,200,61,0.2)]"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-10">
            <h2 className={cn("text-4xl md:text-7xl text-text-primary", titleFont)}>
              {t("tagline")}
            </h2>
            <p className={cn("text-lg md:text-xl text-text-secondary max-w-2xl mx-auto opacity-70", bodyFont)}>
              {t("subTagline")}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-16">
            <motion.a 
              href="#portfolio" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "group relative px-14 py-6 bg-gold text-primary overflow-hidden transition-all duration-500 rounded-full shadow-[0_0_30px_rgba(255,200,61,0.2)] hover:shadow-[0_0_60px_rgba(255,200,61,0.4)]",
                bodyFont,
                "text-xl font-bold uppercase tracking-widest flex items-center gap-4"
              )}
            >
              <span className="relative z-10">{t("viewWork")}</span>
              <ArrowDownRight size={24} className="relative z-10" />
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>


    </section>
  );
}
