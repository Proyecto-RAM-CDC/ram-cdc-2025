import { useState, useEffect } from "react";
import {
  typeClinicosStringified,
  ContactoObjectStringify,
  OtrosObjectStringify,
  OcupacionObjectStringify,
  typeVisitationStringified,
} from "~/utilities/types";
import {
  enumAllergies,
  enumRiskFactors,
  enumGenero,
} from "~/algorithms/utilitiesTypes";
import { list_of_countries } from "~/utilities/countries";

interface IProps {
  data: string | null;
}

const checkSelection = (
  country: string,
  visitationObject: typeVisitationStringified | null
): boolean => {
  if (visitationObject === null) return false;
  return visitationObject.countriesMigration.includes(country);
};

const NewDatosClinicos: React.FC<IProps> = (props) => {
  const [isMigrant, setIsMigrant] = useState(false);

  const handleMigrantChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsMigrant(event.target.value === "Sí");
  };

  const dataObject: {
    createdClinicosObject: typeClinicosStringified;
    createdContactosObject: ContactoObjectStringify;
    createdOtrosObject: OtrosObjectStringify;
    createdOcupacionObject: OcupacionObjectStringify;
    createdVisitationObject: typeVisitationStringified;
  } | null = props.data ? JSON.parse(props.data) : null;

  let clinicosObject: typeClinicosStringified | null = dataObject
    ? dataObject.createdClinicosObject
    : null;
  const visitationObject: typeVisitationStringified | null = dataObject
    ? dataObject.createdVisitationObject
    : null;

  useEffect(() => {
    if (visitationObject === null) {
      setIsMigrant(false);
    }
  }, [visitationObject]);

  return (
    <div className="p-4 text-primary bg-primary-content">
      <div className="grid grid-cols-1 gap-y-4 sm:gap-x-4 sm:gap-y-6 sm:grid-cols-2 md:max-w-3xl md:gap-x-3 md:gap-y-6 md:grid-cols-6 xl:max-w-5xl">
        <div className="md:col-span-6 xl:col-span-3 xl:col-start-1">
          <label
            className="block text-sm sm:text-base font-medium leading-6"
            htmlFor="dob"
          >
            Fecha de nacimiento
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            min="1900-01-01"
            max={new Date().toISOString().slice(0, 10)}
            required
            defaultValue={
              clinicosObject?.dob
                ? new Date(clinicosObject.dob).toISOString().slice(0, 10)
                : ""
            }
            className="md:mt-1 input input-bordered input-info rounded w-full shadow-sm text-xs sm:text-sm font-medium sm:leading-6"
          />
        </div>

        <div
          id="sexonacer"
          className="md:col-span-6 xl:col-span-3 xl:col-start-4"
        >
          <label
            htmlFor="sexonacer"
            className="block text-sm sm:text-base font-medium leading-6"
          >
            Sexo al nacer
          </label>
          <div className="md:mt-1">
            <select
              id="sexonacer"
              name="sexonacer"
              required
              defaultValue={clinicosObject?.sexonacer || ""}
              className="input input-bordered input-info rounded w-full py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium"
            >
              <option>Seleccione una opción</option>
              <option>Hombre</option>
              <option>Mujer</option>
              <option>Intersex</option>
              <option>Indeterminado</option>
              <option>Prefiere no decir</option>
            </select>
          </div>
        </div>

        <div className="md:col-span-6 xl:col-span-3 xl:col-start-1">
          <label
            htmlFor="curp"
            className="block text-sm sm:text-base font-medium leading-6"
          >
            CURP
          </label>
          <div className="md:mt-1">
            <input
              type="text"
              name="curp"
              id="curp"
              required
              defaultValue={clinicosObject?.curp || ""}
              className="input input-bordered input-info rounded w-full py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium"
            />
            <p className="text-xs italic">
              El CURP tiene exactamente 18 caracteres.
            </p>
          </div>
        </div>

        <div className="md:col-span-6 xl:col-span-3 xl:col-start-4">
          <label
            htmlFor="genero"
            className="block text-sm sm:text-base font-medium leading-6"
          >
            Identificación de género
          </label>
          <div className="md:mt-1">
            <select
              id="genero"
              name="genero"
              required
              defaultValue={visitationObject?.genero || ""}
              className="input input-bordered input-info rounded w-full py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium"
            >
              <option>Seleccione una opción</option>
              <option>{enumGenero.HombreCisgenero}</option>
              <option>{enumGenero.MujerCisgenero}</option>
              <option>{enumGenero.HombreTransgenero}</option>
              <option>{enumGenero.MujerTransgenero}</option>
              <option>{enumGenero.Queer}</option>
              <option>{enumGenero.PersonaNoBinaria}</option>
              <option>{enumGenero.OtraIdentidadGenero}</option>
              <option>{enumGenero.PrefiereNoDecir}</option>
            </select>
          </div>
        </div>

        <div className="md:col-span-3">
          <label
            htmlFor="peso"
            className="block text-sm sm:text-base font-medium leading-6"
          >
            Peso (kg)
          </label>
          <div className="md:mt-1">
            <input
              type="number"
              name="peso"
              id="peso"
              step="0.01"
              required
              defaultValue={visitationObject?.peso ? visitationObject.peso : 0}
              className="input input-bordered input-info rounded w-full py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium"
            />
            <p className="text-xs italic">
              Mayor o igual a 0.4 kg (en incrementos de 0.01 kg.).
            </p>
          </div>
        </div>

        <div className="md:col-span-3">
          <label
            htmlFor="talla"
            className="block text-sm sm:text-base font-medium leading-6"
          >
            Talla (cm)
          </label>
          <div className="md:mt-1">
            <input
              type="number"
              name="talla"
              id="talla"
              step="1"
              required
              defaultValue={
                visitationObject?.talla ? visitationObject.talla : 0
              }
              className="input input-bordered input-info rounded w-full py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium"
            />
            <p className="text-xs italic">
              Mayor o igual a 15 cm (en incrementos de 1 cm).
            </p>
          </div>
        </div>

        <div
          id="factoresDeRiesgo"
          className="sm:col-span-2 md:col-span-5 md:col-start-2 xl:col-span-3 xl:col-start-1"
        >
          <legend className="block leading-6 text-sm sm:text-base font-medium">
            ¿Padece alguna de las siguentes condiciones?
          </legend>
          <div className="md:mt-2">
            <input
              id="diabetes"
              name="diabetes"
              type="checkbox"
              defaultChecked={
                dataObject !== null &&
                visitationObject?.existingConditions?.includes(
                  enumRiskFactors.Diabetes
                )
              }
              className="checkbox checkbox-xs checkbox-info rounded-none"
            />
            <label
              htmlFor="diabetes"
              className="ml-2 text-xs sm:text-sm font-medium"
            >
              {enumRiskFactors.Diabetes}
            </label>
          </div>
          <div className="mt-2">
            <input
              id="inmunosupresion"
              name="inmunosupresion"
              type="checkbox"
              defaultChecked={
                dataObject !== null &&
                visitationObject?.existingConditions?.includes(
                  enumRiskFactors.Inmunosupresion
                )
              }
              className="checkbox checkbox-xs checkbox-info rounded-none"
            />
            <label
              htmlFor="inmunosupresion"
              className="ml-2 text-xs sm:text-sm font-medium"
            >
              {enumRiskFactors.Inmunosupresion}
            </label>
          </div>
          <div className="mt-2">
            <input
              id="cardiovasculares"
              name="cardiovasculares"
              type="checkbox"
              defaultChecked={
                dataObject !== null &&
                visitationObject?.existingConditions?.includes(
                  enumRiskFactors.Cardiovasculares
                )
              }
              className="checkbox checkbox-xs checkbox-info rounded-none"
            />
            <label
              htmlFor="cardiovasculares"
              className="ml-2 text-xs sm:text-sm font-medium"
            >
              {enumRiskFactors.Cardiovasculares}
            </label>
          </div>
          <div className="mt-2">
            <input
              id="hasRenalIssues"
              name="hasRenalIssues"
              type="checkbox"
              defaultChecked={
                dataObject !== null &&
                visitationObject?.existingConditions?.includes(
                  enumRiskFactors.HasRenalIssues
                )
              }
              className="checkbox checkbox-xs checkbox-info rounded-none"
            />
            <label
              htmlFor="hasRenalIssues"
              className="ml-2 text-xs sm:text-sm font-medium"
            >
              {enumRiskFactors.HasRenalIssues}
            </label>
          </div>
          <div className="mt-2">
            <input
              id="hepaticos"
              name="hepaticos"
              type="checkbox"
              defaultChecked={
                dataObject !== null &&
                visitationObject?.existingConditions?.includes(
                  enumRiskFactors.Hepaticos
                )
              }
              className="checkbox checkbox-xs checkbox-info rounded-none"
            />
            <label
              htmlFor="hepaticos"
              className="ml-2 text-xs sm:text-sm font-medium"
            >
              {enumRiskFactors.Hepaticos}
            </label>
          </div>
          <div className="mt-2">
            <input
              id="embarazo"
              name="embarazo"
              type="checkbox"
              defaultChecked={
                dataObject !== null &&
                visitationObject?.existingConditions?.includes(
                  enumRiskFactors.Embarazo
                )
              }
              className="checkbox checkbox-xs checkbox-info rounded-none"
            />
            <label
              htmlFor="embarazo"
              className="ml-2 text-xs sm:text-sm font-medium"
            >
              {enumRiskFactors.Embarazo}
            </label>
          </div>
        </div>

        <div
          id="alergias"
          className="sm:col-span-2 md:col-span-4 md:col-start-2 xl:col-span-3 xl:col-start-4"
        >
          <legend className="block leading-6 text-sm sm:text-base font-medium">
            ¿Alguna alergia?
          </legend>
          <div className="md:mt-2">
            <input
              id="penicilinas"
              name="penicilinas"
              type="checkbox"
              defaultChecked={
                dataObject !== null &&
                visitationObject?.alergies.includes(enumAllergies.Penicilinas)
              }
              className="checkbox checkbox-xs checkbox-info rounded-none"
            />
            <label
              htmlFor="penicilinas"
              className="ml-2 text-xs sm:text-sm font-medium"
            >
              <span className="font-bold underline">
                {enumAllergies.Penicilinas}
              </span>
              <div className="italic">(Amoxicilina, Ampicilina)</div>
            </label>
          </div>
          <div className="mt-2">
            <input
              id="quinolonas"
              name="quinolonas"
              type="checkbox"
              defaultChecked={
                dataObject !== null &&
                visitationObject?.alergies.includes(enumAllergies.Quinolonas)
              }
              className="checkbox checkbox-xs checkbox-info rounded-none"
            />
            <label
              htmlFor="quinolonas"
              className="ml-2 text-xs sm:text-sm font-medium"
            >
              <span className="font-bold underline">
                {enumAllergies.Quinolonas}
              </span>
              <div className="italic">
                (Ciprofloxacino, Levofloxacino, Moxifloxacino)
              </div>
            </label>
          </div>
          <div className="mt-2">
            <input
              id="macrolidos"
              name="macrolidos"
              type="checkbox"
              defaultChecked={
                dataObject !== null &&
                visitationObject?.alergies.includes(enumAllergies.Macrolidos)
              }
              className="checkbox checkbox-xs checkbox-info rounded-none"
            />
            <label
              htmlFor="macrolidos"
              className="ml-2 text-xs sm:text-sm font-medium"
            >
              <span className="font-bold underline">
                {enumAllergies.Macrolidos}
              </span>
              <div className="italic">
                (Azitromicina, Claritromicina, Eritromicina)
              </div>
            </label>
          </div>
          <div className="mt-2">
            <input
              id="cefalosporinas"
              name="cefalosporinas"
              type="checkbox"
              defaultChecked={
                dataObject !== null &&
                visitationObject?.alergies.includes(
                  enumAllergies.Cefalosporinas
                )
              }
              className="checkbox checkbox-xs checkbox-info rounded-none"
            />
            <label
              htmlFor="cefalosporinas"
              className="ml-2 text-xs sm:text-sm font-medium"
            >
              <span className="font-bold underline">
                {enumAllergies.Cefalosporinas}
              </span>
              <div className="italic">
                (Cefaclor, Cefalexina, Cefuroxime, Ceftriaxona)
              </div>
            </label>
          </div>
          <div className="mt-2">
            <input
              id="tetraciclinas"
              name="tetraciclinas"
              type="checkbox"
              defaultChecked={
                dataObject !== null &&
                visitationObject?.alergies.includes(enumAllergies.Tetraciclinas)
              }
              className="checkbox checkbox-xs checkbox-info rounded-none"
            />
            <label
              htmlFor="tetraciclinas"
              className="ml-2 text-xs sm:text-sm font-medium"
            >
              <span className="font-bold underline">
                {enumAllergies.Tetraciclinas}
              </span>
              <div className="italic">(Doxiciclina, Minociclina)</div>
            </label>
          </div>
          <div className="mt-2">
            <input
              id="sulfonamidas"
              name="sulfonamidas"
              type="checkbox"
              defaultChecked={
                dataObject !== null &&
                visitationObject?.alergies.includes(enumAllergies.Sulfonamidas)
              }
              className="checkbox checkbox-xs checkbox-info rounded-none"
            />
            <label
              htmlFor="sulfonamidas"
              className="ml-2 text-xs sm:text-sm font-medium"
            >
              <span className="font-bold underline">
                {enumAllergies.Sulfonamidas}
              </span>
              <div className="italic">(Sulfametoxazol, Trimetoprim)</div>
            </label>
          </div>
          <div className="mt-2">
            <input
              id="aminoglucosidos"
              name="aminoglucosidos"
              type="checkbox"
              defaultChecked={
                dataObject !== null &&
                visitationObject?.alergies.includes(
                  enumAllergies.Aminoglucosidos
                )
              }
              className="checkbox checkbox-xs checkbox-info rounded-none"
            />
            <label
              htmlFor="aminoglucosidos"
              className="ml-2 text-xs sm:text-sm font-medium"
            >
              <span className="font-bold underline">
                {enumAllergies.Aminoglucosidos}
              </span>
              <div className="italic">
                (Gentamicina, Tobramicina, Amikacina)
              </div>
            </label>
          </div>
        </div>

        <div
          id="hospitalizado"
          className="sm:col-span-2 md:col-span-6 xl:col-span-3 xl:col-start-1"
        >
          <label
            htmlFor="hospitalized"
            className="block text-sm sm:text-base font-medium leading-6"
          >
            ¿Fue hospitalizado en los últimos 3 meses?
          </label>
          <div className="md:mt-1">
            <select
              id="hospitalized"
              name="hospitalized"
              required
              defaultValue={
                visitationObject === null ||
                visitationObject.hospitalized === undefined
                  ? "Seleccione una opción"
                  : visitationObject.hospitalized === true
                  ? "Sí"
                  : "No"
              }
              className="input input-bordered input-info rounded w-full py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium"
            >
              <option>Seleccione una opción</option>
              <option>Sí</option>
              <option>No</option>
            </select>
          </div>
        </div>

        <div
          id="medicamento"
          className="sm:col-span-2 md:col-span-6 xl:col-span-3 xl:col-start-4"
        >
          <label
            htmlFor="takenMedication"
            className="block text-sm sm:text-base font-medium leading-6"
          >
            ¿Ha tomado antibióticos en los últimos 3 meses?
          </label>
          <div className="md:mt-1">
            <select
              id="takenMedication"
              name="takenMedication"
              required
              defaultValue={
                visitationObject === null ||
                visitationObject.takenMedication === undefined
                  ? "Seleccione una opción"
                  : visitationObject.takenMedication === true
                  ? "Sí"
                  : "No"
              }
              className="input input-bordered input-info rounded w-full py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium"
            >
              <option>Seleccione una opción</option>
              <option>Sí</option>
              <option>No</option>
            </select>
          </div>
        </div>

        <div
          id="discapacidad"
          className="sm:col-span-2 md:col-span-6 xl:col-span-3 xl:col-start-1"
        >
          <label
            htmlFor="disability"
            className="block text-sm sm:text-base font-medium leading-6"
          >
            ¿Tiene alguna discapacidad?
          </label>
          <div className="md:mt-1">
            <select
              id="disability"
              name="disability"
              required
              defaultValue={
                visitationObject === null ||
                visitationObject.disability === undefined
                  ? "Seleccione una opción"
                  : visitationObject.disability === true
                  ? "Sí"
                  : "No"
              }
              className="input input-bordered input-info rounded w-full py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium"
            >
              <option>Seleccione una opción</option>
              <option>Sí</option>
              <option>No</option>
            </select>
          </div>
        </div>

        <div
          id="inmigrante"
          className="sm:col-span-2 md:col-span-6 xl:col-span-3 xl:col-start-4"
        >
          <label
            htmlFor="migrant"
            className="block text-sm sm:text-base font-medium leading-6"
          >
            ¿Ha viajado fuera del país en los últimos 3 meses?
          </label>
          <div className="md:mt-1">
            <select
              id="migrant"
              name="migrant"
              required
              onChange={handleMigrantChange}
              className="input input-bordered input-info rounded w-full py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium"
            >
              {visitationObject === null ||
              visitationObject.migrant === undefined
                ? "Seleccione una opción"
                : visitationObject.migrant === true
                ? "Sí"
                : "No"}
              <option>Seleccione una opción</option>
              <option>Sí</option>
              <option>No</option>
            </select>
          </div>
        </div>

        {isMigrant && (
          <div
            className="sm:col-span-2 md:col-span-4 md:col-start-2"
            id="countrySelection"
          >
            <label
              htmlFor="countriesMigration"
              className="block text-xs sm:text-sm font-medium leading-6"
            >
              ¿A través de qué países han transitado?
            </label>
            <select
              id="countriesMigration"
              name="countriesMigration"
              required
              multiple
              defaultValue={list_of_countries.filter((country) =>
                checkSelection(country, visitationObject)
              )}
              className="md:mt-1 input input-bordered input-info rounded w-full h-40 py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium"
            >
              {list_of_countries
                .filter((country) => country !== "México")
                .map((country) => (
                  <option key={country}>{country}</option>
                ))}
            </select>
          </div>
        )}

        <div
          id="indigena"
          className="sm:col-span-2 md:col-span-6 xl:col-span-3 xl:col-start-1"
        >
          <label
            htmlFor="indigenous"
            className="block text-sm sm:text-base font-medium leading-6"
          >
            ¿Se identifica como indigena?
          </label>
          <div className="md:mt-1">
            <select
              id="indigenous"
              name="indigenous"
              required
              defaultValue={
                clinicosObject === null ||
                clinicosObject.indigenous === undefined
                  ? "Seleccione una opción"
                  : clinicosObject.indigenous === true
                  ? "Sí"
                  : "No"
              }
              className="input input-bordered input-info rounded w-full py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium"
            >
              <option>Seleccione una opción</option>
              <option>Sí</option>
              <option>No</option>
            </select>
          </div>
        </div>

        <div
          id="afrodescendant"
          className="sm:col-span-2 md:col-span-6 xl:col-span-3 xl:col-start-4"
        >
          <label
            htmlFor="afrodescendant"
            className="block text-sm sm:text-base font-medium leading-6"
          >
            ¿Se identifica como afro-descendiente?
          </label>
          <div className="md:mt-1">
            <select
              id="afrodescendant"
              name="afrodescendant"
              required
              defaultValue={
                clinicosObject === null ||
                clinicosObject.afrodescendant === undefined
                  ? "Seleccione una opción"
                  : clinicosObject.afrodescendant === true
                  ? "Sí"
                  : "No"
              }
              className="input input-bordered input-info rounded w-full py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium"
            >
              <option>Seleccione una opción</option>
              <option>Sí</option>
              <option>No</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDatosClinicos;
