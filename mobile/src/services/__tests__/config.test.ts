/**
 * Environment Configuration Tests
 */

import { validateEnvConfig, EnvConfig } from '../config';

describe('validateEnvConfig', () => {
  it('should validate correct configuration', () => {
    const config: EnvConfig = {
      API_BASE_URL: 'https://api.example.com',
      INTERNAL_AUTH_TOKEN: 'valid-token',
    };

    const result = validateEnvConfig(config);

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should reject empty API_BASE_URL', () => {
    const config: EnvConfig = {
      API_BASE_URL: '',
      INTERNAL_AUTH_TOKEN: 'valid-token',
    };

    const result = validateEnvConfig(config);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('API_BASE_URL is required');
  });

  it('should reject empty INTERNAL_AUTH_TOKEN', () => {
    const config: EnvConfig = {
      API_BASE_URL: 'https://api.example.com',
      INTERNAL_AUTH_TOKEN: '',
    };

    const result = validateEnvConfig(config);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      'INTERNAL_AUTH_TOKEN is required. This is a private internal application.'
    );
  });

  it('should reject whitespace-only values', () => {
    const config: EnvConfig = {
      API_BASE_URL: '   ',
      INTERNAL_AUTH_TOKEN: '   ',
    };

    const result = validateEnvConfig(config);

    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(2);
  });

  it('should return all errors when multiple fields are invalid', () => {
    const config: EnvConfig = {
      API_BASE_URL: '',
      INTERNAL_AUTH_TOKEN: '',
    };

    const result = validateEnvConfig(config);

    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(2);
  });
});
