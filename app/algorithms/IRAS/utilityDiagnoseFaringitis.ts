import hasSecondarySymptom from "~/algorithms/hasSecondarySymptom";
import { typeIrasDiagnostic } from "~/algorithms/utilitiesTypes";
import { typeVisitationStringified } from "~/utilities/types";
import { enumCondition } from "~/algorithms/utilitiesTypes";
import { ALL_IRAS_SYMPTOMS } from "~/algorithms/IRAS/utilitiesSymptoms";

const primarySymptoms = [
  ALL_IRAS_SYMPTOMS.FARINGITIS.FIEBRE_ALTAS_FARINGITIS,
  ALL_IRAS_SYMPTOMS.FARINGITIS.ADENOPATIA,
  ALL_IRAS_SYMPTOMS.FARINGITIS.EXUDADO,
  ALL_IRAS_SYMPTOMS.FARINGITIS.AUSENCIA_TOS,
];

const secondarySymptoms = [
  ALL_IRAS_SYMPTOMS.FARINGITIS.DOLOR_FARINGEO,
  ALL_IRAS_SYMPTOMS.FARINGITIS.ERITEMA_FARINGEO,
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

export const utilityDiagnoseFaringitis = (
  visitation: typeVisitationStringified,
  diagnosis: typeIrasDiagnostic
): typeIrasDiagnostic => {
  const primaryCount = countSymptoms(visitation, primarySymptoms);

  if (primaryCount >= 3) {
    diagnosis = "Faringitis antibiotico";
  } else if (
    primaryCount >= 1 ||
    secondarySymptoms.some((symptom) =>
      hasSecondarySymptom(visitation, symptom, enumCondition.Iras)
    )
  ) {
    diagnosis = "Faringitis sintomatico";
  }

  return diagnosis;
};
