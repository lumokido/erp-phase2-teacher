// src/components/board/ClassTimerModule.tsx
import React, { useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, Sparkles, Flame } from 'lucide-react';
import { useTimerStore } from '../../store/useTimerStore';

export const ClassTimerModule: React.FC = () => {
  const {
    secondsLeft,
    isRunning,
    soundEnabled,
    presetTitle,
    mode,
    startTimer,
    pauseTimer,
    resetTimer,
    setPreset,
    tick,
    toggleFloating,
    toggleSound,
    setMode,
  } = useTimerStore();

  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(() => {
        tick();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, tick]);

  const presets = [
    { label: '5 Min Quick Quiz', seconds: 300, color: 'from-amber-500 to-orange-600' },
    { label: '10 Min Group Activity', seconds: 600, color: 'from-cyan-500 to-blue-600' },
    { label: '15 Min Lab Exercise', seconds: 900, color: 'from-emerald-500 to-teal-600' },
    { label: '45 Min Full Lecture', seconds: 2700, color: 'from-purple-500 to-indigo-600' },
  ];

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return {
      minutes: mins.toString().padStart(2, '0'),
      seconds: secs.toString().padStart(2, '0'),
    };
  };

  const { minutes, seconds } = formatTime(secondsLeft);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Large Smart Board Digital Clock / Timer Card */}
      <div className="p-10 rounded-3xl glass-card-accent border-2 border-purple-500/40 shadow-neon-purple flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-4 py-1.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider border border-purple-500/30 flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" /> {presetTitle}
          </span>
        </div>

        {/* Massive Touch Digital Display */}
        <div className="font-mono font-black text-7xl sm:text-9xl text-white tracking-widest my-6 flex items-center gap-2 drop-shadow-2xl">
          <span className="p-4 rounded-3xl bg-black/40 border border-white/10">{minutes}</span>
          <span className="text-purple-400 animate-pulse">:</span>
          <span className="p-4 rounded-3xl bg-black/40 border border-white/10">{seconds}</span>
        </div>

        {/* Large Touch Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          <button
            onClick={isRunning ? pauseTimer : startTimer}
            className={`px-10 py-5 rounded-3xl font-extrabold text-xl shadow-2xl flex items-center gap-3 transition touch-target ${
              isRunning
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white shadow-neon-purple'
            }`}
          >
            {isRunning ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 fill-white" />}
            {isRunning ? 'Pause Timer' : 'Start Timer'}
          </button>

          <button
            onClick={resetTimer}
            className="w-16 h-16 rounded-3xl glass-card border border-white/10 hover:border-purple-500/40 text-slate-300 hover:text-white flex items-center justify-center transition touch-target"
            title="Reset"
          >
            <RotateCcw className="w-7 h-7" />
          </button>

          <button
            onClick={toggleSound}
            className="w-16 h-16 rounded-3xl glass-card border border-white/10 hover:border-purple-500/40 text-slate-300 hover:text-white flex items-center justify-center transition touch-target"
            title="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-7 h-7 text-purple-400" /> : <VolumeX className="w-7 h-7 text-slate-500" />}
          </button>

          <button
            onClick={toggleFloating}
            className="px-6 py-5 rounded-3xl glass-card border border-white/10 hover:border-purple-500/40 text-slate-200 font-bold text-sm flex items-center gap-2 transition touch-target"
          >
            <Maximize2 className="w-5 h-5 text-cyan-400" /> Floating Mode
          </button>
        </div>
      </div>

      {/* Classroom Presets Bar */}
      <div className="space-y-4">
        <h4 className="font-display font-bold text-lg text-white">Classroom Timer Presets</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setPreset(p.seconds, p.label)}
              className="p-5 rounded-3xl glass-card border border-white/10 hover:border-purple-500/40 text-left transition touch-target space-y-2 group"
            >
              <span className="text-[10px] font-mono font-bold uppercase text-purple-400">Preset #{idx + 1}</span>
              <h5 className="font-bold text-white text-base group-hover:text-cyan-300 transition">{p.label}</h5>
              <p className="text-xs text-slate-400 font-mono">{Math.floor(p.seconds / 60)} Minutes</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
