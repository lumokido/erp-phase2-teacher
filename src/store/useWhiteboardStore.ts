// src/store/useWhiteboardStore.ts
import { create } from 'zustand';

export type WhiteboardTool = 'pen' | 'highlighter' | 'eraser' | 'line' | 'rectangle' | 'circle' | 'arrow' | 'sticky';
export type GridBackground = 'blank' | 'grid' | 'ruled' | 'dots';

export interface StickyNote {
  id: string;
  x: number;
  y: number;
  text: string;
  color: 'yellow' | 'cyan' | 'pink' | 'emerald' | 'purple';
}

interface WhiteboardState {
  currentTool: WhiteboardTool;
  strokeColor: string;
  strokeWidth: number;
  gridBackground: GridBackground;
  stickyNotes: StickyNote[];
  savedSnapshots: { id: string; name: string; timestamp: string; dataUrl: string }[];
  canvasHistoryIndex: number;

  setTool: (tool: WhiteboardTool) => void;
  setColor: (color: string) => void;
  setStrokeWidth: (width: number) => void;
  setGridBackground: (grid: GridBackground) => void;
  addStickyNote: (note: Omit<StickyNote, 'id'>) => void;
  updateStickyNoteText: (id: string, text: string) => void;
  deleteStickyNote: (id: string) => void;
  saveSnapshot: (name: string, dataUrl: string) => void;
}

export const useWhiteboardStore = create<WhiteboardState>((set) => ({
  currentTool: 'pen',
  strokeColor: '#38bdf8', // Neon Cyan default
  strokeWidth: 4,
  gridBackground: 'grid',
  stickyNotes: [
    { id: 'stk-1', x: 80, y: 100, text: 'Faraday\'s Equation:\nε = -N (ΔΦ/Δt)', color: 'yellow' },
    { id: 'stk-2', x: 420, y: 120, text: 'Remember: Lenz Law minus sign indicates flux opposition!', color: 'cyan' }
  ],
  savedSnapshots: [],
  canvasHistoryIndex: 0,

  setTool: (tool) => set({ currentTool: tool }),
  setColor: (color) => set({ strokeColor: color }),
  setStrokeWidth: (width) => set({ strokeWidth: width }),
  setGridBackground: (gridBackground) => set({ gridBackground }),

  addStickyNote: (note) => {
    set((state) => ({
      stickyNotes: [...state.stickyNotes, { ...note, id: `stk-${Date.now()}` }],
    }));
  },

  updateStickyNoteText: (id, text) => {
    set((state) => ({
      stickyNotes: state.stickyNotes.map((note) => (note.id === id ? { ...note, text } : note)),
    }));
  },

  deleteStickyNote: (id) => {
    set((state) => ({
      stickyNotes: state.stickyNotes.filter((note) => note.id !== id),
    }));
  },

  saveSnapshot: (name, dataUrl) => {
    set((state) => ({
      savedSnapshots: [
        { id: `snap-${Date.now()}`, name, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), dataUrl },
        ...state.savedSnapshots,
      ],
    }));
  },
}));
