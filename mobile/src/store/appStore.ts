/**
 * Global App Store
 * State management using Zustand
 */

import { create } from 'zustand';

/**
 * Represents the global application state for authentication and initialization.
 *
 * State properties:
 * - `isAuthenticated`: Indicates whether the user is currently authenticated.
 * - `isInitializing`: Indicates whether the authentication/initialization process is ongoing.
 * - `error`: Holds any error message encountered during authentication or initialization.
 *
 * Usage patterns:
 * - On app startup, `isInitializing` should be set to `true` while authentication is being checked.
 * - Once authentication is determined, use `setAuthenticated` to update `isAuthenticated` and set `isInitializing` to `false`.
 * - If an error occurs during authentication or initialization, use `setError` to record the error and set `isInitializing` to `false`.
 * - Use `reset` to restore the state to its initial values, typically on logout or when re-initializing the app.
 */
export interface AppState {
  /**
   * Indicates whether the user is currently authenticated.
   * Set to `true` after successful authentication, `false` otherwise.
   */
  isAuthenticated: boolean;
  
  /**
   * Indicates whether the authentication/initialization process is ongoing.
   * Set to `true` during startup or when re-authenticating.
   * Set to `false` after authentication completes or fails.
   */
  isInitializing: boolean;
  
  /**
   * Holds any error message encountered during authentication or initialization.
   * Set to `null` if no error is present.
   */
  error: string | null;
  
  /**
   * Sets the authentication state.
   * Use this after determining the user's authentication status.
   * @param authenticated - `true` if the user is authenticated, `false` otherwise
   */
  setAuthenticated: (authenticated: boolean) => void;
  
  /**
   * Sets the initialization state.
   * Use this to indicate when the app is loading or initializing.
   * @param initializing - `true` if initialization is in progress, `false` otherwise
   */
  setInitializing: (initializing: boolean) => void;
  
  /**
   * Sets an error message.
   * Use this to record any errors during authentication or initialization.
   * @param error - The error message string, or `null` to clear the error
   */
  setError: (error: string | null) => void;
  
  /**
   * Resets the store to its initial state.
   * Use this when logging out or when you need to reinitialize the app state.
   */
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
    set({ isInitializing: initializing, error: initializing ? null : undefined }),
  
  setError: (error: string | null) =>
    set({ error }),
  
  reset: () => set(initialState),
}));
