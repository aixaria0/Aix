package com.quantumml.game

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Home
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.quantumml.game.ui.screens.BlochSphereScreen
import com.quantumml.game.ui.screens.MenuScreen
import com.quantumml.game.ui.screens.VQCTrainingScreen

sealed class Screen(val route: String, val title: String) {
    object Menu : Screen("menu", "Menu")
    object BlochSphere : Screen("bloch_sphere", "Bloch Sphere")
    object VQCTraining : Screen("vqc_training", "VQC Training")
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun QuantumMLGameApp() {
    val navController = rememberNavController()
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        when (currentRoute) {
                            Screen.Menu.route -> Screen.Menu.title
                            Screen.BlochSphere.route -> Screen.BlochSphere.title
                            Screen.VQCTraining.route -> Screen.VQCTraining.title
                            else -> "Quantum ML Game"
                        }
                    )
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.primaryContainer,
                    titleContentColor = MaterialTheme.colorScheme.onPrimaryContainer
                )
            )
        }
    ) { innerPadding ->
        NavigationGraph(
            navController = navController,
            modifier = Modifier.padding(innerPadding)
        )
    }
}

@Composable
fun NavigationGraph(
    navController: NavHostController,
    modifier: Modifier = Modifier
) {
    NavHost(
        navController = navController,
        startDestination = Screen.Menu.route,
        modifier = modifier
    ) {
        composable(Screen.Menu.route) {
            MenuScreen(
                onNavigateToBlochSphere = { navController.navigate(Screen.BlochSphere.route) },
                onNavigateToVQCTraining = { navController.navigate(Screen.VQCTraining.route) }
            )
        }
        composable(Screen.BlochSphere.route) {
            BlochSphereScreen()
        }
        composable(Screen.VQCTraining.route) {
            VQCTrainingScreen()
        }
    }
}
