/**
 * Motion tokens — the semantic-beat system (DESIGN.md), ported from the
 * SwarmBuild 3D scene's choreography. Every beat has a fixed lifetime and a
 * meaning: nothing eases just to look alive. Smooth, clear, purposeful.
 *
 * Built on react-native-reanimated (with react-native-worklets). Honour
 * reduced motion at the call site via `AccessibilityInfo.isReduceMotionEnabled`.
 */

import { Easing } from 'react-native-reanimated';

/** Easing curves. `enter` is the 3D scene's ease-out "snap" — the default in. */
export const Easings = {
  enter: Easing.bezier(0.22, 1, 0.36, 1), // panels / cards / screens appearing
  standard: Easing.bezier(0.4, 0, 0.2, 1), // property changes (colour, width)
  exit: Easing.bezier(0.4, 0, 1, 1), // dismissals (fast out)
} as const;

/** Spring configs for press, toggles, and large surfaces. */
export const Springs = {
  soft: { damping: 20, stiffness: 180, mass: 1 }, // sheets, large surfaces
  snappy: { damping: 16, stiffness: 260, mass: 1 }, // chips, toggles, press
} as const;

/** Duration scale (ms) — ported from the 3D beat lifetimes. */
export const Durations = {
  instant: 120,
  fast: 180,
  base: 240,
  slow: 360,
  beat: 600, // status pop / task-complete (solidify beat)
  heal: 1100, // the self-heal signature beat
} as const;

/** Named semantic beats — each fires because the system did something. */
export const Beats = {
  press: { scale: 0.97, duration: Durations.instant },
  screenIn: { duration: Durations.slow, lift: 12 },
  listStagger: { duration: Durations.base, stagger: 40, lift: 8 },
  statusChange: { duration: Durations.beat },
  taskComplete: { duration: Durations.beat },
  selfHeal: { duration: Durations.heal, ringScale: 2.8 }, // ★ the signature
  notifyArrive: { duration: Durations.slow },
  counter: { duration: Durations.slow },
  gradientDrift: { duration: 12000 }, // ambient aurora breathe (0.6 Hz)
} as const;
