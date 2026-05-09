"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useLocale } from "@/context/LocaleContext";
import {
    BarChart2, Flame, BookOpen, TrendingUp,
    Calendar, AlertCircle, CheckCircle2, Brain
} from "lucide-react";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

function AnimatedBar({ height, delay, color }: { height: number; delay: number; color: string }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    return (
        <div ref={ref} className="flex-1 flex items-end h-32">
            <motion.div
                className={`w-full rounded-t-lg ${color}`}
                initial={{ height: 0 }}
                animate={inView ? { height: `${height}%` } : { height: 0 }}
                transition={{ duration: 0.6, delay, ease: "easeOut" }}
            />
        </div>
    );
}

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
    const [display, setDisplay] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView) return;
        let current = 0;
        const step = Math.ceil(value / 40);
        const timer = setInterval(() => {
            current += step;
            if (current >= value) { setDisplay(value); clearInterval(timer); }
            else setDisplay(current);
        }, 30);
        return () => clearInterval(timer);
    }, [inView, value]);

    return <span ref={ref}>{display}{suffix}</span>;
}

export default function Progress() {
    const { t } = useLocale();

    const weekBars = [
        { height: 40, color: "bg-primary/30" },
        { height: 75, color: "bg-primary-container" },
        { height: 55, color: "bg-primary/30" },
        { height: 95, color: "bg-secondary-container" },
        { height: 50, color: "bg-primary-container" },
        { height: 80, color: "bg-secondary-container" },
        { height: 65, color: "bg-primary-container" },
    ];

    const nextDays = [14, 8, 22, 5, 17, 11, 9];

    const hardWords = [
        { word: t.stats.hardWords.w1, retention: 42 },
        { word: t.stats.hardWords.w2, retention: 58 },
        { word: t.stats.hardWords.w3, retention: 61 },
    ];

    return (
        <section id="progress" className="py-24 bg-surface overflow-hidden">
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
                        {t.stats.title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="text-on-surface-variant max-w-2xl mx-auto text-lg"
                    >
                        {t.stats.subtitle}
                    </motion.p>
                </div>

                {/* Bento Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-6"
                >
                    {/* Card grande — Rendimiento semanal */}
                    <motion.div variants={itemVariants} className="md:col-span-8 bg-white rounded-2xl p-8 border-2 border-primary/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                <BarChart2 size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-on-surface">{t.stats.weekly.title}</h3>
                                <p className="text-xs text-on-surface-variant">{t.stats.weekly.subtitle}</p>
                            </div>
                        </div>
                        <div className="flex items-end gap-2 h-32 mb-3">
                            {weekBars.map((bar, i) => (
                                <AnimatedBar key={i} height={bar.height} delay={i * 0.08} color={bar.color} />
                            ))}
                        </div>
                        <div className="flex gap-2 text-xs text-on-surface-variant justify-between px-1">
                            {t.stats.weekly.days.map((d: string, i: number) => (
                                <span key={i} className="flex-1 text-center">{d}</span>
                            ))}
                        </div>
                        <div className="grid grid-cols-3 gap-4 border-t border-outline-variant/30 mt-6 pt-6">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-primary"><AnimatedNumber value={85} suffix="%" /></p>
                                <p className="text-xs text-on-surface-variant mt-1">{t.stats.weekly.retention}</p>
                            </div>
                            <div className="text-center border-x border-outline-variant/30">
                                <p className="text-2xl font-bold text-primary"><AnimatedNumber value={1200} />+</p>
                                <p className="text-xs text-on-surface-variant mt-1">{t.stats.weekly.cards}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-primary"><AnimatedNumber value={14} suffix="d" /></p>
                                <p className="text-xs text-on-surface-variant mt-1">{t.stats.weekly.streak}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card — Racha */}
                    <motion.div variants={itemVariants} className="md:col-span-4 bg-primary-container text-on-primary-container rounded-2xl p-8 border-2 border-primary/10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                            <Flame size={24} />
                            <h3 className="font-bold text-xl">{t.stats.streak.title}</h3>
                        </div>
                        <p className="text-6xl font-bold mb-2">14</p>
                        <p className="text-sm opacity-80 mb-6">{t.stats.streak.desc}</p>
                        <div className="grid grid-cols-7 gap-1">
                            {Array.from({ length: 14 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="w-full aspect-square rounded-sm bg-white/40"
                                />
                            ))}
                            {Array.from({ length: 7 }).map((_, i) => (
                                <div key={i} className="w-full aspect-square rounded-sm bg-white/10" />
                            ))}
                        </div>
                        <p className="text-xs opacity-60 mt-3">{t.stats.streak.label}</p>
                    </motion.div>

                    {/* Card — Próximas tarjetas 7 días */}
                    <motion.div variants={itemVariants} className="md:col-span-5 bg-white rounded-2xl p-8 border-2 border-primary/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-secondary-container/50 rounded-xl flex items-center justify-center text-on-secondary-container">
                                <Calendar size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-on-surface">{t.stats.upcoming.title}</h3>
                                <p className="text-xs text-on-surface-variant">{t.stats.upcoming.subtitle}</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {nextDays.map((count, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <span className="text-xs text-on-surface-variant w-8 shrink-0">
                                        {i === 0 ? t.stats.upcoming.today : `+${i}d`}
                                    </span>
                                    <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden">
                                        <motion.div
                                            className={`h-full rounded-full ${i === 0 ? "bg-primary-container" : "bg-secondary-container/70"}`}
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${(count / 25) * 100}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, delay: i * 0.08 }}
                                        />
                                    </div>
                                    <span className="text-sm font-bold text-on-surface w-6 text-right">{count}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Card — Palabras difíciles */}
                    <motion.div variants={itemVariants} className="md:col-span-4 bg-secondary-container text-on-secondary-container rounded-2xl p-8 border-2 border-primary/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                        <div className="flex items-center gap-3 mb-6">
                            <AlertCircle size={22} />
                            <h3 className="font-bold">{t.stats.hard.title}</h3>
                        </div>
                        <div className="space-y-4">
                            {hardWords.map((item, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium">{item.word}</span>
                                        <span className="opacity-70">{item.retention}%</span>
                                    </div>
                                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-white/60 rounded-full"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${item.retention}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, delay: i * 0.1 }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs opacity-60 mt-6">{t.stats.hard.note}</p>
                    </motion.div>

                    {/* Card — Retención por categoría */}
                    <motion.div variants={itemVariants} className="md:col-span-3 bg-white rounded-2xl p-8 border-2 border-primary/10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                <Brain size={20} />
                            </div>
                            <h3 className="font-bold text-on-surface text-sm">{t.stats.retention.title}</h3>
                        </div>
                        <div className="space-y-3">
                            {t.stats.retention.categories.map((cat: { name: string; value: number }, i: number) => (
                                <div key={i} className="flex items-center justify-between gap-2">
                                    <span className="text-xs text-on-surface-variant shrink-0">{cat.name}</span>
                                    <div className="flex items-center gap-2 flex-1 justify-end">
                                        <div className="w-16 h-1.5 bg-surface rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-primary-container rounded-full"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${cat.value}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                            />
                                        </div>
                                        <span className="text-xs font-bold text-primary">{cat.value}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 pt-4 border-t border-outline-variant/30 flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-primary-container" />
                            <span className="text-xs text-on-surface-variant">{t.stats.retention.avg}</span>
                        </div>
                    </motion.div>

                    {/* Card ancha — CTA descriptivo */}
                    <motion.div variants={itemVariants} className="md:col-span-12 bg-white rounded-2xl p-10 border-2 border-primary/10 flex flex-col md:flex-row items-start md:items-center gap-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <TrendingUp size={24} className="text-primary" />
                                <h3 className="font-display text-2xl font-bold text-primary">{t.stats.cta.title}</h3>
                            </div>
                            <p className="text-on-surface-variant leading-relaxed max-w-2xl">{t.stats.cta.desc}</p>
                        </div>
                        <ul className="space-y-3 shrink-0">
                            {t.stats.cta.bullets.map((b: string, i: number) => (
                                <li key={i} className="flex items-center gap-3">
                                    <CheckCircle2 size={18} className="text-primary-container shrink-0" />
                                    <span className="text-sm font-medium text-on-surface">{b}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}