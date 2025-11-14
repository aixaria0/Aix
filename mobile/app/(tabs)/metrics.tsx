import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, RefreshControl, TouchableOpacity } from 'react-native';
import { useTheme } from '../../src/theme/theme';
import { useMetrics } from '../../src/store/useMetrics';
import { MetricCard } from '../../src/components/MetricCard';
import { ChartPlaceholder } from '../../src/components/ChartPlaceholder';

export default function MetricsScreen() {
  const { theme } = useTheme();
  const { metrics, updateMetrics } = useMetrics();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    updateMetrics();
    setTimeout(() => setRefreshing(false), 500);
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.palette.background }]}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={theme.palette.accent}
        />
      }
    >
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: theme.palette.textPrimary }]}>
            Metrics
          </Text>
          <Text style={[styles.subtitle, { color: theme.palette.textSecondary }]}>
            Last updated: {formatDate(metrics.lastUpdated)}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.refreshButton, { backgroundColor: theme.palette.surface }]}
          onPress={handleRefresh}
        >
          <Text style={[styles.refreshText, { color: theme.palette.accent }]}>🔄</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.metricsRow}>
        <MetricCard label="Total Jobs" value={metrics.totalJobs} />
        <MetricCard label="Active Jobs" value={metrics.activeJobs} />
      </View>

      <View style={styles.metricsRow}>
        <MetricCard label="Avg Score" value={`${metrics.avgScore.toFixed(1)}%`} />
        <MetricCard label="Success Rate" value={`${metrics.successRatio.toFixed(1)}%`} />
      </View>

      <View style={[styles.chartSection, { backgroundColor: theme.palette.surface }]}>
        <Text style={[styles.chartTitle, { color: theme.palette.textPrimary }]}>
          Performance Over Time
        </Text>
        <ChartPlaceholder />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  refreshButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshText: {
    fontSize: 20,
  },
  metricsRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  chartSection: {
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
