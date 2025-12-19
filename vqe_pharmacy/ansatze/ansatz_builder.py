"""
Variational Quantum Circuit Ansatze

Provides quantum circuit templates (ansatze) for VQE optimization,
optimized for IBM Quantum Heron R3 architecture.

Includes:
- Hardware-Efficient Ansatz (HEA)
- Unitary Coupled Cluster (UCC)
- Chemistry-inspired circuits
"""

from typing import Optional, List, TYPE_CHECKING, Any
from enum import Enum

if TYPE_CHECKING:
    from qiskit.circuit import QuantumCircuit

try:
    from qiskit.circuit import QuantumCircuit as QC, Parameter
    from qiskit.circuit.library import EfficientSU2, RealAmplitudes, TwoLocal
    QISKIT_AVAILABLE = True
except ImportError:
    QISKIT_AVAILABLE = False
    QC = Any
    print("Warning: Qiskit not available. Install with: pip install qiskit")


class AnsatzType(Enum):
    """Enumeration of available ansatz types."""
    EFFICIENT_SU2 = "efficient_su2"
    REAL_AMPLITUDES = "real_amplitudes"
    HARDWARE_EFFICIENT = "hardware_efficient"


class AnsatzBuilder:
    """
    Builder for variational quantum circuits optimized for NISQ devices.
    
    Focuses on hardware-efficient ansatze that minimize gate depth
    and match the native gate set of IBM Quantum Heron R3.
    """
    
    def __init__(
        self,
        num_qubits: int,
        ansatz_type: AnsatzType = AnsatzType.EFFICIENT_SU2,
        reps: int = 1
    ):
        """
        Initialize ansatz builder.
        
        Args:
            num_qubits: Number of qubits in the circuit
            ansatz_type: Type of ansatz to build
            reps: Number of repetitions (layers) of the ansatz
        """
        if not QISKIT_AVAILABLE:
            raise ImportError("Qiskit required. Install with: pip install qiskit")
        
        self.num_qubits = num_qubits
        self.ansatz_type = ansatz_type
        self.reps = reps
        
    def build(self) -> Any:
        """
        Build the ansatz circuit.
        
        Returns:
            Parameterized quantum circuit
        """
        if self.ansatz_type == AnsatzType.EFFICIENT_SU2:
            return self._build_efficient_su2()
        elif self.ansatz_type == AnsatzType.REAL_AMPLITUDES:
            return self._build_real_amplitudes()
        elif self.ansatz_type == AnsatzType.HARDWARE_EFFICIENT:
            return self._build_hardware_efficient()
        else:
            raise ValueError(f"Unknown ansatz type: {self.ansatz_type}")
    
    def _build_efficient_su2(self) -> Any:
        """
        Build EfficientSU2 ansatz.
        
        Uses RY and RZ rotations with CX entanglers.
        Optimized for heavy-hex topology of Heron chip.
        """
        return EfficientSU2(
            num_qubits=self.num_qubits,
            reps=self.reps,
            entanglement='linear',  # Can be changed to 'full' or custom
            insert_barriers=True
        )
    
    def _build_real_amplitudes(self) -> Any:
        """
        Build RealAmplitudes ansatz.
        
        Uses only RY rotations (no complex phases).
        More hardware-efficient, fewer parameters.
        """
        return RealAmplitudes(
            num_qubits=self.num_qubits,
            reps=self.reps,
            entanglement='linear',
            insert_barriers=True
        )
    
    def _build_hardware_efficient(self) -> Any:
        """
        Build custom hardware-efficient ansatz for Heron R3.
        
        Tailored to native gate set (SU(2) rotations + CZ/CNOT).
        Uses linear connectivity to minimize SWAP gates.
        """
        return TwoLocal(
            num_qubits=self.num_qubits,
            rotation_blocks=['ry', 'rz'],
            entanglement_blocks='cx',
            entanglement='linear',
            reps=self.reps,
            insert_barriers=True
        )
    
    def get_num_parameters(self) -> int:
        """
        Get the number of variational parameters in the ansatz.
        
        Returns:
            Number of parameters to optimize
        """
        circuit = self.build()
        return circuit.num_parameters
    
    @staticmethod
    def estimate_circuit_depth(num_qubits: int, reps: int) -> int:
        """
        Estimate circuit depth for given configuration.
        
        Args:
            num_qubits: Number of qubits
            reps: Number of repetitions
            
        Returns:
            Estimated circuit depth
        """
        # Rough estimate: each rep adds rotation layer + entanglement layer
        # Rotation layer depth ≈ 2 (RY + RZ)
        # Entanglement layer depth ≈ num_qubits - 1 (for linear connectivity)
        return reps * (2 + num_qubits - 1)


class UCCSDBuilder:
    """
    Builder for Unitary Coupled Cluster Singles and Doubles (UCCSD) ansatz.
    
    Chemistry-inspired ansatz that includes excitation operators.
    Note: UCCSD circuits are typically deep and may not be suitable
    for NISQ devices without circuit optimization.
    """
    
    def __init__(
        self,
        num_qubits: int,
        num_electrons: int,
        excitation_type: str = 'sd'
    ):
        """
        Initialize UCCSD builder.
        
        Args:
            num_qubits: Number of qubits
            num_electrons: Number of electrons in the system
            excitation_type: 's' (singles), 'd' (doubles), or 'sd' (both)
        """
        if not QISKIT_AVAILABLE:
            raise ImportError("Qiskit required. Install with: pip install qiskit")
            
        self.num_qubits = num_qubits
        self.num_electrons = num_electrons
        self.excitation_type = excitation_type
    
    def build(self) -> Any:
        """
        Build UCCSD ansatz.
        
        Note: This is a placeholder. Full UCCSD implementation requires
        qiskit-nature and is more complex. For production use, consider
        using ADAPT-VQE which builds the ansatz iteratively.
        
        Returns:
            UCCSD circuit (simplified version)
        """
        # For now, return a hardware-efficient ansatz as placeholder
        # Full UCCSD would use qiskit_nature.circuit.library.UCC
        print(
            "Warning: Full UCCSD implementation requires qiskit-nature UCC. "
            "Using hardware-efficient ansatz as fallback."
        )
        builder = AnsatzBuilder(
            self.num_qubits,
            AnsatzType.EFFICIENT_SU2,
            reps=2
        )
        return builder.build()


def create_ansatz(
    num_qubits: int,
    ansatz_name: str = "efficient_su2",
    reps: int = 1,
    **kwargs
) -> Any:
    """
    Factory function to create an ansatz circuit.
    
    Args:
        num_qubits: Number of qubits
        ansatz_name: Name of ansatz ("efficient_su2", "real_amplitudes", etc.)
        reps: Number of repetitions
        **kwargs: Additional arguments for specific ansatz types
        
    Returns:
        Parameterized quantum circuit
    """
    ansatz_map = {
        "efficient_su2": AnsatzType.EFFICIENT_SU2,
        "real_amplitudes": AnsatzType.REAL_AMPLITUDES,
        "hardware_efficient": AnsatzType.HARDWARE_EFFICIENT,
    }
    
    ansatz_name = ansatz_name.lower()
    
    if ansatz_name == "uccsd":
        if "num_electrons" not in kwargs:
            raise ValueError("UCCSD requires 'num_electrons' parameter")
        builder = UCCSDBuilder(
            num_qubits=num_qubits,
            num_electrons=kwargs["num_electrons"]
        )
        return builder.build()
    
    if ansatz_name not in ansatz_map:
        available = ", ".join(list(ansatz_map.keys()) + ["uccsd"])
        raise ValueError(
            f"Unknown ansatz '{ansatz_name}'. Available: {available}"
        )
    
    builder = AnsatzBuilder(
        num_qubits=num_qubits,
        ansatz_type=ansatz_map[ansatz_name],
        reps=reps
    )
    return builder.build()
