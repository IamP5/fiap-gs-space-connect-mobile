/**
 * SwarmBuild Ops design tokens — the "mission-control panel" language (DESIGN.md).
 *
 * A black instrument panel: layered glass HUD plates over a void, white data, a
 * single cyan "live / self-heal" accent, four functional telemetry signals, and
 * one atmospheric aurora gradient. Depth is bevel + glow, never a dark shadow.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  // ── Daylight mission console — the same instrument language, inverted for a
  // light canvas: soft-grey page, white HUD plates separated by a hairline + a
  // gentle neutral shadow (glow doesn't read on light), accent and signals
  // darkened to hold AA contrast against white. ──
  light: {
    text: '#0A0C10', // ink — primary text / readouts
    background: '#F5F6F8', // canvas — soft grey so white plates separate
    backgroundElement: '#FFFFFF', // panel — white HUD plate (universal card)
    backgroundSelected: '#0C9A8C', // accent — selected chip fill
    textSecondary: '#5A6573', // ink-mute
    tint: '#0C9A8C', // accent — loaders / live affordances
    border: '#E3E5EA', // panel-edge
    // ── surfaces ──
    canvasDeep: '#FFFFFF',
    canvasSoft: '#EDEFF2', // input fills — slightly recessed
    panel: '#FFFFFF',
    panelElevated: '#FFFFFF',
    panelEdge: '#E3E5EA',
    hairline: '#ECEEF1',
    hairlineStrong: '#D4D7DD',
    // ── ink ──
    inkSoft: '#39404A',
    inkMute: '#5A6573',
    inkFaint: '#98A0AB',
    onAccent: '#042420', // near-black text on the teal accent fill (AA)
    // ── accent: teal, dark enough to pass AA as a fill (with onAccent)
    //    and ≥3:1 as a UI border on white ──
    accent: '#0C9A8C',
    accentStrong: '#0A8275',
    accentWash: 'rgba(12,154,140,0.14)',
    // ── telemetry signals ──
    // OK reads as neutral ink (near-black) so "all-clear / active" stays quiet
    // and only true exceptions (warn/down) carry colour — minimal by design.
    signalOk: '#0A0C10',
    signalWarn: '#B7791F',
    signalDown: '#D1453B',
    signalIdle: '#6B7280',
  },
  // ── Mission-ops black canvas (DESIGN.md) ────────────────────────────────────
  dark: {
    text: '#FFFFFF', // ink — primary text / readouts
    background: '#0B0F15', // canvas-void — deep charcoal (lifted off pure black)
    backgroundElement: '#171E29', // panel — the HUD glass plate (universal card)
    backgroundSelected: '#2DD4C6', // accent — selected chip fill
    textSecondary: '#8A8A94', // ink-mute — tertiary text / placeholders
    tint: '#2DD4C6', // accent — loaders / live affordances
    border: '#2D3543', // panel-edge — the 1px bevel border on plates
    // ── surfaces: a charcoal plate ladder, separated enough to read as glass ──
    canvasDeep: '#0F141C', // scrollable body background
    canvasSoft: '#161D27', // first raised surface / input fills
    panel: '#171E29', // HUD glass plate
    panelElevated: '#1E2632', // modals / bottom sheets
    panelEdge: '#2D3543', // plate bevel border
    hairline: '#242C37', // default divider
    hairlineStrong: '#3A4350', // stronger row separator
    // ── ink ──
    inkSoft: '#C7CBD2', // secondary text / body leads
    inkMute: '#8A8A94', // tertiary text / placeholders / idle labels
    inkFaint: '#5A5F6A', // disabled / fine print
    onAccent: '#04211E', // near-black text on teal fills (AA contrast)
    // ── accent: the single brand colour — "live energy" / self-heal (teal) ──
    accent: '#2DD4C6', // LIVE · selected · self-heal pulse (teal-cyan)
    accentStrong: '#25BCB0', // pressed / HUD-accent variant
    accentWash: 'rgba(45,212,198,0.14)', // translucent fill for armed/active surfaces
    // ── telemetry signals (functional — encode state, never decoration) ──
    // OK reads as neutral white ink so "all-clear / active" stays quiet and only
    // true exceptions (warn/down) carry colour — minimal by design.
    signalOk: '#FFFFFF', // healthy · active · done (neutral white)
    signalWarn: '#F5A623', // leased · draining · caution
    signalDown: '#E74C3C', // dead · critical · orphaned
    signalIdle: '#9AA4B2', // idle · unclaimed · passive
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

/** The "Self-Heal Aurora" mesh gradient stops (hero scale only, one object). */
export const Gradient = {
  a: '#2DD4C6', // teal — self-heal energy
  b: '#3F6FE0', // softened electric blue
  c: '#7C3AED', // deep violet — deep space
  d: '#F5A623', // amber edge — warning warmth
} as const;

/**
 * Corner radii (DESIGN.md). Panels/cards default to `md` (8); inputs/nav use
 * `sm` (6); pill for CTAs, chips, and status capsules.
 */
export const Radius = {
  xs: 4, // badges, validity ticks
  sm: 6, // inputs, nav-scale buttons
  md: 8, // HUD panels, list cards (default)
  lg: 12, // large panels, sheets
  xl: 16, // hero / image-capped panels
  pill: 999, // CTAs, chips, status capsules
} as const;

/**
 * Cyan glow presets — the only "elevation colour". Glow means live/selected/
 * healing, never decoration. Expressed as CSS `boxShadow` (the modern RN shadow
 * API) rather than the legacy shadow/elevation props. Spread into a style object.
 */
export const Glow = {
  /** Primary CTA glow. */
  accent: { boxShadow: '0 0 20px rgba(45, 212, 198, 0.32)' },
  /** Armed / live surface glow. */
  armed: { boxShadow: '0 0 16px rgba(45, 212, 198, 0.28)' },
} as const;

/** Inset top-highlight that makes a plate read as a physical HUD panel. */
export const PanelBevel = 'rgba(255,255,255,0.06)';

/**
 * Ambient plate elevation per scheme (DESIGN.md "Raised" level). On the dark
 * void it's a deep black ambient shadow; on the light canvas a soft neutral
 * shadow lifts white plates off the grey page (where cyan glow can't read).
 * CSS `boxShadow` syntax: offset-x offset-y blur color.
 */
export const Elevation = {
  light: { boxShadow: '0 2px 10px rgba(10, 12, 16, 0.07)' },
  dark: { boxShadow: '0 6px 18px rgba(0, 0, 0, 0.55)' },
} as const;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    /** The technical / telemetry voice — iOS SF Mono. */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
