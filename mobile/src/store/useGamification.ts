import { create } from 'zustand';

export interface Badge {
  id: string;
  name: string;
  color: string;
  earnedAt?: string;
}

interface GamificationStore {
  xp: number;
  level: number;
  badges: Badge[];
  awardXP: (amount: number) => void;
}

const XP_THRESHOLDS = [0, 100, 250, 500, 1000];

const ALL_BADGES: Badge[] = [
  { id: 'starter', name: 'Starter', color: '#3478f6' },
  { id: 'explorer', name: 'Explorer', color: '#34c759' },
  { id: 'strategist', name: 'Strategist', color: '#ff9500' },
];

const calculateLevel = (xp: number): number => {
  for (let i = XP_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= XP_THRESHOLDS[i]) {
      return i + 1;
    }
  }
  return 1;
};

const checkBadgeUnlock = (xp: number, currentBadges: Badge[]): Badge[] => {
  const newBadges = [...currentBadges];
  const hasStarter = newBadges.some((b) => b.id === 'starter');
  const hasExplorer = newBadges.some((b) => b.id === 'explorer');
  const hasStrategist = newBadges.some((b) => b.id === 'strategist');

  if (!hasStarter && xp >= 50) {
    newBadges.push({ ...ALL_BADGES[0], earnedAt: new Date().toISOString() });
  }
  if (!hasExplorer && xp >= 250) {
    newBadges.push({ ...ALL_BADGES[1], earnedAt: new Date().toISOString() });
  }
  if (!hasStrategist && xp >= 500) {
    newBadges.push({ ...ALL_BADGES[2], earnedAt: new Date().toISOString() });
  }

  return newBadges;
};

export const useGamification = create<GamificationStore>((set, get) => ({
  xp: 0,
  level: 1,
  badges: [],
  awardXP: (amount: number) => {
    const currentXP = get().xp;
    const newXP = currentXP + amount;
    const newLevel = calculateLevel(newXP);
    const newBadges = checkBadgeUnlock(newXP, get().badges);
    
    set({ xp: newXP, level: newLevel, badges: newBadges });
  },
}));
