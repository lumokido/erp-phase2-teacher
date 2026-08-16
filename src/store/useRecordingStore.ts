// src/store/useRecordingStore.ts
import { create } from 'zustand';
import { RecordingSession } from '../types';
import { mockRecordings } from '../services/mockData';

interface RecordingState {
  isRecording: boolean;
  isPaused: boolean;
  durationSeconds: number;
  micEnabled: boolean;
  boardOverlayEnabled: boolean;
  recordingsList: RecordingSession[];

  startRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
  stopRecording: () => void;
  toggleMic: () => void;
  toggleBoardOverlay: () => void;
  tickRecording: () => void;
}

export const useRecordingStore = create<RecordingState>((set, get) => ({
  isRecording: false,
  isPaused: false,
  durationSeconds: 0,
  micEnabled: true,
  boardOverlayEnabled: true,
  recordingsList: mockRecordings,

  startRecording: () => set({ isRecording: true, isPaused: false, durationSeconds: 0 }),
  pauseRecording: () => set({ isPaused: true }),
  resumeRecording: () => set({ isPaused: false }),

  stopRecording: () => {
    const { durationSeconds, recordingsList } = get();
    const newSession: RecordingSession = {
      id: `rec-${Date.now()}`,
      classId: 'slot-1',
      title: `Class Recording - ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      startTime: 'Just now',
      durationSeconds: durationSeconds,
      fileSizeMb: Math.round((durationSeconds * 0.15) * 10) / 10,
      status: 'saved',
      thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300'
    };

    set({
      isRecording: false,
      isPaused: false,
      durationSeconds: 0,
      recordingsList: [newSession, ...recordingsList],
    });
  },

  toggleMic: () => set((state) => ({ micEnabled: !state.micEnabled })),
  toggleBoardOverlay: () => set((state) => ({ boardOverlayEnabled: !state.boardOverlayEnabled })),

  tickRecording: () => {
    const { isRecording, isPaused, durationSeconds } = get();
    if (isRecording && !isPaused) {
      set({ durationSeconds: durationSeconds + 1 });
    }
  },
}));
