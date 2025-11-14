import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useTheme } from '../../src/theme/theme';
import { validateToken } from '../../src/api/auth';

const TOKEN_STORAGE_KEY = 'auth_token';

export default function LoginScreen() {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();

  const handleLogin = async () => {
    if (!token.trim()) {
      Alert.alert('Error', 'Please enter a token');
      return;
    }

    setLoading(true);
    try {
      const result = await validateToken(token);

      if (result.valid) {
        await SecureStore.setItemAsync(TOKEN_STORAGE_KEY, token);
        router.replace('/(tabs)');
      } else {
        Alert.alert('Authentication Failed', result.error || 'Invalid token');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to validate token');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.palette.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.palette.textPrimary }]}>
          Welcome Back
        </Text>
        <Text style={[styles.subtitle, { color: theme.palette.textSecondary }]}>
          Enter your authentication token to continue
        </Text>

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.palette.surface,
              color: theme.palette.textPrimary,
              borderColor: theme.palette.textSecondary,
            },
          ]}
          placeholder="Enter token (min 8 characters)"
          placeholderTextColor={theme.palette.textSecondary}
          value={token}
          onChangeText={setToken}
          secureTextEntry
          autoCapitalize="none"
          editable={!loading}
        />

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: theme.palette.accent },
            loading && styles.buttonDisabled,
          ]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <Text style={[styles.hint, { color: theme.palette.textSecondary }]}>
          Hint: Token must be at least 8 characters
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  hint: {
    fontSize: 14,
    textAlign: 'center',
  },
});
