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
    tagline: "تصاميم تعكس هويتك",
    subTagline: "سعد نجاعي، مصمم جرافيك متخصص في بناء الهويات البصرية القوية، الحملات الإعلانية، تصميم الشعارات، وأغلفة الكتب.",
    scrollDown: "اكتشف المزيد",
    designerTitle: "مصمم جرافيك ممتاز",
    aboutTitle: "من أنا",
    aboutSubtitle: "شغف التصميم يلتقي بالاحترافية",
    aboutDesc: "أنا سعد نجاعي، مصمم جرافيك متخصص في تحويل الأفكار إلى هويات بصرية مذهلة. أؤمن أن كل علامة تجارية لها قصة فريدة تستحق أن تُروى من خلال تصميم استثنائي يجمع بين الجمال والوظيفة.",
    yearsExp: "سنوات خبرة",
    projectsDone: "مشروع مكتمل",
    happyClients: "عميل سعيد",
    servicesTitle: "خدماتي",
    servicesDesc: "أقدم حلولاً تصميمية متكاملة تهدف إلى رفع قيمة علامتك التجارية",
    portfolioTitle: "معرض أعمالي",
    contactTitle: "هل لديك مشروع؟",
    contactSubtitle: "لنبدأ العمل معاً",
    contactDesc: "متاح دائماً لمناقشة الأفكار الجديدة والمشاريع الإبداعية. تواصل معي عبر المنصات التالية:",
    copyright: "All Rights Reserved to Saad Nejjai",
  },
  en: {
    home: "Home",
    about: "About",
    services: "Services",
    portfolio: "Portfolio",
    contact: "Contact",
    viewWork: "Portfolio",
    tagline: "Designs that define you",
    subTagline: "Saad Nejjai, graphic designer specializing in strong visual identities, advertising campaigns, logo design, and book covers.",
    scrollDown: "Discover more",
    designerTitle: "Premium Graphic Designer",
    aboutTitle: "About Me",
    aboutSubtitle: "Design Passion Meets Professionalism",
    aboutDesc: "I am Saad Nejjai, a graphic designer dedicated to turning ideas into stunning visual identities. I believe every brand has a unique story that deserves to be told through exceptional design that combines beauty and function.",
    yearsExp: "Years Experience",
    projectsDone: "Projects Completed",
    happyClients: "Happy Clients",
    servicesTitle: "My Services",
    servicesDesc: "I offer integrated design solutions aimed at elevating your brand value",
    portfolioTitle: "My Portfolio",
    contactTitle: "Have a Project?",
    contactSubtitle: "Let's Work Together",
    contactDesc: "Always available to discuss new ideas and creative projects. Contact me via the following platforms:",
    copyright: "All Rights Reserved to Saad Nejjai",
  },
  tr: {
    home: "Ana Sayfa",
    about: "Hakkımda",
    services: "Hizmetler",
    portfolio: "Portföy",
    contact: "İletişim",
    viewWork: "Portföyüm",
    tagline: "Sizi tanımlayan tasarımlar",
    subTagline: "Saad Nejjai, güçlü görsel kimlikler, reklam kampanyaları, logo tasarımı ve kitap kapakları konusunda uzmanlaşmış grafik tasarımcı.",
    scrollDown: "Daha fazlasını keşfet",
    designerTitle: "Premium Grafik Tasarımcı",
    aboutTitle: "Hakkımda",
    aboutSubtitle: "Tasarım Tutkusu Profesyonellikle Buluşuyor",
    aboutDesc: "Ben Saad Nejjai, fikirleri çarpıcı görsel kimliklere dönüştürmeye adanmış bir grafik tasarımcıyım. Her markanın, güzellik ve işlevselliği birleştiren olağanüstü bir tasarımla anlatılmayı hak eden benzersiz bir hikayesi olduğuna inanıyorum.",
    yearsExp: "Yıllık Deneyim",
    projectsDone: "Tamamlanan Proje",
    happyClients: "Mutlu Müşteri",
    servicesTitle: "Hizmetlerim",
    servicesDesc: "Marka değerinizi yükseltmeyi amaçlayan entegre tasarım çözümleri sunuyorum",
    portfolioTitle: "Portföyüm",
    contactTitle: "Bir Projeniz mi Var?",
    contactSubtitle: "Birlikte Çalışalım",
    contactDesc: "Yeni fikirleri ve yaratıcı projeleri tartışmak için her zaman hazırım. Benimle aşağıdaki platformlar üzerinden iletişime geçebilirsiniz:",
    copyright: "All Rights Reserved to Saad Nejjai",
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
