import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../src/theme/theme';
import { useGamification } from '../../src/store/useGamification';

export default function JobsScreen() {
  const { theme } = useTheme();
  const { awardXP } = useGamification();

  const handleCreateTest = () => {
    // Award 25 XP for creating a test
    awardXP(25);
    alert('Test created! +25 XP');
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.palette.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={[styles.title, { color: theme.palette.textPrimary }]}>
        Jobs
      </Text>
      <Text style={[styles.subtitle, { color: theme.palette.textSecondary }]}>
        Manage and create security test jobs
      </Text>

      <View style={[styles.card, { backgroundColor: theme.palette.surface }]}>
        <Text style={[styles.cardTitle, { color: theme.palette.textPrimary }]}>
          Create New Test
        </Text>
        <Text style={[styles.cardText, { color: theme.palette.textSecondary }]}>
          Start a new security testing job to earn XP and level up.
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.palette.accent }]}
          onPress={handleCreateTest}
        >
          <Text style={styles.buttonText}>Create Test (+25 XP)</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.card, { backgroundColor: theme.palette.surface }]}>
        <Text style={[styles.cardTitle, { color: theme.palette.textPrimary }]}>
          Recent Jobs
        </Text>
        <Text style={[styles.cardText, { color: theme.palette.textSecondary }]}>
          No jobs yet. Create your first test to get started!
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  button: {
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
