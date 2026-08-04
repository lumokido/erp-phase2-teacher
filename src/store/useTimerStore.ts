// src/store/useTimerStore.ts
import { create } from 'zustand';

interface TimerState {
  secondsLeft: number;
  initialSeconds: number;
  isRunning: boolean;
  isFloating: boolean;
  soundEnabled: boolean;
  mode: 'countdown' | 'stopwatch';
  presetTitle: string;

  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  setPreset: (seconds: number, title: string) => void;
  tick: () => void;
  toggleFloating: () => void;
  toggleSound: () => void;
  setMode: (mode: 'countdown' | 'stopwatch') => void;
}

export const useTimerStore = create<TimerState>((set, get) => ({
  secondsLeft: 300, // 5 minutes default
  initialSeconds: 300,
  isRunning: false,
  isFloating: false,
  soundEnabled: true,
  mode: 'countdown',
  presetTitle: '5 Min Quick Quiz',

  startTimer: () => set({ isRunning: true }),
  pauseTimer: () => set({ isRunning: false }),
  resetTimer: () => set((state) => ({ secondsLeft: state.initialSeconds, isRunning: false })),

  setPreset: (seconds, title) => {
    set({
      secondsLeft: seconds,
      initialSeconds: seconds,
      presetTitle: title,
      isRunning: false,
      mode: 'countdown',
    });
  },

  tick: () => {
    const { mode, secondsLeft, isRunning } = get();
    if (!isRunning) return;

    if (mode === 'countdown') {
      if (secondsLeft > 0) {
        set({ secondsLeft: secondsLeft - 1 });
      } else {
        set({ isRunning: false });
        // Sound trigger simulation
      }
    } else {
      set({ secondsLeft: secondsLeft + 1 });
    }
  },

  toggleFloating: () => set((state) => ({ isFloating: !state.isFloating })),
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  setMode: (mode) => set({ mode, secondsLeft: 0, initialSeconds: 0, isRunning: false }),
}));
