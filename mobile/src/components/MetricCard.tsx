import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/theme';

interface MetricCardProps {
  label: string;
  value: string | number;
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.palette.surface }]}>
      <Text style={[styles.label, { color: theme.palette.textSecondary }]}>{label}</Text>
      <Text style={[styles.value, { color: theme.palette.textPrimary }]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    minWidth: 100,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
