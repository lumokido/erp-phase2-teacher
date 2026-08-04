// src/components/board/WhiteboardCanvas.tsx
import React, { useRef, useState, useEffect } from 'react';
import {
  Pencil,
  Eraser,
  Highlighter,
  Square,
  Circle,
  Minus,
  MoveRight,
  StickyNote as StickyIcon,
  Trash2,
  Undo,
  Download,
  Grid,
  Plus,
  Sparkles,
  Layers,
  Palette
} from 'lucide-react';
import { useWhiteboardStore, WhiteboardTool, GridBackground } from '../../store/useWhiteboardStore';

export const WhiteboardCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyStep, setHistoryStep] = useState(-1);

  const {
    currentTool,
    strokeColor,
    strokeWidth,
    gridBackground,
    stickyNotes,
    setTool,
    setColor,
    setStrokeWidth,
    setGridBackground,
    addStickyNote,
    updateStickyNoteText,
    deleteStickyNote,
    saveSnapshot,
  } = useWhiteboardStore();

  const colorPalette = [
    '#38bdf8', // Neon Cyan
    '#facc15', // Neon Yellow
    '#4ade80', // Neon Emerald
    '#f43f5e', // Neon Rose
    '#c084fc', // Neon Purple
    '#ffffff', // Pure White
  ];

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to fit container
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        // Save current canvas content before resize
        const tempImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.putImageData(tempImageData, 0, 0);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Save initial state for Undo
    saveCanvasState();

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyStep > 0) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const prevStep = historyStep - 1;
      ctx.putImageData(history[prevStep], 0, 0);
      setHistoryStep(prevStep);
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    saveCanvasState();
  };

  const getPointerPos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const pos = getPointerPos(e);
    setIsDrawing(true);
    setStartPos(pos);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);

    if (currentTool === 'pen') {
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = strokeWidth;
      ctx.globalAlpha = 1.0;
    } else if (currentTool === 'highlighter') {
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = strokeWidth * 4;
      ctx.globalAlpha = 0.35;
    } else if (currentTool === 'eraser') {
      ctx.strokeStyle = '#090d16'; // Erase with background color
      ctx.lineWidth = strokeWidth * 5;
      ctx.globalAlpha = 1.0;
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const pos = getPointerPos(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (currentTool === 'pen' || currentTool === 'highlighter' || currentTool === 'eraser') {
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
  };

  const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    setIsDrawing(false);

    const canvas = canvasRef.current;
    if (!canvas || !startPos) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const endPos = getPointerPos(e);

    // Draw Shapes if shape tool active
    if (currentTool === 'line' || currentTool === 'rectangle' || currentTool === 'circle' || currentTool === 'arrow') {
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = strokeWidth;
      ctx.globalAlpha = 1.0;
      ctx.beginPath();

      if (currentTool === 'line') {
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(endPos.x, endPos.y);
        ctx.stroke();
      } else if (currentTool === 'rectangle') {
        const width = endPos.x - startPos.x;
        const height = endPos.y - startPos.y;
        ctx.strokeRect(startPos.x, startPos.y, width, height);
      } else if (currentTool === 'circle') {
        const radius = Math.sqrt(Math.pow(endPos.x - startPos.x, 2) + Math.pow(endPos.y - startPos.y, 2));
        ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
      } else if (currentTool === 'arrow') {
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(endPos.x, endPos.y);
        ctx.stroke();
        // Arrow tip
        const angle = Math.atan2(endPos.y - startPos.y, endPos.x - startPos.x);
        ctx.beginPath();
        ctx.moveTo(endPos.x, endPos.y);
        ctx.lineTo(endPos.x - 15 * Math.cos(angle - Math.PI / 6), endPos.y - 15 * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(endPos.x, endPos.y);
        ctx.lineTo(endPos.x - 15 * Math.cos(angle + Math.PI / 6), endPos.y - 15 * Math.sin(angle + Math.PI / 6));
        ctx.stroke();
      }
    }

    ctx.closePath();
    saveCanvasState();
  };

  const handleExportPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    saveSnapshot(`Whiteboard_Snap_${Date.now()}`, dataUrl);

    // Create download link
    const link = document.createElement('a');
    link.download = `Whiteboard_Faraday_Notes_${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  const getBackgroundPatternClass = () => {
    switch (gridBackground) {
      case 'grid':
        return 'bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px]';
      case 'ruled':
        return 'bg-[linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:100%_36px]';
      case 'dots':
        return 'bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:24px_24px]';
      default:
        return '';
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-10rem)] rounded-3xl glass-panel border border-cyan-500/30 overflow-hidden flex flex-col">
      {/* Floating Smart Board Toolbar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 p-2.5 rounded-3xl glass-panel border-2 border-cyan-500/40 shadow-neon-blue backdrop-blur-2xl">
        {/* Tool Selectors */}
        <div className="flex items-center gap-1.5 pr-2 border-r border-white/10">
          {[
            { id: 'pen', icon: Pencil, label: 'Pen' },
            { id: 'highlighter', icon: Highlighter, label: 'Highlighter' },
            { id: 'eraser', icon: Eraser, label: 'Eraser' },
          ].map((t) => {
            const Icon = t.icon;
            const active = currentTool === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTool(t.id as WhiteboardTool)}
                className={`flex items-center gap-2 px-3 py-2 rounded-2xl transition font-semibold text-xs touch-target ${
                  active
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-neon-blue'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
                title={t.label}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Shapes Menu */}
        <div className="flex items-center gap-1 pr-2 border-r border-white/10">
          {[
            { id: 'line', icon: Minus, label: 'Line' },
            { id: 'rectangle', icon: Square, label: 'Rectangle' },
            { id: 'circle', icon: Circle, label: 'Circle' },
            { id: 'arrow', icon: MoveRight, label: 'Arrow' },
          ].map((s) => {
            const Icon = s.icon;
            const active = currentTool === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setTool(s.id as WhiteboardTool)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition ${
                  active ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400' : 'text-slate-400 hover:bg-white/10'
                }`}
                title={s.label}
              >
                <Icon className="w-4.5 h-4.5" />
              </button>
            );
          })}
        </div>

        {/* Color Palette Buttons */}
        <div className="flex items-center gap-1.5 pr-2 border-r border-white/10">
          {colorPalette.map((color) => (
            <button
              key={color}
              onClick={() => setColor(color)}
              className={`w-7 h-7 rounded-full border-2 transition ${
                strokeColor === color ? 'scale-125 border-white shadow-neon-cyan' : 'border-transparent hover:scale-110'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* Stroke Thickness Picker */}
        <div className="flex items-center gap-2 pr-2 border-r border-white/10 px-2">
          <input
            type="range"
            min="2"
            max="20"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
            className="w-20 accent-cyan-400 cursor-pointer"
            title="Stroke Size"
          />
          <span className="text-[11px] font-mono text-cyan-300 font-bold">{strokeWidth}px</span>
        </div>

        {/* Add Sticky Note */}
        <button
          onClick={() => addStickyNote({ x: 150, y: 150, text: 'New Classroom Note...', color: 'yellow' })}
          className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition text-xs font-semibold"
        >
          <StickyIcon className="w-4 h-4" /> Note
        </button>

        {/* Grid Background Switcher */}
        <div className="flex items-center gap-1">
          {(['grid', 'ruled', 'dots', 'blank'] as GridBackground[]).map((g) => (
            <button
              key={g}
              onClick={() => setGridBackground(g)}
              className={`px-2 py-1 rounded-lg text-[10px] uppercase font-bold transition ${
                gridBackground === g ? 'bg-cyan-500/30 text-cyan-300' : 'text-slate-400 hover:text-white'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Canvas Actions */}
        <div className="flex items-center gap-1.5 pl-2 border-l border-white/10">
          <button
            onClick={handleUndo}
            disabled={historyStep <= 0}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-40 flex items-center justify-center text-slate-300"
            title="Undo"
          >
            <Undo className="w-4.5 h-4.5" />
          </button>

          <button
            onClick={handleClear}
            className="w-9 h-9 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 flex items-center justify-center transition"
            title="Clear Board"
          >
            <Trash2 className="w-4.5 h-4.5" />
          </button>

          <button
            onClick={handleExportPNG}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition text-xs font-bold shadow-neon-emerald"
          >
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* Main HTML5 Canvas Area */}
      <div className={`relative flex-1 w-full h-full bg-dark-base ${getBackgroundPatternClass()}`}>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="absolute inset-0 cursor-crosshair z-10"
        />

        {/* Draggable Sticky Notes Layer */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {stickyNotes.map((note) => (
            <div
              key={note.id}
              style={{ left: `${note.x}px`, top: `${note.y}px` }}
              className="absolute pointer-events-auto w-60 p-4 rounded-2xl glass-card border border-amber-400/40 shadow-2xl bg-amber-950/40 animate-in zoom-in duration-150"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider flex items-center gap-1">
                  <StickyIcon className="w-3 h-3" /> Sticky Note
                </span>
                <button
                  onClick={() => deleteStickyNote(note.id)}
                  className="text-amber-400/60 hover:text-amber-300"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <textarea
                value={note.text}
                onChange={(e) => updateStickyNoteText(note.id, e.target.value)}
                className="w-full h-24 bg-transparent text-amber-100 text-sm outline-none resize-none font-medium placeholder-amber-300/50"
                placeholder="Write lesson reminder..."
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
