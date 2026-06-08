#!/bin/bash
# Harness initialization + verification for SwarmBuild Ops (Expo / React Native).
# Run from a clean checkout, or any time before claiming a feature done.
set -e

echo "=== 1/4 Install dependencies (npm) ==="
npm install

echo "=== 2/4 Type check (tsc --noEmit) ==="
# Generates .expo/types if missing so the @/global.css side-effect import resolves.
if [ ! -f expo-env.d.ts ]; then
  echo "(generating Expo types via a short dev-server boot...)"
  npx expo start --offline >/tmp/expo-init.log 2>&1 &
  EXPO_PID=$!
  for _ in $(seq 1 20); do
    [ -f expo-env.d.ts ] && break
    sleep 1
  done
  kill "$EXPO_PID" 2>/dev/null || true
fi
npm run typecheck

echo "=== 3/4 Lint (expo lint) ==="
npm run lint

echo "=== 4/4 Production bundle check (expo export, iOS) ==="
# Exits non-zero if ANY route fails to resolve/compile. The real "does it build" gate.
rm -rf dist
npx expo export --platform ios >/tmp/expo-export.log 2>&1
echo "export OK (see /tmp/expo-export.log)"
rm -rf dist

echo ""
echo "=== Verification complete ==="
echo "Next steps:"
echo "1. Read progress.md for current state and next action."
echo "2. Read feature_list.json; pick ONE unfinished feature whose deps are done."
echo "3. Implement only that feature, then re-run ./init.sh."
echo "4. For UI/flow changes, also run 'npx expo start' and confirm visually."
