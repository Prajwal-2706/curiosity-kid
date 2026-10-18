import React, { useState, useEffect, useRef } from 'react';
import { useScroll } from 'motion/react';
import { soundFX } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Play,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Tv,
} from 'lucide-react';
import {
  KidCrayonDefs,
  KidBackground,
} from './KidCrayonArt';

interface FrameByFrameStoryProps {
  onOpenCharacterSheet: () => void;
  onOpenBuildVideo: () => void;
}

// Easter Egg Car Color Themes (Click car before crash to cycle!)
const CAR_EASTER_EGG_COLORS = [
  { name: 'Cherry Red', hex: '#ff4757', stripe: '#ffa502', accent: '#ff6b81' },
  { name: 'Lightning Blue', hex: '#1e90ff', stripe: '#00d2d3', accent: '#70a1ff' },
  { name: 'Emerald Turbo', hex: '#2ed573', stripe: '#fed330', accent: '#7bed9f' },
  { name: 'Bumblebee Gold', hex: '#ffa502', stripe: '#ff4757', accent: '#fed330' },
  { name: 'Galactic Purple', hex: '#9b59b6', stripe: '#00ffcc', accent: '#e056fd' },
  { name: 'Cosmic Pink', hex: '#ff4081', stripe: '#fed330', accent: '#ff79cd' },
  { name: 'Solar Orange', hex: '#ff6348', stripe: '#2ed573', accent: '#ffa502' },
];

export const FrameByFrameStory: React.FC<FrameByFrameStoryProps> = ({
  onOpenCharacterSheet,
  onOpenBuildVideo,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [animTime, setAnimTime] = useState(0);
  const [isHoveringMonitor, setIsHoveringMonitor] = useState(false);
  const [carColorIdx, setCarColorIdx] = useState(0);
  const [carEasterEggNotice, setCarEasterEggNotice] = useState<string | null>(null);

  const currentCarColor = CAR_EASTER_EGG_COLORS[carColorIdx];

  // Easter Egg Car Repaint Click Handler
  const handleCarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = (carColorIdx + 1) % CAR_EASTER_EGG_COLORS.length;
    setCarColorIdx(nextIdx);
    const chosen = CAR_EASTER_EGG_COLORS[nextIdx];

    // Rich interactive sounds: Honk + Spray Paint Whoosh!
    soundFX.playCarHonk();
    setTimeout(() => soundFX.playColorSpray(), 120);

    setCarEasterEggNotice(`🎨 Repainted to ${chosen.name}!`);
    confetti({
      particleCount: 30,
      spread: 70,
      origin: { y: 0.35 },
      colors: [chosen.hex, chosen.stripe, '#ffffff'],
    });

    setTimeout(() => {
      setCarEasterEggNotice(null);
    }, 2800);
  };

  // useScroll hook to track continuous scroll progress [0, 1]
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Continuous animation frame loop (requestAnimationFrame) for alive micro-motion
  useEffect(() => {
    let animId: number;
    const updateAnim = (timestamp: number) => {
      setAnimTime(timestamp / 1000);
      animId = requestAnimationFrame(updateAnim);
    };
    animId = requestAnimationFrame(updateAnim);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Update normalized scrollProgress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrollProgress(Math.min(1, Math.max(0, latest)));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Derived continuous physics variables based on scrollProgress p in [0, 1]
  const p = scrollProgress;

  // Sound triggers when passing animation milestones
  const lastMilestoneRef = useRef<number>(-1);
  useEffect(() => {
    const currentMilestone = Math.floor(p * 6);
    if (currentMilestone !== lastMilestoneRef.current) {
      lastMilestoneRef.current = currentMilestone;
      if (currentMilestone === 0) soundFX.playEngineRoar();
      else if (currentMilestone === 1) soundFX.playCrash();
      else if (currentMilestone === 2) soundFX.playCuriosityChime();
      else if (currentMilestone === 3) soundFX.playChuckle();
      else if (currentMilestone === 4) soundFX.playElectricZap();
      else if (currentMilestone === 5) soundFX.playFanfare();
    }
  }, [p]);

  // CONTINUOUS PHYSICS & GEOMETRY CALCULATIONS
  // 1. Tabletop & Car Motion (Phase 0..0.24)
  const isTablePhase = p <= 0.28;
  const tableCarProgress = Math.min(1, Math.max(0, p / 0.22));
  const rawCarX = 40 + tableCarProgress * 290;
  const wheelAngle = rawCarX * 4;

  // 2. Freefall Arc (Phase 0.22..0.32)
  const isFalling = p > 0.22 && p <= 0.32;
  const fallProgress = Math.min(1, Math.max(0, (p - 0.22) / 0.10));
  const freefallX = 330 + fallProgress * 50;
  const freefallY = 140 + Math.pow(fallProgress, 1.9) * 95;
  const freefallTilt = fallProgress * 55;

  // 3. Crash Explosion & Split Halves (Phase 0.30..0.48)
  const isCrashPhase = p >= 0.30 && p < 0.50;
  const splitProgress = Math.min(1, Math.max(0, (p - 0.30) / 0.16));
  const splitDistance = splitProgress * 110;
  const explosionScale = isCrashPhase ? Math.sin(Math.min(Math.PI, splitProgress * Math.PI)) * 1.3 : 0;

  // 4. Motherboard Visibility & Electric Glow (Phase 0.35..0.72)
  const isMotherboardPhase = p >= 0.35 && p <= 0.72;
  const boardScale = Math.min(1, Math.max(0, (p - 0.35) / 0.08));

  // 5. Prajwal Awe & LED Eyes (Phase 0.42..0.68)
  const isAwePhase = p >= 0.42 && p < 0.68;
  const aweProgress = Math.min(1, Math.max(0, (p - 0.42) / 0.10));
  const ledPulse = Math.sin(animTime * 8) * 0.3 + 0.9;

  // 6. Dad Swoop & Hug (Phase 0.65..0.78)
  const isDadPhase = p >= 0.65 && p < 0.78;
  const dadEnterProgress = Math.min(1, Math.max(0, (p - 0.65) / 0.08));
  const dadX = -90 + dadEnterProgress * 230;
  const liftProgress = Math.min(1, Math.max(0, (p - 0.71) / 0.06));
  const prajwalLiftY = 140 - liftProgress * 110;
  const prajwalKicking = Math.sin(animTime * 10) * 16 * liftProgress;

  // 7. Rug Tech Academy (Phase 0.78..0.88) - strictly terminates before computer scene
  const isRugPhase = p >= 0.78 && p < 0.88;

  // 8. Computer & Paused Video Monitor (Phase 0.88..1.00)
  const isComputerPhase = p >= 0.88;

  // Story Text Data corresponding to the continuous scroll percent
  const getStoryNarrative = () => {
    if (p < 0.22) {
      return {
        stage: '01 / 06 · The Kitchen Table Dash',
        title: 'Top Speed on the Table!',
        text: 'Prajwal gripped the remote control with both hands. His favorite cherry-red racer screamed down the table at breakneck speed!',
        quote: '"Faster, faster! It’s going to beat the sound barrier!" — 8-year-old Prajwal, 2 seconds before catastrophe.',
        color: '#ff4757',
      };
    } else if (p < 0.38) {
      return {
        stage: '02 / 06 · The Loud Crash!',
        title: 'It Started With A Loud Crash!',
        text: 'It started with a loud crash! Prajwal’s favorite remote-control car zoomed straight off the table and split wide open on the living room floor.',
        quote: 'The red plastic chassis cracked cleanly down the middle, sending plastic wheel caps bouncing against the rug with a loud clatter!',
        color: '#ffa502',
      };
    } else if (p < 0.62) {
      return {
        stage: '03 / 06 · The Hidden World',
        title: 'Frozen in Awe & Curiosity',
        text: 'But instead of crying, the 8-year-old stood completely frozen in awe. Spilling out from the broken plastic chassis was a hidden world he had never seen before: a bright green motherboard, tiny winding copper paths, and a gleaming silver antenna.',
        quote: 'Prajwal dropped his jaw in complete wonder. It wasn’t trash — it was a secret city of electricity!',
        color: '#2ed573',
      };
    } else if (p < 0.78) {
      return {
        stage: '04 / 06 · The Joyous Hug',
        title: 'Dad Swoops Into The Room!',
        text: 'Suddenly, his father swooped into the room. Lifting the kid into the air in a joyous, playful hug, he laughed, "You really are a trouble-maker, aren\'t you?"',
        quote: 'Prajwal waved his arms, pointing excitedly down at the scattered pieces, begging to know how it all worked!',
        color: '#1e90ff',
      };
    } else if (p < 0.89) {
      return {
        stage: '05 / 06 · Floor-Side Tech Magic',
        title: 'The Living Room Rug Classroom',
        text: 'Right there on the floor, his father explained the magic of computers, coding, and different devices in a simple way a kid could easily understand. Prajwal’s eyes practically glowed like LEDs with curiosity.',
        quote: '💡 Dad explained: "Code is just instructions, like a recipe for cookies! You tell the microchip when to steer, when to speed up, and when to shine the lights."',
        color: '#ffa502',
      };
    } else {
      return {
        stage: '06 / 06 · The Glowing Monitor',
        title: 'The Computer & The Spark',
        text: 'His father then pulled him up to a big, glowing computer screen and told him that if he learned how to guide these machines, he could invent his own awesome remote-control cars and devices from scratch.',
        quote: 'Staring into the bright monitor, Prajwal smiled, his mind completely racing with a single question: "What awesome thing am I going to make next?"',
        color: '#ff4757',
      };
    }
  };

  const narrative = getStoryNarrative();

  const handleMonitorClick = () => {
    soundFX.playFanfare();
    try {
      confetti({
        particleCount: 90,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#ff4757', '#1e90ff', '#fed330', '#2ed573', '#9b59b6'],
      });
    } catch {}
    onOpenBuildVideo();
  };

  return (
    <div id="story" className="relative">
      <KidCrayonDefs />

      {/* Header Intro */}
      <div className="text-center pt-20 sm:pt-24 pb-4 px-4">
        <h1 className="text-4xl sm:text-6xl font-gloria text-[#2f3542] tracking-wide">
          The Day the RC Car Shattered
        </h1>
      </div>

      {/* Extended Scroll Track (650vh) */}
      <div ref={containerRef} className="relative h-[650vh]">
        {/* Sticky Stage: Positioned cleanly with maximum viewport height */}
        <div className="sticky top-2 sm:top-4 z-20 w-full px-2 sm:px-6 max-w-6xl mx-auto">
          <div className="relative py-1 sm:py-2 flex flex-col justify-between min-h-0 sm:min-h-[580px]">
            {/* Top Minimal Scrubber Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-1.5 mb-1.5 sm:mb-2">
              <div className="flex items-center gap-2">
                <span
                  className="font-kalam text-xs sm:text-sm font-bold uppercase tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-xs"
                  style={{
                    backgroundColor: `${narrative.color}18`,
                    color: narrative.color,
                  }}
                >
                  {narrative.stage}
                </span>
                <span className="font-patrick text-xs sm:text-sm text-slate-600">
                  {Math.round(p * 100)}%
                </span>
              </div>

              {/* Quick Jump & Easter Egg Notification */}
              <div className="flex items-center gap-2 text-xs font-kalam font-bold text-slate-600">
                {carEasterEggNotice && (
                  <span className="bg-amber-100 text-amber-900 px-3 py-1 rounded-full animate-bounce shadow-xs font-kalam text-xs">
                    {carEasterEggNotice}
                  </span>
                )}
                <button
                  onClick={() => {
                    const top = containerRef.current?.offsetTop || 0;
                    window.scrollTo({ top, behavior: 'smooth' });
                  }}
                  className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 crayon-btn-slate text-xs font-bold shadow-xs active:scale-95 transition-transform"
                >
                  Start 🏁
                </button>
              </div>
            </div>

            {/* Continuous Crayon Scroll Meter */}
            <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden mb-2 sm:mb-3">
              <div
                className="h-full transition-all duration-75 ease-out rounded-full"
                style={{
                  width: `${Math.max(4, p * 100)}%`,
                  backgroundColor: narrative.color,
                }}
              />
            </div>

            {/* TWO-COLUMN LAYOUT: Continuous SVG Canvas (Left) + Handwritten Narrative (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6 md:gap-10 items-center my-auto">
              {/* CONTINUOUS DYNAMIC SVG CANVAS (NO BORDER, Mobile-Responsive Height) */}
              <div className="md:col-span-7 relative w-full aspect-[16/11] sm:aspect-[4/3] flex items-center justify-center select-none overflow-visible max-h-[250px] sm:max-h-[320px] md:max-h-[380px]">
                <svg
                  viewBox="0 0 540 380"
                  className="w-full h-full max-h-[380px] overflow-visible"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Background Kid Nature & Wallpaper */}
                  <KidBackground
                    showRainbow={p < 0.25 || p > 0.8}
                    showSun={true}
                    showGrass={true}
                    sunMood={p > 0.22 && p < 0.40 ? 'shocked' : 'happy'}
                  />

                  {/* ─────────────────────────────────────────────────────────
                      PHASE 1 & 2: TABLETOP, SPEED DASH & FREEFALL
                     ───────────────────────────────────────────────────────── */}
                  {/* Wooden Dining Room Table */}
                  {p < 0.35 && (
                    <g id="table">
                      <rect x="0" y="215" width="340" height="95" fill="#d35400" fillOpacity="0.18" />
                      <line x1="0" y1="215" x2="340" y2="215" stroke="#795548" strokeWidth="6" strokeLinecap="round" />
                      <line x1="340" y1="215" x2="340" y2="310" stroke="#795548" strokeWidth="6" strokeLinecap="round" />
                      <text x="220" y="240" fill="#8d6e63" className="font-kalam text-xs font-bold">
                        TABLE EDGE ──►
                      </text>
                    </g>
                  )}

                  {/* Prajwal holding remote at left during tabletop dash */}
                  {p < 0.26 && (
                    <g transform="translate(15, 65)">
                      {/* Head */}
                      <circle cx="50" cy="40" r="28" fill="#ffeaa7" stroke="#2f3542" strokeWidth="4" />
                      <path d="M 25 30 C 25 10 50 10 75 14 Z" fill="#2f3542" />
                      <circle cx="44" cy="38" r="4.5" fill="#2f3542" />
                      <circle cx="60" cy="38" r="4.5" fill="#2f3542" />
                      <path d="M 44 50 Q 52 58 60 50" stroke="#2f3542" strokeWidth="3" fill="none" strokeLinecap="round" />
                      {/* Striped Shirt */}
                      <rect x="25" y="68" width="50" height="55" rx="6" fill="#1e90ff" stroke="#2f3542" strokeWidth="3.5" />
                      <line x1="25" y1="85" x2="75" y2="85" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
                      <line x1="25" y1="105" x2="75" y2="105" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
                      {/* Remote Controller in hand */}
                      <g transform="translate(75, 80)">
                        <rect x="0" y="0" width="28" height="38" rx="4" fill="#2f3542" stroke="#2f3542" strokeWidth="2.5" />
                        <circle cx="14" cy="18" r="7" fill="#ff4757" />
                        <line x1="14" y1="0" x2="14" y2="-22" stroke="#718096" strokeWidth="3" />
                        <circle cx="14" cy="-24" r="4" fill="#ffa502" />
                      </g>
                    </g>
                  )}

                  {/* The Car in Motion (Tabletop or Freefall) - Easter Egg: Click to Change Color! */}
                  {p < 0.32 && (
                    <g
                      transform={
                        isFalling
                          ? `translate(${freefallX}, ${freefallY}) rotate(${freefallTilt} 65 25) scale(0.9)`
                          : `translate(${rawCarX}, ${145 + Math.sin(animTime * 24) * 1.5}) scale(0.9)`
                      }
                      onClick={handleCarClick}
                      className="cursor-pointer transition-transform hover:scale-95"
                    >
                      <title>🎨 Click me to repaint my color before the crash!</title>
                      {/* Interactive Easter Egg Crayon Badge above car */}
                      {!isFalling && (
                        <g transform="translate(60, -32)">
                          <rect
                            x="0"
                            y="0"
                            width="145"
                            height="22"
                            rx="11"
                            fill="#ffffff"
                            stroke={currentCarColor.hex}
                            strokeWidth="2.5"
                            className="crayon-box-shadow"
                          />
                          <text
                            x="72"
                            y="15"
                            textAnchor="middle"
                            fill={currentCarColor.hex}
                            className="font-kalam text-[10px] font-bold"
                          >
                            🎨 Tap car to repaint!
                          </text>
                        </g>
                      )}

                      {/* Car Body with Easter Egg Color */}
                      <path
                        d="M 15 55 C 5 25 45 -5 135 0 C 225 2 265 35 255 70 C 245 88 25 88 15 55 Z"
                        stroke="#2f3542"
                        strokeWidth="5"
                        fill={currentCarColor.hex}
                      />
                      {/* Dynamic racing stripe */}
                      <path d="M 45 42 Q 135 32 225 40" stroke={currentCarColor.stripe} strokeWidth="12" strokeLinecap="round" />
                      {/* Cockpit */}
                      <path d="M 75 15 C 90 -10 170 -12 195 15 Z" fill="#70a1ff" stroke="#2f3542" strokeWidth="4" />
                      {/* Antenna */}
                      <line x1="175" y1="0" x2="205" y2="-50" stroke="#718096" strokeWidth="4.5" strokeLinecap="round" />
                      <circle cx="206" cy="-52" r="7" fill={currentCarColor.hex} />
                      {/* Headlight cone */}
                      <circle cx="248" cy="48" r="10" fill="#fed330" stroke="#2f3542" strokeWidth="3" />
                      {/* Front & Back Wheels rotating with distance */}
                      <g transform={`translate(55, 75) rotate(${wheelAngle})`}>
                        <circle cx="0" cy="0" r="26" fill="#2f3542" />
                        <circle cx="0" cy="0" r="12" fill="#fed330" />
                        <line x1="-8" y1="0" x2="8" y2="0" stroke="#2f3542" strokeWidth="3" />
                        <line x1="0" y1="-8" x2="0" y2="8" stroke="#2f3542" strokeWidth="3" />
                      </g>
                      <g transform={`translate(195, 75) rotate(${wheelAngle})`}>
                        <circle cx="0" cy="0" r="26" fill="#2f3542" />
                        <circle cx="0" cy="0" r="12" fill="#fed330" />
                        <line x1="-8" y1="0" x2="8" y2="0" stroke="#2f3542" strokeWidth="3" />
                        <line x1="0" y1="-8" x2="0" y2="8" stroke="#2f3542" strokeWidth="3" />
                      </g>
                      {/* Speed streaks while on table */}
                      {!isFalling && (
                        <g stroke={currentCarColor.hex} strokeWidth="4" strokeLinecap="round">
                          <line x1="-20" y1="30" x2="-60" y2="30" />
                          <line x1="-15" y1="55" x2="-80" y2="55" stroke={currentCarColor.stripe} strokeWidth="5" />
                        </g>
                      )}
                    </g>
                  )}

                  {/* ─────────────────────────────────────────────────────────
                      PHASE 3: THE EXPLOSION & SPLIT CHASSIS
                     ───────────────────────────────────────────────────────── */}
                  {isCrashPhase && (
                    <g id="crash-explosion">
                      {/* Comic Starburst Scaling */}
                      <polygon
                        points="260,110 290,50 320,100 380,75 350,140 420,160 350,190 390,260 320,220 290,290 250,225 180,250 220,180 160,140 230,140"
                        fill="#fed330"
                        stroke="#ff4757"
                        strokeWidth="5"
                        transform={`translate(100, 30) scale(${explosionScale})`}
                      />
                      <text x="240" y="180" fill="#ff4757" className="font-gloria text-5xl font-extrabold rotate-[-5deg]">
                        CRASH!!
                      </text>
                    </g>
                  )}

                  {/* Broken chassis halves moving apart with continuous splitDistance (in chosen Easter egg paint!) */}
                  {p >= 0.32 && p < 0.58 && (
                    <g id="split-car">
                      {/* Left Half drifting left */}
                      <g transform={`translate(${190 - splitDistance * 0.7}, ${185 + splitDistance * 0.2}) rotate(${-splitDistance * 0.35} 50 30)`}>
                        <path d="M 0 40 C 0 10 30 -5 70 0 L 80 40 L 50 45 L 60 70 L 20 75 Z" fill={currentCarColor.hex} stroke="#2f3542" strokeWidth="4.5" />
                        <circle cx="25" cy="75" r="20" fill="#2f3542" />
                      </g>
                      {/* Right Half drifting right */}
                      <g transform={`translate(${270 + splitDistance * 0.7}, ${185 + splitDistance * 0.2}) rotate(${splitDistance * 0.35} 50 30)`}>
                        <path d="M 10 5 C 50 0 90 20 85 55 L 55 60 L 45 40 L 20 48 L 10 5 Z" fill={currentCarColor.hex} stroke="#2f3542" strokeWidth="4.5" />
                        <circle cx="65" cy="65" r="20" fill="#2f3542" />
                      </g>
                    </g>
                  )}

                  {/* ─────────────────────────────────────────────────────────
                      PHASE 4: MOTHERBOARD EMERGES & COPPER PATHS GLOW
                     ───────────────────────────────────────────────────────── */}
                  {isMotherboardPhase && (
                    <g id="motherboard" transform={`translate(200, 185) scale(${boardScale})`}>
                      {/* Green Board */}
                      <rect x="0" y="0" width="150" height="90" rx="12" fill="#2ed573" stroke="#2f3542" strokeWidth="5" />
                      {/* Golden Copper Circuit Paths */}
                      <g stroke="#ffa502" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M 20 25 H 55 V 45 H 85" />
                        <path d="M 20 65 H 60 V 50 H 85" />
                        <path d="M 115 45 H 135" />
                        <circle cx="55" cy="25" r="5" fill="#fed330" />
                        <circle cx="60" cy="65" r="5" fill="#fed330" />
                      </g>
                      {/* Microchip */}
                      <rect x="85" y="35" width="30" height="30" rx="4" fill="#2f3542" stroke="#1e272e" strokeWidth="3" />
                      <circle cx="100" cy="50" r="4" fill="#00ffcc" className="animate-ping" />
                      {/* Gleaming Silver Antenna */}
                      <line x1="130" y1="20" x2="190" y2="-20" stroke="#747d8c" strokeWidth="5" strokeLinecap="round" />
                      <circle cx="192" cy="-22" r="7" fill="#ffffff" stroke="#2f3542" strokeWidth="2.5" />
                      {/* Radio wave sparkles */}
                      <path d="M 200 -30 Q 215 -20 200 -10" stroke="#1e90ff" strokeWidth="3" strokeLinecap="round" fill="none" />
                    </g>
                  )}

                  {/* Prajwal in awe with glowing LED eyes */}
                  {isAwePhase && (
                    <g transform="translate(60, 60)">
                      {/* Head */}
                      <circle cx="50" cy="50" r="35" fill="#ffeaa7" stroke="#2f3542" strokeWidth="4.5" />
                      <path d="M 25 40 C 25 15 50 10 75 14 Z" fill="#2f3542" />
                      {/* LED Glowing Eyes pulsing */}
                      <circle cx="42" cy="48" r={10 * ledPulse} fill="#00ffcc" />
                      <circle cx="62" cy="48" r={10 * ledPulse} fill="#00ffcc" />
                      <circle cx="42" cy="48" r="4" fill="#ffffff" />
                      <circle cx="62" cy="48" r="4" fill="#ffffff" />
                      {/* Wonder light rays */}
                      <g stroke="#00ffcc" strokeWidth="3" strokeLinecap="round">
                        <line x1="24" y1="48" x2="8" y2="48" />
                        <line x1="28" y1="36" x2="12" y2="24" />
                        <line x1="28" y1="60" x2="12" y2="72" />
                        <line x1="80" y1="48" x2="96" y2="48" />
                        <line x1="76" y1="36" x2="92" y2="24" />
                        <line x1="76" y1="60" x2="92" y2="72" />
                      </g>
                      {/* Open "O" mouth */}
                      <ellipse cx="52" cy="68" rx="8" ry="10" fill="#ff4757" stroke="#2f3542" strokeWidth="3" />
                      {/* Body */}
                      <rect x="25" y="90" width="55" height="60" rx="8" fill="#1e90ff" stroke="#2f3542" strokeWidth="4" />
                      <line x1="25" y1="105" x2="80" y2="105" stroke="#ffffff" strokeWidth="7" />
                      <line x1="25" y1="125" x2="80" y2="125" stroke="#ffffff" strokeWidth="7" />
                      <text x="0" y="10" fill="#00d2d3" className="font-gloria text-xl font-bold">
                        *EYES GLOW LIKE LEDS!!* 💡
                      </text>
                    </g>
                  )}

                  {/* ─────────────────────────────────────────────────────────
                      PHASE 5: DAD SWOOPS IN & PLAYFUL BEAR HUG!
                     ───────────────────────────────────────────────────────── */}
                  {isDadPhase && (
                    <g id="dad-hug">
                      {/* Dad */}
                      <g transform={`translate(${dadX}, 30)`}>
                        <circle cx="70" cy="55" r="38" fill="#ffeaa7" stroke="#2f3542" strokeWidth="4.5" />
                        <path d="M 40 45 C 40 18 70 15 105 20 Z" fill="#576574" />
                        <circle cx="58" cy="52" r="11" stroke="#2f3542" strokeWidth="3" fill="#ffffff" fillOpacity="0.4" />
                        <circle cx="82" cy="52" r="11" stroke="#2f3542" strokeWidth="3" fill="#ffffff" fillOpacity="0.4" />
                        {/* Huge smile */}
                        <path d="M 55 70 Q 70 92 85 70 Z" fill="#ff4757" stroke="#2f3542" strokeWidth="3" />
                        {/* Green Sweater */}
                        <rect x="42" y="95" width="60" height="130" rx="10" fill="#10ac84" stroke="#2f3542" strokeWidth="4.5" />
                        {/* Long arms lifting Prajwal up */}
                        <path d="M 42 110 C 10 70 -5 30 20 0" stroke="#2f3542" strokeWidth="14" strokeLinecap="round" fill="none" />
                        <path d="M 102 110 C 135 70 150 30 125 0" stroke="#2f3542" strokeWidth="14" strokeLinecap="round" fill="none" />
                        {/* Dad Speech Bubble: Well-positioned within bounds, comfortable padding */}
                        <g transform={`translate(${Math.max(-dadX + 10, -40)}, -20)`}>
                          <rect x="0" y="0" width="200" height="58" rx="14" fill="#ffffff" stroke="#2f3542" strokeWidth="3" className="crayon-box-shadow" />
                          <text x="18" y="24" fill="#2f3542" className="font-kalam text-xs font-bold">
                            "You really are a
                          </text>
                          <text x="18" y="44" fill="#ff4757" className="font-gloria text-xs font-bold">
                            trouble-maker, aren't you?!"
                          </text>
                        </g>
                      </g>

                      {/* Prajwal being lifted into the air! (Click for kid laughter) */}
                      <g
                        transform={`translate(${dadX + 45}, ${prajwalLiftY})`}
                        onClick={() => soundFX.playCuriosityChime()}
                        className="cursor-pointer"
                      >
                        <title>Click Prajwal!</title>
                        <circle cx="40" cy="30" r="24" fill="#ffeaa7" stroke="#2f3542" strokeWidth="3.5" />
                        <path d="M 22 22 C 22 10 40 8 58 12 Z" fill="#2f3542" />
                        <rect x="22" y="52" width="38" height="42" rx="5" fill="#1e90ff" stroke="#2f3542" strokeWidth="3" />
                        {/* Kicking legs animation */}
                        <line x1="28" y1="94" x2={20 + prajwalKicking} y2="120" stroke="#3742fa" strokeWidth="8" strokeLinecap="round" />
                        <ellipse cx={20 + prajwalKicking} cy="122" rx="12" ry="7" fill="#ffa502" />
                        <line x1="52" y1="94" x2={60 - prajwalKicking} y2="120" stroke="#3742fa" strokeWidth="8" strokeLinecap="round" />
                        <ellipse cx={60 - prajwalKicking} cy="122" rx="12" ry="7" fill="#ffa502" />
                        {/* Prajwal arm pointing down at the floor! */}
                        <line x1="56" y1="65" x2="105" y2="105" stroke="#ffeaa7" strokeWidth="7" strokeLinecap="round" />
                        {/* Prajwal speech badge: Clean box so text stays inside */}
                        <g transform="translate(60, 102)">
                          <rect x="0" y="0" width="170" height="26" rx="8" fill="#ffa502" stroke="#2f3542" strokeWidth="2" />
                          <text x="10" y="17" fill="#ffffff" className="font-gloria text-[11px] font-bold">
                            "HOW DOES IT WORK, DAD?!"
                          </text>
                        </g>
                      </g>
                    </g>
                  )}

                  {/* ─────────────────────────────────────────────────────────
                      PHASE 6: RUG CLASSROOM & FLOATING BITS (0.78 <= p < 0.88)
                     ───────────────────────────────────────────────────────── */}
                  {isRugPhase && (
                    <g id="rug-classroom">
                      {/* Cozy Living Room Rug */}
                      <ellipse
                        cx="270"
                        cy="235"
                        rx="210"
                        ry="65"
                        fill="#fef3c7"
                        stroke="#f59e0b"
                        strokeWidth="3.5"
                        strokeDasharray="8,6"
                        opacity="0.85"
                      />

                      {/* Dad and Prajwal sitting on the rug studying circuit together */}
                      <g transform="translate(110, 140)">
                        {/* Dad Sitting */}
                        <circle cx="55" cy="40" r="28" fill="#ffeaa7" stroke="#2f3542" strokeWidth="3.5" />
                        <path d="M 32 30 C 32 12 52 8 78 12 Z" fill="#576574" />
                        <circle cx="48" cy="38" r="8" stroke="#2f3542" strokeWidth="2.5" fill="#ffffff" fillOpacity="0.4" />
                        <circle cx="68" cy="38" r="8" stroke="#2f3542" strokeWidth="2.5" fill="#ffffff" fillOpacity="0.4" />
                        <path d="M 48 52 Q 58 64 68 52" stroke="#2f3542" strokeWidth="2.5" fill="none" />
                        <rect x="30" y="68" width="55" height="48" rx="8" fill="#10ac84" stroke="#2f3542" strokeWidth="3.5" />
                        {/* Dad pointing arm down to circuit */}
                        <path d="M 75 80 L 125 105" stroke="#ffeaa7" strokeWidth="7" strokeLinecap="round" />
                      </g>

                      {/* The Green Motherboard & Broken Car Chassis on Rug */}
                      <g transform="translate(240, 205)">
                        <rect x="0" y="0" width="60" height="38" rx="6" fill="#2ed573" stroke="#2f3542" strokeWidth="3" />
                        <path d="M 10 12 H 30 V 26 H 50" stroke="#ffa502" strokeWidth="3" strokeLinecap="round" />
                        <circle cx="30" cy="12" r="3" fill="#fed330" />
                        <circle cx="45" cy="20" r="3.5" fill="#00ffcc" className="animate-ping" />
                        {/* Kid's broken car half resting nearby in chosen paint */}
                        <path d="M -30 15 C -15 0 5 10 0 35 L -25 35 Z" fill={currentCarColor.hex} stroke="#2f3542" strokeWidth="3" />
                      </g>

                      {/* Prajwal Sitting Across Engrossed in Wonder */}
                      <g transform="translate(325, 155)">
                        <circle cx="35" cy="35" r="22" fill="#ffeaa7" stroke="#2f3542" strokeWidth="3" />
                        <path d="M 18 26 C 18 14 34 10 50 14 Z" fill="#2f3542" />
                        {/* Big excited eyes */}
                        <circle cx="28" cy="33" r="5" fill="#00ffcc" />
                        <circle cx="42" cy="33" r="5" fill="#00ffcc" />
                        <path d="M 30 44 Q 35 50 40 44" stroke="#2f3542" strokeWidth="2" fill="none" />
                        <rect x="18" y="56" width="36" height="38" rx="6" fill="#1e90ff" stroke="#2f3542" strokeWidth="3" />
                        <line x1="18" y1="68" x2="54" y2="68" stroke="#ffffff" strokeWidth="5" />
                      </g>

                      {/* Floating binary bits along wave */}
                      <g fill="#ffa502" className="font-gloria text-xl font-extrabold opacity-75">
                        <text x={120 + Math.sin(animTime * 3) * 8} y="95">1</text>
                        <text x={160 + Math.cos(animTime * 3) * 8} y="75">0</text>
                        <text x={200 + Math.sin(animTime * 3) * 8} y="90">1</text>
                        <text x={240 + Math.cos(animTime * 3) * 8} y="70">0</text>
                        <text x={280 + Math.sin(animTime * 3) * 8} y="85">1</text>
                      </g>

                      {/* Dad's Dialogue Bubble on Left (Positioned with Dad, never on top of the central drawing) */}
                      <g transform="translate(20, 52)">
                        <rect
                          x="0"
                          y="0"
                          width="215"
                          height="42"
                          rx="12"
                          fill="#ffffff"
                          stroke="#10ac84"
                          strokeWidth="2.5"
                          className="crayon-box-shadow"
                        />
                        {/* Speech bubble tail pointing towards Dad */}
                        <polygon points="120,42 145,64 135,42" fill="#ffffff" stroke="#10ac84" strokeWidth="2.5" />
                        <line x1="121" y1="41" x2="134" y2="41" stroke="#ffffff" strokeWidth="4" />
                        <text x="107" y="26" textAnchor="middle" fill="#059669" className="font-gloria text-xs font-bold">
                          "Code is like a cookie recipe!" 🍪
                        </text>
                      </g>
                    </g>
                  )}

                  {/* ─────────────────────────────────────────────────────────
                      {/* PHASE 7: COMPUTER MONITOR WITH SELF-MADE ANIMATED BUILD VIDEO */}
                  {isComputerPhase && (
                    <g
                      id="computer-desk-scene"
                      className="cursor-pointer"
                      onClick={handleMonitorClick}
                      onMouseEnter={() => setIsHoveringMonitor(true)}
                      onMouseLeave={() => setIsHoveringMonitor(false)}
                    >
                      {/* Monitor Cyan Glow Ambient */}
                      <rect x="100" y="30" width="340" height="230" rx="22" fill="#00ffcc" opacity={isHoveringMonitor ? 0.35 : 0.2} filter="blur(18px)" />

                      {/* Retro CRT Monitor Frame (Borderless crayon shape) */}
                      <rect x="120" y="45" width="300" height="200" rx="18" fill="#dfe4ea" />

                      {/* Monitor Screen Glass */}
                      <rect x="136" y="60" width="268" height="170" rx="14" fill="#0f172a" />

                      {/* THE SELF-MADE ANIMATED VIDEO PLAYING RIGHT ON THE MONITOR SCREEN */}
                      <g transform="translate(146, 70)">
                        {/* Video Screen Backdrop with subtle CRT scanline */}
                        <rect x="0" y="0" width="248" height="150" rx="10" fill="#0b1120" />

                        {/* Top Video Header */}
                        <rect x="8" y="8" width="135" height="18" rx="4" fill="#ef4444" opacity="0.9" />
                        <text x="14" y="21" fill="#ffffff" className="font-kalam text-[10px] font-bold">
                          🔴 SELF-MADE ANIMATED LAB
                        </text>
                        <text x="195" y="20" fill="#facc15" className="font-kalam text-[9px] font-bold">
                          DIY RC CAR
                        </text>

                        {/* ACTIVE ANIMATED BUILD SEQUENCE (Cycles every 8 seconds) */}
                        {Math.floor((animTime % 8) / 2) === 0 && (
                          <g id="mini-anim-step1" transform="translate(20, 32)">
                            <rect x="25" y="15" width="150" height="60" rx="6" fill="#d97706" fillOpacity="0.4" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,3" />
                            <text x="35" y="32" fill="#fde68a" className="font-kalam text-[10px]">1. Cardboard Chassis Cutting</text>
                            {/* Animated kid scissors */}
                            <g transform={`translate(${100 + Math.sin(animTime * 14) * 12}, 38)`}>
                              <circle cx="-6" cy="-5" r="5" stroke="#f43f5e" strokeWidth="2" fill="none" />
                              <circle cx="-6" cy="5" r="5" stroke="#f43f5e" strokeWidth="2" fill="none" />
                              <line x1="-2" y1="-4" x2="14" y2="2" stroke="#e2e8f0" strokeWidth="2.5" />
                              <line x1="-2" y1="4" x2="14" y2="-2" stroke="#e2e8f0" strokeWidth="2.5" />
                              <text x="18" y="3" fill="#f43f5e" className="font-gloria text-[10px] font-bold">*SNIP!*</text>
                            </g>
                          </g>
                        )}

                        {Math.floor((animTime % 8) / 2) === 1 && (
                          <g id="mini-anim-step2" transform="translate(20, 24)">
                            {/* Emerald Motherboard & Battery with Sparks */}
                            <rect x="30" y="15" width="75" height="50" rx="6" fill="#2ed573" />
                            <rect x="55" y="28" width="22" height="22" rx="3" fill="#1e293b" />
                            <path d="M 40 25 H 55 V 38" stroke="#ffa502" strokeWidth="2.5" />
                            <rect x="130" y="18" width="35" height="48" rx="4" fill="#475569" />
                            <text x="140" y="45" fill="#f87171" className="font-kalam text-[9px] font-bold">9V</text>
                            <path d="M 105 32 Q 118 20 130 25" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                            <path d="M 105 48 Q 118 60 130 50" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
                            <circle cx="118" cy="25" r="4" fill="#facc15" className="animate-ping" />
                            <text x="35" y="74" fill="#38ef7d" className="font-kalam text-[10px] font-bold">Wiring Motherboard ⚡</text>

                            {/* Prajwal Realization Chat Box right on monitor preview */}
                            <g transform="translate(12, 82)">
                              <rect x="0" y="0" width="186" height="22" rx="6" fill="#ffffff" stroke="#ff4757" strokeWidth="1.5" />
                              <text x="8" y="15" fill="#1e293b" className="font-gloria text-[8.5px] font-bold">
                                "Wait... isn't it the one I broke?!" 😲💡
                              </text>
                            </g>
                          </g>
                        )}

                        {Math.floor((animTime % 8) / 2) === 2 && (
                          <g id="mini-anim-step3" transform="translate(20, 32)">
                            {/* Snapping Wheels on */}
                            <rect x="35" y="30" width="135" height="25" rx="5" fill="#b45309" opacity="0.7" />
                            <g transform={`translate(${55 - Math.sin(animTime * 8) * 6}, 42)`}>
                              <circle cx="0" cy="0" r="16" fill="#1e293b" stroke="#ffffff" strokeWidth="2" />
                              <circle cx="0" cy="0" r="7" fill="#fbbf24" />
                            </g>
                            <g transform={`translate(${150 + Math.sin(animTime * 8) * 6}, 42)`}>
                              <circle cx="0" cy="0" r="16" fill="#1e293b" stroke="#ffffff" strokeWidth="2" />
                              <circle cx="0" cy="0" r="7" fill="#fbbf24" />
                            </g>
                            <text x="50" y="20" fill="#38bdf8" className="font-gloria text-xs font-bold">3. *CLICK-SNAP!* 🛞</text>
                            <text x="45" y="75" fill="#fde047" className="font-kalam text-[10px]">Bottle-Cap Wheels Locked!</text>
                          </g>
                        )}

                        {Math.floor((animTime % 8) / 2) === 3 && (
                          <g id="mini-anim-step4" transform="translate(20, 32)">
                            {/* Rebuilt Car Zooming */}
                            <g transform={`translate(${35 + Math.sin(animTime * 16) * 8}, 10)`}>
                              <path d="M 15 35 C 5 15 30 0 85 2 C 140 4 165 24 160 45 C 150 58 20 58 15 35 Z" fill="#ff4757" />
                              <path d="M 35 28 Q 85 20 145 27" stroke="#ffa502" strokeWidth="8" strokeLinecap="round" />
                              <circle cx="160" cy="34" r="7" fill="#ffffff" className="animate-ping" />
                              <polygon points="165,34 220,15 220,55" fill="#fef08a" opacity="0.4" />
                              <circle cx="45" cy="48" r="14" fill="#1e293b" stroke="#ffffff" strokeWidth="2" />
                              <circle cx="130" cy="48" r="14" fill="#1e293b" stroke="#ffffff" strokeWidth="2" />
                            </g>
                            <text x="35" y="76" fill="#38ef7d" className="font-gloria text-xs font-bold animate-pulse">4. Rebuilt & Zooming!! 🏎️</text>
                          </g>
                        )}

                        {/* Pulsating Center Play Button Overlay */}
                        <g transform="translate(124, 75)">
                          <circle cx="0" cy="0" r={20 + Math.sin(animTime * 5) * 2} fill="#ff4757" opacity="0.9" className="shadow-lg" />
                          <polygon points="-4,-7 8,0 -4,7" fill="#ffffff" />
                        </g>
                      </g>

                      {/* Monitor Stand (Borderless) */}
                      <path d="M 245 245 L 235 285 H 305 L 295 245" fill="#ced6e0" />
                      <ellipse cx="270" cy="288" rx="60" ry="12" fill="#a4b0be" />

                      {/* Small subtle hint to tap on the screen (Neatly anchored on monitor base) */}
                      <g transform="translate(192, 276)">
                        <rect x="0" y="0" width="156" height="22" rx="11" fill="#ffa502" opacity="0.95" />
                        <text x="14" y="15" fill="#1e293b" className="font-kalam text-[11px] font-bold">
                          💡 tap on the screen
                        </text>
                      </g>

                      {/* Master Thought Bubble Above Prajwal (Roomy crayon cloud at top right, clear of monitor) */}
                      <g transform="translate(255, 6)">
                        <rect
                          x="0"
                          y="0"
                          width="235"
                          height="72"
                          rx="20"
                          fill="#ffffff"
                          stroke="#ff4757"
                          strokeWidth="3.5"
                          className="crayon-box-shadow"
                        />
                        <circle cx="36" cy="84" r="6.5" fill="#ffffff" stroke="#ff4757" strokeWidth="2.5" />
                        <circle cx="26" cy="96" r="4" fill="#ffffff" stroke="#ff4757" strokeWidth="2" />
                        <text x="22" y="28" fill="#2f3542" className="font-kalam text-xs font-bold">
                          "What awesome thing
                        </text>
                        <text x="22" y="52" fill="#ff4757" className="font-gloria text-sm font-extrabold">
                          am I gonna MAKE NEXT?!"
                        </text>
                      </g>
                    </g>
                  )}
                </svg>
              </div>

              {/* HANDWRITTEN NARRATIVE COLUMN (Right side, Mobile-Responsive & Overflow Protected) */}
              <div className="md:col-span-5 space-y-2 sm:space-y-4 max-h-[75vh] overflow-y-auto no-scrollbar pr-1">
                <div className="space-y-1 sm:space-y-2">
                  <h2
                    className="text-xl sm:text-2xl md:text-3xl font-gloria leading-tight transition-colors duration-300 break-words"
                    style={{ color: narrative.color }}
                  >
                    {narrative.title}
                  </h2>

                  <p className="font-patrick text-sm sm:text-lg md:text-xl text-slate-800 leading-snug sm:leading-relaxed font-bold break-words">
                    "{narrative.text}"
                  </p>

                  <div className="p-2.5 sm:p-3.5 bg-amber-50/90 rounded-2xl font-kalam text-amber-950 text-xs sm:text-sm leading-snug sm:leading-relaxed shadow-xs break-words">
                    {narrative.quote}
                  </div>
                </div>

                {/* Final Scene Special: Subtle hint to tap the screen & Character sheet */}
                {p >= 0.88 && (
                  <div className="pt-1.5 sm:pt-2 flex flex-col gap-2">
                    {/* Small hint to tap the screen */}
                    <p className="font-kalam text-xs sm:text-sm text-slate-500 italic flex items-center gap-1.5">
                      <span>💡</span>
                      <span>(hint: tap on the screen)</span>
                    </p>

                    <div className="flex gap-2">
                      <button
                        onClick={onOpenCharacterSheet}
                        className="w-full py-2.5 sm:py-3 crayon-btn-yellow font-kalam font-bold text-xs sm:text-sm active:scale-95 transition-transform"
                      >
                        📋 5-Point Character Sheet
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Scrubber */}
            <div className="pt-2 flex items-center justify-between text-xs font-patrick text-slate-500">
              <span>Scroll up</span>
              <span className="italic">hint: tap on the screen</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
