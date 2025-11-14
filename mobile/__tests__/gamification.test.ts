import { useGamification } from '../src/store/useGamification';

describe('Gamification Store', () => {
  beforeEach(() => {
    // Reset the store before each test
    const { xp, level, badges, awardXP } = useGamification.getState();
    useGamification.setState({ xp: 0, level: 1, badges: [] });
  });

  describe('XP and Level System', () => {
    it('should start at level 1 with 0 XP', () => {
      const { xp, level } = useGamification.getState();
      expect(xp).toBe(0);
      expect(level).toBe(1);
    });

    it('should award XP correctly', () => {
      const { awardXP } = useGamification.getState();
      awardXP(25);
      
      const { xp } = useGamification.getState();
      expect(xp).toBe(25);
    });

    it('should level up at 100 XP', () => {
      const { awardXP } = useGamification.getState();
      awardXP(100);
      
      const { level } = useGamification.getState();
      expect(level).toBe(2);
    });

    it('should level up at 250 XP', () => {
      const { awardXP } = useGamification.getState();
      awardXP(250);
      
      const { level } = useGamification.getState();
      expect(level).toBe(3);
    });

    it('should level up at 500 XP', () => {
      const { awardXP } = useGamification.getState();
      awardXP(500);
      
      const { level } = useGamification.getState();
      expect(level).toBe(4);
    });

    it('should level up at 1000 XP', () => {
      const { awardXP } = useGamification.getState();
      awardXP(1000);
      
      const { level } = useGamification.getState();
      expect(level).toBe(5);
    });
  });

  describe('Badge System', () => {
    it('should award Starter badge at 50 XP', () => {
      const { awardXP } = useGamification.getState();
      awardXP(50);
      
      const { badges } = useGamification.getState();
      expect(badges).toHaveLength(1);
      expect(badges[0].name).toBe('Starter');
    });

    it('should award Explorer badge at 250 XP', () => {
      const { awardXP } = useGamification.getState();
      awardXP(250);
      
      const { badges } = useGamification.getState();
      expect(badges.some(b => b.name === 'Explorer')).toBe(true);
    });

    it('should award Strategist badge at 500 XP', () => {
      const { awardXP } = useGamification.getState();
      awardXP(500);
      
      const { badges } = useGamification.getState();
      expect(badges.some(b => b.name === 'Strategist')).toBe(true);
    });

    it('should not duplicate badges', () => {
      const { awardXP } = useGamification.getState();
      awardXP(50);
      awardXP(10);
      
      const { badges } = useGamification.getState();
      const starterBadges = badges.filter(b => b.name === 'Starter');
      expect(starterBadges).toHaveLength(1);
    });

    it('should award multiple badges at once when reaching high XP', () => {
      const { awardXP } = useGamification.getState();
      awardXP(500);
      
      const { badges } = useGamification.getState();
      expect(badges).toHaveLength(3); // Starter, Explorer, Strategist
    });
  });

  describe('Progressive XP Awards', () => {
    it('should accumulate XP from multiple awards', () => {
      const { awardXP } = useGamification.getState();
      awardXP(25);
      awardXP(25);
      awardXP(25);
      
      const { xp } = useGamification.getState();
      expect(xp).toBe(75);
    });

    it('should level up correctly with multiple awards', () => {
      const { awardXP } = useGamification.getState();
      awardXP(50);
      awardXP(50);
      
      const { xp, level } = useGamification.getState();
      expect(xp).toBe(100);
      expect(level).toBe(2);
    });
  });
});
