import { create } from 'zustand';

export interface Metrics {
  totalJobs: number;
  activeJobs: number;
  avgScore: number;
  successRatio: number;
  lastUpdated: string;
}

interface MetricsStore {
  metrics: Metrics;
  updateMetrics: () => void;
}

// TODO(api): integrate real endpoint here
const generateMockMetrics = (): Metrics => ({
  totalJobs: Math.floor(Math.random() * 500) + 100,
  activeJobs: Math.floor(Math.random() * 50) + 10,
  avgScore: Math.random() * 100,
  successRatio: Math.random() * 100,
  lastUpdated: new Date().toISOString(),
});

export const useMetrics = create<MetricsStore>((set) => ({
  metrics: generateMockMetrics(),
  updateMetrics: () => set({ metrics: generateMockMetrics() }),
}));
