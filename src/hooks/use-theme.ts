/**
 * Resolves the active color palette from the app's color-scheme context
 * (light or dark). Drives every themed component — toggling the scheme via
 * the ThemeToggle re-renders them all.
 */

import { Colors } from '@/constants/theme';
import { useThemeContext } from '@/contexts/theme-context';

export function useTheme() {
  return Colors[useThemeContext().scheme];
}
