/**
 * Authentication API
 * 
 * Simulates token validation against a backend.
 * TODO(api): integrate real endpoint here
 */

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validates an authentication token.
 * Currently simulates API ping with setTimeout.
 * 
 * Rules:
 * - Token cannot equal 'invalid'
 * - Token must be at least 8 characters
 * 
 * @param token - The authentication token to validate
 * @returns Promise resolving to validation result
 */
export const validateToken = async (token: string): Promise<ValidationResult> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // TODO(api): Replace with actual API call
  // Example: const response = await fetch('/auth/ping', { headers: { Authorization: `Bearer ${token}` } });
  
  if (token === 'invalid') {
    return { valid: false, error: 'Invalid token' };
  }

  if (token.length < 8) {
    return { valid: false, error: 'Token must be at least 8 characters' };
  }

  return { valid: true };
};
