---
version: "1.0"
name: SwarmBuild-Ops-mission-control
description: >-
  The mission-control design language for the SwarmBuild Ops mobile companion — a
  NASA-grade operations panel for a lunar-construction rover swarm that self-heals
  on rover failure. It merges three lineages: the austere deep-space canvas and
  condensed uppercase display type of the SwarmBuild 3D world (Spasex lineage), the
  signature mesh gradient + mono-for-technical voice + calm negative-tracked body +
  stacked/inset elevation of the Vercel system, and the live telemetry palette,
  glass HUD panels and choreographed motion beats of the SwarmBuild 3D scene. The
  result is a black instrument panel: layered glass plates over a void, white data,
  a single cyan "live/self-heal" accent, functional status signals, one atmospheric
  aurora gradient, and motion where every beat carries meaning.

colors:
  # ── Canvas: deep-space void + layered instrument plates ──────────────────────
  primary: "#0B0F15"            # the conversion ink / deep charcoal canvas
  canvas-void: "#0B0F15"        # mission background — deep charcoal (lifted off pure black)
  canvas-deep: "#0F141C"        # near-black scrollable body
  canvas-soft: "#161D27"        # first raised surface
  panel: "#171E29"              # HUD glass plate (from the 3D scene)
  panel-elevated: "#1E2632"     # modal / sheet plate
  panel-edge: "#2D3543"         # panel bevel border (from the 3D scene)
  hairline: "#242C37"           # default 1px divider
  hairline-strong: "#3A4350"    # stronger divider / row separator
  # ── Ink ──────────────────────────────────────────────────────────────────────
  ink: "#FFFFFF"                # primary text on dark
  ink-soft: "#C7CBD2"           # secondary text
  ink-mute: "#8A8A94"           # tertiary text / placeholders
  ink-faint: "#5A5F6A"          # disabled / fine print
  on-accent: "#04211E"          # text/icon on teal accent (near-black for AA contrast)
  # ── Telemetry signals (functional — encode rover/task state, mission-control) ─
  signal-ok: "neutral-ink"      # healthy · active · done — neutral ink (white on dark / near-black on light), not green
  signal-warn: "#F5A623"        # leased · draining · caution (amber)
  signal-down: "#E74C3C"        # dead · critical · orphaned (red)
  signal-idle: "#9AA4B2"        # idle · unclaimed · passive (grey-blue)
  # ── Accent: the single brand colour — "live energy" / self-heal ───────────────
  accent: "#2DD4C6"             # LIVE · selected · self-heal pulse (teal-cyan)
  accent-strong: "#25BCB0"      # pressed / HUD-accent variant
  accent-wash: "rgba(45,212,198,0.14)"  # translucent fill for armed/active surfaces
  # ── Brand gradient: "Self-Heal Aurora" (Vercel mesh, recoloured to telemetry) ─
  gradient-a: "#2DD4C6"         # teal (self-heal energy)
  gradient-b: "#3F6FE0"         # softened electric blue
  gradient-c: "#7C3AED"         # deep violet (deep-space)
  gradient-d: "#F5A623"         # amber edge (warning warmth)

typography:
  # Display — uppercase, condensed, engineered (SwarmBuild 3D / Spasex voice)
  display-xl:
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: 40px
    fontWeight: 800
    lineHeight: 40px
    letterSpacing: 0.8px
    case: uppercase
  display-lg:
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: 28px
    fontWeight: 800
    lineHeight: 30px
    letterSpacing: 0.6px
    case: uppercase
  # Readout — big telemetry numerics (tabular figures, neutral tracking)
  readout:
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: 32px
    fontWeight: 800
    lineHeight: 34px
    letterSpacing: 0px
    fontVariantNumeric: tabular-nums
  # Body — sentence-case, calm, slightly negative tracking (Vercel voice)
  body-lg:
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: 17px
    fontWeight: 400
    lineHeight: 26px
    letterSpacing: 0px
  body-md:
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 22px
    letterSpacing: 0.1px
  body-strong:
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: 15px
    fontWeight: 600
    lineHeight: 22px
    letterSpacing: 0.1px
  # Telemetry / technical — MONO, the instrument-label voice (Vercel mono × NASA caps)
  label-mono:
    fontFamily: "Geist Mono, JetBrains Mono, ui-monospace, monospace"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 16px
    letterSpacing: 1.4px
    case: uppercase
  data-mono:
    fontFamily: "Geist Mono, JetBrains Mono, ui-monospace, monospace"
    fontSize: 13px
    fontWeight: 500
    lineHeight: 18px
    letterSpacing: 0.4px
  # Controls & captions
  button-cap:
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: 13px
    fontWeight: 700
    lineHeight: 16px
    letterSpacing: 1.2px
    case: uppercase
  caption:
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16px
    letterSpacing: 0px

rounded:
  xs: 4px      # tight data chrome (badges, ticks)
  sm: 6px      # inputs, nav-scale buttons
  md: 8px      # HUD panels, list cards
  lg: 12px     # large panels, sheets
  xl: 16px     # hero / image-cap panels
  pill: 999px  # CTAs, chips, status capsules

spacing:
  # 4px base ladder (Vercel --geist-space)
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  huge: 64px

motion:
  # Easing — the 3D scene's ease-out "snap" is the primary enter curve.
  easing:
    enter: "cubic-bezier(0.22, 1, 0.36, 1)"   # ease-out snap — panels/cards in
    standard: "cubic-bezier(0.4, 0, 0.2, 1)"   # general property changes
    exit: "cubic-bezier(0.4, 0, 1, 1)"         # leave / dismiss
    spring-soft: { damping: 20, stiffness: 180, mass: 1 }   # sheets, large surfaces
    spring-snappy: { damping: 16, stiffness: 260, mass: 1 } # chips, toggles, press
  # Duration scale — ported from the 3D choreography beat lifetimes.
  duration:
    instant: 120
    fast: 180
    base: 240
    slow: 360
    beat: 600      # status pop / task-complete (solidify beat)
    heal: 1100     # the self-heal signature beat
  # Named semantic beats (each has meaning — never decorative).
  beats:
    press: { duration: 120, easing: spring-snappy }   # scale 0.97 + accent glow
    status-change: { duration: 600, easing: enter }   # LED cross-fade + half-sine pulse
    self-heal: { duration: 1100, easing: enter }      # expanding cyan ring + emissive flash
    task-complete: { duration: 600, easing: enter }   # green solidify pop (scale 1+sin·0.2)
    screen-in: { duration: 360, easing: enter }       # fade-through / shared-axis
    list-stagger: { duration: 240, stagger: 40, easing: enter }
    notify-arrive: { duration: 360, easing: enter }   # slide-down + cyan glow
    gradient-drift: { duration: 12000, easing: standard, loop: true } # ambient aurora breathe

components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.button-cap}"
    rounded: "{rounded.pill}"
    padding: 16px 24px
    glow: "0 0 20px rgba(45,212,198,0.32)"
  button-ghost:
    backgroundColor: transparent
    border: "1px solid {colors.ink}"
    textColor: "{colors.ink}"
    typography: "{typography.button-cap}"
    rounded: "{rounded.pill}"
    padding: 16px 24px
  button-quiet:
    backgroundColor: transparent
    border: "1px solid {colors.hairline-strong}"
    textColor: "{colors.ink-mute}"
    typography: "{typography.button-cap}"
    rounded: "{rounded.pill}"
    padding: 16px 24px
  panel-hud:
    backgroundColor: "{colors.panel}"
    border: "1px solid {colors.panel-edge}"
    bevel: "inset 0 1px 0 rgba(255,255,255,0.06)"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: 16px
  panel-armed:
    backgroundColor: "{colors.accent-wash}"
    border: "1px solid {colors.accent}"
    glow: "0 0 16px rgba(45,212,198,0.28)"
    rounded: "{rounded.md}"
    padding: 16px
  readout-tile:
    backgroundColor: "{colors.panel}"
    border: "1px solid {colors.panel-edge}"
    valueTypography: "{typography.readout}"
    labelTypography: "{typography.label-mono}"
    rounded: "{rounded.md}"
    padding: 16px
  status-led:
    dot: "8px circle, fill = signal token"
    labelTypography: "{typography.label-mono}"
    labelColor: "matches signal token"
    layout: "dot + label, no fill"
  chip-select:
    selectedBackground: "{colors.accent}"
    selectedText: "{colors.on-accent}"
    idleBackground: transparent
    idleBorder: "1px solid {colors.panel-edge}"
    idleText: "{colors.ink-mute}"
    typography: "{typography.label-mono}"
    rounded: "{rounded.pill}"
    padding: 8px 14px
  text-input:
    backgroundColor: "{colors.canvas-soft}"
    border: "1px solid {colors.panel-edge}"
    focusBorder: "1px solid {colors.accent}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 12px 16px
  nav-bar:
    backgroundColor: "{colors.canvas-void}"
    titleTypography: "{typography.display-lg}"
    border-bottom: "1px solid {colors.hairline}"
  aurora-hero:
    backgroundColor: "{colors.canvas-void}"
    gradient: "{colors.gradient-a} → {colors.gradient-b} → {colors.gradient-c} → {colors.gradient-d}"
    note: "atmospheric backdrop, hero scale only, slow drift"
---

## Overview

SwarmBuild Ops is a **mission-control panel**, not a marketing page. The operator on
Earth watches an autonomous rover swarm raise a lunar habitat dome and **self-heal**
when a rover dies — its task lease expires and is re-auctioned to a healthy rover. The
design language has to read like an instrument: legible data over a void, signals that
mean something, and motion that narrates events rather than decorates them.

Three lineages merge here:

- **The SwarmBuild 3D world** (the deep-space scene) gives the bones: pure-black void,
  condensed uppercase display type, a functional telemetry palette (green/amber/red +
  a cyan self-heal pulse), glass HUD plates with beveled edges, and a fully
  choreographed motion system where each beat has a fixed lifetime and meaning.
- **The Vercel system** gives the modern polish: the **mesh gradient** as the one
  signature decoration, the **mono-for-technical** voice, **calm sentence-case body**
  type with slightly negative tracking, **stacked + inset elevation** (translated to
  glow on a dark canvas), a strict 4px spacing ladder, and the **pill CTA**.
- **The austere Spasex lineage** (the current spec) keeps the discipline: a single
  canvas, no decorative noise, type and signal doing all the work.

The synthesis is a **black glass instrument panel**. Surfaces are layered dark plates
(`{colors.panel}` over `{colors.canvas-void}`) edged with a hairline bevel. The only
brand colour is **cyan `{colors.accent}`** — the colour of "live", of selection, and of
the self-heal pulse. Status is carried by four functional **signal** tokens. One
**aurora mesh gradient** breathes behind hero and empty states. Everything else is
white data on black.

**Key Characteristics:**
- Black void canvas with layered glass HUD plates; depth is **bevel + glow**, never a
  heavy material drop-shadow.
- A single cyan accent (`{colors.accent}`) for live/selected/self-heal — paired with
  four functional telemetry signals. No sixth accent.
- One **Self-Heal Aurora** mesh gradient (cyan → blue → violet → amber) as atmospheric
  decoration, hero scale only, slowly drifting — never miniaturised to an icon.
- Three typographic voices by role: **uppercase condensed display**, **mono-caps
  telemetry labels**, **calm sentence-case body**.
- **Motion is semantic**: a status change pulses, a task completes with a green pop, a
  rover heals with an expanding cyan ring (1100 ms) — the signature animation.
- Status reads as **LED indicators** (signal dot + mono-caps label), like a mission console.

## Colors

### Brand & Accent
The system has exactly **one** brand colour and four functional signals.

- **Accent / Cyan** (`{colors.accent}` — `#38E1FF`): "Live energy." Carries selection,
  the primary CTA fill, focus rings, progress fills, and — above all — the **self-heal
  pulse**. This is the cyan the 3D scene flashes when a dead rover comes back online.
  `{colors.accent-strong}` (`#3FD0E6`) is the pressed/HUD variant; `{colors.accent-wash}`
  is the translucent fill for armed/active surfaces (built with `color-mix`/rgba, never
  a solid tint).

### Telemetry Signals
Functional only — they **encode state**, they are not decoration. Rendered as LED dots
and hairline-outlined capsules, never as filled blocks.
- **OK** (`{colors.signal-ok}` — neutral ink, white on dark / near-black on light): healthy ·
  active · task done. Deliberately *not* a colour — the "all-clear" state stays quiet so only
  warn/down/idle carry hue. Minimal by design.
- **Warn** (`{colors.signal-warn}` — `#F5A623`): leased · lease draining · caution.
- **Down** (`{colors.signal-down}` — `#E74C3C`): dead · critical · orphaned.
- **Idle** (`{colors.signal-idle}` — `#9AA4B2`): idle · unclaimed · passive.

### Surface
A four-step plate ladder over the void (the Vercel surface ladder, darkened).
- **Void** (`{colors.canvas-void}` — `#000000`): the mission canvas. Full-bleed.
- **Deep** (`{colors.canvas-deep}` — `#08090C`): scrollable body background.
- **Soft** (`{colors.canvas-soft}` — `#0B0B0D`): first raised surface, input fills.
- **Panel** (`{colors.panel}` — `#0D0F14`): the HUD glass plate — the universal "card".
- **Panel Elevated** (`{colors.panel-elevated}` — `#12151C`): modals, bottom sheets.
- **Panel Edge** (`{colors.panel-edge}` — `#2B313C`): the 1px bevel border on plates.
- **Hairline / Hairline Strong** (`#26262B` / `#3A3A3F`): dividers and row separators.

### Text
- **Ink** (`{colors.ink}` — `#FFFFFF`): primary text and readouts.
- **Ink Soft** (`{colors.ink-soft}` — `#C7CBD2`): secondary text, body leads.
- **Ink Mute** (`{colors.ink-mute}` — `#8A8A94`): tertiary text, placeholders, idle labels.
- **Ink Faint** (`{colors.ink-faint}` — `#5A5F6A`): disabled, fine print.
- **On Accent** (`{colors.on-accent}` — `#021016`): near-black text on cyan fills (AA).

### Brand Gradient — "Self-Heal Aurora"
The one decorative object, inherited from Vercel's mesh and recoloured to the swarm's
telemetry energy: **cyan → electric blue → deep violet → amber**
(`{colors.gradient-a}` → `b` → `c` → `d`). It reads as the energy that re-knits the
swarm when it self-heals. Rules (from Vercel, non-negotiable):
- Hero scale only — behind the home hero, empty states, and the self-heal confirmation.
- Treat as **one object**: never reorder stops, never crop to a single colour, never
  shrink to an icon or swatch.
- It **drifts** slowly (`{motion.beats.gradient-drift}`) — a 0.6 Hz atmospheric breathe,
  never a hard animation.
- Always behind glass: type and panels sit on opaque/`{colors.panel}` plates above it,
  never directly on the brightest part of the gradient.

## Typography

### Font Families
Two families, mirroring Vercel's geometric-sans + mono split, tuned to the SwarmBuild
voice.

1. **Geometric sans** (`Geist`; substitute **Inter** 400/500/600/800, enabling
   `ss01`/`ss02` alternates) — carries display, readouts, body, buttons.
2. **Monospace** (`Geist Mono`; substitute **JetBrains Mono** 500/600 at 12–13 px) —
   the **technical voice**: telemetry labels, rover IDs, statuses, timestamps,
   section eyebrows, data values.

> On Expo/React Native the system stack resolves first: `system-ui` for sans and
> `ui-monospace` (iOS SF Mono / Android monospace) for mono are acceptable zero-asset
> fallbacks. Load Geist/Inter + a mono via `expo-font` only when brand fidelity matters.

### Three Voices by Role
This is the heart of the merge — each lineage owns one voice:

| Voice | Family | Case | Tracking | Use | From |
|---|---|---|---|---|---|
| **Display** | sans 800 | UPPERCASE | +0.6–0.8 | screen titles, call-signs | SwarmBuild 3D / Spasex |
| **Telemetry** | **mono** 500–600 | UPPERCASE | +0.4–1.4 | labels, IDs, status, eyebrows | Vercel mono × NASA caps |
| **Body** | sans 400/500 | sentence | 0–0.1 | paragraphs, helper copy | Vercel calm |

### Hierarchy

| Token | Size | Weight | Line | Tracking | Case | Use |
|---|---|---|---|---|---|---|
| `{typography.display-xl}` | 40 | 800 | 40 | 0.8 | upper | Screen hero title |
| `{typography.display-lg}` | 28 | 800 | 30 | 0.6 | upper | Section opener, rover call-sign |
| `{typography.readout}` | 32 | 800 | 34 | 0 | — | Big telemetry numeric (tabular) |
| `{typography.body-lg}` | 17 | 400 | 26 | 0 | sentence | Lead paragraph |
| `{typography.body-md}` | 15 | 400 | 22 | 0.1 | sentence | Default body |
| `{typography.body-strong}` | 15 | 600 | 22 | 0.1 | sentence | Emphasised inline |
| `{typography.label-mono}` | 12 | 600 | 16 | 1.4 | upper | Eyebrow / section label / status |
| `{typography.data-mono}` | 13 | 500 | 18 | 0.4 | — | Rover ID, coords, timestamp |
| `{typography.button-cap}` | 13 | 700 | 16 | 1.2 | upper | Pill button label |
| `{typography.caption}` | 12 | 400 | 16 | 0 | sentence | Helper / fine print |

### Principles
- **Mono is the machine voice.** Anything the system reports — IDs, statuses, counts,
  timestamps, section eyebrows — is mono-caps. Anything a human reads as prose is sans
  sentence-case. Never blur the two.
- **Display stays uppercase + condensed.** Screen titles and call-signs read as engineered
  (the established SwarmBuild voice). Weight ceiling is 800.
- **Body stays calm.** Sentence-case, neutral tracking — Vercel's readability. Never
  uppercase a paragraph, never letter-space body positively.
- **Tabular numerics for readouts.** Telemetry numbers use tabular figures so counters
  don't jitter as they animate.

## Layout

### Spacing
4px base ladder: `{spacing.xxs}` 4 · `{spacing.xs}` 8 · `{spacing.sm}` 12 ·
`{spacing.md}` 16 · `{spacing.lg}` 24 · `{spacing.xl}` 32 · `{spacing.xxl}` 48 ·
`{spacing.huge}` 64. Screen gutters 24 (`lg`); panel interior 16 (`md`); tight interior
stacks 8 (`xs`); generous separation between bands 32–48. The page reads **engineered**:
wide gaps between groups, tight stacks inside a plate.

### Grid & Container
Single-column mobile flow inside a max content width of ~640 (tablet/large-phone safe).
Readout tiles lay out in a **2-up or 3-up row** (the mission-overview metric strip).
Lists are full-width plates separated by `{spacing.xs}`.

### Whitespace Philosophy
The aurora gradient and the void do the decorative work; whitespace is structural.
Negative space here is the **black void between panels** — like the dark sky between
telemetry readouts on a console.

## Elevation & Depth

On a black canvas you cannot drop a dark shadow — so Vercel's stacked-shadow + inset
philosophy is **inverted into bevel + glow**. Depth is light, not shadow.

| Level | Treatment | Use |
|---|---|---|
| 0 — Void | Flat black, no chrome. | Full-bleed hero, behind the aurora. |
| 1 — Plate | `{colors.panel}` fill + 1px `{colors.panel-edge}` + inset top highlight `rgba(255,255,255,0.06)`. | The universal HUD card. |
| 2 — Raised | Plate + a faint outer ambient `0 6px 18px rgba(0,0,0,0.55)`. | Cards over the gradient, list rows. |
| 3 — Armed / Live | Plate + cyan ring `0 0 0 1px {colors.accent}` + glow `0 0 16px rgba(45,212,198,0.28)`. | Selected, focused, "armed", or actively healing surfaces. |
| 4 — Modal | `{colors.panel-elevated}` + inset bevel + `0 24px 48px rgba(0,0,0,0.6)`. | Sheets, dialogs. |

### Decorative Depth
- **Bevel** (inset bright top edge + edge border) makes a plate read as a physical HUD
  panel — the 3D scene's panel treatment.
- **Cyan glow** is the only "elevation colour" — it marks *live/selected/healing*, and
  nothing else. Glow is never used decoratively.
- **The aurora** is the sole atmospheric layer, behind everything, at hero scale.

## Shapes

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 4 | Badges, validity ticks, tight data chrome. |
| `{rounded.sm}` | 6 | Inputs, nav-scale buttons. |
| `{rounded.md}` | 8 | HUD panels, list cards (the default). |
| `{rounded.lg}` | 12 | Large panels, sheets. |
| `{rounded.xl}` | 16 | Hero / image-capped panels. |
| `{rounded.pill}` | 999 | CTAs, chips, status capsules. |

Two CTA scales coexist deliberately (Vercel rule): **pill** for primary actions,
**`sm` 6px** for dense nav/utility buttons. Don't mix scales on one screen.

## Motion & Animation

Motion is **semantic** — ported from the 3D scene's choreography, where every beat has a
fixed lifetime and a meaning. Nothing eases just to look alive; an animation fires
*because the system did something*. Smooth, clear, purposeful.

### Easing
- **Enter** `cubic-bezier(0.22, 1, 0.36, 1)` — the 3D scene's ease-out "snap". The
  default for anything appearing (panels, cards, HUD, screens). In Reanimated:
  `Easing.bezier(0.22, 1, 0.36, 1)`.
- **Standard** `cubic-bezier(0.4, 0, 0.2, 1)` — property changes (colour, width).
- **Exit** `cubic-bezier(0.4, 0, 1, 1)` — dismissals (fast out).
- **Springs** — `spring-soft` (sheets/large surfaces) and `spring-snappy` (chips,
  toggles, press).

### Duration Scale
Ported from the 3D beat lifetimes: `instant` 120 · `fast` 180 · `base` 240 · `slow` 360
· `beat` 600 · `heal` 1100 (ms).

### Semantic Beats

| Beat | Trigger | Animation | Duration |
|---|---|---|---|
| **Press** | Any pressable | Scale → 0.97 + brief accent glow; spring back | 120 |
| **Screen-in** | Navigation | Fade-through / shared-axis slide (12px), `enter` curve | 360 |
| **List-stagger** | List/roster mounts | Items fade + lift (8px), 40 ms stagger | 240 ×n |
| **Status-change** | Rover/task status flips | LED **cross-fades** to new signal colour + one half-sine pulse of the dot | 600 |
| **Task-complete** | Dome block / task done | Green **solidify pop**: scale `1 + sin(t·π)·0.2` + `{colors.signal-ok}` emissive flash that fades | 600 |
| **Self-Heal** ★ | Report filed / rover revives | **Signature**: an expanding **cyan ring** (`scale 1→2.8, opacity 1→0`) under a cyan emissive flash on the affected element | 1100 |
| **Notify-arrive** | Coordinator alert | Banner slides down + cyan glow rim, settles with `enter` | 360 |
| **Counter** | Readout value changes | Count-up to the new value (tabular figures, no layout shift) | 360 |
| **Gradient-drift** | Ambient (hero) | Aurora slowly translates/rotates — 0.6 Hz breathe, looped | 12000 |
| **TTL-drain** | Lease countdown | Progress/ring colour shifts `signal-ok → signal-warn → signal-down` as it drains | continuous |

### The Self-Heal Signature
The one animation users should remember. When an occurrence is filed (or a rover revives),
the confirmation surface plays the **cyan recovery pulse** straight from the 3D scene: a
ring expands outward from the rover/banner (`scale 1 → 2.8`, `opacity 1 → 0`,
`enter` curve, 1100 ms) over a brief cyan emissive flash on the element. It says, wordlessly,
*the swarm just re-knitted itself.* Pair it with the green **task-complete pop** if a
dome block solidifies. Use cyan here and nowhere casually — its scarcity is what makes
the heal beat land.

### Implementation
Use **react-native-reanimated** (already a dependency, with `react-native-worklets`).
- Entrances/exits: `Animated` layout animations or `entering={FadeInDown.duration(360).easing(...)}`.
- Springs/press: `withSpring(...)` with the token configs; `withTiming(v, { easing: Easing.bezier(0.22,1,0.36,1) })`.
- The self-heal ring: an absolutely-positioned `Animated.View` (circle) driving
  `scale` + `opacity` shared values; cyan border, `pointerEvents: none`.
- Counters: animate a shared value, render via `useDerivedValue` + `ReText`/`AnimatedText`.

### Reduced Motion
Honour `AccessibilityInfo.isReduceMotionEnabled` (the 3D scene honours
`prefers-reduced-motion`):
- **Keep**: opacity fades, colour cross-fades, the LED state change.
- **Drop**: positional lift/slide, scale pulses, the expanding ring (cut to a simple
  cyan opacity flash), gradient drift (hold still).

## Components

### Buttons

**`button-primary`** — the cyan CTA. Fill `{colors.accent}`, text `{colors.on-accent}`,
`{typography.button-cap}`, `{rounded.pill}`, padding 16×24, a soft cyan glow
`0 0 20px rgba(45,212,198,0.32)`. The one high-emphasis action per view.

**`button-ghost`** — transparent, 1px `{colors.ink}` border, white uppercase label,
pill. The standard secondary action.

**`button-quiet`** — transparent, 1px `{colors.hairline-strong}` border, muted label,
pill. Tertiary/utility.

Press beat on all: scale 0.97 + glow, spring back.

### Panels & Cards

**`panel-hud`** — the universal card. `{colors.panel}` fill, 1px `{colors.panel-edge}`
border, inset top-highlight bevel, `{rounded.md}`, padding 16. Enters with the `enter`
curve.

**`panel-armed`** — selected/live/healing state. `{colors.accent-wash}` fill, 1px
`{colors.accent}` border, cyan glow. Used for armed selectors and the actively-healing
rover card.

**`readout-tile`** — mission-overview metric. `panel-hud` chrome; value in
`{typography.readout}` (white, tabular), label in `{typography.label-mono}` (muted).
Values animate via the **counter** beat.

### Status

**`status-led`** — the mission-console indicator. An 8px signal-colour dot + a
`{typography.label-mono}` label in the matching signal colour; no fill, no border. The
dot cross-fades + pulses on the **status-change** beat.

### Inputs & Selection

**`text-input`** — `{colors.canvas-soft}` fill, 1px `{colors.panel-edge}` border that
becomes `{colors.accent}` on focus, `{typography.body-md}`, `{rounded.sm}`, padding
12×16. Label above in `{typography.label-mono}`. Error border `{colors.signal-down}`.

**`chip-select`** — single/multi pick. Idle: transparent + 1px `{colors.panel-edge}` +
muted `{typography.label-mono}`. Selected: `{colors.accent}` fill + `{colors.on-accent}`
label. Pill shape. Toggles with the snappy spring.

### Navigation

**`nav-bar`** — `{colors.canvas-void}` background, title in `{typography.display-lg}`
(uppercase), 1px `{colors.hairline}` bottom border, no shadow.

### Signature Components

**`aurora-hero`** — the void hero with the Self-Heal Aurora mesh behind it, slowly
drifting. Carries a `{typography.label-mono}` eyebrow, a `{typography.display-xl}` title,
a `{typography.body-lg}` lead on a `panel-hud` plate, then a CTA row. The gradient
occupies roughly the top half and breathes.

**`self-heal-pulse`** — the cyan recovery ring (see Motion). An overlay primitive, not a
static component; plays on the confirmation/notification surface.

**`badge-status`** — hairline capsule alternative to the LED for inline use: transparent
fill, 1px border + label both in the signal colour, `{typography.label-mono}`,
`{rounded.xs}`.

## Do's and Don'ts

### Do
- Treat **cyan `{colors.accent}` as sacred** — live, selected, self-heal, focus. Its
  scarcity makes the heal beat land.
- Carry status with the four **signal** tokens as **LED dots + mono-caps labels**.
- Use the **mono voice for all machine data** (IDs, status, counts, timestamps, eyebrows)
  and **sentence-case sans for prose**.
- Build depth from **bevel + glow**, not shadow. Glow means *live*, never decoration.
- Keep the **aurora gradient** at hero scale, as one object, slowly drifting, behind glass.
- Make motion **semantic** — every beat fires because the system did something; reuse the
  3D beat durations.
- Animate the **self-heal** as the memorable moment; pair with the green complete-pop.

### Don't
- Don't add a sixth accent. Cyan + four signals + the aurora pairs are the whole palette.
- Don't drop a heavy material shadow on a plate — depth is bevel + glow on this canvas.
- Don't uppercase body prose or set paragraphs in mono; don't sentence-case the display
  titles or telemetry labels.
- Don't miniaturise, recolour, crop, or re-stop the aurora gradient; never at icon scale.
- Don't use cyan glow decoratively — it must mean live/selected/healing.
- Don't animate without meaning, and don't exceed the beat durations (a 1100 ms heal is
  the longest beat; nothing should out-linger it).
- Don't promote the display sans past weight 800.

## Responsive Behavior

| Width | Changes |
|---|---|
| Small phone < 360 | Readout strip 2-up; display-xl steps to 32; gutters 16. |
| Phone 360–599 | Default: readout strip 2- or 3-up; gutters 24. |
| Large phone / small tablet ≥ 600 | Content caps at ~640 centred; readout strip 3-up; display-xl 40. |

- **Touch targets**: pill CTAs render ≥ 50px tall (16px vertical padding); chips and LEDs
  inflate hit-area to the 44×44 floor.
- **Aurora**: scales fluidly with the hero container; never crops or tiles; re-centres on
  rotation.
- **Motion**: identical beats across sizes; reduced-motion strips positional/scale beats
  to fades.

## Iteration Guide

1. Reference tokens directly (`{colors.accent}`, `{typography.label-mono}`,
   `{motion.beats.self-heal}`, `{rounded.pill}`).
2. One component at a time; add variants as new entries.
3. **The cyan-as-self-heal rule is load-bearing** — diluting cyan into decoration breaks
   the system's most important moment.
4. **Mono = machine, sans = human** is the typographic contract; keep the two voices clean.
5. Depth is **bevel + glow on a void**; never reach for a dark drop-shadow.
6. The aurora is one object at hero scale; the four signals are functional, not brand.
7. Motion beats are semantic and time-boxed; reuse the 3D durations, honour reduced-motion.
