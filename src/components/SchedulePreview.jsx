import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { SPACING, RADIUS, FONT } from '../constants/spacing';

export default function SchedulePreview({ times = [] }) {
  if (times.length === 0) {
    return null;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Schedule Preview</Text>
      <Text style={styles.caption}>Every day</Text>
      <View style={styles.timesRow}>
        {times.map((time, index) => (
          <View key={index} style={styles.timeChip}>
            <Text style={styles.timeText}>{time}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.primarySoft,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  heading: {
    fontSize: FONT.medium,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  caption: {
    fontSize: FONT.small,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  timesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  timeChip: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.sm + 2,
    paddingVertical: SPACING.xs + 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  timeText: {
    fontSize: FONT.small,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
});
