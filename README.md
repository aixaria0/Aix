# Quantum AGI Game Framework (Prototype)

## Vision
A next-generation hybrid game engine blending:
- On-device quantum-inspired simulation (VQC, VQE, entanglement puzzles) for instant, smooth gameplay.
- Cloud quantum backends (Qiskit / Azure Quantum / Braket) for advanced multi-qubit challenges.
- Adaptive AGI Director (LLM-driven) generating dynamic levels, tutorials, and daily quantum missions.

## Modes
1. Offline/NISQ Mode (Local): Fast, 1–4 qubit simulations, variational training loops, educational visualization (Bloch spheres, Bell states).
2. Online/Cloud Mode: Remote execution of larger circuits + AGI narrative & difficulty orchestration.

## Repository Structure (Planned Option B Scope)
```
apps/
  ios/QuantumAIX/
    QuantumCore/ (VQC, VQE math, entanglement logic)
    Views/ (BlochSphere, SingleQubit, TwoQubit, VQCTraining, Menu)
  android/app/
    src/main/java/com/aix/quantumgame/core/ (VQC math Kotlin)
    src/main/java/com/aix/quantumgame/ui/ (Compose screens)
services/
  agi/ (FastAPI scaffold: director, content generation)
  quantum-bridge/ (Provider interface: base + mock adapters)
.github/workflows/ (CI: ios, android, codeql)
```

## Roadmap Milestones
- M0: Offline Prototype (iOS + Android VQC + Bloch + Entanglement)
- M1: Game Layer (Levels, scoring, progression, VQE mini-bosses)
- M2: Cloud Quantum + AGI Director Integration
- M3: Launch (Performance, polish, multi-provider support)

## Tech Stack
- iOS: SwiftUI + SceneKit/Metal (future), Swift concurrency
- Android: Kotlin + Jetpack Compose
- Shared Logic: Initially duplicated; future unification (Rust/C++ core or Kotlin Multiplatform)
- Services: FastAPI (Python 3.11), optional expansion to Node microservices
- Quantum Backends: Planned adapters (IBM Qiskit, Azure Quantum, AWS Braket)
- AGI Layer: Pluggable LLM provider interface (director + content + coach agents)

## Core Quantum Features
- Bloch Sphere Visualization (single/multi-qubit)
- Bell State Creation & Measurement (entanglement puzzles)
- Variational Quantum Classifier (parameter-shift gradients on device)
- VQE Mini-Levels (Ising/H₂ toy Hamiltonians) [future in Option C]

## CI/CD (to be added)
- iOS Build & Lint (SwiftLint, SwiftFormat)
- Android Gradle Build + ktlint
- CodeQL Security Scanning
- Secret Scanning (GitHub native)

## Contributing (Early Phase)
1. Fork & branch: `feature/<descriptor>`
2. Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`
3. PR targets `quantum-game-prototype` until stabilization, then `main` merges via reviewed PR.

## License
MIT (see LICENSE)

## Next Actions (Execution Log)
- [x] Create branch `quantum-game-prototype`
- [ ] Add iOS core files
- [ ] Add Android skeleton
- [ ] Add services scaffolds
- [ ] Add CI workflows
- [ ] Seed issues & milestones

## Contact
Owner: @aixaria0
