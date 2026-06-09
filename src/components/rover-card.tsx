/** Summary row for a rover in the roster list. */

import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Badge } from '@/components/badge';
import { Card } from '@/components/card';
import { ThemedText } from '@/components/themed-text';
import { RoverStatusLabel } from '@/constants/domain';
import { Spacing } from '@/constants/theme';
import { useDomainColors } from '@/hooks/use-domain-colors';
import type { Rover } from '@/types/domain';

type RoverCardProps = {
  rover: Rover;
};

export function RoverCard({ rover }: RoverCardProps) {
  const { roverStatus } = useDomainColors();
  const router = useRouter();
  return (
    <Card
      href={`/rovers/${rover.id}`}
      menuActions={[
        {
          title: 'Reportar ocorrência',
          icon: 'exclamationmark.bubble',
          onPress: () => router.push(`/report?roverId=${rover.id}`),
        },
      ]}>
      <View style={styles.header}>
        <ThemedText style={styles.name}>{rover.name}</ThemedText>
        <Badge label={RoverStatusLabel[rover.status]} color={roverStatus[rover.status]} />
      </View>
      <ThemedText type="data" themeColor="inkMute">
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
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
