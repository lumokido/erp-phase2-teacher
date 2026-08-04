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
  Timer as TimerIcon
} from 'lucide-react';
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

  const { activeSlot, timetable, setActiveSlot, isOffline, toggleOffline, isSyncing } = useClassStore();
  const user = useAuthStore((state) => state.user);
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

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <header className="relative z-10 flex items-center justify-between h-20 px-6 glass-panel border-b border-white/10">
      {/* Active Class Selector Dropdown */}
      <div className="relative">
        <button
          onClick={() => setClassDropdownOpen(!classDropdownOpen)}
          className="flex items-center gap-3 py-2 px-4 rounded-2xl glass-card border border-white/10 hover:border-cyan-500/40 transition touch-target"
        >
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400">Class In Session</span>
            <h2 className="font-display font-bold text-base text-white flex items-center gap-2">
              {activeSlot.subject} ({activeSlot.gradeSection})
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </h2>
          </div>
        </button>

        {/* Dropdown Menu */}
        {classDropdownOpen && (
          <div className="absolute top-16 left-0 w-80 p-2 rounded-2xl glass-panel border border-white/15 shadow-2xl z-50 animate-in fade-in zoom-in duration-150">
            <div className="px-3 py-2 text-xs font-semibold text-slate-400 border-b border-white/10">
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
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                      : 'hover:bg-white/5 text-slate-300'
                  }`}
                >
                  <div>
                    <p className="font-bold text-sm text-white">{slot.subject}</p>
                    <p className="text-xs text-slate-400">
                      Period {slot.periodNumber} • {slot.startTime} • {slot.room}
                    </p>
                  </div>
                  {slot.isCurrent && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 text-[10px] uppercase font-bold">
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
          className="hidden md:flex items-center gap-3 px-4 py-2.5 rounded-2xl glass-card border border-white/10 hover:border-cyan-500/30 text-slate-300 hover:text-white transition w-72 touch-target"
        >
          <Search className="w-5 h-5 text-cyan-400" />
          <span className="text-xs text-slate-400">Search whiteboard, students...</span>
          <kbd className="ml-auto px-2 py-0.5 text-[10px] font-mono bg-white/10 rounded text-slate-300">⌘K</kbd>
        </button>

        {/* Live Timer Indicator Pill */}
        <button
          onClick={toggleFloating}
          className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl border transition touch-target ${
            isRunning
              ? 'bg-purple-950/40 border-purple-500/50 text-purple-300 shadow-neon-purple animate-pulse'
              : 'glass-card border-white/10 text-slate-300 hover:border-purple-500/30'
          }`}
          title="Toggle Floating Classroom Timer"
        >
          <TimerIcon className="w-5 h-5 text-purple-400" />
          <span className="font-mono font-bold text-sm">{formatTimer(secondsLeft)}</span>
        </button>
      </div>

      {/* Right Header Status Bar */}
      <div className="flex items-center gap-3">
        {/* Live Clock Display */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-2xl glass-card border border-white/10 font-mono text-sm font-semibold text-cyan-300">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span>{timeStr}</span>
        </div>

        {/* Sync & Offline Status Badge */}
        <button
          onClick={toggleOffline}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl border text-xs font-semibold transition touch-target ${
            isOffline
              ? 'bg-rose-950/40 border-rose-500/50 text-rose-300'
              : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
          }`}
          title={isOffline ? 'Offline Mode (Click to connect)' : 'Online Auto-Sync Active'}
        >
          {isSyncing ? (
            <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
          ) : isOffline ? (
            <WifiOff className="w-4 h-4 text-rose-400" />
          ) : (
            <Wifi className="w-4 h-4 text-emerald-400" />
          )}
          <span className="hidden sm:inline">{isSyncing ? 'Syncing...' : isOffline ? 'Offline' : 'Auto-Sync'}</span>
        </button>

        {/* Smart Board Shortcuts Button */}
        <button
          onClick={onOpenShortcuts}
          className="hidden sm:flex items-center justify-center w-11 h-11 rounded-2xl glass-card border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-white transition touch-target"
          title="Keyboard Shortcuts"
        >
          <ShieldCheck className="w-5 h-5 text-slate-300" />
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="flex items-center justify-center w-11 h-11 rounded-2xl glass-card border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-white transition touch-target"
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Smart Board Fullscreen'}
        >
          {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button className="flex items-center justify-center w-11 h-11 rounded-2xl glass-card border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-white transition touch-target">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          </button>
        </div>

        {/* Teacher Avatar Badge */}
        {user && (
          <div className="flex items-center gap-3 pl-2 border-l border-white/10">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-11 h-11 rounded-2xl object-cover border-2 border-cyan-400/50 shadow-neon-blue"
            />
            <div className="hidden xl:block text-left">
              <p className="font-bold text-sm text-white leading-tight">{user.name}</p>
              <p className="text-[11px] text-cyan-400">{user.title}</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
