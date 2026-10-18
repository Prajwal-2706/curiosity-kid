import React from 'react';

/**
 * Handcrafted 2D Kid-Style Crayon Drawings
 * Featuring intentional over-the-line coloring, sketchy paths,
 * imperfect strokes, and authentic whimsical kid drawing energy.
 */

// Scene 1: Prajwal's Red RC Car (Before Crash)
export const CrayonRCCar: React.FC<{
  speedLines?: boolean;
  broken?: boolean;
  className?: string;
}> = ({ speedLines = true, broken = false, className = '' }) => {
  return (
    <svg
      viewBox="-80 0 420 200"
      className={`w-full max-w-[340px] overflow-visible ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Speed scribbles if moving fast */}
      {speedLines && !broken && (
        <g stroke="#ffa502" strokeWidth="4" strokeLinecap="round" opacity="0.8">
          <path d="M 10 70 Q -20 65 -45 75" />
          <path d="M 25 110 Q -15 105 -50 115" stroke="#ff4757" strokeWidth="5" />
          <path d="M 35 150 Q 0 145 -35 155" />
          <text x="-70" y="50" fill="#ff4757" className="font-kalam text-lg font-bold" transform="rotate(-12 -70 50)">
            ZOOM!!
          </text>
        </g>
      )}

      {/* Crayon Color Overspill (Colored OUTSIDE the lines) */}
      <path
        d="M 55 125 C 40 100 80 50 160 48 C 240 45 285 85 275 125 C 265 140 70 145 55 125 Z"
        fill="#ff4757"
        opacity="0.38"
        transform="rotate(2 165 95) scale(1.08)"
      />
      <path
        d="M 120 60 C 130 40 210 38 230 65 C 240 85 105 85 120 60 Z"
        fill="#1e90ff"
        opacity="0.35"
        transform="translate(-6, -4)"
      />

      {/* Silver Antenna with Little Radio Waves */}
      <path
        d="M 195 52 L 235 -5"
        stroke="#718096"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="236" cy="-7" r="7" fill="#e2e8f0" stroke="#4a5568" strokeWidth="3" />
      {/* Radio beeps */}
      <path d="M 245 -18 Q 255 -7 245 4" stroke="#1e90ff" strokeWidth="3" strokeLinecap="round" />
      <path d="M 253 -26 Q 268 -7 253 12" stroke="#ffa502" strokeWidth="3" strokeLinecap="round" />

      {/* Main Car Body - Imperfect Kid Outline */}
      <path
        d="M 60 120 C 45 95 85 55 160 52 C 235 50 280 90 270 120 C 260 135 75 135 60 120 Z"
        stroke="#2f3542"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#ff4757"
        fillOpacity="0.85"
      />

      {/* Racing Stripe scribbled with yellow crayon */}
      <path
        d="M 100 95 Q 170 88 240 92"
        stroke="#ffa502"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* Car Cabin / Cockpit Window */}
      <path
        d="M 115 65 C 128 42 195 40 220 65 C 225 80 110 82 115 65 Z"
        stroke="#2f3542"
        strokeWidth="4"
        fill="#70a1ff"
        fillOpacity="0.8"
      />
      {/* Glare line in window */}
      <path d="M 140 52 L 155 68" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
      <path d="M 165 52 L 175 66" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />

      {/* Headlight with yellow glare */}
      <circle cx="264" cy="105" r="10" fill="#fed330" stroke="#2f3542" strokeWidth="3.5" />
      <path d="M 276 98 L 295 90" stroke="#ffa502" strokeWidth="3" strokeLinecap="round" />
      <path d="M 280 106 L 305 106" stroke="#ffa502" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M 276 114 L 295 122" stroke="#ffa502" strokeWidth="3" strokeLinecap="round" />

      {/* Big Chunky Wheels (Improper, non-circular kid wheels!) */}
      {/* Left Back Wheel */}
      <ellipse
        cx="92"
        cy="132"
        rx="26"
        ry="25"
        fill="#2f3542"
        stroke="#2f3542"
        strokeWidth="3"
        transform="rotate(-5 92 132)"
      />
      <circle cx="92" cy="132" r="12" fill="#dcdde1" stroke="#2f3542" strokeWidth="3" />
      {/* Wheel spokes scribbled */}
      <path d="M 85 125 L 99 139 M 99 125 L 85 139" stroke="#747d8c" strokeWidth="2.5" />

      {/* Right Front Wheel */}
      <ellipse
        cx="235"
        cy="134"
        rx="27"
        ry="26"
        fill="#2f3542"
        stroke="#2f3542"
        strokeWidth="3"
        transform="rotate(6 235 134)"
      />
      <circle cx="235" cy="134" r="12" fill="#dcdde1" stroke="#2f3542" strokeWidth="3" />
      <path d="M 228 127 L 242 141 M 242 127 L 228 141" stroke="#747d8c" strokeWidth="2.5" />

      {/* Smudge shadow under car */}
      <ellipse cx="165" cy="158" rx="100" ry="8" fill="#a4b0be" opacity="0.45" />

      {/* Crayon scribbles on bottom */}
      <path d="M 70 128 L 240 130" stroke="#eb4d4b" strokeWidth="3" strokeDasharray="6,4" />
    </svg>
  );
};

// Scene 2: The Crash! Split open with shattered pieces and sound FX
export const CrayonCrashScene: React.FC<{
  onInspectMotherboard?: () => void;
  className?: string;
}> = ({ onInspectMotherboard, className = '' }) => {
  return (
    <svg
      viewBox="0 0 520 320"
      className={`w-full max-w-[540px] overflow-visible ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Floor Crash Impact Stars & Dust Scribbles */}
      <g stroke="#ffa502" strokeWidth="3" fill="#ffeaa7">
        <polygon points="120,60 135,30 145,55 175,50 155,75 180,95 150,95 140,125 125,100 95,110 110,85 85,65" />
      </g>

      <g stroke="#ff4757" strokeWidth="3.5" fill="#ff7675" opacity="0.9">
        <polygon points="340,50 360,25 365,48 395,45 375,70 405,85 375,90 370,120 350,95 320,105 335,80 305,65" />
      </g>

      {/* CRASH! and KABOOM! Handwritten Text */}
      <text
        x="200"
        y="50"
        fill="#ff4757"
        className="font-gloria text-4xl font-extrabold tracking-wider"
        transform="rotate(-6 220 50)"
      >
        CRASH!!
      </text>

      <text
        x="220"
        y="85"
        fill="#ffa502"
        className="font-kalam text-xl font-bold"
        transform="rotate(4 220 85)"
      >
        *CRUNCH! CLATTER!*
      </text>

      {/* Left Broken Chassis Half (Red Plastic cracked) */}
      <g transform="translate(10, 80) rotate(-18 100 120)">
        <path
          d="M 30 110 C 20 80 50 40 110 40 L 130 90 L 105 95 L 120 115 L 90 120 L 70 115 Z"
          stroke="#2f3542"
          strokeWidth="4"
          fill="#ff4757"
        />
        {/* Jagged crack line */}
        <path d="M 110 40 L 100 70 L 120 85 L 90 120" stroke="#ffffff" strokeWidth="3" />
        {/* Detached wheel rolled aside */}
        <ellipse cx="25" cy="135" rx="22" ry="20" fill="#2f3542" stroke="#2f3542" strokeWidth="3" />
        <circle cx="25" cy="135" r="9" fill="#ced6e0" />
      </g>

      {/* Right Broken Chassis Half */}
      <g transform="translate(240, 70) rotate(22 180 120)">
        <path
          d="M 20 45 C 70 40 120 70 115 110 L 80 115 L 70 95 L 45 105 L 35 85 L 20 45 Z"
          stroke="#2f3542"
          strokeWidth="4"
          fill="#ff4757"
        />
        {/* Front Wheel */}
        <ellipse cx="110" cy="130" rx="24" ry="22" fill="#2f3542" stroke="#2f3542" strokeWidth="3" />
        <circle cx="110" cy="130" r="10" fill="#ced6e0" />
      </g>

      {/* THE SECRET WORLD SPILLING OUT! (Interactive Green Motherboard) */}
      <g
        className="cursor-pointer transition-transform hover:scale-105"
        onClick={onInspectMotherboard}
      >
        {/* Green Crayon Overspill for PCB */}
        <rect
          x="145"
          y="135"
          width="190"
          height="115"
          rx="12"
          fill="#2ed573"
          opacity="0.3"
          transform="rotate(-3 240 190) scale(1.08)"
        />

        {/* The Motherboard Base */}
        <rect
          x="155"
          y="145"
          width="170"
          height="95"
          rx="10"
          fill="#2ed573"
          stroke="#1e272e"
          strokeWidth="4.5"
          transform="rotate(-2 240 190)"
        />

        {/* Winding Copper Circuit Tracks (Crayon Gold/Orange) */}
        <g stroke="#ffa502" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 175 165 H 205 V 185 H 225" />
          <path d="M 180 215 H 215 V 195 H 230" />
          <path d="M 255 170 H 280 V 160 H 305" />
          <path d="M 260 210 H 285 V 225 H 310" />
          <circle cx="205" cy="165" r="3.5" fill="#ffa502" />
          <circle cx="225" cy="185" r="3.5" fill="#ffa502" />
          <circle cx="280" cy="160" r="3.5" fill="#ffa502" />
          <circle cx="285" cy="225" r="3.5" fill="#ffa502" />
        </g>

        {/* The Central Microchip (Black Square with silver pins) */}
        <rect
          x="220"
          y="170"
          width="42"
          height="42"
          rx="4"
          fill="#2f3542"
          stroke="#1e272e"
          strokeWidth="3"
        />
        <text x="228" y="196" fill="#00ffcc" className="font-kalam text-xs font-bold">
          CHIP
        </text>
        {/* Silver pins on chip */}
        <g stroke="#ced6e0" strokeWidth="2.5">
          <line x1="228" y1="165" x2="228" y2="170" />
          <line x1="236" y1="165" x2="236" y2="170" />
          <line x1="244" y1="165" x2="244" y2="170" />
          <line x1="252" y1="165" x2="252" y2="170" />

          <line x1="228" y1="212" x2="228" y2="217" />
          <line x1="236" y1="212" x2="236" y2="217" />
          <line x1="244" y1="212" x2="244" y2="217" />
          <line x1="252" y1="212" x2="252" y2="217" />
        </g>

        {/* Tiny Capacitors & Resistors (Colorful Kid Cylinders) */}
        {/* Blue Capacitor */}
        <rect x="175" y="180" width="14" height="20" rx="3" fill="#1e90ff" stroke="#2f3542" strokeWidth="2" />
        {/* Yellow Resistor with tiny striped bands */}
        <rect x="290" y="175" width="22" height="10" rx="3" fill="#fed330" stroke="#2f3542" strokeWidth="2" />
        <line x1="296" y1="175" x2="296" y2="185" stroke="#ff4757" strokeWidth="2" />
        <line x1="302" y1="175" x2="302" y2="185" stroke="#2ed573" strokeWidth="2" />

        {/* Gleaming Silver Antenna Spilling Out */}
        <path
          d="M 315 160 L 415 130"
          stroke="#747d8c"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <circle cx="418" cy="129" r="6" fill="#f1f2f6" stroke="#2f3542" strokeWidth="2.5" />
        {/* Antenna Sparkles */}
        <path d="M 425 120 L 435 110 M 435 135 L 445 140" stroke="#ffa502" strokeWidth="2.5" />

        {/* Hand-drawn Arrow & Note */}
        <path
          d="M 120 260 C 140 270 170 265 190 245"
          stroke="#1e90ff"
          strokeWidth="3"
          strokeLinecap="round"
          markerEnd="url(#arrow)"
        />
        <text x="50" y="285" fill="#1e90ff" className="font-kalam text-lg font-bold">
          "A hidden world inside!!" ⚡
        </text>
      </g>

      {/* Scattered Loose Screws & Gears */}
      <circle cx="120" cy="225" r="5" fill="#a4b0be" stroke="#2f3542" strokeWidth="2" />
      <path d="M 118 223 L 122 227" stroke="#2f3542" strokeWidth="2" />

      <circle cx="370" cy="235" r="7" fill="#a4b0be" stroke="#2f3542" strokeWidth="2" />
      <circle cx="400" cy="220" r="4" fill="#a4b0be" stroke="#2f3542" strokeWidth="1.5" />
    </svg>
  );
};

// Scene 3: 8-Year-Old Prajwal Frozen in Awe
export const CrayonPrajwalInAwe: React.FC<{
  ledGlow?: boolean;
  className?: string;
}> = ({ ledGlow = true, className = '' }) => {
  return (
    <svg
      viewBox="0 0 280 340"
      className={`w-full max-w-[280px] overflow-visible ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Crayon Color Overspill for T-Shirt & Face */}
      <ellipse cx="140" cy="115" rx="55" ry="50" fill="#fed330" opacity="0.35" />
      <rect x="90" y="170" width="105" height="100" rx="10" fill="#1e90ff" opacity="0.3" />

      {/* Messy Kid Hair (Crayon Black & Brown Scribbles) */}
      <path
        d="M 85 110 C 75 70 110 40 140 40 C 175 40 205 65 200 105 C 190 60 160 50 140 55 C 120 60 95 80 85 110 Z"
        fill="#2f3542"
        stroke="#2f3542"
        strokeWidth="3.5"
      />
      {/* Spiky hair strands sticking up */}
      <path d="M 125 45 L 120 25 L 135 42" stroke="#2f3542" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M 148 42 L 155 18 L 160 40" stroke="#2f3542" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M 100 65 L 85 50 L 98 72" stroke="#2f3542" strokeWidth="3.5" strokeLinecap="round" />

      {/* Head Outline (Wobbly round circle) */}
      <path
        d="M 90 115 C 88 150 115 168 142 168 C 170 168 194 150 192 115 C 190 85 170 70 142 70 C 112 70 92 85 90 115 Z"
        stroke="#2f3542"
        strokeWidth="4"
        fill="#ffeaa7"
      />

      {/* Rosy Crayon Cheeks */}
      <ellipse cx="106" cy="138" rx="10" ry="6" fill="#ff7675" opacity="0.6" />
      <ellipse cx="178" cy="138" rx="10" ry="6" fill="#ff7675" opacity="0.6" />

      {/* Huge Wide-Open Eyes of Awe! */}
      {/* Left Eye */}
      <ellipse cx="118" cy="118" rx="15" ry="17" fill="#ffffff" stroke="#2f3542" strokeWidth="3" />
      <circle
        cx="120"
        cy="118"
        r="8"
        fill={ledGlow ? '#00d2d3' : '#2f3542'}
        className={ledGlow ? 'animate-led-glow' : ''}
      />
      {/* Light Reflection in eyes */}
      <circle cx="123" cy="115" r="3" fill="#ffffff" />

      {/* Right Eye */}
      <ellipse cx="166" cy="118" rx="15" ry="17" fill="#ffffff" stroke="#2f3542" strokeWidth="3" />
      <circle
        cx="164"
        cy="118"
        r="8"
        fill={ledGlow ? '#00d2d3' : '#2f3542'}
        className={ledGlow ? 'animate-led-glow' : ''}
      />
      <circle cx="167" cy="115" r="3" fill="#ffffff" />

      {/* LED Eye Glow Rays */}
      {ledGlow && (
        <g stroke="#00d2d3" strokeWidth="2.5" strokeLinecap="round" opacity="0.8">
          <line x1="95" y1="110" x2="80" y2="105" />
          <line x1="100" y1="128" x2="85" y2="135" />
          <line x1="185" y1="110" x2="200" y2="105" />
          <line x1="180" y1="128" x2="195" y2="135" />
        </g>
      )}

      {/* Dropped Jaw / Open Mouth in Wonder ("O" shape, not crying!) */}
      <ellipse cx="142" cy="150" rx="9" ry="11" fill="#ff4757" stroke="#2f3542" strokeWidth="3" />
      <path d="M 137 156 Q 142 153 147 156" fill="#ffffff" />

      {/* Kid Body: Striped T-Shirt */}
      <path
        d="M 98 170 C 85 185 80 230 82 250 L 202 250 C 204 230 198 185 186 170 Z"
        fill="#1e90ff"
        stroke="#2f3542"
        strokeWidth="4"
      />
      {/* White Stripes scribbled on shirt */}
      <path d="M 85 195 Q 142 205 198 195" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
      <path d="M 83 225 Q 142 235 201 225" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />

      {/* Hands frozen in front in awe */}
      {/* Left Hand with small band-aid on thumb */}
      <path
        d="M 82 200 C 65 210 55 235 70 245 C 80 245 88 230 85 215 Z"
        fill="#ffeaa7"
        stroke="#2f3542"
        strokeWidth="3.5"
      />
      {/* Band-aid */}
      <rect x="62" y="222" width="12" height="7" rx="2" fill="#ff7675" stroke="#2f3542" strokeWidth="1.5" transform="rotate(25 68 225)" />

      {/* Right Hand */}
      <path
        d="M 202 200 C 219 210 229 235 214 245 C 204 245 196 230 199 215 Z"
        fill="#ffeaa7"
        stroke="#2f3542"
        strokeWidth="3.5"
      />

      {/* Blue Jeans */}
      <path
        d="M 95 250 L 90 310 L 132 310 L 140 270 L 148 310 L 190 310 L 185 250 Z"
        fill="#3742fa"
        stroke="#2f3542"
        strokeWidth="4"
      />
      {/* Yellow Sneakers */}
      <ellipse cx="110" cy="318" rx="22" ry="10" fill="#ffa502" stroke="#2f3542" strokeWidth="3.5" />
      <ellipse cx="170" cy="318" rx="22" ry="10" fill="#ffa502" stroke="#2f3542" strokeWidth="3.5" />

      {/* Caption Thought */}
      <text x="60" y="20" fill="#2ed573" className="font-kalam text-lg font-bold">
        *Eyes glow like LEDs!* 💡
      </text>
    </svg>
  );
};

// Scene 4: Dad Swoops In & Playful Hug!
export const CrayonDadAndPrajwal: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 460 380"
      className={`w-full max-w-[460px] overflow-visible ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Dad Swoop Motion Lines */}
      <path d="M 40 40 Q 120 20 220 70" stroke="#ffa502" strokeWidth="4" strokeLinecap="round" strokeDasharray="8,6" />
      <path d="M 60 70 Q 150 45 240 95" stroke="#1e90ff" strokeWidth="4" strokeLinecap="round" strokeDasharray="8,6" />

      {/* Dad's Laugh Speech Bubble (Sized so text never overflows) */}
      <g transform="translate(10, 20)">
        <rect
          x="0"
          y="0"
          width="215"
          height="65"
          rx="16"
          fill="#ffffff"
          stroke="#2f3542"
          strokeWidth="3.5"
          className="crayon-box-shadow"
        />
        <polygon points="135,65 145,82 125,65" fill="#ffffff" stroke="#2f3542" strokeWidth="3" />
        <line x1="124" y1="64" x2="136" y2="64" stroke="#ffffff" strokeWidth="4" />
        <text x="18" y="26" fill="#2f3542" className="font-kalam text-xs font-bold">
          "You really are a
        </text>
        <text x="18" y="48" fill="#ff4757" className="font-gloria text-xs font-bold">
          trouble-maker, aren't you?!"
        </text>
      </g>

      {/* DAD (Tall, big joyful smile, glasses, carrying Prajwal high in the air) */}
      <g id="dad-body">
        {/* Dad Head */}
        <circle cx="280" cy="115" r="38" fill="#ffeaa7" stroke="#2f3542" strokeWidth="4" />
        {/* Dad Hair */}
        <path
          d="M 245 105 C 245 75 270 70 315 72 C 322 85 315 105 315 105 Z"
          fill="#576574"
          stroke="#2f3542"
          strokeWidth="3.5"
        />
        {/* Dad Glasses */}
        <rect x="255" y="105" width="22" height="16" rx="4" fill="#ffffff" fillOpacity="0.4" stroke="#2f3542" strokeWidth="3" />
        <rect x="285" y="105" width="22" height="16" rx="4" fill="#ffffff" fillOpacity="0.4" stroke="#2f3542" strokeWidth="3" />
        <line x1="277" y1="113" x2="285" y2="113" stroke="#2f3542" strokeWidth="3" />

        {/* Dad Joyful Laughing Mouth */}
        <path
          d="M 265 130 Q 282 148 298 130 Z"
          fill="#ff4757"
          stroke="#2f3542"
          strokeWidth="3"
        />

        {/* Dad Green Sweater */}
        <path
          d="M 235 155 C 220 200 215 310 220 340 L 340 340 C 345 310 340 200 325 155 Z"
          fill="#10ac84"
          stroke="#2f3542"
          strokeWidth="4"
        />

        {/* Dad Arms Lifting Prajwal Up High */}
        <path
          d="M 235 175 C 190 145 170 120 185 80"
          stroke="#2f3542"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M 325 175 C 365 145 385 120 370 80"
          stroke="#2f3542"
          strokeWidth="14"
          strokeLinecap="round"
        />
      </g>

      {/* PRAJWAL LIFTED IN THE AIR (Laughing, kicking legs, pointing down at the pieces) */}
      <g id="prajwal-lifted" transform="translate(190, 20) rotate(-6 90 90)">
        {/* Prajwal Head */}
        <circle cx="90" cy="65" r="30" fill="#ffeaa7" stroke="#2f3542" strokeWidth="3.5" />
        {/* Messy Hair */}
        <path d="M 65 55 C 65 30 90 25 115 30 C 120 45 115 65 115 65 Z" fill="#2f3542" />
        {/* Big Laughing Eyes */}
        <path d="M 75 60 Q 82 52 90 60" stroke="#2f3542" strokeWidth="3" strokeLinecap="round" />
        <path d="M 98 60 Q 105 52 112 60" stroke="#2f3542" strokeWidth="3" strokeLinecap="round" />
        {/* Big Smile */}
        <path d="M 80 72 Q 94 88 108 72 Z" fill="#ff4757" stroke="#2f3542" strokeWidth="2.5" />

        {/* Striped Blue Shirt */}
        <rect x="68" y="95" width="46" height="48" rx="6" fill="#1e90ff" stroke="#2f3542" strokeWidth="3.5" />

        {/* Arm Pointing Excitedly Downwards at the floor! */}
        <path
          d="M 114 105 L 145 125 L 155 145"
          stroke="#ffeaa7"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Pointing index finger */}
        <path d="M 155 145 L 165 160" stroke="#2f3542" strokeWidth="3" strokeLinecap="round" />

        {/* Kicking Legs */}
        <path d="M 75 142 L 55 175" stroke="#3742fa" strokeWidth="10" strokeLinecap="round" />
        <ellipse cx="50" cy="180" rx="10" ry="6" fill="#ffa502" stroke="#2f3542" strokeWidth="2" />

        <path d="M 105 142 L 125 170" stroke="#3742fa" strokeWidth="10" strokeLinecap="round" />
        <ellipse cx="132" cy="172" rx="10" ry="6" fill="#ffa502" stroke="#2f3542" strokeWidth="2" />

        {/* Prajwal's dialogue bubble pointing down */}
        <text x="150" y="195" fill="#ffa502" className="font-kalam text-sm font-bold">
          "HOW DOES IT WORK, DAD?!"
        </text>
      </g>
    </svg>
  );
};

// Scene 5: Living Room Floor Tech Academy (Dad explains coding & electronics)
export const CrayonFloorAcademy: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 500 320"
      className={`w-full max-w-[500px] overflow-visible ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Living Room Rug (Hand-drawn squiggly oval) */}
      <ellipse cx="250" cy="240" rx="220" ry="65" fill="#ffeaa7" opacity="0.6" stroke="#fdcb6e" strokeWidth="3" strokeDasharray="8,6" />

      {/* Diagram Drawn on Floor Paper: Logic Gate & 0s and 1s */}
      <g transform="translate(190, 160)">
        <rect x="0" y="0" width="120" height="80" rx="6" fill="#ffffff" stroke="#2f3542" strokeWidth="2.5" />
        <text x="12" y="24" fill="#0984e3" className="font-kalam text-xs font-bold">
          01000101
        </text>
        <path d="M 20 40 H 50 V 60 H 90" stroke="#00b894" strokeWidth="3" strokeLinecap="round" />
        <text x="65" y="48" fill="#d63031" className="font-kalam text-xs font-bold">
          = GO!
        </text>
        <circle cx="50" cy="40" r="4" fill="#fdcb6e" />
        <circle cx="90" cy="60" r="4" fill="#00b894" />
      </g>

      {/* Dad Sitting Cross-Legged Explaining */}
      <g transform="translate(80, 80)">
        {/* Head */}
        <circle cx="60" cy="45" r="30" fill="#ffeaa7" stroke="#2f3542" strokeWidth="3.5" />
        <path d="M 35 35 C 35 15 55 10 85 15 Z" fill="#576574" />
        {/* Glasses */}
        <circle cx="50" cy="45" r="8" stroke="#2f3542" strokeWidth="2.5" />
        <circle cx="70" cy="45" r="8" stroke="#2f3542" strokeWidth="2.5" />
        <line x1="58" y1="45" x2="62" y2="45" stroke="#2f3542" strokeWidth="2.5" />
        {/* Explaining Hand Gesture */}
        <path d="M 85 95 C 105 100 125 110 135 130" stroke="#10ac84" strokeWidth="12" strokeLinecap="round" />
        <path d="M 135 130 L 155 135" stroke="#ffeaa7" strokeWidth="6" strokeLinecap="round" />
        {/* Green Sweater Body */}
        <rect x="25" y="75" width="70" height="80" rx="8" fill="#10ac84" stroke="#2f3542" strokeWidth="3.5" />
        {/* Crossed Legs */}
        <ellipse cx="60" cy="165" rx="55" ry="18" fill="#2d3436" stroke="#2f3542" strokeWidth="3.5" />
      </g>

      {/* Prajwal Sitting Opposite, Leaning in with Wonder */}
      <g transform="translate(320, 100)">
        {/* Head */}
        <circle cx="45" cy="40" r="26" fill="#ffeaa7" stroke="#2f3542" strokeWidth="3.5" />
        {/* Hair */}
        <path d="M 25 30 C 25 10 45 10 65 15 Z" fill="#2f3542" />
        {/* Glowing LED Eyes */}
        <circle cx="38" cy="38" r="5" fill="#00d2d3" className="animate-led-glow" />
        <circle cx="54" cy="38" r="5" fill="#00d2d3" className="animate-led-glow" />
        {/* Grin of total fascination */}
        <path d="M 40 52 Q 46 60 52 52" stroke="#2f3542" strokeWidth="2.5" strokeLinecap="round" />
        {/* Blue Striped Shirt */}
        <rect x="18" y="66" width="54" height="65" rx="6" fill="#1e90ff" stroke="#2f3542" strokeWidth="3.5" />
        {/* Leaning forward hands on knees */}
        <path d="M 20 85 L -5 125" stroke="#ffeaa7" strokeWidth="6" strokeLinecap="round" />
        {/* Crossed Legs */}
        <ellipse cx="45" cy="140" rx="42" ry="15" fill="#3742fa" stroke="#2f3542" strokeWidth="3.5" />
      </g>

      {/* Sparkles of Knowledge */}
      <path d="M 230 110 L 235 95 L 240 110 L 255 115 L 240 120 L 235 135 L 230 120 L 215 115 Z" fill="#fed330" />
      <path d="M 280 80 L 283 70 L 286 80 L 296 83 L 286 86 L 283 96 L 280 86 L 270 83 Z" fill="#ff7675" />
    </svg>
  );
};

// Scene 6: The Glowing Screen & The Maker's Call ("What awesome thing am I going to make next?")
export const CrayonGlowingScreenScene: React.FC<{
  onLaunchSpark?: () => void;
  className?: string;
}> = ({ onLaunchSpark, className = '' }) => {
  return (
    <svg
      viewBox="0 0 540 380"
      className={`w-full max-w-[540px] overflow-visible ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Huge Glowing Computer Monitor */}
      <g>
        {/* Screen Glow Radiance */}
        <rect
          x="120"
          y="40"
          width="300"
          height="200"
          rx="18"
          fill="#00ffcc"
          opacity="0.25"
          filter="blur(16px)"
        />

        {/* Monitor Outer Frame (Thick retro CRT / chunky 90s/00s bezel) */}
        <rect
          x="130"
          y="50"
          width="280"
          height="180"
          rx="14"
          fill="#dfe4ea"
          stroke="#2f3542"
          strokeWidth="5"
        />

        {/* Monitor Screen Glass (Vibrant Cyan / Dark Terminal) */}
        <rect
          x="145"
          y="65"
          width="250"
          height="150"
          rx="8"
          fill="#1e272e"
          stroke="#2f3542"
          strokeWidth="3.5"
        />

        {/* Hand-drawn colorful code on screen */}
        <g className="font-kalam font-bold text-sm">
          <text x="160" y="95" fill="#2ed573">
            function buildCar() &#123;
          </text>
          <text x="180" y="120" fill="#ffa502">
            speed = 9999;
          </text>
          <text x="180" y="145" fill="#70a1ff">
            lasers = true;
          </text>
          <text x="180" y="170" fill="#ff4757">
            neverStop();
          </text>
          <text x="160" y="195" fill="#2ed573">
            &#125; <tspan fill="#ffffff" className="animate-pulse">&#9646;</tspan>
          </text>
        </g>

        {/* Monitor Stand */}
        <path d="M 250 230 L 240 270 H 300 L 290 230" fill="#ced6e0" stroke="#2f3542" strokeWidth="4" />
        <ellipse cx="270" cy="275" rx="55" ry="12" fill="#a4b0be" stroke="#2f3542" strokeWidth="3.5" />
      </g>

      {/* Dad Standing Behind Smiling Proudly */}
      <g transform="translate(70, 70)">
        <circle cx="50" cy="50" r="32" fill="#ffeaa7" stroke="#2f3542" strokeWidth="3.5" />
        <path d="M 25 35 C 25 15 45 10 75 15 Z" fill="#576574" />
        {/* Glasses */}
        <rect x="34" y="42" width="16" height="12" rx="3" stroke="#2f3542" strokeWidth="2.5" />
        <rect x="54" y="42" width="16" height="12" rx="3" stroke="#2f3542" strokeWidth="2.5" />
        {/* Proud Smile */}
        <path d="M 40 65 Q 50 74 60 65" stroke="#2f3542" strokeWidth="2.5" strokeLinecap="round" />
        {/* Hand resting gently on Prajwal's shoulder */}
        <path d="M 78 85 Q 100 110 120 125" stroke="#10ac84" strokeWidth="12" strokeLinecap="round" />
        <circle cx="120" cy="125" r="9" fill="#ffeaa7" stroke="#2f3542" strokeWidth="2.5" />
      </g>

      {/* Prajwal Staring into Monitor with a Huge Victorious Maker Grin */}
      <g transform="translate(195, 180)">
        {/* Head */}
        <circle cx="75" cy="55" r="35" fill="#ffeaa7" stroke="#2f3542" strokeWidth="4" />
        {/* Wild hair backlit by monitor light */}
        <path d="M 45 40 C 45 15 75 10 105 18 C 115 40 105 60 105 60 Z" fill="#2f3542" stroke="#00ffcc" strokeWidth="2" />
        {/* Eyes lit up with the code reflections */}
        <circle cx="65" cy="52" r="7" fill="#00ffcc" className="animate-led-glow" />
        <circle cx="85" cy="52" r="7" fill="#00ffcc" className="animate-led-glow" />
        {/* Huge triumphant smile */}
        <path d="M 60 70 Q 75 90 90 70 Z" fill="#ff4757" stroke="#2f3542" strokeWidth="3" />
        {/* Hands on keyboard */}
        <rect x="40" y="115" width="70" height="20" rx="4" fill="#a4b0be" stroke="#2f3542" strokeWidth="3" />
      </g>

      {/* The Master Thought Bubble: "What awesome thing am I going to make next?" */}
      <g
        className="cursor-pointer transition-transform hover:scale-105"
        onClick={onLaunchSpark}
        transform="translate(250, 8)"
      >
        {/* Cloud-like thought bubble with plenty of room */}
        <rect
          x="0"
          y="0"
          width="235"
          height="88"
          rx="22"
          fill="#fffdf5"
          stroke="#ff4757"
          strokeWidth="3.5"
          className="crayon-box-shadow"
        />
        {/* Connecting little thought circles */}
        <circle cx="36" cy="100" r="6.5" fill="#ffffff" stroke="#ff4757" strokeWidth="2.5" />
        <circle cx="26" cy="114" r="4" fill="#ffffff" stroke="#ff4757" strokeWidth="2" />

        <text x="22" y="28" fill="#2f3542" className="font-kalam text-xs font-bold">
          "What awesome thing
        </text>
        <text x="22" y="52" fill="#ff4757" className="font-gloria text-sm font-extrabold">
          am I gonna MAKE NEXT?!"
        </text>
        <text x="22" y="74" fill="#ffa502" className="font-kalam text-xs font-bold">
          ✨ (Click for Sparks!)
        </text>
      </g>
    </svg>
  );
};
