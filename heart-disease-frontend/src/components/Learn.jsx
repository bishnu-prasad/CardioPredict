import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Cpu, Database, ShieldAlert } from 'lucide-react';

export default function Learn() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.35, staggerChildren: 0.06 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-5xl px-4 py-12"
    >
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-muted font-semibold text-xs uppercase tracking-widest hover:text-ink transition-colors mb-10 group"
      >
        <ArrowLeft size={16} strokeWidth={2} className="group-hover:-translate-x-0.5 transition-transform" />
        Back to home
      </Link>

      <div className="mb-12 pb-10 border-b border-line">
        <h2 className="text-4xl md:text-5xl font-black text-ink tracking-tight mb-4 flex flex-wrap items-center gap-3">
          <BookOpen className="text-accent" size={32} strokeWidth={2} />
          Knowledge base
        </h2>
        <p className="text-muted font-medium max-w-lg leading-relaxed">
          How CardioPredict uses clinical parameters and what the model is doing under the hood.
        </p>
      </div>

      <div className="grid gap-10">
        <motion.div variants={itemVariants} className="border border-line bg-white p-8 md:p-10">
          <div className="flex items-start gap-6">
            <div className="w-11 h-11 border border-line flex items-center justify-center shrink-0 font-black text-accent">
              01
            </div>
            <div>
              <h3 className="text-sm font-black text-ink mb-4 uppercase tracking-widest">Medical context</h3>
              <p className="text-muted leading-relaxed font-medium">
                Cardiovascular disease is a leading cause of mortality worldwide. Early risk awareness supports better conversations with clinicians. CardioPredict summarizes standard markers to produce a probability estimate—not a diagnosis.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="border border-line bg-white p-8 md:p-10">
          <div className="flex items-start gap-6">
            <div className="w-11 h-11 border border-line flex items-center justify-center shrink-0">
              <Cpu className="text-accent" size={22} strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-sm font-black text-ink mb-4 uppercase tracking-widest">Algorithmic engine</h3>
              <p className="text-muted leading-relaxed font-medium">
                The backend accepts eleven numeric inputs via a FastAPI service. A trained classifier estimates disease probability and reports feature importance so you can see what drove the score.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="border border-line bg-white p-8 md:p-10">
          <div className="flex items-start gap-6">
            <div className="w-11 h-11 border border-line flex items-center justify-center shrink-0">
              <Database className="text-accent" size={22} strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-black text-ink mb-4 uppercase tracking-widest">Input glossary</h3>
              <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6 mt-2">
                <GlossaryItem label="Age" desc="Biological age in years (1–120)." />
                <GlossaryItem label="RestingBP" desc="Blood pressure in mm Hg at rest." />
                <GlossaryItem label="Cholesterol" desc="Serum cholesterol in mg/dl." />
                <GlossaryItem label="FastingBS" desc="Fasting blood sugar above 120 mg/dl (1: yes, 0: no)." />
                <GlossaryItem label="MaxHR" desc="Maximum heart rate achieved in testing." />
                <GlossaryItem label="ST slope" desc="ST segment slope on exercise ECG." />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="border border-line bg-cream px-8 py-8 flex gap-4 items-start">
          <ShieldAlert size={20} className="text-muted mt-0.5 shrink-0" strokeWidth={2} />
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-2 text-muted">Disclaimer</h4>
            <p className="text-xs font-medium text-muted leading-relaxed">
              CardioPredict is a demonstration built on public datasets. It is not a clinical diagnostic. Results are probabilistic and must not replace professional medical advice.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function GlossaryItem({ label, desc }) {
  return (
    <div className="flex flex-col border-l-2 border-line pl-4 py-1 hover:border-accent transition-colors">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-accent mb-1">{label}</span>
      <p className="text-xs font-medium text-muted leading-snug">{desc}</p>
    </div>
  );
}
