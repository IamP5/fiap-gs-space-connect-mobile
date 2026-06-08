import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { Screen } from '@/components/screen';
import { StatTile } from '@/components/stat-tile';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { listReports } from '@/services/reports';
import { getDomeProgress, getRovers } from '@/services/worksite';

export default function HomeScreen() {
  const router = useRouter();
  const [reportCount, setReportCount] = useState(0);

  const rovers = getRovers();
  const activeRovers = rovers.filter((rover) => rover.status === 'ACTIVE').length;
  const domeProgress = getDomeProgress();

  // Refresh the occurrence count every time the screen regains focus so the
  // overview reflects reports filed during the session.
  useFocusEffect(
    useCallback(() => {
      let active = true;
      listReports()
        .then((reports) => active && setReportCount(reports.length))
        .catch(() => active && setReportCount(0));
      return () => {
        active = false;
      };
    }, []),
  );

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
});
