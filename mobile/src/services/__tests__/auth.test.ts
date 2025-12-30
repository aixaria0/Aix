/**
 * Authentication Service Tests
 */

import authService, { AuthenticationError } from '../auth';

describe('AuthService', () => {
  beforeEach(() => {
    authService.clear();
  });

  afterEach(() => {
    authService.clear();
  });

  describe('initialization', () => {
    it('should throw error when initialized without token', () => {
      expect(() => {
        authService.initialize({
          apiBaseUrl: 'https://api.example.com',
          internalAuthToken: '',
        });
      }).toThrow(AuthenticationError);
    });

    it('should throw error when initialized without API base URL', () => {
      expect(() => {
        authService.initialize({
          apiBaseUrl: '',
          internalAuthToken: 'test-token',
        });
      }).toThrow(AuthenticationError);
    });

    it('should initialize successfully with valid config', () => {
      expect(() => {
        authService.initialize({
          apiBaseUrl: 'https://api.example.com',
          internalAuthToken: 'test-token',
        });
      }).not.toThrow();

      expect(authService.isReady()).toBe(true);
    });
  });

  describe('getConfig', () => {
    it('should throw error when not initialized', () => {
      expect(() => {
        authService.getConfig();
      }).toThrow(AuthenticationError);
    });

    it('should return config after initialization', () => {
      const config = {
        apiBaseUrl: 'https://api.example.com',
        internalAuthToken: 'test-token',
      };

      authService.initialize(config);
      const retrievedConfig = authService.getConfig();

      expect(retrievedConfig).toEqual(config);
    });
  });

  describe('getBearerToken', () => {
    it('should return the configured token', () => {
      authService.initialize({
        apiBaseUrl: 'https://api.example.com',
        internalAuthToken: 'my-secret-token',
      });

      expect(authService.getBearerToken()).toBe('my-secret-token');
    });
  });

  describe('getApiBaseUrl', () => {
    it('should return the configured API base URL', () => {
      authService.initialize({
        apiBaseUrl: 'https://api.example.com',
        internalAuthToken: 'test-token',
      });

      expect(authService.getApiBaseUrl()).toBe('https://api.example.com');
    });
  });

  describe('clear', () => {
    it('should clear the authentication state', () => {
      authService.initialize({
        apiBaseUrl: 'https://api.example.com',
        internalAuthToken: 'test-token',
      });

      expect(authService.isReady()).toBe(true);

      authService.clear();

      expect(authService.isReady()).toBe(false);
      expect(() => authService.getConfig()).toThrow(AuthenticationError);
    });
  });
});
