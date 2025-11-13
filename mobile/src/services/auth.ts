/**
 * Authentication Service
 * Handles internal bearer token validation and management
 * This is a private internal application that requires valid credentials
 */

export interface AuthConfig {
  apiBaseUrl: string;
  internalAuthToken: string;
}

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export class AuthService {
  private static instance: AuthService;
  private config: AuthConfig | null = null;
  private isInitialized = false;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Initialize the auth service with configuration
   * Must be called before any API requests
   */
  initialize(config: AuthConfig): void {
    if (!config.internalAuthToken || config.internalAuthToken.trim() === '') {
      throw new AuthenticationError(
        'Internal authentication token is required. This is a private internal application.'
      );
    }

    if (!config.apiBaseUrl || config.apiBaseUrl.trim() === '') {
      throw new AuthenticationError('API base URL is required.');
    }

    this.config = config;
    this.isInitialized = true;
  }

  /**
   * Get the current authentication configuration
   * Throws if not initialized
   */
  getConfig(): AuthConfig {
    if (!this.isInitialized || !this.config) {
      throw new AuthenticationError(
        'AuthService not initialized. Please provide valid credentials.'
      );
    }
    return this.config;
  }

  /**
   * Get the bearer token for API requests
   */
  getBearerToken(): string {
    const config = this.getConfig();
    return config.internalAuthToken;
  }

  /**
   * Get the API base URL
   */
  getApiBaseUrl(): string {
    const config = this.getConfig();
    return config.apiBaseUrl;
  }

  /**
   * Check if the service is properly initialized
   */
  isReady(): boolean {
    return this.isInitialized && this.config !== null;
  }

  /**
   * Clear the authentication state (for testing or logout)
   */
  clear(): void {
    this.config = null;
    this.isInitialized = false;
  }
}

export default AuthService.getInstance();
