import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Badge } from '@/components/badge';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { MessageState } from '@/components/message-state';
import { Screen } from '@/components/screen';
import { SelfHealPulse } from '@/components/self-heal-pulse';
import { ThemedText } from '@/components/themed-text';
import { IncidentTypeLabel, SeverityLabel } from '@/constants/domain';
import { Spacing } from '@/constants/theme';
import { useDomainColors } from '@/hooks/use-domain-colors';
import { getReportById } from '@/services/reports';
import { getSelfHealResponse } from '@/services/worksite';
import type { IncidentReport } from '@/types/domain';

type LoadState =
  | { phase: 'loading' }
  | { phase: 'error' }
  | { phase: 'missing' }
  | { phase: 'ready'; report: IncidentReport };

// Hoisted: building an Intl formatter parses locale data, so create it once at
// module scope instead of per render (js-hoist-intl).
const dateTimeFormatter = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
});

function formatDate(iso: string): string {
  return dateTimeFormatter.format(new Date(iso));
}

export default function ConfirmationScreen() {
  const router = useRouter();
  const { reportId } = useLocalSearchParams<{ reportId: string }>();
  const { severity } = useDomainColors();
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
      <View style={styles.bannerWrap}>
        <Card variant="armed">
          <ThemedText type="eyebrow" themeColor="accent" style={styles.bannerTitle}>
            ✓ Ocorrência registrada
          </ThemedText>
          <ThemedText selectable type="lead" themeColor="inkSoft">
            {getSelfHealResponse(report.roverId).detail}
          </ThemedText>
        </Card>
        <SelfHealPulse />
      </View>

      <View style={styles.titleRow}>
        <ThemedText type="subtitle">{report.roverName}</ThemedText>
        <Badge label={SeverityLabel[report.severity]} color={severity[report.severity]} />
      </View>

      <Card>
        <ThemedText type="eyebrow" themeColor="inkMute">
          {IncidentTypeLabel[report.type]}
        </ThemedText>
        <ThemedText selectable type="small">{report.description}</ThemedText>
        <ThemedText type="data" themeColor="inkMute">
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
  bannerWrap: {
    position: 'relative',
  },
  bannerTitle: {
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
