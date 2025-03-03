import { ClinicalDataType } from "~/utilities/types";

export function shouldInvolveContacto(clinicalData: ClinicalDataType): boolean {
  const keys = [
    "homeEmail",
    "homeCel",
    "homeDireccion",
    "homeExtNum",
    "homeIntNum",
    "homeCity",
    "homeState",
    "homePostalCode",
    "homeCountry",
    "lugarOrigenEstado",
    "lugarOrigenCiudad",
  ];

  return keys.some((key) => key in clinicalData);
}

export function shouldInvolveOtros(clinicalData: ClinicalDataType): boolean {
  const keys = [
    "nombreOtros",
    "apellidoPaterno",
    "apellidoMaterno",
    "estadoCivil",
    "nivelEstudios",
  ];

  return keys.some((key) => key in clinicalData);
}

export function shouldInvolveOcupacion(
  clinicalData: ClinicalDataType
): boolean {
  const keys = [
    "ocupacion",
    "paisTrabajo",
    "direccionTrabajo",
    "ciudadTrabajo",
    "estadoTrabajo",
  ];

  return keys.some((key) => key in clinicalData);
}
