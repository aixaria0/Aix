/**
 * Global App Store
 * State management using Zustand
 */

import { create } from 'zustand';

export interface AppState {
  isAuthenticated: boolean;
  isInitializing: boolean;
  error: string | null;
  setAuthenticated: (authenticated: boolean) => void;
  setInitializing: (initializing: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  isAuthenticated: false,
  isInitializing: true,
  error: null,
};

export const useAppStore = create<AppState>((set) => ({
  ...initialState,
  
  setAuthenticated: (authenticated: boolean) =>
    set({ isAuthenticated: authenticated }),
  
  setInitializing: (initializing: boolean) =>
    set({ isInitializing: initializing }),
  
  setError: (error: string | null) =>
    set({ error }),
  
  reset: () => set(initialState),
}));
