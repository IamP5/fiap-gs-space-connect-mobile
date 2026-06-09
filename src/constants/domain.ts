/** Human-readable labels and visual mappings for domain enums. */

import { Colors } from '@/constants/theme';
import type { Scheme } from '@/contexts/theme-context';
import type { IncidentType, RoverStatus, Severity, TaskStatus } from '@/types/domain';

type SignalSet = {
  signalOk: string;
  signalWarn: string;
  signalDown: string;
  signalIdle: string;
};

export const RoverStatusLabel: Record<RoverStatus, string> = {
  ACTIVE: 'Ativo',
  IDLE: 'Ocioso',
  OFFLINE: 'Offline',
};

/** Telemetry signal per rover status (drives the status LED), per scheme. */
function roverStatusColors(c: SignalSet): Record<RoverStatus, string> {
  return { ACTIVE: c.signalOk, IDLE: c.signalWarn, OFFLINE: c.signalDown };
}
export const RoverStatusColorByScheme: Record<Scheme, Record<RoverStatus, string>> = {
  dark: roverStatusColors(Colors.dark),
  light: roverStatusColors(Colors.light),
};

export const TaskStatusLabel: Record<TaskStatus, string> = {
  UNCLAIMED: 'Sem dono',
  LEASED: 'Em execução',
  DONE: 'Concluída',
};

export const IncidentTypeLabel: Record<IncidentType, string> = {
  HEARTBEAT_PERDIDO: 'Heartbeat perdido',
  BATERIA_CRITICA: 'Bateria crítica',
  FALHA_ATUADOR: 'Falha de atuador',
  SENSOR_OFFLINE: 'Sensor offline',
  OBSTACULO: 'Obstáculo / colisão',
};

/** Order matters: drives the picker on the report form. */
export const INCIDENT_TYPES: IncidentType[] = [
  'HEARTBEAT_PERDIDO',
  'BATERIA_CRITICA',
  'FALHA_ATUADOR',
  'SENSOR_OFFLINE',
  'OBSTACULO',
];

export const SeverityLabel: Record<Severity, string> = {
  BAIXA: 'Baixa',
  MEDIA: 'Média',
  ALTA: 'Alta',
  CRITICA: 'Crítica',
};

// ALTA gets a dedicated amber→red transition step (between warn and down),
// tuned per scheme for contrast.
function severityColors(c: SignalSet, alta: string): Record<Severity, string> {
  return { BAIXA: c.signalIdle, MEDIA: c.signalWarn, ALTA: alta, CRITICA: c.signalDown };
}
export const SeverityColorByScheme: Record<Scheme, Record<Severity, string>> = {
  dark: severityColors(Colors.dark, '#E0701A'),
  light: severityColors(Colors.light, '#C2410C'),
};

/** Order matters: drives the severity selector on the report form. */
export const SEVERITIES: Severity[] = ['BAIXA', 'MEDIA', 'ALTA', 'CRITICA'];
