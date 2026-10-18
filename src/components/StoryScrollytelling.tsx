import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, AnimatePresence } from 'motion/react';
import {
  CrayonRCCar,
  CrayonCrashScene,
  CrayonPrajwalInAwe,
  CrayonDadAndPrajwal,
  CrayonFloorAcademy,
  CrayonGlowingScreenScene,
} from './CrayonSVGs';
import { soundFX } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Volume2,
  ArrowDown,
  Eye,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Radio,
  Zap,
} from 'lucide-react';

interface StoryScrollytellingProps {
  onOpenCharacterSheet: () => void;
  onOpenEasterEgg: () => void;
}

interface SceneData {
  id: number;
  title: string;
  subtitle: string;
  storyHeading: string;
  storyText: string;
  quote?: string;
  accentColor: string;
  badgeBg: string;
  borderColor: string;
  soundLabel: string;
  onPlaySound: () => void;
}

export const StoryScrollytelling: React.FC<StoryScrollytellingProps> = ({
  onOpenCharacterSheet,
  onOpenEasterEgg,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [antennaClicks, setAntennaClicks] = useState(0);
  const [ledGlowState, setLedGlowState] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const scenes: SceneData[] = [
    {
      id: 0,
      title: 'Scene 01 · The Kitchen Table Speedway',
      subtitle: 'Top speed ahead!',
      storyHeading: 'The High-Speed Tabletop Dash',
      storyText:
        'Prajwal gripped the plastic remote controller with both hands. His favorite cherry-red remote-control car was screaming down the dining room table at breakneck speed, leaving imaginary tire smoke across the wood!',
      quote:
        '"Faster, faster! It’s going to beat the sound barrier!" — 8-year-old Prajwal, 2 seconds before catastrophe.',
      accentColor: '#ff4757',
      badgeBg: 'bg-red-50 text-red-600 border-red-300',
      borderColor: 'border-[#ff4757]',
      soundLabel: 'Rev Motor! (VRRROOOM)',
      onPlaySound: () => soundFX.playCarRev(),
    },
    {
      id: 1,
      title: 'Scene 02 · The Split',
      subtitle: 'Loud Crash on the Floor!',
      storyHeading: 'It Started With A Loud Crash!',
      storyText:
        'It started with a loud crash! Prajwal’s favorite remote-control car zoomed straight off the table and split wide open on the living room floor.',
      quote:
        'The red plastic chassis cracked cleanly down the middle, sending plastic wheel caps bouncing against the rug with a loud clatter!',
      accentColor: '#ffa502',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-300',
      borderColor: 'border-[#ffa502]',
      soundLabel: 'Replay Crash Sound! 💥',
      onPlaySound: () => soundFX.playCrash(),
    },
    {
      id: 2,
      title: 'Scene 03 · The Hidden World',
      subtitle: 'Frozen in awe & curiosity',
      storyHeading: 'The Emerald World Inside',
      storyText:
        'But instead of crying, the 8-year-old stood completely frozen in awe. Spilling out from the broken plastic chassis was a hidden world he had never seen before: a bright green motherboard, tiny winding copper paths, and a gleaming silver antenna.',
      quote:
        'Prajwal dropped his jaw in complete wonder. It wasn’t trash — it was a secret city of electricity!',
      accentColor: '#2ed573',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-300',
      borderColor: 'border-[#2ed573]',
      soundLabel: 'Wonder Chime ✨',
      onPlaySound: () => soundFX.playCuriosityChime(),
    },
    {
      id: 3,
      title: 'Scene 04 · The Joyous Hug',
      subtitle: 'Dad swoops into the room!',
      storyHeading: 'No Anger, Just Laughter!',
      storyText:
        'Suddenly, his father swooped into the room. Lifting the kid into the air in a joyous, playful hug, he laughed, "You really are a trouble-maker, aren\'t you?"',
      quote:
        'Prajwal waved his arms in the air, pointing excitedly down at the scattered pieces on the rug, begging to know how it all worked!',
      accentColor: '#1e90ff',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-300',
      borderColor: 'border-[#1e90ff]',
      soundLabel: "Hear Dad's Laugh 🐻",
      onPlaySound: () => soundFX.playChuckle(),
    },
    {
      id: 4,
      title: 'Scene 05 · The Living Room Rug Classroom',
      subtitle: 'How machines think',
      storyHeading: 'Floor-Side Tech Magic',
      storyText:
        'Pointing excitedly at the scattered pieces, Prajwal begged to know how it all worked. Right there on the floor, his father explained the magic of computers, coding, and different devices in a simple way a kid could easily understand. Prajwal’s eyes practically glowed like LEDs with curiosity.',
      quote:
        '💡 Dad explained: "Code is just instructions! Like a recipe for cookies. You tell the chip when to turn, when to speed up, and when to shine the headlights."',
      accentColor: '#ffa502',
      badgeBg: 'bg-amber-50 text-amber-800 border-amber-300',
      borderColor: 'border-[#ffa502]',
      soundLabel: 'Curiosity Pulse 💡',
      onPlaySound: () => soundFX.playCuriosityChime(),
    },
    {
      id: 5,
      title: 'Scene 06 · The Grand Awakening',
      subtitle: 'The glowing screen & the spark',
      storyHeading: 'What Am I Going To Make Next?',
      storyText:
        'His father then pulled him up to a big, glowing computer screen and told him that if he learned how to guide these machines, he could invent his own awesome remote-control cars and devices from scratch. Staring into the bright monitor, Prajwal smiled, his mind completely racing with a single question: What awesome thing am I going to make next?',
      quote:
        '✨ In front of the bright terminal, an accidental young hacker and maker was born.',
      accentColor: '#ff4757',
      badgeBg: 'bg-red-50 text-red-600 border-red-300',
      borderColor: 'border-[#ff4757]',
      soundLabel: 'Fire Sparks! 🎆',
      onPlaySound: () => {
        soundFX.playFanfare();
        try {
          confetti({
            particleCount: 80,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#ff4757', '#1e90ff', '#fed330', '#2ed573', '#9b59b6'],
          });
        } catch {}
      },
    },
  ];

  // Sync scrollYProgress to active scene index and percentage
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      setScrollPercent(Math.min(100, Math.max(0, Math.round(progress * 100))));
      const sceneIndex = Math.min(
        scenes.length - 1,
        Math.floor(progress * scenes.length)
      );
      if (sceneIndex !== activeSceneIndex) {
        setActiveSceneIndex(sceneIndex);
        // Play subtle sound on scene change
        soundFX.playBlip();
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, activeSceneIndex, scenes.length]);

  const handleAntennaClick = () => {
    const nextClicks = antennaClicks + 1;
    setAntennaClicks(nextClicks);
    soundFX.playBlip();

    if (nextClicks >= 3) {
      onOpenEasterEgg();
      setAntennaClicks(0);
    }
  };

  const currentScene = scenes[activeSceneIndex];

  // Function to programmatically scroll to a scene
  const scrollToScene = (index: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const targetScrollY = containerTop + (index / (scenes.length - 1)) * (containerHeight - window.innerHeight);
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  return (
    <div id="story" className="relative">
      {/* Intro Header Before Sticky Box */}
      <div className="text-center pt-10 pb-6 px-4">
        <div className="inline-block relative">
          <span className="font-kalam text-sm sm:text-base text-[#ff4757] font-bold uppercase tracking-widest bg-red-50 px-4 py-1.5 rounded-full border-2 border-dashed border-[#ff4757]">
            📖 Interactive Scrolling Story
          </span>
          <h1 className="text-4xl sm:text-6xl font-gloria text-[#2f3542] mt-3 tracking-wide">
            The Day the RC Car Shattered
          </h1>
          <p className="font-patrick text-xl sm:text-2xl text-slate-700 mt-2 max-w-2xl mx-auto">
            Scroll down slowly to watch Prajwal's story animate inside the single Crayon Studio Box!
          </p>
          <div className="flex items-center justify-center gap-2 mt-3 text-slate-500 font-kalam text-sm animate-bounce">
            <ArrowDown className="w-4 h-4 text-[#ff4757]" />
            <span>Scroll down the page to trigger animations</span>
            <ArrowDown className="w-4 h-4 text-[#ff4757]" />
          </div>
        </div>
      </div>

      {/* The Long Scroll Container (600vh height to give generous time for scrolling animations) */}
      <div ref={containerRef} className="relative h-[650vh]">
        {/* The Single Sticky Story Box: Locked in place while scrolling */}
        <div className="sticky top-16 sm:top-20 z-20 w-full px-3 sm:px-6 max-w-5xl mx-auto">
          <div
            className={`relative bg-[#fffdf7] p-5 sm:p-8 rounded-3xl crayon-border-thick ${currentScene.borderColor} crayon-box-shadow-lg transition-colors duration-500 overflow-hidden min-h-[580px] sm:min-h-[620px] flex flex-col justify-between`}
          >
            {/* Washi tape decoration at top */}
            <div className="washi-tape" />

            {/* Top Toolbar: Chapter Title, Crayon Progress Bar & Scene Controls */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b-2 border-dashed border-slate-200">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-kalam text-xs sm:text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-full border shadow-xs transition-colors duration-300 ${currentScene.badgeBg}`}
                  >
                    {currentScene.title}
                  </span>
                  <span className="hidden sm:inline font-patrick text-xs text-slate-500">
                    Scroll: {scrollPercent}%
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={currentScene.onPlaySound}
                    className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-slate-100 text-slate-800 font-kalam font-bold text-xs rounded-xl crayon-border border-[#2f3542] shadow-xs transition-transform active:scale-95"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-red-500" />
                    {currentScene.soundLabel}
                  </button>

                  {/* Scene Navigation Steppers */}
                  <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-300">
                    <button
                      onClick={() => scrollToScene(Math.max(0, activeSceneIndex - 1))}
                      disabled={activeSceneIndex === 0}
                      className="p-1 text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:hover:text-slate-600"
                      title="Previous Scene"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="font-kalam font-bold text-xs px-2 text-slate-700">
                      {activeSceneIndex + 1} / {scenes.length}
                    </span>
                    <button
                      onClick={() => scrollToScene(Math.min(scenes.length - 1, activeSceneIndex + 1))}
                      disabled={activeSceneIndex === scenes.length - 1}
                      className="p-1 text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:hover:text-slate-600"
                      title="Next Scene"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Crayon Wax Progress Bar */}
              <div className="w-full bg-slate-200/70 h-2.5 rounded-full overflow-hidden border border-slate-300 mb-4 relative">
                <div
                  className="h-full transition-all duration-200 ease-out rounded-full"
                  style={{
                    width: `${Math.max(5, scrollPercent)}%`,
                    backgroundColor: currentScene.accentColor,
                  }}
                />
              </div>
            </div>

            {/* Central Stage: Animated 2D Crayon Drawing (Left) + Handwritten Story Text (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-center my-auto py-2">
              {/* 2D Kid Crayon Animated Visual Stage */}
              <div className="relative flex items-center justify-center p-4 sm:p-6 bg-notebook-grid rounded-2xl border-2 border-slate-300/80 shadow-inner min-h-[280px] sm:min-h-[320px]">
                <AnimatePresence mode="wait">
                  {activeSceneIndex === 0 && (
                    <motion.div
                      key="scene-0"
                      initial={{ opacity: 0, scale: 0.85, x: -40 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.85, x: 50 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="w-full flex justify-center"
                    >
                      {/* Animated Speed zoom effect */}
                      <motion.div
                        animate={{
                          x: [-4, 6, -3, 5, 0],
                          y: [-2, 2, -1, 1, 0],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.35,
                          ease: 'easeInOut',
                        }}
                        className="cursor-pointer"
                        onClick={() => soundFX.playCarRev()}
                        title="Click to rev!"
                      >
                        <CrayonRCCar speedLines={true} />
                      </motion.div>
                    </motion.div>
                  )}

                  {activeSceneIndex === 1 && (
                    <motion.div
                      key="scene-1"
                      initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        rotate: 0,
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5, ease: 'backOut' }}
                      className="w-full flex justify-center"
                    >
                      {/* Crash scene with shaking impact */}
                      <motion.div
                        animate={{
                          scale: [1, 1.04, 0.98, 1],
                          rotate: [0, -1.5, 1.5, 0],
                        }}
                        transition={{ duration: 0.4 }}
                        className="cursor-pointer"
                        onClick={() => soundFX.playCrash()}
                      >
                        <CrayonCrashScene
                          onInspectMotherboard={() => {
                            soundFX.playCuriosityChime();
                          }}
                        />
                      </motion.div>
                    </motion.div>
                  )}

                  {activeSceneIndex === 2 && (
                    <motion.div
                      key="scene-2"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.6 }}
                      className="w-full flex flex-col items-center"
                    >
                      <CrayonPrajwalInAwe ledGlow={ledGlowState} />
                      <button
                        onClick={() => {
                          soundFX.playCuriosityChime();
                          setLedGlowState(!ledGlowState);
                        }}
                        className="mt-2 px-3 py-1 bg-cyan-100 hover:bg-cyan-200 text-cyan-900 font-kalam text-xs font-bold rounded-lg border border-cyan-400 flex items-center gap-1.5 shadow-xs"
                      >
                        <Eye className="w-3.5 h-3.5 text-cyan-600" />
                        {ledGlowState ? 'LED Eyes Glowing With Awe (Active)' : 'Turn On Wonder Eyes!'}
                      </button>
                    </motion.div>
                  )}

                  {activeSceneIndex === 3 && (
                    <motion.div
                      key="scene-3"
                      initial={{ opacity: 0, x: -60, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 60 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="w-full flex justify-center"
                    >
                      <motion.div
                        animate={{
                          y: [0, -8, 0],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 2.2,
                          ease: 'easeInOut',
                        }}
                        onClick={() => soundFX.playChuckle()}
                        className="cursor-pointer"
                        title="Click to hear Dad laugh!"
                      >
                        <CrayonDadAndPrajwal />
                      </motion.div>
                    </motion.div>
                  )}

                  {activeSceneIndex === 4 && (
                    <motion.div
                      key="scene-4"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.6 }}
                      className="w-full flex justify-center"
                    >
                      <motion.div
                        animate={{
                          rotate: [-0.5, 0.5, -0.5],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 4,
                          ease: 'easeInOut',
                        }}
                      >
                        <CrayonFloorAcademy />
                      </motion.div>
                    </motion.div>
                  )}

                  {activeSceneIndex === 5 && (
                    <motion.div
                      key="scene-5"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.6 }}
                      className="w-full flex justify-center"
                    >
                      <CrayonGlowingScreenScene
                        onLaunchSpark={() => {
                          soundFX.playFanfare();
                          try {
                            confetti({
                              particleCount: 70,
                              spread: 75,
                              origin: { y: 0.6 },
                              colors: ['#ff4757', '#1e90ff', '#fed330', '#2ed573', '#9b59b6'],
                            });
                          } catch {}
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Story Narrative Text that Changes with Scroll */}
              <div className="space-y-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`text-${currentScene.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-3"
                  >
                    <h2
                      className="text-2xl sm:text-4xl font-gloria leading-tight"
                      style={{ color: currentScene.accentColor }}
                    >
                      {currentScene.storyHeading}
                    </h2>

                    <p className="font-patrick text-xl sm:text-2xl text-slate-800 leading-relaxed font-bold">
                      "{currentScene.storyText}"
                    </p>

                    {currentScene.quote && (
                      <div className="p-3.5 bg-amber-50/90 rounded-xl border-2 border-dashed border-amber-300 font-kalam text-amber-950 text-base leading-snug">
                        {currentScene.quote}
                      </div>
                    )}

                    {/* Interactive Sub-actions in Scene 3 (Inspecting Motherboard) */}
                    {activeSceneIndex === 2 && (
                      <div className="pt-1 flex flex-wrap gap-2">
                        <button
                          onClick={() => {
                            soundFX.playCuriosityChime();
                            setActiveHotspot('board');
                          }}
                          className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-kalam text-xs font-bold rounded-lg border border-emerald-400 flex items-center gap-1 shadow-xs"
                        >
                          <Zap className="w-3.5 h-3.5 text-emerald-600" />
                          Inspect Motherboard
                        </button>
                        <button
                          onClick={() => {
                            soundFX.playBlip();
                            setActiveHotspot('copper');
                          }}
                          className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 font-kalam text-xs font-bold rounded-lg border border-amber-400 flex items-center gap-1 shadow-xs"
                        >
                          <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                          Inspect Copper Paths
                        </button>
                        <button
                          onClick={handleAntennaClick}
                          className="px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-900 font-kalam text-xs font-bold rounded-lg border border-blue-400 flex items-center gap-1 shadow-xs"
                        >
                          <Radio className="w-3.5 h-3.5 text-blue-600" />
                          Tap Antenna ({antennaClicks}/3) 📡
                        </button>
                      </div>
                    )}

                    {/* Final scene call-to-action buttons */}
                    {activeSceneIndex === 5 && (
                      <div className="pt-2 flex flex-wrap gap-3">
                        <button
                          onClick={() => {
                            soundFX.playCuriosityChime();
                            onOpenCharacterSheet();
                          }}
                          className="px-4 py-2 bg-[#ff4757] hover:bg-[#ff6b81] text-white font-kalam font-bold text-sm rounded-xl crayon-border border-[#2f3542] shadow-xs"
                        >
                          📋 Open 5-Point Character Sheet
                        </button>
                        <a
                          href="#inventions"
                          onClick={() => soundFX.playBlip()}
                          className="px-4 py-2 bg-[#ffa502] hover:bg-[#ffb122] text-slate-900 font-kalam font-bold text-sm rounded-xl crayon-border border-[#2f3542] shadow-xs"
                        >
                          🛠️ View Inventions
                        </a>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Scrubber & Scene Indicators */}
            <div className="pt-3 border-t-2 border-dashed border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs font-patrick text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="font-kalam font-bold text-slate-700">Jump Scene:</span>
                {scenes.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      soundFX.playBlip();
                      scrollToScene(idx);
                    }}
                    className={`w-6 h-6 rounded-full font-kalam font-bold flex items-center justify-center transition-transform ${
                      activeSceneIndex === idx
                        ? 'bg-[#2f3542] text-white scale-110 shadow-xs'
                        : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="font-kalam text-slate-500">
                  ↓ Scroll page down for long animations
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
