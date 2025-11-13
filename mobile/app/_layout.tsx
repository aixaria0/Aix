/**
 * Root Layout
 * Initializes authentication and sets up app structure
 */

import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAppStore } from '../src/store/appStore';
import authService from '../src/services/auth';
import apiClient from '../src/services/api';
import { loadEnvConfig, validateEnvConfig } from '../src/services/config';

export default function RootLayout() {
  const { setAuthenticated, setInitializing, setError } = useAppStore();

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      setInitializing(true);
      setError(null);

      // Load environment configuration
      const config = loadEnvConfig();

      // Validate configuration
      const validation = validateEnvConfig(config);
      if (!validation.valid) {
        const errorMessage = `Configuration Error:\n${validation.errors.join('\n')}`;
        setError(errorMessage);
        setAuthenticated(false);
        setInitializing(false);
        return;
      }

      // Initialize authentication service
      authService.initialize({
        apiBaseUrl: config.API_BASE_URL,
        internalAuthToken: config.INTERNAL_AUTH_TOKEN,
      });

      // Initialize API client
      apiClient.initialize();

      // Mark as authenticated if initialization succeeded
      setAuthenticated(true);
      setError(null);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to initialize application';
      setError(errorMessage);
      setAuthenticated(false);
    } finally {
      setInitializing(false);
    }
  };

  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
