/**
 * GPS location service (the app's native mobile resource).
 *
 * Wraps expo-location to capture the ground-station coordinates from which an
 * operator files a report. Permission handling and error states are normalized
 * into a single result type so screens can render clear messages.
 */

import * as Location from 'expo-location';

import type { GeoPoint } from '@/types/domain';

export type LocationResult =
  | { status: 'ok'; point: GeoPoint }
  | { status: 'denied' }
  | { status: 'error'; message: string };

/**
 * Requests permission (if needed) and reads the current position.
 * Never throws — callers branch on `result.status`.
 */
export async function getCurrentLocation(): Promise<LocationResult> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return { status: 'denied' };
    }
    const position = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    return {
      status: 'ok',
      point: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Falha ao obter localização';
    return { status: 'error', message };
  }
}

/** Formats a geo point for display, e.g. "-23.5630, -46.6543". */
export function formatGeoPoint(point: GeoPoint): string {
  return `${point.latitude.toFixed(4)}, ${point.longitude.toFixed(4)}`;
}
