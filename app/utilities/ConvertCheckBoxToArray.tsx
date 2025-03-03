type NewSecondaryCondition = {
  [key: string]: string;
};

const convertCheckboxValuesToArray = (
  newData: NewSecondaryCondition
): string[] => {
  // Extract values from the newData object and remove duplicates.
  const uniqueValues = Array.from(new Set(Object.values(newData)));

  return uniqueValues;
};

export default convertCheckboxValuesToArray;
