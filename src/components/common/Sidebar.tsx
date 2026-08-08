// src/components/common/Sidebar.tsx
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  Presentation,
  Users,
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
  Zap,
  ShieldAlert
} from 'lucide-react';
import { useClassStore } from '../../store/useClassStore';
import { useAuthStore } from '../../store/useAuthStore';

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const activeSlot = useClassStore((state) => state.activeSlot);
  const role = useAuthStore((state) => state.role);

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', badge: null },
    { label: 'Teachers Directory', icon: Users, path: '/teachers', badge: role === 'ADMIN' ? 'Admin' : 'Directory' },
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
      className={`relative z-20 flex flex-col h-screen glass-panel border-r border-slate-200/80 bg-white/90 text-slate-800 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-20 px-4 border-b border-slate-200/80">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-500 flex items-center justify-center shadow-md">
              <Monitor className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-display font-black text-xl tracking-tight text-slate-900 flex items-center gap-1.5">
                Digital Board <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
              </h1>
              <p className="text-[11px] font-bold text-indigo-600 tracking-wide uppercase flex items-center gap-1">
                Smart Classroom OS {role === 'ADMIN' && <span className="bg-amber-100 text-amber-800 text-[9px] px-1.5 py-0.2 rounded font-extrabold">ADMIN</span>}
              </p>
            </div>
          </div>
        ) : (
          <div className="w-11 h-11 mx-auto rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-500 flex items-center justify-center shadow-md">
            <Monitor className="w-6 h-6 text-white" />
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 items-center justify-center text-slate-600 hover:text-slate-900 transition"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Active Class Touch Launcher Banner */}
      {!collapsed && (
        <div className="mx-3 my-3 p-3.5 rounded-2xl glass-card-accent border border-indigo-200">
          <div className="flex items-center justify-between text-xs text-indigo-700 font-semibold mb-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              CURRENT SESSION
            </span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] uppercase font-bold">
              {activeSlot.room}
            </span>
          </div>
          <p className="font-display font-bold text-sm text-slate-900 truncate">{activeSlot.subject}</p>
          <p className="text-xs text-slate-600 mb-2 truncate">{activeSlot.topic}</p>
          <NavLink
            to="/board"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 text-white font-bold text-xs shadow-md hover:brightness-105 active:scale-95 transition"
          >
            <Zap className="w-4 h-4 text-amber-300 fill-amber-300" /> Open Digital Board
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
                  ? 'bg-gradient-to-r from-indigo-50 to-sky-50 text-indigo-700 border border-indigo-200 font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <Icon
                  className={`w-5 h-5 flex-shrink-0 ${
                    isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-700'
                  }`}
                />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </div>

              {!collapsed && item.badge && (
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    item.activeGlow
                      ? 'bg-indigo-600 text-white shadow-sm animate-pulse'
                      : item.badge === 'Admin'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
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
        <div className="p-4 border-t border-slate-200/80 text-xs text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="font-mono text-slate-700 font-medium">Smart Board Active</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">v2.4</span>
        </div>
      )}
    </aside>
  );
};
