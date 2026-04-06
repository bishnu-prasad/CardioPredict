import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ResultDashboard from './dashboard/ResultDashboard';
import EmptyState from './EmptyState';

export default function Dashboard({ result, formData, setResult }) {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-12">
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <EmptyState />
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="flex justify-center w-full transition-all duration-300 ease-in-out"
          >
            <ResultDashboard result={result} formData={formData} onReset={() => setResult(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
