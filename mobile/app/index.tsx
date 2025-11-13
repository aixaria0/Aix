/**
 * Home Screen
 * Main entry point for the authenticated internal app
 */

import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAppStore } from '../src/store/appStore';

export default function HomeScreen() {
  const { isAuthenticated, isInitializing, error } = useAppStore();

  if (isInitializing) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.statusText}>Initializing...</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorTitle}>⚠️ Authentication Required</Text>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.instructionText}>
          This is a private internal application.{'\n'}
          Please configure your credentials in .env file.
        </Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorTitle}>🔒 Access Denied</Text>
        <Text style={styles.errorText}>
          Valid internal authentication token required.
        </Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aix Internal</Text>
      <Text style={styles.subtitle}>Quantum LLM Sentinel</Text>
      <Text style={styles.statusText}>✓ Authenticated</Text>
      <Text style={styles.infoText}>
        Ready to build the client interface.
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 24,
  },
  statusText: {
    fontSize: 16,
    color: '#007AFF',
    marginTop: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FF3B30',
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    marginBottom: 16,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});
