/**
 * Press beat (DESIGN.md): scale down on press-in, spring back on release.
 * Centralises the Reanimated shared-value boilerplate shared by the pressable
 * components (button, card, chip).
 */

import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { Springs } from '@/constants/motion';

export function usePressScale(pressedScale = 0.97) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.get() }] }));

  // React Compiler is enabled (app.json `reactCompiler`); use the shared-value
  // `.get()`/`.set()` accessors instead of `.value` so the compiler can track
  // them (it can't track property access). See the reanimated React Compiler docs.
  const onPressIn = () => {
    scale.set(withSpring(pressedScale, Springs.snappy));
  };
  const onPressOut = () => {
    scale.set(withSpring(1, Springs.snappy));
  };

  return { animatedStyle, onPressIn, onPressOut };
}
