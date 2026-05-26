import { create } from 'zustand';
import { apiService } from '@/lib/api';

interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
}

interface UserStore {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoggedIn: !!localStorage.getItem('accessToken'),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiService.login({ email, password });
      set({
        user: response.user,
        isLoggedIn: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '登录失败',
        isLoading: false,
      });
      throw error;
    }
  },

  signup: async (username, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiService.register({ email, password, username });
      set({
        user: response.user,
        isLoggedIn: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '注册失败',
        isLoading: false,
      });
      throw error;
    }
  },

  logout: () => {
    apiService.logout();
    set({ user: null, isLoggedIn: false });
  },

  clearError: () => {
    set({ error: null });
  },
}));
