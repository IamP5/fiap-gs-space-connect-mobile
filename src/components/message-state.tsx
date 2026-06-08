/** Centered message block for empty, error, and loading states. */

import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type MessageStateProps = {
  title: string;
  description?: string;
  loading?: boolean;
};

export function MessageState({ title, description, loading = false }: MessageStateProps) {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator color={theme.tint} /> : null}
      <ThemedText type="smallBold" style={styles.title}>
        {title}
      </ThemedText>
      {description ? (
        <ThemedText type="small" themeColor="textSecondary" style={styles.description}>
          {description}
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.six,
    gap: Spacing.two,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
  },
});
