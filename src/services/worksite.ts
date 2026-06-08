/**
 * Worksite data service.
 *
 * Provides the simulated worksite state — the rover roster and the blueprint
 * tasks — that the app reads ("consultar dados"). In a real deployment this
 * would come from the Coordinator over the gateway WebSocket; here it is seeded
 * static data so the app is fully demonstrable offline.
 */

import type { Rover, Task } from '@/types/domain';

const ROVERS: Rover[] = [
  {
    id: 'rover-01',
    name: 'Atlas',
    status: 'ACTIVE',
    battery: 82,
    capability: 'lunar-estrutura',
    currentTaskId: 'task-wall-n3',
  },
  {
    id: 'rover-02',
    name: 'Bórea',
    status: 'ACTIVE',
    battery: 64,
    capability: 'lunar-estrutura',
    currentTaskId: 'task-wall-s1',
  },
  {
    id: 'rover-03',
    name: 'Ceres',
    status: 'IDLE',
    battery: 91,
    capability: 'lunar-selagem',
    currentTaskId: null,
  },
  {
    id: 'rover-04',
    name: 'Dione',
    status: 'ACTIVE',
    battery: 47,
    capability: 'lunar-estrutura',
    currentTaskId: 'task-dome-cap',
  },
  {
    id: 'rover-05',
    name: 'Erebo',
    status: 'OFFLINE',
    battery: 12,
    capability: 'lunar-selagem',
    currentTaskId: null,
  },
  {
    id: 'rover-06',
    name: 'Febo',
    status: 'IDLE',
    battery: 73,
    capability: 'lunar-estrutura',
    currentTaskId: null,
  },
];

const TASKS: Task[] = [
  { id: 'task-foundation', label: 'Fundação — anel base', status: 'DONE', assignedRoverId: null },
  { id: 'task-wall-n3', label: 'Parede norte — segmento 3', status: 'LEASED', assignedRoverId: 'rover-01' },
  { id: 'task-wall-s1', label: 'Parede sul — segmento 1', status: 'LEASED', assignedRoverId: 'rover-02' },
  { id: 'task-dome-cap', label: 'Fechamento da cúpula', status: 'LEASED', assignedRoverId: 'rover-04' },
  { id: 'task-airlock', label: 'Câmara de descompressão', status: 'UNCLAIMED', assignedRoverId: null },
  { id: 'task-seal-w2', label: 'Selagem — painel oeste 2', status: 'UNCLAIMED', assignedRoverId: null },
];

/** Returns the full rover roster. */
export function getRovers(): Rover[] {
  return ROVERS;
}

/** Returns a single rover by id, or undefined if not found. */
export function getRoverById(id: string): Rover | undefined {
  return ROVERS.find((rover) => rover.id === id);
}

/** Returns all blueprint tasks. */
export function getTasks(): Task[] {
  return TASKS;
}

/** Returns the task a rover currently holds a lease on, or undefined. */
export function getTaskForRover(rover: Rover): Task | undefined {
  if (!rover.currentTaskId) return undefined;
  return TASKS.find((task) => task.id === rover.currentTaskId);
}

/** Percentage of blueprint tasks completed (0-100), for the mission overview. */
export function getDomeProgress(): number {
  const done = TASKS.filter((task) => task.status === 'DONE').length;
  return Math.round((done / TASKS.length) * 100);
}

/** The coordinator's self-heal response when an occurrence is filed on a rover. */
export type SelfHealResponse = {
  /** One-liner for notifications and banners. */
  headline: string;
  /** Full explanation for the confirmation screen. */
  detail: string;
};

/**
 * Builds the coordinator's response to an occurrence reported on `roverId`. If
 * the rover holds a task lease, the lease expires and the task is re-auctioned
 * to a healthy rover — the worksite self-heals without intervention from Earth.
 */
export function getSelfHealResponse(roverId: string): SelfHealResponse {
  const rover = getRoverById(roverId);
  const task = rover ? getTaskForRover(rover) : undefined;
  if (rover && task && task.status === 'LEASED') {
    const healthy = pickHealthyRover(rover.id);
    return {
      headline: `Lease de "${task.label}" expirado — reauctioná-da para ${healthy?.name ?? 'um rover saudável'}.`,
      detail: `O coordenador registrou a ocorrência. O lease da tarefa "${task.label}" irá expirar por silêncio de heartbeat e ela será reauctioná-da para ${healthy?.name ?? 'um rover saudável'}. O canteiro se auto-recupera — sem intervenção da Terra.`,
    };
  }
  return {
    headline: 'Ocorrência registrada — nenhuma reauction necessária.',
    detail:
      'O coordenador registrou a ocorrência. Como o rover não detém uma tarefa ativa, nenhuma reauction é necessária; a equipe de operações foi notificada.',
  };
}

/**
 * A simulated swarm event for the operations monitor demo: a rover loses its
 * heartbeat and the task it held is re-auctioned to a healthy rover.
 */
export function getSimulatedSwarmEvent(): { title: string; body: string } {
  const leased = TASKS.filter((task) => task.status === 'LEASED' && task.assignedRoverId);
  const task = leased[Math.floor(Math.random() * leased.length)] ?? leased[0];
  const failing = task ? getRoverById(task.assignedRoverId!) : undefined;
  const healthy = pickHealthyRover(failing?.id);
  if (!task || !failing) {
    return {
      title: '✅ Canteiro estável',
      body: 'Nenhuma falha ativa no enxame. Todos os rovers reportando heartbeat.',
    };
  }
  return {
    title: '⚠️ Falha de rover detectada',
    body: `${failing.name} perdeu heartbeat — "${task.label}" reauctioná-da para ${healthy?.name ?? 'um rover saudável'}. Canteiro auto-recuperado.`,
  };
}

/** Picks a healthy rover (not OFFLINE, not the failing one) to take over a task. */
function pickHealthyRover(excludeId?: string): Rover | undefined {
  return ROVERS.find((rover) => rover.status !== 'OFFLINE' && rover.id !== excludeId);
}
