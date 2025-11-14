import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/theme';
import type { Badge as BadgeType } from '../store/useGamification';

interface BadgeProps {
  badge: BadgeType;
}

export const Badge: React.FC<BadgeProps> = ({ badge }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: badge.color }]}>
      <Text style={styles.name}>{badge.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  name: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});
