import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { Field } from '@/components/field';
import { OptionSelector } from '@/components/option-selector';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import {
  INCIDENT_TYPES,
  IncidentTypeLabel,
  SEVERITIES,
  SeverityLabel,
} from '@/constants/domain';
import { Spacing } from '@/constants/theme';
import { saveReport } from '@/services/reports';
import { formatGeoPoint, getCurrentLocation } from '@/services/location';
import { getRoverById, getRovers } from '@/services/worksite';
import type { GeoPoint, IncidentType, Severity } from '@/types/domain';

const DESCRIPTION_MIN = 10;

type FormErrors = {
  roverId?: string;
  type?: string;
  severity?: string;
  description?: string;
};

export default function ReportScreen() {
  const router = useRouter();
  // Pre-select the rover when arriving from a rover detail screen.
  const { roverId: initialRoverId } = useLocalSearchParams<{ roverId?: string }>();

  const rovers = getRovers();
  const [roverId, setRoverId] = useState<string | null>(
    initialRoverId && getRoverById(initialRoverId) ? initialRoverId : null,
  );
  const [type, setType] = useState<IncidentType | null>(null);
  const [severity, setSeverity] = useState<Severity | null>(null);
  const [description, setDescription] = useState('');

  const [location, setLocation] = useState<GeoPoint | null>(null);
  const [locationMessage, setLocationMessage] = useState<string | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  async function captureLocation() {
    setLocationLoading(true);
    setLocationMessage(null);
    const result = await getCurrentLocation();
    if (result.status === 'ok') {
      setLocation(result.point);
    } else if (result.status === 'denied') {
      setLocation(null);
      setLocationMessage('Permissão de localização negada. A ocorrência pode ser enviada sem GPS.');
    } else {
      setLocation(null);
      setLocationMessage(`Não foi possível obter a localização: ${result.message}`);
    }
    setLocationLoading(false);
  }

  function validate(): boolean {
    const next: FormErrors = {};
    if (!roverId) next.roverId = 'Selecione o rover afetado.';
    if (!type) next.type = 'Selecione o tipo de ocorrência.';
    if (!severity) next.severity = 'Selecione a severidade.';
    if (!description.trim()) {
      next.description = 'Descreva a ocorrência.';
    } else if (description.trim().length < DESCRIPTION_MIN) {
      next.description = `A descrição deve ter ao menos ${DESCRIPTION_MIN} caracteres.`;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    const rover = getRoverById(roverId!);
    if (!rover) {
      setErrors({ roverId: 'Rover não encontrado. Selecione novamente.' });
      return;
    }
    try {
      setSubmitting(true);
      const report = await saveReport({
        roverId: rover.id,
        roverName: rover.name,
        type: type!,
        severity: severity!,
        description: description.trim(),
        location,
      });
      router.replace(`/confirmation?reportId=${report.id}`);
    } catch {
      setSubmitting(false);
      setErrors({ description: 'Falha ao salvar a ocorrência. Tente novamente.' });
    }
  }

  return (
    <Screen>
      <ThemedText type="small" themeColor="textSecondary">
        Registre uma ocorrência observada na telemetria. Campos obrigatórios são validados
        antes do envio.
      </ThemedText>

      <OptionSelector
        label="Rover afetado"
        options={rovers.map((rover) => rover.id)}
        value={roverId}
        onChange={setRoverId}
        getLabel={(id) => getRoverById(id)?.name ?? id}
        error={errors.roverId}
      />

      <OptionSelector
        label="Tipo de ocorrência"
        options={INCIDENT_TYPES}
        value={type}
        onChange={setType}
        getLabel={(option) => IncidentTypeLabel[option]}
        error={errors.type}
      />

      <OptionSelector
        label="Severidade"
        options={SEVERITIES}
        value={severity}
        onChange={setSeverity}
        getLabel={(option) => SeverityLabel[option]}
        error={errors.severity}
      />

      <Field
        label="Descrição"
        value={description}
        onChangeText={setDescription}
        placeholder="O que foi observado?"
        multiline
        error={errors.description}
      />

      <Card>
        <ThemedText type="smallBold">Localização da estação (GPS)</ThemedText>
        {location ? (
          <ThemedText type="small" themeColor="textSecondary">
            Capturada: {formatGeoPoint(location)}
          </ThemedText>
        ) : (
          <ThemedText type="small" themeColor="textSecondary">
            Opcional — anexa as coordenadas da estação que registrou a ocorrência.
          </ThemedText>
        )}
        {locationMessage ? (
          <ThemedText type="small" style={styles.locationWarning}>
            {locationMessage}
          </ThemedText>
        ) : null}
        <View style={styles.locationButton}>
          <Button
            label={location ? 'Atualizar localização' : 'Capturar localização'}
            variant="secondary"
            loading={locationLoading}
            onPress={captureLocation}
          />
        </View>
      </Card>

      <Button label="Registrar ocorrência" loading={submitting} onPress={handleSubmit} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  locationWarning: {
    color: '#c98a16',
  },
  locationButton: {
    marginTop: Spacing.one,
  },
});
