import { typeAge } from "~/algorithms/utilitiesTypes";
import { typeClinicosStringified } from "~/utilities/types";
import {
  parseISO,
  differenceInYears,
  differenceInMonths,
  differenceInDays,
} from "date-fns";

const calculateAge = (props: typeClinicosStringified): typeAge => {
  if (!props.dob) {
    throw new Error("No se proporciona fecha de nacimiento.");
  }

  const birthDate = parseISO(props.dob);
  if (isNaN(birthDate.getTime())) {
    throw new Error("Fecha de nacimiento no válida.");
  }

  const today = new Date();

  const ageYears = differenceInYears(today, birthDate);
  const ageMonths = differenceInMonths(today, birthDate) % 12;
  const ageDays = differenceInDays(today, birthDate) % 30;

  return {
    years: ageYears,
    months: ageMonths,
    days: ageDays,
  };
};

export default calculateAge;
