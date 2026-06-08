/** Summary row for a rover in the roster list. */

import { StyleSheet, View } from 'react-native';

import { Badge } from '@/components/badge';
import { Card } from '@/components/card';
import { ThemedText } from '@/components/themed-text';
import { RoverStatusColor, RoverStatusLabel } from '@/constants/domain';
import { Spacing } from '@/constants/theme';
import type { Rover } from '@/types/domain';

type RoverCardProps = {
  rover: Rover;
  onPress: () => void;
};

export function RoverCard({ rover, onPress }: RoverCardProps) {
  return (
    <Card onPress={onPress}>
      <View style={styles.header}>
        <ThemedText type="smallBold" style={styles.name}>
          {rover.name}
        </ThemedText>
        <Badge label={RoverStatusLabel[rover.status]} color={RoverStatusColor[rover.status]} />
      </View>
      <ThemedText type="small" themeColor="textSecondary">
        {rover.capability} · bateria {rover.battery}%
      </ThemedText>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  name: {
    fontSize: 18,
  },
});
