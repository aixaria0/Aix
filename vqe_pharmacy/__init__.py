"""
VQE-PHARMACY: Variational Quantum Eigensolver for Drug Discovery

A comprehensive quantum chemistry pipeline targeting IBM Quantum Heron R3 processor
for molecular ground-state energy calculations relevant to pharmaceutical research.

Modules:
    - drivers: Classical chemistry problem setup (PySCF integration)
    - mappers: Fermionic-to-qubit transformations (JW, BK, Parity)
    - ansatze: Variational quantum circuits (HEA, UCCSD, ADAPT-VQE)
    - optimizers: Classical optimization routines (SPSA, COBYLA)
    - error_mitigation: Noise reduction techniques (ZNE, T-REX, DD)
    - core: Core VQE workflow orchestration
"""

__version__ = "0.1.0"
__author__ = "VQE-PHARMACY Team"

from vqe_pharmacy.core.vqe_workflow import VQEWorkflow

__all__ = ["VQEWorkflow"]
