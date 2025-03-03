import hasSecondarySymptom from "~/algorithms/hasSecondarySymptom";
import { typeIrasDiagnostic } from "~/algorithms/utilitiesTypes";
import { typeVisitationStringified } from "~/utilities/types";
import {
  enumCondition,
  typeFlatSymptomData,
} from "~/algorithms/utilitiesTypes";
import { ALL_IRAS_SYMPTOMS } from "~/algorithms/IRAS/utilitiesSymptoms";

const SYMPTOMS: typeFlatSymptomData = ALL_IRAS_SYMPTOMS.BRONCHITIS;

const hasBronquitisSymptoms = (
  visitation: typeVisitationStringified
): boolean => {
  console.log(
    "Checking for Bronquitis Symptoms in visitation.secondaryConditions:",
    visitation.secondaryConditions
  );
  return Object.values(SYMPTOMS).some((symptom) =>
    hasSecondarySymptom(visitation, symptom, enumCondition.Iras)
  );
};

export const utilityDiagnoseBronquitis = (
  visitation: typeVisitationStringified,
  diagnosis: typeIrasDiagnostic
): typeIrasDiagnostic => {
  if (hasBronquitisSymptoms(visitation)) {
    diagnosis = "Bronquitis antibiotico";
  } else {
    diagnosis = null;
  }

  console.log("utilityDiagnoseBronquitis diagnosis", diagnosis);

  return diagnosis;
};
