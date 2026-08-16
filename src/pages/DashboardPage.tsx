// src/pages/DashboardPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Presentation,
  UserCheck,
  BookOpenCheck,
  Video,
  Clock,
  Zap,
  TrendingUp,
  ArrowRight,
  Users,
  Shield
} from 'lucide-react';
import { useClassStore } from '../store/useClassStore';
import { useAuthStore } from '../store/useAuthStore';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { activeSlot, attendance, homeworkList, timetable } = useClassStore();
  const { user, role } = useAuthStore();

  const presentPercentage = Math.round((attendance.presentCount / attendance.totalStudents) * 100);

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-200 text-slate-800">
      {/* Welcome Banner */}
      <div className="p-8 rounded-3xl glass-card-accent border border-indigo-200 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-extrabold uppercase tracking-wider border border-indigo-200">
              Active Classroom Workspace
            </span>
            {role === 'ADMIN' && (
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold flex items-center gap-1 border border-amber-300">
                <Shield className="w-3.5 h-3.5" /> Principal Admin Role
              </span>
            )}
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Welcome back, {user?.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-sm text-slate-600">
            You are conducting <strong className="text-indigo-700 font-bold">{activeSlot.subject}</strong> in {activeSlot.room}. Tap below to launch your interactive Smart Board workspace or access the admin directory.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => navigate('/teachers')}
            className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white text-indigo-700 border border-indigo-200 font-bold text-sm shadow-sm hover:bg-indigo-50 transition touch-target"
          >
            <Users className="w-5 h-5 text-indigo-600" /> Teachers Directory
          </button>
          <button
            onClick={() => navigate('/board')}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-sky-600 text-white font-extrabold text-base shadow-md hover:brightness-105 active:scale-95 transition touch-target"
          >
            <Zap className="w-6 h-6 text-amber-300 fill-amber-300 animate-pulse" /> Launch Digital Board
          </button>
        </div>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          onClick={() => navigate('/attendance')}
          className="p-6 rounded-3xl glass-card border border-slate-200 hover:border-emerald-300 transition cursor-pointer touch-target space-y-3 bg-white hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-emerald-700">Class Attendance</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <p className="font-display font-extrabold text-3xl text-slate-900">{presentPercentage}%</p>
          <p className="text-xs text-slate-500">{attendance.presentCount} of {attendance.totalStudents} Present Today</p>
        </div>

        <div
          onClick={() => navigate('/board')}
          className="p-6 rounded-3xl glass-card border border-slate-200 hover:border-indigo-300 transition cursor-pointer touch-target space-y-3 bg-white hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-indigo-700">Syllabus Completion</span>
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <p className="font-display font-extrabold text-3xl text-slate-900">65%</p>
          <p className="text-xs text-slate-500">Chapter 4: Electromagnetic Induction</p>
        </div>

        <div
          onClick={() => navigate('/homework')}
          className="p-6 rounded-3xl glass-card border border-slate-200 hover:border-purple-300 transition cursor-pointer touch-target space-y-3 bg-white hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-purple-700">Active Homework</span>
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <BookOpenCheck className="w-5 h-5" />
            </div>
          </div>
          <p className="font-display font-extrabold text-3xl text-slate-900">{homeworkList.length}</p>
          <p className="text-xs text-slate-500">Assignments Currently Assigned</p>
        </div>

        <div
          onClick={() => navigate('/teachers')}
          className="p-6 rounded-3xl glass-card border border-slate-200 hover:border-sky-300 transition cursor-pointer touch-target space-y-3 bg-white hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-sky-700">Teachers Directory</span>
            <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="font-display font-extrabold text-3xl text-slate-900">3</p>
          <p className="text-xs text-slate-500">Registered School Teachers</p>
        </div>
      </div>

      {/* Today's Schedule Overview */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-200 bg-white space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" /> Today's Teaching Schedule
          </h3>
          <button
            onClick={() => navigate('/timetable')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
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
                  ? 'bg-indigo-50/80 border-indigo-300 shadow-sm'
                  : 'glass-card border-slate-200 hover:border-indigo-200'
              }`}
            >
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-indigo-600 font-mono font-bold">Period #{slot.periodNumber} • {slot.startTime}</span>
                {slot.isCurrent && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold border border-emerald-200">
                    LIVE
                  </span>
                )}
              </div>
              <h4 className="font-bold text-slate-900 text-base truncate">{slot.subject}</h4>
              <p className="text-xs text-slate-500 truncate">{slot.room} • {slot.gradeSection}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
