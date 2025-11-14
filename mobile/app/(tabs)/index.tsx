import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '../../src/theme/theme';
import { useGamification } from '../../src/store/useGamification';
import { Badge } from '../../src/components/Badge';

const XP_THRESHOLDS = [0, 100, 250, 500, 1000];

export default function HomeScreen() {
  const { theme } = useTheme();
  const { xp, level, badges } = useGamification();
  const fadeAnim = useSharedValue(0);

  useEffect(() => {
    fadeAnim.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.cubic),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
    transform: [{ translateY: (1 - fadeAnim.value) * 20 }],
  }));

  // Calculate progress to next level
  const currentThreshold = XP_THRESHOLDS[level - 1] || 0;
  const nextThreshold = XP_THRESHOLDS[level] || 1000;
  const progressPercent = ((xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.palette.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={[styles.title, { color: theme.palette.textPrimary }]}>
        Welcome to Aix
      </Text>
      <Text style={[styles.subtitle, { color: theme.palette.textSecondary }]}>
        Internal Testing Platform
      </Text>

      <Animated.View style={[styles.gamificationCard, { backgroundColor: theme.palette.surface }, animatedStyle]}>
        <Text style={[styles.cardTitle, { color: theme.palette.textPrimary }]}>
          Your Progress
        </Text>

        <View style={styles.levelSection}>
          <Text style={[styles.levelLabel, { color: theme.palette.textSecondary }]}>
            Level
          </Text>
          <Text style={[styles.levelValue, { color: theme.palette.accent }]}>
            {level}
          </Text>
        </View>

        <View style={styles.xpSection}>
          <View style={styles.xpHeader}>
            <Text style={[styles.xpLabel, { color: theme.palette.textSecondary }]}>
              {xp} XP
            </Text>
            <Text style={[styles.xpTarget, { color: theme.palette.textSecondary }]}>
              {nextThreshold} XP
            </Text>
          </View>
          <View style={[styles.progressBar, { backgroundColor: theme.palette.background }]}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.min(progressPercent, 100)}%`, backgroundColor: theme.palette.accent },
              ]}
            />
          </View>
        </View>

        {badges.length > 0 && (
          <View style={styles.badgesSection}>
            <Text style={[styles.badgesTitle, { color: theme.palette.textSecondary }]}>
              Badges Earned
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {badges.map((badge) => (
                <Badge key={badge.id} badge={badge} />
              ))}
            </ScrollView>
          </View>
        )}

        {badges.length === 0 && (
          <Text style={[styles.noBadges, { color: theme.palette.textSecondary }]}>
            Complete tests to earn badges!
          </Text>
        )}
      </Animated.View>

      <View style={[styles.infoCard, { backgroundColor: theme.palette.surface }]}>
        <Text style={[styles.infoTitle, { color: theme.palette.textPrimary }]}>
          Get Started
        </Text>
        <Text style={[styles.infoText, { color: theme.palette.textSecondary }]}>
          • Create tests to earn XP{'\n'}
          • Track metrics and reports{'\n'}
          • Unlock badges as you progress{'\n'}
          • Switch between themes in Settings
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  gamificationCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  levelSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  levelLabel: {
    fontSize: 16,
    marginRight: 12,
  },
  levelValue: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  xpSection: {
    marginBottom: 20,
  },
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  xpLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  xpTarget: {
    fontSize: 14,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  badgesSection: {
    marginTop: 8,
  },
  badgesTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  noBadges: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
  },
  infoCard: {
    borderRadius: 16,
    padding: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 22,
  },
});
