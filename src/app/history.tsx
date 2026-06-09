import { FlashList } from '@shopify/flash-list';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { Badge } from '@/components/badge';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { MessageState } from '@/components/message-state';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IncidentTypeLabel, SeverityLabel } from '@/constants/domain';
import { Beats, Durations } from '@/constants/motion';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useDomainColors } from '@/hooks/use-domain-colors';
import { clearReports, listReports } from '@/services/reports';
import type { IncidentReport } from '@/types/domain';

type LoadState =
  | { phase: 'loading' }
  | { phase: 'error' }
  | { phase: 'ready'; reports: IncidentReport[] };

// Hoisted: building an Intl formatter parses locale data, so create it once at
// module scope rather than per list row (js-hoist-intl).
const dateTimeFormatter = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
});

function formatDate(iso: string): string {
  return dateTimeFormatter.format(new Date(iso));
}

function Separator() {
  return <View style={styles.separator} />;
}

export default function HistoryScreen() {
  const router = useRouter();
  const { severity } = useDomainColors();
  const [state, setState] = useState<LoadState>({ phase: 'loading' });

  const load = useCallback(() => {
    let active = true;
    setState({ phase: 'loading' });
    listReports()
      .then((reports) => active && setState({ phase: 'ready', reports }))
      .catch(() => active && setState({ phase: 'error' }));
    return () => {
      active = false;
    };
  }, []);

  useFocusEffect(load);

  function confirmClear() {
    Alert.alert('Limpar histórico', 'Remover todas as ocorrências registradas?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Limpar',
        style: 'destructive',
        onPress: async () => {
          await clearReports();
          setState({ phase: 'ready', reports: [] });
        },
      },
    ]);
  }

  if (state.phase === 'loading') {
    return (
      <ThemedView style={styles.flex}>
        <MessageState title="Carregando histórico..." loading />
      </ThemedView>
    );
  }

  if (state.phase === 'error') {
    return (
      <ThemedView style={styles.centered}>
        <MessageState
          title="Falha ao carregar"
          description="Não foi possível ler as ocorrências do armazenamento local."
        />
        <Button label="Tentar novamente" onPress={load} />
      </ThemedView>
    );
  }

  if (state.reports.length === 0) {
    return (
      <ThemedView style={styles.centered}>
        <MessageState
          title="Nenhuma ocorrência registrada"
          description="As ocorrências que você registrar aparecerão aqui."
        />
        <Button label="Reportar ocorrência" onPress={() => router.push('/report')} />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.flex}>
      <FlashList
        data={state.reports}
        keyExtractor={(report) => report.id}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.content}
        ItemSeparatorComponent={Separator}
        ListHeaderComponent={
          <View style={[styles.item, styles.header]}>
            <ThemedText type="eyebrow" themeColor="inkMute">
              {state.reports.length} ocorrência(s) · toque para ver os detalhes.
            </ThemedText>
            <Button label="Limpar histórico" variant="secondary" onPress={confirmClear} />
          </View>
        }
        renderItem={({ item, index }) => (
          <Animated.View
            style={styles.item}
            entering={FadeInDown.duration(Durations.base).delay(index * Beats.listStagger.stagger)}>
            <Card href={`/confirmation?reportId=${item.id}`}>
              <View style={styles.cardHeader}>
                <ThemedText type="smallBold" style={styles.roverName}>
                  {item.roverName}
                </ThemedText>
                <Badge label={SeverityLabel[item.severity]} color={severity[item.severity]} />
              </View>
              <ThemedText type="small">{IncidentTypeLabel[item.type]}</ThemedText>
              <ThemedText type="data" themeColor="inkMute">
                {formatDate(item.createdAt)}
              </ThemedText>
            </Card>
          </Animated.View>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  centered: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
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
    gap: Spacing.two,
    marginBottom: Spacing.two,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  roverName: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  separator: {
    height: Spacing.two,
  },
});
