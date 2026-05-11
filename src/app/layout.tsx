import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LocaleProvider, type Locale } from "@/context/LocaleContext";
import { cookies } from "next/headers";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Título básico y descripción
  title: "RecallNest",
  description: "Optimiza tu estudio con repetición espaciada inteligente. RecallNest predice tus olvidos y te ayuda a memorizar de forma eficiente con mazos personalizados y estadísticas reales.",
  keywords: ["estudio", "flashcards", "memorización", "repetición espaciada", "SM-P", "aprendizaje", "RecallNest"],
  authors: [{ name: "RecallNest Team" }],

  // Configuración para Redes Sociales (Facebook, WhatsApp, LinkedIn)
  openGraph: {
    title: "RecallNest - Estudia de forma inteligente",
    description: "La app que adapta tu ritmo de estudio basándose en la ciencia de la memoria. ¡Descarga tus mazos gratis y empieza a aprender!",
    url: "https://recallnest.vercel.app/", 
    siteName: "RecallNest",
    images: [
      {
        url: "/images/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Vista previa de la App RecallNest",
      },
    ],
    locale: "es_ES",
    type: "website",
  },

  // Configuración específica para Twitter (X)
  twitter: {
    card: "summary_large_image",
    title: "RecallNest | Tu memoria bajo control",
    description: "Aprende más rápido con nuestro algoritmo SM-P. Repetición espaciada diseñada para estudiantes de alto rendimiento.",
    images: ["/images/og-image.png"], 
  },

  // Configuración de Favicons e Iconos de App
  icons: {
    icon: [
      {
        url: "/images/logo2.png", 
        href: "/images/logo2.png",
        sizes: "192x192",
        type: "image/png",
      }
    ],
    apple: [
      {
        url: "/images/logo2.png",
        sizes: "180x180",
        type: "image/png",
      }
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieLocale = (await cookies()).get("recallnest_locale")?.value;
  const initialLocale: Locale =
    cookieLocale === "en" || cookieLocale === "es" || cookieLocale === "pt"
      ? cookieLocale
      : "es";

  return (
    <html
      lang={initialLocale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LocaleProvider initialLocale={initialLocale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
