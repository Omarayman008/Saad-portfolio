"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "ar" | "en" | "tr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ar: {
    home: "الرئيسية",
    about: "من أنا",
    services: "خدماتي",
    portfolio: "أعمالي",
    contact: "تواصل معي",
    viewWork: "أعمالي",
    tagline: "نصنع الإبداع ليميزك",
    subTagline: "سعد نجاعي\u200c، مصمم جرافيك وصانع محتوى بصري متخصص في بناء الهويات القوية، المونتاج الإبداعي، وتحويل الأفكار إلى مشاريع بصرية متكاملة.",
    scrollDown: "اكتشف المزيد",
    designerTitle: "مصمم ومحرر فيديو محترف",
    aboutTitle: "من أنا",
    aboutSubtitle: "رؤية فنية تتجاوز حدود التصميم",
    aboutDesc: "أنا سعد نجاعي\u200c، مصمم جرافيك ومنتج محتوى بصري. لا يقتصر عملي على التصميم فحسب، بل أسعى لبناء تجارب إبداعية شاملة تربط الجمال بالقصة المؤثرة، من خلال دمج فنون التصميم الجرافيكي مع المونتاج السينمائي.",
    yearsExp: "سنوات خبرة",
    projectsDone: "مشروع مكتمل",
    happyClients: "عميل سعيد",
    servicesTitle: "خدماتي",
    servicesDesc: "أقدم حلولاً إبداعية متكاملة تشمل التصميم، المونتاج، وبناء الهوية البصرية",
    portfolioTitle: "معرض أعمالي",
    contactTitle: "هل لديك مشروع؟",
    contactSubtitle: "لنحول خيالك إلى واقع",
    contactDesc: "متاح دائماً لمناقشة الأفكار الجديدة والمشاريع الإبداعية. تواصل معي عبر المنصات التالية:",
    copyright: "© All Rights Reserved to Saad Nejjai",
  },
  en: {
    home: "Home",
    about: "About",
    services: "Services",
    portfolio: "Portfolio",
    contact: "Contact",
    viewWork: "Portfolio",
    tagline: "Crafting Creative Excellence",
    subTagline: "Saad Nejjai, Graphic Designer and Visual Storyteller specialized in branding, creative video editing, and turning ideas into integrated visual projects.",
    scrollDown: "Discover more",
    designerTitle: "Pro Designer & Video Editor",
    aboutTitle: "About Me",
    aboutSubtitle: "Artistic Vision Beyond Design",
    aboutDesc: "I am Saad Nejjai, a graphic designer and visual content creator. My work goes beyond just design; I strive to build comprehensive creative experiences that connect beauty with powerful storytelling, merging graphic arts with cinematic editing.",
    yearsExp: "Years Experience",
    projectsDone: "Projects Completed",
    happyClients: "Happy Clients",
    servicesTitle: "My Services",
    servicesDesc: "I offer integrated creative solutions including design, video editing, and branding",
    portfolioTitle: "My Portfolio",
    contactTitle: "Have a Project?",
    contactSubtitle: "Let's Build Something Great",
    contactDesc: "Always available to discuss new ideas and creative projects. Contact me via the following platforms:",
    copyright: "© All Rights Reserved to Saad Nejjai",
  },
  tr: {
    home: "Ana Sayfa",
    about: "Hakkımda",
    services: "Hizmetler",
    portfolio: "Portföy",
    contact: "İletişim",
    viewWork: "Portföyüm",
    tagline: "Yaratıcılığın Sınırlarını Zorluyoruz",
    subTagline: "Saad Nejjai, marka kimliği, yaratıcı video kurgu ve fikirleri bütünleşik görsel projelere dönüştürme konusunda uzmanlaşmış Grafik Tasarımcı ve Görsel Hikaye Anlatıcısı.",
    scrollDown: "Daha fazlasını keşfet",
    designerTitle: "Profesyonel Tasarımcı ve Editör",
    aboutTitle: "Hakkımda",
    aboutSubtitle: "Tasarımın Ötesinde Sanatsal Vizyon",
    aboutDesc: "Ben Saad Nejjai, grafik tasarımcı ve görsel içerik üreticisiyim. İşim sadece tasarımdan ibaret değil; grafik sanatlarını sinematik kurguyla birleştirerek güzelliği güçlü hikaye anlatımıyla bağlayan kapsamlı yaratıcı deneyimler inşa etmeye çalışıyorum.",
    yearsExp: "Yıllık Deneyim",
    projectsDone: "Tamamlanan Proje",
    happyClients: "Mutlu Müşteri",
    servicesTitle: "Hizmetlerim",
    servicesDesc: "Tasarım, video kurgu ve markalama dahil bütünleşik yaratıcı çözümler sunuyorum",
    portfolioTitle: "Portföyüm",
    contactTitle: "Bir Projeniz mi Var?",
    contactSubtitle: "Hayallerinizi Gerçeğe Dönüştürelim",
    contactDesc: "Yeni fikirleri ve yaratıcı projeleri tartışmak için her zaman hazırım. Benimle aşağıdaki platformlar üzerinden iletişime geçebilirsiniz:",
    copyright: "© All Rights Reserved to Saad Nejjai",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("ar");

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations["en"]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
