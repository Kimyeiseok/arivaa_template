import {
  scheduleNotificationAsync,
  getExpoPushTokenAsync,
  addNotificationReceivedListener,
} from 'expo-notifications';
import {
  askPermission,
  checkPermissionStatus,
  Permissions,
} from './permissions';

/**
 * Schedule the notification
 * @param notification
 * @param delay - in seconds
 */
export function scheduleLocalNotification(notification, delay, options) {
  scheduleNotificationAsync({
    content: notification,
    trigger: {
      seconds: delay,
      ...options,
    },
  });
}
/**
 * Get Expo Server Token for Pushing notification
 * You can use it on server to send notifications to this client
 * @returns {Promise.<*>}
 */
export async function getExpoPushServerToken() {
  let status = await checkPermissionStatus(Permissions.NOTIFICATIONS);

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (!status) {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    await askPermission(Permissions.NOTIFICATIONS);
    status = await checkPermissionStatus(Permissions.NOTIFICATIONS);
  }
  if (!status) {
    return;
  }
  // Get the token that uniquely identifies this device
  const { data } = await getExpoPushTokenAsync();

  return data;
}
/**
 * Add Notification Listener
 * @param listener
 */
export function addListener(listener) {
  if (listener instanceof Function) {
    return addNotificationReceivedListener(listener);
  }
}
