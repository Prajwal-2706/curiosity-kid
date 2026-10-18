import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Award, ChevronRight, ArrowUp } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface CrayonNavbarProps {
  onOpenCharacterSheet: () => void;
  onOpenBuildVideo: () => void;
}

export const CrayonNavbar: React.FC<CrayonNavbarProps> = ({
  onOpenCharacterSheet,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Detect when scroll animation goes into action
  useEffect(() => {
    const handleScroll = () => {
      // Once scrolled past 70px (entering the animation action)
      const scrolled = window.scrollY > 70;
      setIsScrolled(scrolled);
      if (scrolled) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close sidebar on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSidebarOpen(false);
      }
    };
    if (sidebarOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen]);

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundFX.setMuted(nextMuted);
    if (!nextMuted) {
      soundFX.playCuriosityChime();
    }
  };

  const navLinks = [
    { label: '📖 The Story', href: '#story', desc: 'Frame-by-frame 2D animation' },
    { label: '🛠️ Inventions', href: '#inventions', desc: 'Prajwal’s secret workshop' },
    { label: '🖍️ Crayon Canvas', href: '#crayon-canvas', desc: 'Interactive drawing pad' },
    { label: '🎮 RC Test Track', href: '#test-track', desc: 'Speedway mini-game' },
  ];

  const handleLinkClick = (href: string) => {
    soundFX.playBlip();
    setSidebarOpen(false);
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    soundFX.playBlip();
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          1. FULL HORIZONTAL HEADER (Active at top before scroll action)
         ───────────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 bg-[#fffdf7]/95 backdrop-blur-md shadow-xs transition-all duration-300 ease-in-out ${
          isScrolled
            ? '-translate-y-full opacity-0 pointer-events-none'
            : 'translate-y-0 opacity-100 pointer-events-auto'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
          {/* Brand */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleScrollToTop();
            }}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 crayon-btn-red flex items-center justify-center text-white text-base sm:text-lg font-bold shadow-xs group-hover:rotate-6 transition-transform">
              🏎️
            </div>
            <div>
              <div className="font-gloria text-lg sm:text-2xl text-[#2f3542] leading-none">
                Curiosity Lab
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="font-kalam text-base font-bold text-slate-700 hover:text-[#ff4757] transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#ff4757] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}

            {/* 5-Point Character Sheet Trigger */}
            <button
              onClick={() => {
                soundFX.playBlip();
                onOpenCharacterSheet();
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 crayon-btn-yellow text-xs font-bold shadow-xs active:scale-95 transition-transform"
            >
              <Award className="w-3.5 h-3.5 text-amber-800" />
              Character Sheet
            </button>

            {/* Sound Mute/Unmute Button */}
            <button
              onClick={toggleSound}
              className={`p-2 transition-transform hover:scale-105 active:scale-95 ${
                isMuted ? 'crayon-btn-slate' : 'crayon-btn-green'
              }`}
              title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-600" /> : <Volume2 className="w-4 h-4 text-emerald-950" />}
            </button>
          </nav>

          {/* Mobile Top Controls (Before scroll) */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleSound}
              className={`p-2 ${isMuted ? 'crayon-btn-slate' : 'crayon-btn-green'}`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-slate-600" /> : <Volume2 className="w-5 h-5 text-emerald-950" />}
            </button>

            <button
              onClick={() => {
                soundFX.playBlip();
                onOpenCharacterSheet();
              }}
              className="px-3 py-1.5 crayon-btn-yellow text-xs font-bold"
            >
              Sheet
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#ff4757]"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown (Before scroll) */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#fffdf7] shadow-lg p-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="block font-kalam text-lg font-bold text-slate-800 hover:text-[#ff4757] py-1"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  soundFX.playBlip();
                  onOpenCharacterSheet();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 crayon-btn-yellow font-kalam font-bold text-sm text-center shadow-xs"
              >
                📋 Open 5-Point Character Sheet
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. THREE-LINE SIDE BAR BLOCK (Active when scrolling into action)
         ───────────────────────────────────────────────────────────── */}
      <aside
        className={`fixed top-3 right-3 sm:top-4 sm:right-5 z-50 flex items-center gap-2 transition-all duration-300 ease-out ${
          isScrolled
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 -translate-y-4 scale-90 pointer-events-none'
        }`}
        aria-label="Quick Actions & Sidebar Trigger"
      >
        {/* Quick Sound Toggle Floating Pill */}
        <button
          onClick={toggleSound}
          className={`p-2 sm:p-2.5 transition-transform active:scale-90 hover:scale-105 shadow-md ${
            isMuted ? 'crayon-btn-slate' : 'crayon-btn-green'
          }`}
          title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
          aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-slate-600" /> : <Volume2 className="w-4 h-4 text-emerald-950" />}
        </button>

        {/* The Three-Line Side Bar Block Button */}
        <button
          onClick={() => {
            soundFX.playBlip();
            setSidebarOpen(true);
          }}
          className="flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 crayon-btn-yellow shadow-md active:scale-95 hover:scale-105 transition-all group cursor-pointer"
          title="Open Side Menu"
          aria-label="Open Side Navigation Menu"
        >
          {/* Authentic Three Crayon Lines Icon */}
          <div className="flex flex-col justify-center gap-1 w-5 sm:w-5.5 py-0.5">
            <span className="h-1 w-full bg-[#ff4757] rounded-full transition-transform group-hover:translate-x-0.5" />
            <span className="h-1 w-4/5 bg-[#2ed573] rounded-full transition-transform group-hover:translate-x-1" />
            <span className="h-1 w-full bg-[#1e90ff] rounded-full transition-transform group-hover:translate-x-0.5" />
          </div>
          <span className="font-kalam font-bold text-xs sm:text-sm text-slate-800 tracking-wide hidden xs:inline">
            MENU
          </span>
        </button>
      </aside>

      {/* ─────────────────────────────────────────────────────────────
          3. EXPANDED SIDEBAR DRAWER (Triggered by the Three-Line Block)
         ───────────────────────────────────────────────────────────── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-60 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => {
              soundFX.playBlip();
              setSidebarOpen(false);
            }}
          />

          {/* Side Bar Panel (Hand-drawn Notebook Texture) */}
          <div
            className="relative w-full max-w-xs sm:max-w-sm h-full bg-[#fffdf7] bg-notebook-grid shadow-2xl flex flex-col justify-between p-4 sm:p-6 overflow-y-auto z-10 transition-transform duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="washi-tape" />

            <div>
              {/* Sidebar Header */}
              <div className="flex items-center justify-between pb-4 border-b border-amber-200/70 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 crayon-btn-red flex items-center justify-center text-white text-base font-bold shadow-xs">
                    🏎️
                  </div>
                  <div>
                    <h3 className="font-gloria text-xl text-[#2f3542] leading-none">
                      Curiosity Lab
                    </h3>
                    <span className="font-kalam text-xs text-[#ff4757] font-bold">
                      Young Maker & Hacker Dossier
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    soundFX.playBlip();
                    setSidebarOpen(false);
                  }}
                  className="p-2 text-slate-700 hover:text-red-600 crayon-btn-slate active:scale-95 transition-transform"
                  aria-label="Close Sidebar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="space-y-2 mb-6">
                <span className="font-kalam text-xs font-bold text-slate-400 uppercase tracking-wider block px-1 mb-2">
                  Navigate The Story & Workshop
                </span>

                {/* Back to Top */}
                <button
                  onClick={handleScrollToTop}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-amber-100/60 font-kalam text-base font-bold text-slate-800 flex items-center justify-between group transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <ArrowUp className="w-4 h-4 text-red-500 group-hover:-translate-y-0.5 transition-transform" />
                    <span>🏁 Back to Start</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </button>

                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleLinkClick(link.href)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-amber-100/60 font-kalam text-base font-bold text-slate-800 flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="text-slate-800 group-hover:text-[#ff4757] transition-colors">
                        {link.label}
                      </div>
                      <div className="text-[11px] font-patrick text-slate-500 font-normal">
                        {link.desc}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ))}
              </div>
            </div>

            {/* Sidebar Bottom Actions */}
            <div className="pt-4 border-t border-amber-200/70 space-y-3">
              <button
                onClick={() => {
                  soundFX.playBlip();
                  setSidebarOpen(false);
                  onOpenCharacterSheet();
                }}
                className="w-full py-3 crayon-btn-yellow font-kalam font-bold text-sm text-center flex items-center justify-center gap-2 shadow-xs active:scale-95 transition-transform"
              >
                <Award className="w-4 h-4 text-amber-800" />
                <span>📋 Open Character Sheet</span>
              </button>

              <button
                onClick={toggleSound}
                className={`w-full py-2.5 font-kalam font-bold text-xs text-center flex items-center justify-center gap-2 rounded-xl transition-transform active:scale-95 ${
                  isMuted ? 'crayon-btn-slate text-slate-700' : 'crayon-btn-green text-emerald-950'
                }`}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-4 h-4 text-slate-600" />
                    <span>Sound Effects: Muted (Click to Turn On)</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-emerald-950" />
                    <span>Sound Effects: Active 🔊</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

