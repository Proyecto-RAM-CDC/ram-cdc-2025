import {
  typeClinicosStringified,
  ContactoObjectStringify,
  OtrosObjectStringify,
  OcupacionObjectStringify,
} from "~/utilities/types";
import { list_of_countries } from "~/utilities/countries";

interface InputFieldProps {
  label: string;
  idname: string;
  defaultValue?: string;
  subLabel?: string;
  className: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  idname,
  defaultValue,
  subLabel,
  className,
}) => (
  <div className={className}>
    <label
      htmlFor={idname}
      className="block text-sm sm:text-base font-medium leading-6"
    >
      {label}
      {subLabel && <span className="text-xs italic">{subLabel}</span>}
    </label>
    <div className="md:mt-1">
      <input
        type="text"
        name={idname}
        id={idname}
        className="input input-bordered input-info rounded w-full py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium"
      />
      {defaultValue || ""}
    </div>
  </div>
);

interface IProps {
  data: string | null;
}

const NewContactInfo: React.FC<IProps> = (props) => {
  const dataObject: {
    createdClinicosObject: typeClinicosStringified;
    createdContactosObject: ContactoObjectStringify;
    createdOtrosObject: OtrosObjectStringify;
    createdOcupacionObject: OcupacionObjectStringify;
  } | null = props.data ? JSON.parse(props.data) : null;

  const contractoObject: ContactoObjectStringify | null = dataObject
    ? dataObject.createdContactosObject
    : null;

  return (
    <div className="p-4 text-primary bg-primary-content">
      <div className="grid grid-cols-1 gap-y-4 sm:gap-x-4 sm:gap-y-6 sm:grid-cols-2 md:max-w-3xl md:gap-x-3 md:gap-y-6 md:grid-cols-6 xl:max-w-5xl">
        <InputField
          label="Dirección de correo electrónico"
          idname="homeEmail"
          defaultValue={contractoObject?.homeEmail}
          className="md:col-span-6 lg:col-span-3 lg:col-start-1"
        />

        <div className="md:col-span-6 lg:col-span-3 lg:col-start-4">
          <label
            className="block text-sm sm:text-base font-medium leading-6"
            htmlFor="homeCel"
          >
            Número celular
          </label>
          <div className="md:mt-1">
            <input
              type="tel"
              id="homeCel"
              name="homeCel"
              maxLength={12}
              pattern="52-[0-9]{4}-[0-9]{4}"
              className="input input-bordered input-info rounded w-full py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium"
            />
            {contractoObject?.homeCel || ""}
            <small className="block">Formato: 52-xxxx-xxxx</small>
          </div>
        </div>

        <InputField
          label="Dirección"
          idname="homeDireccion"
          defaultValue={contractoObject?.homeDireccion}
          className="md:col-span-6"
        />

        <InputField
          label="Núm. ext."
          idname="homeExtNum"
          defaultValue={contractoObject?.homeExtNum}
          className="md:col-span-2 md:col-start-2"
        />

        <InputField
          label="Núm. int."
          idname="homeIntNum"
          defaultValue={contractoObject?.homeIntNum}
          className="md:col-span-2 md:col-start-4"
        />

        <InputField
          label="Ciudad"
          idname="homeCity"
          defaultValue={contractoObject?.homeCity}
          className="md:col-span-6 xl:col-span-3 xl:col-start-1"
        />

        <InputField
          label="Estado / Provincia"
          idname="homeState"
          defaultValue={contractoObject?.homeState}
          className="md:col-span-6 xl:col-span-3 xl:col-start-4"
        />

        <InputField
          label="Código postal"
          idname="homePostalCode"
          defaultValue={contractoObject?.homePostalCode}
          className="md:col-span-6 xl:col-span-3 xl:col-start-1"
        />

        <div className="md:col-span-6 lg:col-span-3 lg:col-start-4">
          <label
            htmlFor="homeCountry"
            className="block text-sm sm:text-base font-medium leading-6"
          >
            País
          </label>
          <div className="md:mt-1">
            <select
              id="homeCountry"
              name="homeCountry"
              defaultValue={contractoObject?.homeCountry || ""}
              className="input input-bordered input-info rounded w-full py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium"
            >
              {list_of_countries.map((country) => (
                <option key={country}>{country}</option>
              ))}
            </select>
          </div>
        </div>

        <InputField
          label="Lugar de origen"
          idname="lugarOrigenEstado"
          subLabel="(Estado, Provincia)"
          defaultValue={contractoObject?.lugarOrigenEstado}
          className="md:col-span-6 xl:col-span-3 xl:col-start-1"
        />

        <InputField
          label="Lugar de origen"
          idname="lugarOrigenCiudad"
          subLabel="(Ciudad, municipio, población)"
          defaultValue={contractoObject?.lugarOrigenCiudad}
          className="md:col-span-6 xl:col-span-3 xl:col-start-4"
        />
      </div>
    </div>
  );
};

export default NewContactInfo;
