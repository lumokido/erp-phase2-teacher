// src/pages/TimetablePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Clock, MapPin, Presentation, Users, Sparkles, CheckCircle, Zap } from 'lucide-react';
import { useClassStore } from '../store/useClassStore';
import { TimetableSlot } from '../types';

export const TimetablePage: React.FC = () => {
  const { timetable, activeSlot, setActiveSlot } = useClassStore();
  const navigate = useNavigate();

  const handleLaunchBoard = (slot: TimetableSlot) => {
    setActiveSlot(slot);
    navigate('/board');
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl glass-card-accent border border-cyan-500/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="px-3.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider border border-cyan-400/30">
            Smart Classroom Schedule
          </span>
          <h1 className="font-display font-black text-3xl text-white mt-2 flex items-center gap-2">
            Today's Timetable & Assigned Classes <Sparkles className="w-6 h-6 text-cyan-400" />
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Tap any class slot to switch active board workspace or open Digital Board immediately.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-5 py-3 rounded-2xl glass-card border border-white/10 text-cyan-300 text-sm font-semibold flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-cyan-400" />
            <span>Friday, July 31, 2026</span>
          </div>
        </div>
      </div>

      {/* Timeline Schedule Cards List */}
      <div className="space-y-4">
        {timetable.map((slot) => {
          const isSelected = slot.id === activeSlot.id;
          return (
            <div
              key={slot.id}
              className={`p-6 rounded-3xl glass-card border transition-all duration-200 flex flex-col lg:flex-row lg:items-center justify-between gap-6 ${
                isSelected
                  ? 'border-cyan-500/50 bg-cyan-950/20 shadow-neon-blue'
                  : 'border-white/10 hover:border-cyan-500/30'
              }`}
            >
              {/* Left Slot Details */}
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-300 font-display font-extrabold text-xl flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-[10px] text-cyan-400 uppercase font-bold">PERIOD</span>
                  #{slot.periodNumber}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 text-xs font-bold font-mono">
                      {slot.startTime} - {slot.endTime}
                    </span>
                    {slot.isCurrent && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 text-[10px] font-bold uppercase animate-pulse">
                        CURRENTLY ACTIVE
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white">{slot.subject}</h3>
                  <p className="text-sm text-cyan-300 font-medium">{slot.topic}</p>

                  <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-cyan-400" /> {slot.room}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-purple-400" /> {slot.gradeSection} ({slot.totalStudents} Students)
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Touch Actions */}
              <div className="flex items-center gap-3 self-end lg:self-center">
                <button
                  onClick={() => handleLaunchBoard(slot)}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-extrabold text-sm shadow-neon-blue hover:brightness-110 active:scale-95 transition touch-target"
                >
                  <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300" /> Launch Digital Board
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
