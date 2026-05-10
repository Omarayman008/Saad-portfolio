"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Mail, 
  Instagram, 
  Linkedin, 
  X, 
  MessageCircle, 
  ExternalLink, 
  Send, 
  ArrowUpRight,
  Phone,
  User,
  MessageSquare
} from "lucide-react";

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
      label: "Email", 
      value: "business@saadnejjai.com.tr", 
      href: "mailto:business@saadnejjai.com.tr", 
      icon: Mail
    },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden scroll-mt-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Info & Links */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <h2 className={cn("text-6xl md:text-7xl mb-10 leading-tight", isAr ? "font-arabic-hero" : "font-english-hero")}>
              <span className="text-white">{t("contactTitle")}</span>
              <br />
              <span className="text-gold">{t("contactSubtitle")}</span>
            </h2>
            
            <p className={cn("text-xl text-text-secondary max-w-md mb-12", isAr ? "font-arabic-body" : "font-english-body")}>
              {t("contactDesc")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col p-6 rounded-2xl bg-secondary/50 border border-white/5 hover:border-gold/30 transition-all duration-300 group"
                >
                  <link.icon size={20} className="text-gold mb-4" />
                  <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">{link.label}</p>
                  <p className="text-white text-sm font-bold truncate">{link.value}</p>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Modern Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 bg-secondary/30 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden"
          >
            <div className="relative z-10">
              <h3 className={cn("text-3xl md:text-4xl text-white mb-8", isAr ? "font-arabic-hero" : "font-english-hero")}>
                {isAr ? "ابدأ مشروعك الآن" : "Start Your Project"}
              </h3>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/40 ml-2">{isAr ? "الاسم" : "Full Name"}</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                      <input 
                        type="text" 
                        placeholder={isAr ? "سعد محمد" : "John Doe"}
                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/40 ml-2">{isAr ? "رقم الهاتف" : "Phone Number"}</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                      <input 
                        type="tel" 
                        placeholder="+966 5..."
                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/40 ml-2">{isAr ? "رسالتك" : "Your Message"}</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-6 text-white/20" size={18} />
                    <textarea 
                      rows={4}
                      placeholder={isAr ? "اكتب تفاصيل مشروعك هنا..." : "Tell me about your project..."}
                      className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-gold/50 transition-colors resize-none"
                    ></textarea>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gold text-primary py-5 rounded-2xl font-bold text-lg uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(255,200,61,0.2)] hover:shadow-[0_20px_60px_rgba(255,200,61,0.3)] transition-all"
                >
                  {isAr ? "إرسال الطلب" : "Send Request"}
                  <Send size={20} />
                </motion.button>
              </form>
            </div>

            {/* Decorative background for the form */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[100px] -mr-32 -mt-32" />
          </motion.div>
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
