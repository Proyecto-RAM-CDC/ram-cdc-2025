import { typeVisitationStringified } from "~/utilities/types";
import { ALL_EDAS_SYMPTOMS } from "~/algorithms/EDAS/utilitiesSymptoms";
import { ALL_IRAS_SYMPTOMS } from "~/algorithms/IRAS/utilitiesSymptoms";
import { ALL_ITS_SYMPTOMS } from "~/algorithms/ITS/utilitiesSymptoms";
import { ALL_IVU_SYMPTOMS } from "~/algorithms/IVU/utilitiesSymptoms";
import { typeSymptomsData, enumCondition } from "~/algorithms/utilitiesTypes";

export default function hasSecondarySymptom(
  visitation: typeVisitationStringified,
  target: string,
  condition: enumCondition
): boolean {
  let ALL_SYMPTOMS: typeSymptomsData;

  switch (condition) {
    case enumCondition.Iras:
      ALL_SYMPTOMS = ALL_IRAS_SYMPTOMS;
      break;
    case enumCondition.Edas:
      ALL_SYMPTOMS = ALL_EDAS_SYMPTOMS;
      break;
    case enumCondition.Its:
      ALL_SYMPTOMS = ALL_ITS_SYMPTOMS;
      break;
    case enumCondition.Ivu:
      ALL_SYMPTOMS = ALL_IVU_SYMPTOMS;
      break;
    default:
      throw new Error(`Condición no compatible: ${condition}`);
  }

  // Recursively searches for a target within the symptoms object.
  function checkSymptom(
    symptoms: typeSymptomsData | string,
    tget: string
  ): boolean {
    if (typeof symptoms === "string") {
      return symptoms.includes(tget);
    } else if (typeof symptoms === "object") {
      return Object.values(symptoms).some((value) => checkSymptom(value, tget));
    }
    return false;
  }

  // Check if the target exists within the secondary conditions
  return visitation.secondaryConditions.some(
    (secondaryCondition) =>
      checkSymptom(ALL_SYMPTOMS, secondaryCondition) &&
      secondaryCondition.includes(target)
  );
}
