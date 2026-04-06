import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

function IconGithub({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function IconLinkedin({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const iconBtn =
    'inline-flex items-center justify-center w-11 h-11 border border-[#E5E5E5] bg-white text-[#6B6B6B] transition-all duration-300 ease-out hover:scale-110 hover:bg-[#E10600] hover:text-white hover:border-[#E10600]';

  return (
    <footer className="w-full border-t border-[#E5E5E5] bg-white mt-20">
      <div className="max-w-[1200px] mx-auto px-6 py-14">
        <p className="text-center text-xs text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed mb-14">
          This application is for educational purposes only. Results may not be accurate. Consult a medical professional.
        </p>

        <div className="flex flex-col md:flex-row md:justify-between gap-12 mb-14 items-start">
          <div className="flex flex-col gap-4">
            <Link to="/" className="font-black text-xl text-black tracking-tight w-fit transition-all duration-300 ease-in-out hover:text-[#E10600]">
              CardioPredict
            </Link>
            <p className="text-sm font-medium text-[#6B6B6B] leading-relaxed max-w-xs">
              Cardiovascular risk screening from standard clinical inputs—clear, fast, and structured.
            </p>
          </div>

          {/* Navigation + Connect wrapper */}
          <div className="flex gap-16 md:ml-auto">
            <div className="md:flex md:flex-col md:items-start md:text-left">
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B6B6B] mb-5">Navigation</h4>
              <div className="flex flex-col gap-3 md:items-start">
                <Link to="/" className="text-sm font-medium text-black/80 hover:text-[#E10600] transition-all duration-300 ease-in-out">
                  Home
                </Link>
                <Link to="/predict" className="text-sm font-medium text-black/80 hover:text-[#E10600] transition-all duration-300 ease-in-out">
                  Predict
                </Link>
                <Link to="/learn" className="text-sm font-medium text-black/80 hover:text-[#E10600] transition-all duration-300 ease-in-out">
                  How it works
                </Link>
                <Link to="/dashboard" className="text-sm font-medium text-black/80 hover:text-[#E10600] transition-all duration-300 ease-in-out">
                  Dashboard
                </Link>
              </div>
            </div>
            <div className="flex flex-col">
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B6B6B] mb-5">Connect</h4>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/bishnu-prasad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={iconBtn}
                  aria-label="GitHub"
                >
                  <IconGithub className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/bishnuprasad-tripathy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={iconBtn}
                  aria-label="LinkedIn"
                >
                  <IconLinkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#E5E5E5] flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#6B6B6B] text-center md:text-left">
            © 2026 CardioPredict. Educational use only.
          </span>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-[#6B6B6B] hover:text-black transition-all duration-300 ease-in-out"
          >
            Back to top
            <ArrowUp size={14} strokeWidth={2} />
          </button>
        </div>
      </div>
    </footer>
  );
}
