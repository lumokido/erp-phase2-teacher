// src/components/board/WorksheetViewerModule.tsx
import React, { useState } from 'react';
import { FileSpreadsheet, Eye, EyeOff, Lightbulb, CheckCircle, HelpCircle, Sparkles } from 'lucide-react';
import { useClassStore } from '../../store/useClassStore';

export const WorksheetViewerModule: React.FC = () => {
  const { worksheet } = useClassStore();
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});

  const toggleAnswer = (id: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleHint = (id: string) => {
    setRevealedHints((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Worksheet Banner */}
      <div className="p-6 rounded-3xl glass-panel border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase">
            {worksheet.gradeSection} • {worksheet.subject}
          </span>
          <h3 className="font-display font-bold text-2xl text-white mt-1 flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-indigo-400" /> {worksheet.title}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const all: Record<string, boolean> = {};
              worksheet.questions.forEach((q) => (all[q.id] = true));
              setRevealedAnswers(all);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-500/30 text-xs font-bold transition touch-target"
          >
            <Eye className="w-4 h-4" /> Reveal All Solutions
          </button>
        </div>
      </div>

      {/* Questions Stack */}
      <div className="space-y-5">
        {worksheet.questions.map((q) => (
          <div
            key={q.id}
            className="p-6 rounded-3xl glass-card border border-white/10 hover:border-indigo-500/30 transition space-y-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-300 font-display font-extrabold text-lg flex items-center justify-center flex-shrink-0">
                  Q{q.number}
                </span>
                <div>
                  <p className="text-white font-semibold text-lg leading-relaxed">{q.questionText}</p>
                  {q.options && (
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      {q.options.map((opt, oIdx) => (
                        <div key={oIdx} className="p-3 rounded-xl bg-white/5 text-slate-300 text-sm font-medium">
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Answer & Hint Reveal Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleHint(q.id)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold transition"
                >
                  <Lightbulb className="w-4 h-4" /> {revealedHints[q.id] ? 'Hide Hint' : 'Show Hint'}
                </button>

                <button
                  onClick={() => toggleAnswer(q.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
                    revealedAnswers[q.id]
                      ? 'bg-emerald-500 text-white shadow-neon-emerald'
                      : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-500/30'
                  }`}
                >
                  {revealedAnswers[q.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {revealedAnswers[q.id] ? 'Hide Solution' : 'Reveal Answer Key'}
                </button>
              </div>

              {revealedHints[q.id] && (
                <div className="w-full p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200 text-xs font-medium">
                  💡 <strong>Teacher Hint:</strong> {q.hint}
                </div>
              )}

              {revealedAnswers[q.id] && (
                <div className="w-full p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-sm font-semibold animate-in fade-in">
                  <span className="text-xs uppercase font-bold text-emerald-400 block mb-1">Official Solution</span>
                  {q.answerKey}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
