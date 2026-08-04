// src/components/board/AnnouncementsModule.tsx
import React, { useState } from 'react';
import { Megaphone, AlertCircle, Pin, Plus, Send, BellRing } from 'lucide-react';
import { useClassStore } from '../../store/useClassStore';

export const AnnouncementsModule: React.FC = () => {
  const { announcements, addAnnouncement } = useClassStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('high');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    addAnnouncement({
      title,
      content,
      priority,
      author: 'Dr. Sarah Jenkins',
      targetGrades: ['Grade 10-A'],
      isPinned: priority === 'high',
    });

    setTitle('');
    setContent('');
    setShowModal(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-6 rounded-3xl glass-panel border border-white/10 flex items-center justify-between">
        <div>
          <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-cyan-400" /> Classroom Broadcasts & Announcements
          </h3>
          <p className="text-xs text-slate-300">Display high-priority exam alerts or safety rules on Smart Board</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs shadow-neon-blue transition hover:brightness-110 touch-target"
        >
          <Plus className="w-4 h-4" /> Broadcast Announcement
        </button>
      </div>

      {/* Announcements Stack */}
      <div className="space-y-4">
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className={`p-6 rounded-3xl glass-card border transition space-y-3 ${
              ann.priority === 'high'
                ? 'border-rose-500/50 bg-rose-950/20 shadow-neon-purple'
                : 'border-white/10'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {ann.isPinned && <Pin className="w-4 h-4 text-cyan-400 fill-cyan-400" />}
                <span
                  className={`px-3 py-1 rounded-full text-[10px] uppercase font-extrabold ${
                    ann.priority === 'high'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : ann.priority === 'medium'
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-cyan-500/20 text-cyan-300'
                  }`}
                >
                  {ann.priority} Priority
                </span>
                <span className="text-xs text-slate-400">• {ann.date}</span>
              </div>

              <span className="text-xs text-slate-400 font-semibold">{ann.author}</span>
            </div>

            <h4 className="font-display font-bold text-xl text-white">{ann.title}</h4>
            <p className="text-sm text-slate-200 leading-relaxed">{ann.content}</p>

            <div className="flex items-center gap-2 pt-2 text-xs text-slate-400">
              <span>Target: {ann.targetGrades.join(', ')}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Broadcast Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
          <form onSubmit={handleSubmit} className="w-full max-w-xl rounded-3xl glass-panel border border-cyan-500/40 p-6 space-y-5">
            <h3 className="font-display font-bold text-xl text-white">Broadcast New Classroom Announcement</h3>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Lab Safety Rules Reminder for Thursday"
                className="w-full mt-1 p-3.5 rounded-2xl glass-card border border-white/10 text-white outline-none text-sm font-medium"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase">Message Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Details of the announcement..."
                className="w-full mt-1 p-3.5 rounded-2xl glass-card border border-white/10 text-white outline-none text-sm font-medium h-28 resize-none"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase">Priority Level</label>
              <div className="flex gap-3 mt-1">
                {(['high', 'medium', 'low'] as const).map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setPriority(p)}
                    className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase transition ${
                      priority === p
                        ? 'bg-cyan-500 text-white shadow-neon-blue'
                        : 'glass-card border border-white/10 text-slate-300'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-5 py-3 rounded-2xl bg-white/10 text-slate-300 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-cyan-500 text-white font-bold text-xs shadow-neon-blue flex items-center gap-2"
              >
                <BellRing className="w-4 h-4" /> Broadcast Announcement
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
