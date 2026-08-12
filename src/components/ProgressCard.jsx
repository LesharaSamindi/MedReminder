import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { SPACING, RADIUS, FONT } from '../constants/spacing';

export default function ProgressCard({ takenCount, totalCount }) {
  const percent = totalCount > 0 ? Math.round((takenCount / totalCount) * 100) : 0;

  return (
    <View style={styles.card}>
      <Text style={styles.label}>TODAY'S PROGRESS</Text>
      <Text style={styles.value}>
        {takenCount} of {totalCount} Taken
      </Text>
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${percent}%` }]} />
      </View>
      <Text style={styles.percent}>{percent}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT.small,
    fontWeight: '700',
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
  value: {
    fontSize: FONT.large,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginTop: SPACING.xs,
  },
  barTrack: {
    height: 10,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.primarySoft,
    marginTop: SPACING.md,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.primary,
  },
  percent: {
    fontSize: FONT.small,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
    textAlign: 'right',
  },
});
