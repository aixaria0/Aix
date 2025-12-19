"""
Tests for VQE Workflow

Tests the complete VQE workflow orchestration.
"""

import pytest


try:
    from vqe_pharmacy import VQEWorkflow
    from vqe_pharmacy.core import run_benchmark_h2
    VQE_AVAILABLE = True
except ImportError:
    VQE_AVAILABLE = False


@pytest.mark.skipif(not VQE_AVAILABLE, reason="VQE modules not available")
class TestVQEWorkflow:
    """Test suite for VQEWorkflow."""
    
    def test_workflow_initialization(self):
        """Test creating a VQE workflow."""
        workflow = VQEWorkflow(
            molecule_name="H2",
            basis="sto-3g",
            mapping="jordan_wigner",
            ansatz_type="efficient_su2",
            optimizer="spsa"
        )
        
        assert workflow.molecule_name == "H2"
        assert workflow.basis == "sto-3g"
        assert workflow.mapping == "jordan_wigner"
        assert workflow.ansatz_type == "efficient_su2"
        assert workflow.optimizer_name == "spsa"
    
    def test_workflow_setup_problem(self):
        """Test problem setup phase."""
        workflow = VQEWorkflow(molecule_name="H2")
        problem_data = workflow.setup_problem()
        
        assert "driver" in problem_data
        assert "molecular_data" in problem_data
        assert "num_qubits" in problem_data
        assert "num_electrons" in problem_data
        
        # H2 should have 2 electrons and 4 qubits (2 orbitals * 2 spins)
        assert problem_data["num_electrons"] == 2
        assert problem_data["num_qubits"] == 4
    
    def test_workflow_build_ansatz(self):
        """Test ansatz building."""
        workflow = VQEWorkflow(
            molecule_name="H2",
            ansatz_type="efficient_su2",
            reps=1
        )
        
        ansatz = workflow.build_ansatz(num_qubits=4, num_electrons=2)
        
        assert ansatz is not None
        assert ansatz.num_qubits == 4
        assert ansatz.num_parameters > 0
    
    def test_workflow_run(self):
        """Test running complete workflow."""
        workflow = VQEWorkflow(
            molecule_name="H2",
            basis="sto-3g",
            mapping="jordan_wigner",
            ansatz_type="efficient_su2",
            optimizer="spsa",
            reps=1
        )
        
        result = workflow.run()
        
        # Check result structure
        assert result is not None
        assert "ground_state_energy" in result
        assert "hartree_fock_energy" in result
        assert "num_qubits" in result
        assert "num_electrons" in result
        assert "num_parameters" in result
        assert "status" in result
        
        # Check values make sense
        assert result["num_qubits"] == 4
        assert result["num_electrons"] == 2
        assert result["status"] == "success"
    
    def test_workflow_summary(self):
        """Test generating workflow summary."""
        workflow = VQEWorkflow(molecule_name="H2")
        workflow.run()
        
        summary = workflow.get_summary()
        
        assert summary is not None
        assert "VQE-PHARMACY" in summary
        assert "H2" in summary
        assert "Ground State Energy" in summary
    
    def test_different_mappings(self):
        """Test workflow with different qubit mappings."""
        mappings = ["jordan_wigner", "bravyi_kitaev", "parity"]
        
        for mapping in mappings:
            workflow = VQEWorkflow(
                molecule_name="H2",
                mapping=mapping
            )
            result = workflow.run()
            assert result["status"] == "success"
    
    def test_different_ansatze(self):
        """Test workflow with different ansatz types."""
        ansatze = ["efficient_su2", "real_amplitudes", "hardware_efficient"]
        
        for ansatz in ansatze:
            workflow = VQEWorkflow(
                molecule_name="H2",
                ansatz_type=ansatz
            )
            result = workflow.run()
            assert result["status"] == "success"
    
    def test_different_optimizers(self):
        """Test workflow with different optimizers."""
        optimizers = ["spsa", "cobyla"]
        
        for optimizer in optimizers:
            workflow = VQEWorkflow(
                molecule_name="H2",
                optimizer=optimizer
            )
            optimizer_obj = workflow.get_optimizer()
            assert optimizer_obj is not None


@pytest.mark.skipif(not VQE_AVAILABLE, reason="VQE modules not available")
class TestBenchmarks:
    """Test benchmark functions."""
    
    def test_run_benchmark_h2(self):
        """Test H2 benchmark function."""
        result = run_benchmark_h2(
            basis="sto-3g",
            distance=0.74,
            mapping="jordan_wigner",
            ansatz="efficient_su2"
        )
        
        assert result is not None
        assert result["status"] == "success"
        assert "ground_state_energy" in result


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
