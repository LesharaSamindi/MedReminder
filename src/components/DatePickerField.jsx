import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS } from '../constants/colors';
import { SPACING, RADIUS, FONT } from '../constants/spacing';
import { formatStartDate } from '../utils/dateTimeHelpers';

export default function DatePickerField({ label, value, onChange, error }) {
  const [show, setShow] = useState(false);

  const onDateChange = (event, selected) => {
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
        style={[styles.input, error ? styles.inputError : null]}
      >
        <Text style={styles.icon}>&#128197;</Text>
        <Text style={styles.value}>{formatStartDate(value)}</Text>
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {show ? (
        <DateTimePicker
          value={value}
          mode="date"
          display="default"
          onChange={onDateChange}
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
  inputError: {
    borderColor: COLORS.error,
  },
  icon: {
    fontSize: FONT.medium,
    marginRight: SPACING.sm,
  },
  value: {
    fontSize: FONT.medium,
    color: COLORS.textPrimary,
  },
  error: {
    color: COLORS.error,
    fontSize: FONT.small,
    marginTop: SPACING.xs,
  },
});
