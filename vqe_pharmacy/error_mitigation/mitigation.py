"""
Error Mitigation Techniques

Implements various error mitigation strategies to improve
the accuracy of NISQ quantum computations.

Techniques:
- Zero Noise Extrapolation (ZNE)
- Readout Error Mitigation
- Dynamical Decoupling
"""

from typing import List, Callable, Optional, Dict, TYPE_CHECKING, Any
import numpy as np

if TYPE_CHECKING:
    from qiskit.transpiler import PassManager

try:
    from qiskit.transpiler import PassManager as PM
    from qiskit.transpiler.passes import PadDynamicalDecoupling
    from qiskit.circuit.library import XGate
    QISKIT_AVAILABLE = True
except ImportError:
    QISKIT_AVAILABLE = False
    PM = Any
    print("Warning: Qiskit not available. Install with: pip install qiskit")


class ZeroNoiseExtrapolation:
    """
    Zero Noise Extrapolation (ZNE) for error mitigation.
    
    Amplifies noise by scaling circuit operations, then extrapolates
    back to the zero-noise limit.
    """
    
    def __init__(self, scale_factors: Optional[List[float]] = None):
        """
        Initialize ZNE.
        
        Args:
            scale_factors: Noise scaling factors (default: [1, 2, 3])
        """
        self.scale_factors = scale_factors or [1.0, 2.0, 3.0]
    
    def extrapolate(
        self,
        expectation_values: List[float],
        scale_factors: Optional[List[float]] = None
    ) -> float:
        """
        Perform linear extrapolation to zero noise.
        
        Args:
            expectation_values: Measured expectation values at each noise level
            scale_factors: Corresponding noise scale factors
            
        Returns:
            Extrapolated zero-noise expectation value
        """
        if scale_factors is None:
            scale_factors = self.scale_factors
        
        if len(expectation_values) != len(scale_factors):
            raise ValueError(
                "Number of expectation values must match number of scale factors"
            )
        
        # Linear extrapolation: fit y = a + b*x, return y(0)
        # where x are scale_factors and y are expectation_values
        coeffs = np.polyfit(scale_factors, expectation_values, deg=1)
        return coeffs[1]  # Intercept at x=0
    
    def richardson_extrapolate(
        self,
        expectation_values: List[float],
        scale_factors: Optional[List[float]] = None,
        order: int = 2
    ) -> float:
        """
        Richardson extrapolation (polynomial fitting).
        
        Args:
            expectation_values: Measured values
            scale_factors: Noise scales
            order: Polynomial order for fitting
            
        Returns:
            Extrapolated value
        """
        if scale_factors is None:
            scale_factors = self.scale_factors
        
        coeffs = np.polyfit(scale_factors, expectation_values, deg=order)
        # Evaluate at zero noise (x=0)
        return coeffs[-1]


class ReadoutErrorMitigation:
    """
    Readout error mitigation using calibration matrices.
    
    Corrects for measurement errors by characterizing the
    measurement confusion matrix and inverting it.
    """
    
    def __init__(self, num_qubits: int):
        """
        Initialize readout error mitigation.
        
        Args:
            num_qubits: Number of qubits
        """
        self.num_qubits = num_qubits
        self.calibration_matrix = None
    
    def calibrate(self, counts_dict: Dict[str, Dict[str, int]]):
        """
        Build calibration matrix from measurement counts.
        
        Args:
            counts_dict: Dictionary mapping prepared states to measured counts
                        Example: {"00": {"00": 950, "01": 30, ...}, ...}
        """
        # Build confusion matrix
        # M[i,j] = P(measure i | prepared j)
        num_states = 2 ** self.num_qubits
        M = np.zeros((num_states, num_states))
        
        for prep_state_str, counts in counts_dict.items():
            prep_idx = int(prep_state_str, 2)
            total = sum(counts.values())
            
            for meas_state_str, count in counts.items():
                meas_idx = int(meas_state_str, 2)
                M[meas_idx, prep_idx] = count / total
        
        self.calibration_matrix = M
    
    def mitigate(self, noisy_counts: Dict[str, int]) -> Dict[str, float]:
        """
        Apply readout error mitigation to measured counts.
        
        Args:
            noisy_counts: Raw measurement counts
            
        Returns:
            Mitigated counts (can be non-integer)
        """
        if self.calibration_matrix is None:
            raise RuntimeError("Must calibrate before mitigating")
        
        # Convert counts to probability vector
        total = sum(noisy_counts.values())
        num_states = 2 ** self.num_qubits
        noisy_probs = np.zeros(num_states)
        
        for state_str, count in noisy_counts.items():
            idx = int(state_str, 2)
            noisy_probs[idx] = count / total
        
        # Invert calibration matrix and apply
        M_inv = np.linalg.inv(self.calibration_matrix)
        mitigated_probs = M_inv @ noisy_probs
        
        # Clip negative probabilities
        mitigated_probs = np.clip(mitigated_probs, 0, 1)
        mitigated_probs /= mitigated_probs.sum()  # Re-normalize
        
        # Convert back to counts dict
        mitigated_counts = {}
        for i, prob in enumerate(mitigated_probs):
            if prob > 1e-10:  # Only include non-zero probabilities
                state_str = format(i, f'0{self.num_qubits}b')
                mitigated_counts[state_str] = prob * total
        
        return mitigated_counts


class DynamicalDecoupling:
    """
    Dynamical Decoupling (DD) sequences for decoherence mitigation.
    
    Inserts pulse sequences during idle times to combat dephasing
    and amplitude damping errors.
    """
    
    def __init__(self, dd_sequence: str = "XY4"):
        """
        Initialize DD strategy.
        
        Args:
            dd_sequence: Type of DD sequence ("X", "XY4", "CPMG")
        """
        if not QISKIT_AVAILABLE:
            raise ImportError("Qiskit required for dynamical decoupling")
        
        self.dd_sequence = dd_sequence
    
    def get_pass_manager(self, durations, target) -> Any:
        """
        Get transpiler pass manager with DD.
        
        Args:
            durations: Gate duration information
            target: Target hardware properties
            
        Returns:
            Pass manager with DD scheduling
        """
        # Create DD sequence based on type
        if self.dd_sequence.upper() == "X":
            dd_gates = [XGate()]
        elif self.dd_sequence.upper() == "XY4":
            # XY4: X-Y-X-Y pattern
            dd_gates = [XGate()] * 4  # Simplified
        else:
            dd_gates = [XGate()]
        
        dd_pass = PadDynamicalDecoupling(
            durations=durations,
            dd_qubits=None,  # Apply to all qubits
        )
        
        pm = PassManager([dd_pass])
        return pm


def apply_error_mitigation(
    raw_result: float,
    mitigation_type: str = "zne",
    **kwargs
) -> float:
    """
    Apply error mitigation to a raw result.
    
    Args:
        raw_result: Unmitigated result
        mitigation_type: Type of mitigation ("zne", "readout", etc.)
        **kwargs: Additional arguments for specific mitigation types
        
    Returns:
        Mitigated result
    """
    if mitigation_type.lower() == "zne":
        if "expectation_values" not in kwargs:
            raise ValueError("ZNE requires 'expectation_values' list")
        
        zne = ZeroNoiseExtrapolation()
        return zne.extrapolate(kwargs["expectation_values"])
    
    elif mitigation_type.lower() == "readout":
        # For readout error mitigation, would need calibration data
        # This is a simplified example
        return raw_result
    
    else:
        raise ValueError(f"Unknown mitigation type: {mitigation_type}")
