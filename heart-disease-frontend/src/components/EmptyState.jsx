import React from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="max-w-lg w-full text-center"
      >
        <div className="inline-flex items-center justify-center w-14 h-14 border border-line bg-white mb-10">
          <Search size={28} className="text-accent" strokeWidth={2} />
        </div>

        <h2 className="text-3xl md:text-4xl font-black text-ink tracking-tight mb-4">No results yet</h2>

        <p className="text-muted font-medium text-base mb-10 leading-relaxed">
          Run a prediction to see your risk estimate and insights here.
        </p>

        <Link
          to="/predict"
          className="inline-flex items-center justify-center gap-2 w-full max-w-sm mx-auto bg-accent text-white px-8 py-4 rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-[#c70500] transition-colors"
        >
          Start prediction
          <ArrowRight size={18} strokeWidth={2} />
        </Link>
      </motion.div>
    </div>
  );
}
