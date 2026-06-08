# AGENTS.md — SwarmBuild Ops (mobile)

React Native + Expo mobile app: the **Earth-side operations companion** for the
SwarmBuild Global Solution (a lunar-construction rover swarm that self-heals on
rover failure). This file is the harness entry point — read it first, every session.

## Startup workflow (do this in order, before writing code)

1. Read `progress.md` — current state, last verification, next action.
2. Read `feature_list.json` — pick the ONE feature with status `in-progress`, or the
   first `not-started` whose dependencies are all `done`.
3. Skim `README.md` for the product flow and folder map (don't duplicate it here).
4. Run `./init.sh` from a clean checkout, or `npm run verify` mid-session.

## Working rules

- **One feature at a time.** Don't start a second feature until the active one is `done`
  with evidence. Don't expand scope beyond the active feature's description.
- **Match the existing code.** Telas in `src/app/` (expo-router), reusable UI in
  `src/components/`, data/device access in `src/services/`, types in `src/types/`,
  labels/colors in `src/constants/`. Keep that separation; no business logic in screens
  beyond wiring.
- **Keep it simple.** This is a graded assignment, not a product. Fulfill the requirement,
  don't over-engineer. New deps need a real reason.
- **Domain language** (rover, lease, expiry, re-auction, self-heal) comes from the
  `gs-fiap-space` project — use it consistently. See `README.md`.
- **Expo skills available** under `.agents/skills/` (building-native-ui, native-data-fetching,
  upgrading-expo, vercel-react-native-skills, …). Consult the relevant SKILL.md before
  non-trivial native/UI work instead of guessing.

## Definition of done (a feature is `done` only when ALL hold)

- [ ] `npm run typecheck` passes clean (no errors).
- [ ] `npm run lint` passes clean.
- [ ] `npx expo export --platform ios` exits 0 (proves every route bundles).
- [ ] For UI/flow changes: ran the app (`npx expo start`) and confirmed the behavior,
      OR captured a screenshot/recording. Note the evidence in `feature_list.json`.
- [ ] `progress.md` updated with what changed and the next action.

A simulator/Expo Go check is the real test here — there is no automated test suite, so
visual evidence IS the verification. Never mark a UI feature `done` from a clean build alone.

## End of Session routine

Update `progress.md` (last action, verification result, next step) and the active feature's
`status`/`evidence` in `feature_list.json`. If handing off mid-feature, fill
`session-handoff.md`.

## Invariants (don't break these)

- Build artifacts stay untracked: `dist/`, `.expo/`, `expo-env.d.ts` are gitignored.
- `app.json` permission strings (e.g. `expo-location`) must stay populated — empty strings
  break the native build.
- Commit/push only when the user asks.
