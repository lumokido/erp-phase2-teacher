// src/components/common/Sidebar.tsx
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  Presentation,
  BookOpenCheck,
  FileSpreadsheet,
  FolderOpen,
  BookMarked,
  UserCheck,
  Megaphone,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Sparkles,
  Zap
} from 'lucide-react';
import { useClassStore } from '../../store/useClassStore';

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const activeSlot = useClassStore((state) => state.activeSlot);

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', badge: null },
    { label: "Today's Classes", icon: CalendarDays, path: '/timetable', badge: '5' },
    { label: 'Digital Board', icon: Presentation, path: '/board', badge: 'LIVE', activeGlow: true },
    { label: 'Homework', icon: BookOpenCheck, path: '/homework', badge: '3' },
    { label: 'Worksheets', icon: FileSpreadsheet, path: '/worksheets', badge: null },
    { label: 'Files & Materials', icon: FolderOpen, path: '/files', badge: null },
    { label: 'Teacher Diary', icon: BookMarked, path: '/diary', badge: null },
    { label: 'Attendance', icon: UserCheck, path: '/attendance', badge: '96%' },
    { label: 'Announcements', icon: Megaphone, path: '/announcements', badge: '1' },
    { label: 'Profile', icon: User, path: '/profile', badge: null },
    { label: 'Settings', icon: Settings, path: '/settings', badge: null },
  ];

  return (
    <aside
      className={`relative z-20 flex flex-col h-screen glass-panel border-r border-white/10 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-20 px-4 border-b border-white/10">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-neon-blue">
              <Monitor className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl tracking-tight text-white flex items-center gap-1.5">
                Digital Board <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              </h1>
              <p className="text-xs font-medium text-cyan-400/90 tracking-wide uppercase">Smart Classroom OS</p>
            </div>
          </div>
        ) : (
          <div className="w-11 h-11 mx-auto rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-neon-blue">
            <Monitor className="w-6 h-6 text-white" />
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 items-center justify-center text-slate-300 hover:text-white transition"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Active Class Touch Launcher Banner */}
      {!collapsed && (
        <div className="mx-3 my-3 p-3 rounded-2xl glass-card border border-cyan-500/30 bg-cyan-950/20">
          <div className="flex items-center justify-between text-xs text-cyan-300 font-semibold mb-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              CURRENT SESSION
            </span>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] uppercase">
              {activeSlot.room}
            </span>
          </div>
          <p className="font-display font-bold text-sm text-white truncate">{activeSlot.subject}</p>
          <p className="text-xs text-slate-400 mb-2 truncate">{activeSlot.topic}</p>
          <NavLink
            to="/board"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-xs shadow-neon-blue hover:brightness-110 active:scale-95 transition"
          >
            <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" /> Open Digital Board
          </NavLink>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-2 px-3 space-y-1 custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center justify-between touch-target px-3.5 py-3 rounded-2xl transition-all font-medium text-sm ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/40 shadow-neon-blue'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <Icon
                  className={`w-6 h-6 flex-shrink-0 ${
                    isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </div>

              {!collapsed && item.badge && (
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    item.activeGlow
                      ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 shadow-neon-blue animate-pulse'
                      : 'bg-white/10 text-slate-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Smart Board Status Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-white/10 text-xs text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="font-mono text-slate-300">4K Touch Board Connected</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">v2.4</span>
        </div>
      )}
    </aside>
  );
};
