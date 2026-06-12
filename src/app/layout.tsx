import type { Metadata } from "next";
import { Outfit, Bagel_Fat_One, Quicksand, Baloo_Bhaijaan_2 } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

const bagel = Bagel_Fat_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bagel",
});

const baloo = Baloo_Bhaijaan_2({
  subsets: ["arabic"],
  variable: "--font-baloo",
});

export const metadata: Metadata = {
  title: "SaadNejjai | Premium Graphic Design",
  description: "Portfolio of SaadNejjai, specializing in Branding, Visual Identity, Social Media & Advertising, Book Covers & Logos.",
  icons: {
    icon: "/images/local_cache/FHU5GHE.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${outfit.variable} ${bagel.variable} ${quicksand.variable} ${baloo.variable}`}>
      <body className="antialiased bg-primary text-text-primary overflow-x-hidden selection:bg-gold/30 selection:text-gold-light">
        <LanguageProvider>
          <div className="bg-noise" />
          <ScrollToTop />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
