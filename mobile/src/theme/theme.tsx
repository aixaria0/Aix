import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export interface ThemePalette {
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
}

export interface Theme {
  mode: 'light' | 'dark';
  palette: ThemePalette;
}

const lightPalette: ThemePalette = {
  background: '#f5f7fa',
  surface: '#ffffff',
  textPrimary: '#1a1d21',
  textSecondary: '#5a6169',
  accent: '#3478f6',
};

const darkPalette: ThemePalette = {
  background: '#0f1115',
  surface: '#1c2026',
  textPrimary: '#ffffff',
  textSecondary: '#b5bcc5',
  accent: '#3478f6',
};

const THEME_STORAGE_KEY = 'theme_pref';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (mode: 'light' | 'dark') => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Load theme preference from storage
    const loadTheme = async () => {
      try {
        const savedTheme = await SecureStore.getItemAsync(THEME_STORAGE_KEY);
        if (savedTheme === 'light' || savedTheme === 'dark') {
          setThemeMode(savedTheme);
        } else {
          // Default to system appearance
          const systemTheme = Appearance.getColorScheme();
          setThemeMode(systemTheme === 'dark' ? 'dark' : 'light');
        }
      } catch (error) {
        console.error('Failed to load theme preference:', error);
        // Fallback to system appearance
        const systemTheme = Appearance.getColorScheme();
        setThemeMode(systemTheme === 'dark' ? 'dark' : 'light');
      }
    };

    loadTheme();
  }, []);

  const setTheme = async (mode: 'light' | 'dark') => {
    setThemeMode(mode);
    try {
      await SecureStore.setItemAsync(THEME_STORAGE_KEY, mode);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  const toggleTheme = () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light';
    setTheme(newMode);
  };

  const theme: Theme = {
    mode: themeMode,
    palette: themeMode === 'light' ? lightPalette : darkPalette,
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
