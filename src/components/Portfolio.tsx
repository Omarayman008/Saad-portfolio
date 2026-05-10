"use client";

import { useState, useEffect, Suspense } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X as CloseIcon, Plus, ArrowLeft, Maximize2, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { useSearchParams } from "next/navigation";

const INITIAL_CATEGORIES = {
  ar: [
    { id: "logos", label: "شعارات" },
    { id: "book-covers", label: "أغلفة كتب" },
    { id: "carousel", label: "كاروسيل" },
  ],
  en: [
    { id: "logos", label: "Logos" },
    { id: "book-covers", label: "Book Covers" },
    { id: "carousel", label: "Carousel" },
  ],
  tr: [
    { id: "logos", label: "Logolar" },
    { id: "book-covers", label: "Kitap Kapakları" },
    { id: "carousel", label: "Karayel" },
  ]
};

const INITIAL_PROJECTS = [
  // LOGOS
  { id: "l1", category: "logos", title: "Logo 1", img: "https://imgur.com/lZTassL.png" },
  { id: "l2", category: "logos", title: "Logo 2", img: "https://imgur.com/KM6knMY.png" },
  { id: "l3", category: "logos", title: "Logo 3", img: "https://imgur.com/A7CY9n3.png" },
  { id: "ld1", category: "logos", isDivider: true, label: { ar: "مجموعة جديدة", en: "New Collection", tr: "Yeni Koleksiyon" } },
  { id: "l4", category: "logos", title: "Logo 4", img: "https://imgur.com/dYp5qH5.png" },
  { id: "l5", category: "logos", title: "Logo 5", img: "https://imgur.com/lccptZZ.png" },
  { id: "l6", category: "logos", title: "Logo 6", img: "https://imgur.com/aERzg4K.png" },
  { id: "l7", category: "logos", title: "Logo 7", img: "https://imgur.com/CKlAFIw.png" },
  { id: "ld2", category: "logos", isDivider: true, label: { ar: "مجموعة جديدة", en: "New Collection", tr: "Yeni Koleksiyon" } },
  { id: "l8", category: "logos", title: "Logo 8", img: "https://imgur.com/ltortDs.png" },
  { id: "l9", category: "logos", title: "Logo 9", img: "https://imgur.com/QXUmR11.png" },

  // BOOK COVERS (19)
  { id: "bc1", category: "book-covers", title: "Cover 1", img: "https://imgur.com/DuWQXny.png" },
  { id: "bc2", category: "book-covers", title: "Cover 2", img: "https://imgur.com/AP6R51v.png" },
  { id: "bc3", category: "book-covers", title: "Cover 3", img: "https://imgur.com/CgGUsGb.png" },
  { id: "bc4", category: "book-covers", title: "Cover 4", img: "https://imgur.com/cdB99kB.png" },
  { id: "bc5", category: "book-covers", title: "Cover 5", img: "https://imgur.com/kvkLOKE.png" },
  { id: "bc6", category: "book-covers", title: "Cover 6", img: "https://imgur.com/IG1Khm0.png" },
  { id: "bc7", category: "book-covers", title: "Cover 7", img: "https://imgur.com/NeeDDTD.png" },
  { id: "bc8", category: "book-covers", title: "Cover 8", img: "https://imgur.com/HI2KDwR.png" },
  { id: "bc9", category: "book-covers", title: "Cover 9", img: "https://imgur.com/WeB93rC.png" },
  { id: "bc10", category: "book-covers", title: "Cover 10", img: "https://imgur.com/sm7HiVg.png" },
  { id: "bc11", category: "book-covers", title: "Cover 11", img: "https://imgur.com/8WO2GAz.png" },
  { id: "bc12", category: "book-covers", title: "Cover 12", img: "https://imgur.com/yJJmO27.png" },
  { id: "bc13", category: "book-covers", title: "Cover 13", img: "https://imgur.com/DmcVlwZ.png" },
  { id: "bc14", category: "book-covers", title: "Cover 14", img: "https://imgur.com/v2ZgTSx.png" },
  { id: "bc15", category: "book-covers", title: "Cover 15", img: "https://imgur.com/MXdTLyi.png" },
  { id: "bc16", category: "book-covers", title: "Cover 16", img: "https://imgur.com/tgN2AdH.png" },
  { id: "bc17", category: "book-covers", title: "Cover 17", img: "https://imgur.com/kI0Yq4B.png" },
  { id: "bc18", category: "book-covers", title: "Cover 18", img: "https://imgur.com/hYPIwAR.png" },
  { id: "bc19", category: "book-covers", title: "Cover 19", img: "https://imgur.com/IK3bhtI.png" },

  // CAROUSEL
  { id: "c1", category: "carousel", title: "Carousel 1", img: "https://imgur.com/qiM7WEO.png" },
  { id: "c2", category: "carousel", title: "Carousel 2", img: "https://imgur.com/SQGx6Lv.png" },
  { id: "c3", category: "carousel", title: "Carousel 3", img: "https://imgur.com/YxADID0.png" },
  { id: "c4", category: "carousel", title: "Carousel 4", img: "https://imgur.com/ZN4qwmi.png" },
  { id: "c5", category: "carousel", title: "Carousel 5", img: "https://imgur.com/qt3iAg7.png" },
  { id: "c6", category: "carousel", title: "Carousel 6", img: "https://imgur.com/9LiMrz7.png" },
  { id: "c7", category: "carousel", title: "Carousel 7", img: "https://imgur.com/F2BsO3S.png" },
  { id: "c8", category: "carousel", title: "Carousel 8", img: "https://imgur.com/U9Rum8b.png" },
  { id: "c9", category: "carousel", title: "Carousel 9", img: "https://imgur.com/4x6pA97.png" },
  { id: "cd1", category: "carousel", isDivider: true, label: { ar: "مجموعة أخرى", en: "Other Collection", tr: "Diğer Koleksiyon" } },
  { id: "c10", category: "carousel", title: "Carousel 10", img: "https://imgur.com/K8FB51h.png" },
  { id: "c11", category: "carousel", title: "Carousel 11", img: "https://imgur.com/pQ4ghoV.png" },
  { id: "c12", category: "carousel", title: "Carousel 12", img: "https://imgur.com/fFlhhUC.png" },
  { id: "c13", category: "carousel", title: "Carousel 13", img: "https://imgur.com/Zi3hRjp.png" },
  { id: "c14", category: "carousel", title: "Carousel 14", img: "https://imgur.com/nz7daqU.png" },
  { id: "c15", category: "carousel", title: "Carousel 15", img: "https://imgur.com/U0EME14.png" },
  { id: "cd2", category: "carousel", isDivider: true, label: { ar: "نمط مختلف", en: "Different Style", tr: "Farklı Stil" } },
  { id: "c16", category: "carousel", title: "Carousel 16", img: "https://imgur.com/seObq5A.png" },
  { id: "c17", category: "carousel", title: "Carousel 17", img: "https://imgur.com/IApo8yZ.png" },
  { id: "c18", category: "carousel", title: "Carousel 18", img: "https://imgur.com/gmabcrW.png" },
  { id: "c19", category: "carousel", title: "Carousel 19", img: "https://imgur.com/YjQglIp.png" },
  { id: "c20", category: "carousel", title: "Carousel 20", img: "https://imgur.com/1ERfczN.png" },
  { id: "c21", category: "carousel", title: "Carousel 21", img: "https://imgur.com/xGQz2cc.png" },
  { id: "c22", category: "carousel", title: "Carousel 22", img: "https://imgur.com/EhLHXkf.png" },
  { id: "cd3", category: "carousel", isDivider: true, label: { ar: "مجموعة جديدة", en: "New Group", tr: "Yeni Grup" } },
  { id: "c23", category: "carousel", title: "Carousel 23", img: "https://imgur.com/1Ers5v6.png" },
  { id: "c24", category: "carousel", title: "Carousel 24", img: "https://imgur.com/aFt1LCL.png" },
  { id: "c25", category: "carousel", title: "Carousel 25", img: "https://imgur.com/2OA4ViR.png" },
  { id: "c26", category: "carousel", title: "Carousel 26", img: "https://imgur.com/6vjo0Fr.png" },
  { id: "c27", category: "carousel", title: "Carousel 27", img: "https://imgur.com/tIISc2k.png" },
  { id: "c28", category: "carousel", title: "Carousel 28", img: "https://imgur.com/gW4SjcN.png" },
];

function FolderIcon({ label, previewImgs, isAr }: { label: string, previewImgs: string[], isAr: boolean }) {
  return (
    <div className="flex flex-col items-center gap-8 w-64 md:w-80 group cursor-pointer">
      <div className="relative w-full aspect-[16/10]">
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-[85%] h-[85%] bg-[#1a1a1a] border border-white/5 rounded-2xl shadow-2xl transition-all duration-700 group-hover:-translate-y-12 group-hover:-rotate-6 group-hover:scale-105 overflow-hidden">
                <img src={previewImgs[2] || previewImgs[0]} className="w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity" />
            </div>
            <div className="absolute w-[90%] h-[90%] bg-[#262626] border border-white/10 rounded-2xl shadow-2xl transition-all duration-500 group-hover:-translate-y-8 group-hover:rotate-3 group-hover:scale-105 overflow-hidden">
                <img src={previewImgs[1] || previewImgs[0]} className="w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-opacity" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#d2b48c]/10 to-[#d2b48c]/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:border-gold/30 flex flex-col justify-end p-6 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                    <div className="w-12 h-1 bg-gold/30 rounded-full mb-4 group-hover:w-20 transition-all duration-700" />
                    <h4 className={cn("text-white font-bold text-2xl tracking-tighter opacity-80 group-hover:opacity-100 transition-opacity", isAr ? "font-arabic-body" : "font-english-body")}>
                        {label}
                    </h4>
                </div>
                <div className="absolute top-0 left-0 w-full h-full -z-10">
                    <img src={previewImgs[0]} className="w-full h-full object-cover opacity-5 group-hover:opacity-20 transition-opacity duration-1000 scale-110 group-hover:scale-100" />
                </div>
            </div>
        </div>
        <div className="absolute inset-0 bg-gold/5 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-20" />
      </div>
    </div>
  );
}

function PortfolioContent() {
  const { language, t } = useLanguage();
  const isAr = language === "ar";
  
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  
  const [categories] = useState(INITIAL_CATEGORIES);
  const [projects] = useState(INITIAL_PROJECTS);

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleResetZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(1);
  };

  useEffect(() => {
    if (!selectedImg) setScale(1);
  }, [selectedImg]);

  const currentCategories = categories[language] || categories.en;
  const filteredProjects = activeCategory 
    ? projects.filter(p => p.category === activeCategory)
    : [];

  return (
    <section id="portfolio" className="py-24 relative min-h-[800px] scroll-mt-20">
      <div className="container mx-auto px-6 md:px-12">
        <AnimatePresence mode="wait">
          {!activeCategory ? (
            <motion.div
              key="folders"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-center"
            >
              <h2 className={cn("text-5xl md:text-7xl mb-32", isAr ? "font-arabic-hero" : "font-english-hero")}>
                <span className="text-gold-gradient">{t("portfolioTitle")}</span>
              </h2>
              
              <div className="flex flex-wrap justify-center gap-16 md:gap-24">
                {currentCategories.map((cat) => {
                  const preview = projects
                    .filter(p => p.category === cat.id && !p.isDivider)
                    .slice(0, 3)
                    .map(p => p.img!);
                  return (
                    <motion.button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      whileHover={{ y: -10 }}
                      className="focus:outline-none"
                    >
                      <FolderIcon 
                        label={cat.label} 
                        previewImgs={preview}
                        isAr={isAr}
                      />
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="projects"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.6, ease: "circOut" }}
            >
              <div className="flex items-center justify-between mb-16 border-b border-gold/5 pb-8">
                <button 
                  onClick={() => setActiveCategory(null)}
                  className="flex items-center gap-4 text-text-secondary hover:text-gold transition-all group"
                >
                  <div className="w-12 h-12 rounded-full border border-gold/10 flex items-center justify-center group-hover:border-gold group-hover:bg-gold group-hover:text-black transition-all">
                    <ArrowLeft size={20} />
                  </div>
                  <span className={cn("text-xs uppercase tracking-[0.4em] font-bold", isAr ? "font-arabic-body" : "font-english-body")}>
                    {isAr ? "العودة للمجلدات" : "Back to Folders"}
                  </span>
                </button>
                <h3 className={cn("text-4xl text-white font-bold", isAr ? "font-arabic-body" : "font-english-body")}>
                  {currentCategories.find(c => c.id === activeCategory)?.label}
                </h3>
                <div className="w-24" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredProjects.map((project, idx) => (
                  project.isDivider ? (
                    <div key={project.id} className="col-span-full py-12 flex items-center gap-8">
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gold/20" />
                        <span className={cn("text-gold/40 text-xs font-bold uppercase tracking-[0.5em] px-4 whitespace-nowrap", isAr ? "font-arabic-body" : "font-english-body")}>
                            {(project as any).label[language]}
                        </span>
                        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gold/20" />
                    </div>
                  ) : (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => setSelectedImg(project.img!)}
                        className="group relative aspect-[3/4] overflow-hidden glass-card cursor-zoom-in rounded-3xl transition-all duration-700 bg-secondary/30"
                    >
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 flex flex-col items-center justify-center p-8 text-center backdrop-blur-[2px]">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-12 h-12 bg-gold text-black rounded-full flex items-center justify-center mb-6 shadow-2xl"
                        >
                            <Maximize2 size={20} />
                        </motion.div>
                        <h4 className={cn("text-2xl text-white font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500", isAr ? "font-arabic-body" : "font-english-body")}>
                            {project.title}
                        </h4>
                        </div>
                        <img 
                        src={project.img} 
                        alt={project.title}
                        className="w-full h-full object-contain p-4 transition-all duration-[3000ms] ease-linear grayscale group-hover:grayscale-0"
                        />
                    </motion.div>
                  )
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={() => setSelectedImg(null)} 
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 md:p-20 cursor-zoom-out group/modal"
          >
            <div className="absolute top-10 left-1/2 -translate-x-1/2 z-[110] flex items-center gap-4 bg-[#1a1a1a]/80 backdrop-blur-3xl p-2 rounded-2xl border border-gold/20 shadow-2xl transition-all duration-500">
                <button onClick={handleZoomOut} className="p-3 hover:bg-gold/10 rounded-xl text-gold/60 hover:text-gold transition-all">
                    <ZoomOut size={20} />
                </button>
                <span className="text-gold/40 text-[10px] font-bold w-12 text-center uppercase tracking-widest">
                    {Math.round(scale * 100)}%
                </span>
                <button onClick={handleZoomIn} className="p-3 hover:bg-gold/10 rounded-xl text-gold/60 hover:text-gold transition-all">
                    <ZoomIn size={20} />
                </button>
                <div className="w-[1px] h-6 bg-gold/10" />
                <button onClick={handleResetZoom} className="p-3 hover:bg-gold/10 rounded-xl text-gold/60 hover:text-gold transition-all">
                    <RotateCcw size={20} />
                </button>
            </div>

            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: scale, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="relative w-full h-full flex items-center justify-center p-4 md:p-10"
                style={{ cursor: scale > 1 ? 'grab' : 'zoom-out' }}
            >
                <img 
                    src={selectedImg} 
                    className="max-w-full max-h-full w-auto h-auto object-contain rounded-xl shadow-2xl transition-transform duration-300"
                    draggable={false}
                />
            </motion.div>

            <button 
                onClick={() => setSelectedImg(null)}
                className={cn("absolute top-10 right-10 text-white/50 hover:text-white transition-all flex items-center gap-2 text-xs uppercase tracking-widest z-[110]", isAr ? "font-arabic-body" : "font-english-body")}
            >
                <CloseIcon size={18} />
                {isAr ? "إغلاق" : "Close"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default function Portfolio() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-white">Loading...</div>}>
      <PortfolioContent />
    </Suspense>
  );
}
