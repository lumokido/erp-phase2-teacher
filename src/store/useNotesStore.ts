// src/store/useNotesStore.ts
import { create } from 'zustand';
import { QuickNote } from '../types';
import { mockQuickNotes } from '../services/mockData';

interface NotesState {
  notes: QuickNote[];
  addNote: (note: Omit<QuickNote, 'id' | 'updatedAt'>) => void;
  updateNote: (id: string, updates: Partial<QuickNote>) => void;
  deleteNote: (id: string) => void;
  togglePin: (id: string) => void;
}

export const useNotesStore = create<NotesState>((set) => ({
  notes: mockQuickNotes,

  addNote: (newNote) => {
    set((state) => {
      const noteObj: QuickNote = {
        ...newNote,
        id: `qn-${Date.now()}`,
        updatedAt: 'Just now',
      };
      return { notes: [noteObj, ...state.notes] };
    });
  },

  updateNote: (id, updates) => {
    set((state) => ({
      notes: state.notes.map((note) => (note.id === id ? { ...note, ...updates, updatedAt: 'Just now' } : note)),
    }));
  },

  deleteNote: (id) => {
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    }));
  },

  togglePin: (id) => {
    set((state) => ({
      notes: state.notes.map((note) => (note.id === id ? { ...note, isPinned: !note.isPinned } : note)),
    }));
  },
}));
