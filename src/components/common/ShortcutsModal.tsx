// src/components/common/ShortcutsModal.tsx
import React from 'react';
import { X, Keyboard, Zap } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl rounded-3xl glass-panel border border-slate-200 shadow-2xl overflow-hidden bg-white">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
              <Keyboard className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">Smart Board Keyboard Shortcuts</h3>
              <p className="text-xs text-slate-500 font-medium">Classroom gesture & keyboard controls reference</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {shortcutGroups.map((group, gIdx) => (
            <div key={gIdx}>
              <h4 className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4" /> {group.title}
              </h4>
              <div className="space-y-2">
                {group.items.map((item, iIdx) => (
                  <div
                    key={iIdx}
                    className="flex items-center justify-between p-3.5 rounded-2xl glass-card border border-slate-200 hover:border-indigo-300 transition"
                  >
                    <span className="text-sm font-semibold text-slate-800">{item.label}</span>
                    <div className="flex items-center gap-1.5">
                      {item.keys.map((k, kIdx) => (
                        <kbd
                          key={kIdx}
                          className="px-2.5 py-1 text-xs font-mono font-bold bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-lg shadow-sm"
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

        <div className="p-4 border-t border-slate-100 text-center text-xs text-slate-500 bg-slate-50 font-medium">
          Tip: Tap any shortcut button on screen or use remote presenter keys on Windows Smart Board.
        </div>
      </div>
    </div>
  );
};
