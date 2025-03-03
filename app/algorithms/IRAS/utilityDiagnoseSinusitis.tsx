import hasSecondarySymptom from "~/algorithms/hasSecondarySymptom";
import { typeIrasDiagnostic } from "~/algorithms/utilitiesTypes";
import { typeVisitationStringified } from "~/utilities/types";
import { enumCondition } from "~/algorithms/utilitiesTypes";
import { ALL_IRAS_SYMPTOMS } from "~/algorithms/IRAS/utilitiesSymptoms";

const primarySymptoms = [
  ALL_IRAS_SYMPTOMS.SINUSITIS_ANTIBIOTICO.FIEBRE_ALTAS_SINUSITIS,
  ALL_IRAS_SYMPTOMS.SINUSITIS_ANTIBIOTICO.SINUSITIS_NO_MEJ,
  ALL_IRAS_SYMPTOMS.SINUSITIS_ANTIBIOTICO.NASAL_PURU,
  ALL_IRAS_SYMPTOMS.SINUSITIS_ANTIBIOTICO.DOLOR_FACIAL_MAS,
];

const secondarySymptoms = [
  ALL_IRAS_SYMPTOMS.SINUSITIS_SINTOMATICO.DOLOR_FACIAL_MENO,
  ALL_IRAS_SYMPTOMS.SINUSITIS_SINTOMATICO.SECRECION_PURU_NASAL,
  ALL_IRAS_SYMPTOMS.SINUSITIS_SINTOMATICO.SENSACION_FACIAL,
  ALL_IRAS_SYMPTOMS.SINUSITIS_SINTOMATICO.DOLOR_AUMENTA,
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

const hasAnySymptom = (
  visitation: typeVisitationStringified,
  symptoms: string[]
): boolean => {
  return symptoms.some((symptom) =>
    hasSecondarySymptom(visitation, symptom, enumCondition.Iras)
  );
};

export const utilityDiagnoseSinusitis = (
  visitation: typeVisitationStringified,
  diagnosis: typeIrasDiagnostic
): typeIrasDiagnostic => {
  const primaryCount = countSymptoms(visitation, primarySymptoms);

  if (primaryCount >= 1) {
    diagnosis = "Sinusitis antibiotico";
  } else if (hasAnySymptom(visitation, secondarySymptoms)) {
    diagnosis = "Sinusitis sintomatico";
  }

  return diagnosis;
};
