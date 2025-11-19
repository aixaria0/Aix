# Aix - Quantum Machine Learning Game

**Aix** is a quantum machine learning game that incorporates offline quantum-inspired computation and hybrid quantum cloud capabilities. The project provides an interactive platform for learning quantum computing through gameplay, with native iOS and Android applications backed by cloud quantum services.

## 🎯 Project Overview

This repository contains a quantum machine learning game featuring:

- **Native Mobile Apps**: iOS (SwiftUI) and Android (Jetpack Compose) with interactive quantum visualizations
- **Bloch Sphere**: Visualization for 1 and 2 qubits with real-time parameter control
- **VQC Training**: Variational Quantum Classifier with live decision boundary visualization
- **Backend Services**: AGI service for adaptive gameplay and Quantum Bridge for cloud provider integration
- **Shared Quantum Modules**: VQC and VQE computation modules
- **CI/CD Pipeline**: Automated builds, linting, and security scanning

---

## 📱 Mobile Applications

### iOS App (SwiftUI)
Located in `ios-app/QuantumMLGame/`

**Features:**
- ✅ Bloch Sphere visualization (1 and 2 qubits)
- ✅ VQC training mode with decision boundaries
- ✅ Interactive parameter controls
- ✅ Starting menu with game modes

**Tech Stack:**
- SwiftUI
- iOS 17.0+
- Swift 5.0

### Android App (Jetpack Compose)
Located in `android-app/`

**Features:**
- ✅ Bloch Sphere visualization (1 and 2 qubits)
- ✅ VQC training mode with decision boundaries
- ✅ Material 3 design
- ✅ Feature parity with iOS

**Tech Stack:**
- Jetpack Compose
- Material 3
- Kotlin 1.9

---

## 🔧 Backend Services

### AGI Service
`backend/agi-service/`

FastAPI-based adaptive game intelligence with pluggable LLM support.

**Features:**
- Adaptive difficulty adjustment
- Context-aware hints
- Challenge generation
- Performance feedback
- Pluggable LLM providers (OpenAI, Anthropic, local models)

**Quick Start:**
```bash
cd backend/agi-service
pip install -r requirements.txt
python main.py
# Runs on http://localhost:8000
```

### Quantum Bridge
`backend/quantum-bridge/`

Abstract interface for cloud quantum providers.

**Supported Providers:**
- IBM Qiskit Runtime
- Azure Quantum
- AWS Braket
- Mock Backend (for development)

**Quick Start:**
```bash
cd backend/quantum-bridge
python quantum_bridge.py
```

---

## 🧮 Shared Quantum Modules

### VQC Module
`shared/vqc/`

Variational Quantum Classifier implementation for binary classification.

**Features:**
- Feature encoding
- Parameterized quantum circuits
- Gradient-based optimization
- Classical simulation optimized for mobile

### VQE Module
`shared/vqe/`

Variational Quantum Eigensolver for finding ground state energies.

---

## 🚀 Quick Start

### Prerequisites

**iOS Development:**
- macOS with Xcode 15.0+
- iOS 17.0+ target

**Android Development:**
- JDK 17
- Android Studio
- Android SDK API 24+

**Backend:**
- Python 3.11+

### Installation

```bash
# Clone repository
git clone https://github.com/aixaria0/Aix.git
cd Aix

# iOS App
cd ios-app/QuantumMLGame
open QuantumMLGame.xcodeproj

# Android App
cd android-app
./gradlew build
./gradlew installDebug

# Backend Services
cd backend/agi-service
pip install -r requirements.txt
python main.py
```

---

## 🎮 Game Modes

### 1. Bloch Sphere
Interactive visualization of quantum states:
- Single qubit state manipulation with θ and φ parameters
- Two-qubit product state visualization
- Real-time probability calculations
- Educational quantum state representations

### 2. VQC Training
Train a variational quantum classifier:
- Live decision boundary visualization
- Training metrics (epoch, accuracy, loss)
- Adjustable learning rate and circuit layers
- Interactive training controls

### 3. Quantum Challenges (Coming Soon)
Gamified quantum computing challenges and puzzles.

---

## 🧪 CI/CD Workflows

Located in `.github/workflows/`

- ✅ **iOS Build** - Xcode builds and tests
- ✅ **Android Build** - Gradle builds and tests
- ✅ **SwiftLint** - iOS code style enforcement
- ✅ **ktlint** - Android/Kotlin code style
- ✅ **CodeQL** - Security scanning
- ✅ **Backend Tests** - Python service tests

---

## 📁 Project Structure

```
Aix/
├── ios-app/                    # iOS Application (SwiftUI)
│   └── QuantumMLGame/
├── android-app/                # Android Application (Compose)
│   ├── app/src/main/kotlin/
│   └── build.gradle
├── backend/                    # Backend Services
│   ├── agi-service/           # Adaptive Game Intelligence
│   └── quantum-bridge/        # Quantum Cloud Interface
├── shared/                     # Shared Quantum Modules
│   ├── vqc/                   # Variational Quantum Classifier
│   └── vqe/                   # Variational Quantum Eigensolver
├── .github/workflows/          # CI/CD Workflows
├── mobile/                     # Legacy Expo app
└── README.md                   # This file
```

---

## 🔐 Security

- **CodeQL Scanning**: Automated security analysis
- **Secret Scanning**: Prevents credential leaks
- **Dependency Updates**: Regular security patches
- **Secure Configuration**: Environment-based secrets

For vulnerability reporting, see [SECURITY.md](SECURITY.md).

---

## 📚 Documentation

Comprehensive documentation available:

- **[Full Quantum Game Docs](QUANTUM_README.md)** - Complete documentation
- **[AGI Service](backend/agi-service/README.md)** - API and configuration
- **[Quantum Bridge](backend/quantum-bridge/README.md)** - Provider integration
- **[VQC Module](shared/vqc/README.md)** - Implementation details
- **[VQE Module](shared/vqe/README.md)** - VQE details

---

## 🛣️ Roadmap

### Phase 1: Foundation ✅
- [x] iOS and Android apps
- [x] Bloch Sphere visualization
- [x] VQC training mode
- [x] Backend service scaffolding
- [x] CI/CD workflows

### Phase 2: Cloud Integration
- [ ] Real quantum provider integration
- [ ] Job queuing and result caching
- [ ] Cost estimation
- [ ] Error mitigation

### Phase 3: Advanced Features
- [ ] Additional quantum algorithms
- [ ] Multiplayer challenges
- [ ] Leaderboards
- [ ] Quantum chemistry integration

### Phase 4: Production
- [ ] Cloud deployment
- [ ] App Store releases
- [ ] Analytics and monitoring

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Follow code style (SwiftLint/ktlint)
4. Submit a Pull Request

---

## 📄 License

Proprietary - Internal development only.

---

## 🙏 Acknowledgments

- IBM Quantum (Qiskit)
- Microsoft Azure Quantum
- AWS Braket
- Open-source quantum computing community

---

**Built with ❤️ for quantum computing education**

*Explore the quantum realm through interactive gameplay!*
