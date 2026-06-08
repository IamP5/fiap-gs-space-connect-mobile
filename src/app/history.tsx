import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Badge } from '@/components/badge';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { MessageState } from '@/components/message-state';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IncidentTypeLabel, SeverityColor, SeverityLabel } from '@/constants/domain';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { clearReports, listReports } from '@/services/reports';
import type { IncidentReport } from '@/types/domain';

type LoadState =
  | { phase: 'loading' }
  | { phase: 'error' }
  | { phase: 'ready'; reports: IncidentReport[] };

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('pt-BR');
}

export default function HistoryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
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
      <FlatList
        data={state.reports}
        keyExtractor={(report) => report.id}
        contentContainerStyle={[
          styles.content,
          { paddingTop: Spacing.three, paddingBottom: insets.bottom + Spacing.four },
        ]}
        ListHeaderComponent={
          <View style={styles.header}>
            <ThemedText type="small" themeColor="textSecondary">
              {state.reports.length} ocorrência(s) · toque para ver os detalhes.
            </ThemedText>
            <Button label="Limpar histórico" variant="secondary" onPress={confirmClear} />
          </View>
        }
        renderItem={({ item }) => (
          <Card onPress={() => router.push(`/confirmation?reportId=${item.id}`)}>
            <View style={styles.cardHeader}>
              <ThemedText type="smallBold" style={styles.roverName}>
                {item.roverName}
              </ThemedText>
              <Badge label={SeverityLabel[item.severity]} color={SeverityColor[item.severity]} />
            </View>
            <ThemedText type="small">{IncidentTypeLabel[item.type]}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {formatDate(item.createdAt)}
            </ThemedText>
          </Card>
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
    gap: Spacing.two,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  header: {
    gap: Spacing.two,
    marginBottom: Spacing.one,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  roverName: {
    fontSize: 16,
  },
});
