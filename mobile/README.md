# Aix Internal Mobile Application

**PRIVATE INTERNAL APPLICATION** - Quantum LLM Sentinel Client Interface

This is an internal-only mobile application scaffold built with Expo React Native. Access is restricted and requires valid internal authentication credentials.

## ⚠️ Access Requirements

This application is **NOT** for public use. You must have:

- Valid `EXPO_PUBLIC_INTERNAL_AUTH_TOKEN` (obtain from platform team)
- Access to internal API endpoints
- Authorization to work on this project

## Prerequisites

- Node.js 18+ and npm
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (macOS) or Android Emulator

## Setup

1. **Install Dependencies**
   ```bash
   cd mobile
   npm install
   ```

2. **Configure Environment**
   
   Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` with valid credentials:
   ```
   EXPO_PUBLIC_API_BASE_URL=https://your-internal-api.example.com
   EXPO_PUBLIC_INTERNAL_AUTH_TOKEN=your-secret-internal-token
   ```

   **IMPORTANT**: Never commit the `.env` file. It is in `.gitignore` by design.

## Running the App

```bash
# Start Expo dev server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run in web browser (development only)
npm run web
```

## Authentication

The app enforces bearer token authentication on all API requests:

- Authentication is configured at app startup
- All API calls include `Authorization: Bearer <token>` header
- Missing or invalid tokens prevent app initialization
- 401/403 responses trigger authentication errors

## Project Structure

```
mobile/
├── app/                    # Expo Router pages
│   ├── _layout.tsx        # Root layout with auth initialization
│   └── index.tsx          # Home screen
├── src/
│   ├── services/          # Core services
│   │   ├── auth.ts        # Authentication service
│   │   ├── api.ts         # API client with auth gating
│   │   └── config.ts      # Environment configuration
│   ├── store/             # Zustand state management
│   │   └── appStore.ts    # Global app state
│   ├── components/        # Reusable UI components
│   ├── screens/           # Screen components
│   └── types/             # TypeScript type definitions
├── app.json               # Expo configuration
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript configuration
└── .env.example           # Environment template
```

## Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Development

```bash
# Type checking
npm run type-check

# Linting
npm run lint
```

## Security Notes

- **Never commit `.env` file or expose `EXPO_PUBLIC_INTERNAL_AUTH_TOKEN`**
- This app is for internal use only
- All API communication uses bearer token authentication
- Contact the platform team for credential issues

## Tech Stack

- **Framework**: Expo SDK 50 with Expo Router
- **Language**: TypeScript (strict mode)
- **State Management**: Zustand
- **HTTP Client**: Axios with interceptors
- **Testing**: Jest + React Native Testing Library
- **UI**: React Native with Safe Area Context

## Next Steps

This scaffold provides the foundation. To build the Quantum LLM Sentinel interface:

1. Add screen navigation and routing
2. Implement LLM monitoring UI components
3. Add real-time data visualization
4. Integrate with backend APIs
5. Implement comprehensive error handling
6. Add user preferences and settings

## Support

For access issues or questions:
- Contact the internal platform team
- Review internal documentation
- Check with project maintainers
