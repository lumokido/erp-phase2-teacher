// src/components/board/AttendanceGridModule.tsx
import React, { useState } from 'react';
import { UserCheck, UserX, Clock, ShieldAlert, CheckCircle2, Search, Sparkles, Filter } from 'lucide-react';
import { useClassStore } from '../../store/useClassStore';
import { AttendanceStatus } from '../../types';

export const AttendanceGridModule: React.FC = () => {
  const { attendance, updateStudentAttendance, bulkMarkAttendance } = useClassStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | AttendanceStatus>('all');

  const filteredStudents = attendance.students.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.rollNumber.toString().includes(searchQuery);
    const matchesFilter = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const presentPercentage = Math.round((attendance.presentCount / attendance.totalStudents) * 100);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Attendance Analytics Top Bar */}
      <div className="p-6 rounded-3xl glass-panel border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Metric Cards */}
        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
          <div className="flex-1 min-w-[130px] p-4 rounded-2xl glass-card border border-emerald-500/30 text-center">
            <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Present</span>
            <p className="font-display font-extrabold text-2xl text-emerald-300">{attendance.presentCount}</p>
          </div>

          <div className="flex-1 min-w-[130px] p-4 rounded-2xl glass-card border border-rose-500/30 text-center">
            <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider">Absent</span>
            <p className="font-display font-extrabold text-2xl text-rose-300">{attendance.absentCount}</p>
          </div>

          <div className="flex-1 min-w-[130px] p-4 rounded-2xl glass-card border border-amber-500/30 text-center">
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Late</span>
            <p className="font-display font-extrabold text-2xl text-amber-300">{attendance.lateCount}</p>
          </div>

          <div className="flex-1 min-w-[130px] p-4 rounded-2xl glass-card border border-cyan-500/30 text-center">
            <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">Excused</span>
            <p className="font-display font-extrabold text-2xl text-cyan-300">{attendance.excusedCount}</p>
          </div>
        </div>

        {/* Attendance Rate Progress Gauge */}
        <div className="w-full lg:w-72 p-4 rounded-2xl glass-card border border-white/10 space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-300">Class Attendance Rate</span>
            <span className="text-cyan-400 font-bold">{presentPercentage}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-500"
              style={{ width: `${presentPercentage}%` }}
            />
          </div>
        </div>

        {/* Bulk Action Touch Buttons */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
          <button
            onClick={() => bulkMarkAttendance('present')}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 font-semibold text-xs transition touch-target"
          >
            <CheckCircle2 className="w-4 h-4" /> Mark All Present
          </button>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student name or roll #..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl glass-card border border-white/10 text-white placeholder-slate-400 outline-none focus:border-cyan-500/50 text-sm font-medium"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1">
          {(['all', 'present', 'absent', 'late', 'excused'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase transition touch-target ${
                statusFilter === filter
                  ? 'bg-cyan-500 text-white shadow-neon-blue'
                  : 'glass-card border border-white/10 text-slate-300 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Touch-Friendly Student Grid (designed for Smart Board fingers/stylus) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            className={`p-4 rounded-3xl glass-card border transition-all duration-200 flex flex-col items-center text-center relative ${
              student.status === 'present'
                ? 'border-emerald-500/40 bg-emerald-950/20'
                : student.status === 'absent'
                ? 'border-rose-500/40 bg-rose-950/20'
                : student.status === 'late'
                ? 'border-amber-500/40 bg-amber-950/20'
                : 'border-cyan-500/40 bg-cyan-950/20'
            }`}
          >
            {/* Roll Number Badge */}
            <span className="absolute top-3 left-3 px-2 py-0.5 rounded-lg bg-black/40 text-slate-300 text-[10px] font-mono font-bold">
              #{student.rollNumber}
            </span>

            {/* Avatar */}
            <img
              src={student.avatar}
              alt={student.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20 my-2 shadow-lg"
            />

            <h4 className="font-bold text-sm text-white truncate w-full">{student.name}</h4>
            <p className="text-[11px] text-slate-400 mb-3 uppercase font-semibold">{student.status}</p>

            {/* 4 Status Toggle Touch Buttons */}
            <div className="grid grid-cols-4 gap-1 w-full pt-2 border-t border-white/10">
              <button
                onClick={() => updateStudentAttendance(student.id, 'present')}
                className={`py-2 rounded-xl flex items-center justify-center transition touch-target ${
                  student.status === 'present'
                    ? 'bg-emerald-500 text-white font-bold'
                    : 'bg-white/5 text-slate-400 hover:bg-emerald-500/20 hover:text-emerald-300'
                }`}
                title="Present"
              >
                <UserCheck className="w-4 h-4" />
              </button>

              <button
                onClick={() => updateStudentAttendance(student.id, 'absent')}
                className={`py-2 rounded-xl flex items-center justify-center transition touch-target ${
                  student.status === 'absent'
                    ? 'bg-rose-500 text-white font-bold'
                    : 'bg-white/5 text-slate-400 hover:bg-rose-500/20 hover:text-rose-300'
                }`}
                title="Absent"
              >
                <UserX className="w-4 h-4" />
              </button>

              <button
                onClick={() => updateStudentAttendance(student.id, 'late')}
                className={`py-2 rounded-xl flex items-center justify-center transition touch-target ${
                  student.status === 'late'
                    ? 'bg-amber-500 text-white font-bold'
                    : 'bg-white/5 text-slate-400 hover:bg-amber-500/20 hover:text-amber-300'
                }`}
                title="Late"
              >
                <Clock className="w-4 h-4" />
              </button>

              <button
                onClick={() => updateStudentAttendance(student.id, 'excused')}
                className={`py-2 rounded-xl flex items-center justify-center transition touch-target ${
                  student.status === 'excused'
                    ? 'bg-cyan-500 text-white font-bold'
                    : 'bg-white/5 text-slate-400 hover:bg-cyan-500/20 hover:text-cyan-300'
                }`}
                title="Excused"
              >
                <ShieldAlert className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
