// src/components/common/Header.tsx
import React, { useState, useEffect } from 'react';
import {
  Clock,
  Search,
  Wifi,
  WifiOff,
  RefreshCw,
  Bell,
  Maximize2,
  Minimize2,
  ChevronDown,
  ShieldCheck,
  Timer as TimerIcon,
  LogOut,
  UserCheck,
  Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useClassStore } from '../../store/useClassStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useTimerStore } from '../../store/useTimerStore';

interface HeaderProps {
  onOpenCommandPalette: () => void;
  onOpenShortcuts: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCommandPalette, onOpenShortcuts }) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [classDropdownOpen, setClassDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const { activeSlot, timetable, setActiveSlot, isOffline, toggleOffline, isSyncing } = useClassStore();
  const { user, role, logout } = useAuthStore();
  const { secondsLeft, isRunning, toggleFloating } = useTimerStore();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <header className="relative z-10 flex items-center justify-between h-20 px-6 glass-panel border-b border-slate-200/80 bg-white/90 text-slate-800">
      {/* Active Class Selector Dropdown */}
      <div className="relative">
        <button
          onClick={() => setClassDropdownOpen(!classDropdownOpen)}
          className="flex items-center gap-3 py-2 px-4 rounded-2xl glass-card border border-slate-200 hover:border-indigo-300 transition touch-target"
        >
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <div className="text-left">
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-indigo-600">Class In Session</span>
            <h2 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
              {activeSlot.subject} ({activeSlot.gradeSection})
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </h2>
          </div>
        </button>

        {/* Dropdown Menu */}
        {classDropdownOpen && (
          <div className="absolute top-16 left-0 w-80 p-2 rounded-2xl glass-panel border border-slate-200 shadow-xl z-50 animate-in fade-in zoom-in duration-150 bg-white">
            <div className="px-3 py-2 text-xs font-bold text-slate-500 border-b border-slate-100">
              Select Assigned Classroom Slot
            </div>
            <div className="space-y-1 mt-1">
              {timetable.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => {
                    setActiveSlot(slot);
                    setClassDropdownOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl transition flex items-center justify-between ${
                    slot.id === activeSlot.id
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div>
                    <p className="font-bold text-sm text-slate-900">{slot.subject}</p>
                    <p className="text-xs text-slate-500">
                      Period {slot.periodNumber} • {slot.startTime} • {slot.room}
                    </p>
                  </div>
                  {slot.isCurrent && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] uppercase font-extrabold border border-emerald-200">
                      LIVE
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Center Controls: Command Palette Search & Class Timer Indicator */}
      <div className="flex items-center gap-4">
        {/* Global Search Bar Button */}
        <button
          onClick={onOpenCommandPalette}
          className="hidden md:flex items-center gap-3 px-4 py-2.5 rounded-2xl glass-card border border-slate-200 hover:border-indigo-300 text-slate-600 hover:text-slate-900 transition w-72 touch-target shadow-sm"
        >
          <Search className="w-5 h-5 text-indigo-600" />
          <span className="text-xs text-slate-400">Search whiteboard, teachers, students...</span>
          <kbd className="ml-auto px-2 py-0.5 text-[10px] font-mono bg-slate-100 rounded text-slate-600 border border-slate-200">⌘K</kbd>
        </button>

        {/* Live Timer Indicator Pill */}
        <button
          onClick={toggleFloating}
          className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl border transition touch-target ${
            isRunning
              ? 'bg-purple-50 border-purple-300 text-purple-700 shadow-sm animate-pulse font-bold'
              : 'glass-card border-slate-200 text-slate-700 hover:border-purple-300'
          }`}
          title="Toggle Floating Classroom Timer"
        >
          <TimerIcon className="w-5 h-5 text-purple-600" />
          <span className="font-mono font-bold text-sm">{formatTimer(secondsLeft)}</span>
        </button>
      </div>

      {/* Right Header Status Bar */}
      <div className="flex items-center gap-3">
        {/* Live Clock Display */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-2xl glass-card border border-slate-200 font-mono text-sm font-bold text-indigo-600">
          <Clock className="w-4 h-4 text-indigo-600" />
          <span>{timeStr}</span>
        </div>

        {/* Sync & Offline Status Badge */}
        <button
          onClick={toggleOffline}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl border text-xs font-bold transition touch-target ${
            isOffline
              ? 'bg-rose-50 border-rose-200 text-rose-700'
              : 'bg-emerald-50 border-emerald-200 text-emerald-700'
          }`}
          title={isOffline ? 'Offline Mode (Click to connect)' : 'Online Auto-Sync Active'}
        >
          {isSyncing ? (
            <RefreshCw className="w-4 h-4 animate-spin text-indigo-600" />
          ) : isOffline ? (
            <WifiOff className="w-4 h-4 text-rose-600" />
          ) : (
            <Wifi className="w-4 h-4 text-emerald-600" />
          )}
          <span className="hidden sm:inline">{isSyncing ? 'Syncing...' : isOffline ? 'Offline' : 'Auto-Sync'}</span>
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="flex items-center justify-center w-11 h-11 rounded-2xl glass-card border border-slate-200 hover:border-indigo-300 text-slate-600 hover:text-slate-900 transition touch-target"
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Smart Board Fullscreen'}
        >
          {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
        </button>

        {/* User Role Badge & Logout */}
        {user && (
          <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-11 h-11 rounded-2xl object-cover border-2 border-indigo-400 shadow-sm"
            />
            <div className="hidden xl:block text-left">
              <p className="font-bold text-sm text-slate-900 leading-tight flex items-center gap-1">
                {user.name}
                {role === 'ADMIN' && <Shield className="w-3.5 h-3.5 text-amber-500 inline fill-amber-100" />}
              </p>
              <p className="text-[11px] font-semibold text-indigo-600">{user.title}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
              title="Log Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
