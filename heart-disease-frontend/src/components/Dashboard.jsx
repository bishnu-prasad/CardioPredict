import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ResultDashboard from './dashboard/ResultDashboard';
import EmptyState from './EmptyState';

export default function Dashboard({ result, formData, setResult }) {
  return (
    <div className="dashboard-page-wrap" style={{ width: '100%', minHeight: '80vh' }}>
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <EmptyState />
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          >
            <ResultDashboard 
              result={result} 
              formData={formData} 
              onReset={() => setResult(null)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
