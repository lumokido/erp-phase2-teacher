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
    '#4f46e5', // Deep Indigo
    '#0284c7', // Sky Blue
    '#059669', // Emerald
    '#dc2626', // Rose Red
    '#7c3aed', // Purple
    '#0f172a', // Dark Slate
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
      ctx.strokeStyle = strokeColor === '#ffffff' ? '#4f46e5' : strokeColor;
      ctx.lineWidth = strokeWidth;
      ctx.globalAlpha = 1.0;
    } else if (currentTool === 'highlighter') {
      ctx.strokeStyle = strokeColor === '#ffffff' ? '#facc15' : strokeColor;
      ctx.lineWidth = strokeWidth * 4;
      ctx.globalAlpha = 0.35;
    } else if (currentTool === 'eraser') {
      ctx.strokeStyle = '#f8fafc'; // Erase with light background color
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
      ctx.strokeStyle = strokeColor === '#ffffff' ? '#4f46e5' : strokeColor;
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
    link.download = `Whiteboard_Notes_${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  const getBackgroundPatternClass = () => {
    switch (gridBackground) {
      case 'grid':
        return 'bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:32px_32px]';
      case 'ruled':
        return 'bg-[linear-gradient(to_bottom,#00000010_1px,transparent_1px)] bg-[size:100%_36px]';
      case 'dots':
        return 'bg-[radial-gradient(#00000015_1px,transparent_1px)] [background-size:24px_24px]';
      default:
        return '';
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-10rem)] rounded-3xl glass-panel border border-slate-200 overflow-hidden flex flex-col bg-white">
      {/* Floating Smart Board Toolbar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 p-2 rounded-3xl glass-panel border border-slate-200 shadow-lg backdrop-blur-2xl bg-white/95 text-slate-800">
        {/* Tool Selectors */}
        <div className="flex items-center gap-1 pr-2 border-r border-slate-200">
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
                className={`flex items-center gap-2 px-3 py-2 rounded-2xl transition font-bold text-xs touch-target ${
                  active
                    ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
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
        <div className="flex items-center gap-1 pr-2 border-r border-slate-200">
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
                  active ? 'bg-indigo-100 text-indigo-700 border border-indigo-300 font-bold' : 'text-slate-500 hover:bg-slate-100'
                }`}
                title={s.label}
              >
                <Icon className="w-4.5 h-4.5" />
              </button>
            );
          })}
        </div>

        {/* Color Palette Buttons */}
        <div className="flex items-center gap-1.5 pr-2 border-r border-slate-200">
          {colorPalette.map((color) => (
            <button
              key={color}
              onClick={() => setColor(color)}
              className={`w-7 h-7 rounded-full border-2 transition ${
                strokeColor === color ? 'scale-125 border-slate-900 shadow-sm' : 'border-transparent hover:scale-110'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* Stroke Thickness Picker */}
        <div className="flex items-center gap-2 pr-2 border-r border-slate-200 px-2">
          <input
            type="range"
            min="2"
            max="20"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
            className="w-20 accent-indigo-600 cursor-pointer"
            title="Stroke Size"
          />
          <span className="text-[11px] font-mono text-indigo-700 font-bold">{strokeWidth}px</span>
        </div>

        {/* Add Sticky Note */}
        <button
          onClick={() => addStickyNote({ x: 150, y: 150, text: 'New Classroom Note...', color: 'yellow' })}
          className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200 transition text-xs font-bold"
        >
          <StickyIcon className="w-4 h-4 text-amber-700" /> Note
        </button>

        {/* Grid Background Switcher */}
        <div className="flex items-center gap-1">
          {(['grid', 'ruled', 'dots', 'blank'] as GridBackground[]).map((g) => (
            <button
              key={g}
              onClick={() => setGridBackground(g)}
              className={`px-2 py-1 rounded-lg text-[10px] uppercase font-bold transition ${
                gridBackground === g ? 'bg-indigo-100 text-indigo-800' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Canvas Actions */}
        <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200">
          <button
            onClick={handleUndo}
            disabled={historyStep <= 0}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 flex items-center justify-center text-slate-700 font-bold"
            title="Undo"
          >
            <Undo className="w-4.5 h-4.5" />
          </button>

          <button
            onClick={handleClear}
            className="w-9 h-9 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-700 flex items-center justify-center transition font-bold"
            title="Clear Board"
          >
            <Trash2 className="w-4.5 h-4.5" />
          </button>

          <button
            onClick={handleExportPNG}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200 transition text-xs font-extrabold shadow-sm"
          >
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* Main HTML5 Canvas Area */}
      <div className={`relative flex-1 w-full h-full bg-slate-50 ${getBackgroundPatternClass()}`}>
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
              className="absolute pointer-events-auto w-60 p-4 rounded-2xl glass-card border border-amber-300 shadow-xl bg-amber-50 animate-in zoom-in duration-150"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider flex items-center gap-1">
                  <StickyIcon className="w-3 h-3 text-amber-700" /> Sticky Note
                </span>
                <button
                  onClick={() => deleteStickyNote(note.id)}
                  className="text-amber-700 hover:text-amber-900"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <textarea
                value={note.text}
                onChange={(e) => updateStickyNoteText(note.id, e.target.value)}
                className="w-full h-24 bg-transparent text-amber-950 text-sm outline-none resize-none font-medium placeholder-amber-700/50"
                placeholder="Write lesson reminder..."
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
