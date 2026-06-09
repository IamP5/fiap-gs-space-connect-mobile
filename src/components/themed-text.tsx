import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?:
    | 'default'
    | 'lead'
    | 'title'
    | 'subtitle'
    | 'readout'
    | 'small'
    | 'smallBold'
    | 'eyebrow'
    | 'data'
    | 'link'
    | 'linkPrimary'
    | 'code';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[
        { color: theme[themeColor ?? 'text'] },
        type === 'default' && styles.default,
        type === 'lead' && styles.lead,
        type === 'title' && styles.title,
        type === 'subtitle' && styles.subtitle,
        type === 'readout' && styles.readout,
        type === 'small' && styles.small,
        type === 'smallBold' && styles.smallBold,
        type === 'eyebrow' && styles.eyebrow,
        type === 'data' && styles.data,
        type === 'link' && styles.link,
        type === 'linkPrimary' && styles.linkPrimary,
        type === 'code' && styles.code,
        style,
      ]}
      {...rest}
    />
  );
}

// Three typographic voices by role (DESIGN.md):
//  • Display — uppercase, condensed sans, wide tracking ("engineered" titles).
//  • Telemetry — MONO caps, the machine voice (labels, IDs, status, eyebrows).
//  • Body — sentence-case sans, calm, neutral tracking (prose).
const styles = StyleSheet.create({
  // ── Body (sans, sentence-case, calm) ──
  default: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400',
    letterSpacing: 0.1,
  },
  lead: {
    fontSize: 17,
    lineHeight: 26,
    fontWeight: '400',
    letterSpacing: 0,
  },
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    letterSpacing: 0.1,
  },
  smallBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  // ── Display (sans, uppercase, engineered) ──
  // lineHeight runs ~1.1× the cap size so Portuguese diacritics on uppercase
  // (Õ, Ç, Ã) keep headroom and don't clip when the title wraps to 2–3 lines.
  title: {
    fontSize: 38,
    fontWeight: '800',
    lineHeight: 42,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 28,
    lineHeight: 33,
    fontWeight: '800',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  // ── Readout (sans, big telemetry numeric, tabular figures) ──
  readout: {
    fontSize: 32,
    lineHeight: 34,
    fontWeight: '800',
    letterSpacing: 0,
    fontVariant: ['tabular-nums'],
  },
  // ── Telemetry (MONO, the machine voice) ──
  /** Section eyebrow / label / status — mono caps. */
  eyebrow: {
    fontFamily: Fonts.mono,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  /** Rover IDs, coords, timestamps — mono data. */
  data: {
    fontFamily: Fonts.mono,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
    letterSpacing: 0.4,
  },
  link: {
    lineHeight: 30,
    fontSize: 14,
  },
  linkPrimary: {
    lineHeight: 30,
    fontSize: 14,
    color: '#2DD4C6',
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: '700' }) ?? '500',
    fontSize: 12,
  },
});
