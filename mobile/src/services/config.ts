/**
 * Environment Configuration
 * Loads configuration from environment variables
 * 
 * IMPORTANT: This app requires internal authentication credentials
 */

// In a real app, use expo-constants and app.config.js for env vars
// For this scaffold, we'll use a config object that should be populated
// from your environment management solution (e.g., expo-constants, react-native-config, etc.)

export interface EnvConfig {
  API_BASE_URL: string;
  INTERNAL_AUTH_TOKEN: string;
}

/**
 * Load environment configuration
 * In production, this should be loaded from secure environment variables
 * For now, this serves as a placeholder that enforces the requirement
 */
export function loadEnvConfig(): EnvConfig {
  // In a real implementation, load from process.env or expo-constants
  // Example: const API_BASE_URL = Constants.expoConfig?.extra?.apiBaseUrl || '';
  
  const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || '';
  const INTERNAL_AUTH_TOKEN = process.env.EXPO_PUBLIC_INTERNAL_AUTH_TOKEN || '';

  return {
    API_BASE_URL,
    INTERNAL_AUTH_TOKEN,
  };
}

/**
 * Validate that required environment variables are present
 */
export function validateEnvConfig(config: EnvConfig): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!config.API_BASE_URL || config.API_BASE_URL.trim() === '') {
    errors.push('API_BASE_URL is required');
  }

  if (!config.INTERNAL_AUTH_TOKEN || config.INTERNAL_AUTH_TOKEN.trim() === '') {
    errors.push(
      'INTERNAL_AUTH_TOKEN is required. This is a private internal application.'
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
