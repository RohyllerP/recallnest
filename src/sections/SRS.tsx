"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/context/LocaleContext";
import {
    BookOpenText, TrendingDown, Brain, RefreshCcw,
    ArrowRight, Smile, Clapperboard, BookOpen,
    Target, Zap, Workflow, LayoutGrid, BatteryCharging, Sigma,
    Clock, Share2, BrainCircuit, ChevronDown, Music, TrainFront, History, HardDrive,
} from "lucide-react";
import Image from "next/image";

// Estructura general de pilares
const pillarsConfig = [
    { key: "p1" as const, icon: <BookOpenText size={28} />, color: "bg-primary/10 text-primary" },
    { key: "p2" as const, icon: <TrendingDown size={28} />, color: "bg-secondary-container/30 text-on-secondary-container" },
    { key: "p3" as const, icon: <Brain size={28} />, color: "bg-primary/10 text-primary" },
    { key: "p4" as const, icon: <RefreshCcw size={28} />, color: "bg-[#d9e6dd] text-[#131e19]" }
];
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};
export default function SRS() {
  const { t } = useLocale();
  const [expanded, setExpanded] = useState<number | null>(null);

  // Configuración de los pilares (ya corregida con 'key')
  const pillarsConfig = [
    { key: "p1" as const, icon: <BookOpenText size={28} />, color: "bg-primary/10 text-primary" },
    { key: "p2" as const, icon: <TrendingDown size={28} />, color: "bg-secondary-container/30 text-on-secondary-container" },
    { key: "p3" as const, icon: <Brain size={28} />, color: "bg-primary/10 text-primary" },
    { key: "p4" as const, icon: <RefreshCcw size={28} />, color: "bg-[#d9e6dd] text-[#131e19]" }
  ];

  const pillars = pillarsConfig.map((p, index) => {
    const id = index + 1;
    const data = t.methodology.pillars[p.key];
    
    // Selección de componente de detalle
    let detailsContent;
    if (p.key === "p1") detailsContent = <DetailedInputComprensible t={t} />;
    else if (p.key === "p2") detailsContent = <ForgettingCurveDetail t={t} />;
    else if (p.key === "p3") detailsContent = <ActiveRecallDetail t={t} />;
    else if (p.key === "p4") detailsContent = <SRSAlgorithmDetail t={t} />;

    return { ...p, id, data, details: detailsContent };
  });

  return (
    <section className="py-24 bg-surface overflow-hidden" id="srs">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- HEADER ANIMADO AL SCROLL --- */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-6">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block text-primary font-bold tracking-widest bg-primary/5 px-4 py-2 rounded-full text-xs uppercase"
          >
            {t.methodology.badge}
          </motion.span>

          <motion.h2 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-bold text-on-background"
          >
            {t.methodology.title}
          </motion.h2>

          <motion.p 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-on-surface-variant text-lg leading-relaxed"
          >
            {t.methodology.subtitle}
          </motion.p>
        </div>

        {/* --- BENTO GRID ANIMADO AL SCROLL --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.id}
              layout // Mantiene fluidez al expandir
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }} // Cascada inicial al hacer scroll
              className="bg-white rounded-[2rem] border border-outline-variant/30 p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Header de la Card */}
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 ${pillar.color} rounded-2xl flex items-center justify-center`}>
                  {pillar.icon}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-on-surface mb-3">{pillar.data.title}</h3>
              <p className="text-on-surface-variant mb-6 leading-relaxed">{pillar.data.short}</p>

              {/* Botón interactivo */}
              <button 
                onClick={() => setExpanded(expanded === pillar.id ? null : pillar.id)}
                className="group flex items-center gap-2 text-primary font-bold transition-all"
              >
                <span>{expanded === pillar.id ? t.methodology.readLess : t.methodology.readMore}</span>
                <ArrowRight size={18} className={`transition-transform ${expanded === pillar.id ? "rotate-90" : "group-hover:translate-x-1"}`} />
              </button>

              {/* CONTENIDO INTERNO (El que ya corregimos con stagger) */}
              <AnimatePresence>
                {expanded === pillar.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-8 mt-8 border-t border-outline-variant/30">
                      {pillar.details}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------
// --- COMPONENTE DETALLADO: Réplica fiel de tus capturas ---
// ---------------------------------------------------------
function DetailedInputComprensible({ t }: any) {
  const d = t.methodology.ciDetails;

  // Definimos variantes para la cascada de elementos
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12, // Tiempo entre la aparición de cada hijo
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 text-on-surface"
    >
      {/* 1. La Formula Card */}
      <motion.div variants={itemVariants} className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-ambient space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            {d.formula.title}
            <span className="text-primary italic font-medium">i + 1</span>
          </h3>
          <div className="w-9 h-9 rounded-full bg-[#d9e6dd] text-[#131e19] flex items-center justify-center">
            <Sigma size={18} strokeWidth={3} />
          </div>
        </div>

        <p className="text-sm text-on-surface-variant leading-relaxed">{d.formula.desc}</p>

        {/* Ratio Bar con animación interna */}
        <div className="space-y-2">
          <div className="flex h-16 rounded-xl overflow-hidden font-bold text-white">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "80%" }}
              transition={{ duration: 1, ease: "circOut", delay: 0.3 }}
              className="bg-primary flex flex-col items-center justify-center text-center p-2"
            >
              <span className="text-lg">80%</span>
              <small className="text-[10px] font-medium opacity-80 whitespace-nowrap">{d.formula.label80}</small>
            </motion.div>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "20%" }}
              transition={{ duration: 1, ease: "circOut", delay: 0.5 }}
              className="bg-[#d2f8e1] text-on-secondary-container flex flex-col items-center justify-center text-center p-2 border-l border-white/20"
            >
              <span className="text-lg">20%</span>
              <small className="text-[10px] font-medium opacity-80 whitespace-nowrap">{d.formula.label20}</small>
            </motion.div>
          </div>
          <div className="flex justify-between text-[10px] uppercase font-bold tracking-tight text-on-surface-variant/70 px-1">
            <span>{d.formula.comfort}</span>
            <span>{d.formula.challenge}</span>
          </div>
        </div>
      </motion.div>

      {/* 2. Ejemplos Rápidos */}
      <motion.div variants={itemVariants} className="space-y-4 pt-4">
        <h3 className="text-sm font-bold text-on-surface px-1">{d.examples.title}</h3>
        <div className="space-y-3">
          <ExampleCard icon={<Smile size={20} />} color="bg-orange-50 text-orange-600" title={d.examples.child.title} desc={d.examples.child.desc} />
          <ExampleCard icon={<Clapperboard size={20} />} color="bg-blue-50 text-blue-600" title={d.examples.series.title} desc={d.examples.series.desc} />
          <ExampleCard icon={<BookOpenText size={20} />} color="bg-green-50 text-green-600" title={d.examples.reading.title} desc={d.examples.reading.desc} />
        </div>
      </motion.div>

      {/* 3. Cómo ayuda Card */}
      <motion.div variants={itemVariants} className="bg-[#e7f0ee] p-6 md:p-8 rounded-3xl space-y-4">
        <div className="flex items-center gap-3">
          <Workflow className="text-primary" size={24} />
          <h3 className="text-xl font-bold">{d.benefits.title}</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <BenefitCard icon={<Zap size={18} />} title={d.benefits.stress.title} desc={d.benefits.stress.desc} />
          <BenefitCard icon={<LayoutGrid size={18} />} title={d.benefits.patterns.title} desc={d.benefits.patterns.desc} />
        </div>
      </motion.div>

      {/* 4. El misterio del output (Dark Card) */}
      <motion.div variants={itemVariants} className="bg-gradient-to-br from-[#0f172a] to-[#111827] p-8 rounded-3xl text-white relative overflow-hidden space-y-6 shadow-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[24px]"></div>

        <div className="flex items-center gap-3 relative z-10">
          <BatteryCharging className="text-[#facc15]" size={24} />
          <h3 className="text-xl font-bold">{d.output.title}</h3>
        </div>

        <div className="space-y-3 relative z-10">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider font-bold text-white/70">
            <span className="w-14 text-right">{d.output.input}</span>
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: "100%" }} 
                transition={{ duration: 1.5, ease: "circOut", delay: 0.8 }}
                className="h-full bg-primary-container animate-pulse-slow" 
              />
            </div>
          </div>
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider font-bold text-white/70">
            <span className="w-14 text-right">{d.output.output}</span>
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: "15%" }} 
                transition={{ duration: 1.5, ease: "circOut", delay: 1 }}
                className="h-full bg-red-400" 
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 text-xs leading-relaxed text-white/80 relative z-10">
          <p>{d.output.desc1}</p>
          <p className="font-bold text-white text-sm border-l-2 border-primary-container pl-3">
            {d.output.desc2}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// -- Sub-componentes visuales reutilizables --
function ExampleCard({ icon, color, title, desc }: any) {
    return (
        <div className="bg-white p-4 rounded-2xl border border-outline-variant/30 flex gap-4 items-center shadow-sm">
            <div className={`w-11 h-11 ${color} rounded-full flex items-center justify-center flex-shrink-0`}>
                {icon}
            </div>
            <div>
                <h4 className="text-sm font-bold text-on-surface mb-1">{title}</h4>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}

function BenefitCard({ icon, title, desc }: any) {
    return (
        <div className="space-y-1.5 p-1">
            <div className="flex gap-2 items-center text-primary font-bold">
                {icon}
                <h4 className="text-sm">{title}</h4>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">{desc}</p>
        </div>
    );
}

// Placeholder para las otras tarjetas no expandidas
function GenericDetail({ text }: { text: string }) {
    return <p className="text-sm text-on-surface-variant italic leading-relaxed pt-4 border-t border-outline-variant mt-4">{text}</p>;
}
function ForgettingCurveDetail({ t }: any) {
  const d = t.methodology.forgettingCurve;

  // Variantes para la cascada (Stagger)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 text-on-surface"
    >
      {/* 1. Gráfico de la Curva */}
      <motion.div
        variants={itemVariants}
        className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
              <TrendingDown size={20} />
            </span>
            {d.whatIs.title}
          </h3>
          <motion.span 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
          >
            {d.whatIs.lossBadge}
          </motion.span>
        </div>

        {/* Visualización de la Curva (SVG) */}
        <div className="bg-slate-50 rounded-2xl p-6 relative overflow-hidden">
          <svg viewBox="0 0 300 120" className="w-full h-auto overflow-visible">
            {/* Ejes */}
            <line x1="30" y1="10" x2="30" y2="100" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="30" y1="100" x2="280" y2="100" stroke="#cbd5e1" strokeWidth="2" />

            {/* Etiquetas de los ejes */}
            <text x="-65" y="20" fill="#94a3b8" fontSize="10" fontWeight="bold" transform="rotate(-90)" textAnchor="middle">
              {d.whatIs.chartLabelY}
            </text>
            <text x="155" y="115" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">
              {d.whatIs.chartLabelX}
            </text>

            {/* La Curva de Ebbinghaus Animada */}
            <motion.path
              d="M 30 20 Q 60 90 260 95"
              fill="none"
              stroke="#ef4444"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ 
                duration: 1.8, 
                ease: "easeInOut",
                delay: 0.4 
              }}
            />
          </svg>
        </div>

        <div className="space-y-3 pt-2">
          <p className="text-sm text-on-surface-variant leading-relaxed">
            {d.whatIs.desc1}
          </p>
          <motion.div 
            variants={itemVariants}
            className="p-4 bg-red-50/50 rounded-xl border border-red-100/50"
          >
            <p className="text-sm font-medium text-red-900">
              <span className="font-bold">Realidad:</span> {d.whatIs.desc2}
            </p>
          </motion.div>
          <p className="text-[12px] text-on-surface-variant italic opacity-70">
            {d.whatIs.desc3}
          </p>
        </div>
      </motion.div>

      {/* 2. Ejemplos de la Vida Cotidiana */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant/70 flex items-center gap-2 px-1">
          <LayoutGrid size={16} />
          {d.dailyExamples.title}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <SmallExampleCard
            icon="👥"
            title={d.dailyExamples.names.title}
            desc={d.dailyExamples.names.desc}
          />
          <SmallExampleCard
            icon="🎙️"
            title={d.dailyExamples.conferences.title}
            desc={d.dailyExamples.conferences.desc}
          />
          <SmallExampleCard
            icon="📖"
            title={d.dailyExamples.reading.title}
            desc={d.dailyExamples.reading.desc}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
function SmallExampleCard({ icon, title, desc }: any) {
    return (
        <div className="bg-white p-4 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col items-center text-center gap-2">
            <span className="text-2xl">{icon}</span>
            <h4 className="text-xs font-bold text-on-surface">{title}</h4>
            <p className="text-[10px] text-on-surface-variant leading-tight">{desc}</p>
        </div>
    );
}

function ActiveRecallDetail({ t }: any) {
    const d = t.methodology.activeRecall;

    return (
        <div className="space-y-8 text-on-surface">

            {/* 1. Comparativa Pasivo vs Activo */}
            <div className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <span className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <Brain size={20} />
                    </span>
                    {d.vsCard.title}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                        <div className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">{d.vsCard.passive}</div>
                        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden mb-2">
                            <motion.div animate={{ x: [-100, 200] }} transition={{ repeat: Infinity, duration: 2 }} className="h-full w-20 bg-slate-300" />
                        </div>
                        <p className="text-[11px] text-on-surface-variant">La información "resbala" por tu mente sin dejar huella.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20">
                        <div className="text-[10px] font-bold text-primary uppercase mb-2 tracking-widest">{d.vsCard.active}</div>
                        <div className="flex gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ delay: i * 0.2, repeat: Infinity }}
                                    className="h-1.5 flex-1 bg-primary rounded-full"
                                />
                            ))}
                        </div>
                        <p className="text-[11px] text-primary font-medium">Esfuerzo consciente que genera memoria real.</p>
                    </div>
                </div>

                <p className="text-sm text-on-surface-variant leading-relaxed italic border-l-4 border-primary/20 pl-4">
                    {d.vsCard.desc}
                </p>
            </div>

            {/* 2. Pasos del Proceso */}
            <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant/70 flex items-center gap-2">
                    <Zap size={16} />
                    {d.steps.title}
                </h3>

                <div className="space-y-3">
                    <StepItem number="1" title={d.steps.step1.title} desc={d.steps.step1.desc} />
                    <StepItem number="2" title={d.steps.step2.title} desc={d.steps.step2.desc} isHighlight />
                    <StepItem number="3" title={d.steps.step3.title} desc={d.steps.step3.desc} />
                </div>
            </div>

            {/* 3. Beneficios (Bento inferior) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#eef2ff] p-5 rounded-2xl border border-blue-100">
                    <h4 className="font-bold text-blue-900 flex items-center gap-2 mb-2">
                        <Workflow size={18} /> {d.benefits.neural.title}
                    </h4>
                    <p className="text-[11px] text-blue-800/80 leading-relaxed">{d.benefits.neural.desc}</p>
                </div>
                <div className="bg-[#f0fdf4] p-5 rounded-2xl border border-green-100">
                    <h4 className="font-bold text-green-900 flex items-center gap-2 mb-2">
                        <Target size={18} /> {d.benefits.time.title}
                    </h4>
                    <p className="text-[11px] text-green-800/80 leading-relaxed">{d.benefits.time.desc}</p>
                </div>
            </div>

        </div>
    );
}

function StepItem({ number, title, desc, isHighlight }: any) {
    return (
        <div className={`flex gap-4 p-4 rounded-2xl transition-all ${isHighlight ? 'bg-primary text-white' : 'bg-white border border-outline-variant/30'}`}>
            <span className={`text-lg font-black opacity-40 ${isHighlight ? 'text-white' : 'text-primary'}`}>{number}</span>
            <div>
                <h4 className="text-sm font-bold mb-1">{title}</h4>
                <p className={`text-[11px] leading-relaxed ${isHighlight ? 'text-white/80' : 'text-on-surface-variant'}`}>{desc}</p>
            </div>
        </div>
    );
}
function SRSAlgorithmDetail({ t }: any) {
  const d = t.methodology.srs;
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggle = (section: string) => setOpenSection(openSection === section ? null : section);

  // Variantes para la cascada (Stagger)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 text-on-surface pb-4"
    >
      {/* --- SECCIÓN 1: EL ALGORITMO --- */}
      <motion.div variants={itemVariants} className="bg-white p-6 rounded-[2rem] border border-outline-variant/30 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <History size={22} />
          </div>
          <h3 className="font-bold text-lg">{d.algorithm.title}</h3>
        </div>
        <p className="text-sm text-on-surface-variant">{d.algorithm.desc}</p>

        {/* Tarjetas de Intervalo con hover y animación de entrada */}
        <div className="grid grid-cols-3 gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <StatusCard val={d.algorithm.status.good.val} label={d.algorithm.status.good.label} color="bg-blue-50 text-blue-700" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <StatusCard val={d.algorithm.status.better.val} label={d.algorithm.status.better.label} color="bg-slate-50 text-slate-700" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <StatusCard val={d.algorithm.status.fail.val} label={d.algorithm.status.fail.label} color="bg-red-50 text-red-700" />
          </motion.div>
        </div>

        {/* Colapsable: Cómo funciona */}
        <div className="pt-2">
          <button onClick={() => toggle('how')} className="flex items-center gap-1 text-primary font-bold text-sm">
            {d.algorithm.howItWorks.trigger}
            <ChevronDown size={16} className={`transition-transform duration-300 ${openSection === 'how' ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {openSection === 'how' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="text-xs text-on-surface-variant mt-3 leading-relaxed">
                  {d.algorithm.howItWorks.content}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* --- SECCIÓN 2: MOMENTOS DE LA VIDA --- */}
      <motion.div variants={itemVariants} className="bg-white p-6 rounded-[2rem] border border-outline-variant/30 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Share2 size={22} />
          </div>
          <h3 className="font-bold text-lg">{d.lifeMoments.title}</h3>
        </div>
        <p className="text-sm text-on-surface-variant">{d.lifeMoments.desc}</p>

        <div className="grid grid-cols-2 gap-3">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-emerald-50/50 p-4 rounded-2xl flex flex-col items-center gap-2 border border-emerald-100"
          >
            <Music className="text-emerald-600" size={20} />
            <span className="text-xs font-bold">{d.lifeMoments.scales}</span>
          </motion.div>
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-emerald-50/50 p-4 rounded-2xl flex flex-col items-center gap-2 border border-emerald-100"
          >
            <TrainFront className="text-emerald-600" size={20} />
            <span className="text-xs font-bold">{d.lifeMoments.commute}</span>
          </motion.div>
        </div>

        <div className="pt-2">
          <button onClick={() => toggle('life')} className="flex items-center gap-1 text-primary font-bold text-sm">
            {d.lifeMoments.readMore}
            <ChevronDown size={16} className={`transition-transform duration-300 ${openSection === 'life' ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {openSection === 'life' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="text-xs text-on-surface-variant mt-3 leading-relaxed">
                  {d.lifeMoments.expanded}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* --- SECCIÓN 3: CEREBRO A LARGO PLAZO --- */}
      <motion.div 
        variants={itemVariants} 
        className="bg-white p-6 rounded-[2rem] border border-outline-variant/30 shadow-sm space-y-4 border-b-4 border-b-red-500"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
            <BrainCircuit size={22} />
          </div>
          <h3 className="font-bold text-lg">{d.longTerm.title}</h3>
        </div>
        <p className="text-sm text-on-surface-variant">{d.longTerm.desc}</p>

        {/* Animación de flujo entre Temporal y Permanente */}
        <div className="flex items-center justify-center gap-6 py-4">
          <div className="flex flex-col items-center gap-1">
            <History className="text-slate-400" size={24} />
            <span className="text-[10px] font-bold text-slate-400">{d.longTerm.temporal}</span>
          </div>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowRight className="text-slate-300" size={20} />
          </motion.div>
          <div className="flex flex-col items-center gap-1">
            <HardDrive className="text-red-500" size={24} />
            <span className="text-[10px] font-bold text-red-500">{d.longTerm.permanent}</span>
          </div>
        </div>

        <div className="pt-2">
          <button onClick={() => toggle('brain')} className="flex items-center gap-1 text-red-500 font-bold text-sm">
            {d.longTerm.metaphor.trigger}
            <ChevronDown size={16} className={`transition-transform duration-300 ${openSection === 'brain' ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {openSection === 'brain' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="text-xs text-on-surface-variant mt-3 leading-relaxed">
                  {d.longTerm.metaphor.content}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

function StatusCard({ val, label, color }: any) {
    return (
        <div className={`${color} p-4 rounded-2xl flex flex-col items-center justify-center border border-current/10`}>
            <span className="text-lg font-black">{val}</span>
            <span className="text-[10px] font-bold tracking-widest">{label}</span>
        </div>
    );
}