import { typeVisitationStringified } from "~/utilities/types";

export default function getAllergies(
  visitation: typeVisitationStringified
): string[] {
  const allergies: string[] = visitation.alergies;

  // Capitalize first letter of each word in the allegies array.
  for (let i = 0; i < allergies.length; i++) {
    allergies[i] = allergies[i].charAt(0).toUpperCase() + allergies[i].slice(1);
  }

  return allergies;
}
