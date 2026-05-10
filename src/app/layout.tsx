import type { Metadata } from "next";
import { Outfit, Fredoka, Zain, Quicksand } from "next/font/google";
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

const fredoka = Fredoka({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-fredoka",
});

const zain = Zain({
  weight: ["200", "300", "400", "700", "800", "900"],
  subsets: ["arabic"],
  variable: "--font-zain",
});

export const metadata: Metadata = {
  title: "SaadNejjai | Premium Graphic Design",
  description: "Portfolio of SaadNejjai, specializing in Branding, Visual Identity, Social Media & Advertising, Book Covers & Logos.",
  icons: {
    icon: "https://imgur.com/FHU5GHE.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${outfit.variable} ${fredoka.variable} ${quicksand.variable} ${zain.variable}`}>
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
