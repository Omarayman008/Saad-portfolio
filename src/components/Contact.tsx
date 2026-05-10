"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Mail, Instagram, Linkedin, X, MessageCircle, ExternalLink, Send, ArrowUpRight } from "lucide-react";

export default function Contact() {
  const { language, t } = useLanguage();
  const isAr = language === "ar";

  const contactLinks = [
    { 
      label: "Behance", 
      value: "behance.net/SaadNejjai", 
      href: "https://www.behance.net/SaadNejjai", 
      icon: ExternalLink
    },
    { 
      label: "Instagram", 
      value: "@saadnejjjai", 
      href: "https://www.instagram.com/saadnejjjai", 
      icon: Instagram
    },
    { 
      label: "Discord", 
      value: "saadnejjai", 
      href: "https://discord.com/users/saadnejjai", 
      icon: MessageCircle
    },
    { 
      label: "X / Twitter", 
      value: "@saadnejjai", 
      href: "https://x.com/saadnejjai", 
      icon: X
    },
    { 
      label: "LinkedIn", 
      value: "Saad Nejjai", 
      href: "https://www.linkedin.com/in/saad-nejjai-453410402/", 
      icon: Linkedin
    },
    { 
      label: "Email", 
      value: "business@saadnejjai.com.tr", 
      href: "mailto:business@saadnejjai.com.tr", 
      icon: Mail
    },
  ];

  const teaserText = {
    ar: "ترقبوا انطلاق HighCoers قريباً.. آفاق جديدة من الحلول المتكاملة والابتكار الرقمي الذي يتجاوز حدود التصميم.",
    en: "Stay tuned for the launch of HighCoers soon.. New horizons of integrated solutions and digital innovation that go beyond design.",
    tr: "HighCoers yakında yayında.. Tasarımın ötesine geçen entegre çözümler ve dijital inovasyonda yeni ufuklar.",
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden scroll-mt-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: isAr ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className={cn("text-6xl md:text-8xl mb-10 leading-tight", isAr ? "font-arabic-hero" : "font-english-hero")}>
              <span className="text-white">{t("contactTitle")}</span>
              <br />
              <span className="text-white/30">{t("contactSubtitle")}</span>
            </h2>
            
            <p className={cn("text-xl text-text-secondary max-w-md mb-12", isAr ? "font-arabic-body" : "font-english-body")}>
              {t("contactDesc")}
            </p>

            {/* HighCoers Teaser */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-[#1e1e1e] border border-gold/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Send size={80} />
              </div>
              <h4 className="text-white text-3xl mb-4 font-bold tracking-tighter">
                HighCoers
              </h4>
              <p className={cn("text-text-secondary leading-relaxed", isAr ? "font-arabic-body" : "font-english-body")}>
                {teaserText[language]}
              </p>
              <div className="mt-6 flex items-center gap-2 text-gold font-bold text-sm tracking-widest uppercase">
                {isAr ? "قريباً" : "Coming Soon"} <ArrowUpRight size={16} />
              </div>
            </motion.div>
          </motion.div>

          <div className="space-y-4">
            {contactLinks.map((link, idx) => (
              <motion.a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={cn(
                  "flex items-center justify-between p-8 rounded-3xl bg-[#1e1e1e]/50 border border-white/5 transition-all duration-500 group overflow-hidden relative hover:bg-gold/5 hover:border-gold/20"
                )}
              >
                <div className="flex items-center gap-6 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-gold group-hover:text-black transition-all duration-500">
                    <link.icon size={24} />
                  </div>
                  <div>
                    <p className="text-white/20 text-xs uppercase tracking-[0.2em] font-bold mb-1 group-hover:text-gold/50 transition-colors">{link.label}</p>
                    <p className={cn("text-white/80 group-hover:text-white text-xl font-bold transition-colors", isAr ? "font-arabic-body" : "font-english-body")}>{link.value}</p>
                  </div>
                </div>
                <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                  <ArrowUpRight size={32} className="text-gold" />
                </div>
                
                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className={cn("text-text-secondary opacity-50", isAr ? "font-arabic-body" : "font-english-body")}>
            Copyright © 2026 Saad Nejjai. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs uppercase tracking-[0.3em] font-bold text-white/30">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </section>
  );
}
