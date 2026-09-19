// features/auth/store/authStore.ts
import { create } from 'zustand';
import type { AuthUser } from '../services/auth.services';

interface AuthState {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));