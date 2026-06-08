/**
 * Local notification service (the app's native mobile resource).
 *
 * The SwarmBuild Earth companion alerts the operator when the swarm reacts to an
 * occurrence — a lease expires and a task is re-auctioned (self-heal). Those
 * events arrive as device notifications, which is what a mission-ops phone app
 * is for: you get buzzed when something happens while you're not watching.
 *
 * Only LOCAL notifications are used (no server), so the flow is fully
 * demonstrable offline. Permission and error states are normalized into a single
 * result type so screens can render clear messages.
 */

import * as Notifications from 'expo-notifications';

/** How the OS presents a notification while the app is foregrounded. */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export type PermissionStatus = 'granted' | 'denied' | 'undetermined';

/** Content carried by a notification; `data` drives the deep-link on tap. */
export type AlertContent = {
  title: string;
  body: string;
  /** Route to open when tapped, e.g. "/confirmation?reportId=rep-1" or "/rovers". */
  route?: string;
};

/** Reads the current permission without prompting. */
export async function getNotificationPermission(): Promise<PermissionStatus> {
  const { status } = await Notifications.getPermissionsAsync();
  return normalize(status);
}

/** Requests permission (prompts only if undetermined). Never throws. */
export async function requestNotificationPermission(): Promise<PermissionStatus> {
  try {
    const current = await Notifications.getPermissionsAsync();
    if (current.status === 'granted') return 'granted';
    const { status } = await Notifications.requestPermissionsAsync();
    return normalize(status);
  } catch {
    return 'denied';
  }
}

/**
 * Schedules a local notification after `delaySeconds`. Returns true if it was
 * scheduled, false if permission is missing or scheduling failed — callers stay
 * functional without notifications.
 */
export async function scheduleAlert(
  content: AlertContent,
  delaySeconds = 4,
): Promise<boolean> {
  try {
    const status = await requestNotificationPermission();
    if (status !== 'granted') return false;
    await Notifications.scheduleNotificationAsync({
      content: {
        title: content.title,
        body: content.body,
        data: content.route ? { route: content.route } : {},
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: Math.max(1, delaySeconds),
      },
    });
    return true;
  } catch {
    return false;
  }
}

function normalize(status: Notifications.PermissionStatus): PermissionStatus {
  if (status === 'granted') return 'granted';
  if (status === 'undetermined') return 'undetermined';
  return 'denied';
}
