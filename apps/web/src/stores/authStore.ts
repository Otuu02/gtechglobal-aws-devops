import { create } from 'zustand';

type User = { id: string; email: string; firstName: string; lastName: string };

type State = {
  user: User | null;
  setUser: (u: User | null) => void;
  clear: () => void;
};

export const useAuthStore = create<State>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clear: () => set({ user: null }),
}));
