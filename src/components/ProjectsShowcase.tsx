import React, { useState } from 'react';
import { Lightbulb, Volume2, ShieldAlert, Zap } from 'lucide-react';
import { soundFX } from '../utils/audio';

export const ProjectsShowcase: React.FC = () => {
  const [crayonBoxOpen, setCrayonBoxOpen] = useState(false);
  const [headlightsOn, setHeadlightsOn] = useState(false);
  const [bleepyJoke, setBleepyJoke] = useState<string | null>(null);
  const [solarBugBuzzing, setSolarBugBuzzing] = useState(false);

  const jokes = [
    "Why did the computer catch a cold? Because it left its Windows open! 💻❄️",
    "What do you call a robot that always takes the long way? An R-2-DETOUR! 🤖",
    "Why was the math book sad? Because it had too many problems! 📐😭",
    "How do circuits talk? In micro-CHIPS and bites! ⚡🍪",
  ];

  const handleTestHeadlights = () => {
    setHeadlightsOn(!headlightsOn);
    if (!headlightsOn) {
      soundFX.playCuriosityChime();
    } else {
      soundFX.playBlip();
    }
  };

  const handleToggleCrayonAlarm = () => {
    const newState = !crayonBoxOpen;
    setCrayonBoxOpen(newState);
    if (newState) {
      soundFX.playCrash();
    } else {
      soundFX.playBlip();
    }
  };

  const handleBleepyFistBump = () => {
    soundFX.playFanfare();
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    setBleepyJoke(randomJoke);
  };

  const handleSolarSkitter = () => {
    setSolarBugBuzzing(true);
    soundFX.playCarRev();
    setTimeout(() => {
      setSolarBugBuzzing(false);
    }, 2400);
  };

  return (
    <section id="inventions" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-block relative">
          <span className="font-kalam text-xs sm:text-sm text-[#1e90ff] font-bold uppercase tracking-widest bg-blue-50 px-4 py-1.5 rounded-full">
            🛠️ What Prajwal Makes
          </span>
          <h2 className="text-4xl sm:text-5xl font-gloria text-[#2f3542] mt-3">
            Prajwal's Secret Workshop
          </h2>
          <p className="font-patrick text-xl text-slate-600 mt-2 max-w-2xl mx-auto">
            "Everything broken is just a puzzle waiting for more tape, a battery, and some code."
          </p>
        </div>
      </div>

      {/* Projects Grid (Borderless soft cards with authentic wax crayon buttons) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
        {/* Project 1: Turbo-Challenger v2 */}
        <div className="crayon-card-soft p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between">
          <div className="washi-tape" />
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-kalam text-xs font-bold uppercase tracking-wider text-[#ff4757] bg-red-50 px-2.5 py-0.5 rounded-md">
                Project #01 · Hardware Rebuild
              </span>
              <span className="text-xs text-slate-500 font-patrick">Status: Operational 🏎️</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-gloria text-[#2f3542] mb-1">
              Turbo-Challenger v2 (The Rebirth)
            </h3>
            <p className="font-patrick text-base text-slate-600 mb-4">
              Born from the scattered pieces of the great living room crash! Upgraded with a dual popsicle-stick chassis bridge, extra copper bypass wires, and super-bright searchlight LEDs.
            </p>

            {/* Bill of Materials */}
            <div className="bg-amber-50/70 p-3.5 rounded-2xl mb-5">
              <div className="font-kalam text-xs font-bold text-amber-900 mb-1.5 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                Kid Inventor Recipe:
              </div>
              <ul className="text-xs font-patrick text-amber-950 space-y-1 list-disc list-inside">
                <li>1 crashed red RC car motherboard + salvaged antenna</li>
                <li>4 birch popsicle sticks (eaten by Prajwal himself)</li>
                <li>2 ultra-bright white LEDs wired to Dad's 9V battery</li>
                <li>Approximately 3 yards of neon electrical tape</li>
              </ul>
            </div>

            {/* Interactive Simulation Display */}
            <div className={`p-4 rounded-2xl transition-colors ${headlightsOn ? 'bg-amber-100 shadow-xs' : 'bg-slate-100/80'}`}>
              <div className="flex items-center justify-between">
                <span className="font-kalam text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Lightbulb className={`w-5 h-5 ${headlightsOn ? 'text-amber-500 fill-amber-400' : 'text-slate-400'}`} />
                  Headlight Circuit: {headlightsOn ? 'HIGH BEAM ON ☀️' : 'OFF'}
                </span>
                <span className="text-xs font-patrick text-slate-500">
                  {headlightsOn ? 'Drawing 20mA power' : 'Click to ignite'}
                </span>
              </div>
              {headlightsOn && (
                <div className="mt-2 text-xs font-kalam text-amber-800 bg-white/80 p-2 rounded-lg animate-pulse">
                  ⚡ "BZZZZZT! Look Dad, it lights up the whole hallway!"
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 flex items-center justify-between">
            <button
              onClick={handleTestHeadlights}
              className={`w-full py-2.5 sm:py-3 px-3 sm:px-4 font-kalam text-xs sm:text-base font-bold rounded-2xl shadow-xs transition-transform leading-tight text-center ${
                headlightsOn ? 'crayon-btn-yellow' : 'crayon-btn-red'
              }`}
            >
              {headlightsOn ? 'Turn Off Headlights 💡' : '⚡ Test High-Beam Headlights!'}
            </button>
          </div>
        </div>

        {/* Project 2: Sister-Proof Crayon Box Alarm */}
        <div className="crayon-card-soft p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between">
          <div className="washi-tape" />
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-kalam text-xs font-bold uppercase tracking-wider text-[#1e90ff] bg-blue-50 px-2.5 py-0.5 rounded-md">
                Project #02 · Home Security
              </span>
              <span className="text-xs text-slate-500 font-patrick">Active Guard 🛡️</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-gloria text-[#2f3542] mb-1">
              Sister-Proof Crayon Box Alarm
            </h3>
            <p className="font-patrick text-base text-slate-600 mb-4">
              Prajwal got tired of his sister stealing his favorite "Electric Sky Blue" crayon. So he hid a tiny light sensor inside the Crayola tin that screeches when the lid opens!
            </p>

            {/* Bill of Materials */}
            <div className="bg-blue-50/70 p-3.5 rounded-2xl mb-5">
              <div className="font-kalam text-xs font-bold text-blue-900 mb-1.5 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-blue-600" />
                Kid Inventor Recipe:
              </div>
              <ul className="text-xs font-patrick text-blue-950 space-y-1 list-disc list-inside">
                <li>1 vintage 64-color Crayola tin box</li>
                <li>1 light-detecting photoresistor (LDR)</li>
                <li>1 buzzer taken out of a noisy birthday greeting card</li>
                <li>1 CR2032 coin battery taped under the cardboard divider</li>
              </ul>
            </div>

            {/* Interactive Simulation Display */}
            <div className={`p-4 rounded-2xl transition-all ${crayonBoxOpen ? 'bg-red-100 shadow-xs' : 'bg-slate-100/80'}`}>
              <div className="flex items-center justify-between">
                <span className="font-kalam text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Volume2 className={`w-5 h-5 ${crayonBoxOpen ? 'text-red-500 animate-bounce' : 'text-slate-400'}`} />
                  Crayon Lid: {crayonBoxOpen ? '🚨 INTRUDER DETECTED!!' : '🔒 Closed & Armed'}
                </span>
                <span className="text-xs font-patrick text-slate-500">
                  {crayonBoxOpen ? 'ALARM SOUNDING!' : 'Safe'}
                </span>
              </div>
              {crayonBoxOpen && (
                <div className="mt-2 text-xs font-kalam text-red-700 bg-white/90 p-2 rounded-lg">
                  🔊 *BEEEEEP! BEEEEEP!* "HANDS OFF MY SKY BLUE CRAYON!"
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 flex items-center justify-between">
            <button
              onClick={handleToggleCrayonAlarm}
              className={`w-full py-2.5 sm:py-3 px-3 sm:px-4 font-kalam text-xs sm:text-base font-bold rounded-2xl shadow-xs transition-transform leading-tight text-center ${
                crayonBoxOpen ? 'crayon-btn-red animate-pulse' : 'crayon-btn-blue'
              }`}
            >
              {crayonBoxOpen ? 'Close Crayon Box & Reset Alarm 🤫' : '🔓 Sneak Open Crayon Box (Trigger Alarm!)'}
            </button>
          </div>
        </div>

        {/* Project 3: Bleepy the Cardboard Assistant */}
        <div className="crayon-card-soft p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between">
          <div className="washi-tape" />
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-kalam text-xs font-bold uppercase tracking-wider text-[#2ed573] bg-emerald-50 px-2.5 py-0.5 rounded-md">
                Project #03 · Robotics
              </span>
              <span className="text-xs text-slate-500 font-patrick">Best Pal 🤖</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-gloria text-[#2f3542] mb-1">
              Bleepy the Cardboard Assistant
            </h3>
            <p className="font-patrick text-base text-slate-600 mb-4">
              Constructed from an empty honey-nut cereal box, two paper towel tubes, and a servo motor. Prajwal programmed Bleepy to give triumphant high-fives and crack silly jokes!
            </p>

            {/* Bill of Materials */}
            <div className="bg-emerald-50/70 p-3.5 rounded-2xl mb-5">
              <div className="font-kalam text-xs font-bold text-emerald-900 mb-1.5 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-emerald-600" />
                Kid Inventor Recipe:
              </div>
              <ul className="text-xs font-patrick text-emerald-950 space-y-1 list-disc list-inside">
                <li>1 cardboard cereal box (painted silver with foil wrappers)</li>
                <li>1 miniature 9g micro-servo motor for high-five arm</li>
                <li>2 green bottle cap eyes + 1 button nose</li>
                <li>Dad's Arduino Uno clone with pre-loaded joke firmware</li>
              </ul>
            </div>

            {/* Interactive Simulation Display */}
            <div className="p-4 rounded-2xl bg-emerald-50/60">
              <div className="flex items-center justify-between">
                <span className="font-kalam text-sm font-bold text-slate-700 flex items-center gap-2">
                  <span className="text-xl">🤖</span>
                  Bleepy's Speech Box
                </span>
                <span className="text-xs font-patrick text-emerald-700">Ready for High-Five</span>
              </div>
              {bleepyJoke && (
                <div className="mt-2 text-xs font-kalam text-slate-800 bg-white p-2.5 rounded-lg shadow-xs">
                  {bleepyJoke}
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 flex items-center justify-between">
            <button
              onClick={handleBleepyFistBump}
              className="w-full py-2.5 sm:py-3 px-3 sm:px-4 font-kalam text-xs sm:text-base font-bold rounded-2xl crayon-btn-green leading-tight text-center"
            >
              🖐️ Give Bleepy a High-Five (Hear Joke!)
            </button>
          </div>
        </div>

        {/* Project 4: The Solar Skitter-Bug */}
        <div className="crayon-card-soft p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between">
          <div className="washi-tape" />
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-kalam text-xs font-bold uppercase tracking-wider text-[#ffa502] bg-amber-50 px-2.5 py-0.5 rounded-md">
                Project #04 · Clean Energy Bug
              </span>
              <span className="text-xs text-slate-500 font-patrick">Eco-Explorer ☀️</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-gloria text-[#2f3542] mb-1">
              The Solar Skitter-Bug
            </h3>
            <p className="font-patrick text-base text-slate-600 mb-4">
              An old worn toothbrush cut down to just the bristle head, attached to a vibrating phone buzzer and a tiny solar cell from an old pocket calculator. In the sun, it zooms!
            </p>

            {/* Bill of Materials */}
            <div className="bg-amber-50/70 p-3.5 rounded-2xl mb-5">
              <div className="font-kalam text-xs font-bold text-amber-900 mb-1.5 flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                Kid Inventor Recipe:
              </div>
              <ul className="text-xs font-patrick text-amber-950 space-y-1 list-disc list-inside">
                <li>1 old blue toothbrush head with angled bristles</li>
                <li>1 miniature vibrating coin motor</li>
                <li>1 mini solar panel (salvaged calculator)</li>
                <li>2 red paperclip antennae for aerodynamic steering</li>
              </ul>
            </div>

            {/* Interactive Simulation Display */}
            <div className={`p-4 rounded-2xl transition-all ${solarBugBuzzing ? 'bg-amber-100 shadow-xs' : 'bg-slate-100/80'}`}>
              <div className="flex items-center justify-between">
                <span className="font-kalam text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Zap className={`w-5 h-5 ${solarBugBuzzing ? 'text-amber-600 animate-spin' : 'text-slate-400'}`} />
                  Sunlight Level: {solarBugBuzzing ? '100% MAXIMUM BEAM! ☀️' : 'Shady Room'}
                </span>
                <span className="text-xs font-patrick text-slate-500">
                  {solarBugBuzzing ? 'SKITTERING!' : 'Dormant'}
                </span>
              </div>
              {solarBugBuzzing && (
                <div className="mt-2 text-xs font-kalam text-amber-900 bg-white/90 p-2 rounded-lg animate-bounce">
                  ⚡ *ZZZZZZZT!* "Look at it skitter across the table! Go Buggy Go!"
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 flex items-center justify-between">
            <button
              onClick={handleSolarSkitter}
              className="w-full py-2.5 sm:py-3 px-3 sm:px-4 font-kalam text-xs sm:text-base font-bold rounded-2xl crayon-btn-yellow leading-tight text-center"
            >
              {solarBugBuzzing ? 'Skittering in progress... 🐛' : '☀️ Shine Flashlight on Bug!'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
