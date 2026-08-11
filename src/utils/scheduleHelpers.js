import { toHourMinute } from './dateTimeHelpers';

export function generateOnceDaily(startDate) {
  return [startDate];
}

export function generateTwiceDaily(firstTime, secondTime) {
  return [toHourMinute(firstTime), toHourMinute(secondTime)];
}

export function generateEverySixHours(startDate) {
  const times = [];
  for (let i = 0; i < 4; i++) {
    const next = new Date(startDate);
    next.setHours(startDate.getHours() + i * 6, startDate.getMinutes(), 0, 0);
    times.push(toHourMinute(next));
  }
  return times;
}

export function buildSchedule({ frequency, startDate, firstTime, secondTime, customTimes }) {
  switch (frequency) {
    case 'once_daily':
      return [toHourMinute(startDate)];
    case 'twice_daily':
      return generateTwiceDaily(firstTime, secondTime);
    case 'every_6_hours':
      return generateEverySixHours(startDate);
    default:
      return [toHourMinute(startDate)];
  }
}
