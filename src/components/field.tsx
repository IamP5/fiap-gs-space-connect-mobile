/** text-input (DESIGN.md) — soft fill, cyan focus border, inline error. */

import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Glow, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type FieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  /** Validation message; when set, the field renders in an error state. */
  error?: string;
};

export function Field({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  error,
}: FieldProps) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);

  // border: error (red) > focus (cyan + glow) > resting (panel edge).
  const borderColor = error ? theme.signalDown : focused ? theme.accent : theme.panelEdge;

  return (
    <View style={styles.container}>
      <ThemedText type="eyebrow" themeColor="inkMute">
        {label}
      </ThemedText>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.inkMute}
        multiline={multiline}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[
          styles.input,
          multiline && styles.multiline,
          {
            color: theme.text,
            backgroundColor: theme.canvasSoft,
            borderColor,
          },
          focused && !error ? Glow.armed : null,
        ]}
      />
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
  input: {
    minHeight: 50,
    borderRadius: Radius.sm,
    borderCurve: 'continuous',
    borderWidth: 1,
    paddingHorizontal: Spacing.three,
    paddingVertical: 12,
    fontSize: 15,
  },
  multiline: {
    minHeight: 110,
    textAlignVertical: 'top',
  },
});
