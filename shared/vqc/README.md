# Shared VQC Module

This module provides quantum-inspired Variational Quantum Classifier (VQC) computation 
that can be used by both iOS (Swift) and Android (Kotlin) applications.

## Overview

The VQC module implements a classical simulation of a variational quantum circuit 
for binary classification tasks.

## Key Components

### Core Classes
- `VQCCircuit`: Main circuit implementation
- `ParameterizedGate`: Represents parameterized quantum gates
- `Optimizer`: Gradient-based optimization for training

### Functions
- `encode_features()`: Encodes classical features into quantum states
- `apply_ansatz()`: Applies the variational ansatz
- `measure()`: Performs measurements and returns classification
- `train()`: Training loop for the VQC

## Usage

### Swift
```swift
import VQCModule

let vqc = VQCCircuit(numQubits: 2, numLayers: 3)
let result = vqc.classify(features: [0.5, 0.3])
```

### Kotlin
```kotlin
import com.quantumml.vqc.VQCCircuit

val vqc = VQCCircuit(numQubits = 2, numLayers = 3)
val result = vqc.classify(features = listOf(0.5, 0.3))
```

## Implementation Status

- [x] Basic circuit structure
- [x] Feature encoding
- [x] Parameterized gates
- [ ] Full gradient computation
- [ ] Hardware backend integration

## Next Steps

1. Implement gradient computation for VQC training
2. Add support for different ansatz types
3. Integrate with cloud quantum providers
4. Optimize for mobile performance
