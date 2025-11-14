# Aix Mobile - Architecture Overview

## Application Flow

```
┌─────────────────────────────────────────────────────────────┐
│                        App Launch                            │
│                     (_layout.tsx)                            │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │           ThemeProvider                            │    │
│  │   • Loads theme preference from SecureStore       │    │
│  │   • Provides theme context to all children        │    │
│  │   • Defaults to system appearance                 │    │
│  └────────────────────────────────────────────────────┘    │
│                         │                                    │
│                         ▼                                    │
│  ┌────────────────────────────────────────────────────┐    │
│  │         Navigation Stack                           │    │
│  │   • (tabs) - Main tab navigator                   │    │
│  │   • auth/login - Login screen                     │    │
│  │   • report/[id] - Report detail                   │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Tab Navigation Structure

```
┌──────────────────────────────────────────────────────────┐
│                    Tab Navigator                          │
│  ┌─────────┬─────────┬─────────┬─────────┬──────────┐   │
│  │  Home   │  Jobs   │ Metrics │ Reports │ Settings │   │
│  │   🏠    │   💼    │   📊    │   📄    │   ⚙️     │   │
│  └─────────┴─────────┴─────────┴─────────┴──────────┘   │
└──────────────────────────────────────────────────────────┘
```

## State Management (Zustand)

```
┌─────────────────────────────────────────────────────────┐
│                    Zustand Stores                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  useGamification                                        │
│  ├─ xp: number                                          │
│  ├─ level: number                                       │
│  ├─ badges: Badge[]                                     │
│  └─ awardXP(amount): void                               │
│                                                          │
│  useMetrics                                             │
│  ├─ metrics: Metrics                                    │
│  │   ├─ totalJobs                                       │
│  │   ├─ activeJobs                                      │
│  │   ├─ avgScore                                        │
│  │   ├─ successRatio                                    │
│  │   └─ lastUpdated                                     │
│  └─ updateMetrics(): void                               │
│                                                          │
│  useReports                                             │
│  ├─ reports: Report[]                                   │
│  └─ getReport(id): Report                               │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Screen Breakdown

### 1. Home Screen (index.tsx)
```
┌─────────────────────────────────────┐
│  Welcome to Aix                     │
│  Internal Testing Platform          │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Your Progress              │   │
│  │                             │   │
│  │  Level: [5]                 │   │
│  │                             │   │
│  │  850 XP    [████░░] 1000 XP │   │
│  │                             │   │
│  │  Badges Earned:             │   │
│  │  [Starter] [Explorer] [Str] │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Get Started                │   │
│  │  • Create tests to earn XP  │   │
│  │  • Track metrics & reports  │   │
│  │  • Unlock badges            │   │
│  │  • Switch themes            │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### 2. Jobs Screen (jobs.tsx)
```
┌─────────────────────────────────────┐
│  Jobs                               │
│  Manage security test jobs          │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Create New Test            │   │
│  │  Start a new job to earn XP │   │
│  │                             │   │
│  │  [Create Test (+25 XP)]     │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Recent Jobs                │   │
│  │  No jobs yet...             │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### 3. Metrics Screen (metrics.tsx)
```
┌─────────────────────────────────────┐
│  Metrics            [🔄]            │
│  Last updated: Nov 13, 10:30 PM    │
│                                     │
│  ┌──────────┐  ┌──────────┐       │
│  │  Total   │  │ Active   │       │
│  │  Jobs    │  │ Jobs     │       │
│  │  453     │  │  37      │       │
│  └──────────┘  └──────────┘       │
│                                     │
│  ┌──────────┐  ┌──────────┐       │
│  │  Avg     │  │ Success  │       │
│  │  Score   │  │ Rate     │       │
│  │  87.3%   │  │  94.2%   │       │
│  └──────────┘  └──────────┘       │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Performance Over Time      │   │
│  │                             │   │
│  │  📊 Chart coming soon       │   │
│  │  (pulsing animation)        │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### 4. Reports Screen (reports.tsx)
```
┌─────────────────────────────────────┐
│  Reports                            │
│  5 vulnerability reports            │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ [CRITICAL]        2h ago    │   │
│  │ SQL Injection Vulnerability │   │
│  │ Potential SQL injection...  │   │
│  │ Score: 9.8                  │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ [HIGH]            5h ago    │   │
│  │ Unauthorized Access Attempt │   │
│  │ Multiple failed auth...     │   │
│  │ Score: 8.5                  │   │
│  └─────────────────────────────┘   │
│                                     │
│  [more reports...]                  │
└─────────────────────────────────────┘
```

### 5. Settings Screen (settings.tsx)
```
┌─────────────────────────────────────┐
│  Settings                           │
│  Customize your experience          │
│                                     │
│  Appearance                         │
│  ┌─────────────────────────────┐   │
│  │  ☀️ Light Mode      [⚪️]   │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  About Aix                  │   │
│  │  Internal Testing Platform  │   │
│  │  v1.0.0                     │   │
│  │  For internal use only      │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### 6. Report Detail (report/[id].tsx)
```
┌─────────────────────────────────────┐
│  < Report Details                   │
│                                     │
│  [CRITICAL]                         │
│                                     │
│  SQL Injection Vulnerability        │
│  November 13, 2024, 08:30 PM       │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Risk Score                 │   │
│  │      9.8 / 10               │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Summary                    │   │
│  │  Potential SQL injection... │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Prompt Lineage             │   │
│  │  [Placeholder]              │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Scores Breakdown           │   │
│  │  Impact         7.8         │   │
│  │  Exploitability 8.8         │   │
│  │  Confidence     9.3         │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### 7. Login Screen (auth/login.tsx)
```
┌─────────────────────────────────────┐
│                                     │
│         Welcome Back                │
│  Enter your authentication token   │
│  to continue                        │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Enter token (min 8 chars)   │   │
│  │ ••••••••••••                │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │        [Login]              │   │
│  └─────────────────────────────┘   │
│                                     │
│  Hint: Token must be at least      │
│  8 characters                       │
│                                     │
└─────────────────────────────────────┘
```

## Component Hierarchy

```
App (_layout.tsx)
├─ ThemeProvider
│  ├─ NavigationThemeProvider
│  │  └─ Stack
│  │     ├─ (tabs)
│  │     │  ├─ Home (index.tsx)
│  │     │  │  ├─ Animated.View (fade-in)
│  │     │  │  │  ├─ Level display
│  │     │  │  │  ├─ XP progress bar
│  │     │  │  │  └─ Badge[] (horizontal scroll)
│  │     │  │  └─ Info card
│  │     │  │
│  │     │  ├─ Jobs (jobs.tsx)
│  │     │  │  ├─ Create test card
│  │     │  │  └─ Recent jobs card
│  │     │  │
│  │     │  ├─ Metrics (metrics.tsx)
│  │     │  │  ├─ MetricCard (x4)
│  │     │  │  └─ ChartPlaceholder (animated)
│  │     │  │
│  │     │  ├─ Reports (reports.tsx)
│  │     │  │  └─ ReportCard[] (touchable)
│  │     │  │     ├─ Severity badge
│  │     │  │     ├─ Title
│  │     │  │     ├─ Summary
│  │     │  │     └─ Score
│  │     │  │
│  │     │  └─ Settings (settings.tsx)
│  │     │     ├─ ThemeToggle
│  │     │     └─ About card
│  │     │
│  │     ├─ auth/login
│  │     │  ├─ TextInput (token)
│  │     │  ├─ Button (with loading state)
│  │     │  └─ Hint text
│  │     │
│  │     └─ report/[id]
│  │        ├─ Severity badge
│  │        ├─ Score card
│  │        ├─ Summary section
│  │        ├─ Lineage section
│  │        └─ Breakdown section
```

## Data Flow

### Authentication Flow
```
User enters token
      ↓
validateToken(token)
      ↓
[Simulated 1s delay]
      ↓
Validation checks:
  - token === 'invalid'? → ❌
  - token.length < 8? → ❌
      ↓
✅ Valid
      ↓
SecureStore.setItem('auth_token', token)
      ↓
Navigate to /(tabs)
```

### Gamification Flow
```
User creates test in Jobs
      ↓
awardXP(25)
      ↓
Store updates:
  - xp += 25
  - level = calculateLevel(xp)
  - badges = checkBadgeUnlock(xp, badges)
      ↓
Home screen updates automatically
(React observes Zustand store)
```

### Theme Toggle Flow
```
User taps ThemeToggle
      ↓
toggleTheme()
      ↓
newMode = mode === 'light' ? 'dark' : 'light'
      ↓
SecureStore.setItem('theme_pref', newMode)
      ↓
All screens re-render with new theme
(React observes ThemeContext)
```

## Technology Stack

- **Framework:** Expo 54 + React Native
- **Navigation:** Expo Router (file-based)
- **State Management:** Zustand
- **Animations:** React Native Reanimated
- **Storage:** Expo SecureStore
- **Styling:** StyleSheet (themed)
- **Testing:** Jest + ts-jest
- **Type Safety:** TypeScript (strict mode)

## File Organization

```
mobile/
├── app/                    # Screens (file-based routing)
│   ├── (tabs)/            # Tab navigator
│   ├── auth/              # Authentication screens
│   ├── report/            # Report detail
│   └── _layout.tsx        # Root layout
│
├── src/                   # Source code
│   ├── api/               # API layer (mock)
│   ├── components/        # Reusable components
│   ├── store/             # Zustand stores
│   └── theme/             # Theme system
│
├── __tests__/             # Test files
│   ├── auth.test.ts
│   └── gamification.test.ts
│
├── assets/                # Images, fonts
├── components/            # Template components
├── constants/             # Constants
│
└── Configuration files
    ├── package.json
    ├── tsconfig.json
    ├── jest.config.js
    └── app.json
```

## Key Design Decisions

1. **File-based Routing:** Using Expo Router for intuitive navigation structure
2. **Zustand over Redux:** Simpler API, less boilerplate for this scale
3. **SecureStore:** Encrypted storage for tokens and preferences
4. **Mock Data:** All data currently mocked with clear TODO comments for API integration
5. **Theme System:** Custom theme provider rather than library for full control
6. **Testing:** Jest with ts-jest for fast unit tests without React Native environment
7. **TypeScript Strict:** Catch errors at compile time
8. **Component Library:** Custom components rather than UI library for internal use case
9. **Animations:** Reanimated for performant, native-thread animations
10. **Modular Structure:** Clear separation of concerns (stores, components, screens)
