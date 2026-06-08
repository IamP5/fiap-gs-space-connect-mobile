/** Small colored pill used for rover/task status and severity. */

import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

type BadgeProps = {
  label: string;
  /** Accent color; rendered as a tinted background + colored text. */
  color: string;
};

export function Badge({ label, color }: BadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: `${color}22`, borderColor: color }]}>
      <ThemedText type="smallBold" style={[styles.text, { color }]}>
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: Spacing.two,
    borderWidth: StyleSheet.hairlineWidth,
  },
  text: {
    fontSize: 12,
    lineHeight: 18,
  },
});
