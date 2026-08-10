import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS } from '../constants/colors';
import { SPACING, RADIUS, FONT } from '../constants/spacing';
import { toTimeString } from '../utils/dateTimeHelpers';

export default function TimePickerField({ label, value, onChange }) {
  const [show, setShow] = useState(false);

  const onTimeChange = (event, selected) => {
    setShow(false);
    if (event.type === 'set' && selected) {
      onChange(selected);
    }
  };

  return (
    <View style={styles.field}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <Pressable
        onPress={() => setShow(true)}
        style={styles.input}
      >
        <Text style={styles.icon}>&#128336;</Text>
        <Text style={styles.value}>{toTimeString(value)}</Text>
      </Pressable>
      {show ? (
        <DateTimePicker
          value={value}
          mode="time"
          display="default"
          is24Hour={false}
          onChange={onTimeChange}
        />
      ) : null}
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
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  icon: {
    fontSize: FONT.medium,
    marginRight: SPACING.sm,
  },
  value: {
    fontSize: FONT.medium,
    color: COLORS.textPrimary,
  },
});
