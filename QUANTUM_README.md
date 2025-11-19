# Aix - Quantum Machine Learning Game

**Aix** is a quantum machine learning game that incorporates offline quantum-inspired computation and hybrid quantum cloud capabilities. The project provides an interactive platform for learning quantum computing through gameplay, with native iOS and Android applications backed by cloud quantum services.

## 🎯 Project Overview

This repository contains the foundational codebase for a quantum machine learning game featuring:

- **Native Mobile Apps**: iOS (SwiftUI) and Android (Jetpack Compose) with shared quantum computation
- **Quantum Visualizations**: Interactive Bloch Sphere for 1 and 2 qubits
- **Variational Quantum Classifier (VQC)**: Training mode with live decision boundary visualization
- **Backend Services**: AGI service for adaptive gameplay and Quantum Bridge for cloud provider integration
- **CI/CD Pipeline**: Automated builds, linting, and security scanning

## 📱 Features

### iOS Functionality
- ✅ **Bloch Sphere Visualization** - Interactive 1 and 2 qubit state visualization
- ✅ **VQC Training Mode** - Live decision boundary visuals during quantum classifier training
- ✅ **Starting Menu** - Game mode selection and navigation

### Android Parity
- ✅ **Compose-based UI** - Modern Jetpack Compose architecture
- ✅ **Feature Parity** - Matching iOS functionality with platform-specific design
- ✅ **Shared Quantum Modules** - Core VQC and VQE computation shared with iOS

### Backend Services
- ✅ **AGI Service** - FastAPI-based adaptive game intelligence with pluggable LLM
- ✅ **Quantum Bridge** - Abstract interface for IBM Qiskit, Azure Quantum, AWS Braket

### CI/CD
- ✅ **iOS Workflow** - Xcode/macOS builds and tests
- ✅ **Android Workflow** - Gradle builds and tests
- ✅ **Linting** - SwiftLint for iOS, ktlint for Android
- ✅ **Security Scanning** - CodeQL analysis

## 🚀 Quick Start

### Prerequisites

**iOS Development:**
- macOS with Xcode 15.0 or later
- iOS 17.0+ target device or simulator

**Android Development:**
- JDK 17
- Android Studio Arctic Fox or later
- Android SDK API 24+

**Backend Services:**
- Python 3.11+
- Node.js 18+ (optional)

### Installation

#### Clone the Repository
```bash
git clone https://github.com/aixaria0/Aix.git
cd Aix
```

#### iOS App
```bash
cd ios-app/QuantumMLGame
open QuantumMLGame.xcodeproj
# Build and run in Xcode
```

#### Android App
```bash
cd android-app
./gradlew build
./gradlew installDebug
```

#### AGI Service
```bash
cd backend/agi-service
pip install -r requirements.txt
python main.py
# Service runs on http://localhost:8000
```

#### Quantum Bridge
```bash
cd backend/quantum-bridge
pip install -r requirements.txt
python quantum_bridge.py
```

## 📁 Project Structure

```
Aix/
├── ios-app/                          # iOS Application
│   └── QuantumMLGame/
│       ├── QuantumMLGame/            # App source
│       │   ├── QuantumMLGameApp.swift
│       │   ├── ContentView.swift
│       │   └── Views/
│       │       ├── MenuView.swift
│       │       ├── BlochSphereView.swift
│       │       └── VQCTrainingView.swift
│       └── QuantumMLGame.xcodeproj   # Xcode project
│
├── android-app/                      # Android Application
│   ├── app/
│   │   └── src/main/kotlin/com/quantumml/game/
│   │       ├── MainActivity.kt
│   │       ├── QuantumMLGameApp.kt
│   │       └── ui/
│   │           ├── screens/
│   │           │   ├── MenuScreen.kt
│   │           │   ├── BlochSphereScreen.kt
│   │           │   └── VQCTrainingScreen.kt
│   │           └── theme/
│   │               └── Theme.kt
│   ├── build.gradle
│   └── settings.gradle
│
├── backend/                          # Backend Services
│   ├── agi-service/                  # Adaptive Game Intelligence
│   │   ├── main.py                   # FastAPI service
│   │   ├── requirements.txt
│   │   └── README.md
│   └── quantum-bridge/               # Quantum Cloud Integration
│       ├── quantum_bridge.py         # Provider interface
│       ├── requirements.txt
│       └── README.md
│
├── shared/                           # Shared Quantum Modules
│   ├── vqc/                          # Variational Quantum Classifier
│   │   ├── vqc_module.py
│   │   └── README.md
│   └── vqe/                          # Variational Quantum Eigensolver
│       └── README.md
│
├── .github/
│   └── workflows/                    # CI/CD Workflows
│       ├── ios-build.yml
│       ├── android-build.yml
│       ├── swiftlint.yml
│       ├── ktlint.yml
│       ├── codeql.yml
│       └── backend-tests.yml
│
├── .swiftlint.yml                    # SwiftLint configuration
├── README.md                         # This file
└── mobile/                           # Original Expo app (legacy)
```

## 🎮 Game Modes

### Bloch Sphere
Interactive visualization of quantum states on the Bloch sphere:
- **1 Qubit Mode**: Visualize single qubit states with θ (theta) and φ (phi) parameters
- **2 Qubit Mode**: Explore two-qubit product states simultaneously
- Real-time probability calculations
- Educational quantum state representations

### VQC Training
Train a variational quantum classifier with visual feedback:
- **Live Decision Boundary**: Watch the classifier learn in real-time
- **Training Metrics**: Track epoch, accuracy, and loss
- **Adjustable Parameters**: Learning rate and circuit layers
- **Interactive Training**: Start, pause, and reset training sessions

### Quantum Challenges (Coming Soon)
Gamified quantum computing challenges and puzzles.

## 🔧 Technology Stack

### Mobile
- **iOS**: SwiftUI, iOS 17+, Swift 5.0
- **Android**: Jetpack Compose, Material3, Kotlin 1.9

### Backend
- **AGI Service**: FastAPI, Python 3.11, Uvicorn
- **Quantum Bridge**: Python 3.11, abstract provider interface

### Quantum Providers (Supported)
- IBM Qiskit Runtime
- Azure Quantum (IonQ, Quantinuum)
- AWS Braket
- Mock Backend (for development)

### CI/CD
- GitHub Actions
- SwiftLint / ktlint
- CodeQL Security Scanning
- Automated builds and tests

## 🧪 Testing

### iOS
```bash
cd ios-app/QuantumMLGame
xcodebuild test \
  -project QuantumMLGame.xcodeproj \
  -scheme QuantumMLGame \
  -sdk iphonesimulator \
  -destination 'platform=iOS Simulator,name=iPhone 15'
```

### Android
```bash
cd android-app
./gradlew test
./gradlew connectedAndroidTest
```

### Backend
```bash
cd backend/agi-service
pytest tests/

cd ../quantum-bridge
python quantum_bridge.py
```

## 🔐 Security

Security is a priority for this project:

- **CodeQL Scanning**: Automated security analysis
- **Secret Scanning**: Prevents accidental credential commits
- **Dependency Updates**: Regular security patches
- **Secure API Keys**: Environment-based configuration

For vulnerability reporting, see [SECURITY.md](SECURITY.md).

## 📚 Documentation

Detailed documentation is available for each component:

- **[iOS App](ios-app/QuantumMLGame/README.md)** - iOS-specific documentation (TODO)
- **[Android App](android-app/README.md)** - Android-specific documentation (TODO)
- **[AGI Service](backend/agi-service/README.md)** - AGI service API and configuration
- **[Quantum Bridge](backend/quantum-bridge/README.md)** - Quantum provider integration
- **[VQC Module](shared/vqc/README.md)** - VQC implementation details
- **[VQE Module](shared/vqe/README.md)** - VQE implementation details

## 🛣️ Roadmap

### Phase 1: Foundation (Current)
- [x] iOS app with Bloch Sphere and VQC training
- [x] Android app with feature parity
- [x] Shared quantum computation modules
- [x] AGI service scaffolding
- [x] Quantum Bridge interface
- [x] CI/CD workflows

### Phase 2: Cloud Integration
- [ ] Integrate real quantum providers (IBM, Azure, AWS)
- [ ] Implement job queuing and result caching
- [ ] Add cost estimation and optimization
- [ ] Enhanced error mitigation

### Phase 3: Advanced Features
- [ ] Additional quantum algorithms (QAOA, Grover, etc.)
- [ ] Multiplayer challenges
- [ ] Leaderboards and achievements
- [ ] VQE molecular simulation
- [ ] Quantum chemistry integration

### Phase 4: Production
- [ ] Backend deployment (Kubernetes/Cloud Run)
- [ ] App Store and Play Store releases
- [ ] User analytics and monitoring
- [ ] A/B testing for game mechanics
- [ ] Community features

## 🤝 Contributing

This is an early-stage project. Contributions are welcome!

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- **Swift**: Follow SwiftLint configuration
- **Kotlin**: Follow ktlint configuration
- **Python**: PEP 8 with Black formatter

## 📄 License

This project is proprietary and for internal development only.

## 🙏 Acknowledgments

- **Quantum Computing Community**: For open-source quantum frameworks
- **IBM Quantum**: Qiskit and quantum education resources
- **Microsoft Azure Quantum**: Cloud quantum platform
- **AWS Braket**: Amazon's quantum computing service

## 📞 Contact & Support

For questions or support:
- Open an issue in this repository
- Review the documentation in each component
- Check the API documentation (FastAPI /docs endpoint)

---

**Built with ❤️ for quantum computing education**

*Explore the quantum realm through interactive gameplay!*
