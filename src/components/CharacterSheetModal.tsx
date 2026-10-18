import React, { useEffect } from 'react';
import { X, Sparkles, Award, Zap, Heart, Shield, Cpu, ArrowLeft } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface CharacterSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBuildVideo?: () => void;
}

export const CharacterSheetModal: React.FC<CharacterSheetModalProps> = ({
  isOpen,
  onClose,
  onOpenBuildVideo,
}) => {
  // Mobile back button & ESC key support so user is NEVER stuck
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundFX.playBlip();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const stateObj = { modal: 'character-sheet' };
    window.history.pushState(stateObj, '');

    const handlePopState = () => {
      onClose();
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
      if (window.history.state?.modal === 'character-sheet') {
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
      aria-labelledby="character-sheet-title"
    >
      {/* Mobile Floating Back Button */}
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
        className="relative w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] flex flex-col bg-[#fffdf7] bg-notebook-grid rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="washi-tape" />

        {/* ──────── STICKY TOP APP BAR: Guarantees user can ALWAYS go back immediately on mobile ──────── */}
        <div className="sticky top-0 z-30 bg-[#fffdf7]/95 backdrop-blur-md px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 shadow-xs shrink-0">
          <button
            onClick={handleClose}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 crayon-btn-red text-white text-xs sm:text-sm font-kalam font-bold shadow-sm active:scale-95 transition-transform"
            aria-label="Back to Story"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span>← Back to Story</span>
          </button>

          <span className="hidden sm:inline-block font-kalam text-xs text-amber-900 bg-amber-100/90 px-3 py-1 rounded-full">
            📋 Track 2 Character Sheet · ID: PB-08-MAKER
          </span>

          <button
            onClick={handleClose}
            className="flex items-center gap-1 p-2 sm:px-3 sm:py-2 text-slate-700 hover:text-red-600 rounded-full sm:rounded-2xl crayon-btn-slate font-kalam font-bold text-xs sm:text-sm active:scale-95 transition-transform"
            aria-label="Close Character Sheet"
          >
            <X className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>

        {/* ──────── SCROLLABLE MODAL BODY ──────── */}
        <div className="p-3.5 sm:p-6 overflow-y-auto overscroll-contain flex-1 space-y-5">
          {/* Top Header Badge */}
          <div className="flex items-center gap-3">
            <span className="bg-amber-100 text-amber-900 font-kalam font-bold text-xs sm:text-sm px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
              <Award className="w-4 h-4 text-amber-600" />
              Official hax.baby Track 2 Character Sheet
            </span>
          </div>

          {/* Title */}
          <div>
            <h2 id="character-sheet-title" className="text-2xl sm:text-3xl font-gloria text-[#ff4757] tracking-wide leading-tight">
              Prajwal's Character Dossier 🚀
            </h2>
            <p className="font-kalam text-slate-600 text-sm sm:text-base">
              "The 5-Point Dossier of an 8-Year-Old Accidental Hardware Hacker"
            </p>
          </div>

          {/* The 5 Required Points of Track 2 (Borderless Soft Cards) */}
          <div className="space-y-4">
            {/* Point 1: Name */}
            <div className="bg-white/95 p-3.5 sm:p-4.5 rounded-2xl shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-kalam font-bold text-xs uppercase tracking-wider text-[#ff4757]">
                  1. Full Name & Aliases
                </span>
                <span className="font-patrick text-xs sm:text-sm text-slate-500">Age: 8 ¾</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-gloria text-[#2f3542]">
                Prajwal ("The Accidental Spark")
              </h3>
              <p className="font-patrick text-sm sm:text-base text-slate-600 mt-1">
                A curious, quick-witted kid with perpetually scuffed sneakers, wild hair, and pockets full of screws, paperclips, and rubber bands.
              </p>
            </div>

            {/* Point 2: Visual Description */}
            <div className="bg-white/95 p-3.5 sm:p-4.5 rounded-2xl shadow-xs">
              <span className="font-kalam font-bold text-xs uppercase tracking-wider text-[#ffa502] block mb-1">
                2. Visual Appearance & Iconic Gear
              </span>
              <ul className="font-patrick text-sm sm:text-base text-slate-700 space-y-1.5 list-disc pl-5">
                <li><strong className="text-slate-900">Striped Shirt:</strong> Electric red and warm sunflower yellow horizontal stripes.</li>
                <li><strong className="text-slate-900">Crayon Smudges:</strong> Always has turquoise and charcoal crayon marks on his fingers.</li>
                <li><strong className="text-slate-900">Signature Expression:</strong> A wide, glowing grin when he discovers how things connect inside.</li>
                <li><strong className="text-slate-900">Pocket Treasures:</strong> 9V battery cap, safety scissors, green circuit fragment.</li>
              </ul>
            </div>

            {/* Point 3: The Catalyst Incident */}
            <div className="bg-white/95 p-3.5 sm:p-4.5 rounded-2xl shadow-xs">
              <span className="font-kalam font-bold text-xs uppercase tracking-wider text-[#2ed573] block mb-1">
                3. The Catalyst: The Loud Crash
              </span>
              <p className="font-patrick text-sm sm:text-base text-slate-700 leading-relaxed">
                Driving his favorite RC car full-throttle across the kitchen table. Instead of braking, it vaulted off the edge, smashing the outer plastic shell. The revelation of the bright green PCB underneath ignited a lifelong fascination with electronics and software engineering.
              </p>
            </div>

            {/* Point 4: Key Relationships & Role Models */}
            <div className="bg-white/95 p-3.5 sm:p-4.5 rounded-2xl shadow-xs">
              <span className="font-kalam font-bold text-xs uppercase tracking-wider text-[#1e90ff] block mb-1">
                4. Key Relationships: Dad
              </span>
              <p className="font-patrick text-sm sm:text-base text-slate-700 leading-relaxed">
                Rather than punishing Prajwal for breaking the toy, his father picked him up in a playful hug, sat down on the living room rug, and explained that every gadget is just humans teaching electricity how to dance through code.
              </p>
            </div>

            {/* Point 5: Core Motivation & Ambition */}
            <div className="bg-white/95 p-3.5 sm:p-4.5 rounded-2xl shadow-xs">
              <span className="font-kalam font-bold text-xs uppercase tracking-wider text-[#9b59b6] block mb-1">
                5. Core Ambition & Driving Question
              </span>
              <p className="font-gloria text-base sm:text-lg text-purple-900 leading-snug">
                "What awesome thing am I going to make next?"
              </p>
              <p className="font-patrick text-xs sm:text-sm text-slate-600 mt-1">
                A relentless hunger to transform ordinary scraps, cardboard, and silicon into interactive inventions that race, glow, and inspire.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="bg-amber-100/60 p-3.5 sm:p-4 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="font-kalam text-xs font-bold uppercase tracking-wider text-amber-900">
                Prajwal's Maker Attributes
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-center">
              <div className="bg-white p-2 rounded-xl shadow-xs">
                <div className="text-xs text-slate-500 font-patrick">Curiosity</div>
                <div className="text-lg sm:text-xl font-gloria text-emerald-600">999 / 100</div>
              </div>
              <div className="bg-white p-2 rounded-xl shadow-xs">
                <div className="text-xs text-slate-500 font-patrick">RC Car Speed</div>
                <div className="text-lg sm:text-xl font-gloria text-red-500">MAX BOOST</div>
              </div>
              <div className="bg-white p-2 rounded-xl shadow-xs">
                <div className="text-xs text-slate-500 font-patrick">Dad Hugs</div>
                <div className="text-lg sm:text-xl font-gloria text-blue-500">Infinite ∞</div>
              </div>
              <div className="bg-white p-2 rounded-xl shadow-xs">
                <div className="text-xs text-slate-500 font-patrick">Crayon Colors</div>
                <div className="text-lg sm:text-xl font-gloria text-purple-600">64 Pack</div>
              </div>
            </div>
          </div>

          {/* Close Action Button with Uneven Wax Crayon Background */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              onClick={handleClose}
              className="w-full sm:w-auto px-6 py-3 crayon-btn-red text-white font-kalam text-sm sm:text-base font-bold flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← Back to Story (Got It!) 🏎️</span>
            </button>

            <span className="text-center font-patrick text-xs text-slate-500">
              Tip: Press ESC or tap outside to close
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
