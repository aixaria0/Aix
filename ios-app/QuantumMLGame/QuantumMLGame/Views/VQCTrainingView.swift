//
//  VQCTrainingView.swift
//  QuantumMLGame
//
//  VQC (Variational Quantum Classifier) training mode with decision boundary visualization
//

import SwiftUI

struct VQCTrainingView: View {
    @State private var isTraining = false
    @State private var epoch = 0
    @State private var accuracy: Double = 0.5
    @State private var loss: Double = 1.0
    
    // Training parameters
    @State private var learningRate: Double = 0.01
    @State private var numLayers: Int = 2
    
    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                // Decision boundary visualization
                VStack {
                    Text("Decision Boundary")
                        .font(.headline)
                    
                    DecisionBoundaryView(accuracy: accuracy)
                        .frame(height: 300)
                        .background(Color(.systemGray6))
                        .cornerRadius(12)
                }
                .padding()
                
                // Training metrics
                VStack(spacing: 15) {
                    Text("Training Metrics")
                        .font(.headline)
                    
                    HStack {
                        VStack {
                            Text("Epoch")
                                .font(.caption)
                                .foregroundColor(.secondary)
                            Text("\(epoch)")
                                .font(.title2)
                                .fontWeight(.bold)
                        }
                        .frame(maxWidth: .infinity)
                        
                        VStack {
                            Text("Accuracy")
                                .font(.caption)
                                .foregroundColor(.secondary)
                            Text(String(format: "%.1f%%", accuracy * 100))
                                .font(.title2)
                                .fontWeight(.bold)
                                .foregroundColor(.green)
                        }
                        .frame(maxWidth: .infinity)
                        
                        VStack {
                            Text("Loss")
                                .font(.caption)
                                .foregroundColor(.secondary)
                            Text(String(format: "%.3f", loss))
                                .font(.title2)
                                .fontWeight(.bold)
                                .foregroundColor(.red)
                        }
                        .frame(maxWidth: .infinity)
                    }
                    .padding()
                    .background(Color(.systemGray6))
                    .cornerRadius(12)
                }
                .padding(.horizontal)
                
                // Training parameters
                VStack(alignment: .leading, spacing: 15) {
                    Text("Parameters")
                        .font(.headline)
                    
                    VStack(alignment: .leading) {
                        Text("Learning Rate: \(String(format: "%.3f", learningRate))")
                            .font(.caption)
                        Slider(value: $learningRate, in: 0.001...0.1)
                            .disabled(isTraining)
                    }
                    
                    VStack(alignment: .leading) {
                        Text("Circuit Layers: \(numLayers)")
                            .font(.caption)
                        Stepper("", value: $numLayers, in: 1...5)
                            .labelsHidden()
                            .disabled(isTraining)
                    }
                }
                .padding()
                .background(Color(.systemGray6))
                .cornerRadius(12)
                .padding(.horizontal)
                
                // Training controls
                VStack(spacing: 15) {
                    Button(action: toggleTraining) {
                        HStack {
                            Image(systemName: isTraining ? "pause.fill" : "play.fill")
                            Text(isTraining ? "Pause Training" : "Start Training")
                        }
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(isTraining ? Color.orange : Color.blue)
                        .foregroundColor(.white)
                        .cornerRadius(12)
                    }
                    
                    Button(action: resetTraining) {
                        HStack {
                            Image(systemName: "arrow.counterclockwise")
                            Text("Reset")
                        }
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.gray)
                        .foregroundColor(.white)
                        .cornerRadius(12)
                    }
                    .disabled(isTraining)
                }
                .padding()
                
                // VQC Info
                VStack(alignment: .leading, spacing: 10) {
                    Text("About VQC")
                        .font(.headline)
                    
                    Text("Variational Quantum Classifier uses a parameterized quantum circuit to classify data. The decision boundary visualizes how the quantum classifier separates different classes in the feature space.")
                        .font(.caption)
                        .foregroundColor(.secondary)
                    
                    Text("Key Components:")
                        .font(.caption)
                        .fontWeight(.semibold)
                    
                    VStack(alignment: .leading, spacing: 5) {
                        Label("Feature encoding circuit", systemImage: "arrow.up.doc")
                        Label("Variational ansatz layers", systemImage: "arrow.triangle.2.circlepath")
                        Label("Measurement & classification", systemImage: "chart.bar")
                    }
                    .font(.caption)
                    .foregroundColor(.secondary)
                }
                .padding()
                .background(Color(.systemGray6))
                .cornerRadius(12)
                .padding(.horizontal)
            }
            .padding(.vertical)
        }
        .navigationTitle("VQC Training")
    }
    
    private func toggleTraining() {
        isTraining.toggle()
        if isTraining {
            startTraining()
        }
    }
    
    private func startTraining() {
        // Simulate training loop
        Timer.scheduledTimer(withTimeInterval: 0.5, repeats: true) { timer in
            if !isTraining {
                timer.invalidate()
                return
            }
            
            epoch += 1
            
            // Simulate improving metrics
            let progress = min(Double(epoch) / 100.0, 1.0)
            accuracy = 0.5 + (0.45 * progress) + Double.random(in: -0.05...0.05)
            loss = 1.0 * (1.0 - progress * 0.8) + Double.random(in: -0.05...0.05)
            
            // Stop at epoch 100
            if epoch >= 100 {
                isTraining = false
                timer.invalidate()
            }
        }
    }
    
    private func resetTraining() {
        epoch = 0
        accuracy = 0.5
        loss = 1.0
    }
}

struct DecisionBoundaryView: View {
    let accuracy: Double
    
    var body: some View {
        GeometryReader { geometry in
            ZStack {
                // Background gradient representing decision boundary
                LinearGradient(
                    gradient: Gradient(colors: [
                        Color.blue.opacity(0.3),
                        Color.purple.opacity(0.2),
                        Color.red.opacity(0.3)
                    ]),
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
                
                // Sample data points (Class 0 - blue)
                ForEach(0..<10) { i in
                    Circle()
                        .fill(Color.blue)
                        .frame(width: 8, height: 8)
                        .position(
                            x: CGFloat.random(in: 50...(geometry.size.width * 0.4)),
                            y: CGFloat.random(in: 50...(geometry.size.height * 0.6))
                        )
                }
                
                // Sample data points (Class 1 - red)
                ForEach(0..<10) { i in
                    Circle()
                        .fill(Color.red)
                        .frame(width: 8, height: 8)
                        .position(
                            x: CGFloat.random(in: (geometry.size.width * 0.6)...(geometry.size.width - 50)),
                            y: CGFloat.random(in: (geometry.size.height * 0.4)...(geometry.size.height - 50))
                        )
                }
                
                // Decision boundary line (simplified)
                Path { path in
                    let offset = (1.0 - accuracy) * 100
                    path.move(to: CGPoint(x: offset, y: 0))
                    path.addLine(to: CGPoint(x: geometry.size.width - offset, y: geometry.size.height))
                }
                .stroke(Color.green, lineWidth: 2)
                .shadow(color: .green, radius: 3)
                
                // Axes
                Path { path in
                    // X-axis
                    path.move(to: CGPoint(x: 0, y: geometry.size.height - 20))
                    path.addLine(to: CGPoint(x: geometry.size.width, y: geometry.size.height - 20))
                    
                    // Y-axis
                    path.move(to: CGPoint(x: 20, y: 0))
                    path.addLine(to: CGPoint(x: 20, y: geometry.size.height))
                }
                .stroke(Color.gray.opacity(0.5), lineWidth: 1)
                
                // Labels
                VStack {
                    Spacer()
                    HStack {
                        Text("Feature 1")
                            .font(.caption)
                            .foregroundColor(.gray)
                        Spacer()
                    }
                    .padding(.leading, 30)
                }
                
                HStack {
                    VStack {
                        Text("Feature 2")
                            .font(.caption)
                            .foregroundColor(.gray)
                            .rotationEffect(.degrees(-90))
                        Spacer()
                    }
                    .padding(.top, 30)
                    Spacer()
                }
            }
        }
    }
}

#Preview {
    NavigationView {
        VQCTrainingView()
    }
}
