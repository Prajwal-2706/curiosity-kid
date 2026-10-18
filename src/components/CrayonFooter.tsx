import React from 'react';
import { Heart, Sparkles, CheckCircle2, Award } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface CrayonFooterProps {
  onOpenCharacterSheet: () => void;
  onOpenBuildVideo: () => void;
}

export const CrayonFooter: React.FC<CrayonFooterProps> = ({
  onOpenCharacterSheet,
  onOpenBuildVideo,
}) => {
  return (
    <footer className="mt-24 bg-[#fffdf7] py-14 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Big Tagline Banner (Borderless, Soft Crayon Glow) */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-red-50/80 via-amber-50/80 to-blue-50/80 text-center shadow-sm relative overflow-hidden">
          <div className="washi-tape" />
          <span className="font-kalam text-xs font-bold uppercase tracking-widest text-[#ff4757] bg-white/90 px-3.5 py-1 rounded-full shadow-xs">
            The Maker's Lifetime Motto
          </span>
          <div className="text-3xl sm:text-5xl font-gloria text-[#2f3542] mt-3">
            "What awesome thing am I going to make next?"
          </div>
          <p className="font-patrick text-lg sm:text-xl text-slate-600 mt-2 max-w-2xl mx-auto">
            Dedicated to every curious kid who ever took apart their toys to see how they tick.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => {
                soundFX.playCuriosityChime();
                onOpenCharacterSheet();
              }}
              className="px-6 py-3 crayon-btn-red text-white font-kalam font-bold text-base shadow-xs"
            >
              📋 View 5-Point Character Sheet
            </button>
          </div>
        </div>

        {/* hax.baby Hackathon Track 2 Compliance Checklist (Borderless) */}
        <div className="p-6 rounded-3xl bg-white/90 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5 text-amber-500" />
            <span className="font-kalam font-bold text-slate-800 text-base">
              hax.baby Track 2 (Your Own Baby - Original Character) Checklist:
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs font-patrick text-slate-700">
            <div className="flex items-center gap-2 bg-emerald-50/80 p-2.5 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Original Character: 8-year-old Prajwal</span>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50/80 p-2.5 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>5-Point Character Sheet included</span>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50/80 p-2.5 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Projects Showcase (4 inventions)</span>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50/80 p-2.5 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Origin Story via 2-D Crayon Scroll</span>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50/80 p-2.5 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Immersion: Sound FX + Canvas + RC Game</span>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50/80 p-2.5 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Hidden Easter Egg & Mobile Friendly</span>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="text-center font-kalam text-slate-500 text-sm">
          <span>Drawn with virtual 64-pack crayons & procedural Web Audio oscillators · </span>
          <span className="text-[#ff3b4e]">Made with curiosity & love</span>
        </div>
      </div>
    </footer>
  );
};
