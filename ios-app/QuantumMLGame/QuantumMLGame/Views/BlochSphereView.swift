//
//  BlochSphereView.swift
//  QuantumMLGame
//
//  Bloch Sphere visualization for 1 and 2 qubits
//

import SwiftUI

struct BlochSphereView: View {
    @State private var qubitMode: QubitMode = .single
    @State private var theta: Double = 0.0
    @State private var phi: Double = 0.0
    
    // For 2-qubit mode
    @State private var theta2: Double = 0.0
    @State private var phi2: Double = 0.0
    
    enum QubitMode: String, CaseIterable {
        case single = "1 Qubit"
        case double = "2 Qubits"
    }
    
    var body: some View {
        VStack {
            Picker("Qubit Mode", selection: $qubitMode) {
                ForEach(QubitMode.allCases, id: \.self) { mode in
                    Text(mode.rawValue).tag(mode)
                }
            }
            .pickerStyle(.segmented)
            .padding()
            
            if qubitMode == .single {
                SingleQubitView(theta: $theta, phi: $phi)
            } else {
                TwoQubitView(theta1: $theta, phi1: $phi, theta2: $theta2, phi2: $phi2)
            }
            
            Spacer()
        }
        .navigationTitle("Bloch Sphere")
    }
}

struct SingleQubitView: View {
    @Binding var theta: Double
    @Binding var phi: Double
    
    var body: some View {
        VStack {
            // Bloch Sphere visualization
            ZStack {
                // Sphere representation
                Circle()
                    .fill(
                        RadialGradient(
                            gradient: Gradient(colors: [Color.blue.opacity(0.3), Color.blue.opacity(0.1)]),
                            center: .center,
                            startRadius: 0,
                            endRadius: 150
                        )
                    )
                    .frame(width: 300, height: 300)
                
                // Axes
                Path { path in
                    // Z-axis (vertical)
                    path.move(to: CGPoint(x: 150, y: 0))
                    path.addLine(to: CGPoint(x: 150, y: 300))
                    
                    // X-axis (horizontal)
                    path.move(to: CGPoint(x: 0, y: 150))
                    path.addLine(to: CGPoint(x: 300, y: 150))
                }
                .stroke(Color.gray.opacity(0.5), lineWidth: 1)
                .frame(width: 300, height: 300)
                
                // State vector
                let x = 150 + 120 * sin(theta) * cos(phi)
                let y = 150 - 120 * cos(theta)
                
                Path { path in
                    path.move(to: CGPoint(x: 150, y: 150))
                    path.addLine(to: CGPoint(x: x, y: y))
                }
                .stroke(Color.red, lineWidth: 3)
                .frame(width: 300, height: 300)
                
                // State point
                Circle()
                    .fill(Color.red)
                    .frame(width: 12, height: 12)
                    .position(x: x, y: y)
            }
            .frame(width: 300, height: 300)
            
            // Controls
            VStack(spacing: 20) {
                VStack {
                    Text("θ (Theta): \(String(format: "%.2f", theta)) rad")
                        .font(.caption)
                    Slider(value: $theta, in: 0...Double.pi)
                }
                
                VStack {
                    Text("φ (Phi): \(String(format: "%.2f", phi)) rad")
                        .font(.caption)
                    Slider(value: $phi, in: 0...(2 * Double.pi))
                }
                
                // State representation
                VStack(alignment: .leading) {
                    Text("Quantum State:")
                        .font(.headline)
                    Text("|ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩")
                        .font(.system(.caption, design: .monospaced))
                    
                    HStack {
                        Text("Probability |0⟩:")
                        Text(String(format: "%.2f%%", pow(cos(theta/2), 2) * 100))
                            .fontWeight(.bold)
                    }
                    .font(.caption)
                    
                    HStack {
                        Text("Probability |1⟩:")
                        Text(String(format: "%.2f%%", pow(sin(theta/2), 2) * 100))
                            .fontWeight(.bold)
                    }
                    .font(.caption)
                }
                .padding()
                .background(Color(.systemGray6))
                .cornerRadius(8)
            }
            .padding()
        }
    }
}

struct TwoQubitView: View {
    @Binding var theta1: Double
    @Binding var phi1: Double
    @Binding var theta2: Double
    @Binding var phi2: Double
    
    var body: some View {
        ScrollView {
            VStack {
                Text("Qubit 1")
                    .font(.headline)
                
                // First Bloch Sphere (simplified)
                ZStack {
                    Circle()
                        .fill(
                            RadialGradient(
                                gradient: Gradient(colors: [Color.blue.opacity(0.3), Color.blue.opacity(0.1)]),
                                center: .center,
                                startRadius: 0,
                                endRadius: 100
                            )
                        )
                        .frame(width: 200, height: 200)
                    
                    let x1 = 100 + 80 * sin(theta1) * cos(phi1)
                    let y1 = 100 - 80 * cos(theta1)
                    
                    Circle()
                        .fill(Color.red)
                        .frame(width: 10, height: 10)
                        .position(x: x1, y: y1)
                }
                .frame(width: 200, height: 200)
                
                VStack {
                    Text("θ₁: \(String(format: "%.2f", theta1)) rad")
                        .font(.caption)
                    Slider(value: $theta1, in: 0...Double.pi)
                }
                .padding(.horizontal)
                
                VStack {
                    Text("φ₁: \(String(format: "%.2f", phi1)) rad")
                        .font(.caption)
                    Slider(value: $phi1, in: 0...(2 * Double.pi))
                }
                .padding(.horizontal)
                
                Divider()
                    .padding()
                
                Text("Qubit 2")
                    .font(.headline)
                
                // Second Bloch Sphere
                ZStack {
                    Circle()
                        .fill(
                            RadialGradient(
                                gradient: Gradient(colors: [Color.green.opacity(0.3), Color.green.opacity(0.1)]),
                                center: .center,
                                startRadius: 0,
                                endRadius: 100
                            )
                        )
                        .frame(width: 200, height: 200)
                    
                    let x2 = 100 + 80 * sin(theta2) * cos(phi2)
                    let y2 = 100 - 80 * cos(theta2)
                    
                    Circle()
                        .fill(Color.green)
                        .frame(width: 10, height: 10)
                        .position(x: x2, y: y2)
                }
                .frame(width: 200, height: 200)
                
                VStack {
                    Text("θ₂: \(String(format: "%.2f", theta2)) rad")
                        .font(.caption)
                    Slider(value: $theta2, in: 0...Double.pi)
                }
                .padding(.horizontal)
                
                VStack {
                    Text("φ₂: \(String(format: "%.2f", phi2)) rad")
                        .font(.caption)
                    Slider(value: $phi2, in: 0...(2 * Double.pi))
                }
                .padding(.horizontal)
                
                // Combined state info
                VStack(alignment: .leading) {
                    Text("Two-Qubit System State")
                        .font(.headline)
                    Text("Product state: |ψ⟩ = |ψ₁⟩ ⊗ |ψ₂⟩")
                        .font(.system(.caption, design: .monospaced))
                }
                .padding()
                .background(Color(.systemGray6))
                .cornerRadius(8)
                .padding()
            }
        }
    }
}

#Preview {
    NavigationView {
        BlochSphereView()
    }
}
