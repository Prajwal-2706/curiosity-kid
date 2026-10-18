import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, Sparkles, MessageSquare } from 'lucide-react';
import { soundFX } from '../utils/audio';

export const AnimatedRCBuildVideo: React.FC<{
  autoPlay?: boolean;
  onFinished?: () => void;
}> = ({ autoPlay = true, onFinished }) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [animClock, setAnimClock] = useState(0);
  const lastSoundStageRef = useRef<number>(-1);

  // Animation frame clock for physical micro-motion & scissor/wheel rotations
  useEffect(() => {
    let frameId: number;
    const loop = (time: number) => {
      setAnimClock(time / 1000);
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Single continuous playback timer (24-second total film)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 1;
          if (next >= 100) {
            setIsPlaying(false);
            if (onFinished) onFinished();
            return 100;
          }
          return next;
        });
      }, 240);
    }
    return () => clearInterval(timer);
  }, [isPlaying, onFinished]);

  // Synchronized sound effects across the single continuous video timeline
  useEffect(() => {
    const currentMilestone = Math.floor(progress / 15);
    if (currentMilestone !== lastSoundStageRef.current && isPlaying) {
      lastSoundStageRef.current = currentMilestone;
      if (currentMilestone === 0) soundFX.playScissorsSnip();
      else if (currentMilestone === 1) soundFX.playClickSnap();
      else if (currentMilestone === 2) {
        soundFX.playCuriosityChime(); // Prajwal chat box surprise sound!
      } else if (currentMilestone === 3) soundFX.playElectricZap();
      else if (currentMilestone === 4) soundFX.playClickSnap();
      else if (currentMilestone === 5) soundFX.playColorSpray();
      else if (currentMilestone === 6) {
        soundFX.playEngineRoar();
        soundFX.playFanfare();
      }
    }
  }, [progress, isPlaying]);

  const handleTogglePlay = () => {
    if (!isPlaying && progress >= 100) {
      setProgress(0);
      lastSoundStageRef.current = -1;
    }
    setIsPlaying(!isPlaying);
    soundFX.playBlip();
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clickX = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const newProgress = Math.round((clickX / rect.width) * 100);
    setProgress(newProgress);
    soundFX.playBlip();
  };

  const handleReplay = () => {
    setProgress(0);
    lastSoundStageRef.current = -1;
    setIsPlaying(true);
    soundFX.playFanfare();
  };

  // Continuous narrative caption calculated from single video timeline
  const getLiveCaption = () => {
    if (progress < 18) {
      return {
        title: 'Cutting the Cardboard Frame',
        text: 'Snipping along the dashed pencil lines of an old cornflakes box with safety scissors!',
        badge: '✂️ 01. Chassis Crafting',
        color: '#f59e0b',
      };
    } else if (progress < 36) {
      return {
        title: 'Popsicle Bridges & DC Motors',
        text: 'Hot-gluing double-layer birch popsicle sticks across the frame and mounting dual high-speed toy motors.',
        badge: '🪵 02. Motor Mounts',
        color: '#10b981',
      };
    } else if (progress < 62) {
      return {
        title: 'The Big Revelation & Wiring!',
        text: 'Dad sets down the bright green motherboard saved from the crashed car and wires it to a 9V battery!',
        badge: '⚡ 03. Motherboard Wiring',
        color: '#06b6d4',
      };
    } else if (progress < 80) {
      return {
        title: 'Locking Bottle-Cap Rubber Wheels',
        text: 'Pressing 4 thick grooved rubber wheels onto the steel drive axles. Spin test: smooth as butter!',
        badge: '🛞 04. Axles & Wheels',
        color: '#8b5cf6',
      };
    } else if (progress < 92) {
      return {
        title: 'Cherry Red Crayon Paint & Antenna',
        text: 'Coating the custom aerodynamic shell with wax red crayon, yellow racing stripe, and radio receiver antenna.',
        badge: '🖍️ 05. Shell Customization',
        color: '#ef4444',
      };
    } else {
      return {
        title: 'Power Switch Ignites · The Rebirth!!',
        text: 'Power ON! Dual high-beam searchlight LEDs blaze and the rebuilt Turbo-Challenger screeches across the workbench!',
        badge: '🚀 06. High-Speed Test Run',
        color: '#10b981',
      };
    }
  };

  const caption = getLiveCaption();
  const currentSeconds = Math.floor((progress / 100) * 24);

  // Cumulative assembly physics
  const chassisScale = Math.min(1, Math.max(0.2, progress / 14));
  const hasChassis = progress >= 10;
  const hasPopsicles = progress >= 20;
  const hasMotors = progress >= 26;
  const hasMotherboard = progress >= 36;
  const hasBattery = progress >= 44;
  const hasAxles = progress >= 60;
  const hasWheels = progress >= 66;
  const hasShell = progress >= 78;
  const hasAntenna = progress >= 84;
  const isTestingDrive = progress >= 92;

  // Car driving forward animation on final stretch
  const driveOffset = isTestingDrive ? Math.pow((progress - 92) / 8, 1.8) * 220 : 0;
  const wheelSpinAngle = animClock * (isTestingDrive ? 45 : 12) * 60;

  return (
    <div className="w-full flex flex-col items-center">
      {/* ─────────────────────────────────────────────────────────────
          THE CONTINUOUS VIDEO SCREEN (Single uninterrupted movie)
         ───────────────────────────────────────────────────────────── */}
      <div className="relative w-full aspect-video bg-[#0f172a] rounded-2xl overflow-hidden shadow-lg flex items-center justify-center select-none border border-slate-800">
        {/* CRT Scanline & Retro Monitor Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-35 pointer-events-none" />

        {/* Top Video Header */}
        <div className="absolute top-2.5 sm:top-3 left-3 sm:left-4 right-3 sm:right-4 flex items-start justify-between text-white z-20 gap-2 pointer-events-none">
          {/* Left: Minimal Recording Time */}
          <div className="flex items-center gap-2 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-700/60 shadow-xs pointer-events-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping shrink-0" />
            <span className="font-patrick text-xs text-slate-200">
              00:{String(currentSeconds).padStart(2, '0')} / 00:24
            </span>
          </div>

          {/* Right Corner: Cloud Section with Prajwal's Realization */}
          <div
            onClick={() => soundFX.playCuriosityChime()}
            className="pointer-events-auto flex items-start cursor-pointer transition-transform hover:scale-105 active:scale-95 group max-w-[210px] sm:max-w-[280px]"
            title="Prajwal's thought cloud (click to hear realization chime!)"
          >
            <div className="relative bg-[#fffdf7] text-slate-800 border-2 border-[#ff4757] rounded-2xl sm:rounded-3xl p-2 sm:p-2.5 shadow-2xl crayon-box-shadow">
              {/* Cloud puff bubbles */}
              <div className="absolute -bottom-1.5 right-6 w-2.5 h-2.5 bg-[#fffdf7] border-2 border-[#ff4757] rounded-full" />
              <div className="absolute -bottom-3 right-4 w-1.5 h-1.5 bg-[#fffdf7] border-2 border-[#ff4757] rounded-full" />

              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-xs sm:text-sm">🧒</span>
                <span className="font-kalam text-[10px] font-bold text-[#ff4757] uppercase tracking-wider">
                  Prajwal
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping ml-auto" />
              </div>
              <p className="font-gloria text-[10px] sm:text-xs text-slate-900 font-extrabold leading-snug">
                "wait a minute! isnt this car is the one which i broke "
              </p>
            </div>
          </div>
        </div>

        {/* 2D Handcrafted Cumulative Animation (Single Seamless Flow) */}
        <svg
          viewBox="0 0 540 320"
          className="w-full h-full max-h-[300px] overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Workdesk Wood Surface */}
          <rect x="0" y="220" width="540" height="100" fill="#78350f" fillOpacity="0.35" />
          <line x1="0" y1="220" x2="540" y2="220" stroke="#92400e" strokeWidth="4" />

          {/* Measuring Grid & Cutting Mat under car */}
          <rect x="80" y="140" width="380" height="110" rx="8" fill="#047857" fillOpacity="0.25" stroke="#059669" strokeWidth="2" strokeDasharray="6,6" />
          <line x1="140" y1="140" x2="140" y2="250" stroke="#059669" strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
          <line x1="200" y1="140" x2="200" y2="250" stroke="#059669" strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
          <line x1="270" y1="140" x2="270" y2="250" stroke="#059669" strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
          <line x1="340" y1="140" x2="340" y2="250" stroke="#059669" strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
          <line x1="400" y1="140" x2="400" y2="250" stroke="#059669" strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />

          {/* ─────────────────────────────────────────────────────────
              CUMULATIVE ASSEMBLY ON WORKBENCH
             ───────────────────────────────────────────────────────── */}
          <g transform={`translate(${150 + driveOffset}, 125)`}>
            {/* 1. CARDBOARD BASE (Cut and formed) */}
            {hasChassis && (
              <g id="cardboard-chassis" transform={`scale(${chassisScale})`}>
                <rect x="0" y="30" width="220" height="42" rx="10" fill="#d97706" stroke="#b45309" strokeWidth="3.5" />
                <path d="M 15 30 L 35 15 H 185 L 205 30" fill="#b45309" fillOpacity="0.4" />
                <text x="75" y="55" fill="#fef3c7" className="font-kalam text-[10px] font-bold">
                  CARDBOARD CHASSIS
                </text>
              </g>
            )}

            {/* 2. POPSICLE STICKS BRACKETS */}
            {hasPopsicles && (
              <g id="popsicle-sticks">
                <rect x="25" y="24" width="170" height="10" rx="4" fill="#fde68a" stroke="#d97706" strokeWidth="2.5" />
                <rect x="25" y="44" width="170" height="10" rx="4" fill="#fde68a" stroke="#d97706" strokeWidth="2.5" />
              </g>
            )}

            {/* 3. TWIN DC GEAR MOTORS */}
            {hasMotors && (
              <g id="dc-motors">
                <rect x="20" y="16" width="38" height="20" rx="4" fill="#334155" stroke="#0f172a" strokeWidth="2" />
                <rect x="20" y="42" width="38" height="20" rx="4" fill="#334155" stroke="#0f172a" strokeWidth="2" />
                <circle cx="39" cy="26" r="3" fill="#f59e0b" />
                <circle cx="39" cy="52" r="3" fill="#f59e0b" />
              </g>
            )}

            {/* 4. THE SALVAGED GREEN MOTHERBOARD & 9V BATTERY */}
            {hasMotherboard && (
              <g id="motherboard" transform="translate(70, 16)">
                {/* Emerald Green Board from the Crash */}
                <rect x="0" y="0" width="76" height="46" rx="6" fill="#10b981" stroke="#065f46" strokeWidth="3" />
                {/* Copper Circuit Traces */}
                <path d="M 8 12 H 30 V 24 H 55" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 8 32 H 35 V 24 H 66" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
                {/* Microchip */}
                <rect x="30" y="16" width="16" height="16" rx="2" fill="#1e293b" />
                <circle cx="38" cy="24" r="3" fill="#00ffcc" className="animate-ping" />
                <text x="6" y="8" fill="#a7f3d0" className="font-kalam text-[8px] font-bold">
                  PCB
                </text>
              </g>
            )}

            {/* 9V Battery */}
            {hasBattery && (
              <g id="battery" transform="translate(155, 18)">
                <rect x="0" y="0" width="34" height="42" rx="4" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
                <rect x="6" y="-5" width="8" height="5" fill="#f59e0b" />
                <rect x="20" y="-5" width="8" height="5" fill="#94a3b8" />
                <text x="8" y="26" fill="#ef4444" className="font-kalam text-xs font-bold">9V</text>
                {/* Connecting Wires */}
                <path d="M -9 18 C -2 18, -4 4, 10 -3" stroke="#ef4444" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M -9 28 C -2 28, 4 38, 24 -3" stroke="#0f172a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </g>
            )}

            {/* 5. STEEL AXLES & BOTTLE-CAP WHEELS */}
            {hasAxles && (
              <g id="axles">
                <line x1="30" y1="12" x2="30" y2="70" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
                <line x1="180" y1="12" x2="180" y2="70" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
              </g>
            )}

            {hasWheels && (
              <g id="wheels">
                {/* Front Left & Right Wheels */}
                <g transform={`translate(30, 10) rotate(${wheelSpinAngle})`}>
                  <circle cx="0" cy="0" r="18" fill="#1e293b" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="0" cy="0" r="8" fill="#f59e0b" />
                  <line x1="-5" y1="0" x2="5" y2="0" stroke="#1e293b" strokeWidth="2" />
                  <line x1="0" y1="-5" x2="0" y2="5" stroke="#1e293b" strokeWidth="2" />
                </g>
                <g transform={`translate(30, 72) rotate(${wheelSpinAngle})`}>
                  <circle cx="0" cy="0" r="18" fill="#1e293b" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="0" cy="0" r="8" fill="#f59e0b" />
                  <line x1="-5" y1="0" x2="5" y2="0" stroke="#1e293b" strokeWidth="2" />
                  <line x1="0" y1="-5" x2="0" y2="5" stroke="#1e293b" strokeWidth="2" />
                </g>
                {/* Rear Left & Right Wheels */}
                <g transform={`translate(180, 10) rotate(${wheelSpinAngle})`}>
                  <circle cx="0" cy="0" r="18" fill="#1e293b" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="0" cy="0" r="8" fill="#f59e0b" />
                  <line x1="-5" y1="0" x2="5" y2="0" stroke="#1e293b" strokeWidth="2" />
                  <line x1="0" y1="-5" x2="0" y2="5" stroke="#1e293b" strokeWidth="2" />
                </g>
                <g transform={`translate(180, 72) rotate(${wheelSpinAngle})`}>
                  <circle cx="0" cy="0" r="18" fill="#1e293b" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="0" cy="0" r="8" fill="#f59e0b" />
                  <line x1="-5" y1="0" x2="5" y2="0" stroke="#1e293b" strokeWidth="2" />
                  <line x1="0" y1="-5" x2="0" y2="5" stroke="#1e293b" strokeWidth="2" />
                </g>
              </g>
            )}

            {/* 6. RED CRAYON WAX SHELL & ANTENNA */}
            {hasShell && (
              <g id="car-shell">
                <path
                  d="M 10 40 C 0 15 35 -10 115 -5 C 195 -3 220 20 210 50 C 200 65 20 65 10 40 Z"
                  fill="#ff4757"
                  stroke="#2f3542"
                  strokeWidth="4"
                  opacity="0.95"
                />
                {/* Yellow Racing Stripe */}
                <path d="M 35 30 Q 115 22 185 28" stroke="#ffa502" strokeWidth="9" strokeLinecap="round" />
                {/* Cockpit Window */}
                <path d="M 60 10 C 75 -8 140 -8 160 10 Z" fill="#70a1ff" stroke="#2f3542" strokeWidth="3" />
              </g>
            )}

            {hasAntenna && (
              <g id="antenna" transform="translate(150, 0)">
                <line x1="0" y1="0" x2="25" y2="-45" stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" />
                <circle cx="26" cy="-47" r="5" fill="#ffffff" stroke="#2f3542" strokeWidth="2" />
                {/* Glowing Signal Waves */}
                <path d="M 32 -52 Q 44 -44 32 -36" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </g>
            )}

            {/* 7. HIGH-BEAM LEDS & ACCELERATION FIRE (Test Drive) */}
            {isTestingDrive && (
              <g id="headlights-beam">
                {/* Dual Searchlight Beams firing right */}
                <polygon points="215,30 380,0 380,75 215,45" fill="#fde047" fillOpacity="0.4" />
                <circle cx="215" cy="36" r="7" fill="#ffffff" className="animate-ping" />
                {/* Smoke & Speed Dust behind car */}
                <g stroke="#f59e0b" strokeWidth="4" strokeLinecap="round">
                  <line x1="-20" y1="30" x2="-70" y2="30" />
                  <line x1="-15" y1="50" x2="-90" y2="50" stroke="#ef4444" strokeWidth="5" />
                </g>
              </g>
            )}
          </g>

          {/* Active Cutting Scissors in Stage 0 */}
          {progress < 18 && (
            <g transform={`translate(${160 + progress * 8}, ${135 + Math.sin(animClock * 16) * 4})`}>
              <g transform={`rotate(${Math.sin(animClock * 20) * 18})`}>
                <line x1="0" y1="0" x2="35" y2="0" stroke="#e2e8f0" strokeWidth="5" strokeLinecap="round" />
                <circle cx="-10" cy="-6" r="10" stroke="#ef4444" strokeWidth="4" fill="none" />
              </g>
              <g transform={`rotate(${-Math.sin(animClock * 20) * 18})`}>
                <line x1="0" y1="0" x2="35" y2="0" stroke="#e2e8f0" strokeWidth="5" strokeLinecap="round" />
                <circle cx="-10" cy="6" r="10" stroke="#ef4444" strokeWidth="4" fill="none" />
              </g>
              <text x="38" y="-12" fill="#ef4444" className="font-gloria text-xs font-bold animate-pulse">
                *SNIP!*
              </text>
            </g>
          )}

          {/* Rebuilt Victory Callout */}
          {isTestingDrive && (
            <text x="125" y="45" fill="#38ef7d" className="font-gloria text-xl sm:text-2xl font-extrabold animate-bounce">
              🎉 REBUILT & FASTER THAN EVER!! 🏎️
            </text>
          )}
        </svg>

        {/* ─────────────────────────────────────────────────────────────
            PRAJWAL'S CHAT BOX REACTION:
            "Wait a minute... isn't it the one I broke?!"
           ───────────────────────────────────────────────────────────── */}
        {progress >= 32 && progress <= 68 && (
          <div className="absolute bottom-4 left-3 right-3 sm:bottom-5 sm:left-6 sm:right-6 z-30 flex items-end gap-2.5 sm:gap-3 pointer-events-none animate-bounce">
            {/* Prajwal Animated Avatar */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#ffeaa7] border-2 border-[#2f3542] flex items-center justify-center text-xl sm:text-2xl shadow-xl shrink-0">
              🧒
            </div>

            {/* Kid Speech / Chat Box Bubble */}
            <div className="relative bg-[#ffffff] border-2 border-[#ff4757] rounded-2xl rounded-bl-none px-3 py-2 sm:px-4 sm:py-2.5 shadow-2xl max-w-sm sm:max-w-md">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="font-kalam text-[10px] sm:text-xs font-bold text-[#ff4757] uppercase tracking-wider">
                  Prajwal (Eyes Glow Wide!)
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="font-gloria text-xs sm:text-sm text-slate-900 font-extrabold leading-snug">
                "Wait a minute... isn't it the one I broke?!" 😲💡
              </p>
            </div>
          </div>
        )}

        {/* Big Center Play Button Overlay if Paused */}
        {!isPlaying && (
          <div
            onClick={handleTogglePlay}
            className="absolute inset-0 bg-slate-950/45 backdrop-blur-xs flex items-center justify-center cursor-pointer z-20 group"
          >
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-red-500 hover:bg-red-600 shadow-xl flex items-center justify-center transition-transform group-hover:scale-110 active:scale-95">
              <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white text-white ml-1" />
            </div>
            <span className="absolute bottom-3 sm:bottom-5 font-kalam text-xs text-white/90 bg-black/60 px-3 py-1 rounded-full shadow-xs">
              Tap / Click to Play Single Continuous Rebuild Video 🏎️
            </span>
          </div>
        )}

        {/* Tap video to Pause while playing */}
        {isPlaying && (
          <div
            onClick={handleTogglePlay}
            className="absolute inset-0 z-10 cursor-pointer"
            title="Tap video to pause"
          />
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          UNIFIED VIDEO TIMELINE CONTROLS (Single video player)
         ───────────────────────────────────────────────────────────── */}
      <div className="w-full mt-3 px-1">
        {/* Continuous Scrubber Bar (Tap or drag to seek seamlessly) */}
        <div
          onClick={handleSeek}
          className="relative w-full bg-slate-200 h-3.5 sm:h-3 rounded-full overflow-hidden mb-2.5 cursor-pointer touch-none group"
          title="Tap anywhere to seek through video"
        >
          <div
            className="h-full bg-gradient-to-r from-red-500 via-amber-400 to-emerald-500 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2">
            <button
              onClick={handleTogglePlay}
              className={`px-4 py-2 font-kalam font-bold text-xs sm:text-sm shadow-xs transition-transform active:scale-95 flex items-center gap-1.5 ${
                isPlaying ? 'crayon-btn-yellow text-slate-900' : 'crayon-btn-red text-white'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isPlaying ? 'Pause' : 'Play Video'}</span>
            </button>

            <button
              onClick={handleReplay}
              className="p-2 text-slate-700 hover:text-red-600 rounded-xl crayon-btn-slate active:scale-95 transition-transform"
              title="Replay from Beginning"
              aria-label="Replay from Beginning"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <span className="font-patrick text-xs sm:text-sm text-slate-600 ml-1">
              00:{String(currentSeconds).padStart(2, '0')} / 00:24
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
