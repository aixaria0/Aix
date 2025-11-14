import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { useTheme } from '../../src/theme/theme';
import { ThemeToggle } from '../../src/components/ThemeToggle';

export default function SettingsScreen() {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.palette.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={[styles.title, { color: theme.palette.textPrimary }]}>
        Settings
      </Text>
      <Text style={[styles.subtitle, { color: theme.palette.textSecondary }]}>
        Customize your experience
      </Text>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.palette.textPrimary }]}>
          Appearance
        </Text>
        <ThemeToggle />
      </View>

      <View style={[styles.infoCard, { backgroundColor: theme.palette.surface }]}>
        <Text style={[styles.infoTitle, { color: theme.palette.textPrimary }]}>
          About Aix
        </Text>
        <Text style={[styles.infoText, { color: theme.palette.textSecondary }]}>
          Internal Testing Platform v1.0.0{'\n'}
          For internal use only
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  infoCard: {
    borderRadius: 16,
    padding: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
