"""
Fermionic-to-Qubit Mapping Transformations

Implements various mapping schemes to transform fermionic operators
into qubit Pauli operators for quantum simulation.

Supported mappings:
- Jordan-Wigner (JW)
- Bravyi-Kitaev (BK)
- Parity Mapping
"""

from typing import Dict, Tuple
from enum import Enum

try:
    from qiskit_nature.second_q.mappers import (
        JordanWignerMapper,
        BravyiKitaevMapper,
        ParityMapper,
        QubitConverter
    )
    from qiskit_nature.second_q.operators import FermionicOp
    QISKIT_NATURE_AVAILABLE = True
except ImportError:
    QISKIT_NATURE_AVAILABLE = False
    print("Warning: qiskit-nature not available. Install with: pip install qiskit-nature")


class MappingType(Enum):
    """Enumeration of available fermionic-to-qubit mappings."""
    JORDAN_WIGNER = "jordan_wigner"
    BRAVYI_KITAEV = "bravyi_kitaev"
    PARITY = "parity"


class QubitMapper:
    """
    Handles transformation of fermionic Hamiltonians to qubit operators.
    
    Provides multiple mapping strategies optimized for different
    quantum hardware architectures.
    """
    
    def __init__(self, mapping_type: MappingType = MappingType.JORDAN_WIGNER):
        """
        Initialize the qubit mapper.
        
        Args:
            mapping_type: Type of fermionic-to-qubit mapping to use
        """
        if not QISKIT_NATURE_AVAILABLE:
            raise ImportError(
                "qiskit-nature required. Install with: pip install qiskit-nature"
            )
        
        self.mapping_type = mapping_type
        self.mapper = self._get_mapper()
        
    def _get_mapper(self):
        """Get the appropriate mapper instance."""
        if self.mapping_type == MappingType.JORDAN_WIGNER:
            return JordanWignerMapper()
        elif self.mapping_type == MappingType.BRAVYI_KITAEV:
            return BravyiKitaevMapper()
        elif self.mapping_type == MappingType.PARITY:
            return ParityMapper()
        else:
            raise ValueError(f"Unknown mapping type: {self.mapping_type}")
    
    def map_fermionic_to_qubit(self, fermionic_op: FermionicOp):
        """
        Map a fermionic operator to qubit operator.
        
        Args:
            fermionic_op: Fermionic operator to map
            
        Returns:
            Corresponding qubit operator (Pauli sum)
        """
        return self.mapper.map(fermionic_op)
    
    def get_qubit_converter(self, two_qubit_reduction: bool = False):
        """
        Get a QubitConverter for full problem conversion.
        
        Args:
            two_qubit_reduction: Whether to use symmetry-based 2-qubit reduction
            
        Returns:
            Configured QubitConverter instance
        """
        return QubitConverter(
            mapper=self.mapper,
            two_qubit_reduction=two_qubit_reduction
        )
    
    def get_num_qubits(self, num_orbitals: int) -> int:
        """
        Calculate number of qubits needed for given number of orbitals.
        
        Args:
            num_orbitals: Number of spatial orbitals
            
        Returns:
            Number of qubits required
        """
        # For most mappings, num_qubits = 2 * num_spatial_orbitals
        # (each spatial orbital becomes 2 spin orbitals)
        return 2 * num_orbitals
    
    @staticmethod
    def get_mapping_info() -> Dict[str, str]:
        """
        Get information about available mappings.
        
        Returns:
            Dictionary with mapping descriptions
        """
        return {
            "jordan_wigner": (
                "Straightforward mapping with local occupation encoding. "
                "N fermions → N qubits. Good for benchmarking."
            ),
            "bravyi_kitaev": (
                "Tree-based encoding with log-depth parity calculations. "
                "Reduces gate depth for some operators. Recommended for Heron chip."
            ),
            "parity": (
                "Parity-based encoding allowing 2-qubit reduction via symmetries. "
                "Saves 2 qubits per simulation when symmetries are exploited."
            )
        }


def create_mapper(
    mapping_name: str,
    two_qubit_reduction: bool = False
) -> Tuple[QubitMapper, bool]:
    """
    Factory function to create a configured qubit mapper.
    
    Args:
        mapping_name: Name of mapping ("jw", "bk", or "parity")
        two_qubit_reduction: Enable 2-qubit reduction for parity mapping
        
    Returns:
        Tuple of (QubitMapper instance, two_qubit_reduction flag)
    """
    mapping_dict = {
        "jw": MappingType.JORDAN_WIGNER,
        "jordan_wigner": MappingType.JORDAN_WIGNER,
        "bk": MappingType.BRAVYI_KITAEV,
        "bravyi_kitaev": MappingType.BRAVYI_KITAEV,
        "parity": MappingType.PARITY,
    }
    
    mapping_name = mapping_name.lower()
    if mapping_name not in mapping_dict:
        available = ", ".join(mapping_dict.keys())
        raise ValueError(
            f"Unknown mapping '{mapping_name}'. Available: {available}"
        )
    
    mapping_type = mapping_dict[mapping_name]
    
    # Two-qubit reduction only works with parity mapping
    if two_qubit_reduction and mapping_type != MappingType.PARITY:
        print(
            f"Warning: two_qubit_reduction only supported with parity mapping. "
            f"Disabling for {mapping_name}."
        )
        two_qubit_reduction = False
    
    return QubitMapper(mapping_type), two_qubit_reduction
