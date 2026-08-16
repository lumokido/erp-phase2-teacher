// src/pages/ProfilePage.tsx
import React from 'react';
import { User, Mail, Award, BookOpen, ShieldCheck, Shield } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export const ProfilePage: React.FC = () => {
  const { user, role } = useAuthStore();

  if (!user) return null;

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-200 text-slate-800">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl glass-card-accent border border-indigo-200 flex flex-col md:flex-row items-center gap-6">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-24 h-24 rounded-3xl object-cover border-4 border-white shadow-md"
        />
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-mono font-bold border border-indigo-200">
              {user.employeeId}
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold flex items-center gap-1 border border-amber-300">
              <Shield className="w-3.5 h-3.5" /> Role: {role || user.role}
            </span>
          </div>
          <h1 className="font-display font-black text-3xl text-slate-900">{user.name}</h1>
          <p className="text-indigo-600 font-bold text-base">{user.title}</p>
          <p className="text-xs text-slate-500 flex items-center justify-center md:justify-start gap-1 font-medium">
            <Mail className="w-3.5 h-3.5" /> {user.email}
          </p>
        </div>
      </div>

      {/* Profile Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl glass-panel border border-slate-200 bg-white space-y-4 shadow-sm">
          <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600" /> Academic Department & Specialization
          </h3>
          <p className="text-slate-700 font-bold text-base">{user.department}</p>
        </div>

        <div className="p-6 rounded-3xl glass-panel border border-slate-200 bg-white space-y-4 shadow-sm">
          <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-600" /> Assigned Teaching Classes
          </h3>
          <div className="flex flex-wrap gap-2">
            {user.assignedClasses.map((cls, idx) => (
              <span key={idx} className="px-3.5 py-2 rounded-2xl glass-card border border-slate-200 text-slate-800 font-bold text-xs bg-slate-50">
                {cls}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
