import { create } from 'zustand';

export type Severity = 'low' | 'medium' | 'high' | 'critical';

export interface Report {
  id: string;
  title: string;
  severity: Severity;
  createdAt: string;
  summary: string;
  score: number;
}

interface ReportsStore {
  reports: Report[];
  getReport: (id: string) => Report | undefined;
}

// TODO(api): integrate real endpoint here
const mockReports: Report[] = [
  {
    id: '1',
    title: 'SQL Injection Vulnerability Detected',
    severity: 'critical',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    summary: 'Potential SQL injection found in user input validation layer.',
    score: 9.8,
  },
  {
    id: '2',
    title: 'Unauthorized Access Attempt',
    severity: 'high',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    summary: 'Multiple failed authentication attempts detected from suspicious IP.',
    score: 8.5,
  },
  {
    id: '3',
    title: 'Data Exposure Risk',
    severity: 'medium',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    summary: 'Sensitive data potentially exposed through verbose error messages.',
    score: 6.2,
  },
  {
    id: '4',
    title: 'Weak Encryption Algorithm',
    severity: 'medium',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    summary: 'Legacy encryption algorithm detected in data storage module.',
    score: 5.8,
  },
  {
    id: '5',
    title: 'Minor Configuration Issue',
    severity: 'low',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    summary: 'Non-critical configuration setting could be optimized for security.',
    score: 3.2,
  },
];

export const useReports = create<ReportsStore>(() => ({
  reports: mockReports,
  getReport: (id: string) => mockReports.find((report) => report.id === id),
}));
