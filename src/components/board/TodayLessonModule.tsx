// src/components/board/TodayLessonModule.tsx
import React from 'react';
import { CheckCircle2, Circle, Clock, BookOpen, HelpCircle, Sparkles, Flame, Target } from 'lucide-react';
import { useClassStore } from '../../store/useClassStore';

export const TodayLessonModule: React.FC = () => {
  const { lessonPlan, toggleLessonStep } = useClassStore();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Lesson Header Banner */}
      <div className="p-6 rounded-3xl glass-card-accent border border-cyan-500/40 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider border border-cyan-400/30">
              {lessonPlan.unitTitle}
            </span>
            <h2 className="font-display font-bold text-2xl text-white mt-2 flex items-center gap-2">
              {lessonPlan.lessonTitle} <Sparkles className="w-5 h-5 text-yellow-400" />
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">{lessonPlan.summary}</p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl glass-card border border-white/10 text-cyan-300 text-sm font-semibold">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>{lessonPlan.durationMinutes} Minutes Session</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Layout: Objectives & Teaching Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Learning Objectives & Key Vocabulary */}
        <div className="space-y-6">
          {/* Objectives Card */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
            <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-cyan-400" /> Learning Objectives
            </h3>
            <div className="space-y-3">
              {lessonPlan.objectives.map((obj, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl glass-card border border-white/5">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-sm text-slate-200 font-medium">{obj}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Vocabulary Pills */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
            <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" /> Key Terminology
            </h3>
            <div className="flex flex-wrap gap-2">
              {lessonPlan.keyVocabulary.map((vocab, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-2 rounded-xl glass-card border border-purple-500/30 text-purple-200 text-xs font-semibold"
                >
                  {vocab}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Center & Right Column: Interactive Teaching Steps Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Teaching Steps Interactive Card */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" /> Interactive Class Flow Checklist
              </h3>
              <span className="text-xs font-semibold text-slate-400">
                Tap steps as you teach on Smart Board
              </span>
            </div>

            <div className="space-y-3">
              {lessonPlan.teachingSteps.map((step) => (
                <div
                  key={step.stepNumber}
                  onClick={() => toggleLessonStep(step.stepNumber)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer touch-target flex items-start gap-4 ${
                    step.completed
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-100'
                      : 'glass-card border-white/10 hover:border-cyan-500/30 text-slate-200'
                  }`}
                >
                  <button className="mt-0.5">
                    {step.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 fill-emerald-400/20" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-500" />
                    )}
                  </button>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-bold text-base ${step.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                        Step {step.stepNumber}: {step.title}
                      </h4>
                      <span className="px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 text-xs font-mono">
                        {step.duration}
                      </span>
                    </div>
                    <p className={`text-xs mt-1 ${step.completed ? 'text-slate-500' : 'text-slate-300'}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Discussion Prompts Card */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
            <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-cyan-400" /> Socratic Discussion Questions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {lessonPlan.discussionPrompts.map((prompt, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl glass-card border border-cyan-500/20 hover:border-cyan-500/40 transition"
                >
                  <p className="text-xs font-bold text-cyan-400 mb-1">PROMPT #{idx + 1}</p>
                  <p className="text-xs text-slate-200 font-medium leading-relaxed">{prompt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
