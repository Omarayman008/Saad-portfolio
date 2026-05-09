import type { Metadata } from "next";
import { Almarai, IBM_Plex_Sans_Arabic, Outfit, Bagel_Fat_One, Quicksand } from "next/font/google";
import localFont from "next/font/local";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

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

const almarai = Almarai({
  weight: ["300", "400", "700", "800"],
  subsets: ["arabic"],
  variable: "--font-almarai",
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["arabic"],
  variable: "--font-ibm-plex-arabic",
});

const thmanyah = localFont({
  src: [
    {
      path: "./fonts/thmanyahsans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/thmanyahsans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/thmanyahsans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/thmanyahsans-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-thmanyah",
});

export const metadata: Metadata = {
  title: "SaadNejjai | Premium Graphic Design",
  description: "Portfolio of SaadNejjai, specializing in Branding, Visual Identity, Social Media & Advertising, Book Covers & Logos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${almarai.variable} ${ibmPlexArabic.variable} ${thmanyah.variable} ${outfit.variable} ${bagel.variable} ${quicksand.variable}`}>
      <body className="antialiased bg-primary text-text-primary overflow-x-hidden selection:bg-gold/30 selection:text-gold-light">
        <LanguageProvider>
          <div className="bg-noise" />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
