import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, ShieldCheck, BrainCircuit, ArrowRight } from 'lucide-react';
import HeroVisual from './HeroVisual';

export default function Landing() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.45 },
    },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-[1200px] mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-16 lg:gap-20 items-center"
    >
      <div className="relative z-10">
        <motion.p
          variants={itemVariants}
          className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#6B6B6B] mb-8"
        >
          AI-assisted screening
        </motion.p>

        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-black leading-[1.05] tracking-tight">
            Know Your
          </h1>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#E10600] leading-[1.05] tracking-tight mt-1">
            Heart Risk
          </h1>
        </motion.div>

        <motion.p variants={itemVariants} className="text-lg text-[#6B6B6B] max-w-xl mb-12 leading-relaxed">
          Machine learning estimates cardiovascular risk from standard clinical inputs—fast, structured, and easy to read.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-16">
          <button
            type="button"
            onClick={() => navigate('/predict')}
            className="bg-[#E10600] text-white px-10 py-4 rounded-md font-semibold text-xs uppercase tracking-widest transition-all duration-300 ease-in-out hover:bg-[#c70500] hover:scale-105 active:scale-100 flex items-center gap-3"
          >
            Start prediction
            <ArrowRight size={18} strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={() => navigate('/learn')}
            className="border border-[#E5E5E5] bg-white text-black px-10 py-4 rounded-md font-semibold text-xs uppercase tracking-widest transition-all duration-300 ease-in-out hover:border-black hover:scale-105 active:scale-100"
          >
            How it works
          </button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-10 pt-10 border-t border-[#E5E5E5]"
        >
          <div className="flex items-center gap-2 text-[#6B6B6B] text-sm">
            <Zap size={16} className="text-[#E10600]" strokeWidth={2} />
            <span>Instant results</span>
          </div>
          <div className="flex items-center gap-2 text-[#6B6B6B] text-sm">
            <ShieldCheck size={16} className="text-[#E10600]" strokeWidth={2} />
            <span>Private session</span>
          </div>
          <div className="flex items-center gap-2 text-[#6B6B6B] text-sm">
            <BrainCircuit size={16} className="text-[#E10600]" strokeWidth={2} />
            <span>Transparent inputs</span>
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="relative flex justify-center lg:justify-end">
        <div className="w-full max-w-md transition-all duration-300 ease-in-out hover:-translate-y-1">
          <HeroVisual />
        </div>
      </motion.div>
    </motion.section>
  );
}
