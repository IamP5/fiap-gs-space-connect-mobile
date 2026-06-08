import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Badge } from '@/components/badge';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { MessageState } from '@/components/message-state';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import {
  IncidentTypeLabel,
  SeverityColor,
  SeverityLabel,
} from '@/constants/domain';
import { Spacing } from '@/constants/theme';
import { getReportById } from '@/services/reports';
import { getSelfHealResponse } from '@/services/worksite';
import type { IncidentReport } from '@/types/domain';

type LoadState =
  | { phase: 'loading' }
  | { phase: 'error' }
  | { phase: 'missing' }
  | { phase: 'ready'; report: IncidentReport };

function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleString('pt-BR');
}

export default function ConfirmationScreen() {
  const router = useRouter();
  const { reportId } = useLocalSearchParams<{ reportId: string }>();
  const [state, setState] = useState<LoadState>({ phase: 'loading' });

  useFocusEffect(
    useCallback(() => {
      let active = true;
      setState({ phase: 'loading' });
      getReportById(reportId)
        .then((report) => {
          if (!active) return;
          setState(report ? { phase: 'ready', report } : { phase: 'missing' });
        })
        .catch(() => active && setState({ phase: 'error' }));
      return () => {
        active = false;
      };
    }, [reportId]),
  );

  if (state.phase === 'loading') {
    return (
      <Screen>
        <MessageState title="Carregando ocorrência..." loading />
      </Screen>
    );
  }

  if (state.phase === 'error') {
    return (
      <Screen>
        <MessageState
          title="Falha ao carregar"
          description="Não foi possível ler a ocorrência do armazenamento local."
        />
        <Button label="Voltar ao início" onPress={() => router.replace('/')} />
      </Screen>
    );
  }

  if (state.phase === 'missing') {
    return (
      <Screen>
        <MessageState
          title="Ocorrência não encontrada"
          description="O registro pode ter sido removido do histórico."
        />
        <Button label="Voltar ao início" onPress={() => router.replace('/')} />
      </Screen>
    );
  }

  const { report } = state;

  return (
    <Screen>
      <Card style={styles.banner}>
        <ThemedText type="smallBold" style={styles.bannerTitle}>
          ✓ Ocorrência registrada
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {getSelfHealResponse(report.roverId).detail}
        </ThemedText>
      </Card>

      <View style={styles.titleRow}>
        <ThemedText type="subtitle">{report.roverName}</ThemedText>
        <Badge label={SeverityLabel[report.severity]} color={SeverityColor[report.severity]} />
      </View>

      <Card>
        <ThemedText type="smallBold">{IncidentTypeLabel[report.type]}</ThemedText>
        <ThemedText type="small">{report.description}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          Registrada em {formatDate(report.createdAt)}
        </ThemedText>
      </Card>

      <View style={styles.actions}>
        <Button label="Ver histórico" onPress={() => router.replace('/history')} />
        <Button
          label="Voltar ao início"
          variant="secondary"
          onPress={() => router.replace('/')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderColor: '#2e9e5b',
  },
  bannerTitle: {
    color: '#2e9e5b',
    fontSize: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  actions: {
    gap: Spacing.two,
  },
});
