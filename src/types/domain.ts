/**
 * Domain types for the SwarmBuild Earth companion.
 *
 * SwarmBuild coordinates autonomous rovers building a lunar habitat dome. When a
 * rover fails, the worksite self-heals: its lease expires and the task is
 * re-auctioned to a healthy rover. This app is the Earth-side companion an
 * operator uses to inspect the worksite and report rover occurrences.
 *
 * Vocabulary follows the project's domain language (see gs-fiap-space/CONTEXT.md).
 */

/** Lifecycle of a rover as seen from Earth telemetry. */
export type RoverStatus = 'ACTIVE' | 'IDLE' | 'OFFLINE';

/** Lifecycle of a construction task. */
export type TaskStatus = 'UNCLAIMED' | 'LEASED' | 'DONE';

/** A single autonomous construction robot. */
export interface Rover {
  id: string;
  name: string;
  status: RoverStatus;
  /** Remaining battery, 0-100. */
  battery: number;
  /** Capability profile that defines what this rover can build. */
  capability: string;
  /** Id of the task this rover currently holds a lease on, if any. */
  currentTaskId: string | null;
}

/** An atomic unit of construction awarded to a rover via auction. */
export interface Task {
  id: string;
  /** Human label, e.g. "Parede norte — segmento 3". */
  label: string;
  status: TaskStatus;
  /** Rover currently holding the lease, if LEASED. */
  assignedRoverId: string | null;
}

/** Severity of a reported occurrence. */
export type Severity = 'BAIXA' | 'MEDIA' | 'ALTA' | 'CRITICA';

/** Type of occurrence an operator can report from Earth. */
export type IncidentType =
  | 'HEARTBEAT_PERDIDO'
  | 'BATERIA_CRITICA'
  | 'FALHA_ATUADOR'
  | 'SENSOR_OFFLINE'
  | 'OBSTACULO';

/** GPS coordinates of the ground station that filed the report. */
export interface GeoPoint {
  latitude: number;
  longitude: number;
}

/**
 * An occurrence reported by an operator. Persisted locally (AsyncStorage).
 * Reporting an occurrence on a rover that holds a lease triggers the self-heal
 * narrative shown on the confirmation screen.
 */
export interface IncidentReport {
  id: string;
  roverId: string;
  roverName: string;
  type: IncidentType;
  severity: Severity;
  description: string;
  /** Ground-station location captured via GPS, or null if unavailable. */
  location: GeoPoint | null;
  /** ISO timestamp of when the report was filed. */
  createdAt: string;
}
