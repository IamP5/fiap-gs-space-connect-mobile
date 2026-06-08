/** Standard scrollable screen container with safe-area padding. */

import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';

type ScreenProps = {
  children: React.ReactNode;
  /** Render children in a non-scrolling flex container instead of a ScrollView. */
  scroll?: boolean;
};

export function Screen({ children, scroll = true }: ScreenProps) {
  const insets = useSafeAreaInsets();
  const padding = {
    paddingTop: insets.top + Spacing.three,
    paddingBottom: insets.bottom + Spacing.four,
  };

  if (!scroll) {
    return (
      <ThemedView style={styles.flex}>
        <View style={[styles.content, styles.flex, padding]}>{children}</View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.flex}>
      <ScrollView
        contentContainerStyle={[styles.content, padding]}
        keyboardShouldPersistTaps="handled">
        {children}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
});
