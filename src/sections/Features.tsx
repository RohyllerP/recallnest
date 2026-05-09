"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Brain, Repeat, TrendingUp, Layers, Flame, Coffee, Target } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";

export default function Features() {
const { t } = useLocale();

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};
    return (
        <section id="features" className="py-24 bg-surface overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Bloque 1: SM-P Model */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-display text-4xl font-bold text-primary mb-4"
                    >
                        {t.features.smpTitle}
                    </motion.h2>
                    <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
                        {t.features.smpSubtitle}
                    </p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32"
                >
                    {/* Card 1 */}
                    <motion.div variants={itemVariants} className="bg-white p-8 rounded-2xl shadow-sm border-2 border-primary/10 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-md">
                        <div className="w-16 h-16 bg-primary-container/10 text-primary-container rounded-2xl flex items-center justify-center mb-6">
                            <Brain size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-on-surface">{t.features.smpCards.adaptive.title}</h3>
                        <p className="text-on-surface-variant leading-relaxed">{t.features.smpCards.adaptive.desc}</p>
                    </motion.div>

                    {/* Card 2 - Destacada */}
                    <motion.div variants={itemVariants} className="bg-white p-8 rounded-2xl shadow-xl border-2 border-primary/10 flex flex-col items-center text-center scale-105 relative z-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
                        <div className="w-16 h-16 bg-secondary-container/20 text-on-secondary-container rounded-2xl flex items-center justify-center mb-6">
                            <Repeat size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-on-surface">{t.features.smpCards.spaced.title}</h3>
                        <p className="text-on-surface-variant leading-relaxed">{t.features.smpCards.spaced.desc}</p>
                    </motion.div>

                    {/* Card 3 */}
                    <motion.div variants={itemVariants} className="bg-white p-8 rounded-2xl shadow-sm border-2 border-primary/10 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-md">
                        <div className="w-16 h-16 bg-[#d9e6dd] text-[#131e19] rounded-2xl flex items-center justify-center mb-6">
                            <TrendingUp size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-on-surface">{t.features.smpCards.progress.title}</h3>
                        <p className="text-on-surface-variant leading-relaxed">{t.features.smpCards.progress.desc}</p>
                    </motion.div>
                </motion.div>

                {/* Bloque 2: Study Modes */}
           <div className="text-center mb-16">
    <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-display text-4xl font-bold text-on-background mb-4"
    >
        {t.features.modesTitle}
    </motion.h2>
    <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="text-on-surface-variant max-w-2xl mx-auto text-lg"
    >
        {t.features.modesSubtitle}
    </motion.p>
</div>

<motion.div
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
>
    {/* Modo Normal */}
    <motion.div variants={itemVariants} className="bg-[#f2f4f4] p-6 rounded-2xl flex flex-col gap-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-md cursor-pointer">
        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary transition-transform duration-300 group-hover:scale-110">
            <Layers size={24} />
        </div>
        <div>
            <h4 className="font-bold text-on-surface mb-1">{t.features.modes.normal.title}</h4>
            <p className="text-sm text-on-surface-variant">{t.features.modes.normal.desc}</p>
        </div>
    </motion.div>

    {/* Modo Hard */}
    <motion.div variants={itemVariants} className="bg-[#f2f4f4] p-6 rounded-2xl flex flex-col gap-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-md cursor-pointer">
        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-orange-500">
            <Flame size={24} />
        </div>
        <div>
            <h4 className="font-bold text-on-surface mb-1">{t.features.modes.hard.title}</h4>
            <p className="text-sm text-on-surface-variant">{t.features.modes.hard.desc}</p>
        </div>
    </motion.div>

    {/* Modo Casual */}
    <motion.div variants={itemVariants} className="bg-[#f2f4f4] p-6 rounded-2xl flex flex-col gap-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-md cursor-pointer">
        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-green-600">
            <Coffee size={24} />
        </div>
        <div>
            <h4 className="font-bold text-on-surface mb-1">{t.features.modes.casual.title}</h4>
            <p className="text-sm text-on-surface-variant">{t.features.modes.casual.desc}</p>
        </div>
    </motion.div>

    {/* Modo Individual */}
    <motion.div variants={itemVariants} className="bg-[#f2f4f4] p-6 rounded-2xl flex flex-col gap-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-md cursor-pointer">
        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary-container">
            <Target size={24} />
        </div>
        <div>
            <h4 className="font-bold text-on-surface mb-1">{t.features.modes.custom.title}</h4>
            <p className="text-sm text-on-surface-variant">{t.features.modes.custom.desc}</p>
        </div>
    </motion.div>
</motion.div>

            </div>
        </section>
    );
}