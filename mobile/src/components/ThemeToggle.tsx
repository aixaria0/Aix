import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Switch } from 'react-native';
import { useTheme } from '../theme/theme';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: theme.palette.surface }]}
      onPress={toggleTheme}
      activeOpacity={0.7}
    >
      <Text style={[styles.label, { color: theme.palette.textPrimary }]}>
        {theme.mode === 'light' ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </Text>
      <Switch
        value={theme.mode === 'dark'}
        onValueChange={toggleTheme}
        trackColor={{ false: '#d1d5db', true: theme.palette.accent }}
        thumbColor="#ffffff"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
});
