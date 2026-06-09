/**
 * self-heal-pulse (DESIGN.md "The Self-Heal Signature") — the one animation
 * users should remember. On mount, an expanding cyan ring plays the self-heal
 * beat: scale 1 → 2.8, opacity 1 → 0 over 1100 ms with the `enter` curve, under
 * a soft central cyan emissive flash. It says, wordlessly, *the swarm just
 * re-knitted itself*. Cyan is sacred — this is where it earns its scarcity.
 *
 * An absolutely-positionable, pointerEvents:'none' overlay. Reduced motion cuts
 * the ring to a single static cyan opacity flash (no scale), per DESIGN.md.
 */

import { useEffect, useState } from 'react';
import { AccessibilityInfo, StyleSheet, View, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { Beats, Easings } from '@/constants/motion';
import { useTheme } from '@/hooks/use-theme';

type SelfHealPulseProps = {
  /** Base diameter of the resting ring; it expands to ringScale × this. */
  size?: number;
  style?: ViewStyle;
};

export function SelfHealPulse({ size = 96, style }: SelfHealPulseProps) {
  const theme = useTheme();
  const [reduceMotion, setReduceMotion] = useState<boolean | null>(null);
  const progress = useSharedValue(0);
  const flash = useSharedValue(0);

  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (mounted) setReduceMotion(enabled);
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (reduceMotion === null) return;

    if (reduceMotion) {
      // Static cyan opacity flash — no scale, no ring expansion.
      flash.set(
        withSequence(
          withTiming(1, { duration: Beats.selfHeal.duration / 2, easing: Easings.standard }),
          withTiming(0.001, { duration: Beats.selfHeal.duration / 2, easing: Easings.standard }),
        ),
      );
      return;
    }

    // The signature: a gentle repeating cyan recovery pulse (×3).
    progress.set(
      withRepeat(
        withTiming(1, { duration: Beats.selfHeal.duration, easing: Easings.enter }),
        3,
        false,
      ),
    );
    flash.set(
      withRepeat(
        withSequence(
          withTiming(1, { duration: Beats.selfHeal.duration * 0.3, easing: Easings.enter }),
          withTiming(0.001, { duration: Beats.selfHeal.duration * 0.7, easing: Easings.standard }),
        ),
        3,
        false,
      ),
    );
  }, [reduceMotion, progress, flash]);

  // Ring: scale 1 → ringScale, opacity 1 → 0.
  const ringStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.get(),
    transform: [{ scale: 1 + progress.get() * (Beats.selfHeal.ringScale - 1) }],
  }));

  // Central cyan emissive flash.
  const flashStyle = useAnimatedStyle(() => ({
    opacity: flash.get(),
  }));

  if (reduceMotion === null) return null;

  const circle: ViewStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  return (
    <View pointerEvents="none" style={[styles.overlay, style]}>
      <Animated.View
        style={[
          styles.flash,
          circle,
          { backgroundColor: theme.accentWash },
          flashStyle,
        ]}
      />
      {!reduceMotion && (
        <Animated.View
          style={[styles.ring, circle, { borderColor: theme.accent }, ringStyle]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  flash: {
    position: 'absolute',
  },
});
