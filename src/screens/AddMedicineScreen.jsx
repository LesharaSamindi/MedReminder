import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  Switch,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { SPACING, RADIUS, FONT } from '../constants/spacing';
import { MEDICINE_TYPES } from '../utils/validation';
import { validateMedicine } from '../utils/validation';
import { MAX_CUSTOM_TIMES } from '../constants/frequencies';
import {
  toHourMinute,
} from '../utils/dateTimeHelpers';
import { buildSchedule, previewTimes } from '../utils/scheduleHelpers';
import { scheduleMedicine } from '../services/notificationService';
import AppButton from '../components/AppButton';
import DatePickerField from '../components/DatePickerField';
import TimePickerField from '../components/TimePickerField';
import FrequencySelector from '../components/FrequencySelector';
import SchedulePreview from '../components/SchedulePreview';

const DEFAULT_TIME = () => {
  const d = new Date();
  d.setHours(8, 0, 0, 0);
  return d;
};

export default function AddMedicineScreen({ navigation, route }) {
  const [name, setName] = useState('');
  const [type, setType] = useState(MEDICINE_TYPES[0]);
  const [dosage, setDosage] = useState('Follow prescription');
  const [startDate, setStartDate] = useState(new Date());
  const [frequency, setFrequency] = useState('once_daily');
  const [firstTime, setFirstTime] = useState(DEFAULT_TIME);
  const [secondTime, setSecondTime] = useState(() => {
    const d = new Date();
    d.setHours(20, 0, 0, 0);
    return d;
  });
  const [customTimes, setCustomTimes] = useState([]);
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [errors, setErrors] = useState({});

  const schedule = buildSchedule({
    frequency,
    startDate,
    firstTime,
    secondTime,
    customTimes,
  });

  const preview = previewTimes(schedule);
  const currentTimeValue = frequency === 'twice_daily' ? firstTime : startDate;

  const addCustomTime = () => {
    if (customTimes.length >= MAX_CUSTOM_TIMES) return;
    const base = new Date();
    base.setHours(8, 0, 0, 0);
    setCustomTimes((prev) => [...prev, toHourMinute(base)]);
  };

  const removeCustomTime = (index) => {
    setCustomTimes((prev) => prev.filter((_, i) => i !== index));
  };

  const changeCustomTime = (index, date) => {
    setCustomTimes((prev) => prev.map((t, i) => (i === index ? toHourMinute(date) : t)));
  };

  const handleSubmit = async () => {
    const validationErrors = validateMedicine({ name, type, time: schedule[0], reminderTimes: schedule });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const frequencyLabel = {
      once_daily: 'Once Daily',
      twice_daily: 'Twice Daily',
      every_6_hours: 'Every 6 Hours',
      custom: 'Custom',
    }[frequency];

    const newMedicine = {
      id: String(Date.now()),
      name: name.trim(),
      type,
      dosage: dosage.trim() || 'Follow prescription',
      time: preview[0],
      frequency: frequencyLabel,
      frequencyId: frequency,
      frequencyLabel,
      reminderTimes: schedule,
      startDate: startDate.toISOString(),
      status: 'Pending',
      reminderEnabled,
    };

    if (reminderEnabled) {
      const id = await scheduleMedicine(newMedicine);
      newMedicine.notificationId = id;
    }

    if (route.params?.onAdd) {
      route.params.onAdd(newMedicine);
    }

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.section}>Medicine Details</Text>

        <Field label="Medicine Name *">
          <TextInput
            style={[styles.input, errors.name ? styles.inputError : null]}
            value={name}
            onChangeText={setName}
            placeholder="Enter medicine name"
            placeholderTextColor={COLORS.textSecondary}
          />
          {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}
        </Field>

        <Field label="Medicine Type *">
          <View style={styles.chips}>
            {MEDICINE_TYPES.map((item) => {
              const active = type === item;
              return (
                <Pressable
                  key={item}
                  onPress={() => setType(item)}
                  style={[styles.chip, active && styles.chipActive]}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>{item}</Text>
                </Pressable>
              );
            })}
          </View>
          {errors.type ? <Text style={styles.error}>{errors.type}</Text> : null}
        </Field>

        <Field label="Instructions">
          <TextInput
            style={styles.input}
            value={dosage}
            onChangeText={setDosage}
            placeholder="Follow prescription"
            placeholderTextColor={COLORS.textSecondary}
          />
        </Field>

        <Text style={styles.section}>Schedule</Text>

        <DatePickerField
          label="Start Date"
          value={startDate}
          onChange={setStartDate}
        />

        <FrequencySelector value={frequency} onChange={setFrequency} />

        {frequency === 'once_daily' ? (
          <TimePickerField
            label="Reminder Time"
            value={currentTimeValue}
            onChange={(date) => {
              const next = new Date(startDate);
              next.setHours(date.getHours(), date.getMinutes(), 0, 0);
              setStartDate(next);
            }}
          />
        ) : null}

        {frequency === 'twice_daily' ? (
          <>
            <TimePickerField label="First Reminder" value={firstTime} onChange={setFirstTime} />
            <TimePickerField label="Second Reminder" value={secondTime} onChange={setSecondTime} />
          </>
        ) : null}

        {frequency === 'every_6_hours' ? (
          <TimePickerField
            label="Starting Time"
            value={currentTimeValue}
            onChange={(date) => {
              const next = new Date(startDate);
              next.setHours(date.getHours(), date.getMinutes(), 0, 0);
              setStartDate(next);
            }}
          />
        ) : null}

        {frequency === 'custom' ? (
          <View style={styles.customSection}>
            <Text style={styles.label}>Reminder Times</Text>
            {customTimes.map((t, index) => (
              <View key={index} style={styles.customRow}>
                <View style={styles.customPicker}>
                  <TimePickerField
                    value={parseTime(t)}
                    onChange={(date) => changeCustomTime(index, date)}
                  />
                </View>
                <Pressable
                  onPress={() => removeCustomTime(index)}
                  style={styles.removeBtn}
                >
                  <Text style={styles.removeText}>&#10005;</Text>
                </Pressable>
              </View>
            ))}
            {customTimes.length < MAX_CUSTOM_TIMES ? (
              <AppButton title="+ Add another time" onPress={addCustomTime} variant="secondary" />
            ) : null}
          </View>
        ) : null}

        <Text style={styles.section}>Reminder</Text>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Reminders</Text>
          <Switch
            value={reminderEnabled}
            onValueChange={setReminderEnabled}
            trackColor={{ true: COLORS.primary }}
            thumbColor={COLORS.white}
          />
        </View>

        <SchedulePreview times={preview} />

        <AppButton title="Save Medicine" onPress={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
}

function parseTime(hourMinute) {
  const [hours, minutes] = hourMinute.split(':').map(Number);
  const d = new Date();
  d.setHours(hours, minutes, 0, 0);
  return d;
}

function Field({ label, children }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      {children}
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
  section: {
    fontSize: FONT.medium,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: SPACING.md,
    marginBottom: SPACING.md,
    letterSpacing: 0.5,
  },
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
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: FONT.medium,
    color: COLORS.textPrimary,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  chip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  chipTextActive: {
    color: COLORS.white,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  switchLabel: {
    fontSize: FONT.medium,
    color: COLORS.textPrimary,
  },
  error: {
    color: COLORS.error,
    fontSize: FONT.small,
    marginTop: SPACING.xs,
  },
  customSection: {
    marginBottom: SPACING.lg,
  },
  customRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  customPicker: {
    flex: 1,
  },
  removeBtn: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.errorSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SPACING.sm,
    marginTop: SPACING.xl,
  },
  removeText: {
    color: COLORS.error,
    fontSize: FONT.medium,
    fontWeight: '700',
  },
});
