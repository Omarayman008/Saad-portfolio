"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function About() {
  const { language, t } = useLanguage();
  const isAr = language === "ar";

  const stats = [
    { label: t("yearsExp"), value: "7+" },
    { label: t("projectsDone"), value: "150+" },
    { label: t("happyClients"), value: "80+" },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden scroll-mt-20">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] z-0" />
      
      <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className={cn("text-5xl md:text-6xl mb-10", isAr ? "font-arabic-hero" : "font-english-hero")}>
            <span className="text-gold-gradient block mb-4">
              {t("aboutTitle")}
            </span>
            {t("aboutSubtitle")}
          </h2>
          
          <p className={cn("text-xl text-text-secondary leading-relaxed mb-16 mx-auto", isAr ? "font-arabic-body" : "font-english-body")}>
            {t("aboutDesc")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + idx * 0.1, duration: 0.8 }}
                className="glass-card p-10 flex flex-col items-center justify-center text-center group cursor-default"
              >
                <div className="text-5xl md:text-6xl font-bold text-white mb-4 group-hover:scale-110 transition-transform duration-500">{stat.value}</div>
                <div className={cn("text-sm text-white/50 uppercase tracking-[0.3em] group-hover:text-white transition-colors duration-300", isAr ? "font-arabic-body" : "font-english-body")}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
