"""
Classical Chemistry Driver using PySCF

This module provides the interface to generate molecular Hamiltonians
using the PySCF quantum chemistry package with Hartree-Fock and
active space transformations.
"""

from typing import Dict, Tuple, Optional
import numpy as np

try:
    from pyscf import gto, scf
    from pyscf.mcscf import CASSCF
    PYSCF_AVAILABLE = True
except ImportError:
    PYSCF_AVAILABLE = False
    print("Warning: PySCF not available. Install with: pip install pyscf")


class MolecularDriver:
    """
    Driver for setting up molecular problems using PySCF.
    
    Supports:
    - Restricted Hartree-Fock (RHF)
    - Active space selection via CASSCF
    - Multiple basis sets (STO-3G, 6-31G, etc.)
    """
    
    def __init__(
        self,
        atom: str,
        basis: str = "sto-3g",
        charge: int = 0,
        spin: int = 0,
        unit: str = "Angstrom"
    ):
        """
        Initialize molecular system.
        
        Args:
            atom: Molecular geometry string (e.g., "H 0 0 0; H 0 0 0.74")
            basis: Basis set name (default: STO-3G)
            charge: Total molecular charge
            spin: 2S, where S is total spin (0 for singlet, 1 for doublet, etc.)
            unit: Unit for coordinates (Angstrom or Bohr)
        """
        if not PYSCF_AVAILABLE:
            raise ImportError("PySCF is required. Install with: pip install pyscf")
            
        self.atom = atom
        self.basis = basis
        self.charge = charge
        self.spin = spin
        self.unit = unit
        
        self.mol = None
        self.mf = None
        self._setup_molecule()
        
    def _setup_molecule(self):
        """Build the molecular structure and run RHF."""
        self.mol = gto.M(
            atom=self.atom,
            basis=self.basis,
            charge=self.charge,
            spin=self.spin,
            unit=self.unit
        )
        
        # Run Hartree-Fock
        self.mf = scf.RHF(self.mol)
        self.mf.kernel()
        
    def get_molecular_data(self) -> Dict:
        """
        Extract molecular data needed for quantum simulation.
        
        Returns:
            Dictionary containing:
            - num_orbitals: Number of spatial orbitals
            - num_electrons: Number of electrons
            - nuclear_repulsion_energy: Nuclear repulsion energy
            - hf_energy: Hartree-Fock energy
            - one_body_integrals: One-electron integrals
            - two_body_integrals: Two-electron integrals
        """
        if self.mf is None:
            raise RuntimeError("Hartree-Fock calculation not performed")
            
        # Get integrals in molecular orbital basis
        mo_coeff = self.mf.mo_coeff
        h1e = self.mf.get_hcore()
        h1e_mo = mo_coeff.T @ h1e @ mo_coeff
        
        # Two-electron integrals
        eri = self.mol.intor('int2e')
        eri_mo = np.einsum('pqrs,pi,qj,rk,sl->ijkl', 
                          eri, mo_coeff, mo_coeff, mo_coeff, mo_coeff)
        
        return {
            "num_orbitals": self.mol.nao_nr(),
            "num_electrons": self.mol.nelectron,
            "nuclear_repulsion_energy": self.mol.energy_nuc(),
            "hf_energy": self.mf.e_tot,
            "one_body_integrals": h1e_mo,
            "two_body_integrals": eri_mo,
            "mo_coeff": mo_coeff
        }
    
    def get_active_space_data(
        self, 
        n_active_electrons: int,
        n_active_orbitals: int
    ) -> Dict:
        """
        Perform CASSCF to get active space Hamiltonian.
        
        Args:
            n_active_electrons: Number of active electrons
            n_active_orbitals: Number of active orbitals
            
        Returns:
            Dictionary with active space molecular data
        """
        if self.mf is None:
            raise RuntimeError("Hartree-Fock calculation not performed")
            
        # Run CASSCF
        mycas = CASSCF(self.mf, n_active_orbitals, n_active_electrons)
        mycas.kernel()
        
        # Get active space integrals
        h1e_cas, e_core = mycas.get_h1cas()
        h2e_cas = mycas.get_h2cas()
        
        return {
            "num_orbitals": n_active_orbitals,
            "num_electrons": n_active_electrons,
            "nuclear_repulsion_energy": self.mol.energy_nuc() + e_core,
            "cas_energy": mycas.e_tot,
            "one_body_integrals": h1e_cas,
            "two_body_integrals": h2e_cas,
            "active_space": (n_active_electrons, n_active_orbitals)
        }


# Predefined molecular templates for common drug discovery targets
MOLECULAR_TEMPLATES = {
    "H2": {
        "atom": "H 0 0 0; H 0 0 0.74",
        "basis": "sto-3g",
        "charge": 0,
        "spin": 0,
        "description": "Hydrogen molecule - baseline benchmark"
    },
    "LiH": {
        "atom": "Li 0 0 0; H 0 0 1.6",
        "basis": "sto-3g",
        "charge": 0,
        "spin": 0,
        "description": "Lithium hydride - simple heteronuclear"
    },
    "H2O": {
        "atom": "O 0 0 0; H 0.757 0.586 0; H -0.757 0.586 0",
        "basis": "sto-3g",
        "charge": 0,
        "spin": 0,
        "description": "Water molecule"
    },
    "NH3": {
        "atom": "N 0 0 0; H 0.935 0.352 0; H -0.935 0.352 0; H 0 -0.704 0",
        "basis": "sto-3g",
        "charge": 0,
        "spin": 0,
        "description": "Ammonia"
    },
}


def create_molecule(template_name: str) -> MolecularDriver:
    """
    Create a molecular driver from a predefined template.
    
    Args:
        template_name: Name of the molecular template
        
    Returns:
        Configured MolecularDriver instance
    """
    if template_name not in MOLECULAR_TEMPLATES:
        available = ", ".join(MOLECULAR_TEMPLATES.keys())
        raise ValueError(
            f"Unknown template '{template_name}'. Available: {available}"
        )
    
    template = MOLECULAR_TEMPLATES[template_name]
    return MolecularDriver(
        atom=template["atom"],
        basis=template["basis"],
        charge=template["charge"],
        spin=template["spin"]
    )
