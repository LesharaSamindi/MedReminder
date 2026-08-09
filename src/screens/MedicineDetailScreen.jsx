import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Switch, ScrollView } from 'react-native';
import { COLORS } from '../constants/colors';
import { SPACING, RADIUS, FONT } from '../constants/spacing';
import { MEDICINES } from '../data/medicines';
import { formatStartDate } from '../utils/dateTimeHelpers';
import { previewTimes } from '../utils/scheduleHelpers';
import { scheduleMedicine, cancelMedicineNotifications } from '../services/notificationService';
import AppButton from '../components/AppButton';

export default function MedicineDetailScreen({ route }) {
  const initial = MEDICINES.find((m) => m.id === route.params.medicineId) || MEDICINES[0];

  const [reminderEnabled, setReminderEnabled] = useState(initial.reminderEnabled);
  const [status, setStatus] = useState(initial.status);

  const isTaken = status === 'Taken';
  const times = previewTimes(initial.reminderTimes || [initial.time]);
  const startDate = initial.startDate ? new Date(initial.startDate) : new Date();

  const toggleReminder = async (value) => {
    setReminderEnabled(value);
    const updated = { ...initial, reminderEnabled: value };
    if (value) {
      await scheduleMedicine(updated);
    } else {
      await cancelMedicineNotifications(updated);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Text style={styles.heroIconText}>&#128737;</Text>
          </View>
          <Text style={styles.name}>{initial.name}</Text>
          <Text style={styles.type}>{initial.type}</Text>
        </View>

        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Status</Text>
          <View style={[styles.statusPill, { backgroundColor: isTaken ? COLORS.successSoft : COLORS.warningSoft }]}>
            <Text style={[styles.statusText, { color: isTaken ? COLORS.success : COLORS.warning }]}>
              {status}
            </Text>
          </View>
        </View>

        <Text style={styles.section}>Medicine Information</Text>
        <View style={styles.card}>
          <InfoRow label="Instructions" value={initial.dosage} />
          <InfoRow label="Start Date" value={formatStartDate(startDate)} />
          <InfoRow label="Frequency" value={initial.frequencyLabel || initial.frequency} />
        </View>

        <Text style={styles.section}>Reminder Schedule</Text>
        <View style={styles.card}>
          {times.map((time, index) => (
            <Text key={index} style={styles.timeText}>
              &#9200; {time}
            </Text>
          ))}
        </View>

        <Text style={styles.section}>Medicine Reminder</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Reminder</Text>
            <Switch
              value={reminderEnabled}
              onValueChange={toggleReminder}
              trackColor={{ true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>
        </View>

        <AppButton
          title={isTaken ? 'Mark as Pending' : 'Mark as Taken'}
          onPress={() => setStatus(isTaken ? 'Pending' : 'Taken')}
          variant={isTaken ? 'secondary' : 'primary'}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({ label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  hero: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.xl,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroIconText: {
    fontSize: 36,
  },
  name: {
    fontSize: FONT.xxlarge,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginTop: SPACING.md,
  },
  type: {
    fontSize: FONT.medium,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  statusLabel: {
    fontSize: FONT.medium,
    color: COLORS.textSecondary,
  },
  statusPill: {
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  statusText: {
    fontSize: FONT.small,
    fontWeight: '700',
  },
  section: {
    fontSize: FONT.medium,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  infoRow: {
    paddingVertical: SPACING.sm,
  },
  infoLabel: {
    fontSize: FONT.small,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: FONT.medium,
    color: COLORS.textPrimary,
    fontWeight: '600',
    marginTop: SPACING.xs,
  },
  timeText: {
    fontSize: FONT.medium,
    color: COLORS.textPrimary,
    fontWeight: '600',
    paddingVertical: SPACING.xs,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  rowLabel: {
    fontSize: FONT.medium,
    color: COLORS.textPrimary,
  },
});
