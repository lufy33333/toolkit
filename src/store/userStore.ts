import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
}

interface UserStore {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoggedIn: false,

  login: (email, password) => {
    set({
      user: {
        id: '1',
        email,
        name: email.split('@')[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      },
      isLoggedIn: true,
    });
  },

  signup: (name, email, password) => {
    set({
      user: {
        id: '1',
        email,
        name,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      },
      isLoggedIn: true,
    });
  },

  logout: () => {
    set({ user: null, isLoggedIn: false });
  },
}));
