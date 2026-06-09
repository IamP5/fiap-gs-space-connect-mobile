/** chip-select (DESIGN.md) — idle ghost pill, selected = cyan fill. */

import { Pressable, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { usePressScale } from '@/hooks/use-press-scale';
import { useTheme } from '@/hooks/use-theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type OptionSelectorProps<T extends string> = {
  label: string;
  options: readonly T[];
  value: T | null;
  onChange: (value: T) => void;
  /** Maps an option value to its display label. */
  getLabel: (option: T) => string;
  error?: string;
};

type ChipProps = {
  text: string;
  selected: boolean;
  onPress: () => void;
};

function Chip({ text, selected, onPress }: ChipProps) {
  const theme = useTheme();
  const { animatedStyle, onPressIn, onPressOut } = usePressScale(0.95);

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      // Compact pill, but extend the touch area to the 44px floor (DESIGN.md).
      hitSlop={{ top: 8, bottom: 8 }}
      style={[
        styles.chip,
        {
          backgroundColor: selected ? theme.accent : 'transparent',
          borderColor: selected ? theme.accent : theme.panelEdge,
        },
        animatedStyle,
      ]}>
      <ThemedText type="eyebrow" style={{ color: selected ? theme.onAccent : theme.inkMute }}>
        {text}
      </ThemedText>
    </AnimatedPressable>
  );
}

export function OptionSelector<T extends string>({
  label,
  options,
  value,
  onChange,
  getLabel,
  error,
}: OptionSelectorProps<T>) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <ThemedText type="eyebrow" themeColor="inkMute">
        {label}
      </ThemedText>
      <View style={styles.chips}>
        {options.map((option) => (
          <Chip
            key={option}
            text={getLabel(option)}
            selected={option === value}
            onPress={() => onChange(option)}
          />
        ))}
      </View>
      {error ? (
        <ThemedText selectable type="small" style={{ color: theme.signalDown }}>
          {error}
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.two,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: Radius.pill,
    borderWidth: 1,
  },
});
