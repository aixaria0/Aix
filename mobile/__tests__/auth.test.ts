import { validateToken } from '../src/api/auth';

describe('Auth API', () => {
  describe('validateToken', () => {
    it('should reject tokens shorter than 8 characters', async () => {
      const result = await validateToken('short');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Token must be at least 8 characters');
    });

    it('should reject the "invalid" token', async () => {
      const result = await validateToken('invalid');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Invalid token');
    });

    it('should accept valid tokens', async () => {
      const result = await validateToken('validtoken123');
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should accept tokens that are exactly 8 characters', async () => {
      const result = await validateToken('12345678');
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });
});
