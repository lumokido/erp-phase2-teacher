// src/store/useAuthStore.ts
import { create } from 'zustand';
import { UserProfile } from '../types';
import { mockUser } from '../services/mockData';

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  pinCode: string;
  login: (pin?: string) => boolean;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: mockUser,
  isAuthenticated: true, // Default logged in for interactive classroom demo
  pinCode: '1234',

  login: (pin?: string) => {
    if (!pin || pin === '1234') {
      set({ isAuthenticated: true, user: mockUser });
      return true;
    }
    return false;
  },

  logout: () => {
    set({ isAuthenticated: false, user: null });
  },

  updateProfile: (updates) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    }));
  },
}));
