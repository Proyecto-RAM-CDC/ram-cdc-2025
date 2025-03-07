import hasSecondarySymptom from "~/algorithms/hasSecondarySymptom";
import { typeIrasDiagnostic } from "~/algorithms/utilitiesTypes";
import { typeVisitationStringified } from "~/utilities/types";
import {
  enumCondition,
  typeFlatSymptomData,
} from "~/algorithms/utilitiesTypes";
import { ALL_IRAS_SYMPTOMS } from "~/algorithms/IRAS/utilitiesSymptoms";

const SYMPTOMS_EPOC: typeFlatSymptomData = ALL_IRAS_SYMPTOMS.CENTRO;
const SYMPTOMS_ENVIAR_SEGUNO_NIVEL: typeFlatSymptomData =
  ALL_IRAS_SYMPTOMS.ENVIAR_SEGUNO_NIVEL;

const hasExacerbacionEpocSymptoms = (
  visitation: typeVisitationStringified
): boolean => {
  return Object.values(SYMPTOMS_EPOC).some((symptom) =>
    hasSecondarySymptom(visitation, symptom, enumCondition.Iras)
  );
};

const hasSegundoNivelSymptoms = (
  visitation: typeVisitationStringified
): boolean => {
  return Object.values(SYMPTOMS_ENVIAR_SEGUNO_NIVEL).some((symptom) =>
    hasSecondarySymptom(visitation, symptom, enumCondition.Iras)
  );
};

export const utilityDiagnoseExacerbacionEpoc = (
  visitation: typeVisitationStringified,
  diagnosis: typeIrasDiagnostic
): typeIrasDiagnostic => {
  if (hasExacerbacionEpocSymptoms(visitation)) {
    diagnosis = "Exacerbación de EPOC";
  } else {
    diagnosis = null;
  }

  if (diagnosis === "Exacerbación de EPOC") {
    if (hasSegundoNivelSymptoms(visitation)) {
      diagnosis = "Exacerbación de EPOC enviar a segundo nivel";
    }
  }

  return diagnosis;
};
