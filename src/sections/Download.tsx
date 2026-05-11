"use client";
import { motion } from "framer-motion";
import { useLocale } from "@/context/LocaleContext";
import { Download } from "lucide-react";

export default function CTA() {
    const { t } = useLocale();

   return (
        <section id="download" className="py-32 bg-surface overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 text-center space-y-10">

                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="font-display text-4xl md:text-5xl font-bold text-on-background leading-tight"
                >
                    {t.cta2.titleLine1} <br className="hidden md:block" />
                    {t.cta2.titleLine2}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-on-surface-variant text-lg max-w-2xl mx-auto leading-relaxed"
                >
                    {t.cta2.subtitle}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col sm:flex-row justify-center items-center gap-4"
                >
                    {/* Google Play */}
                    <a
                        href="https://play.google.com/store/apps/details?id=com.recallnest.app"
                        target="_blank"
                        className="flex items-center gap-3 bg-primary-container text-on-primary-container px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300 hover:shadow-lg min-w-[200px] justify-center"
                    >
                        {/* Google Play SVG icon */}
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3.18 23.76c.3.17.64.24.98.2L14.72 12 3.18.04a1.5 1.5 0 0 0-.98.2C1.77.56 1.5 1.1 1.5 1.74v20.52c0 .64.27 1.18.68 1.5z"/>
                            <path d="M18.34 8.34 15.5 12l2.84 3.66 3.4-1.96a1.74 1.74 0 0 0 0-3.4l-3.4-1.96z"/>
                            <path d="M3.18.04 14.72 12 3.18 23.96a1.5 1.5 0 0 0 .98-.2l14.18-8.1-2.84-3.66L3.18.04z" opacity=".6"/>
                            <path d="M3.18 23.96 16.3 15.66l-1.58-1.94L3.18 23.96z" opacity=".4"/>
                        </svg>
                        <div className="text-left">
                            <p className="text-[10px] opacity-80 leading-none">{t.cta2.playStore.label}</p>
                            <p className="text-sm font-bold leading-tight">{t.cta2.playStore.name}</p>
                        </div>
                    </a>

                    {/* Descargar APK */}
                    <a
                        href="/apk/recallnest.apk"
                        download
                        className="flex items-center gap-3 bg-secondary-container text-on-secondary-container px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300 hover:shadow-lg min-w-[200px] justify-center"
                    >
                        <Download size={22} />
                        <div className="text-left">
                            <p className="text-[10px] opacity-80 leading-none">{t.cta2.apk.label}</p>
                            <p className="text-sm font-bold leading-tight">{t.cta2.apk.name}</p>
                        </div>
                    </a>

                    {/* App Store — deshabilitado */}
                    <div
                        className="flex items-center gap-3 bg-surface-variant/40 text-on-surface-variant/40 px-8 py-4 rounded-xl font-semibold min-w-[200px] justify-center cursor-not-allowed select-none relative"
                        title={t.cta2.appStore.soon}
                    >
                        {/* Apple SVG icon */}
                        <svg width="20" height="22" viewBox="0 0 814 1000" fill="currentColor">
                            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-43.5-150.3-109.1C57 427.5 21 323.8 21 225.8c0-171.1 112.4-261.5 221.7-261.5 60 0 109.9 39.5 147.2 39.5 35.8 0 92.1-42.5 159.5-42.5 25.4 0 108.2 2.6 168.1 80.3zm-126.7-86.1c30.1-35.5 51.5-84.7 51.5-134 0-6.5-.6-13-1.9-18.2-48.7 1.9-106.4 32.5-140.8 71.9-26.7 30.8-51.5 80-51.5 130 0 6.5 1.3 13 1.9 15.1 3.2.6 8.4 1.3 13.6 1.3 43.5 0 98.4-29.2 127.2-66.1z"/>
                        </svg>
                        <div className="text-left">
                            <p className="text-[10px] leading-none">{t.cta2.appStore.label}</p>
                            <p className="text-sm font-bold leading-tight">{t.cta2.appStore.name}</p>
                        </div>
                        {/* Badge "Próximamente" */}
                        <span className="absolute -top-2 -right-2 bg-outline-variant text-on-surface-variant text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {t.cta2.appStore.soon}
                        </span>
                    </div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                    className="text-on-surface-variant text-sm italic"
                >
                    {t.cta2.tagline}
                </motion.p>

            </div>
        </section>
    );
}
