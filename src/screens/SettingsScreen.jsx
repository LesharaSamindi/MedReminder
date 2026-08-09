import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Switch, Image } from 'react-native';
import { COLORS } from '../constants/colors';
import { SPACING, RADIUS, FONT } from '../constants/spacing';

export default function SettingsScreen() {
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [defaultReminder, setDefaultReminder] = useState(true);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.section}>Notifications</Text>
        <View style={styles.card}>
          <SettingRow label="Medicine Reminders" value={remindersEnabled} onChange={setRemindersEnabled} />
          <View style={styles.divider} />
          <SettingRow label="Sound" value={soundEnabled} onChange={setSoundEnabled} />
        </View>

        <Text style={styles.section}>Preferences</Text>
        <View style={styles.card}>
          <SettingRow label="Default Reminder" value={defaultReminder} onChange={setDefaultReminder} />
        </View>

        <Text style={styles.section}>About</Text>
        <View style={styles.about}>
          <Image
            source={require('../../assets/branding/medireminder-compact.png')}
            style={styles.aboutLogo}
            resizeMode="contain"
          />
          <Text style={styles.version}>Version 1.0.0</Text>
          <Text style={styles.tagline}>Personal Medication Management Prototype</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

function SettingRow({ label, value, onChange }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ true: COLORS.primary }}
        thumbColor={COLORS.white}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
  },
  section: {
    fontSize: FONT.medium,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  rowLabel: {
    fontSize: FONT.medium,
    color: COLORS.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  about: {
    marginTop: SPACING.xl,
    alignItems: 'center',
  },
  aboutLogo: {
    width: 160,
    height: 44,
  },
  appName: {
    fontSize: FONT.large,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  version: {
    fontSize: FONT.regular,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  tagline: {
    fontSize: FONT.small,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
});
