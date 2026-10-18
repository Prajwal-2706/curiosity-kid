import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Volume2, Zap, Trophy, Sparkles } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface PartItem {
  id: string;
  name: string;
  x: number;
  y: number;
  icon: string;
  collected: boolean;
}

export const RCCarMiniGame: React.FC = () => {
  const [carPos, setCarPos] = useState({ x: 50, y: 150, angle: 0 });
  const [speed, setSpeed] = useState(0);
  const [skidMarks, setSkidMarks] = useState<{ x: number; y: number; angle: number }[]>([]);
  const [parts, setParts] = useState<PartItem[]>([
    { id: 'pcb', name: 'Emerald Motherboard', x: 220, y: 70, icon: '🟩', collected: false },
    { id: 'battery', name: '9V Battery', x: 420, y: 180, icon: '🔋', collected: false },
    { id: 'antenna', name: 'Silver Antenna', x: 180, y: 240, icon: '📡', collected: false },
    { id: 'led', name: 'Glowing Cyan LED', x: 340, y: 90, icon: '💡', collected: false },
  ]);
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Check collision with parts
  useEffect(() => {
    parts.forEach((part) => {
      if (!part.collected) {
        const dx = carPos.x - part.x;
        const dy = carPos.y - part.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 34) {
          // Collect!
          soundFX.playCuriosityChime();
          setParts((prev) =>
            prev.map((p) => (p.id === part.id ? { ...p, collected: true } : p))
          );
          setScore((s) => {
            const nextScore = s + 1;
            if (nextScore === parts.length) {
              setGameWon(true);
              soundFX.playFanfare();
            }
            return nextScore;
          });
        }
      }
    });
  }, [carPos, parts]);

  const moveCar = (action: 'forward' | 'reverse' | 'left' | 'right' | 'turbo') => {
    setCarPos((prev) => {
      let nextAngle = prev.angle;
      let nextX = prev.x;
      let nextY = prev.y;
      const step = action === 'turbo' ? 24 : 14;

      if (action === 'left') {
        nextAngle = prev.angle - 25;
        soundFX.playScribble();
      } else if (action === 'right') {
        nextAngle = prev.angle + 25;
        soundFX.playScribble();
      } else if (action === 'forward' || action === 'turbo') {
        const rad = (nextAngle * Math.PI) / 180;
        nextX = Math.max(30, Math.min(520, prev.x + Math.cos(rad) * step));
        nextY = Math.max(30, Math.min(270, prev.y + Math.sin(rad) * step));

        if (action === 'turbo') {
          soundFX.playCarRev();
        } else {
          soundFX.playBlip();
        }

        // Add skid mark
        setSkidMarks((marks) => [
          ...marks.slice(-30),
          { x: prev.x, y: prev.y, angle: prev.angle },
        ]);
      } else if (action === 'reverse') {
        const rad = (nextAngle * Math.PI) / 180;
        nextX = Math.max(30, Math.min(520, prev.x - Math.cos(rad) * 10));
        nextY = Math.max(30, Math.min(270, prev.y - Math.sin(rad) * 10));
      }

      return { x: nextX, y: nextY, angle: nextAngle };
    });
  };

  const handleReset = () => {
    soundFX.playCrash();
    setCarPos({ x: 50, y: 150, angle: 0 });
    setSkidMarks([]);
    setParts((prev) => prev.map((p) => ({ ...p, collected: false })));
    setScore(0);
    setGameWon(false);
  };

  return (
    <section id="test-track" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <span className="font-kalam text-sm sm:text-base text-[#2ed573] font-bold uppercase tracking-widest bg-emerald-100/70 px-4 py-1.5 rounded-full shadow-xs">
          🎮 Interactive RC Test Track
        </span>
        <h2 className="text-4xl sm:text-5xl font-gloria text-[#2f3542] mt-3">
          Drive Prajwal's Repaired RC Car!
        </h2>
        <p className="font-patrick text-xl text-slate-600 mt-2">
          Collect all 4 scattered components on the floor to power up the car!
        </p>
      </div>

      <div className="crayon-card-soft p-5 sm:p-7 relative shadow-sm">
        {/* Top Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="font-kalam font-bold text-slate-700 text-base">
              Parts Collected:
            </span>
            <div className="flex gap-2">
              {parts.map((p) => (
                <span
                  key={p.id}
                  title={p.name}
                  className={`text-xl p-1.5 rounded-xl transition-transform ${
                    p.collected
                      ? 'bg-emerald-100 scale-110 shadow-xs'
                      : 'bg-slate-100 opacity-40 grayscale'
                  }`}
                >
                  {p.icon}
                </span>
              ))}
            </div>
            <span className="font-patrick text-lg font-bold text-[#ff4757]">
              ({score} / {parts.length})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => soundFX.playCarHonk()}
              className="px-3.5 py-1.5 crayon-btn-yellow font-kalam font-bold text-xs flex items-center gap-1 shadow-xs"
            >
              <Volume2 className="w-3.5 h-3.5" />
              Honk Horn
            </button>
            <button
              onClick={handleReset}
              className="px-3.5 py-1.5 crayon-btn-slate font-kalam font-bold text-xs flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Track
            </button>
          </div>
        </div>

        {/* The Track Arena (Grid Notebook Floor, Borderless) */}
        <div
          ref={containerRef}
          className="relative w-full h-[320px] sm:h-[350px] bg-notebook-grid rounded-2xl overflow-hidden shadow-inner select-none"
        >
          {/* Finish Line Checkered Banner */}
          <div className="absolute right-4 top-4 bottom-4 w-6 flex flex-col justify-around py-2">
            <div className="text-[10px] font-kalam font-bold text-slate-400 rotate-90 tracking-widest">
              FINISH
            </div>
          </div>

          {/* Skid Marks */}
          {skidMarks.map((m, idx) => (
            <div
              key={idx}
              className="absolute w-3 h-1.5 bg-slate-400/40 rounded-full pointer-events-none"
              style={{
                left: `${m.x}px`,
                top: `${m.y}px`,
                transform: `translate(-50%, -50%) rotate(${m.angle}deg)`,
              }}
            />
          ))}

          {/* Electronic Components to Collect */}
          {parts.map((part) => (
            <div
              key={part.id}
              className={`absolute transition-all duration-300 pointer-events-none ${
                part.collected ? 'scale-0 opacity-0' : 'scale-100 opacity-100 animate-pulse'
              }`}
              style={{ left: `${part.x}px`, top: `${part.y}px`, transform: 'translate(-50%, -50%)' }}
            >
              <div className="flex flex-col items-center">
                <span className="text-3xl filter drop-shadow-md">{part.icon}</span>
                <span className="font-kalam text-[10px] font-bold text-slate-700 bg-white/90 px-1.5 py-0.5 rounded-full shadow-xs whitespace-nowrap mt-1">
                  {part.name}
                </span>
              </div>
            </div>
          ))}

          {/* The RC Car on Track */}
          <div
            className="absolute transition-transform duration-100 ease-out z-20 pointer-events-none"
            style={{
              left: `${carPos.x}px`,
              top: `${carPos.y}px`,
              transform: `translate(-50%, -50%) rotate(${carPos.angle}deg)`,
            }}
          >
            {/* 2D Kid Crayon Car Top-Down Sprite */}
            <div className="relative w-16 h-10 bg-[#ff4757] rounded-xl shadow-md flex items-center justify-center">
              {/* Racing Stripe */}
              <div className="w-full h-2.5 bg-[#ffa502]" />
              {/* Windshield */}
              <div className="absolute top-1 bottom-1 left-3 w-4 bg-[#70a1ff] rounded-xs" />
              {/* Antenna */}
              <div className="absolute -top-3 right-2 w-0.5 h-4 bg-slate-600">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full -top-1 -left-0.5 relative animate-ping" />
              </div>
              {/* Wheels */}
              <div className="absolute -top-1 left-1 w-3 h-2 bg-[#1e293b] rounded-xs" />
              <div className="absolute -bottom-1 left-1 w-3 h-2 bg-[#1e293b] rounded-xs" />
              <div className="absolute -top-1 right-1 w-3 h-2 bg-[#1e293b] rounded-xs" />
              <div className="absolute -bottom-1 right-1 w-3 h-2 bg-[#1e293b] rounded-xs" />
            </div>
          </div>

          {/* Victory Overlay if Won */}
          {gameWon && (
            <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-xs flex items-center justify-center z-30 p-4">
              <div className="bg-[#fffdf7] p-6 rounded-2xl text-center shadow-2xl max-w-sm">
                <Trophy className="w-12 h-12 text-amber-500 mx-auto mb-2 animate-bounce" />
                <h3 className="text-2xl font-gloria text-[#2f3542]">
                  ALL PARTS RECOVERED! 🎉
                </h3>
                <p className="font-patrick text-base text-slate-600 mt-2">
                  "The motherboard is humming, the LEDs are blazing, and the RC car is faster than ever!"
                </p>
                <button
                  onClick={handleReset}
                  className="mt-4 px-5 py-2.5 crayon-btn-green font-kalam font-bold text-base shadow-xs"
                >
                  Drive Again! 🏎️
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Driving Controls (Tactile Crayon Buttons with Uneven Wax Backgrounds, No Borders) */}
        <div className="mt-6 flex flex-col items-center gap-3 touch-manipulation select-none">
          <div className="flex gap-2">
            <button
              onClick={() => moveCar('forward')}
              className="w-16 h-12 crayon-btn-slate font-kalam font-bold text-lg shadow-xs transition-transform active:scale-95 flex items-center justify-center touch-manipulation"
              title="Drive Forward"
            >
              ▲ GO!
            </button>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={() => moveCar('left')}
              className="w-14 h-11 crayon-btn-slate font-kalam font-bold text-base shadow-xs transition-transform active:scale-95 flex items-center justify-center touch-manipulation"
              title="Steer Left"
            >
              ◀ LEFT
            </button>
            <button
              onClick={() => moveCar('turbo')}
              className="px-4 sm:px-5 h-11 crayon-btn-red font-gloria font-bold text-xs sm:text-sm shadow-xs transition-transform active:scale-95 flex items-center gap-1.5 touch-manipulation"
              title="Turbo Boost"
            >
              <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
              TURBO!
            </button>
            <button
              onClick={() => moveCar('right')}
              className="w-14 h-11 crayon-btn-slate font-kalam font-bold text-base shadow-xs transition-transform active:scale-95 flex items-center justify-center touch-manipulation"
              title="Steer Right"
            >
              RIGHT ▶
            </button>
          </div>
          <div className="text-xs font-patrick text-slate-500 mt-1">
            * Tip: Press Turbo to leave crayon tire streaks! ⚡
          </div>
        </div>
      </div>
    </section>
  );
};
