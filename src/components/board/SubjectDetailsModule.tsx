// src/components/board/SubjectDetailsModule.tsx
import React from 'react';
import { BookOpen, Award, Users, Layers, ExternalLink, Sparkles } from 'lucide-react';
import { useClassStore } from '../../store/useClassStore';

export const SubjectDetailsModule: React.FC = () => {
  const { activeSlot } = useClassStore();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Subject Header */}
      <div className="p-8 rounded-3xl glass-card-accent border border-cyan-500/40 space-y-4">
        <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider">
          Course Overview & Reference
        </span>
        <h2 className="font-display font-extrabold text-3xl text-white">
          {activeSlot.subject} ({activeSlot.subjectCode})
        </h2>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          Comprehensive curriculum focusing on classical electromagnetism, wave physics, thermodynamics, and quantitative problem-solving methodologies for Grade 10 secondary students.
        </p>

        <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-slate-300">
          <div className="px-4 py-2 rounded-xl glass-card border border-white/10 flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-400" /> {activeSlot.gradeSection} • 28 Enrolled
          </div>
          <div className="px-4 py-2 rounded-xl glass-card border border-white/10 flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" /> 4 Credit Hours
          </div>
        </div>
      </div>

      {/* Grid Reference Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-3">
          <h4 className="font-display font-bold text-lg text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" /> Recommended Textbook
          </h4>
          <p className="font-bold text-slate-200 text-sm">Fundamentals of High School Physics (9th Edition)</p>
          <p className="text-xs text-slate-400">Authors: Halliday, Resnick & Walker</p>
          <span className="inline-block px-2.5 py-1 rounded-lg bg-white/5 text-[10px] text-cyan-300 font-mono">
            ISBN: 978-0470469088
          </span>
        </div>

        <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-3">
          <h4 className="font-display font-bold text-lg text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" /> Grading Rubric
          </h4>
          <ul className="text-xs text-slate-300 space-y-2">
            <li className="flex justify-between">
              <span>Mid-Term & Final Exams:</span> <strong className="text-white">40%</strong>
            </li>
            <li className="flex justify-between">
              <span>Smart Board Lab Practicals:</span> <strong className="text-white">30%</strong>
            </li>
            <li className="flex justify-between">
              <span>Homework & Worksheets:</span> <strong className="text-white">20%</strong>
            </li>
            <li className="flex justify-between">
              <span>Class Participation:</span> <strong className="text-white">10%</strong>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-3">
          <h4 className="font-display font-bold text-lg text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" /> External STEM Simulations
          </h4>
          <div className="space-y-2 text-xs">
            <a
              href="https://phet.colorado.edu"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl glass-card border border-white/5 hover:border-cyan-500/30 flex items-center justify-between text-cyan-300"
            >
              <span>PhET Interactive Physics Labs</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
