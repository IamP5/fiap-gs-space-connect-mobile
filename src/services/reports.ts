/**
 * Incident report persistence.
 *
 * Occurrences reported by the operator are stored locally with AsyncStorage so
 * the history survives app restarts. All access goes through this module so the
 * storage key and (de)serialization live in one place.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

import type { IncidentReport } from '@/types/domain';

const STORAGE_KEY = '@swarmbuild/reports';

/** Fields the caller supplies; id and timestamp are assigned here. */
export type NewReport = Omit<IncidentReport, 'id' | 'createdAt'>;

/** Returns all reports, newest first. Throws if storage is unreadable. */
export async function listReports(): Promise<IncidentReport[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  const parsed = JSON.parse(raw) as IncidentReport[];
  return parsed.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** Persists a new report and returns the saved record. */
export async function saveReport(input: NewReport): Promise<IncidentReport> {
  const report: IncidentReport = {
    ...input,
    id: `rep-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    createdAt: new Date().toISOString(),
  };
  const existing = await listReports();
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([report, ...existing]));
  return report;
}

/** Returns a single report by id, or undefined if not found. */
export async function getReportById(id: string): Promise<IncidentReport | undefined> {
  const reports = await listReports();
  return reports.find((report) => report.id === id);
}

/** Removes every stored report. */
export async function clearReports(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
