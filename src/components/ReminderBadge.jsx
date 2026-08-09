import React from 'react';
import { Text, View } from 'react-native';
import { COLORS } from '../constants/colors';
import { SPACING, RADIUS, FONT } from '../constants/spacing';

export default function ReminderBadge({ enabled }) {
  const isOn = enabled === true;
  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: isOn ? COLORS.successSoft : COLORS.warningSoft },
      ]}
    >
      <View
        style={[styles.dot, { backgroundColor: isOn ? COLORS.success : COLORS.warning }]}
      />
      <Text style={[styles.text, { color: isOn ? COLORS.success : COLORS.warning }]}>
        {isOn ? 'Reminder On' : 'Reminder Off'}
      </Text>
    </View>
  );
}

const styles = {
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm + 2,
    paddingVertical: SPACING.xs + 1,
    borderRadius: RADIUS.pill,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: RADIUS.pill,
    marginRight: SPACING.xs,
  },
  text: {
    fontSize: FONT.small,
    fontWeight: '600',
  },
};
