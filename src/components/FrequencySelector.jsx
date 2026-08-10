import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { COLORS } from '../constants/colors';
import { SPACING, RADIUS, FONT } from '../constants/spacing';
import { FREQUENCIES } from '../constants/frequencies';

export default function FrequencySelector({ value, onChange }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>How Often?</Text>
      <View style={styles.grid}>
        {FREQUENCIES.map((item) => {
          const active = value === item.id;
          return (
            <Pressable
              key={item.id}
              onPress={() => onChange(item.id)}
              style={[styles.option, active && styles.optionActive]}
            >
              <Text style={[styles.optionText, active && styles.optionTextActive]}>
                {item.label}
              </Text>
              {active ? <Text style={styles.check}>&#10003;</Text> : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONT.regular,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    minWidth: '46%',
  },
  optionActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  optionText: {
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  optionTextActive: {
    color: COLORS.white,
  },
  check: {
    color: COLORS.white,
    marginLeft: SPACING.sm,
    fontWeight: '700',
  },
});
