import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { SPACING, RADIUS, FONT } from '../constants/spacing';
import { previewTimes } from '../utils/scheduleHelpers';
import AppButton from './AppButton';

export default function NextReminderCard({ medicine, onMarkTaken }) {
  const times = previewTimes(medicine.reminderTimes || [medicine.time]);
  const next = times[0] || medicine.time;

  return (
    <View style={styles.card}>
      <Text style={styles.label}>NEXT REMINDER</Text>
      <View style={styles.medicineRow}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>&#128737;</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{medicine.name}</Text>
          <Text style={styles.time}>{next}</Text>
          <Text style={styles.frequency}>{medicine.frequencyLabel || 'Daily'}</Text>
        </View>
      </View>
      <AppButton title="Mark as Taken" onPress={onMarkTaken} />
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
  medicineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.md,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  icon: {
    fontSize: FONT.large,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: FONT.medium,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  time: {
    fontSize: FONT.large,
    fontWeight: '800',
    color: COLORS.primary,
    marginTop: SPACING.xs,
  },
  frequency: {
    fontSize: FONT.small,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
});
