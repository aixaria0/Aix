package com.quantumml.game.ui.screens

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.delay
import kotlinx.coroutines.isActive
import kotlin.random.Random

@Composable
fun VQCTrainingScreen() {
    var isTraining by remember { mutableStateOf(false) }
    var epoch by remember { mutableStateOf(0) }
    var accuracy by remember { mutableStateOf(0.5f) }
    var loss by remember { mutableStateOf(1.0f) }
    var learningRate by remember { mutableStateOf(0.01f) }
    var numLayers by remember { mutableStateOf(2) }

    // Training simulation
    LaunchedEffect(isTraining) {
        while (isTraining && isActive) {
            delay(500)
            epoch++
            val progress = minOf(epoch.toFloat() / 100f, 1f)
            accuracy = 0.5f + (0.45f * progress) + Random.nextFloat() * 0.05f - 0.025f
            loss = 1.0f * (1.0f - progress * 0.8f) + Random.nextFloat() * 0.05f - 0.025f

            if (epoch >= 100) {
                isTraining = false
            }
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        // Decision boundary visualization
        Text("Decision Boundary", style = MaterialTheme.typography.titleMedium)
        Spacer(modifier = Modifier.height(8.dp))

        DecisionBoundaryView(
            accuracy = accuracy,
            modifier = Modifier
                .fillMaxWidth()
                .height(250.dp)
        )

        Spacer(modifier = Modifier.height(16.dp))

        // Training metrics
        Text("Training Metrics", style = MaterialTheme.typography.titleMedium)
        Spacer(modifier = Modifier.height(8.dp))

        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.surfaceVariant
            )
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                horizontalArrangement = Arrangement.SpaceEvenly
            ) {
                MetricItem("Epoch", epoch.toString())
                MetricItem("Accuracy", String.format("%.1f%%", accuracy * 100), Color.Green)
                MetricItem("Loss", String.format("%.3f", loss), Color.Red)
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Parameters
        Text("Parameters", style = MaterialTheme.typography.titleMedium)
        Spacer(modifier = Modifier.height(8.dp))

        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.surfaceVariant
            )
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Learning Rate: ${String.format("%.3f", learningRate)}")
                Slider(
                    value = learningRate,
                    onValueChange = { learningRate = it },
                    valueRange = 0.001f..0.1f,
                    enabled = !isTraining
                )

                Spacer(modifier = Modifier.height(8.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text("Circuit Layers: $numLayers")
                    Row {
                        Button(
                            onClick = { if (numLayers > 1) numLayers-- },
                            enabled = !isTraining && numLayers > 1
                        ) {
                            Text("-")
                        }
                        Spacer(modifier = Modifier.width(8.dp))
                        Button(
                            onClick = { if (numLayers < 5) numLayers++ },
                            enabled = !isTraining && numLayers < 5
                        ) {
                            Text("+")
                        }
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Training controls
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Button(
                onClick = { isTraining = !isTraining },
                modifier = Modifier.weight(1f),
                colors = ButtonDefaults.buttonColors(
                    containerColor = if (isTraining) MaterialTheme.colorScheme.tertiary else MaterialTheme.colorScheme.primary
                )
            ) {
                Text(if (isTraining) "Pause Training" else "Start Training")
            }

            Button(
                onClick = {
                    epoch = 0
                    accuracy = 0.5f
                    loss = 1.0f
                },
                modifier = Modifier.weight(1f),
                enabled = !isTraining,
                colors = ButtonDefaults.buttonColors(
                    containerColor = MaterialTheme.colorScheme.secondary
                )
            ) {
                Text("Reset")
            }
        }
    }
}

@Composable
fun MetricItem(label: String, value: String, color: Color = Color.Unspecified) {
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text(
            text = label,
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Text(
            text = value,
            style = MaterialTheme.typography.titleMedium,
            color = color
        )
    }
}

@Composable
fun DecisionBoundaryView(accuracy: Float, modifier: Modifier = Modifier) {
    Card(
        modifier = modifier,
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surfaceVariant
        )
    ) {
        Canvas(modifier = Modifier.fillMaxSize()) {
            // Background gradient regions
            drawRect(
                color = Color.Blue.copy(alpha = 0.2f),
                topLeft = Offset(0f, 0f),
                size = size.copy(width = size.width * 0.5f)
            )
            drawRect(
                color = Color.Red.copy(alpha = 0.2f),
                topLeft = Offset(size.width * 0.5f, 0f),
                size = size.copy(width = size.width * 0.5f)
            )

            // Sample data points (Class 0 - blue)
            for (i in 0..9) {
                val x = Random.nextFloat() * size.width * 0.4f + 50f
                val y = Random.nextFloat() * size.height * 0.6f + 50f
                drawCircle(
                    color = Color.Blue,
                    radius = 6f,
                    center = Offset(x, y)
                )
            }

            // Sample data points (Class 1 - red)
            for (i in 0..9) {
                val x = Random.nextFloat() * size.width * 0.4f + size.width * 0.6f
                val y = Random.nextFloat() * size.height * 0.4f + size.height * 0.4f
                drawCircle(
                    color = Color.Red,
                    radius = 6f,
                    center = Offset(x, y)
                )
            }

            // Decision boundary
            val offset = (1.0f - accuracy) * 100f
            val path = Path().apply {
                moveTo(offset, 0f)
                lineTo(size.width - offset, size.height)
            }
            drawPath(
                path = path,
                color = Color.Green,
                style = androidx.compose.ui.graphics.drawscope.Stroke(width = 3f)
            )
        }
    }
}
