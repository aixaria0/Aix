# Aix

**Aix** is an internal mobile testing platform designed for exploratory security testing and vulnerability tracking. Built with Expo and React Native, it provides a comprehensive solution for security teams to manage test jobs, track metrics, review vulnerability reports, and engage with gamification features.

## 🎯 Overview

Aix is a complete mobile application scaffold that demonstrates best practices for building production-ready React Native applications. It serves as an internal tool for security testing workflows and includes:

- **Authentication System** - Token-based authentication with secure storage
- **Metrics Dashboard** - Real-time tracking of jobs, scores, and success ratios
- **Vulnerability Reports** - Comprehensive reporting system with severity classification
- **Gamification** - XP system, level progression, and achievement badges
- **Theme Support** - Light and dark mode with persistent user preferences
- **Modern Architecture** - TypeScript, Zustand state management, and comprehensive testing

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Expo CLI (optional, but recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/aixaria0/Aix.git

# Navigate to the mobile directory
cd Aix/mobile

# Install dependencies
npm install

# Start the development server
npm start
```

### Running Tests

```bash
cd mobile
npm test              # Run all tests
npm run typecheck     # Check TypeScript types
```

## 📱 Features

### Authentication
- Secure token validation with simulated API ping
- Encrypted token storage using Expo SecureStore
- Error handling with user-friendly feedback

### Metrics Dashboard
- Track total and active jobs
- Monitor average scores and success ratios
- Pull-to-refresh functionality
- Animated chart visualizations (placeholder)

### Reports System
- Browse vulnerability reports with severity indicators
- Color-coded badges (Critical, High, Medium, Low)
- Detailed report views with risk scores
- Prompt lineage tracking

### Gamification
- Earn 25 XP per test creation
- 5 level progression system
- 3 achievement badges (Starter, Explorer, Strategist)
- Visual progress tracking

### Theme System
- Light and dark mode support
- System appearance detection
- Persistent theme preferences
- Consistent color palette throughout

## 📁 Project Structure

```
Aix/
├── mobile/                    # Expo mobile application
│   ├── app/                   # Application screens
│   │   ├── (tabs)/           # Tab navigation screens
│   │   ├── auth/             # Authentication screens
│   │   └── report/           # Report detail screens
│   ├── src/                   # Source code
│   │   ├── api/              # API integration layer
│   │   ├── components/       # Reusable components
│   │   ├── store/            # Zustand state management
│   │   └── theme/            # Theme configuration
│   ├── __tests__/            # Test files
│   └── ...                    # Configuration files
├── COMPLETION_SUMMARY.md      # Project completion summary
├── PROJECT_DELIVERY.md        # Delivery documentation
├── SECURITY.md                # Security policy
└── README.md                  # This file
```

## 📚 Documentation

Comprehensive documentation is available in the `/mobile` directory:

- **[Mobile README](mobile/README.md)** - Complete mobile app documentation
- **[Architecture](mobile/ARCHITECTURE.md)** - System architecture and design decisions
- **[Implementation Summary](mobile/IMPLEMENTATION_SUMMARY.md)** - Detailed implementation checklist
- **[Requirements Checklist](mobile/REQUIREMENTS_CHECKLIST.md)** - Point-by-point verification

## 🧪 Testing

The project includes comprehensive test coverage:

- **17 passing tests** across authentication and gamification features
- **100% test pass rate** for core business logic
- TypeScript strict mode enabled for type safety

```bash
cd mobile
npm test
```

## 🛠️ Technology Stack

- **Expo SDK 54** - React Native framework
- **React Native 0.81.5** - Mobile UI framework
- **TypeScript 5.9** - Type-safe development
- **Zustand 5.0** - Lightweight state management
- **React Native Reanimated 4.1** - Smooth animations
- **Jest 29.7** - Testing framework
- **Expo SecureStore** - Encrypted storage

## 🔐 Security

This application is designed for **internal use only** and includes:

- Secure token storage with encryption
- Input validation for authentication
- No hardcoded secrets or credentials
- Security policy documentation (see [SECURITY.md](SECURITY.md) — currently a template, project-specific policy forthcoming)

For vulnerability reporting, please refer to our [Security Policy](SECURITY.md) (note: this file is currently a placeholder and will be updated).

## 🎯 Current Status

✅ **Complete and Ready for Internal Testing**

- All core features implemented
- Comprehensive test coverage
- Full TypeScript support
- Production-ready architecture
- Extensive documentation

## 🔄 Future Enhancements

The following features are planned for future iterations:

- Real backend API integration (currently using mock data)
- Advanced chart visualizations
- Push notifications
- Additional gamification features
- EAS build configuration for distribution

## 📝 Integration Guide

All API integration points are marked with `// TODO(api):` comments in the code. Key integration areas:

1. **Authentication** - `src/api/auth.ts`
2. **Metrics** - `src/store/useMetrics.ts`
3. **Reports** - `src/store/useReports.ts`

## 🤝 Contributing

This is an internal project. For team members:

1. Follow existing code patterns and conventions
2. Write tests for new features
3. Use TypeScript strict mode
4. Update documentation as needed
5. Follow the established architecture

## 📄 License

This project is proprietary and for internal use only.

## 📞 Support

For questions or support, please refer to:

- [Mobile README](mobile/README.md) for app-specific documentation
- [Architecture Guide](mobile/ARCHITECTURE.md) for technical details
- [Project Delivery Report](PROJECT_DELIVERY.md) for complete project overview

---

**Built with ❤️ for internal security testing**
