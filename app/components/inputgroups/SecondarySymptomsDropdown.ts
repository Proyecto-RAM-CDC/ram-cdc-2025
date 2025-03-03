/**
 * @typedef {object} SymptomOption
 * @property {string} id - The id of the symptom.
 * @property {string} primary - The primary symptom.
 * @property {string[]} additional - An array of additional symptoms.
 * @property {string[]} additional_details - An array of additional details.
 * @property {boolean[]} checked - An array of booleans, each of which corresponds to a particular additional symptom. Indicates whether that additional symptom has been selected or not.
 */
type SymptomOption = {
  id: string;
  primary: string;
  additional: string[];
  additional_details: string[];
  checked: boolean[];
};

const makeOptions = (
  ids: number[],
  symptoms: SymptomOption
): { id: number; value: string; label: string }[] => {
  const options: { id: number; value: string; label: string }[] = [];
  ids.forEach((id) => {
    options.push({
      id: id,
      value: symptoms.additional[id],
      label: symptoms.additional[id],
    });
  });
  return options;
};

/** @function makeGroupITS
 * @description Defines two arrays listing (1) the secondary symptoms associated with your selected primary condition
 * and (2) the secondary symptoms that have already been selected. The first maintains a list of the
 * secondary symptoms available The second keeps track of which of those are currently selected.
 * Just note that you don't consider all the available secondary symptoms at once - instead
 * they are split into subgroups based on what makes sense for the type of patient, or condition, etc.
 * And this also ensures you don't have a single giant dropdown menu with all possible secondary symptoms
 * that the docter would have to search over.
 * @param {number[]} ids - The id's corresponding to a subgroup of secondary symptoms.
 * @param {Object} selectedSymptoms - The object containing the secondary symptoms that correspond to the selected primary condition.
 * @param {boolean[]} checkedSecondarySymptoms - An array of booleans, each of which corresponds to a particular secondary symptom. Indicates whether that secondary symptom has been selected or not.
 * @returns {Object} - An object containing two arrays: 'availableSecondarySymptoms' and 'initialOptions'.
 * @property {Object[]} availableSecondarySymptoms - An array of objects containing the id, value, and label of each secondary symptom.
 * @property {Object[]} initialOptions - An array of objects containing the id, value, and label of each secondary symptom that has already been selected.
 */
export default function makeGroupITS(
  ids: number[],
  selectedSymptoms: SymptomOption,
  checkedSecondarySymptoms: boolean[]
) {
  // Ensures you're not dealing with all selected secondary symptoms - instead that you're only
  // dealing with a subset of them.
  const availableSecondarySymptoms: {
    id: number;
    value: string;
    label: string;
  }[] = makeOptions(ids, selectedSymptoms);

  // Extract the indices of the secondary symptoms that have already been checked as 'true'.
  // These identify the secondary symptoms that have already been selected from the dropdown menu.
  // Again, only dealing with a subset of all selected secondary symptoms.
  const checkedTrue: number[] = [];
  checkedSecondarySymptoms.forEach((checked, index) => {
    if (checked && ids.includes(index)) {
      checkedTrue.push(index);
    }
  });

  const initialOptions = makeOptions(checkedTrue, selectedSymptoms);

  return {
    availableSecondarySymptoms,
    initialOptions,
  };
}
