# VQE-PHARMACY Architecture Documentation

## System Overview

VQE-PHARMACY implements a comprehensive quantum chemistry pipeline optimized for the IBM Quantum Heron R3 processor. The architecture follows a modular design pattern with clear separation of concerns across the quantum-classical workflow.

## Architecture Layers

### 1. Classical Chemistry Layer (`drivers/`)

**Purpose**: Interface with classical quantum chemistry packages to generate molecular Hamiltonians.

**Components**:
- `MolecularDriver`: PySCF integration for Hartree-Fock calculations
- `MOLECULAR_TEMPLATES`: Predefined molecular geometries
- `create_molecule()`: Factory function for common molecules

**Key Technologies**:
- PySCF for ab-initio calculations
- NumPy for integral management
- Active space selection via CASSCF

**Data Flow**:
```
Molecular Geometry → PySCF → Hartree-Fock → Molecular Orbitals → Integrals
```

### 2. Mapping Layer (`mappers/`)

**Purpose**: Transform fermionic operators to qubit Pauli operators.

**Components**:
- `QubitMapper`: Unified interface for all mappings
- `MappingType`: Enumeration of mapping strategies
- Support for Jordan-Wigner, Bravyi-Kitaev, and Parity mappings

**Mapping Characteristics**:

| Mapping | Qubit Count | Gate Depth | Symmetry Reduction |
|---------|-------------|------------|--------------------|
| Jordan-Wigner | 2N | O(N) | No |
| Bravyi-Kitaev | 2N | O(log N) | No |
| Parity | 2N or 2N-2 | O(N) | Yes (with reduction) |

**Design Decisions**:
- Default to Jordan-Wigner for benchmarking (simple, predictable)
- Recommend Bravyi-Kitaev for Heron chip (reduced SWAP overhead)
- Parity mapping for systems with Z2 symmetries

### 3. Ansatz Layer (`ansatze/`)

**Purpose**: Construct parameterized quantum circuits for VQE.

**Components**:
- `AnsatzBuilder`: Hardware-efficient circuits
- `UCCSDBuilder`: Chemistry-inspired circuits
- `create_ansatz()`: Factory function

**Ansatz Design Philosophy**:

1. **Hardware-Efficient Ansatze** (Recommended for NISQ):
   - `EfficientSU2`: RY-RZ rotations + CX entanglers
   - `RealAmplitudes`: RY-only rotations (fewer parameters)
   - `TwoLocal`: Custom rotation/entanglement blocks

2. **Chemistry-Inspired Ansatze**:
   - `UCCSD`: Full singles/doubles excitations (deep circuits)
   - `ADAPT-VQE`: Iteratively grown ansatz (future work)

**Circuit Depth Estimation**:
```
Depth ≈ reps × (rotation_layers + entanglement_layers)
     ≈ reps × (2 + num_qubits - 1)  [for linear connectivity]
```

**Parameter Scaling**:
```
Parameters ≈ reps × num_qubits × num_rotation_gates
```

### 4. Error Mitigation Layer (`error_mitigation/`)

**Purpose**: Reduce noise impact on quantum measurements.

**Components**:
- `ZeroNoiseExtrapolation`: Extrapolate to zero-noise limit
- `ReadoutErrorMitigation`: Correct measurement errors
- `DynamicalDecoupling`: Combat decoherence during idle times

**Mitigation Pipeline**:
```
Raw Measurement → Readout Mitigation → ZNE → Mitigated Result
                     ↓
              Dynamical Decoupling (during circuit execution)
```

**ZNE Strategy**:
1. Run circuit at noise scales [1×, 2×, 3×]
2. Fit polynomial to (noise_scale, energy) pairs
3. Extrapolate to noise_scale = 0

**Readout Mitigation**:
1. Characterize measurement confusion matrix M
2. Invert: true_probs = M⁻¹ × measured_probs
3. Clip negative probabilities and renormalize

### 5. Core Workflow Layer (`core/`)

**Purpose**: Orchestrate the complete VQE pipeline.

**Components**:
- `VQEWorkflow`: Main workflow class
- `run_benchmark_h2()`: H2 baseline benchmark

**Workflow State Machine**:

```
[Initialize] → [Setup Problem] → [Build Ansatz] → [Optimize] → [Results]
       ↓              ↓                ↓              ↓            ↓
   Config      PySCF Driver    Circuit Builder   SPSA/COBYLA   Energy
```

**Optimization Loop**:
```python
while not converged:
    1. Prepare state |ψ(θ)⟩
    2. Measure expectation ⟨H⟩
    3. Classical optimizer updates θ
    4. Repeat
```

## Data Models

### Molecular Data Structure
```python
{
    "num_orbitals": int,           # Spatial orbitals
    "num_electrons": int,          # Total electrons
    "nuclear_repulsion_energy": float,
    "hf_energy": float,            # Hartree-Fock energy
    "one_body_integrals": ndarray, # Shape (N, N)
    "two_body_integrals": ndarray, # Shape (N, N, N, N)
    "mo_coeff": ndarray            # MO coefficients
}
```

### VQE Result Structure
```python
{
    "ground_state_energy": float,
    "hartree_fock_energy": float,
    "nuclear_repulsion_energy": float,
    "num_qubits": int,
    "num_electrons": int,
    "num_parameters": int,
    "circuit_depth": int,
    "optimizer": str,
    "mapping": str,
    "ansatz": str,
    "status": str
}
```

## Hardware Considerations

### IBM Quantum Heron R3 Specifications

| Property | Specification | Impact |
|----------|--------------|---------|
| Qubit Count | 133 | Allows up to ~30 active qubits after active space reduction |
| T1 (Relaxation) | ~300 μs | Supports deeper circuits than previous generations |
| T2 (Coherence) | ~100 μs | Enables multiple measurement rounds |
| 2-Qubit Gate Fidelity | >99% | Reduces error accumulation |
| Topology | Heavy-Hex | Requires topology-aware circuit transpilation |

### Topology-Aware Compilation

Heron R3 uses **Heavy-Hex** lattice:
- Each qubit has up to 3 neighbors
- Reduced crosstalk vs. grid topology
- Requires SWAP insertion for non-local gates

**Optimization Strategy**:
1. Use `BravyiKitaevMapper` to reduce Pauli weight
2. Design ansatz with linear/nearest-neighbor entanglement
3. Transpile with `optimization_level=3`
4. Apply dynamical decoupling on idle qubits

## Scalability Analysis

### Qubit Count Scaling

| Molecule | Electrons | Full Space | Active Space | Target Qubits |
|----------|-----------|------------|--------------|---------------|
| H2 | 2 | 4 qubits | 4 qubits | 4 |
| LiH | 4 | 12 qubits | 8 qubits | 6-8 |
| H2O | 10 | 14 qubits | 10 qubits | 8-10 |
| Imidazole | 40 | 80+ qubits | 16-20 qubits | 12-16 |

### Active Space Selection Strategy

For molecule with N electrons in M orbitals:
1. Run full HF calculation
2. Identify frontier orbitals (HOMO-LUMO region)
3. Select (n, m) active space where:
   - n = number of active electrons
   - m = number of active orbitals
   - Typically: n ≤ 12, m ≤ 15 for Heron R3

### Circuit Depth Budget

Target: **Circuit depth < 1000** for Heron R3

| Component | Depth Contribution |
|-----------|-------------------|
| State Preparation | ~50-100 |
| Ansatz (1 rep) | ~(2 + num_qubits) |
| Measurement Basis Rotation | ~10-20 |
| Dynamical Decoupling | ~20% overhead |

**Depth Management**:
- Limit ansatz reps to 1-3
- Use circuit optimization (gate cancellation, commutation)
- Prefer RealAmplitudes over EfficientSU2 for shallower circuits

## Optimization Strategy

### Optimizer Selection Matrix

| Scenario | Optimizer | Rationale |
|----------|-----------|-----------|
| Real Hardware | SPSA | Gradient-free, noise-robust, proven on NISQ |
| Simulator | COBYLA | Faster convergence in noiseless regime |
| High-dimensional | SPSA | Scales well with parameters |
| Fine-tuning | L-BFGS-B | Local refinement after SPSA |

### Convergence Criteria

```python
converged = (
    abs(E_new - E_old) < 1e-6  # Energy threshold (Ha)
    or iteration > max_iter
    or std(E_history[-10:]) < 1e-5  # Stability check
)
```

## Error Budget

Target: **Chemical accuracy (1.6 mHa = 1 kcal/mol)**

| Error Source | Typical Magnitude | Mitigation |
|--------------|-------------------|------------|
| Gate Errors | 1-10 mHa | Error mitigation (ZNE) |
| Readout Errors | 5-20 mHa | Confusion matrix inversion |
| Decoherence | 2-15 mHa | Dynamical decoupling, shallow circuits |
| Basis Set Truncation | 5-50 mHa | Use 6-31G when possible |
| Active Space | 10-100 mHa | Careful orbital selection |
| Shot Noise | ~1/√shots mHa | Use 10k+ shots |

**Combined Strategy**:
- Use ZNE to reduce gate errors by 2-5×
- Readout mitigation for another 2-3× improvement
- Dynamical decoupling to extend coherence
- Result: Potential to achieve <5 mHa error on small molecules

## Security Considerations

1. **API Keys**: IBM Quantum credentials stored securely
2. **Data Privacy**: Molecular structures may be proprietary
3. **Resource Quotas**: Monitor quantum time usage
4. **Audit Trail**: Log all quantum job submissions

## Performance Metrics

### Key Performance Indicators (KPIs)

1. **Accuracy**: |E_VQE - E_FCI| < 1.6 mHa
2. **Convergence**: < 100 iterations
3. **Circuit Efficiency**: Depth/qubit ratio < 50
4. **Quantum Time**: < 30 min per molecule
5. **Success Rate**: > 80% of runs converge

### Benchmarking Protocol

1. **H2 at equilibrium** (0.74 Å): Reference test
2. **H2 dissociation curve**: Test correlation handling
3. **LiH**: Heteronuclear test
4. **H2O**: Multi-atom test
5. **Custom fragments**: Application-specific

## Future Enhancements

### Short-term (Phase 2)
- [ ] Real IBM Heron backend integration
- [ ] Qiskit Runtime Estimator with Sessions
- [ ] Adaptive circuit compilation
- [ ] Parallel VQE for multiple geometries

### Medium-term (Phase 3)
- [ ] ADAPT-VQE implementation
- [ ] Subspace search VQE
- [ ] Quantum equation-of-motion (qEOM)
- [ ] Excited state calculations

### Long-term (Production)
- [ ] Drug fragment library integration
- [ ] Automated workflow optimization
- [ ] Results database and analytics
- [ ] Multi-backend orchestration

## Dependencies and Versioning

### Core Dependencies
- **Qiskit 1.0+**: Quantum circuits and compilation
- **Qiskit Nature 0.7+**: Chemistry-specific tools
- **PySCF 2.5+**: Classical chemistry calculations
- **NumPy 1.24+**: Numerical operations
- **SciPy 1.11+**: Optimization algorithms

### Version Compatibility Matrix

| Component | Min Version | Tested Version | Notes |
|-----------|------------|----------------|-------|
| Python | 3.8 | 3.10, 3.11 | 3.8+ for walrus operator |
| Qiskit | 1.0 | 1.0.0 | Major API changes in 1.0 |
| PySCF | 2.0 | 2.5.0 | 2.5 recommended for stability |
| IBM Runtime | 0.15 | 0.20.0 | Primitives-based API |

## Testing Strategy

### Test Coverage Goals
- **Unit Tests**: > 80% coverage
- **Integration Tests**: All workflow paths
- **Regression Tests**: Benchmark molecules
- **Hardware Tests**: Weekly Heron runs

### Test Categories
1. **Molecular Driver**: Integral accuracy, basis set handling
2. **Mappers**: Qubit count, operator correctness
3. **Ansatze**: Parameter count, circuit validity
4. **Error Mitigation**: ZNE extrapolation, readout correction
5. **Workflow**: End-to-end execution, result formatting

## Documentation Standards

### Code Documentation
- **Docstrings**: NumPy style for all public APIs
- **Type Hints**: Full type annotations
- **Comments**: Explain "why", not "what"
- **Examples**: Include usage examples in docstrings

### External Documentation
- **README**: Quick start and overview
- **ARCHITECTURE**: This document
- **API Reference**: Auto-generated from docstrings
- **Tutorials**: Jupyter notebooks (future)

## Conclusion

VQE-PHARMACY provides a production-ready framework for quantum chemistry simulations on NISQ devices. The modular architecture enables:

1. **Flexibility**: Easy substitution of components (mappings, ansatze, optimizers)
2. **Scalability**: Active space reduction for larger molecules
3. **Robustness**: Comprehensive error mitigation
4. **Maintainability**: Clear separation of concerns
5. **Extensibility**: Plugin architecture for future enhancements

The system is designed for the IBM Quantum Heron R3 processor but remains hardware-agnostic through Qiskit's abstraction layer, enabling future migration to other platforms.
