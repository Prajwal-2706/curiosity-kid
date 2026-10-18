import React, { useEffect } from 'react';
import { X, Sparkles, Wrench, ArrowLeft, Tv } from 'lucide-react';
import { soundFX } from '../utils/audio';
import { AnimatedRCBuildVideo } from './AnimatedRCBuildVideo';

interface ComputerVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComputerVideoModal: React.FC<ComputerVideoModalProps> = ({ isOpen, onClose }) => {
  // Mobile back button & ESC key support so user is NEVER stuck
  useEffect(() => {
    if (!isOpen) return;

    // Lock body scrolling while video modal is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Handle ESC key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundFX.playBlip();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Support mobile browser back button / swipe back gesture
    const stateObj = { modal: 'computer-video' };
    window.history.pushState(stateObj, '');

    const handlePopState = () => {
      onClose();
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
      // Clean up browser history state if closing via UI button instead of popstate
      if (window.history.state?.modal === 'computer-video') {
        window.history.back();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleClose = () => {
    soundFX.playBlip();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-sm overflow-y-auto"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      {/* Floating Quick Return Pill on Mobile (always visible at top-left) */}
      <div className="fixed top-3 left-3 z-60 sm:hidden">
        <button
          onClick={handleClose}
          className="flex items-center gap-1.5 px-3 py-1.5 crayon-btn-red text-white text-xs font-kalam font-bold shadow-lg"
          aria-label="Back to Story"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
      </div>

      <div
        className="relative w-full max-w-3xl max-h-[95vh] sm:max-h-[92vh] flex flex-col bg-[#fffdf7] bg-notebook-grid rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="washi-tape" />

        {/* ──────── STICKY TOP APP BAR: Guarantees user can ALWAYS go back immediately on mobile ──────── */}
        <div className="sticky top-0 z-30 bg-[#fffdf7]/95 backdrop-blur-md px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 shadow-xs shrink-0">
          {/* Big, unmissable Back Button with Arrow */}
          <button
            onClick={handleClose}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 crayon-btn-red text-white text-xs sm:text-sm font-kalam font-bold shadow-sm active:scale-95 transition-transform"
            aria-label="Back to Story"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span>← Back to Story</span>
          </button>



          {/* Close button with large touch target */}
          <button
            onClick={handleClose}
            className="flex items-center gap-1 p-2 sm:px-3 sm:py-2 text-slate-700 hover:text-red-600 rounded-full sm:rounded-2xl crayon-btn-slate font-kalam font-bold text-xs sm:text-sm active:scale-95 transition-transform"
            aria-label="Close Video Player"
          >
            <X className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>

        {/* ──────── SCROLLABLE MODAL BODY ──────── */}
        <div className="p-3.5 sm:p-6 overflow-y-auto overscroll-contain flex-1 space-y-4">
          {/* Video Header in Kid Handwriting */}
          {/* Video Title: How to build... */}
          <div>
            <h3 id="video-modal-title" className="text-xl sm:text-3xl font-gloria text-[#2f3542] leading-tight">
              How to Build the RC Car from Scratch! 🏎️
            </h3>
          </div>

          {/* Our Custom 2D Animated Video Component (Self-Made SVG Animation, No YouTube!) */}
          <div className="relative w-full rounded-2xl overflow-hidden shadow-sm">
            <AnimatedRCBuildVideo autoPlay={true} />
          </div>

          {/* Rebuild Formula & Hardware Ingredients */}
          <div className="p-3 sm:p-4 bg-amber-50/90 rounded-2xl font-kalam text-amber-950 text-xs sm:text-sm flex items-start gap-2.5 sm:gap-3">
            <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-amber-900">
                Prajwal's Accidental Hacker Formula:
              </div>
              <p className="font-patrick text-xs sm:text-sm text-slate-700 mt-0.5 leading-relaxed">
                Corrugated cereal cardboard chassis + 2 toy DC gear motors + 9V battery + salvaged green motherboard = Reborn Turbo Racer!
              </p>
            </div>
          </div>

          {/* Bottom Action Bar: Clear & prominent "Back to Story" button */}
          <div className="pt-2 pb-1 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              onClick={handleClose}
              className="w-full sm:w-auto px-6 py-3 crayon-btn-red text-white font-kalam font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md active:scale-98 transition-transform"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← Back to Story (Done Watching) 🏎️</span>
            </button>

            <span className="text-center font-patrick text-xs text-slate-500">
              Tip: Press ESC or tap anywhere outside to return to story
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
