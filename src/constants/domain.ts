/** Human-readable labels and visual mappings for domain enums. */

import type { IncidentType, RoverStatus, Severity, TaskStatus } from '@/types/domain';

export const RoverStatusLabel: Record<RoverStatus, string> = {
  ACTIVE: 'Ativo',
  IDLE: 'Ocioso',
  OFFLINE: 'Offline',
};

/** Accent color per rover status (used by the status badge). */
export const RoverStatusColor: Record<RoverStatus, string> = {
  ACTIVE: '#2e9e5b',
  IDLE: '#c98a16',
  OFFLINE: '#d1453b',
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

export const SeverityColor: Record<Severity, string> = {
  BAIXA: '#2e9e5b',
  MEDIA: '#c98a16',
  ALTA: '#e0701a',
  CRITICA: '#d1453b',
};

/** Order matters: drives the severity selector on the report form. */
export const SEVERITIES: Severity[] = ['BAIXA', 'MEDIA', 'ALTA', 'CRITICA'];
