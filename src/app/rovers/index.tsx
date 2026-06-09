import { FlashList } from '@shopify/flash-list';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { RoverCard } from '@/components/rover-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Beats, Durations } from '@/constants/motion';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { getRovers } from '@/services/worksite';

function Separator() {
  return <View style={styles.separator} />;
}

export default function RoversScreen() {
  const rovers = getRovers();

  return (
    <ThemedView style={styles.flex}>
      <FlashList
        data={rovers}
        keyExtractor={(rover) => rover.id}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.content}
        ItemSeparatorComponent={Separator}
        ListHeaderComponent={
          <ThemedText type="eyebrow" themeColor="inkMute" style={[styles.item, styles.header]}>
            Roster do canteiro · toque em um rover para ver os detalhes.
          </ThemedText>
        }
        renderItem={({ item, index }) => (
          <Animated.View
            style={styles.item}
            entering={FadeInDown.duration(Durations.base).delay(index * Beats.listStagger.stagger)}>
            <RoverCard rover={item} />
          </Animated.View>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.four,
  },
  // FlashList contentContainerStyle can't center/constrain width, so each cell
  // carries the max-width centering instead.
  item: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  header: {
    marginBottom: Spacing.two,
  },
  separator: {
    height: Spacing.two,
  },
});
