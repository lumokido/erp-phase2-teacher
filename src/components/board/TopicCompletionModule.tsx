// src/components/board/TopicCompletionModule.tsx
import React from 'react';
import { CheckSquare, Square, Award, BarChart3, Sparkles } from 'lucide-react';
import { useClassStore } from '../../store/useClassStore';

export const TopicCompletionModule: React.FC = () => {
  const { syllabus, toggleSubtopicCompletion } = useClassStore();

  const totalSubtopics = syllabus.reduce((acc, chap) => acc + chap.subtopics.length, 0);
  const completedSubtopics = syllabus.reduce(
    (acc, chap) => acc + chap.subtopics.filter((st) => st.completed).length,
    0
  );
  const overallSyllabusPercent = Math.round((completedSubtopics / totalSubtopics) * 100);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Syllabus Overview Banner */}
      <div className="p-6 rounded-3xl glass-panel border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase">
            Curriculum Tracker • 10th Grade Physics
          </span>
          <h3 className="font-display font-bold text-2xl text-white mt-1 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-cyan-400" /> Syllabus Topic & Chapter Completion
          </h3>
          <p className="text-xs text-slate-300">Tap subtopics on Smart Board as you complete curriculum milestones</p>
        </div>

        <div className="w-full md:w-80 p-4 rounded-2xl glass-card border border-cyan-500/30 space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-300">Total Course Progress</span>
            <span className="text-cyan-400 font-bold">{overallSyllabusPercent}% Complete</span>
          </div>
          <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-500"
              style={{ width: `${overallSyllabusPercent}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400 text-right">{completedSubtopics} of {totalSubtopics} Subtopics Finished</p>
        </div>
      </div>

      {/* Chapters Accordion / Card List */}
      <div className="space-y-5">
        {syllabus.map((chapter) => (
          <div
            key={chapter.id}
            className="p-6 rounded-3xl glass-card border border-white/10 space-y-4 hover:border-cyan-500/30 transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase text-cyan-400">Chapter {chapter.chapterNumber}</span>
                <h4 className="font-display font-bold text-xl text-white mt-0.5">{chapter.chapterTitle}</h4>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold">
                  {chapter.progressPercent}%
                </span>
              </div>
            </div>

            {/* Chapter Progress Bar */}
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-cyan-400 transition-all duration-300"
                style={{ width: `${chapter.progressPercent}%` }}
              />
            </div>

            {/* Subtopic Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {chapter.subtopics.map((subtopic) => (
                <div
                  key={subtopic.id}
                  onClick={() => toggleSubtopicCompletion(chapter.id, subtopic.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer touch-target flex items-center justify-between ${
                    subtopic.completed
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-100'
                      : 'glass-panel border-white/5 hover:border-cyan-500/30 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {subtopic.completed ? (
                      <CheckSquare className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-500" />
                    )}
                    <span className={`text-xs font-semibold ${subtopic.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                      {subtopic.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono bg-white/5 px-2 py-0.5 rounded text-slate-400">
                    {subtopic.estimatedHours}h
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
