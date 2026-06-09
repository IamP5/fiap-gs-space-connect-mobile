/** status-led (DESIGN.md) — an 8px signal dot + a mono-caps label, no fill. */

import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

type BadgeProps = {
  label: string;
  /** Signal color for rover/task status or severity. */
  color: string;
};

export function Badge({ label, color }: BadgeProps) {
  return (
    <View style={styles.badge}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <ThemedText type="eyebrow" style={{ color }}>
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
