import hasSecondarySymptom from "~/algorithms/hasSecondarySymptom";
import { typeIrasDiagnostic } from "~/algorithms/utilitiesTypes";
import { typeVisitationStringified } from "~/utilities/types";
import {
  enumCondition,
  typeFlatSymptomData,
} from "~/algorithms/utilitiesTypes";
import { ALL_IRAS_SYMPTOMS } from "~/algorithms/IRAS/utilitiesSymptoms";

const otitisSecondarySymptoms = [
  ALL_IRAS_SYMPTOMS.OTITIS_MEDIA_AGUDA.DOLOR_OTICO_AGUDO,
  ALL_IRAS_SYMPTOMS.OTITIS_MEDIA_AGUDA.SECRECION_PURU_OIDO,
];

const otitisAntibioticoSymptoms = [
  ALL_IRAS_SYMPTOMS.OTITIS_MEDIA_AGUDA.FIEBRE_ALTAS_OMA,
  ALL_IRAS_SYMPTOMS.OTITIS_MEDIA_AGUDA.DOLOR_OTICO_PERS,
];

const hasSymptoms = (
  visitation: typeVisitationStringified,
  symptoms: string[]
): boolean => {
  return symptoms.some((symptom) =>
    hasSecondarySymptom(visitation, symptom, enumCondition.Iras)
  );
};

export const utilityDiagnoseOtitisMediaAguda = (
  visitation: typeVisitationStringified,
  diagnosis: typeIrasDiagnostic
): typeIrasDiagnostic => {
  const hasPersistentOticoPain = hasSecondarySymptom(
    visitation,
    ALL_IRAS_SYMPTOMS.OTITIS_MEDIA_AGUDA.DOLOR_OTICO_PERS,
    enumCondition.Iras
  );
  const hasAcuteOticoPain = hasSecondarySymptom(
    visitation,
    ALL_IRAS_SYMPTOMS.OTITIS_MEDIA_AGUDA.DOLOR_OTICO_AGUDO,
    enumCondition.Iras
  );

  const otitis_basic =
    hasPersistentOticoPain && !hasAcuteOticoPain
      ? true
      : hasSymptoms(visitation, otitisSecondarySymptoms);

  if (otitis_basic && hasSymptoms(visitation, otitisAntibioticoSymptoms)) {
    diagnosis = "OMA antibiotico";
  } else {
    diagnosis = "OMA sintomatico";
  }

  return diagnosis;
};
