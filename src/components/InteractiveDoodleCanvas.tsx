import React, { useRef, useState, useEffect } from 'react';
import { Palette, Trash2, Download, Eraser, Sparkles, Undo2 } from 'lucide-react';
import { soundFX } from '../utils/audio';

const CRAYON_PALETTE = [
  { name: 'Cherry Red', color: '#ff4757', border: '#b33939' },
  { name: 'Electric Blue', color: '#1e90ff', border: '#0984e3' },
  { name: 'Canary Yellow', color: '#fed330', border: '#e1b12c' },
  { name: 'Shamrock Green', color: '#2ed573', border: '#20bf6b' },
  { name: 'Grape Purple', color: '#9b59b6', border: '#8e44ad' },
  { name: 'Tangerine Orange', color: '#ff7f50', border: '#eb4d4b' },
  { name: 'Pencil Lead', color: '#2f3542', border: '#1e272e' },
];

export const InteractiveDoodleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedColor, setSelectedColor] = useState('#ff4757');
  const [brushSize, setBrushSize] = useState(8);
  const [isEraser, setIsEraser] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState<'blank' | 'car' | 'robot'>('blank');

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set display dimensions
    const width = canvas.parentElement?.clientWidth || 700;
    const height = 420;
    canvas.width = width;
    canvas.height = height;

    drawBackground(ctx, width, height, activeTemplate);
  }, [activeTemplate]);

  const drawBackground = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    template: 'blank' | 'car' | 'robot'
  ) => {
    // Notebook paper fill
    ctx.fillStyle = '#fffdf7';
    ctx.fillRect(0, 0, width, height);

    // Subtle grid lines
    ctx.strokeStyle = 'rgba(147, 197, 253, 0.3)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 28) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 28) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Left red margin
    ctx.strokeStyle = 'rgba(248, 113, 113, 0.45)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(42, 0);
    ctx.lineTo(42, height);
    ctx.stroke();

    // Template outlines if selected
    if (template === 'car') {
      ctx.save();
      ctx.strokeStyle = '#a4b0be';
      ctx.lineWidth = 3;
      ctx.setLineDash([6, 6]);

      // Car body sketch
      ctx.beginPath();
      ctx.roundRect(width / 2 - 120, height / 2 - 30, 240, 70, 20);
      ctx.stroke();

      // Cabin
      ctx.beginPath();
      ctx.roundRect(width / 2 - 60, height / 2 - 80, 120, 50, 15);
      ctx.stroke();

      // Wheels
      ctx.beginPath();
      ctx.arc(width / 2 - 80, height / 2 + 45, 25, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(width / 2 + 80, height / 2 + 45, 25, 0, Math.PI * 2);
      ctx.stroke();

      // Antenna
      ctx.beginPath();
      ctx.moveTo(width / 2 + 20, height / 2 - 80);
      ctx.lineTo(width / 2 + 50, height / 2 - 130);
      ctx.stroke();

      ctx.fillStyle = '#747d8c';
      ctx.font = '16px Kalam';
      ctx.fillText('🖍️ Color Prajwal\'s Turbo Car! (Stay outside the lines!)', width / 2 - 160, 45);
      ctx.restore();
    } else if (template === 'robot') {
      ctx.save();
      ctx.strokeStyle = '#a4b0be';
      ctx.lineWidth = 3;
      ctx.setLineDash([6, 6]);

      // Robot Head
      ctx.strokeRect(width / 2 - 50, height / 2 - 120, 100, 80);
      // Robot Body
      ctx.strokeRect(width / 2 - 70, height / 2 - 30, 140, 110);
      // Arms
      ctx.strokeRect(width / 2 - 110, height / 2 - 15, 30, 80);
      ctx.strokeRect(width / 2 + 80, height / 2 - 15, 30, 80);

      ctx.fillStyle = '#747d8c';
      ctx.font = '16px Kalam';
      ctx.fillText('🤖 Invent Bleepy\'s New Upgrades!', width / 2 - 110, 45);
      ctx.restore();
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);

    soundFX.playScribble();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (isEraser) {
      ctx.strokeStyle = '#fffdf7';
      ctx.lineWidth = brushSize * 2.5;
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      // Crayon texture effect: slightly jittery multi-stroke
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = brushSize;
      ctx.globalAlpha = 0.85;

      // Jitter stroke to simulate rough wax crayon paper grip
      const jitterX = (Math.random() - 0.5) * 1.5;
      const jitterY = (Math.random() - 0.5) * 1.5;
      ctx.lineTo(x + jitterX, y + jitterY);
      ctx.stroke();

      // Occasional tiny wax flecks
      if (Math.random() > 0.6) {
        ctx.fillStyle = selectedColor;
        ctx.fillRect(x + (Math.random() - 0.5) * 4, y + (Math.random() - 0.5) * 4, 2, 2);
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    soundFX.playCrash();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawBackground(ctx, canvas.width, canvas.height, activeTemplate);
  };

  const handleDownload = () => {
    soundFX.playFanfare();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `prajwal-crayon-masterpiece.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <section id="crayon-canvas" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <span className="font-kalam text-sm sm:text-base text-[#ff4757] font-bold uppercase tracking-widest bg-red-50 px-4 py-1.5 rounded-full border-2 border-dashed border-[#ff4757]">
          🖍️ Interactive Play Area
        </span>
        <h2 className="text-4xl sm:text-5xl font-gloria text-[#2f3542] mt-3">
          The Living Room Rug Crayon Pad
        </h2>
        <p className="font-patrick text-xl text-slate-600 mt-2">
          Pick a real crayon and sketch outside the lines! No neatness required.
        </p>
      </div>

      <div className="crayon-card-soft p-5 sm:p-7 relative shadow-sm">
        {/* Toolbar: Crayons & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4">
          {/* Crayon Stick Selectors */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="font-kalam text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
              Crayons:
            </span>
            {CRAYON_PALETTE.map((c) => {
              const isSelected = !isEraser && selectedColor === c.color;
              return (
                <button
                  key={c.name}
                  onClick={() => {
                    soundFX.playBlip();
                    setSelectedColor(c.color);
                    setIsEraser(false);
                  }}
                  title={c.name}
                  className={`w-9 h-11 sm:w-10 sm:h-12 rounded-t-lg rounded-b-sm transition-transform shadow-xs flex flex-col items-center justify-between p-1 ${
                    isSelected
                      ? 'scale-115 -translate-y-2 ring-3 ring-amber-400'
                      : 'hover:scale-105 opacity-90'
                  }`}
                  style={{
                    backgroundColor: c.color,
                  }}
                >
                  <span className="w-full h-1 bg-white/40 rounded-full" />
                  <span className="text-[9px] font-kalam font-bold text-white drop-shadow-xs rotate-90">
                    WAX
                  </span>
                </button>
              );
            })}

            {/* Eraser button */}
            <button
              onClick={() => {
                soundFX.playBlip();
                setIsEraser(true);
              }}
              title="Eraser"
              className={`p-2.5 transition-transform ${
                isEraser
                  ? 'crayon-btn-red scale-105'
                  : 'crayon-btn-slate'
              }`}
            >
              <Eraser className="w-4 h-4" />
            </button>
          </div>

          {/* Template Choice & Clear/Save */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex bg-slate-100/80 p-1 rounded-xl">
              <button
                onClick={() => {
                  soundFX.playBlip();
                  setActiveTemplate('blank');
                }}
                className={`px-3 py-1 font-kalam text-xs font-bold rounded-lg transition-colors ${
                  activeTemplate === 'blank' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Blank Grid
              </button>
              <button
                onClick={() => {
                  soundFX.playBlip();
                  setActiveTemplate('car');
                }}
                className={`px-3 py-1 font-kalam text-xs font-bold rounded-lg transition-colors ${
                  activeTemplate === 'car' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                RC Car Outline
              </button>
              <button
                onClick={() => {
                  soundFX.playBlip();
                  setActiveTemplate('robot');
                }}
                className={`px-3 py-1 font-kalam text-xs font-bold rounded-lg transition-colors ${
                  activeTemplate === 'robot' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Robot Outline
              </button>
            </div>

            <button
              onClick={handleClear}
              className="p-2.5 text-slate-700 hover:text-red-500 rounded-xl crayon-btn-slate"
              title="Crumple and start over"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-2 crayon-btn-green text-sm shadow-xs"
            >
              <Download className="w-4 h-4" />
              Save Masterpiece
            </button>
          </div>
        </div>

        {/* Thickness Slider */}
        <div className="flex items-center gap-3 mb-3 px-2">
          <span className="font-kalam text-xs font-bold text-slate-500">Crayon Tip:</span>
          <input
            type="range"
            min="4"
            max="26"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-32 accent-[#ff4757] cursor-pointer"
          />
          <span className="font-patrick text-sm text-slate-600">{brushSize}px</span>
        </div>

        {/* The Canvas Area (Borderless, Soft Shadow) */}
        <div className="relative rounded-2xl overflow-hidden shadow-inner bg-[#fffdf7] touch-none">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="cursor-crosshair w-full block"
          />
        </div>

        {/* Footer Note */}
        <div className="mt-4 flex items-center justify-between text-xs font-patrick text-slate-500">
          <span>* Golden rule: Real kid artists color outside the lines! 🖍️✨</span>
          <span>Touch or mouse enabled</span>
        </div>
      </div>
    </section>
  );
};
