/** readout-tile (DESIGN.md) — panel-hud chrome, tabular readout + mono label. */

import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Elevation, PanelBevel, Radius, Spacing } from '@/constants/theme';
import { useThemeContext } from '@/contexts/theme-context';
import { useTheme } from '@/hooks/use-theme';

type StatTileProps = {
  value: string;
  label: string;
};

export function StatTile({ value, label }: StatTileProps) {
  const theme = useTheme();
  const { scheme } = useThemeContext();
  return (
    <View
      style={[
        styles.tile,
        { backgroundColor: theme.panel, borderColor: theme.panelEdge, ...Elevation[scheme] },
      ]}>

      <View pointerEvents="none" style={styles.bevel} />
      <ThemedText type="readout" themeColor="text" numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </ThemedText>
      {/* Tighter tracking + shrink-to-fit so a long single word (OCORRÊNCIAS)
          fills the narrow column instead of breaking across lines. */}
      <ThemedText
        type="eyebrow"
        themeColor="inkMute"
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.85}
        style={styles.label}>
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    minWidth: 90,
    borderRadius: Radius.md,
    borderCurve: 'continuous',
    borderWidth: 1,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.two,
    gap: Spacing.two,
    overflow: 'hidden',
  },
  label: {
    letterSpacing: 0.6,
  },
  bevel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: PanelBevel,
  },
});
