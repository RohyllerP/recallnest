"use client";
import { useEffect, useId, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Play, ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useLocale } from "@/context/LocaleContext";
function MenuToggleButton({
  isOpen,
  onClick,
  ariaLabel,
  className,
}: {
  isOpen: boolean;
  onClick: () => void;
  ariaLabel: string;
  className: string;
}) {
  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.35 }}>
      <button type="button" aria-label={ariaLabel} onClick={onClick} className={className}>
        <span className="relative block w-5 h-5">
          <motion.span
            className="absolute left-0 top-[4px] h-0.5 w-5 rounded-full bg-current"
            animate={isOpen ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
          />
          <motion.span
            className="absolute left-0 top-[10px] h-0.5 w-5 rounded-full bg-current"
            animate={isOpen ? { opacity: 0, scaleX: 0.5 } : { opacity: 1, scaleX: 1 }}
          />
          <motion.span
            className="absolute left-0 top-[16px] h-0.5 w-5 rounded-full bg-current"
            animate={isOpen ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }}
          />
        </span>
      </button>
    </MotionConfig>
  );
}

export default function Hero() {
const { t, locale, setLocale } = useLocale();
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const overlayTitleId = useId();
const phoneImageSrc = locale === "en" ? "/images/home_en.png" : locale === "pt" ? "/images/home_pt.png" : "/images/home_es.png";

useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") setIsMobileMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
}, [isMobileMenuOpen]);

useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
        document.body.style.overflow = previousOverflow;
    };
}, [isMobileMenuOpen]);
  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="flex items-center h-20 px-6 max-w-7xl mx-auto gap-4">
          <div className="text-2xl font-bold text-primary tracking-tight">{t.brand}</div>
          <div className="hidden md:flex flex-1 justify-center gap-8 items-center">
            <a className="text-primary font-bold border-b-2 border-primary pb-1 text-sm" href="#">{t.nav.method}</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-semibold border-b-2 border-transparent pb-1" href="#features">{t.nav.features}</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-semibold border-b-2 border-transparent pb-1" href="#decks">{t.nav.decks}</a>  
            <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-semibold border-b-2 border-transparent pb-1" href="#progress">{t.nav.progress}</a> 
            <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-semibold border-b-2 border-transparent pb-1" href="#download">{t.nav.download}</a>      
             </div>

          <div className="ml-auto flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2">
            <label className="sr-only" htmlFor="lang-select">
              {t.langLabel}
            </label>
            <select
              id="lang-select"
              value={locale}
              onChange={(e) => setLocale(e.target.value as "es" | "en" | "pt")}
              className="h-10 rounded-full border border-outline-variant bg-white/80 px-3 text-sm font-semibold text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="es">ES</option>
              <option value="en">EN</option>
              <option value="pt">PT</option>
            </select>
          </div>
          <MenuToggleButton
            isOpen={isMobileMenuOpen}
            ariaLabel="Abrir menú"
            className="md:hidden w-11 h-11 inline-flex items-center justify-center rounded-full text-primary hover:bg-primary/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          />
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen ? (
        <motion.div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-labelledby={overlayTitleId}
          className="fixed inset-0 z-[100] md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-on-background/90 backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="absolute inset-0 flex flex-col bg-gradient-to-br from-primary via-primary-container to-secondary overflow-hidden"
            initial={{ y: 18, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 18, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.45 }}
          >
            <header className="flex justify-between items-center h-20 px-6 w-full">
              <span id={overlayTitleId} className="text-on-primary-container text-xl font-bold tracking-tight">
                {t.brand}
              </span>
              <MenuToggleButton
                isOpen
                ariaLabel="Cerrar menú"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-white/85 text-on-background hover:bg-white transition-colors"
              />
            </header>

            <nav className="flex-1 flex flex-col items-center justify-center gap-10 px-6">
              <ul className="flex flex-col items-center gap-8">
                <li>
                  <a
                    className="text-4xl font-bold text-on-primary-container hover:text-white transition-colors"
                    href="#"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t.nav.method}
                  </a>
                </li>
                <li>
                  <a
                    className="text-4xl font-bold text-on-primary-container hover:text-white transition-colors"
                    href="#features"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t.nav.features}
                  </a>
                </li>
                <li>
                  <a
                    className="text-4xl font-bold text-on-primary-container hover:text-white transition-colors"
                    href="#decks"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t.nav.decks}
                  </a>
                </li>
                <li>
                  <a
                    className="text-4xl font-bold text-on-primary-container hover:text-white transition-colors"
                    href="#progress"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t.nav.progress}
                  </a>
                </li>
                <li>
                  <a
                    className="text-4xl font-bold text-on-primary-container hover:text-white transition-colors"
                    href="#download"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t.nav.download}
                  </a>
                </li>
              </ul>

              <div className="w-full max-w-xs">
                <label className="sr-only" htmlFor="lang-select-mobile">
                  {t.langLabel}
                </label>
                <div className="relative">
                  <select
                    id="lang-select-mobile"
                    value={locale}
                    onChange={(e) => setLocale(e.target.value as "es" | "en" | "pt")}
                    className="w-full h-12 appearance-none rounded-full border border-on-background/30 bg-white/95 px-4 pr-12 text-base font-semibold text-on-background focus:outline-none focus:ring-2 focus:ring-on-background/20"
                  >
                    <option value="es">ES</option>
                    <option value="en">EN</option>
                    <option value="pt">PT</option>
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-on-background/70"
                    size={18}
                  />
                </div>
              </div>
            </nav>

            <footer className="p-6 flex flex-col items-center gap-4">
              <div className="flex flex-wrap justify-center gap-3 text-white/80 text-sm font-semibold">
                <a className="hover:text-white transition-colors" href="#">
                  {t.overlay.contact}
                </a>
                <span className="opacity-40">•</span>
                <a className="hover:text-white transition-colors" href="#">
                  {t.overlay.privacy}
                </a>
                <span className="opacity-40">•</span>
                <a className="hover:text-white transition-colors" href="#">
                  {t.overlay.terms}
                </a>
              </div>
              <p className="text-white/50 text-[12px] text-center">© {new Date().getFullYear()} RecallNest</p>
            </footer>

            <div className="absolute -top-24 -left-24 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          </motion.div>
        </motion.div>
      ) : null}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="pt-32 pb-20 md:pt-48 md:pb-32 bg-gradient-to-br from-[#f8fafa] to-[#e3fffe] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold text-on-background leading-tight">
              {t.hero.titleLine1} <br />
              <span className="text-primary-container">{t.hero.titleLine2}</span>
            </h1>
            <p className="text-lg text-on-surface-variant max-w-lg leading-relaxed">{t.hero.subtitle}</p>
            
            <div className="flex flex-wrap gap-4">
              <a className="bg-primary-container text-on-primary-container px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-2 hover:shadow-lg transition-all" href="#">
                <Play size={20} fill="currentColor" />
                {t.cta.downloadPlay}
              </a>
              <a className="border-2 border-primary text-primary px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-primary/5 transition-colors" href="#">
                {t.cta.learnMore}
                <ArrowRight size={20} />
              </a>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-secondary-container flex items-center justify-center text-[#00210c] font-bold text-xs">MA</div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-[#93f2f2] flex items-center justify-center text-[#002020] font-bold text-xs">RL</div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-[#d9e6dd] flex items-center justify-center text-[#131e19] font-bold text-xs">JS</div>
              </div>
              <p className="text-on-surface-variant text-sm font-medium">{t.socialProof.join}</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl"></div>
            <div className="relative z-10 w-full max-w-[180px] sm:max-w-[210px] md:max-w-[240px] lg:max-w-[270px]">
              {/* Phone Frame */}
              <div className="relative rounded-[3rem] border-[8px] border-on-background bg-[#F6F9FA] shadow-2xl aspect-[9/19.5] overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-6 bg-on-background rounded-b-xl w-1/3 mx-auto z-20"></div>
                <div className="absolute inset-x-0 top-8 -bottom-8">
                  <Image
                    src={phoneImageSrc}
                    alt="App preview"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 320px, 320px"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </motion.div>

        </div>
      </header>
    </>
  );
}
