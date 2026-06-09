import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Badge } from '@/components/badge';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { MessageState } from '@/components/message-state';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { RoverStatusLabel, TaskStatusLabel } from '@/constants/domain';
import { Spacing } from '@/constants/theme';
import { useDomainColors } from '@/hooks/use-domain-colors';
import { getRoverById, getTaskForRover } from '@/services/worksite';

/** A label/value row inside a detail card. */
function DetailRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <View style={styles.row}>
      <ThemedText type="eyebrow" themeColor="textSecondary">
        {label}
      </ThemedText>
      <ThemedText selectable type={mono ? 'data' : 'smallBold'}>
        {value}
      </ThemedText>
    </View>
  );
}

export default function RoverDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { roverStatus } = useDomainColors();
  const rover = getRoverById(id);

  // Registro não encontrado — guard against an unknown rover id.
  if (!rover) {
    return (
      <Screen>
        <MessageState
          title="Rover não encontrado"
          description={`Nenhum rover corresponde ao id "${id}".`}
        />
        <Button label="Voltar" variant="secondary" onPress={() => router.back()} />
      </Screen>
    );
  }

  const task = getTaskForRover(rover);

  return (
    <Screen>
      <View style={styles.titleRow}>
        <ThemedText type="subtitle">{rover.name}</ThemedText>
        <Badge label={RoverStatusLabel[rover.status]} color={roverStatus[rover.status]} />
      </View>

      <Card>
        <DetailRow label="Identificador" value={rover.id} mono />
        <DetailRow label="Perfil de capacidade" value={rover.capability} />
        <DetailRow label="Bateria" value={`${rover.battery}%`} mono />
      </Card>

      <Card variant={task?.status === 'LEASED' ? 'armed' : 'default'}>
        <ThemedText type="eyebrow" themeColor="textSecondary">Tarefa atual</ThemedText>
        {task ? (
          <>
            <ThemedText type="small">{task.label}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Status: {TaskStatusLabel[task.status]}
            </ThemedText>
          </>
        ) : (
          <ThemedText type="small" themeColor="textSecondary">
            Sem tarefa em execução no momento.
          </ThemedText>
        )}
      </Card>

      <Button
        label="Reportar ocorrência neste rover"
        onPress={() => router.push(`/report?roverId=${rover.id}`)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
});
