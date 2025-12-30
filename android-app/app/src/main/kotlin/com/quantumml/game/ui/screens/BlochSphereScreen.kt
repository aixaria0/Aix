package com.quantumml.game.ui.screens

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.unit.dp
import kotlin.math.*

@Composable
fun BlochSphereScreen() {
    var qubitMode by remember { mutableStateOf(QubitMode.SINGLE) }
    var theta by remember { mutableStateOf(0f) }
    var phi by remember { mutableStateOf(0f) }
    var theta2 by remember { mutableStateOf(0f) }
    var phi2 by remember { mutableStateOf(0f) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        // Mode selector
        TabRow(selectedTabIndex = qubitMode.ordinal) {
            Tab(
                selected = qubitMode == QubitMode.SINGLE,
                onClick = { qubitMode = QubitMode.SINGLE },
                text = { Text("1 Qubit") }
            )
            Tab(
                selected = qubitMode == QubitMode.DOUBLE,
                onClick = { qubitMode = QubitMode.DOUBLE },
                text = { Text("2 Qubits") }
            )
        }

        Spacer(modifier = Modifier.height(16.dp))

        if (qubitMode == QubitMode.SINGLE) {
            SingleQubitView(
                theta = theta,
                phi = phi,
                onThetaChange = { theta = it },
                onPhiChange = { phi = it }
            )
        } else {
            TwoQubitView(
                theta1 = theta,
                phi1 = phi,
                theta2 = theta2,
                phi2 = phi2,
                onTheta1Change = { theta = it },
                onPhi1Change = { phi = it },
                onTheta2Change = { theta2 = it },
                onPhi2Change = { phi2 = it }
            )
        }
    }
}

@Composable
fun SingleQubitView(
    theta: Float,
    phi: Float,
    onThetaChange: (Float) -> Unit,
    onPhiChange: (Float) -> Unit
) {
    Column {
        // Bloch Sphere visualization
        Canvas(
            modifier = Modifier
                .fillMaxWidth()
                .height(300.dp)
        ) {
            val centerX = size.width / 2
            val centerY = size.height / 2
            val radius = minOf(centerX, centerY) * 0.8f

            // Draw sphere
            drawCircle(
                color = Color.Blue.copy(alpha = 0.1f),
                radius = radius,
                center = Offset(centerX, centerY)
            )

            // Draw axes
            drawLine(
                color = Color.Gray.copy(alpha = 0.5f),
                start = Offset(centerX, centerY - radius),
                end = Offset(centerX, centerY + radius),
                strokeWidth = 2f
            )
            drawLine(
                color = Color.Gray.copy(alpha = 0.5f),
                start = Offset(centerX - radius, centerY),
                end = Offset(centerX + radius, centerY),
                strokeWidth = 2f
            )

            // Draw state vector
            val x = centerX + radius * 0.8f * sin(theta) * cos(phi)
            val y = centerY - radius * 0.8f * cos(theta)

            drawLine(
                color = Color.Red,
                start = Offset(centerX, centerY),
                end = Offset(x, y),
                strokeWidth = 4f
            )

            drawCircle(
                color = Color.Red,
                radius = 8f,
                center = Offset(x, y)
            )
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Controls
        Column(modifier = Modifier.padding(horizontal = 16.dp)) {
            Text("θ (Theta): ${String.format("%.2f", theta)} rad")
            Slider(
                value = theta,
                onValueChange = onThetaChange,
                valueRange = 0f..PI.toFloat()
            )

            Spacer(modifier = Modifier.height(8.dp))

            Text("φ (Phi): ${String.format("%.2f", phi)} rad")
            Slider(
                value = phi,
                onValueChange = onPhiChange,
                valueRange = 0f..(2 * PI).toFloat()
            )

            Spacer(modifier = Modifier.height(16.dp))

            // State info
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(
                    containerColor = MaterialTheme.colorScheme.surfaceVariant
                )
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        "Quantum State:",
                        style = MaterialTheme.typography.titleSmall
                    )
                    Text(
                        "|ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩",
                        style = MaterialTheme.typography.bodySmall
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        "Probability |0⟩: ${String.format("%.2f%%", cos(theta/2).pow(2) * 100)}",
                        style = MaterialTheme.typography.bodySmall
                    )
                    Text(
                        "Probability |1⟩: ${String.format("%.2f%%", sin(theta/2).pow(2) * 100)}",
                        style = MaterialTheme.typography.bodySmall
                    )
                }
            }
        }
    }
}

@Composable
fun TwoQubitView(
    theta1: Float,
    phi1: Float,
    theta2: Float,
    phi2: Float,
    onTheta1Change: (Float) -> Unit,
    onPhi1Change: (Float) -> Unit,
    onTheta2Change: (Float) -> Unit,
    onPhi2Change: (Float) -> Unit
) {
    Column(
        modifier = Modifier.fillMaxSize()
    ) {
        Text(
            "Qubit 1",
            style = MaterialTheme.typography.titleMedium,
            modifier = Modifier.padding(horizontal = 16.dp)
        )

        // Simplified sphere for qubit 1
        Canvas(
            modifier = Modifier
                .fillMaxWidth()
                .height(150.dp)
        ) {
            val centerX = size.width / 2
            val centerY = size.height / 2
            val radius = minOf(centerX, centerY) * 0.8f

            drawCircle(
                color = Color.Blue.copy(alpha = 0.1f),
                radius = radius,
                center = Offset(centerX, centerY)
            )

            val x1 = centerX + radius * 0.8f * sin(theta1) * cos(phi1)
            val y1 = centerY - radius * 0.8f * cos(theta1)

            drawCircle(
                color = Color.Red,
                radius = 8f,
                center = Offset(x1, y1)
            )
        }

        Column(modifier = Modifier.padding(horizontal = 16.dp)) {
            Text("θ₁: ${String.format("%.2f", theta1)} rad", style = MaterialTheme.typography.bodySmall)
            Slider(value = theta1, onValueChange = onTheta1Change, valueRange = 0f..PI.toFloat())

            Text("φ₁: ${String.format("%.2f", phi1)} rad", style = MaterialTheme.typography.bodySmall)
            Slider(value = phi1, onValueChange = onPhi1Change, valueRange = 0f..(2 * PI).toFloat())
        }

        Divider(modifier = Modifier.padding(vertical = 16.dp))

        Text(
            "Qubit 2",
            style = MaterialTheme.typography.titleMedium,
            modifier = Modifier.padding(horizontal = 16.dp)
        )

        // Simplified sphere for qubit 2
        Canvas(
            modifier = Modifier
                .fillMaxWidth()
                .height(150.dp)
        ) {
            val centerX = size.width / 2
            val centerY = size.height / 2
            val radius = minOf(centerX, centerY) * 0.8f

            drawCircle(
                color = Color.Green.copy(alpha = 0.1f),
                radius = radius,
                center = Offset(centerX, centerY)
            )

            val x2 = centerX + radius * 0.8f * sin(theta2) * cos(phi2)
            val y2 = centerY - radius * 0.8f * cos(theta2)

            drawCircle(
                color = Color.Green,
                radius = 8f,
                center = Offset(x2, y2)
            )
        }

        Column(modifier = Modifier.padding(horizontal = 16.dp)) {
            Text("θ₂: ${String.format("%.2f", theta2)} rad", style = MaterialTheme.typography.bodySmall)
            Slider(value = theta2, onValueChange = onTheta2Change, valueRange = 0f..PI.toFloat())

            Text("φ₂: ${String.format("%.2f", phi2)} rad", style = MaterialTheme.typography.bodySmall)
            Slider(value = phi2, onValueChange = onPhi2Change, valueRange = 0f..(2 * PI).toFloat())
        }
    }
}

enum class QubitMode {
    SINGLE, DOUBLE
}
