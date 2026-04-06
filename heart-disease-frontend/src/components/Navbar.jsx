import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const linkClass = ({ isActive }) =>
  `relative pb-1 text-sm font-semibold uppercase tracking-widest transition-all duration-300 ease-in-out ${
    isActive
      ? 'text-black after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:bg-[#E10600]'
      : 'text-[#6B6B6B] hover:text-black'
  }`;

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="sticky top-0 z-50 w-full border-b border-[#E5E5E5] bg-white"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex md:grid md:grid-cols-[1fr_auto_1fr] items-center h-16 md:h-20 gap-4">
          <Link to="/" className="flex items-center gap-2 justify-self-start min-w-0">
            <span className="font-black text-xl md:text-2xl text-black tracking-tight truncate">CardioPredict</span>
          </Link>

          <nav className="hidden md:flex items-center justify-center gap-10 lg:gap-12">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/predict" className={linkClass}>
              Predict
            </NavLink>
            <NavLink to="/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/learn" className={linkClass}>
              Learn
            </NavLink>
          </nav>

          <div className="flex items-center justify-end flex-1 md:flex-none md:justify-self-end">
            <Link
              to="/predict"
              className="inline-flex items-center justify-center bg-[#E10600] text-white px-5 py-2.5 md:px-6 rounded-full font-semibold text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 ease-in-out hover:bg-[#c70500] hover:scale-105 active:scale-100"
            >
              Analyze Now
            </Link>
          </div>
        </div>

        <nav
          className="md:hidden flex flex-wrap justify-center gap-x-6 gap-y-2 pt-4 border-t border-[#E5E5E5] -mx-6 px-6 pb-4"
          aria-label="Primary"
        >
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/predict" className={linkClass}>
            Predict
          </NavLink>
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/learn" className={linkClass}>
            Learn
          </NavLink>
        </nav>
      </div>
    </motion.nav>
  );
}
