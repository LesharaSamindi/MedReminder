import React from 'react';
import { Pressable, Text } from 'react-native';
import { COLORS } from '../constants/colors';
import { SPACING, RADIUS, FONT } from '../constants/spacing';

export default function AppButton({ title, onPress, disabled = false, variant = 'primary' }) {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isDanger = variant === 'danger';

  const buttonBg = isDanger
    ? COLORS.error
    : isSecondary
    ? COLORS.surface
    : COLORS.primary;
  const textColor = isSecondary ? COLORS.primary : COLORS.white;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: buttonBg },
        (pressed || disabled) && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
    </Pressable>
  );
}

const styles = {
  button: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
  title: {
    fontSize: FONT.medium,
    fontWeight: '700',
  },
};
