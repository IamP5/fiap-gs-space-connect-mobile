/** panel-hud glass plate (DESIGN.md). Optionally pressable / linked / armed. */

import { Link, type Href } from 'expo-router';
import { Pressable, StyleSheet, View, type ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import { Elevation, Glow, PanelBevel, Radius, Spacing } from '@/constants/theme';
import { useThemeContext } from '@/contexts/theme-context';
import { usePressScale } from '@/hooks/use-press-scale';
import { useTheme } from '@/hooks/use-theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/** A long-press context-menu action (iOS), shown alongside the link preview. */
export type CardMenuAction = {
  title: string;
  /** SF Symbol name, e.g. "exclamationmark.bubble". */
  icon?: React.ComponentProps<typeof Link.MenuAction>['icon'];
  destructive?: boolean;
  onPress: () => void;
};

type CardProps = {
  children: React.ReactNode;
  /** Navigate on tap. Prefer this over `onPress` — it adds the native iOS
   *  link preview (and context menu when `menuActions` is set). */
  href?: Href;
  /** Long-press context-menu actions (iOS); only used together with `href`. */
  menuActions?: CardMenuAction[];
  /** Imperative tap handler for cards that aren't plain route navigations. */
  onPress?: () => void;
  style?: ViewStyle;
  variant?: 'default' | 'armed';
};

export function Card({ children, href, menuActions, onPress, style, variant = 'default' }: CardProps) {
  const theme = useTheme();
  const { scheme } = useThemeContext();
  const { animatedStyle, onPressIn, onPressOut } = usePressScale(0.98);

  // default = panel plate + bevel + ambient elevation; armed = cyan-wash + ring + glow.
  const surface: ViewStyle =
    variant === 'armed'
      ? { backgroundColor: theme.accentWash, borderColor: theme.accent, ...Glow.armed }
      : { backgroundColor: theme.panel, borderColor: theme.panelEdge, ...Elevation[scheme] };

  // Inset top-highlight bevel — a hairline bright line reading as a physical HUD edge.
  const bevel = <View pointerEvents="none" style={styles.bevel} />;

  // Linked card: native iOS link preview + optional long-press context menu.
  // Link.Trigger clones its direct child via a <Slot>, which rejects array
  // `style` props — so the trigger child is a bare Pressable and all visual
  // styling (incl. the press-scale) lives on the Animated.View nested inside it.
  if (href) {
    return (
      <Link href={href} asChild>
        <Link.Trigger>
          <Pressable accessibilityRole="button" onPressIn={onPressIn} onPressOut={onPressOut}>
            <Animated.View style={[styles.card, surface, animatedStyle, style]}>
              {bevel}
              {children}
            </Animated.View>
          </Pressable>
        </Link.Trigger>
        <Link.Preview />
        {menuActions && menuActions.length > 0 ? (
          <Link.Menu>
            {menuActions.map((action) => (
              <Link.MenuAction
                key={action.title}
                title={action.title}
                icon={action.icon}
                destructive={action.destructive}
                onPress={action.onPress}
              />
            ))}
          </Link.Menu>
        ) : null}
      </Link>
    );
  }

  if (onPress) {
    return (
      <AnimatedPressable
        accessibilityRole="button"
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[styles.card, surface, animatedStyle, style]}>
        {bevel}
        {children}
      </AnimatedPressable>
    );
  }

  return (
    <View style={[styles.card, surface, style]}>
      {bevel}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.md,
    borderCurve: 'continuous',
    borderWidth: 1,
    padding: Spacing.three,
    gap: Spacing.two,
    overflow: 'hidden',
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
