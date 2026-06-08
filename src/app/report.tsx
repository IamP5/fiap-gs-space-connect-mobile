import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';

import { Button } from '@/components/button';
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
import { scheduleAlert } from '@/services/notifications';
import { saveReport } from '@/services/reports';
import { getRoverById, getRovers, getSelfHealResponse } from '@/services/worksite';
import type { IncidentType, Severity } from '@/types/domain';

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

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

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
      });
      // Push the coordinator's self-heal response back to the operator's phone.
      // Fire-and-forget: if notifications are denied, the confirmation screen
      // still shows the same response on-screen.
      const response = getSelfHealResponse(rover.id);
      void scheduleAlert({
        title: '🛰️ Resposta do coordenador',
        body: response.headline,
        route: `/confirmation?reportId=${report.id}`,
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

      <ThemedText type="small" themeColor="textSecondary">
        Ao registrar, o coordenador responde com a ação de auto-recuperação do canteiro —
        você recebe um alerta no dispositivo.
      </ThemedText>

      <Button label="Registrar ocorrência" loading={submitting} onPress={handleSubmit} />
    </Screen>
  );
}
