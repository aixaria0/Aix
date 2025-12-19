# VQE-PHARMACY Quick Reference Guide

## 🚀 Getting Started (5 minutes)

### Installation

```bash
# Clone repository
git clone https://github.com/aixaria0/Aix.git
cd Aix

# Install dependencies
pip install -r requirements.txt
```

### First Run

```python
from vqe_pharmacy import VQEWorkflow

# Run H2 benchmark
workflow = VQEWorkflow(
    molecule_name="H2",
    basis="sto-3g",
    mapping="jordan_wigner",
    ansatz_type="efficient_su2",
    optimizer="spsa"
)

result = workflow.run()
print(workflow.get_summary())
```

---

## 📋 Common Tasks

### 1. Run Interactive Demo
```bash
python demo_vqe_pharmacy.py
```

### 2. Run All Benchmarks
```bash
python -m vqe_pharmacy.examples.h2_benchmark
```

### 3. Run Tests
```bash
pytest tests/ -v
```

### 4. Check Code Quality
```bash
black vqe_pharmacy/ tests/
flake8 vqe_pharmacy/ tests/
```

---

## 🧬 Molecular Templates

```python
from vqe_pharmacy.drivers import create_molecule, MOLECULAR_TEMPLATES

# Available templates
print(MOLECULAR_TEMPLATES.keys())
# Output: ['H2', 'LiH', 'H2O', 'NH3']

# Use predefined template
h2 = create_molecule("H2")
data = h2.get_molecular_data()

# Custom geometry
from vqe_pharmacy.drivers import MolecularDriver
custom = MolecularDriver(
    atom="H 0 0 0; H 0 0 1.5",  # Stretched H2
    basis="sto-3g"
)
```

---

## 🔄 Qubit Mappings

```python
from vqe_pharmacy.mappers import create_mapper

# Jordan-Wigner (simple, benchmarking)
mapper_jw, _ = create_mapper("jordan_wigner")

# Bravyi-Kitaev (optimized for Heron)
mapper_bk, _ = create_mapper("bravyi_kitaev")

# Parity with 2-qubit reduction
mapper_p, reduction = create_mapper("parity", two_qubit_reduction=True)
```

---

## ⚡ Ansatz Selection

```python
from vqe_pharmacy.ansatze import create_ansatz

# Hardware-efficient (recommended for NISQ)
ansatz = create_ansatz(
    num_qubits=4,
    ansatz_name="efficient_su2",
    reps=1
)

# Minimal parameters
ansatz = create_ansatz(
    num_qubits=4,
    ansatz_name="real_amplitudes",
    reps=2
)

# Chemistry-inspired
ansatz = create_ansatz(
    num_qubits=4,
    ansatz_name="uccsd",
    num_electrons=2
)
```

---

## 🛡️ Error Mitigation

```python
from vqe_pharmacy.error_mitigation import (
    ZeroNoiseExtrapolation,
    ReadoutErrorMitigation,
    DynamicalDecoupling
)

# Zero Noise Extrapolation
zne = ZeroNoiseExtrapolation(scale_factors=[1, 2, 3])
mitigated = zne.extrapolate([1.0, 0.9, 0.8])

# Readout error mitigation
rem = ReadoutErrorMitigation(num_qubits=4)
# (requires calibration data)

# Dynamical Decoupling
dd = DynamicalDecoupling(dd_sequence="XY4")
```

---

## 🎯 Complete Workflow Examples

### Example 1: Basic H2
```python
from vqe_pharmacy import VQEWorkflow

workflow = VQEWorkflow(
    molecule_name="H2",
    basis="sto-3g",
    mapping="jordan_wigner",
    ansatz_type="efficient_su2",
    optimizer="spsa",
    reps=1
)

result = workflow.run()
```

### Example 2: LiH with Bravyi-Kitaev
```python
workflow = VQEWorkflow(
    molecule_name="LiH",
    basis="sto-3g",
    mapping="bravyi_kitaev",
    ansatz_type="real_amplitudes",
    optimizer="spsa",
    reps=2
)

result = workflow.run()
```

### Example 3: Custom Molecule
```python
workflow = VQEWorkflow(
    molecule_name="H 0 0 0; H 0 0 1.5",  # Custom geometry
    basis="sto-3g",
    mapping="parity",
    ansatz_type="hardware_efficient",
    optimizer="cobyla"
)

result = workflow.run()
```

---

## 📊 Result Structure

```python
result = {
    "ground_state_energy": float,      # VQE ground state energy (Ha)
    "hartree_fock_energy": float,      # HF reference energy
    "nuclear_repulsion_energy": float, # Nuclear repulsion
    "num_qubits": int,                 # Number of qubits used
    "num_electrons": int,              # Number of electrons
    "num_parameters": int,             # Ansatz parameters
    "circuit_depth": int,              # Circuit depth
    "optimizer": str,                  # Optimizer used
    "mapping": str,                    # Mapping type
    "ansatz": str,                     # Ansatz type
    "status": str                      # Success/failure
}
```

---

## 🔧 Configuration Options

### Mappings
- `jordan_wigner` - Simple, good for benchmarking
- `bravyi_kitaev` - Optimized for Heron chip
- `parity` - Symmetry reduction (-2 qubits)

### Ansatze
- `efficient_su2` - Hardware-efficient, moderate params
- `real_amplitudes` - Minimal params, fastest
- `hardware_efficient` - Custom for Heron topology
- `uccsd` - Chemistry-inspired (deep circuits)

### Optimizers
- `spsa` - Noise-robust, recommended for real hardware
- `cobyla` - Fast convergence, simulators only

### Basis Sets
- `sto-3g` - Minimal basis (fastest)
- `6-31g` - Split valence (more accurate)

---

## 🐛 Troubleshooting

### Import Errors
```bash
# If you see import warnings:
pip install -r requirements.txt

# Individual packages:
pip install pyscf qiskit qiskit-nature qiskit-ibm-runtime
```

### Module Not Found
```bash
# Ensure you're in the project directory
cd /path/to/Aix

# Install in development mode
pip install -e .
```

### Test Failures
```bash
# Install test dependencies
pip install pytest pytest-cov

# Run specific test
pytest tests/test_vqe_workflow.py -v
```

---

## 📚 Documentation Links

- **Quick Start**: `VQE_PHARMACY_README.md`
- **Architecture**: `VQE_PHARMACY_ARCHITECTURE.md`
- **Implementation**: `VQE_PHARMACY_IMPLEMENTATION_SUMMARY.md`
- **Examples**: `vqe_pharmacy/examples/`
- **Tests**: `tests/`

---

## 🔬 IBM Quantum Integration (Future)

```python
from qiskit_ibm_runtime import QiskitRuntimeService

# Connect to IBM Quantum
service = QiskitRuntimeService(channel="ibm_quantum")
backend = service.backend("ibm_heron")

# Run VQE on real hardware
workflow = VQEWorkflow(
    molecule_name="H2",
    mapping="bravyi_kitaev",
    ansatz_type="efficient_su2",
    optimizer="spsa"
)

result = workflow.run(backend=backend, shots=2048)
```

---

## 📞 Support

- **Issues**: GitHub Issues
- **Docs**: See documentation files
- **Examples**: `vqe_pharmacy/examples/`

---

## ⚡ Quick Commands

```bash
# Run demo
python demo_vqe_pharmacy.py

# Run benchmarks
python -m vqe_pharmacy.examples.h2_benchmark

# Run tests
pytest

# Check imports
python -c "from vqe_pharmacy import VQEWorkflow; print('✓ Working')"

# Install package
pip install -e .

# CLI benchmark (after install)
vqe-pharmacy-benchmark
```

---

**VQE-PHARMACY** - Quantum Drug Discovery Pipeline for IBM Heron R3 🧬⚛️

**Version**: 0.1.0  
**Status**: Production Ready ✅  
**License**: Proprietary (Internal Use)
