"use client";

import { useState } from "react";
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
  Phone,
  User,
  MessageSquare
} from "lucide-react";

export default function Contact() {
  const { language, t } = useLanguage();
  const isAr = language === "ar";
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });

  const contactLinks = [
    { 
      label: "LinkedIn", 
      value: "Saad Nejjai", 
      href: "https://www.linkedin.com/in/saad-nejjai-453410402", 
      icon: Linkedin
    },
    { 
      label: "X (Twitter)", 
      value: "@SaadNejjai", 
      href: "https://x.com/SaadNejjai", 
      icon: X
    },
    { 
      label: "Instagram", 
      value: "@saadnejjjai", 
      href: "https://www.instagram.com/saadnejjjai", 
      icon: Instagram
    },
    { 
      label: "Behance", 
      value: "behance.net/SaadNejjai", 
      href: "https://www.behance.net/SaadNejjai", 
      icon: ExternalLink
    },
    { 
      label: "Email", 
      value: "work@saadnejjai.com.tr", 
      href: "mailto:work@saadnejjai.com.tr", 
      icon: Mail
    },
    { 
      label: "Discord", 
      value: "saadnejjai", 
      href: "https://discord.com/users/saadnejjai", 
      icon: MessageCircle
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = isAr ? `طلب مشروع جديد من: ${formData.name}` : `New Project Inquiry from: ${formData.name}`;
    const body = `${isAr ? "الاسم" : "Name"}: ${formData.name}%0D%0A` +
                 `${isAr ? "رقم الهاتف" : "Phone"}: ${formData.phone}%0D%0A%0D%0A` +
                 `${isAr ? "الرسالة" : "Message"}:%0D%0A${formData.message}`;
    
    const mailtoUrl = `mailto:work@saadnejjai.com.tr?subject=${encodeURIComponent(subject)}&body=${body}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden scroll-mt-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: isAr ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 bg-secondary/30 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[2.5rem] flex flex-col justify-between"
          >
            <div>
              <h3 className={cn("text-3xl md:text-5xl text-white mb-10", isAr ? "font-arabic-hero" : "font-english-hero")}>
                {isAr ? "ابدأ مشروعك الآن" : "Start Your Project"}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 ml-2">{isAr ? "الاسم" : "Full Name"}</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/10" size={18} />
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder={isAr ? "سعد محمد" : "John Doe"}
                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-gold/30 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 ml-2">{isAr ? "رقم الهاتف" : "Phone Number"}</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/10" size={18} />
                      <input 
                        required
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+966 5..."
                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-gold/30 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/30 ml-2">{isAr ? "رسالتك" : "Your Message"}</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-6 text-white/10" size={18} />
                    <textarea 
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder={isAr ? "اكتب تفاصيل مشروعك هنا..." : "Tell me about your project..."}
                      className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-gold/30 transition-colors resize-none"
                    ></textarea>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gold text-primary py-5 rounded-2xl font-bold text-lg uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-all"
                >
                  {isAr ? "إرسال الطلب" : "Send Request"}
                  <Send size={20} />
                </motion.button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isAr ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col justify-between py-4"
          >
            <div>
              <h2 className={cn("text-6xl md:text-7xl mb-6 leading-[1.1]", isAr ? "font-arabic-hero" : "font-english-hero")}>
                <span className="text-white">{t("contactTitle")}</span>
                <br />
                <span className="text-gold">{t("contactSubtitle")}</span>
              </h2>
              
              <p className={cn("text-lg text-text-secondary max-w-lg mb-10 opacity-60", isAr ? "font-arabic-body" : "font-english-body")}>
                {t("contactDesc")}
              </p>

              <div className="grid grid-cols-2 gap-4">
                {contactLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 p-5 rounded-2xl bg-secondary/20 border border-white/5 hover:border-gold/20 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                      <link.icon size={18} className="text-gold/60 group-hover:text-gold transition-colors" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-white/20 text-[9px] uppercase tracking-widest mb-0.5">{link.label}</p>
                      <p className="text-white text-xs font-bold truncate">{link.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/5 flex justify-center items-center">
          <p className={cn("text-text-secondary opacity-30 text-sm", isAr ? "font-arabic-body" : "font-english-body")}>
            Copyright © 2026 Saad Nejjai. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
