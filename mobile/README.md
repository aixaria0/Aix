# Aix Mobile - Internal Testing Platform

This is an internal-only Expo mobile application for exploratory security testing. The app provides metrics tracking, vulnerability reports, gamification features, and theme customization.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI

### Installation

```bash
cd mobile
npm install
```

### Running the App

```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web
```

## 📁 Project Structure

```
mobile/
├── app/
│   ├── (tabs)/           # Tab screens
│   │   ├── index.tsx     # Home screen with gamification
│   │   ├── jobs.tsx      # Jobs management
│   │   ├── metrics.tsx   # Metrics dashboard
│   │   ├── reports.tsx   # Reports list
│   │   └── settings.tsx  # Settings and theme toggle
│   ├── auth/
│   │   └── login.tsx     # Login screen with token validation
│   ├── report/
│   │   └── [id].tsx      # Report detail view
│   └── _layout.tsx       # Root layout with ThemeProvider
├── src/
│   ├── api/
│   │   └── auth.ts       # Authentication API (mock)
│   ├── components/
│   │   ├── Badge.tsx     # Badge display component
│   │   ├── ChartPlaceholder.tsx  # Animated chart placeholder
│   │   ├── MetricCard.tsx        # Metric display card
│   │   └── ThemeToggle.tsx       # Theme switcher
│   ├── store/
│   │   ├── useGamification.ts    # XP, level, and badges store
│   │   ├── useMetrics.ts         # Metrics data store
│   │   └── useReports.ts         # Reports data store
│   └── theme/
│       ├── theme.ts              # Theme context and provider
│       └── useThemedStyles.ts    # Themed styles hook
└── __tests__/
    ├── auth.test.ts              # Auth validation tests
    └── gamification.test.ts      # Gamification logic tests
```

## 🎮 Features

### Authentication

**Token Validation**
- Login screen validates tokens before storing
- Simulated backend ping with 1-second delay
- Token must be at least 8 characters
- Token cannot equal 'invalid'
- Shows loading state during validation

**Extending Token Validation**
Currently, token validation is simulated. To integrate with a real backend:
1. Update `src/api/auth.ts` in the `validateToken` function
2. Replace the setTimeout with an actual fetch call to your `/auth/ping` endpoint
3. Handle real API responses and errors

```typescript
// TODO(api): integrate real endpoint here
const response = await fetch('https://your-api.com/auth/ping', {
  headers: { Authorization: `Bearer ${token}` }
});
```

### Metrics & Reports (Mock)

**Metrics Screen**
- Displays aggregated mock metrics:
  - Total Jobs
  - Active Jobs
  - Average Score
  - Success Ratio
- Pull-to-refresh or tap refresh button to update values
- Chart placeholder with pulsing animation

**Reports Screen**
- Lists vulnerability reports with severity badges
- Color-coded severity levels:
  - Critical: Red
  - High: Orange
  - Medium: Yellow
  - Low: Green
- Tap report to view details

**Report Detail Screen**
- Severity badge
- Risk score (0-10 scale)
- Summary
- Placeholder prompt lineage
- Scores breakdown (Impact, Exploitability, Confidence)

**Extending Reports & Metrics**
To connect to real APIs:
1. Update `src/store/useMetrics.ts` - replace `generateMockMetrics` with API call
2. Update `src/store/useReports.ts` - replace `mockReports` array with API fetch
3. Look for `// TODO(api):` comments throughout the codebase

### Gamification

**Experience Points (XP)**
- Create tests in the Jobs tab to earn 25 XP
- XP progress bar shows advancement to next level
- Multiple XP thresholds for leveling up

**Levels**
Level progression based on XP:
- Level 1: 0 XP
- Level 2: 100 XP
- Level 3: 250 XP
- Level 4: 500 XP
- Level 5: 1000 XP

**Badges**
Automatically awarded when reaching XP milestones:
- **Starter** (Blue): 50 XP
- **Explorer** (Green): 250 XP
- **Strategist** (Orange): 500 XP

Badges are displayed horizontally on the Home screen's gamification card.

### Theme Switching

**Light/Dark Modes**
- Toggle between light and dark themes in Settings
- Theme preference persisted using SecureStore
- Defaults to system appearance if no preference saved
- All screens respect current theme

**Theme Palettes**
- **Light**: White surfaces, dark text, light background
- **Dark**: Dark surfaces, light text, dark background
- **Accent Color**: Consistent blue (#3478f6) across both themes

**Custom Styling**
Use the `useTheme` hook to access theme values:
```typescript
import { useTheme } from '@/src/theme/theme';

const { theme } = useTheme();
// Access theme.palette.background, theme.palette.textPrimary, etc.
```

For styled components, use `useThemedStyles`:
```typescript
import { useThemedStyles } from '@/src/theme/useThemedStyles';

const styles = useThemedStyles((palette) => ({
  container: { backgroundColor: palette.background },
  text: { color: palette.textPrimary },
}));
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Type checking
npm run typecheck
```

**Test Coverage**
- `__tests__/auth.test.ts`: Token validation logic
- `__tests__/gamification.test.ts`: XP, level, and badge system

## 🔒 Security Notes

**Internal Use Only**
This application is designed for internal exploratory testing. Do not deploy to public app stores or expose to external users.

**Mock Data**
All current data (metrics, reports, authentication) is mocked for demonstration purposes. Integrate with real backends before production use.

**Token Storage**
Authentication tokens are stored in SecureStore, which provides encrypted storage on iOS and uses Android's Keystore on Android.

## 📝 Development Guidelines

**Theme Consistency**
- Always use theme values from `useTheme()` instead of hardcoded colors
- Exception: Severity badge colors are intentionally hardcoded for consistency

**State Management**
- Zustand stores are located in `src/store/`
- Keep stores focused on a single domain (auth, metrics, gamification, etc.)

**Code Quality**
- TypeScript strict mode enabled
- All components should have proper types
- Add tests for new business logic

## 🚧 TODO

- [ ] Integrate real authentication API
- [ ] Connect metrics to backend endpoint
- [ ] Fetch reports from API
- [ ] Implement real chart visualizations
- [ ] Add push notifications
- [ ] Build with EAS for distribution

## 📄 License

Internal use only. Not for public distribution.
