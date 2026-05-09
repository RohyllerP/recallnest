"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, ImagePlay, HardDriveDownload, Trophy } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";

export default function Decks() {
const { t } = useLocale();

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};
    return (
        <section id="decks" className="py-24 bg-surface overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="font-display text-4xl font-bold text-primary mb-4"
                    >
                        {t.decks.title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="text-on-surface-variant max-w-2xl mx-auto text-lg"
                    >
                        {t.decks.subtitle}
                    </motion.p>
                </div>

                {/* Bento Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-6 md:h-[600px]"
                >
                    {/* Card grande fila 1 — Decks gratuitos */}
                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-8 bg-white rounded-2xl p-10 border-2 border-primary/10 flex flex-col justify-between overflow-hidden relative group transition-all duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer"
                    >
                        <div className="relative z-10">
                            <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block uppercase tracking-wider">
                                {t.decks.community.badge}
                            </span>
                            <h3 className="font-display text-3xl font-bold text-primary mb-4">
                                {t.decks.community.title}
                            </h3>
                            <p className="text-on-surface-variant max-w-md text-base leading-relaxed">
                                {t.decks.community.desc}
                            </p>
                        </div>
                        <div className="absolute bottom-[-5%] right-[-2%] opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                            <BookOpen size={180} className="text-primary" />
                        </div>
                    </motion.div>

                    {/* Card pequeña fila 1 — Audio e imágenes */}
                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-4 bg-primary-container text-on-primary-container rounded-2xl p-10 border-2 border-primary/10 flex flex-col justify-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer"
                    >
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                                <ImagePlay size={32} />
                            </div>
                        </div>
                        <h3 className="font-bold text-xl mb-3">{t.decks.media.title}</h3>
                        <p className="opacity-90 text-sm leading-relaxed">{t.decks.media.desc}</p>
                    </motion.div>

                    {/* Card pequeña fila 2 — Gamificación */}
                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-4 bg-secondary-container text-on-secondary-container rounded-2xl p-10 border-2 border-primary/10 flex flex-col justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                                <Trophy size={28} />
                            </div>
                            <span className="text-2xl font-bold opacity-80">{t.decks.gamification.level}</span>
                        </div>
                        <h3 className="font-bold text-xl mb-2">{t.decks.gamification.title}</h3>
                        <p className="text-sm leading-relaxed opacity-90">{t.decks.gamification.desc}</p>
                    </motion.div>

                    {/* Card grande fila 2 — Backup */}
                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-8 bg-white rounded-2xl p-10 border-2 border-primary/10 flex flex-row items-center gap-8 overflow-hidden relative group transition-all duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer"
                    >
                        <div className="flex-1 relative z-10">
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block uppercase tracking-wider">
                                {t.decks.backup.badge}
                            </span>
                            <h3 className="font-display text-2xl font-bold text-primary mb-3">
                                {t.decks.backup.title}
                            </h3>
                            <p className="text-on-surface-variant leading-relaxed mb-2">
                                {t.decks.backup.desc}
                            </p>
                            <p className="text-xs text-on-surface-variant/60">
                                {t.decks.backup.note}
                            </p>
                        </div>
                        <div className="hidden sm:flex shrink-0 w-28 h-28 bg-surface rounded-full items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                            <HardDriveDownload size={48} className="text-primary" />
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}