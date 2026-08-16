// src/components/board/QuickNotesModule.tsx
import React, { useState } from 'react';
import { StickyNote as StickyIcon, Plus, Trash2, Pin, Sparkles, Send } from 'lucide-react';
import { useNotesStore } from '../../store/useNotesStore';

export const QuickNotesModule: React.FC = () => {
  const { notes, addNote, deleteNote, togglePin } = useNotesStore();
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newColor, setNewColor] = useState<'yellow' | 'blue' | 'emerald' | 'purple' | 'rose'>('yellow');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    addNote({
      title: newTitle,
      content: newContent,
      color: newColor,
      isPinned: false,
    });

    setNewTitle('');
    setNewContent('');
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-cyan-950/40 border-cyan-500/40 text-cyan-100';
      case 'emerald':
        return 'bg-emerald-950/40 border-emerald-500/40 text-emerald-100';
      case 'purple':
        return 'bg-purple-950/40 border-purple-500/40 text-purple-100';
      case 'rose':
        return 'bg-rose-950/40 border-rose-500/40 text-rose-100';
      default:
        return 'bg-amber-950/40 border-amber-500/40 text-amber-100';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-6 rounded-3xl glass-panel border border-white/10 flex items-center justify-between">
        <div>
          <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
            <StickyIcon className="w-6 h-6 text-amber-400" /> Quick Classroom Scratchpad & Sticky Notes
          </h3>
          <p className="text-xs text-slate-300">Instant reminders for student follow-ups and lab gear orders</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Create Note Form */}
        <form onSubmit={handleAdd} className="p-6 rounded-3xl glass-card border border-white/10 space-y-4">
          <h4 className="font-display font-bold text-lg text-white">Create Quick Note</h4>

          <div>
            <label className="text-xs font-bold text-slate-300 uppercase">Note Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Order extra copper wire"
              className="w-full mt-1 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-amber-500/50 font-medium"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 uppercase">Content</label>
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Write note details..."
              className="w-full mt-1 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-amber-500/50 h-24 resize-none font-medium"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 uppercase">Color Tag</label>
            <div className="flex gap-2 mt-1">
              {(['yellow', 'blue', 'emerald', 'purple', 'rose'] as const).map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setNewColor(c)}
                  className={`w-7 h-7 rounded-full border-2 transition ${
                    newColor === c ? 'scale-125 border-white' : 'border-transparent hover:scale-110'
                  }`}
                  style={{
                    backgroundColor:
                      c === 'yellow' ? '#facc15' : c === 'blue' ? '#38bdf8' : c === 'emerald' ? '#4ade80' : c === 'purple' ? '#c084fc' : '#f43f5e',
                  }}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-lg transition touch-target flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> Save Sticky Note
          </button>
        </form>

        {/* Right Column: Sticky Notes Wall */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-display font-bold text-lg text-white">Active Sticky Notes ({notes.length})</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notes.map((note) => (
              <div
                key={note.id}
                className={`p-5 rounded-3xl border transition space-y-3 relative ${getColorClasses(note.color)}`}
              >
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-base text-white">{note.title}</h5>
                  <div className="flex items-center gap-2">
                    <button onClick={() => togglePin(note.id)} className="text-slate-300 hover:text-white">
                      <Pin className={`w-4 h-4 ${note.isPinned ? 'fill-current text-amber-300' : ''}`} />
                    </button>
                    <button onClick={() => deleteNote(note.id)} className="text-slate-400 hover:text-rose-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs leading-relaxed opacity-90 whitespace-pre-wrap">{note.content}</p>

                <p className="text-[10px] opacity-60 font-mono pt-2 border-t border-white/10">Updated {note.updatedAt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
