import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, name: string) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email, name) => set({
        user: {
          id: '1',
          email,
          name,
          onboarded: false,
          goals: [],
          interests: [],
          wisdomScores: {
            Art: 0,
            Science: 0,
            Finance: 0,
            Philosophy: 0,
            Strategy: 0,
          }
        },
        isAuthenticated: true,
      }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUser: (data) => set((state) => ({
        user: state.user ? { ...state.user, ...data } : null
      })),
    }),
    {
      name: 'valen-auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
