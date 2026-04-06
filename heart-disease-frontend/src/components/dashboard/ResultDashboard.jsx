import React from 'react';
import { ChevronLeft, RefreshCw, BarChart2, Info, Activity, FileText, Share2, Printer } from 'lucide-react';
import { motion } from 'framer-motion';
import FeatureChart from './FeatureChart';
import ExplanationBox from './ExplanationBox';
import InputSummary from './InputSummary';
import RecommendationCard from './RecommendationCard';

export default function ResultDashboard({ result, formData, onReset }) {
  const probability = result.probability;
  const pct = (probability * 100).toFixed(1);

  let riskLevel = 'Low Risk';
  let accentColor = '#15803d';

  if (probability >= 0.7) {
    riskLevel = 'High Risk';
    accentColor = '#E10600';
  } else if (probability >= 0.3) {
    riskLevel = 'Moderate Risk';
    accentColor = '#E10600';
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.45,
        staggerChildren: 0.06,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.35 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-14"
    >
      <motion.div
        variants={itemVariants}
        className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-line pb-10"
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 text-muted">
            <FileText size={18} className="text-accent" strokeWidth={2} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Assessment</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-ink tracking-tight">Clinical risk</h2>
          <p className="text-muted font-medium max-w-lg leading-relaxed">
            Based on your inputs and the model output below.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onReset}
            className="px-5 py-2.5 border border-line bg-white text-ink text-xs font-semibold uppercase tracking-widest rounded-md hover:border-ink transition-colors flex items-center gap-2"
          >
            <ChevronLeft size={16} strokeWidth={2} />
            Edit data
          </button>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="bg-accent text-white px-6 py-2.5 rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-[#c70500] transition-colors flex items-center gap-2"
          >
            <RefreshCw size={16} strokeWidth={2} />
            New assessment
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <motion.div variants={itemVariants} className="flex flex-col gap-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">Estimated probability</p>
          <div
            className="text-[clamp(3.5rem,14vw,7.5rem)] font-black leading-none tracking-tight tabular-nums"
            style={{ color: accentColor }}
          >
            {pct}%
          </div>
          <p className="text-lg font-semibold text-ink uppercase tracking-wide">{riskLevel}</p>
          <div className="h-1 w-full max-w-md bg-line rounded-none overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-700"
              style={{ width: `${Math.min(100, parseFloat(pct))}%` }}
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="min-w-0">
          <div className="flex items-center gap-2 mb-6 text-muted">
            <Info size={16} className="text-accent" strokeWidth={2} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Insights</span>
          </div>
          <ExplanationBox data={formData} />
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <RecommendationCard riskLevel={riskLevel} />
      </motion.div>

      <motion.div variants={itemVariants} className="border border-line bg-white p-8 md:p-10">
        <div className="flex items-center gap-2 mb-8 text-muted">
          <BarChart2 size={18} className="text-accent" strokeWidth={2} />
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Feature influence</span>
        </div>
        <FeatureChart importance={result.importance} />
      </motion.div>

      <motion.div variants={itemVariants} className="border border-line bg-white p-8 md:p-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-muted">
            <Activity size={18} className="text-accent" strokeWidth={2} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Input summary</span>
          </div>
          <div className="flex items-center gap-4 text-muted">
            <Share2 size={14} className="cursor-default opacity-40" aria-hidden />
            <Printer size={14} className="cursor-default opacity-40" aria-hidden />
          </div>
        </div>
        <InputSummary data={formData} />
      </motion.div>

      <motion.p
        variants={itemVariants}
        className="text-center text-xs text-muted max-w-2xl mx-auto leading-relaxed"
      >
        This application is for educational purposes only. Results may not be accurate. Consult a medical professional.
      </motion.p>
    </motion.div>
  );
}
