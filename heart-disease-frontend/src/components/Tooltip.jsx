import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Tooltip({ text, children }) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() => setShow(!show)}
      style={{ cursor: 'help' }}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-[1000] w-[200px] -translate-x-1/2 rounded-md border border-line bg-ink px-3 py-2 text-left text-[11px] leading-snug text-cream shadow-none"
          >
            {text}
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-ink"
              aria-hidden
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
