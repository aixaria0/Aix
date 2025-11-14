import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTheme } from '../../src/theme/theme';
import { useReports, type Severity } from '../../src/store/useReports';

const getSeverityColor = (severity: Severity): string => {
  switch (severity) {
    case 'critical':
      return '#dc2626';
    case 'high':
      return '#ea580c';
    case 'medium':
      return '#ca8a04';
    case 'low':
      return '#16a34a';
    default:
      return '#6b7280';
  }
};

export default function ReportDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useTheme();
  const { getReport } = useReports();
  
  const report = getReport(id || '');

  if (!report) {
    return (
      <View style={[styles.container, { backgroundColor: theme.palette.background }]}>
        <Stack.Screen options={{ title: 'Report Not Found' }} />
        <Text style={[styles.errorText, { color: theme.palette.textPrimary }]}>
          Report not found
        </Text>
      </View>
    );
  }

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.palette.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Stack.Screen options={{ title: 'Report Details' }} />
      
      <View
        style={[
          styles.severityBadge,
          { backgroundColor: getSeverityColor(report.severity) },
        ]}
      >
        <Text style={styles.severityText}>{report.severity.toUpperCase()}</Text>
      </View>

      <Text style={[styles.title, { color: theme.palette.textPrimary }]}>
        {report.title}
      </Text>

      <Text style={[styles.timestamp, { color: theme.palette.textSecondary }]}>
        {formatDate(report.createdAt)}
      </Text>

      <View style={[styles.scoreCard, { backgroundColor: theme.palette.surface }]}>
        <Text style={[styles.scoreLabel, { color: theme.palette.textSecondary }]}>
          Risk Score
        </Text>
        <Text style={[styles.scoreValue, { color: theme.palette.accent }]}>
          {report.score.toFixed(1)} / 10
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.palette.surface }]}>
        <Text style={[styles.sectionTitle, { color: theme.palette.textPrimary }]}>
          Summary
        </Text>
        <Text style={[styles.sectionText, { color: theme.palette.textSecondary }]}>
          {report.summary}
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.palette.surface }]}>
        <Text style={[styles.sectionTitle, { color: theme.palette.textPrimary }]}>
          Prompt Lineage
        </Text>
        <Text style={[styles.sectionText, { color: theme.palette.textSecondary }]}>
          [Placeholder] Detailed prompt lineage and analysis will be displayed here. This section will show the chain of prompts that led to the vulnerability detection.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.palette.surface }]}>
        <Text style={[styles.sectionTitle, { color: theme.palette.textPrimary }]}>
          Scores Breakdown
        </Text>
        <View style={styles.scoreItem}>
          <Text style={[styles.scoreItemLabel, { color: theme.palette.textSecondary }]}>
            Impact
          </Text>
          <Text style={[styles.scoreItemValue, { color: theme.palette.textPrimary }]}>
            {(report.score * 0.8).toFixed(1)}
          </Text>
        </View>
        <View style={styles.scoreItem}>
          <Text style={[styles.scoreItemLabel, { color: theme.palette.textSecondary }]}>
            Exploitability
          </Text>
          <Text style={[styles.scoreItemValue, { color: theme.palette.textPrimary }]}>
            {(report.score * 0.9).toFixed(1)}
          </Text>
        </View>
        <View style={styles.scoreItem}>
          <Text style={[styles.scoreItemLabel, { color: theme.palette.textSecondary }]}>
            Confidence
          </Text>
          <Text style={[styles.scoreItemValue, { color: theme.palette.textPrimary }]}>
            {(report.score * 0.95).toFixed(1)}
          </Text>
        </View>
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
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
  },
  severityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginBottom: 16,
  },
  severityText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  timestamp: {
    fontSize: 14,
    marginBottom: 24,
  },
  scoreCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  section: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  scoreItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  scoreItemLabel: {
    fontSize: 16,
  },
  scoreItemValue: {
    fontSize: 16,
    fontWeight: '600',
  },
});
