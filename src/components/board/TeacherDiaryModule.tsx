// src/components/board/TeacherDiaryModule.tsx
import React, { useState } from 'react';
import { BookMarked, Calendar, Tag, Plus, Send, Lock, UserCheck } from 'lucide-react';
import { useClassStore } from '../../store/useClassStore';

export const TeacherDiaryModule: React.FC = () => {
  const { diaryEntries, addDiaryEntry, activeSlot } = useClassStore();
  const [reflection, setReflection] = useState('');
  const [behaviorNotes, setBehaviorNotes] = useState('');
  const [nextPrep, setNextPrep] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflection) return;

    addDiaryEntry({
      classId: activeSlot.id,
      subject: activeSlot.subject,
      date: new Date().toISOString().split('T')[0],
      reflectionText: reflection,
      studentBehaviorNotes: behaviorNotes || 'No specific behavior incidents.',
      homeworkAssigned: 'Assigned Faraday Law Practice Sheet #4',
      nextClassPrep: nextPrep || 'Prepare aluminum ring experiment.',
      tags: ['Physics', 'Electromagnetism', 'Smart Board'],
    });

    setReflection('');
    setBehaviorNotes('');
    setNextPrep('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl glass-panel border border-white/10 flex items-center justify-between">
        <div>
          <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
            <BookMarked className="w-6 h-6 text-purple-400" /> Teacher Confidential Diary & Reflection Log
          </h3>
          <p className="text-xs text-slate-300">Private classroom observations, student pace tracking, & next session prep</p>
        </div>
        <span className="px-3 py-1.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold flex items-center gap-1.5 border border-purple-500/30">
          <Lock className="w-3.5 h-3.5" /> End-to-End Encrypted
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Create New Diary Entry Form */}
        <form onSubmit={handleSave} className="p-6 rounded-3xl glass-card border border-white/10 space-y-4">
          <h4 className="font-display font-bold text-lg text-white">Log Today's Reflection</h4>

          <div>
            <label className="text-xs font-bold text-slate-300 uppercase">Lesson Reflection & Understanding</label>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="How well did students grasp Faraday's Law? Which group excelled?"
              className="w-full mt-1 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-purple-500/50 h-24 resize-none font-medium"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 uppercase">Student Behavior & Engagement</label>
            <textarea
              value={behaviorNotes}
              onChange={(e) => setBehaviorNotes(e.target.value)}
              placeholder="Note any absent students, outstanding participation..."
              className="w-full mt-1 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-purple-500/50 h-20 resize-none font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 uppercase">Next Session Prep</label>
            <input
              type="text"
              value={nextPrep}
              onChange={(e) => setNextPrep(e.target.value)}
              placeholder="e.g. Set up Lenz Law physical coil demo"
              className="w-full mt-1 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-purple-500/50 font-medium"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-xs shadow-neon-purple flex items-center justify-center gap-2 hover:brightness-110 transition touch-target"
          >
            <Send className="w-4 h-4" /> Save Private Reflection Log
          </button>
        </form>

        {/* Right Column: Historical Diary Feed */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-display font-bold text-lg text-white">Previous Reflection Logs</h4>
          <div className="space-y-4">
            {diaryEntries.map((entry) => (
              <div
                key={entry.id}
                className="p-6 rounded-3xl glass-panel border border-white/10 space-y-3 hover:border-purple-500/30 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-purple-300">{entry.subject}</span>
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {entry.date}
                  </span>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed">{entry.reflectionText}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs">
                  <div className="p-3 rounded-xl bg-white/5">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Student Behavior</span>
                    <p className="text-slate-300">{entry.studentBehaviorNotes}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Next Prep</span>
                    <p className="text-slate-300">{entry.nextClassPrep}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {entry.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-semibold">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
