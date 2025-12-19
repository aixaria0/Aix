"""
H2 Baseline Benchmark Example

Demonstrates basic VQE workflow on the hydrogen molecule (H2)
using different configurations suitable for IBM Quantum Heron R3.
"""

from vqe_pharmacy import VQEWorkflow
from vqe_pharmacy.core import run_benchmark_h2


def example_basic_h2():
    """Run basic H2 VQE calculation."""
    print("=" * 60)
    print("Example 1: Basic H2 VQE with Jordan-Wigner Mapping")
    print("=" * 60)
    
    workflow = VQEWorkflow(
        molecule_name="H2",
        basis="sto-3g",
        mapping="jordan_wigner",
        ansatz_type="efficient_su2",
        optimizer="spsa",
        reps=1
    )
    
    result = workflow.run()
    print(workflow.get_summary())
    
    return result


def example_h2_with_bravyi_kitaev():
    """Run H2 with Bravyi-Kitaev mapping."""
    print("\n" + "=" * 60)
    print("Example 2: H2 VQE with Bravyi-Kitaev Mapping")
    print("=" * 60)
    
    workflow = VQEWorkflow(
        molecule_name="H2",
        basis="sto-3g",
        mapping="bravyi_kitaev",
        ansatz_type="real_amplitudes",
        optimizer="spsa",
        reps=2
    )
    
    result = workflow.run()
    print(workflow.get_summary())
    
    return result


def example_lih_molecule():
    """Run VQE on LiH molecule."""
    print("\n" + "=" * 60)
    print("Example 3: LiH VQE Calculation")
    print("=" * 60)
    
    workflow = VQEWorkflow(
        molecule_name="LiH",
        basis="sto-3g",
        mapping="parity",
        ansatz_type="efficient_su2",
        optimizer="cobyla",
        reps=2
    )
    
    result = workflow.run()
    print(workflow.get_summary())
    
    return result


def example_custom_geometry():
    """Run VQE with custom molecular geometry."""
    print("\n" + "=" * 60)
    print("Example 4: Custom H2 Geometry (stretched bond)")
    print("=" * 60)
    
    # H2 with stretched bond (1.5 Angstroms)
    h2_stretched = "H 0 0 0; H 0 0 1.5"
    
    workflow = VQEWorkflow(
        molecule_name=h2_stretched,
        basis="sto-3g",
        mapping="jordan_wigner",
        ansatz_type="hardware_efficient",
        optimizer="spsa",
        reps=1
    )
    
    result = workflow.run()
    print(workflow.get_summary())
    
    return result


def run_all_examples():
    """Run all example calculations."""
    print("\n")
    print("*" * 60)
    print("VQE-PHARMACY: Example Calculations")
    print("*" * 60)
    print("\n")
    
    results = {}
    
    # Run examples
    results['basic_h2'] = example_basic_h2()
    results['h2_bk'] = example_h2_with_bravyi_kitaev()
    results['lih'] = example_lih_molecule()
    results['custom_h2'] = example_custom_geometry()
    
    # Summary
    print("\n" + "=" * 60)
    print("Summary of All Examples")
    print("=" * 60)
    
    for name, result in results.items():
        print(f"\n{name}:")
        print(f"  Ground State Energy: {result['ground_state_energy']:.6f} Ha")
        print(f"  Qubits: {result['num_qubits']}")
        print(f"  Parameters: {result['num_parameters']}")
        print(f"  Circuit Depth: {result['circuit_depth']}")
    
    return results


if __name__ == "__main__":
    # Run all examples
    run_all_examples()
