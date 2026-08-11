import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function requestPermissions() {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const request = await Notifications.requestPermissionsAsync();
    return request.status === 'granted';
  }
  return true;
}

export async function scheduleMedicineReminder({ medicine, hourMinute }) {
  const [hours, minutes] = hourMinute.split(':').map(Number);

  const trigger = {
    hour: hours,
    minute: minutes,
    repeats: true,
  };

  return Notifications.scheduleNotificationAsync({
    content: {
      title: 'Medicine Reminder',
      body: `It's time for ${medicine.name}. Follow the instructions provided with your prescription.`,
    },
    trigger,
  });
}

export async function scheduleMedicine(medicine) {
  await Notifications.cancelScheduledNotificationAsync(medicine.notificationId);
  if (!medicine.reminderEnabled) return null;

  const times = medicine.reminderTimes || [medicine.time];
  let notificationId = null;

  for (const hourMinute of times) {
    const id = await scheduleMedicineReminder({ medicine, hourMinute });
    notificationId = id;
  }

  return notificationId;
}

export async function cancelMedicineNotifications(medicine) {
  if (medicine.notificationId) {
    await Notifications.cancelScheduledNotificationAsync(medicine.notificationId);
  }
}

export async function getScheduledIds() {
  return Notifications.getAllScheduledNotificationsAsync();
}
