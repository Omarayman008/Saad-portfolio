"use client";

import { useState, useEffect, Suspense } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X as CloseIcon, Plus, Edit2, Trash2, Save, Image as ImageIcon, ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";

const INITIAL_CATEGORIES = {
  ar: [
    { id: "logos", label: "شعارات" },
    { id: "book-covers", label: "أغلفة كتب" },
  ],
  en: [
    { id: "logos", label: "Logos" },
    { id: "book-covers", label: "Book Covers" },
  ],
  tr: [
    { id: "logos", label: "Logolar" },
    { id: "book-covers", label: "Kitap Kapakları" },
  ]
};

const INITIAL_PROJECTS = [
  { id: 1, category: "logos", title: "Saad v1", img: "/images/logos/Saad_v1_-_behance_.jpg" },
  { id: 2, category: "logos", title: "Umon", img: "/images/logos/Umon.jpg" },
  { id: 3, category: "logos", title: "VETscan", img: "/images/logos/VETscan.png" },
  { id: 4, category: "logos", title: "Massive", img: "/images/logos/massive_-vfinal.png" },
  { id: 5, category: "book-covers", title: "Cover 1", img: "/images/book-covers/bilin_lenme_251120_235201_page-0001.jpg" },
  { id: 6, category: "book-covers", title: "Cover 2", img: "/images/book-covers/undefined-__1_.jpeg" },
  { id: 7, category: "book-covers", title: "Cover 3", img: "/images/book-covers/undefined-__2_.jpeg" },
  { id: 8, category: "book-covers", title: "Cover 4", img: "/images/book-covers/undefined-__3_.jpeg" },
  { id: 9, category: "book-covers", title: "Cover 5", img: "/images/book-covers/undefined-__4_.jpeg" },
  { id: 10, category: "book-covers", title: "Cover 6", img: "/images/book-covers/undefined-__5_.jpeg" },
  { id: 11, category: "book-covers", title: "Cover 7", img: "/images/book-covers/undefined-.jpeg" },
];

function FolderIcon({ label, previewImg }: { label: string, previewImg?: string }) {
  return (
    <div className="flex flex-col items-center gap-6 w-48 md:w-64 group cursor-pointer">
      <div className="relative w-full aspect-[4/3] transition-transform duration-500 group-hover:scale-105">
        {/* Back part of folder */}
        <div className="absolute inset-0 bg-secondary border border-white/5 rounded-2xl shadow-2xl transition-all duration-500" style={{ clipPath: 'polygon(0 15%, 40% 15%, 50% 0, 100% 0, 100% 100%, 0 100%)' }}>
            <div className="absolute top-2 left-2 right-2 bottom-2 bg-white opacity-5 rounded-xl" />
        </div>
        
        {/* Content peeking out */}
        <div className="absolute top-2 left-4 right-4 h-3/4 bg-white/10 rounded-xl shadow-inner transition-all duration-700 overflow-hidden backdrop-blur-md group-hover:-translate-y-8">
           {previewImg ? (
             <img src={previewImg} className="w-full h-full object-cover opacity-60" alt="" />
           ) : (
             <div className="w-full h-full bg-gradient-to-br from-white/10 to-white/5" />
           )}
        </div>

        {/* Front part of folder */}
        <div className="absolute bottom-0 left-0 right-0 h-[75%] bg-secondary/95 border border-white/10 rounded-2xl shadow-[0_-10px_30px_rgba(0,0,0,0.5)] transition-transform duration-500 origin-bottom backdrop-blur-md group-hover:rotate-x-[-15deg]">
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 rounded-t-2xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-2xl" />
        </div>
      </div>
      <span className="text-xl md:text-2xl font-bold tracking-[0.2em] uppercase text-white/50 group-hover:text-white transition-all duration-300">
        {label}
      </span>
    </div>
  );
}

function PortfolioContent() {
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get("edit") === "true";
  
  const { language, t } = useLanguage();
  const isAr = language === "ar";
  
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  
  const [newProject, setNewProject] = useState({ title: "", category: "logos", img: "" });

  useEffect(() => {
    const savedCats = localStorage.getItem("portfolio_categories");
    const savedProjs = localStorage.getItem("portfolio_projects");
    if (savedCats) {
        const cats = JSON.parse(savedCats);
        const cleaned = {
            ar: cats.ar.filter((c: any) => c.id !== "highcore" && c.id !== "wano" && c.id !== "all"),
            en: cats.en.filter((c: any) => c.id !== "highcore" && c.id !== "wano" && c.id !== "all"),
            tr: cats.tr.filter((c: any) => c.id !== "highcore" && c.id !== "wano" && c.id !== "all"),
        };
        setCategories(cleaned);
    }
    if (savedProjs) {
        const projs = JSON.parse(savedProjs);
        setProjects(projs.filter((p: any) => p.category !== "highcore" && p.category !== "wano"));
    }
  }, []);

  const currentCategories = categories[language] || categories.en;
  const filteredProjects = activeCategory 
    ? projects.filter(p => p.category === activeCategory)
    : [];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isEditing = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEditing) {
          setEditingProject({ ...editingProject, img: reader.result as string });
        } else {
          setNewProject({ ...newProject, img: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

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
              <h2 className={cn("text-5xl md:text-7xl mb-24", isAr ? "font-arabic-hero" : "font-english-hero")}>
                <span className="text-white">{t("portfolioTitle")}</span>
              </h2>
              
              <div className="flex flex-wrap justify-center gap-16 md:gap-24">
                {currentCategories.map((cat) => {
                  const preview = projects.find(p => p.category === cat.id)?.img;
                  return (
                    <motion.button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      whileHover={{ y: -10 }}
                      className="focus:outline-none"
                    >
                      <FolderIcon 
                        label={cat.label} 
                        previewImg={preview}
                      />
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="projects"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8, ease: "circOut" }}
            >
              <div className="flex items-center justify-between mb-16 border-b border-white/5 pb-8">
                <button 
                  onClick={() => setActiveCategory(null)}
                  className="flex items-center gap-4 text-white/50 hover:text-white transition-all group"
                >
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowLeft size={20} />
                  </div>
                  <span className="text-xs uppercase tracking-[0.4em] font-bold">
                    {isAr ? "العودة للمجلدات" : "Back to Folders"}
                  </span>
                </button>
                <h3 className={cn("text-4xl text-white font-bold", isAr ? "font-arabic-hero" : "font-english-hero")}>
                  {currentCategories.find(c => c.id === activeCategory)?.label}
                </h3>
                {isEditMode ? (
                  <button onClick={() => setIsAddingProject(true)} className="px-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-xl">
                    {isAr ? "إضافة عمل" : "Add Project"}
                  </button>
                ) : <div className="w-24" />}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredProjects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => setSelectedImg(project.img)}
                    className="group relative aspect-[3/4] overflow-hidden glass-card cursor-zoom-in rounded-3xl transition-all duration-700"
                  >
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 flex flex-col items-center justify-center p-8 text-center backdrop-blur-md">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mb-8 shadow-2xl"
                      >
                        <Plus className="w-8 h-8" />
                      </motion.div>
                      <div className="translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
                        <h4 className={cn("text-3xl text-white font-bold", isAr ? "font-arabic-hero" : "font-english-hero")}>{project.title}</h4>
                      </div>
                    </div>
                    <img 
                      src={project.img} 
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-all duration-[3000ms] ease-linear group-hover:object-bottom filter grayscale group-hover:grayscale-0"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImg(null)} className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out">
            <motion.img initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: "spring", damping: 25 }} src={selectedImg} className="max-w-full max-h-full object-contain rounded-2xl" />
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
