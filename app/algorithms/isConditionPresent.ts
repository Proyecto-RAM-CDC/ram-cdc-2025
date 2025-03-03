import { typeVisitationStringified } from "~/utilities/types";

export default function isConditionPresent(
  visitation: typeVisitationStringified,
  target: string
): boolean {
  // The 'isConditionPresent' function checks if an existing condition string ('target') can be found
  // in the 'existingConditions' string array of the 'visitation' object.
  // These correspond to the "name" parameter from form elements in "NewClinicos.tsx".
  // See CSS id "factoresDeRiesgo".
  const item = visitation.existingConditions.some((element) =>
    element.includes(target)
  );

  return item;
}
