// src/pages/ProfilePage.tsx
import React from 'react';
import { User, Mail, Award, BookOpen, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export const ProfilePage: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl glass-card-accent border border-cyan-500/40 flex flex-col md:flex-row items-center gap-6">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-24 h-24 rounded-3xl object-cover border-4 border-cyan-400 shadow-neon-blue"
        />
        <div className="space-y-1 text-center md:text-left">
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            {user.employeeId}
          </span>
          <h1 className="font-display font-black text-3xl text-white">{user.name}</h1>
          <p className="text-cyan-300 font-semibold">{user.title}</p>
          <p className="text-xs text-slate-400 flex items-center justify-center md:justify-start gap-1">
            <Mail className="w-3.5 h-3.5" /> {user.email}
          </p>
        </div>
      </div>

      {/* Profile Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
          <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" /> Academic Department
          </h3>
          <p className="text-slate-200 font-medium text-base">{user.department}</p>
        </div>

        <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
          <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" /> Assigned Teaching Classes
          </h3>
          <div className="flex flex-wrap gap-2">
            {user.assignedClasses.map((cls, idx) => (
              <span key={idx} className="px-3.5 py-2 rounded-2xl glass-card border border-white/10 text-white font-bold text-xs">
                {cls}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
