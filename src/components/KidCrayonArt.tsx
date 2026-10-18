import React from 'react';

/**
 * Authentic 2D Kid-Drawn Crayon Art System
 * Inspired by genuine children's drawings:
 * - Wobbly, imperfect hand-drawn line strokes
 * - Heavy diagonal wax crayon hatching fills that deliberately spill outside borders
 * - Smiling sun with radiating rays, fluffy looped scribble clouds
 * - Stick-figure anatomy with joyful round heads, spiky hair, bead eyes, and splayed fingers
 * - Pure nostalgic kindergarten / elementary school art energy
 */

export const KidCrayonDefs: React.FC = () => {
  return (
    <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
      <defs>
        {/* Crayon Wax Texture Filter */}
        <filter id="crayon-wax-filter" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.4" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* Wobbly Pencil Stroke Filter */}
        <filter id="kid-pencil-rough" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="turbulence" baseFrequency="0.08" numOctaves="2" result="rough" />
          <feDisplacementMap in="SourceGraphic" in2="rough" scale="2.2" />
        </filter>

        {/* Crayon Hatch Patterns (Dense diagonal wax crayon scribbles) */}
        <pattern id="hatch-red" width="12" height="12" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="12" stroke="#ff4757" strokeWidth="4.5" strokeLinecap="round" opacity="0.85" />
          <line x1="6" y1="0" x2="6" y2="12" stroke="#ff6b81" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        </pattern>

        <pattern id="hatch-blue" width="12" height="12" patternTransform="rotate(-45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="12" stroke="#1e90ff" strokeWidth="4.5" strokeLinecap="round" opacity="0.85" />
          <line x1="6" y1="0" x2="6" y2="12" stroke="#70a1ff" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        </pattern>

        <pattern id="hatch-green" width="12" height="12" patternTransform="rotate(35 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="12" stroke="#2ed573" strokeWidth="4.5" strokeLinecap="round" opacity="0.85" />
          <line x1="6" y1="0" x2="6" y2="12" stroke="#7bed9f" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        </pattern>

        <pattern id="hatch-yellow" width="10" height="10" patternTransform="rotate(-30 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="10" stroke="#ffa502" strokeWidth="4.5" strokeLinecap="round" opacity="0.9" />
          <line x1="5" y1="0" x2="5" y2="10" stroke="#fed330" strokeWidth="3" strokeLinecap="round" opacity="0.75" />
        </pattern>

        <pattern id="hatch-purple" width="12" height="12" patternTransform="rotate(50 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="12" stroke="#9b59b6" strokeWidth="4.5" strokeLinecap="round" opacity="0.85" />
        </pattern>

        <pattern id="hatch-orange" width="12" height="12" patternTransform="rotate(-40 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="12" stroke="#ff7f50" strokeWidth="4.5" strokeLinecap="round" opacity="0.85" />
        </pattern>
      </defs>
    </svg>
  );
};

// Background Kid Environment (Smiling Sun, Loopy Clouds, Rainbow, Green Grass)
export const KidBackground: React.FC<{
  showRainbow?: boolean;
  showSun?: boolean;
  showGrass?: boolean;
  sunMood?: 'happy' | 'shocked' | 'excited';
}> = ({ showRainbow = true, showSun = true, showGrass = true, sunMood = 'happy' }) => {
  return (
    <g id="kid-environment" className="pointer-events-none select-none">
      {/* Background Rainbow in top-left */}
      {showRainbow && (
        <g id="crayon-rainbow" transform="translate(15, 10)">
          <path d="M 10 70 A 55 55 0 0 1 120 70" stroke="#ff4757" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.85" />
          <path d="M 16 70 A 49 49 0 0 1 114 70" stroke="#ffa502" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.85" />
          <path d="M 22 70 A 43 43 0 0 1 108 70" stroke="#fed330" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.85" />
          <path d="M 28 70 A 37 37 0 0 1 102 70" stroke="#2ed573" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.85" />
          <path d="M 34 70 A 31 31 0 0 1 96 70" stroke="#1e90ff" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.85" />
          <path d="M 40 70 A 25 25 0 0 1 90 70" stroke="#9b59b6" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.85" />
        </g>
      )}

      {/* Fluffy Loopy Crayon Cloud 1 */}
      <g id="crayon-cloud-left" transform="translate(130, 20)">
        {/* Blue wax scribble fill */}
        <path
          d="M 20 30 Q 15 15 35 15 Q 45 5 65 15 Q 85 8 95 25 Q 110 30 105 45 Q 95 60 75 55 Q 55 62 40 52 Q 20 60 15 45 Z"
          fill="url(#hatch-blue)"
          opacity="0.75"
        />
        {/* Wobbly Blue Outline */}
        <path
          d="M 20 30 Q 15 15 35 15 Q 45 5 65 15 Q 85 8 95 25 Q 110 30 105 45 Q 95 60 75 55 Q 55 62 40 52 Q 20 60 15 45 Z"
          stroke="#1e90ff"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Little smiling face on cloud */}
        <circle cx="50" cy="35" r="2.5" fill="#1e90ff" />
        <circle cx="70" cy="35" r="2.5" fill="#1e90ff" />
        <path d="M 55 42 Q 60 47 65 42" stroke="#1e90ff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </g>

      {/* Big Smiling Crayon Sun in top-right */}
      {showSun && (
        <g id="crayon-sun" transform="translate(390, 20)">
          {/* Yellow wax scribble spill */}
          <circle cx="45" cy="45" r="34" fill="url(#hatch-yellow)" opacity="0.9" />
          <circle cx="45" cy="45" r="30" stroke="#ffa502" strokeWidth="4.5" fill="#ffeaa7" fillOpacity="0.8" />
          
          {/* Radiating Crayon Sun Rays */}
          <g stroke="#ffa502" strokeWidth="4" strokeLinecap="round">
            <line x1="45" y1="5" x2="45" y2="-8" />
            <line x1="45" y1="85" x2="45" y2="98" />
            <line x1="5" y1="45" x2="-8" y2="45" />
            <line x1="85" y1="45" x2="98" y2="45" />
            <line x1="18" y1="18" x2="8" y2="8" />
            <line x1="72" y1="72" x2="82" y2="82" />
            <line x1="18" y1="72" x2="8" y2="82" />
            <line x1="72" y1="18" x2="82" y2="8" />
          </g>

          {/* Happy Face on Sun */}
          {sunMood === 'happy' && (
            <g>
              <circle cx="36" cy="40" r="3" fill="#d35400" />
              <circle cx="54" cy="40" r="3" fill="#d35400" />
              {/* Rosy cheeks */}
              <circle cx="30" cy="46" r="4" fill="#ff7675" opacity="0.6" />
              <circle cx="60" cy="46" r="4" fill="#ff7675" opacity="0.6" />
              {/* Big Smile */}
              <path d="M 35 50 Q 45 62 55 50" stroke="#d35400" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            </g>
          )}

          {sunMood === 'shocked' && (
            <g>
              <ellipse cx="36" cy="38" rx="4" ry="5" fill="#d35400" />
              <ellipse cx="54" cy="38" rx="4" ry="5" fill="#d35400" />
              {/* "O" mouth */}
              <circle cx="45" cy="52" r="6" fill="#d35400" />
            </g>
          )}
        </g>
      )}

      {/* Spiky Green Grass Blades at the bottom */}
      {showGrass && (
        <g id="crayon-grass" transform="translate(0, 285)">
          <path
            d="M 0 35 L 15 15 L 30 35 L 45 10 L 60 35 L 75 18 L 90 35 L 105 12 L 120 35 L 135 15 L 150 35 L 165 8 L 180 35 L 195 18 L 210 35 L 225 12 L 240 35 L 255 15 L 270 35 L 285 8 L 300 35 L 315 18 L 330 35 L 345 12 L 360 35 L 375 15 L 390 35 L 405 8 L 420 35 L 435 18 L 450 35 L 465 12 L 480 35 L 500 35 L 520 15 L 540 35 L 560 35"
            stroke="#2ed573"
            strokeWidth="4"
            fill="url(#hatch-green)"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </g>
      )}

      {/* Floating Crayon Hearts & Stars in Sky */}
      <g id="crayon-decorations" opacity="0.75">
        {/* Heart 1 */}
        <path
          d="M 280 40 C 270 25 250 30 250 45 C 250 60 280 75 280 75 C 280 75 310 60 310 45 C 310 30 290 25 280 40 Z"
          fill="#ff7675"
          stroke="#ff4757"
          strokeWidth="2.5"
          transform="scale(0.5) translate(280, 20)"
        />
        {/* Star 1 */}
        <polygon
          points="220,50 223,40 227,50 237,50 229,56 232,66 223,60 215,66 218,56 210,50"
          fill="#fed330"
          stroke="#ffa502"
          strokeWidth="2"
        />
      </g>
    </g>
  );
};

// Authentic Kid-Drawn Racecar (Wide, wobbly, crayon hatch fills)
export const KidCarArtwork: React.FC<{
  speedLines?: boolean;
  broken?: boolean;
  transform?: string;
  className?: string;
}> = ({ speedLines = true, broken = false, transform = '', className = '' }) => {
  return (
    <g id="kid-rc-car" transform={transform} className={className}>
      {/* Speed scribbles if moving fast */}
      {speedLines && !broken && (
        <g stroke="#ffa502" strokeWidth="5" strokeLinecap="round">
          <path d="M -40 20 Q -80 15 -110 30" />
          <path d="M -30 45 Q -70 40 -120 50" stroke="#ff4757" strokeWidth="6" />
          <path d="M -35 70 Q -65 65 -100 75" />
          {/* Comic SPEED text */}
          <text x="-135" y="15" fill="#ff4757" className="font-gloria text-xl font-bold rotate-[-10deg]">
            ZOOM!!
          </text>
        </g>
      )}

      {/* Red Wax Crayon Hatching Overspill (Colored outside the lines!) */}
      <path
        d="M 10 50 C -5 20 40 -15 130 -10 C 220 -8 260 30 250 65 C 240 85 20 85 10 50 Z"
        fill="url(#hatch-red)"
        opacity="0.9"
        transform="scale(1.08) translate(-10, -5)"
      />

      {/* Car Body - Hand-drawn wobbly red outline */}
      <path
        d="M 15 55 C 5 25 45 -5 135 0 C 225 2 265 35 255 70 C 245 88 25 88 15 55 Z"
        stroke="#2f3542"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#ff4757"
        fillOpacity="0.85"
      />

      {/* Thick Yellow Crayon Racing Stripe */}
      <path
        d="M 45 42 Q 135 32 225 40"
        stroke="#ffa502"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M 50 42 Q 135 32 220 40"
        stroke="#fed330"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Cockpit Window - Blue wax crayon with white scribble reflection */}
      <path
        d="M 75 15 C 90 -10 170 -12 195 15 C 200 32 80 32 75 15 Z"
        fill="url(#hatch-blue)"
      />
      <path
        d="M 75 15 C 90 -10 170 -12 195 15 C 200 32 80 32 75 15 Z"
        stroke="#2f3542"
        strokeWidth="4"
        fill="#70a1ff"
        fillOpacity="0.65"
      />
      {/* Glare line in window */}
      <path d="M 105 5 L 120 22 M 135 5 L 148 20" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />

      {/* Driver kid smiling inside cockpit! */}
      <circle cx="130" cy="12" r="10" fill="#ffeaa7" stroke="#2f3542" strokeWidth="2.5" />
      <circle cx="127" cy="10" r="1.5" fill="#2f3542" />
      <circle cx="133" cy="10" r="1.5" fill="#2f3542" />
      <path d="M 127 15 Q 130 18 133 15" stroke="#2f3542" strokeWidth="1.5" fill="none" />

      {/* Silver Radio Antenna with Red Ball Tip & Radio Wave rings */}
      <path d="M 175 0 L 210 -55" stroke="#718096" strokeWidth="5" strokeLinecap="round" />
      <circle cx="212" cy="-57" r="8" fill="#ff4757" stroke="#2f3542" strokeWidth="3" />
      {/* Radio Waves */}
      <path d="M 222 -70 Q 235 -55 222 -40" stroke="#1e90ff" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M 230 -80 Q 250 -55 230 -30" stroke="#ffa502" strokeWidth="3.5" strokeLinecap="round" fill="none" />

      {/* Headlight with Yellow Wax Glare Beams */}
      <circle cx="248" cy="48" r="12" fill="#fed330" stroke="#2f3542" strokeWidth="3.5" />
      {/* Yellow Glare Beams */}
      <path d="M 262 38 L 295 25 M 266 48 L 310 48 M 262 58 L 295 72" stroke="#ffa502" strokeWidth="5" strokeLinecap="round" />

      {/* Big Chunky Wheels (Wobbly, imperfect kid circles with spokes) */}
      {/* Back Wheel */}
      <g transform="translate(50, 75)">
        <ellipse cx="0" cy="0" rx="30" ry="28" fill="#2f3542" stroke="#2f3542" strokeWidth="4" />
        <circle cx="0" cy="0" rx="14" ry="14" fill="#fed330" stroke="#2f3542" strokeWidth="3" />
        <line x1="-8" y1="-8" x2="8" y2="8" stroke="#2f3542" strokeWidth="3" strokeLinecap="round" />
        <line x1="8" y1="-8" x2="-8" y2="8" stroke="#2f3542" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Front Wheel */}
      <g transform="translate(195, 75)">
        <ellipse cx="0" cy="0" rx="30" ry="28" fill="#2f3542" stroke="#2f3542" strokeWidth="4" />
        <circle cx="0" cy="0" rx="14" ry="14" fill="#fed330" stroke="#2f3542" strokeWidth="3" />
        <line x1="-8" y1="-8" x2="8" y2="8" stroke="#2f3542" strokeWidth="3" strokeLinecap="round" />
        <line x1="8" y1="-8" x2="-8" y2="8" stroke="#2f3542" strokeWidth="3" strokeLinecap="round" />
      </g>
    </g>
  );
};

// Authentic Kid-Drawn Prajwal (Round head, wild spiky hair, bead eyes, striped shirt, loop shoes)
export const KidPrajwalFigure: React.FC<{
  pose?: 'standing' | 'kneeling' | 'wonder-eyes' | 'lifted-hug' | 'sitting-rug' | 'typing';
  className?: string;
  transform?: string;
  onClick?: () => void;
}> = ({ pose = 'standing', className = '', transform = '', onClick }) => {
  return (
    <g id="kid-prajwal" transform={transform} className={`cursor-pointer ${className}`} onClick={onClick}>
      {/* Pose: Standing Frozen in Awe */}
      {pose === 'standing' && (
        <g transform="translate(40, 30)">
          {/* Head */}
          <circle cx="60" cy="50" r="35" fill="#ffeaa7" stroke="#2f3542" strokeWidth="4.5" />
          
          {/* Messy Wild Spiky Black Crayon Hair */}
          <path
            d="M 25 45 C 20 15 50 5 95 15 C 105 35 95 55 95 55 Z"
            fill="#2f3542"
            stroke="#2f3542"
            strokeWidth="3.5"
          />
          {/* Spikes sticking up */}
          <path d="M 45 15 L 40 -5 L 55 12" stroke="#2f3542" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 68 10 L 72 -10 L 80 12" stroke="#2f3542" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 85 20 L 98 0 L 92 25" stroke="#2f3542" strokeWidth="4.5" strokeLinecap="round" />

          {/* Huge Wide-Open Awe Eyes (Black beads with white reflection) */}
          <ellipse cx="48" cy="45" rx="9" ry="11" fill="#ffffff" stroke="#2f3542" strokeWidth="3" />
          <circle cx="50" cy="45" r="5" fill="#2f3542" />
          <circle cx="52" cy="43" r="2" fill="#ffffff" />

          <ellipse cx="72" cy="45" rx="9" ry="11" fill="#ffffff" stroke="#2f3542" strokeWidth="3" />
          <circle cx="70" cy="45" r="5" fill="#2f3542" />
          <circle cx="72" cy="43" r="2" fill="#ffffff" />

          {/* Rosy Crayon Cheeks */}
          <ellipse cx="38" cy="58" rx="8" ry="5" fill="#ff7675" opacity="0.7" />
          <ellipse cx="82" cy="58" rx="8" ry="5" fill="#ff7675" opacity="0.7" />

          {/* Wide Open "O" Mouth in Wonder */}
          <ellipse cx="60" cy="65" rx="8" ry="10" fill="#ff4757" stroke="#2f3542" strokeWidth="3" />
          <path d="M 55 70 Q 60 67 65 70" fill="#ffffff" />

          {/* Body: Blue-and-White Striped Crayon T-Shirt */}
          <g transform="translate(30, 85)">
            <rect x="0" y="0" width="60" height="70" rx="8" fill="#1e90ff" stroke="#2f3542" strokeWidth="4" />
            {/* White crayon stripes */}
            <path d="M 0 20 H 60 M 0 42 H 60" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
            {/* Red dinosaur band-aid on shirt pocket */}
            <rect x="40" y="25" width="14" height="8" rx="2" fill="#ff7675" stroke="#2f3542" strokeWidth="1.5" transform="rotate(15 45 28)" />
          </g>

          {/* Stick Arms hanging frozen at sides with 4 splayed fingers */}
          <path d="M 30 100 L 8 135" stroke="#2f3542" strokeWidth="5" strokeLinecap="round" />
          {/* Fingers */}
          <path d="M 8 135 L -2 140 M 8 135 L 2 146 M 8 135 L 8 148 M 8 135 L 14 144" stroke="#2f3542" strokeWidth="3" strokeLinecap="round" />

          <path d="M 90 100 L 112 135" stroke="#2f3542" strokeWidth="5" strokeLinecap="round" />
          <path d="M 112 135 L 122 140 M 112 135 L 118 146 M 112 135 L 112 148 M 112 135 L 106 144" stroke="#2f3542" strokeWidth="3" strokeLinecap="round" />

          {/* Red/Blue Shorts */}
          <rect x="36" y="155" width="48" height="30" rx="4" fill="#ff4757" stroke="#2f3542" strokeWidth="4" />

          {/* Stick Legs with Yellow Loop Shoes */}
          <line x1="48" y1="185" x2="48" y2="235" stroke="#2f3542" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="44" cy="238" rx="16" ry="9" fill="#ffa502" stroke="#2f3542" strokeWidth="3.5" />

          <line x1="72" y1="185" x2="72" y2="235" stroke="#2f3542" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="76" cy="238" rx="16" ry="9" fill="#ffa502" stroke="#2f3542" strokeWidth="3.5" />
        </g>
      )}

      {/* Pose: Eyes Glowing with Wonder */}
      {pose === 'wonder-eyes' && (
        <g transform="translate(30, 20)">
          {/* Head */}
          <circle cx="80" cy="70" r="50" fill="#ffeaa7" stroke="#2f3542" strokeWidth="5" />
          <path d="M 35 60 C 35 20 75 15 125 25 C 135 50 130 80 130 80 Z" fill="#2f3542" />
          
          {/* Hair spikes */}
          <path d="M 55 20 L 50 -5 L 68 15" stroke="#2f3542" strokeWidth="5" strokeLinecap="round" />
          <path d="M 85 15 L 90 -8 L 102 18" stroke="#2f3542" strokeWidth="5" strokeLinecap="round" />

          {/* GLOWING CYAN LED EYES! */}
          <circle cx="62" cy="65" r="16" fill="#00ffcc" className="animate-pulse" />
          <circle cx="98" cy="65" r="16" fill="#00ffcc" className="animate-pulse" />
          <circle cx="62" cy="65" r="7" fill="#ffffff" />
          <circle cx="98" cy="65" r="7" fill="#ffffff" />

          {/* Electric Wonder Beams Shooting Out */}
          <g stroke="#00ffcc" strokeWidth="4" strokeLinecap="round">
            <line x1="38" y1="65" x2="5" y2="65" />
            <line x1="42" y1="50" x2="15" y2="35" />
            <line x1="42" y1="80" x2="15" y2="95" />
            <line x1="122" y1="65" x2="155" y2="65" />
            <line x1="118" y1="50" x2="145" y2="35" />
            <line x1="118" y1="80" x2="145" y2="95" />
          </g>

          {/* Enormous Grin */}
          <path d="M 60 92 Q 80 115 100 92 Z" fill="#ff4757" stroke="#2f3542" strokeWidth="4" />
          
          {/* Striped Shirt Body */}
          <g transform="translate(45, 120)">
            <rect x="0" y="0" width="70" height="75" rx="8" fill="#1e90ff" stroke="#2f3542" strokeWidth="4.5" />
            <path d="M 0 25 H 70 M 0 50 H 70" stroke="#ffffff" strokeWidth="9" strokeLinecap="round" />
          </g>
        </g>
      )}
    </g>
  );
};

// Authentic Kid-Drawn Dad (Tall, curly hair, round wire glasses, green sweater, giant bear-hug arms)
export const KidDadFigure: React.FC<{
  pose?: 'standing' | 'hugging' | 'sitting' | 'pointing';
  className?: string;
  transform?: string;
  onClick?: () => void;
}> = ({ pose = 'hugging', className = '', transform = '', onClick }) => {
  return (
    <g id="kid-dad" transform={transform} className={`cursor-pointer ${className}`} onClick={onClick}>
      {/* Dad Joyful Lift and Hug */}
      {pose === 'hugging' && (
        <g transform="translate(140, 20)">
          {/* Dad Head */}
          <circle cx="100" cy="70" r="42" fill="#ffeaa7" stroke="#2f3542" strokeWidth="4.5" />
          
          {/* Curly Brown Crayon Hair */}
          <path
            d="M 60 60 C 55 25 90 20 145 25 C 152 45 145 70 145 70 Z"
            fill="#576574"
            stroke="#2f3542"
            strokeWidth="3.5"
          />
          {/* Curls */}
          <path d="M 75 25 Q 85 10 95 25 Q 105 10 115 25 Q 125 10 135 25" stroke="#576574" strokeWidth="5" fill="none" />

          {/* Round Wire Glasses */}
          <circle cx="85" cy="65" r="14" stroke="#2f3542" strokeWidth="3.5" fill="#ffffff" fillOpacity="0.4" />
          <circle cx="115" cy="65" r="14" stroke="#2f3542" strokeWidth="3.5" fill="#ffffff" fillOpacity="0.4" />
          <line x1="99" y1="65" x2="101" y2="65" stroke="#2f3542" strokeWidth="3.5" />
          {/* Smiling eyes behind glasses */}
          <path d="M 78 65 Q 85 58 92 65" stroke="#2f3542" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 108 65 Q 115 58 122 65" stroke="#2f3542" strokeWidth="3" strokeLinecap="round" fill="none" />

          {/* Giant Laughing Open Smile */}
          <path d="M 80 85 Q 100 112 120 85 Z" fill="#ff4757" stroke="#2f3542" strokeWidth="3.5" />

          {/* Green Knit Sweater Body with Crayon Hatching */}
          <rect x="65" y="112" width="70" height="130" rx="10" fill="url(#hatch-green)" />
          <rect x="65" y="112" width="70" height="130" rx="10" stroke="#2f3542" strokeWidth="4.5" fill="#10ac84" fillOpacity="0.75" />

          {/* Giant Hugging Arms Lifting Prajwal High Into The Air! */}
          <path d="M 65 130 C 20 90 0 50 25 15" stroke="#2f3542" strokeWidth="14" strokeLinecap="round" fill="none" />
          <path d="M 135 130 C 180 90 200 50 175 15" stroke="#2f3542" strokeWidth="14" strokeLinecap="round" fill="none" />

          {/* Speech Bubble (Cleanly enclosed, no text overflow) */}
          <g transform="translate(-130, -10)">
            <rect
              x="0"
              y="0"
              width="215"
              height="66"
              rx="16"
              fill="#ffffff"
              stroke="#2f3542"
              strokeWidth="3.5"
              className="crayon-box-shadow"
            />
            <polygon points="135,66 145,82 125,66" fill="#ffffff" stroke="#2f3542" strokeWidth="3" />
            <line x1="124" y1="65" x2="136" y2="65" stroke="#ffffff" strokeWidth="4" />
            <text x="18" y="26" fill="#2f3542" className="font-kalam text-xs font-bold">
              "You really are a
            </text>
            <text x="18" y="48" fill="#ff4757" className="font-gloria text-xs font-bold">
              trouble-maker, aren't you?!"
            </text>
          </g>
        </g>
      )}
    </g>
  );
};
