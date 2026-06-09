/**
 * aurora-hero (DESIGN.md "Signature Components") — the void hero backed by the
 * "Self-Heal Aurora" mesh gradient, slowly drifting behind glass.
 *
 * The aurora is one object (cyan → blue → violet → amber), hero scale only,
 * occupying roughly the top half of the hero, behind a dark scrim so type stays
 * legible. Title / lead / children sit on an opaque panel-hud plate above it.
 * Drift is the only looping ambient motion (gradientDrift, 12000 ms); held still
 * when reduce-motion is on.
 */

import { useEffect, useState } from 'react';
import { AccessibilityInfo, StyleSheet, View, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { Beats, Easings } from '@/constants/motion';
import { Gradient, PanelBevel, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type AuroraHeroProps = {
  eyebrow: string;
  title: string;
  lead: string;
  children?: React.ReactNode;
};

export function AuroraHero({ eyebrow, title, lead, children }: AuroraHeroProps) {
  const theme = useTheme();
  const [reduceMotion, setReduceMotion] = useState(false);
  const drift = useSharedValue(0);

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
    if (reduceMotion) {
      drift.set(0);
      return;
    }
    // 0.6 Hz atmospheric breathe — a slow loop the aurora layers map to.
    drift.set(
      withRepeat(
        withTiming(1, { duration: Beats.gradientDrift.duration, easing: Easings.standard }),
        -1,
        true,
      ),
    );
  }, [reduceMotion, drift]);

  // Subtle: a few px of translate + a couple degrees of rotate + slight scale.
  const meshStyle = useAnimatedStyle(() => {
    const d = drift.get();
    return {
      transform: [
        { translateX: -12 + d * 24 },
        { translateY: -8 + d * 16 },
        { rotate: `${-2 + d * 4}deg` },
        { scale: 1.08 + d * 0.06 },
      ],
    };
  });

  const overlayMeshStyle = useAnimatedStyle(() => {
    const d = drift.get();
    return {
      transform: [
        { translateX: 16 - d * 28 },
        { translateY: 10 - d * 18 },
        { rotate: `${3 - d * 5}deg` },
        { scale: 1.12 - d * 0.05 },
      ],
    };
  });

  return (
    <View style={[styles.hero, { backgroundColor: theme.background }]}>
      {/* ── Aurora mesh (decorative, top ~55%, behind glass) ── */}
      <View pointerEvents="none" style={styles.auroraClip}>
        <Animated.View pointerEvents="none" style={[styles.meshLayer, meshStyle]}>
          <LinearGradient
            colors={[Gradient.a, Gradient.b, Gradient.c, Gradient.d]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
        <Animated.View
          pointerEvents="none"
          style={[styles.meshLayer, styles.meshOverlay, overlayMeshStyle]}>
          <LinearGradient
            colors={[Gradient.c, 'transparent', Gradient.a]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
        {/* Dark scrim: transparent at top → void at bottom, keeps type legible. */}
        <LinearGradient
          pointerEvents="none"
          colors={['transparent', theme.background]}
          locations={[0, 0.85]}
          style={StyleSheet.absoluteFill}
        />
        <View
          pointerEvents="none"
          style={[styles.scrim, { backgroundColor: theme.background }]}
        />
      </View>

      {/* ── Content on a glass plate (panel-hud), never on the brightest gradient ── */}
      <View style={styles.content}>
        <ThemedText type="eyebrow" themeColor="inkMute">
          {eyebrow}
        </ThemedText>
        <View
          style={[
            styles.plate,
            { backgroundColor: theme.panel, borderColor: theme.panelEdge },
          ]}>
          <View pointerEvents="none" style={styles.bevel} />
          {/* Long Portuguese call-signs (OPERAÇÕES) overflow the plate at full
              size — shrink-to-fit keeps them on clean word-boundary lines
              instead of breaking a word across two rows. */}
          <ThemedText
            type="title"
            numberOfLines={3}
            adjustsFontSizeToFit
            minimumFontScale={0.7}>
            {title}
          </ThemedText>
          <ThemedText type="lead" themeColor="inkSoft" style={styles.lead}>
            {lead}
          </ThemedText>
          {children ? <View style={styles.cta}>{children}</View> : null}
        </View>
      </View>
    </View>
  );
}

const plate: ViewStyle = {
  borderRadius: Radius.lg,
  borderCurve: 'continuous',
  borderWidth: 1,
  padding: Spacing.four,
  gap: Spacing.three,
  overflow: 'hidden',
};

const styles = StyleSheet.create({
  hero: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: Radius.xl,
    borderCurve: 'continuous',
  },
  auroraClip: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '55%',
    overflow: 'hidden',
  },
  meshLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  meshOverlay: {
    opacity: 0.5,
  },
  scrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.4,
  },
  content: {
    padding: Spacing.four,
    paddingTop: Spacing.five,
    gap: Spacing.three,
  },
  plate,
  bevel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: PanelBevel,
  },
  lead: {
    maxWidth: 520,
  },
  cta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
});
