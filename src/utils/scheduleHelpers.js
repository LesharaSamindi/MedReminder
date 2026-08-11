import { toHourMinute } from './dateTimeHelpers';

export function buildSchedule({ frequency, startDate, firstTime, secondTime, customTimes }) {
  return [toHourMinute(startDate)];
}
