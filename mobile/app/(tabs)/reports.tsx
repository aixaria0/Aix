import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
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

export default function ReportsScreen() {
  const { theme } = useTheme();
  const { reports } = useReports();
  const router = useRouter();

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.palette.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={[styles.title, { color: theme.palette.textPrimary }]}>
        Reports
      </Text>
      <Text style={[styles.subtitle, { color: theme.palette.textSecondary }]}>
        {reports.length} vulnerability reports
      </Text>

      {reports.map((report) => (
        <TouchableOpacity
          key={report.id}
          style={[styles.reportCard, { backgroundColor: theme.palette.surface }]}
          onPress={() => router.push(`/report/${report.id}`)}
        >
          <View style={styles.reportHeader}>
            <View
              style={[
                styles.severityBadge,
                { backgroundColor: getSeverityColor(report.severity) },
              ]}
            >
              <Text style={styles.severityText}>{report.severity.toUpperCase()}</Text>
            </View>
            <Text style={[styles.timestamp, { color: theme.palette.textSecondary }]}>
              {formatDate(report.createdAt)}
            </Text>
          </View>
          <Text style={[styles.reportTitle, { color: theme.palette.textPrimary }]}>
            {report.title}
          </Text>
          <Text style={[styles.reportSummary, { color: theme.palette.textSecondary }]}>
            {report.summary}
          </Text>
          <View style={styles.reportFooter}>
            <Text style={[styles.score, { color: theme.palette.accent }]}>
              Score: {report.score.toFixed(1)}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
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
  reportCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  severityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  severityText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  timestamp: {
    fontSize: 12,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  reportSummary: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  reportFooter: {
    flexDirection: 'row',
  },
  score: {
    fontSize: 14,
    fontWeight: '600',
  },
});
