# Quantum Bridge

Abstract interface for connecting to cloud quantum providers including IBM Qiskit, Azure Quantum, and AWS Braket.

## Features

- **Unified Interface**: Single API for multiple quantum cloud providers
- **Provider Abstraction**: Easy switching between providers
- **Mock Backend**: Built-in simulator for development and testing
- **Job Management**: Submit, track, and retrieve quantum job results

## Supported Providers

- ✅ **IBM Qiskit Runtime**: Access IBM Quantum systems
- ✅ **Azure Quantum**: Use IonQ, Quantinuum, and other partners
- ✅ **AWS Braket**: Amazon's quantum computing service
- ✅ **Mock Backend**: Local testing without cloud access

## Quick Start

### Using Mock Backend (No Setup Required)

```python
from quantum_bridge import QuantumBridge, QuantumCircuit, QuantumProvider

# Create a Bell state circuit
circuit = QuantumCircuit(
    num_qubits=2,
    gates=[
        {"type": "h", "qubit": 0},
        {"type": "cx", "control": 0, "target": 1}
    ],
    measurements=[0, 1]
)

# Use mock backend
bridge = QuantumBridge(provider=QuantumProvider.MOCK)
result = bridge.execute(circuit, shots=1024)
print(result.counts)  # {'00': 512, '11': 512}
```

### Using IBM Qiskit

```python
# Install: pip install qiskit qiskit-ibm-runtime

bridge = QuantumBridge(
    provider=QuantumProvider.IBM_QISKIT,
    api_token="your-ibm-quantum-token"
)

backends = bridge.list_backends()
result = bridge.execute(circuit, backend="ibmq_qasm_simulator")
```

### Using Azure Quantum

```python
# Install: pip install azure-quantum

bridge = QuantumBridge(
    provider=QuantumProvider.AZURE_QUANTUM,
    subscription_id="your-subscription-id",
    resource_group="your-resource-group",
    workspace_name="your-workspace-name"
)

result = bridge.execute(circuit, backend="ionq.simulator")
```

### Using AWS Braket

```python
# Install: pip install amazon-braket-sdk boto3

bridge = QuantumBridge(
    provider=QuantumProvider.AWS_BRAKET,
    aws_access_key="your-access-key",
    aws_secret_key="your-secret-key",
    region="us-east-1"
)

result = bridge.execute(circuit, backend="SV1")
```

## Circuit Format

Circuits are represented as dictionaries with:
- `num_qubits`: Number of qubits
- `gates`: List of gate operations
- `measurements`: Which qubits to measure

### Supported Gates

- `h`: Hadamard gate
- `x`, `y`, `z`: Pauli gates
- `rx`, `ry`, `rz`: Rotation gates
- `cx`: CNOT gate
- More gates can be added per provider

## API Reference

### QuantumBridge

Main interface for quantum execution.

**Methods:**
- `execute(circuit, shots, backend)`: Execute quantum circuit
- `list_backends()`: List available quantum backends

### QuantumCircuit

Representation of a quantum circuit.

**Attributes:**
- `num_qubits`: Number of qubits
- `gates`: List of gates
- `measurements`: Measurement specification

### QuantumResult

Results from quantum execution.

**Attributes:**
- `counts`: Measurement outcome counts
- `job_id`: Job identifier
- `provider`: Provider name
- `metadata`: Additional information

## Development

Run the example:
```bash
python quantum_bridge.py
```

## Next Steps

- [ ] Implement full gate set for each provider
- [ ] Add async job submission and polling
- [ ] Implement circuit optimization
- [ ] Add cost estimation
- [ ] Implement batch job submission
- [ ] Add caching layer
- [ ] Implement error mitigation
