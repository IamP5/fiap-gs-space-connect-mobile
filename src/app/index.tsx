import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { Screen } from '@/components/screen';
import { StatTile } from '@/components/stat-tile';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import {
  getNotificationPermission,
  requestNotificationPermission,
  scheduleAlert,
  type PermissionStatus,
} from '@/services/notifications';
import { listReports } from '@/services/reports';
import { getDomeProgress, getRovers, getSimulatedSwarmEvent } from '@/services/worksite';

export default function HomeScreen() {
  const router = useRouter();
  const [reportCount, setReportCount] = useState(0);
  const [permission, setPermission] = useState<PermissionStatus>('undetermined');
  const [monitorMessage, setMonitorMessage] = useState<string | null>(null);

  const rovers = getRovers();
  const activeRovers = rovers.filter((rover) => rover.status === 'ACTIVE').length;
  const domeProgress = getDomeProgress();

  // Refresh the occurrence count and notification permission every time the
  // screen regains focus so the overview reflects the current state.
  useFocusEffect(
    useCallback(() => {
      let active = true;
      listReports()
        .then((reports) => active && setReportCount(reports.length))
        .catch(() => active && setReportCount(0));
      getNotificationPermission()
        .then((status) => active && setPermission(status))
        .catch(() => active && setPermission('denied'));
      return () => {
        active = false;
      };
    }, []),
  );

  async function enableAlerts() {
    const status = await requestNotificationPermission();
    setPermission(status);
    setMonitorMessage(
      status === 'granted'
        ? 'Alertas ativados. Você será notificado quando o enxame se auto-recuperar.'
        : 'Permissão de notificações negada. Ative nas configurações para receber alertas do coordenador.',
    );
  }

  async function simulateSwarmEvent() {
    const event = getSimulatedSwarmEvent();
    const scheduled = await scheduleAlert(
      { title: event.title, body: event.body, route: '/rovers' },
      2,
    );
    setPermission(scheduled ? 'granted' : await getNotificationPermission());
    setMonitorMessage(
      scheduled
        ? 'Evento enviado — o alerta do coordenador chega em instantes.'
        : 'Ative os alertas para simular um evento do enxame.',
    );
  }

  return (
    <Screen>
      <View style={styles.hero}>
        <ThemedText type="subtitle">Central de Operações</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          Companheiro Terra do enxame que constrói a cúpula lunar. Acompanhe os rovers e
          reporte ocorrências — o canteiro se reorganiza sozinho quando um rover falha.
        </ThemedText>
      </View>

      <View style={styles.stats}>
        <StatTile value={`${domeProgress}%`} label="Cúpula concluída" />
        <StatTile value={`${activeRovers}`} label="Rovers ativos" />
        <StatTile value={`${reportCount}`} label="Ocorrências" />
      </View>

      <Card>
        <ThemedText type="smallBold">Monitor do enxame</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {permission === 'granted'
            ? 'Alertas ativos — o coordenador avisa quando um rover falha e o canteiro se auto-recupera.'
            : 'Ative os alertas para ser notificado quando o enxame se auto-recuperar.'}
        </ThemedText>
        {monitorMessage ? (
          <ThemedText
            type="small"
            style={permission === 'granted' ? styles.monitorOk : styles.monitorWarn}
          >
            {monitorMessage}
          </ThemedText>
        ) : null}
        <View style={styles.monitorActions}>
          {permission === 'granted' ? (
            <Button
              label="Simular evento do enxame"
              variant="secondary"
              onPress={simulateSwarmEvent}
            />
          ) : (
            <Button label="Ativar alertas" variant="secondary" onPress={enableAlerts} />
          )}
        </View>
      </Card>

      <Card>
        <ThemedText type="smallBold">Fluxo de operação</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          1. Consulte os rovers · 2. Reporte uma ocorrência · 3. Acompanhe a resposta do
          coordenador · 4. Revise o histórico.
        </ThemedText>
      </Card>

      <View style={styles.actions}>
        <Button label="Ver rovers" onPress={() => router.push('/rovers')} />
        <Button
          label="Reportar ocorrência"
          variant="secondary"
          onPress={() => router.push('/report')}
        />
        <Button
          label="Histórico de ocorrências"
          variant="secondary"
          onPress={() => router.push('/history')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    gap: Spacing.two,
  },
  stats: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  actions: {
    gap: Spacing.two,
  },
  monitorActions: {
    marginTop: Spacing.one,
  },
  monitorOk: {
    color: '#2e9e5b',
  },
  monitorWarn: {
    color: '#c98a16',
  },
});
