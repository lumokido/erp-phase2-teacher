// src/components/board/HomeworkManagerModule.tsx
import React, { useState } from 'react';
import { BookOpenCheck, Calendar, CheckCircle2, Mic, Plus, Paperclip, Send, Sparkles } from 'lucide-react';
import { useClassStore } from '../../store/useClassStore';

export const HomeworkManagerModule: React.FC = () => {
  const { homeworkList, addHomework, activeSlot } = useClassStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('2026-08-03');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    addHomework({
      classId: activeSlot.id,
      subject: activeSlot.subject,
      gradeSection: activeSlot.gradeSection,
      title,
      description,
      assignedDate: '2026-07-31',
      dueDate,
      totalStudents: 28,
      hasVoiceInstruction: true,
    });

    setTitle('');
    setDescription('');
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl glass-panel border border-white/10 flex items-center justify-between">
        <div>
          <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
            <BookOpenCheck className="w-6 h-6 text-emerald-400" /> Homework & Assignment Manager
          </h3>
          <p className="text-xs text-slate-300">Assign homework directly from Smart Board with whiteboard attachments</p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-neon-emerald transition hover:brightness-110 touch-target"
        >
          <Plus className="w-4 h-4" /> Assign New Homework
        </button>
      </div>

      {/* Homework Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {homeworkList.map((hw) => {
          const submissionPercent = Math.round((hw.submittedCount / hw.totalStudents) * 100);
          return (
            <div
              key={hw.id}
              className="p-6 rounded-3xl glass-card border border-white/10 space-y-4 hover:border-emerald-500/30 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase">
                    {hw.gradeSection} • Due {hw.dueDate}
                  </span>
                  <h4 className="font-display font-bold text-lg text-white mt-2">{hw.title}</h4>
                </div>
                <div className="flex items-center gap-1">
                  {hw.hasVoiceInstruction && (
                    <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300" title="Voice Instructions Attached">
                      <Mic className="w-4 h-4" />
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-300 line-clamp-2">{hw.description}</p>

              {/* Progress */}
              <div className="space-y-1.5 pt-2 border-t border-white/10">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400">Student Submissions</span>
                  <span className="text-emerald-400 font-bold">
                    {hw.submittedCount} / {hw.totalStudents} ({submissionPercent}%)
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-400"
                    style={{ width: `${submissionPercent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Homework Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
          <form onSubmit={handleCreate} className="w-full max-w-xl rounded-3xl glass-panel border border-emerald-500/40 p-6 space-y-5">
            <h3 className="font-display font-bold text-xl text-white">Create New Classroom Assignment</h3>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase">Assignment Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Faraday Law Practice Exercise 4.2"
                className="w-full mt-1 p-3.5 rounded-2xl glass-card border border-white/10 text-white outline-none focus:border-emerald-500/50 text-sm font-medium"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase">Instructions</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detail the problems to solve, diagrams to draw..."
                className="w-full mt-1 p-3.5 rounded-2xl glass-card border border-white/10 text-white outline-none focus:border-emerald-500/50 text-sm font-medium h-28 resize-none"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full mt-1 p-3.5 rounded-2xl glass-card border border-white/10 text-white outline-none text-sm font-medium"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-5 py-3 rounded-2xl bg-white/10 text-slate-300 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-emerald-500 text-white font-bold text-xs shadow-neon-emerald flex items-center gap-2"
              >
                <Send className="w-4 h-4" /> Publish Assignment
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
