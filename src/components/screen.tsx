/** Standard scrollable screen container with safe-area padding. */

import { ScrollView, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';
import { Beats, Durations, Easings } from '@/constants/motion';
import { MaxContentWidth, Spacing } from '@/constants/theme';

type ScreenProps = {
  children: React.ReactNode;
  /** Render children in a non-scrolling flex container instead of a ScrollView. */
  scroll?: boolean;
};

export function Screen({ children, scroll = true }: ScreenProps) {
  const insets = useSafeAreaInsets();

  // screen-in beat (DESIGN.md): fade + small 12px lift on the `enter` curve.
  const entering = FadeInDown.duration(Durations.slow)
    .easing(Easings.enter)
    .withInitialValues({ transform: [{ translateY: Beats.screenIn.lift }] });

  if (!scroll) {
    // No ScrollView here, so inset manually for the top/bottom safe areas.
    return (
      <ThemedView style={styles.flex}>
        <Animated.View
          entering={entering}
          style={[
            styles.content,
            styles.flex,
            { paddingTop: insets.top + Spacing.three, paddingBottom: insets.bottom + Spacing.four },
          ]}>
          {children}
        </Animated.View>
      </ThemedView>
    );
  }

  // Scrollable: `contentInsetAdjustmentBehavior="automatic"` lets iOS apply the
  // header + safe-area insets natively, so we only add aesthetic spacing here.
  return (
    <ThemedView style={styles.flex}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}>
        <Animated.View entering={entering} style={styles.content}>
          {children}
        </Animated.View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scrollContent: {
    paddingTop: Spacing.three,
    paddingBottom: Spacing.four,
  },
  content: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
});
