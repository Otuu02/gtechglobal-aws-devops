import { create } from 'zustand';

type State = { sidebarOpen: boolean; toggle: () => void; set: (v: boolean) => void };

export const useUiStore = create<State>((set) => ({
  sidebarOpen: true,
  toggle: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  set: (sidebarOpen) => set({ sidebarOpen }),
}));
