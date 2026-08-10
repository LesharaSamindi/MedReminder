export const MEDICINE_TYPES = ['Tablet', 'Capsule', 'Liquid', 'Other'];

export function validateMedicine({ name, type, time, reminderTimes }) {
  const errors = {};

  if (!name || name.trim().length === 0) {
    errors.name = 'Medicine name is required.';
  }

  if (!type || type.length === 0) {
    errors.type = 'Please choose a medicine type.';
  }

  const hasAnyTime = (time && time.length > 0) || (reminderTimes && reminderTimes.length > 0);
  if (!hasAnyTime) {
    errors.time = 'Please set at least one reminder time.';
  }

  return errors;
}
