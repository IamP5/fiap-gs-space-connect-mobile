/** Single-select chip group used for picking enum values (type, severity). */

import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type OptionSelectorProps<T extends string> = {
  label: string;
  options: readonly T[];
  value: T | null;
  onChange: (value: T) => void;
  /** Maps an option value to its display label. */
  getLabel: (option: T) => string;
  error?: string;
};

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
      <ThemedText type="smallBold">{label}</ThemedText>
      <View style={styles.chips}>
        {options.map((option) => {
          const selected = option === value;
          return (
            <Pressable
              key={option}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => onChange(option)}
              style={[
                styles.chip,
                {
                  backgroundColor: selected ? theme.tint : theme.backgroundElement,
                  borderColor: selected ? theme.tint : theme.border,
                },
              ]}>
              <ThemedText
                type="small"
                style={{ color: selected ? '#ffffff' : theme.text }}>
                {getLabel(option)}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>
      {error ? (
        <ThemedText type="small" style={styles.error}>
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
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.four,
    borderWidth: StyleSheet.hairlineWidth,
  },
  error: {
    color: '#d1453b',
  },
});
