import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { SPACING, RADIUS, FONT } from '../constants/spacing';
import { previewTimes } from '../utils/scheduleHelpers';
import ReminderBadge from './ReminderBadge';

export default function MedicineCard({ medicine, onPress }) {
  const isTaken = medicine.status === 'Taken';
  const times = previewTimes(medicine.reminderTimes || [medicine.time]);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.medicineRow}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>&#128737;</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{medicine.name}</Text>
          <Text style={styles.type}>{medicine.type}</Text>
        </View>
        <ReminderBadge enabled={medicine.reminderEnabled} />
      </View>

      <View style={styles.divider} />

      <View style={styles.bottomRow}>
        <View>
          <Text style={styles.time}>{times[0]}</Text>
          <Text style={styles.frequency}>{medicine.frequencyLabel || medicine.frequency}</Text>
        </View>
        <View style={[styles.statusPill, { backgroundColor: isTaken ? COLORS.successSoft : COLORS.warningSoft }]}>
          <Text style={[styles.statusText, { color: isTaken ? COLORS.success : COLORS.warning }]}>
            {isTaken ? 'Taken &#10003;' : 'Pending'}
          </Text>
        </View>
      </View>
    </Pressable>
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
  pressed: {
    opacity: 0.85,
  },
  medicineRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 44,
    height: 44,
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
  type: {
    fontSize: FONT.small,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    fontSize: FONT.medium,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  frequency: {
    fontSize: FONT.small,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  statusPill: {
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.sm + 2,
    paddingVertical: SPACING.xs,
  },
  statusText: {
    fontSize: FONT.small,
    fontWeight: '700',
  },
});
