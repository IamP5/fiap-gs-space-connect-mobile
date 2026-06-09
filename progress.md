# Progress

**Last Updated:** 2026-06-08
**Current Objective:** feat-006 — record delivery evidence (video + screenshots) and fill the README links.
**Recommended Next Step:** `npx expo start`, walk the full flow, record the demo, then paste the video + repo link into README.md and set feat-006 to `done`.

## Current state

The app is **feature-complete and verified**. All 6 screens, navigation, AsyncStorage
persistence, the **notifications native resource**, and validation/error handling are
implemented (feat-001 through feat-005 `done`). Only the **delivery evidence** (feat-006)
remains.

**2026-06-08 — React/RN/Expo best-practices pass (against `.agents/skills/`).** Aligned
the codebase to the Vercel RN + Expo `building-native-ui` skills. (1) **React Compiler**:
shared values now use `.get()/.set()` not `.value` (app.json has `reactCompiler: true`),
removing the `eslint-disable react-hooks/immutability` hacks in `use-press-scale`,
`aurora-hero`, `self-heal-pulse`. (2) `borderCurve: 'continuous'` on all non-pill surfaces
(card, stat-tile, field, aurora hero+plate). (3) `React.use(ThemeContext)` over `useContext`.
(4) Hoisted `Intl.DateTimeFormat` to module scope in confirmation + history (was rebuilt per
render/row). (5) `selectable` on error + copyable-data text. (6) **Shadows → CSS `boxShadow`**
in `theme.ts` `Glow`/`Elevation` (no more legacy `shadow*`/`elevation`). (7) ScrollView/lists
use `contentInsetAdjustmentBehavior="automatic"` — dropped manual `useSafeAreaInsets` top/bottom
on scroll paths. (8) Rover + history lists now **FlashList** (`@shopify/flash-list` added);
cards navigate via `<Link>` with **native iOS link preview** + a long-press context menu
(rover → quick "Reportar ocorrência"). Re-verified: tsc clean, expo lint clean, expo export
--platform ios exit 0. ⚠️ **Visual run still pending** — items 6–8 (shadow rendering, inset
spacing, FlashList layout, Link preview/menu) change on-device appearance and need a simulator
pass before being called done.

**2026-06-08 — mission-control design system (merged DESIGN.md v1.0).** Implemented the
full "black glass instrument panel" language merging SpaceX austerity + Vercel system +
the SwarmBuild 3D world. Token contract in `theme.ts` (cyan `#38E1FF` accent, four signal
tokens, panel/bevel surfaces, ink tiers, aurora `Gradient` stops, `Glow`, `Radius`) +
new `motion.ts` (Easings/Springs/Durations/Beats). Three type voices in `themed-text.tsx`
(display uppercase · MONO telemetry · calm body). Components: cyan-fill `Button`, glass
`Card` (+`armed` variant), focus-glow `Field`, cyan-chip `OptionSelector`, readout
`StatTile`, LED `Badge`, new `AuroraHero` (drifting mesh via expo-linear-gradient) and
`SelfHealPulse` (the signature 1100ms cyan recovery ring). Motion via react-native-
reanimated: press-scale (`usePressScale` hook), screen-in fade-lift, list-stagger, and the
self-heal pulse on the confirmation screen. Built by subagents in 3 dependency phases
(tokens → components → screens). Re-verified: tsc clean, expo lint clean, expo export
--platform ios exit 0. Visual run still pending.

**2026-06-08 — light theme + theme toggle.** Added a full "daylight mission console"
light palette in `Colors.light` (soft-grey page, white HUD plates, neutral ambient
shadow via new `Elevation` token since glow can't read on light; accent darkened to teal
`#0C97BD` and signals darkened for AA on white). New `AppThemeProvider`/`useThemeContext`
(`src/contexts/theme-context.tsx`) holds the resolved scheme — follows the OS by default,
persists an explicit choice to AsyncStorage. `useTheme()` now reads from it so every
component re-renders on toggle. New `ThemeToggle` (sun/moon) wired into the Stack header
(`headerRight`, all screens); nav theme + StatusBar flip with the scheme. Status/severity
signals made theme-aware (`RoverStatusColorByScheme`/`SeverityColorByScheme` + `useDomainColors`).
Re-verified: tsc clean, expo lint clean, expo export --platform ios exit 0. Visual run
still pending.

**Earlier SpaceX austere pass (superseded):** pure-black canvas, white ghost pills, no
accent — now evolved into the cyan/glass/motion system above.

**2026-06-08 — native resource changed (GPS → Notifications).** The old GPS resource was
forced (attaching the operator's Earth coordinates to a lunar rover made no sense). Replaced
with **expo-notifications**: the coordinator's self-heal response is pushed to the phone when
a report is filed (deep-links to confirmation), and the home "Monitor do enxame" simulates a
rover-failure/re-auction event. expo-location removed. Re-verified: tsc + lint clean, expo
export --platform ios exit 0.

## Active feature

**feat-006 — Delivery evidence (video + screenshots + repo link).** Not started.
This is a human task: record the demo and fill the README placeholders.

## Last verification (2026-06-08)

- `tsc --noEmit` → clean
- `expo lint` → clean
- `npx expo export --platform ios` → exit 0, 1107 modules, all routes bundled

## Next action

1. `npx expo start`, open in Expo Go / simulator.
2. Walk the full flow: Início (ativar alertas + "Simular evento do enxame") → Rovers →
   Detalhe → Reportar → toque no alerta do coordenador → Status/Confirmação → Histórico.
   Record a short video + a few screenshots (capture a notification banner for evidence).
3. Edit `README.md` "Evidências de execução" section: paste the video link and the git
   repo link.
4. Set feat-006 `status: done` with the evidence link.

## Notes

- No automated test suite by design (graded assignment, kept simple). Verification =
  typecheck + lint + export + a visual run. Visual evidence is the real test for UI changes.
- Theme/domain language mirrors the `gs-fiap-space` project (rover, lease, expiry,
  re-auction, self-heal).
