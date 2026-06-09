/** Header control: flips the app between the dark and light schemes. */

import { Pressable, StyleSheet, Text } from 'react-native';

import { Radius } from '@/constants/theme';
import { useThemeContext } from '@/contexts/theme-context';
import { useTheme } from '@/hooks/use-theme';

export function ThemeToggle() {
  const { scheme, toggle } = useThemeContext();
  const theme = useTheme();
  const isDark = scheme === 'dark';

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: isDark }}
      accessibilityLabel={isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
      hitSlop={8}
      onPress={toggle}
      style={({ pressed }) => [
        styles.button,
        {
          borderColor: theme.panelEdge,
          backgroundColor: pressed ? theme.canvasSoft : 'transparent',
        },
      ]}>
      {/* ☀ in dark mode (tap → go light) · ☾ in light mode (tap → go dark) */}
      <Text style={[styles.glyph, { color: theme.tint }]}>{isDark ? '☀' : '☾'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 36,
    height: 36,
    borderRadius: Radius.pill,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  glyph: {
    fontSize: 16,
    lineHeight: 18,
  },
});
