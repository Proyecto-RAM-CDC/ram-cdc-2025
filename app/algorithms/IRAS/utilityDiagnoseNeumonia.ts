import hasSecondarySymptom from "~/algorithms/hasSecondarySymptom";
import { typeIrasDiagnostic } from "~/algorithms/utilitiesTypes";
import { typeVisitationStringified } from "~/utilities/types";
import { enumCondition } from "~/algorithms/utilitiesTypes";
import { ALL_IRAS_SYMPTOMS } from "~/algorithms/IRAS/utilitiesSymptoms";

const SYM_ENFERMO_CONFUSION = "El enfermo presenta confusión";
const SYM_RESPIRACION_RAPIDA =
  "Frecuencia respiratoria mayor o igual que 30 por minuto";
const SYM_TA_SISTOLICA =
  "T.A. sistólica menor que 90 mmHg o T.A. diastólica menor que 60 mmHg";
const SYM_INCAPACIDAD_ALIMENTARSE =
  "Incapacidad para alimentarse o beber al seno materno";
const SYM_CONVULSIONS = "Convulsiones, cianosis";
const SYM_LETARGIA = "Letargia o disminución del estado de despierto";
const SYM_DESNUTRICION = "Desnutrición y/o malnutrición";

const primarySymptoms = [
  ALL_IRAS_SYMPTOMS.NEUMONIA.TOS_INICIO,
  ALL_IRAS_SYMPTOMS.NEUMONIA.FIEBRE_BAJA,
  ALL_IRAS_SYMPTOMS.NEUMONIA.DISNEA,
  ALL_IRAS_SYMPTOMS.NEUMONIA.SIN_ANTE_HOSPITAL,
];

const secondarySymptoms = [
  ALL_IRAS_SYMPTOMS.NEUMONIA.SIGNO_PULMON,
  ALL_IRAS_SYMPTOMS.NEUMONIA.SIGNO_TAQUIC,
];

const countSymptoms = (
  visitation: typeVisitationStringified,
  symptoms: string[]
): number => {
  return symptoms.reduce((total, symptom) => {
    return hasSecondarySymptom(visitation, symptom, enumCondition.Iras)
      ? total + 1
      : total;
  }, 0);
};

export const utilityDiagnoseNeumonia = (
  visitation: typeVisitationStringified,
  diagnosis: typeIrasDiagnostic
): typeIrasDiagnostic => {
  const primaryCount = countSymptoms(visitation, primarySymptoms);

  if (
    primaryCount >= 2 &&
    secondarySymptoms.some((symptom) =>
      hasSecondarySymptom(visitation, symptom, enumCondition.Iras)
    )
  ) {
    diagnosis = "Neumonía adquirida en la comunidad";
  } else {
    diagnosis = "Neumonia sintomatico";
  }

  return diagnosis;
};
