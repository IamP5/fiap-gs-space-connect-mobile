import { useRouter } from 'expo-router';
import { FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RoverCard } from '@/components/rover-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { getRovers } from '@/services/worksite';

export default function RoversScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const rovers = getRovers();

  return (
    <ThemedView style={styles.flex}>
      <FlatList
        data={rovers}
        keyExtractor={(rover) => rover.id}
        contentContainerStyle={[
          styles.content,
          { paddingTop: Spacing.three, paddingBottom: insets.bottom + Spacing.four },
        ]}
        ListHeaderComponent={
          <ThemedText type="small" themeColor="textSecondary" style={styles.header}>
            Roster do canteiro · toque em um rover para ver os detalhes.
          </ThemedText>
        }
        renderItem={({ item }) => (
          <RoverCard rover={item} onPress={() => router.push(`/rovers/${item.id}`)} />
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.two,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  header: {
    marginBottom: Spacing.one,
  },
});
