"""
Tests for VQE-PHARMACY Molecular Driver

Tests the PySCF integration and molecular problem setup.
"""

import pytest
import numpy as np


# Test if PySCF is available
try:
    from vqe_pharmacy.drivers import MolecularDriver, create_molecule, MOLECULAR_TEMPLATES
    PYSCF_AVAILABLE = True
except ImportError:
    PYSCF_AVAILABLE = False


@pytest.mark.skipif(not PYSCF_AVAILABLE, reason="PySCF not available")
class TestMolecularDriver:
    """Test suite for MolecularDriver."""
    
    def test_h2_molecule_creation(self):
        """Test creating H2 molecule."""
        driver = create_molecule("H2")
        
        assert driver is not None
        assert driver.mol is not None
        assert driver.mf is not None
    
    def test_h2_molecular_data(self):
        """Test extracting molecular data from H2."""
        driver = create_molecule("H2")
        data = driver.get_molecular_data()
        
        # Check basic properties
        assert data["num_electrons"] == 2
        assert data["num_orbitals"] == 2  # STO-3G basis
        assert "nuclear_repulsion_energy" in data
        assert "hf_energy" in data
        assert "one_body_integrals" in data
        assert "two_body_integrals" in data
        
        # Energy should be negative (bound state)
        assert data["hf_energy"] < 0
        
        # Nuclear repulsion should be positive
        assert data["nuclear_repulsion_energy"] > 0
    
    def test_lih_molecule_creation(self):
        """Test creating LiH molecule."""
        driver = create_molecule("LiH")
        data = driver.get_molecular_data()
        
        # LiH has 4 electrons
        assert data["num_electrons"] == 4
        assert data["hf_energy"] < 0
    
    def test_custom_geometry(self):
        """Test creating molecule with custom geometry."""
        driver = MolecularDriver(
            atom="H 0 0 0; H 0 0 1.0",
            basis="sto-3g"
        )
        data = driver.get_molecular_data()
        
        assert data["num_electrons"] == 2
        assert data["num_orbitals"] == 2
    
    def test_invalid_template(self):
        """Test that invalid template raises error."""
        with pytest.raises(ValueError):
            create_molecule("NonExistentMolecule")
    
    def test_molecular_templates(self):
        """Test that molecular templates are defined."""
        assert "H2" in MOLECULAR_TEMPLATES
        assert "LiH" in MOLECULAR_TEMPLATES
        assert "H2O" in MOLECULAR_TEMPLATES
        
        # Check template structure
        h2_template = MOLECULAR_TEMPLATES["H2"]
        assert "atom" in h2_template
        assert "basis" in h2_template
        assert "charge" in h2_template
        assert "spin" in h2_template


@pytest.mark.skipif(not PYSCF_AVAILABLE, reason="PySCF not available")
class TestMolecularDriverIntegrals:
    """Test integral calculations."""
    
    def test_one_body_integrals_shape(self):
        """Test shape of one-body integrals."""
        driver = create_molecule("H2")
        data = driver.get_molecular_data()
        
        n_orb = data["num_orbitals"]
        h1 = data["one_body_integrals"]
        
        assert h1.shape == (n_orb, n_orb)
    
    def test_two_body_integrals_shape(self):
        """Test shape of two-body integrals."""
        driver = create_molecule("H2")
        data = driver.get_molecular_data()
        
        n_orb = data["num_orbitals"]
        h2 = data["two_body_integrals"]
        
        assert h2.shape == (n_orb, n_orb, n_orb, n_orb)
    
    def test_integral_symmetry(self):
        """Test that integrals have expected symmetries."""
        driver = create_molecule("H2")
        data = driver.get_molecular_data()
        
        # One-body integrals should be Hermitian
        h1 = data["one_body_integrals"]
        assert np.allclose(h1, h1.T)


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
