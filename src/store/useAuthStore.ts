// src/store/useAuthStore.ts
import { create } from 'zustand';
import { UserProfile, UserRole } from '../types';
import { mockUser } from '../services/mockData';
import { loginUserApi } from '../services/teacherApi';

interface AuthState {
  user: UserProfile | null;
  role: UserRole;
  token: string | null;
  isAuthenticated: boolean;
  pinCode: string;
  login: (pin?: string) => boolean;
  loginWithCredentials: (usernameOrEmail: string, password?: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  setRole: (role: UserRole) => void;
}

const savedToken = localStorage.getItem('erp_token');
const savedRole = (localStorage.getItem('erp_role') as UserRole) || 'TEACHER';

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    ...mockUser,
    role: savedRole,
  },
  role: savedRole,
  token: savedToken || 'mock_jwt_ADMIN_token_123',
  isAuthenticated: true, // Default logged in for smooth user testing
  pinCode: '1234',

  login: (pin?: string) => {
    if (!pin || pin === '1234') {
      const defaultUser = { ...mockUser, role: 'TEACHER' as UserRole };
      set({ isAuthenticated: true, user: defaultUser, role: 'TEACHER', token: 'mock_jwt_teacher_123' });
      localStorage.setItem('erp_role', 'TEACHER');
      localStorage.setItem('erp_token', 'mock_jwt_teacher_123');
      return true;
    }
    return false;
  },

  loginWithCredentials: async (usernameOrEmail: string, password?: string) => {
    try {
      const res = await loginUserApi(usernameOrEmail, password);
      if (res.accessToken) {
        const userRole: UserRole = res.role || (usernameOrEmail.toLowerCase().includes('admin') || usernameOrEmail === 'principal_admin' ? 'ADMIN' : 'TEACHER');
        
        let profile: UserProfile;
        if (res.user && 'name' in res.user) {
          profile = res.user as UserProfile;
        } else {
          profile = {
            id: '1',
            name: usernameOrEmail === 'principal_admin' ? 'Principal Admin' : 'Robert Brown',
            title: userRole === 'ADMIN' ? 'Principal & School Administrator' : 'Senior Chemistry Teacher',
            email: usernameOrEmail.includes('@') ? usernameOrEmail : `${usernameOrEmail}@school.edu`,
            avatar: userRole === 'ADMIN'
              ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
              : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
            department: userRole === 'ADMIN' ? 'Administration' : 'Chemistry',
            employeeId: userRole === 'ADMIN' ? 'EMP-ADM-001' : 'EMP-T-003',
            assignedClasses: userRole === 'ADMIN' ? ['All Grades'] : ['Grade 10-A'],
            role: userRole,
            username: usernameOrEmail
          };
        }

        set({
          isAuthenticated: true,
          user: profile,
          role: userRole,
          token: res.accessToken,
        });

        localStorage.setItem('erp_token', res.accessToken);
        localStorage.setItem('erp_role', userRole);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Login error', err);
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('erp_token');
    localStorage.removeItem('erp_role');
    set({ isAuthenticated: false, user: null, token: null, role: 'TEACHER' });
  },

  updateProfile: (updates) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    }));
  },

  setRole: (role) => {
    localStorage.setItem('erp_role', role);
    set((state) => ({
      role,
      user: state.user ? { ...state.user, role } : null,
    }));
  },
}));
