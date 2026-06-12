"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Sparkles, 
  Fingerprint, 
  Layers, 
  Target, 
  BookOpen, 
  Video,
  ArrowUpRight
} from "lucide-react";

export default function Services() {
  const { language, t } = useLanguage();
  const isAr = language === "ar";

  const services = [
    { 
      title: isAr ? "بناء العلامات التجارية" : "Branding", 
      desc: isAr ? "تصميم هويات تجارية قوية تترك انطباعاً لا ينسى." : "Designing strong brand identities that leave an unforgettable impression.",
      icon: Sparkles
    },
    { 
      title: isAr ? "الهوية البصرية" : "Visual Identity", 
      desc: isAr ? "خلق نظام بصري متكامل يعبر عن قيم مشروعك." : "Creating an integrated visual system that expresses your project values.",
      icon: Fingerprint
    },
    { 
      title: isAr ? "السوشيال ميديا" : "Social Media", 
      desc: isAr ? "تصاميم مبتكرة تجذب جمهورك على كافة المنصات." : "Innovative designs that attract your audience on all platforms.",
      icon: Layers
    },
    { 
      title: isAr ? "الإعلانات" : "Advertising", 
      desc: isAr ? "حملات إعلانية احترافية تهدف لزيادة المبيعات." : "Professional advertising campaigns aimed at increasing sales.",
      icon: Target
    },
    { 
      title: isAr ? "أغلفة الكتب" : "Book Covers", 
      desc: isAr ? "تصاميم أغلفة تحكي قصة الكتاب قبل فتحه." : "Cover designs that tell the book's story before it's opened.",
      icon: BookOpen
    },
    { 
      title: isAr ? "المونتاج والإيديت" : "Montage & Edit", 
      desc: isAr ? "تحرير الفيديوهات والمونتاج باحترافية عالية تليق بمحتواك." : "Video editing and montage with high professionalism suitable for your content.",
      icon: Video
    },
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden scroll-mt-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: isAr ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h2 className={cn("text-5xl md:text-7xl mb-8", isAr ? "font-arabic-hero" : "font-english-hero")}>
              <div className="text-gold-gradient mb-4">{t("servicesTitle")}</div>
              <div className="text-white/20 tracking-tighter uppercase text-3xl md:text-5xl">{t("servicesDesc")}</div>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 md:gap-8 auto-rows-[300px]">  
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className={cn(
                "bento-card glass-card-hover p-10 group flex flex-col cursor-pointer",
                idx === 0 ? "md:col-span-3 lg:col-span-6" : 
                idx === 1 ? "md:col-span-3 lg:col-span-6" : 
                idx === 5 ? "md:col-span-6 lg:col-span-12" :
                "md:col-span-2 lg:col-span-4"
              )}
            >
              <div className="flex justify-between items-start mb-auto">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-gold group-hover:text-black transition-all duration-500">
                  <service.icon size={28} />
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <ArrowUpRight size={24} className="text-gold" />
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className={cn("text-2xl font-bold text-white mb-3", isAr ? "font-arabic-hero" : "font-english-hero")}>
                  {service.title}
                </h4>
                <p className={cn("text-text-secondary text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500", isAr ? "font-arabic-body" : "font-english-body")}>
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
