"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { 
  X as CloseIcon, 
  Plus, 
  ArrowLeft, 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Settings,
  Trash2,
  Edit3,
  Save,
  Image as ImageIcon,
  FolderPlus,
  Upload,
  Loader2,
  Key,
  WifiOff,
  AlertTriangle,
  Clock
} from "lucide-react";
import { useSearchParams } from "next/navigation";

const DEFAULT_IMGBB_KEY = "5619158806d52f4bc46bd3d373b6ccde";
const ERROR_EMAILS = ["work@saadnejjai.com.tr", "omarsharq90@gmail.com"];
const UPLOAD_TIMEOUT = 30000;

const INITIAL_CATEGORIES = {
  ar: [
    { id: "logos", label: "ط´ط¹ط§ط±ط§طھ" },
    { id: "book-covers", label: "ط£ط؛ظ„ظپط© ظƒطھط¨" },
    { id: "carousel", label: "ظƒط§ط±ظˆط³ظٹظ„ & ظ…ظˆظ†طھط§ط¬" },
  ],
  en: [
    { id: "logos", label: "Logos" },
    { id: "book-covers", label: "Book Covers" },
    { id: "carousel", label: "Carousel & Montage" },
  ],
  tr: [
    { id: "logos", label: "Logolar" },
    { id: "book-covers", label: "Kitap Kapaklarؤ±" },
    { id: "carousel", label: "Carousel & Montaj" },
  ]
};

const INITIAL_PROJECTS = [
  { id: "l1", category: "logos", title: "Logo 1", img: "/images/local_cache/lZTassL.png" },
  { id: "l2", category: "logos", title: "Logo 2", img: "/images/local_cache/KM6knMY.png" },
  { id: "l3", category: "logos", title: "Logo 3", img: "/images/local_cache/A7CY9n3.png" },
  { id: "ld1", category: "logos", isDivider: true, label: { ar: "ظ…ط¬ظ…ظˆط¹ط© ط¬ط¯ظٹط¯ط©", en: "New Collection", tr: "Yeni Koleksiyon" } },
  { id: "l4", category: "logos", title: "Logo 4", img: "/images/local_cache/dYp5qH5.png" },
  { id: "l5", category: "logos", title: "Logo 5", img: "/images/local_cache/lccptZZ.png" },
  { id: "l6", category: "logos", title: "Logo 6", img: "/images/local_cache/aERzg4K.png" },
  { id: "l7", category: "logos", title: "Logo 7", img: "/images/local_cache/CKlAFIw.png" },
  { id: "ld2", category: "logos", isDivider: true, label: { ar: "ظ…ط¬ظ…ظˆط¹ط© ط¬ط¯ظٹط¯ط©", en: "New Collection", tr: "Yeni Koleksiyon" } },
  { id: "l8", category: "logos", title: "Logo 8", img: "/images/local_cache/ltortDs.png" },
  { id: "l9", category: "logos", title: "Logo 9", img: "/images/local_cache/QXUmR11.png" },
  { id: "bc1", category: "book-covers", title: "Cover 1", img: "/images/local_cache/DuWQXny.png" },
  { id: "bc2", category: "book-covers", title: "Cover 2", img: "/images/local_cache/AP6R51v.png" },
  { id: "bc3", category: "book-covers", title: "Cover 3", img: "/images/local_cache/CgGUsGb.png" },
  { id: "bc4", category: "book-covers", title: "Cover 4", img: "/images/local_cache/cdB99kB.png" },
  { id: "bc5", category: "book-covers", title: "Cover 5", img: "/images/local_cache/kvkLOKE.png" },
  { id: "bc6", category: "book-covers", title: "Cover 6", img: "/images/local_cache/IG1Khm0.png" },
  { id: "bc7", category: "book-covers", title: "Cover 7", img: "/images/local_cache/NeeDDTD.png" },
  { id: "bc8", category: "book-covers", title: "Cover 8", img: "/images/local_cache/HI2KDwR.png" },
  { id: "bc9", category: "book-covers", title: "Cover 9", img: "/images/local_cache/WeB93rC.png" },
  { id: "bc10", category: "book-covers", title: "Cover 10", img: "/images/local_cache/sm7HiVg.png" },
  { id: "bc11", category: "book-covers", title: "Cover 11", img: "/images/local_cache/8WO2GAz.png" },
  { id: "bc12", category: "book-covers", title: "Cover 12", img: "/images/local_cache/yJJmO27.png" },
  { id: "bc13", category: "book-covers", title: "Cover 13", img: "/images/local_cache/DmcVlwZ.png" },
  { id: "bc14", category: "book-covers", title: "Cover 14", img: "/images/local_cache/v2ZgTSx.png" },
  { id: "bc15", category: "book-covers", title: "Cover 15", img: "/images/local_cache/MXdTLyi.png" },
  { id: "bc16", category: "book-covers", title: "Cover 16", img: "/images/local_cache/tgN2AdH.png" },
  { id: "bc17", category: "book-covers", title: "Cover 17", img: "/images/local_cache/kI0Yq4B.png" },
  { id: "bc18", category: "book-covers", title: "Cover 18", img: "/images/local_cache/hYPIwAR.png" },
  { id: "bc19", category: "book-covers", title: "Cover 19", img: "/images/local_cache/IK3bhtI.png" },
  { id: "c1", category: "carousel", title: "Carousel 1", img: "/images/local_cache/qiM7WEO.png" },
  { id: "c2", category: "carousel", title: "Carousel 2", img: "/images/local_cache/SQGx6Lv.png" },
  { id: "c3", category: "carousel", title: "Carousel 3", img: "/images/local_cache/YxADID0.png" },
  { id: "c4", category: "carousel", title: "Carousel 4", img: "/images/local_cache/ZN4qwmi.png" },
  { id: "c5", category: "carousel", title: "Carousel 5", img: "/images/local_cache/qt3iAg7.png" },
  { id: "c6", category: "carousel", title: "Carousel 6", img: "/images/local_cache/9LiMrz7.png" },
  { id: "c7", category: "carousel", title: "Carousel 7", img: "/images/local_cache/F2BsO3S.png" },
  { id: "c8", category: "carousel", title: "Carousel 8", img: "/images/local_cache/U9Rum8b.png" },
  { id: "c9", category: "carousel", title: "Carousel 9", img: "/images/local_cache/4x6pA97.png" },
  { id: "cd1", category: "carousel", isDivider: true, label: { ar: "ظ…ط¬ظ…ظˆط¹ط© ط£ط®ط±ظ‰", en: "Other Collection", tr: "Diؤںer Koleksiyon" } },
  { id: "c10", category: "carousel", title: "Carousel 10", img: "/images/local_cache/K8FB51h.png" },
  { id: "c11", category: "carousel", title: "Carousel 11", img: "/images/local_cache/pQ4ghoV.png" },
  { id: "c12", category: "carousel", title: "Carousel 12", img: "/images/local_cache/fFlhhUC.png" },
  { id: "c13", category: "carousel", title: "Carousel 13", img: "/images/local_cache/Zi3hRjp.png" },
  { id: "c14", category: "carousel", title: "Carousel 14", img: "/images/local_cache/nz7daqU.png" },
  { id: "c15", category: "carousel", title: "Carousel 15", img: "/images/local_cache/U0EME14.png" },
  { id: "cd2", category: "carousel", isDivider: true, label: { ar: "ظ†ظ…ط· ظ…ط®طھظ„ظپ", en: "Different Style", tr: "Farklؤ± Stil" } },
  { id: "c16", category: "carousel", title: "Carousel 16", img: "/images/local_cache/seObq5A.png" },
  { id: "c17", category: "carousel", title: "Carousel 17", img: "/images/local_cache/IApo8yZ.png" },
  { id: "c18", category: "carousel", title: "Carousel 18", img: "/images/local_cache/gmabcrW.png" },
  { id: "c19", category: "carousel", title: "Carousel 19", img: "/images/local_cache/YjQglIp.png" },
  { id: "c20", category: "carousel", title: "Carousel 20", img: "/images/local_cache/1ERfczN.png" },
  { id: "c21", category: "carousel", title: "Carousel 21", img: "/images/local_cache/xGQz2cc.png" },
  { id: "c22", category: "carousel", title: "Carousel 22", img: "/images/local_cache/EhLHXkf.png" },
  { id: "cd3", category: "carousel", isDivider: true, label: { ar: "ظ…ط¬ظ…ظˆط¹ط© ط¬ط¯ظٹط¯ط©", en: "New Group", tr: "Yeni Grup" } },
  { id: "c23", category: "carousel", title: "Carousel 23", img: "/images/local_cache/1Ers5v6.png" },
  { id: "c24", category: "carousel", title: "Carousel 24", img: "/images/local_cache/aFt1LCL.png" },
  { id: "c25", category: "carousel", title: "Carousel 25", img: "/images/local_cache/2OA4ViR.png" },
  { id: "c26", category: "carousel", title: "Carousel 26", img: "/images/local_cache/6vjo0Fr.png" },
  { id: "c27", category: "carousel", title: "Carousel 27", img: "/images/local_cache/tIISc2k.png" },
  { id: "c28", category: "carousel", title: "Carousel 28", img: "/images/local_cache/gW4SjcN.png" },
];

function FolderIcon({ label, previewImgs, isAr, isAdmin, onEdit, onDelete }: { 
  label: string, 
  previewImgs: string[], 
  isAr: boolean,
  isAdmin?: boolean,
  onEdit?: () => void,
  onDelete?: () => void
}) {
  return (
    <div className="flex flex-col items-center gap-8 w-64 md:w-80 group cursor-pointer relative">
      {isAdmin && (
        <div className="absolute -top-4 -right-4 z-40 flex gap-2">
          <button onClick={(e) => { e.stopPropagation(); onDelete?.(); }} className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
            <Trash2 size={16} />
          </button>
        </div>
      )}
      <div className="relative w-full aspect-[16/10]">
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-[85%] h-[85%] bg-[#1a1a1a] border border-white/5 rounded-2xl shadow-2xl transition-all duration-700 group-hover:-translate-y-12 group-hover:-rotate-6 group-hover:scale-105 overflow-hidden">
                <Image src={previewImgs[2] || previewImgs[0]} alt="Preview 3" fill className="object-cover opacity-20 group-hover:opacity-40 transition-opacity" />
            </div>
            <div className="absolute w-[90%] h-[90%] bg-[#262626] border border-white/10 rounded-2xl shadow-2xl transition-all duration-500 group-hover:-translate-y-8 group-hover:rotate-3 group-hover:scale-105 overflow-hidden">
                <Image src={previewImgs[1] || previewImgs[0]} alt="Preview 2" fill className="object-cover opacity-30 group-hover:opacity-60 transition-opacity" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#d2b48c]/10 to-[#d2b48c]/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:border-gold/30 flex flex-col justify-end p-6 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                    <div className="w-12 h-1 bg-gold/30 rounded-full mb-4 group-hover:w-20 transition-all duration-700" />
                    <h4 className={cn("text-gold-gradient font-bold text-3xl tracking-tighter transition-all duration-500", isAr ? "font-arabic-body" : "font-english-body")}>
                        {label}
                    </h4>
                </div>
                <div className="absolute top-0 left-0 w-full h-full -z-10">
                    <Image src={previewImgs[0]} alt="Preview 1" fill className="object-cover opacity-5 group-hover:opacity-20 transition-opacity duration-1000 scale-110 group-hover:scale-100" />
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
  const searchParams = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const isAr = language === "ar";
  const isAdmin = searchParams.get("edit") === "true";
  
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [apiKey, setApiKey] = useState(DEFAULT_IMGBB_KEY);
  const [isOnline, setIsOnline] = useState(true);
  
  const [categories, setCategories] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const savedCats = localStorage.getItem("saad_categories");
    const savedProjects = localStorage.getItem("saad_projects");
    const savedKey = localStorage.getItem("saad_imgbb_key");
    
    setCategories(savedCats ? JSON.parse(savedCats) : INITIAL_CATEGORIES);
    setProjects(savedProjects ? JSON.parse(savedProjects) : INITIAL_PROJECTS);
    if (savedKey) setApiKey(savedKey);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const saveToLocal = (newCats: any, newProjects: any[]) => {
    setCategories(newCats);
    setProjects(newProjects);
    localStorage.setItem("saad_categories", JSON.stringify(newCats));
    localStorage.setItem("saad_projects", JSON.stringify(newProjects));
  };

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

  if (!categories) return null;

  const currentCategories = categories[language] || categories.en;
  const filteredProjects = activeCategory 
    ? projects.filter(p => p.category === activeCategory)
    : [];

  const reportError = async (errorType: string, details: string) => {
    console.error(`[Portfolio Error] ${errorType}:`, details);
    const subject = encodeURIComponent(`Portfolio Error Report: ${errorType}`);
    const body = encodeURIComponent(`An error occurred in Saad's Portfolio.\n\nType: ${errorType}\nDetails: ${details}\nTime: ${new Date().toISOString()}`);
    const mailto = `mailto:${ERROR_EMAILS.join(',')}?subject=${subject}&body=${body}`;
    
    if (confirm(isAr ? "ط­ط¯ط« ط®ط·ط£ طھظ‚ظ†ظٹ. ظ‡ظ„ طھط±ظٹط¯ ط¥ط±ط³ط§ظ„ طھظ‚ط±ظٹط± ط¨ط§ظ„ط®ط·ط£ ط¥ظ„ظ‰ ط§ظ„ظ…ط·ظˆط±ظٹظ†طں" : "A technical error occurred. Would you like to send a report to the developers?")) {
        window.location.href = mailto;
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeCategory) return;

    if (!navigator.onLine) {
        alert(isAr ? "ط£ظ†طھ ط؛ظٹط± ظ…طھطµظ„ ط¨ط§ظ„ط¥ظ†طھط±ظ†طھ ط­ط§ظ„ظٹط§ظ‹! ظٹط±ط¬ظ‰ ط§ظ„طھط­ظ‚ظ‚ ظ…ظ† ط§ظ„ط´ط¨ظƒط©." : "You are offline! Please check your connection.");
        return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    const uploadPromise = fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
    });

    const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("TIMEOUT")), UPLOAD_TIMEOUT)
    );

    try {
      const response = await Promise.race([uploadPromise, timeoutPromise]) as Response;
      const result = await response.json();

      if (result.success) {
        const title = prompt(isAr ? "ط¹ظ†ظˆط§ظ† ط§ظ„طµظˆط±ط©:" : "Image Title:", file.name.split('.')[0]);
        const newProject = {
          id: `p-${Date.now()}`,
          category: activeCategory,
          title: title || "New Image",
          img: result.data.url
        };
        saveToLocal(categories, [newProject, ...projects]);
      } else {
        const errMsg = result.error?.message || (isAr ? "ظپط´ظ„ ط§ظ„ط±ظپط¹. ط±ط¨ظ…ط§ ظ…ظپطھط§ط­ API ط؛ظٹط± طµط§ظ„ط­." : "Upload failed. API Key might be invalid.");
        alert(errMsg);
        reportError("ImgBB Upload Failure", JSON.stringify(result));
      }
    } catch (error: any) {
      if (error.message === "TIMEOUT") {
        alert(isAr ? "ط§ظ„ظ†طھ ط¨ط·ظٹط، ط¬ط¯ط§ظ‹ (ظ†طھ ط³ظ„ط­ظپط§ط© ًںگ¢).. ط§ظ„ط±ظپط¹ ط§ط³طھط؛ط±ظ‚ ظˆظ‚طھط§ظ‹ ط·ظˆظٹظ„ط§ظ‹. ظٹط±ط¬ظ‰ ط§ظ„ظ…ط­ط§ظˆظ„ط© ظ…ط±ط© ط£ط®ط±ظ‰." : "Super slow internet (Turtle speed ًںگ¢).. Upload timed out. Please try again.");
      } else {
        console.error("Upload error:", error);
        alert(isAr ? "ط­ط¯ط« ط¹ط·ظ„ ط؛ظٹط± ظ…طھظˆظ‚ط¹. ظ‚ط¯ ظٹظƒظˆظ† ط¨ط³ط¨ط¨ ط±ظٹظ„ ظˆط§ظٹ ط£ظˆ ط§ظ†ظ‚ط·ط§ط¹ ظ…ظپط§ط¬ط¦." : "Unexpected failure. Might be Railway instability or a sudden drop.");
        reportError("Critical Upload Error", error?.message || "Unknown error");
      }
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const changeApiKey = () => {
    const newKey = prompt(isAr ? "ط£ط¯ط®ظ„ ظ…ظپطھط§ط­ ImgBB API ط§ظ„ط¬ط¯ظٹط¯ ط§ظ„ط®ط§طµ ط¨ظƒ:" : "Enter your new ImgBB API Key:", apiKey);
    if (newKey && newKey.trim() !== "") {
      setApiKey(newKey.trim());
      localStorage.setItem("saad_imgbb_key", newKey.trim());
      alert(isAr ? "طھظ… طھط­ط¯ظٹط« ظ…ظپطھط§ط­ API ط¨ظ†ط¬ط§ط­." : "API Key updated successfully.");
    }
  };

  const deleteProject = (id: string) => {
    if (!confirm(isAr ? "ظ‡ظ„ ط£ظ†طھ ظ…طھط£ظƒط¯ ظ…ظ† ط­ط°ظپ ط§ظ„طµظˆط±ط©طں" : "Are you sure you want to delete this image?")) return;
    saveToLocal(categories, projects.filter(p => p.id !== id));
  };

  const addNewFolder = () => {
    const id = prompt("Folder ID (English):")?.toLowerCase().replace(/\s+/g, '-');
    const labelAr = prompt("Folder Label (Arabic):");
    const labelEn = prompt("Folder Label (English):");
    const labelTr = prompt("Folder Label (Turkish):");

    if (!id || !labelAr || !labelEn || !labelTr) return;

    const newCats = {
        ar: [...categories.ar, { id, label: labelAr }],
        en: [...categories.en, { id, label: labelEn }],
        tr: [...categories.tr, { id, label: labelTr }],
    };
    saveToLocal(newCats, projects);
  };

  const deleteFolder = (catId: string) => {
    if (!confirm(isAr ? "ظ‡ظ„ ط£ظ†طھ ظ…طھط£ظƒط¯ ظ…ظ† ط­ط°ظپ ط§ظ„ظ…ط¬ظ„ط¯ ط¨ط§ظ„ظƒط§ظ…ظ„ ظ…ط¹ ط¬ظ…ظٹط¹ ظ…ط­طھظˆظٹط§طھظ‡طں" : "Are you sure you want to delete this folder and all its contents?")) return;
    const newCats = {
        ar: categories.ar.filter((c: any) => c.id !== catId),
        en: categories.en.filter((c: any) => c.id !== catId),
        tr: categories.tr.filter((c: any) => c.id !== catId),
    };
    saveToLocal(newCats, projects.filter(p => p.category !== catId));
  };

  const restoreDefaults = () => {
    if (!confirm(isAr ? "ط³ظٹطھظ… ظ…ط³ط­ ط¬ظ…ظٹط¹ طھط¹ط¯ظٹظ„ط§طھظƒ ظˆط§ط³طھط¹ط§ط¯ط© ط§ظ„ط¨ظٹط§ظ†ط§طھ ط§ظ„ط£طµظ„ظٹط©. ظ‡ظ„ ط£ظ†طھ ظ…طھط£ظƒط¯طں" : "This will erase all your edits and restore original data. Are you sure?")) return;
    localStorage.removeItem("saad_categories");
    localStorage.removeItem("saad_projects");
    window.location.reload();
  };

  const exportConfig = () => {
    const data = { categories, projects };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "saad_portfolio_config.json";
    a.click();
    alert(isAr ? "طھظ… طھطµط¯ظٹط± ط§ظ„ط¥ط¹ط¯ط§ط¯ط§طھ. ط£ط±ط³ظ„ ط§ظ„ظ…ظ„ظپ ظ„ظٹ ظ„طھط­ط¯ظٹط« ط§ظ„ظ…ظˆظ‚ط¹ ظ†ظ‡ط§ط¦ظٹط§ظ‹." : "Config exported. Send the file to me to update the site permanently.");
  };

  return (
    <section id="portfolio" className="py-24 relative min-h-[800px] scroll-mt-20">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileUpload} 
      />
      
      {!isOnline && (
        <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[150] bg-red-500 text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-2xl font-bold"
        >
            <WifiOff size={20} />
            {isAr ? "ط£ظ†طھ ط؛ظٹط± ظ…طھطµظ„ ط¨ط§ظ„ط¥ظ†طھط±ظ†طھ ط­ط§ظ„ظٹط§ظ‹!" : "You are currently offline!"}
        </motion.div>
      )}

      {isAdmin && (
        <div className="fixed bottom-10 right-10 z-[100] flex flex-col gap-4 items-end">
          <motion.button 
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            onClick={exportConfig}
            className="bg-gold text-black px-6 py-4 rounded-2xl font-bold shadow-2xl flex items-center gap-3 hover:scale-105 transition-transform"
          >
            <Save size={20} />
            {isAr ? "ط­ظپط¸ ظˆطھطµط¯ظٹط± ط§ظ„ط¥ط¹ط¯ط§ط¯ط§طھ" : "Save & Export Config"}
          </motion.button>
          
          <div className="flex gap-2">
            <button 
                onClick={changeApiKey}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-white/5 transition-all flex items-center gap-2"
            >
                <Key size={14} />
                {isAr ? "طھط؛ظٹظٹط± ظ…ظپطھط§ط­ ط§ظ„ط±ظپط¹" : "Change API Key"}
            </button>
            <button 
                onClick={restoreDefaults}
                className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-red-500/20 transition-all"
            >
                {isAr ? "ط§ط³طھط¹ط§ط¯ط© ط§ظ„ط¨ظٹط§ظ†ط§طھ" : "Restore"}
            </button>
          </div>

          <div className="bg-[#1a1a1a]/90 backdrop-blur-xl p-4 rounded-3xl border border-gold/20 text-white text-[10px] text-center font-bold uppercase tracking-widest">
            {isAr ? "ظˆط¶ط¹ ط§ظ„ط¥ط¯ط§ط±ط© ظ…ظپط¹ظ„" : "Admin Mode Active"}
          </div>
        </div>
      )}

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
                {currentCategories.map((cat: any) => {
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
                        isAdmin={isAdmin}
                        onDelete={() => deleteFolder(cat.id)}
                      />
                    </motion.button>
                  );
                })}

                {isAdmin && (
                    <button 
                        onClick={addNewFolder}
                        className="w-64 md:w-80 aspect-[16/10] border-2 border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center gap-4 text-white/30 hover:text-gold hover:border-gold/30 transition-all group"
                    >
                        <FolderPlus size={40} className="group-hover:scale-110 transition-transform" />
                        <span className="text-xs uppercase tracking-widest font-bold">{isAr ? "ط¥ط¶ط§ظپط© ظ…ط¬ظ„ط¯ ط¬ط¯ظٹط¯" : "Add New Folder"}</span>
                    </button>
                )}
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
                    {isAr ? "ط§ظ„ط¹ظˆط¯ط© ظ„ظ„ظ…ط¬ظ„ط¯ط§طھ" : "Back to Folders"}
                  </span>
                </button>
                <div className="flex items-center gap-8">
                    <h3 className={cn("text-4xl text-white font-bold", isAr ? "font-arabic-body" : "font-english-body")}>
                    {currentCategories.find((c: any) => c.id === activeCategory)?.label}
                    </h3>
                    {isAdmin && (
                        <div className="flex gap-4">
                            <button 
                                disabled={isUploading}
                                onClick={() => fileInputRef.current?.click()}
                                className="bg-gold text-black px-6 py-2 rounded-xl font-bold text-xs flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50"
                            >
                                {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                                {isAr ? "ط±ظپط¹ ظ…ظ† ط§ظ„ط¬ظ‡ط§ط²" : "Upload from Device"}
                            </button>
                            <button 
                                onClick={() => {
                                    const title = prompt(isAr ? "ط¹ظ†ظˆط§ظ† ط§ظ„طµظˆط±ط©:" : "Image Title:");
                                    const url = prompt(isAr ? "ط±ط§ط¨ط· ط§ظ„طµظˆط±ط© (URL):" : "Image URL:");
                                    if (title && url) {
                                        const newProject = { id: `p-${Date.now()}`, category: activeCategory, title, img: url };
                                        saveToLocal(categories, [newProject, ...projects]);
                                    }
                                }}
                                className="bg-white/5 text-white/40 px-6 py-2 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-white/10 transition-all"
                            >
                                <Plus size={16} />
                                {isAr ? "ط¥ط¶ط§ظپط© ط¨ط±ط§ط¨ط·" : "Add by URL"}
                            </button>
                        </div>
                    )}
                </div>
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
                        className="group relative aspect-[3/4] overflow-hidden glass-card cursor-zoom-in rounded-3xl transition-all duration-700 bg-secondary/30"
                    >
                        {isAdmin && (
                            <button 
                                onClick={(e) => { e.stopPropagation(); deleteProject(project.id); }}
                                className="absolute top-4 right-4 z-40 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={16} />
                            </button>
                        )}
                        <div onClick={() => setSelectedImg(project.img!)} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 flex flex-col items-center justify-center p-8 text-center backdrop-blur-[2px]">
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
                        <Image 
                        src={project.img} 
                        alt={project.title}
                        fill
                        className="object-contain p-4 transition-all duration-[3000ms] ease-linear grayscale group-hover:grayscale-0"
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
                <Image 
                    src={selectedImg} 
                    alt="Zoomed"
                    width={1920}
                    height={1080}
                    className="max-w-full max-h-full w-auto h-auto object-contain rounded-xl shadow-2xl transition-transform duration-300"
                    draggable={false}
                />
            </motion.div>

            <button 
                onClick={() => setSelectedImg(null)}
                className={cn("absolute top-10 right-10 text-white/50 hover:text-white transition-all flex items-center gap-2 text-xs uppercase tracking-widest z-[110]", isAr ? "font-arabic-body" : "font-english-body")}
            >
                <CloseIcon size={18} />
                {isAr ? "ط¥ط؛ظ„ط§ظ‚" : "Close"}
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
