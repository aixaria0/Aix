//
//  MenuView.swift
//  QuantumMLGame
//
//  Starting menu with game modes
//

import SwiftUI

struct MenuView: View {
    var body: some View {
        VStack(spacing: 30) {
            Text("Quantum ML Game")
                .font(.largeTitle)
                .fontWeight(.bold)
            
            Text("Explore quantum computing through interactive gameplay")
                .font(.subheadline)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
                .padding(.horizontal)
            
            VStack(spacing: 20) {
                NavigationLink(destination: BlochSphereView()) {
                    MenuButton(title: "Bloch Sphere", icon: "circle.hexagongrid", description: "Visualize qubit states")
                }
                
                NavigationLink(destination: VQCTrainingView()) {
                    MenuButton(title: "VQC Training", icon: "chart.line.uptrend.xyaxis", description: "Train quantum classifier")
                }
                
                MenuButton(title: "Quantum Challenges", icon: "star.fill", description: "Coming soon")
                    .opacity(0.5)
            }
            .padding()
            
            Spacer()
        }
        .padding()
        .navigationTitle("Menu")
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct MenuButton: View {
    let title: String
    let icon: String
    let description: String
    
    var body: some View {
        HStack {
            Image(systemName: icon)
                .font(.title)
                .frame(width: 50)
                .foregroundColor(.blue)
            
            VStack(alignment: .leading) {
                Text(title)
                    .font(.headline)
                Text(description)
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            
            Spacer()
            
            Image(systemName: "chevron.right")
                .foregroundColor(.secondary)
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(12)
    }
}

#Preview {
    NavigationView {
        MenuView()
    }
}
