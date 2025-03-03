import {
  typeClinicosStringified,
  ContactoObjectStringify,
  OtrosObjectStringify,
  OcupacionObjectStringify,
} from "~/utilities/types";
import { list_of_countries } from "~/utilities/countries";

interface IProps {
  data: string | null;
}

const NewOccupation: React.FC<IProps> = (props) => {
  const dataObject: {
    createdClinicosObject: typeClinicosStringified;
    createdContactosObject: ContactoObjectStringify;
    createdOtrosObject: OtrosObjectStringify;
    createdOcupacionObject: OcupacionObjectStringify;
  } | null = props.data ? JSON.parse(props.data) : null;

  const ocupacionObject: OcupacionObjectStringify | null = dataObject
    ? dataObject.createdOcupacionObject
    : null;

  return (
    <div className="p-4 text-primary bg-primary-content">
      <div className="grid grid-cols-1 gap-y-4 sm:gap-x-4 sm:gap-y-6 sm:grid-cols-2 md:max-w-3xl md:gap-x-3 md:gap-y-6 md:grid-cols-6 xl:max-w-5xl">
        <div className="md:col-span-3">
          <label
            htmlFor="ocupacion"
            className="block text-sm sm:text-base font-medium leading-6"
          >
            ¿Cuál es su ocupación u oficio?
          </label>
          <div className="md:mt-1">
            <input
              type="text"
              name="ocupacion"
              id="ocupacion"
              defaultValue={ocupacionObject?.ocupacion || ""}
              className="input input-bordered input-info rounded w-full py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium"
            />
          </div>
        </div>

        <div className="md:col-span-3">
          <label
            htmlFor="paisTrabajo"
            className="block text-sm sm:text-base font-medium leading-6"
          >
            País
          </label>
          <div className="md:mt-1">
            <select
              id="paisTrabajo"
              name="paisTrabajo"
              defaultValue={ocupacionObject?.paisTrabajo || ""}
              className="input input-bordered input-info rounded w-full py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium"
            >
              {list_of_countries.map((country) => (
                <option key={country}>{country}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="md:col-span-full">
          <label
            htmlFor="direccionTrabajo"
            className="block text-sm sm:text-base font-medium leading-6"
          >
            Dirección
          </label>
          <div className="md:mt-1">
            <input
              type="text"
              name="direccionTrabajo"
              id="direccionTrabajo"
              defaultValue={ocupacionObject?.direccionTrabajo || ""}
              className="input input-bordered input-info rounded w-full py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium"
            />
          </div>
        </div>

        <div className="md:col-span-3 md:col-start-1">
          <label
            htmlFor="ciudadTrabajo"
            className="block text-sm sm:text-base font-medium leading-6"
          >
            Ciudad
          </label>
          <div className="md:mt-1">
            <input
              type="text"
              name="ciudadTrabajo"
              id="ciudadTrabajo"
              defaultValue={ocupacionObject?.ciudadTrabajo || ""}
              className="input input-bordered input-info rounded w-full py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium"
            />
          </div>
        </div>

        <div className="md:col-span-3">
          <label
            htmlFor="estadoTrabajo"
            className="block text-sm sm:text-base font-medium leading-6"
          >
            Estado / Provincia
          </label>
          <div className="md:mt-1">
            <input
              type="text"
              name="estadoTrabajo"
              id="estadoTrabajo"
              defaultValue={ocupacionObject?.estadoTrabajo || ""}
              className="input input-bordered input-info rounded w-full py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOccupation;
