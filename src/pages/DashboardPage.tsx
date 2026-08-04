// src/pages/DashboardPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Presentation,
  UserCheck,
  BookOpenCheck,
  Video,
  Clock,
  Sparkles,
  Zap,
  TrendingUp,
  FolderOpen,
  ArrowRight
} from 'lucide-react';
import { useClassStore } from '../store/useClassStore';
import { useAuthStore } from '../store/useAuthStore';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { activeSlot, attendance, homeworkList, syllabus, timetable } = useClassStore();
  const user = useAuthStore((state) => state.user);

  const presentPercentage = Math.round((attendance.presentCount / attendance.totalStudents) * 100);

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-200">
      {/* Welcome Banner */}
      <div className="p-8 rounded-3xl glass-card-accent border border-cyan-500/40 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider border border-cyan-400/30">
            Active Classroom Workspace
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            Welcome back, {user?.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-sm text-slate-300">
            You are conducting <strong className="text-cyan-300">{activeSlot.subject}</strong> in {activeSlot.room}. Tap below to launch your interactive Smart Board workspace.
          </p>
        </div>

        <button
          onClick={() => navigate('/board')}
          className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-extrabold text-base shadow-neon-blue hover:brightness-110 active:scale-95 transition touch-target flex-shrink-0"
        >
          <Zap className="w-6 h-6 text-yellow-300 fill-yellow-300 animate-pulse" /> Launch Digital Board Now
        </button>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          onClick={() => navigate('/attendance')}
          className="p-6 rounded-3xl glass-card border border-white/10 hover:border-emerald-500/40 transition cursor-pointer touch-target space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-emerald-400">Class Attendance</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <p className="font-display font-extrabold text-3xl text-white">{presentPercentage}%</p>
          <p className="text-xs text-slate-400">{attendance.presentCount} of {attendance.totalStudents} Present Today</p>
        </div>

        <div
          onClick={() => navigate('/board')}
          className="p-6 rounded-3xl glass-card border border-white/10 hover:border-cyan-500/40 transition cursor-pointer touch-target space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-cyan-400">Syllabus Completion</span>
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <p className="font-display font-extrabold text-3xl text-white">65%</p>
          <p className="text-xs text-slate-400">Chapter 4: Electromagnetic Induction</p>
        </div>

        <div
          onClick={() => navigate('/homework')}
          className="p-6 rounded-3xl glass-card border border-white/10 hover:border-purple-500/40 transition cursor-pointer touch-target space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-purple-400">Active Homework</span>
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <BookOpenCheck className="w-5 h-5" />
            </div>
          </div>
          <p className="font-display font-extrabold text-3xl text-white">{homeworkList.length}</p>
          <p className="text-xs text-slate-400">Assignments Currently Assigned</p>
        </div>

        <div
          onClick={() => navigate('/board')}
          className="p-6 rounded-3xl glass-card border border-white/10 hover:border-rose-500/40 transition cursor-pointer touch-target space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-rose-400">Lesson Recordings</span>
            <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <Video className="w-5 h-5" />
            </div>
          </div>
          <p className="font-display font-extrabold text-3xl text-white">2</p>
          <p className="text-xs text-slate-400">Saved Video Sessions This Week</p>
        </div>
      </div>

      {/* Today's Schedule Overview */}
      <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" /> Today's Teaching Schedule
          </h3>
          <button
            onClick={() => navigate('/timetable')}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            View Full Timetable <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {timetable.slice(0, 3).map((slot) => (
            <div
              key={slot.id}
              onClick={() => {
                useClassStore.getState().setActiveSlot(slot);
                navigate('/board');
              }}
              className={`p-5 rounded-2xl border transition cursor-pointer touch-target ${
                slot.id === activeSlot.id
                  ? 'bg-cyan-950/30 border-cyan-500/40'
                  : 'glass-card border-white/5 hover:border-cyan-500/20'
              }`}
            >
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-cyan-400 font-mono">Period #{slot.periodNumber} • {slot.startTime}</span>
                {slot.isCurrent && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    LIVE
                  </span>
                )}
              </div>
              <h4 className="font-bold text-white text-base truncate">{slot.subject}</h4>
              <p className="text-xs text-slate-400 truncate">{slot.room} • {slot.gradeSection}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
