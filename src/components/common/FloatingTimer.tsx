// src/components/common/FloatingTimer.tsx
import React, { useEffect } from 'react';
import { Play, Pause, RotateCcw, X, Timer, Volume2, VolumeX } from 'lucide-react';
import { useTimerStore } from '../../store/useTimerStore';

export const FloatingTimer: React.FC = () => {
  const {
    secondsLeft,
    isRunning,
    isFloating,
    soundEnabled,
    presetTitle,
    startTimer,
    pauseTimer,
    resetTimer,
    tick,
    toggleFloating,
    toggleSound
  } = useTimerStore();

  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(() => {
        tick();
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, tick]);

  if (!isFloating) return null;

  const formatTime = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center gap-4 p-4 rounded-3xl glass-panel border-2 border-purple-300 shadow-xl bg-white animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
          <Timer className="w-7 h-7 animate-pulse" />
        </div>
        <div>
          <span className="text-[10px] uppercase font-extrabold text-purple-600 tracking-wider">
            {presetTitle}
          </span>
          <p className="font-mono font-extrabold text-3xl text-slate-900 tracking-wider leading-none">
            {formatTime(secondsLeft)}
          </p>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
        <button
          onClick={isRunning ? pauseTimer : startTimer}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold transition touch-target ${
            isRunning ? 'bg-amber-500 hover:bg-amber-600 shadow-md' : 'bg-purple-600 hover:bg-purple-700 shadow-md'
          }`}
          title={isRunning ? 'Pause Timer' : 'Start Timer'}
        >
          {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
        </button>

        <button
          onClick={resetTimer}
          className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition touch-target"
          title="Reset Timer"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        <button
          onClick={toggleSound}
          className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition touch-target"
          title={soundEnabled ? 'Mute Chime' : 'Unmute Chime'}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5 text-purple-600" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
        </button>

        <button
          onClick={toggleFloating}
          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 ml-1"
          title="Close Floating Widget"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
