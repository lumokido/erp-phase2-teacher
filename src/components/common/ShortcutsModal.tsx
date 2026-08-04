// src/components/common/ShortcutsModal.tsx
import React from 'react';
import { X, Keyboard, Command, Zap } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcutGroups = [
    {
      title: 'Digital Board & Tools',
      items: [
        { keys: ['Ctrl', 'Shift', 'W'], label: 'Switch to Whiteboard Canvas' },
        { keys: ['Ctrl', 'Shift', 'T'], label: 'Toggle Floating Classroom Timer' },
        { keys: ['Ctrl', 'Shift', 'R'], label: 'Start / Pause Screen Recording' },
        { keys: ['Ctrl', 'Shift', 'A'], label: 'Quick Mark Attendance' },
        { keys: ['Ctrl', 'P'], label: 'Whiteboard Pen Tool' },
        { keys: ['Ctrl', 'E'], label: 'Whiteboard Eraser Tool' },
        { keys: ['Ctrl', 'Z'], label: 'Undo Whiteboard Action' },
      ],
    },
    {
      title: 'Navigation & Commands',
      items: [
        { keys: ['Ctrl', 'K'], label: 'Open Smart Command Palette' },
        { keys: ['Ctrl', 'F'], label: 'Find Student / File' },
        { keys: ['F11'], label: 'Toggle Fullscreen Mode' },
        { keys: ['Space'], label: 'Play / Pause Timer' },
        { keys: ['Esc'], label: 'Close Active Overlay / Modal' },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl rounded-3xl glass-panel border border-cyan-500/40 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Keyboard className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">Smart Board Keyboard Shortcuts</h3>
              <p className="text-xs text-slate-400">Classroom gesture & keyboard controls reference</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {shortcutGroups.map((group, gIdx) => (
            <div key={gIdx}>
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4" /> {group.title}
              </h4>
              <div className="space-y-2">
                {group.items.map((item, iIdx) => (
                  <div
                    key={iIdx}
                    className="flex items-center justify-between p-3.5 rounded-2xl glass-card border border-white/5 hover:border-white/20 transition"
                  >
                    <span className="text-sm font-medium text-slate-200">{item.label}</span>
                    <div className="flex items-center gap-1.5">
                      {item.keys.map((k, kIdx) => (
                        <kbd
                          key={kIdx}
                          className="px-2.5 py-1 text-xs font-mono font-bold bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 rounded-lg shadow-sm"
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/10 text-center text-xs text-slate-400 bg-black/20">
          Tip: Tap any shortcut button on screen or use remote presenter keys on Windows Smart Board.
        </div>
      </div>
    </div>
  );
};
