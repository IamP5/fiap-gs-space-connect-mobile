# Progress

**Last Updated:** 2026-06-08
**Current Objective:** feat-006 — record delivery evidence (video + screenshots) and fill the README links.
**Recommended Next Step:** `npx expo start`, walk the full flow, record the demo, then paste the video + repo link into README.md and set feat-006 to `done`.

## Current state

The app is **feature-complete and verified**. All 6 screens, navigation, AsyncStorage
persistence, the **notifications native resource**, and validation/error handling are
implemented (feat-001 through feat-005 `done`). Only the **delivery evidence** (feat-006)
remains.

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
