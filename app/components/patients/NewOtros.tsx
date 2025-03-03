import {
  typeClinicosStringified,
  ContactoObjectStringify,
  OtrosObjectStringify,
  OcupacionObjectStringify,
} from "~/utilities/types";

interface IProps {
  data: string | null;
}

const NewOtrosDatos: React.FC<IProps> = (props) => {
  const dataObject: {
    createdClinicosObject: typeClinicosStringified;
    createdContactosObject: ContactoObjectStringify;
    createdOtrosObject: OtrosObjectStringify;
    createdOcupacionObject: OcupacionObjectStringify;
  } | null = props.data ? JSON.parse(props.data) : null;

  const otrosObject: OtrosObjectStringify | null = dataObject
    ? dataObject.createdOtrosObject
    : null;

  return (
    <div className="p-4 text-primary bg-primary-content">
      <div className="grid grid-cols-1 gap-y-4 sm:gap-x-4 sm:gap-y-6 sm:grid-cols-2 md:max-w-3xl md:gap-x-3 md:gap-y-6 md:grid-cols-6 xl:max-w-5xl">
        <div className="md:col-span-6 xl:col-span-3 xl:col-start-1">
          <label
            htmlFor="nombreOtros"
            className="block text-sm sm:text-base font-medium leading-6"
          >
            Nombre
          </label>
          <div className="md:mt-1">
            <input
              type="text"
              name="nombreOtros"
              id="nombreOtros"
              defaultValue={otrosObject?.nombreOtros || ""}
              className="input input-bordered input-info rounded w-full py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium"
            />
          </div>
        </div>

        <div className="md:col-span-6 xl:col-span-3 xl:col-start-1">
          <label
            htmlFor="apellidoPaterno"
            className="block text-sm sm:text-base font-medium leading-6"
          >
            Apellido paterno
          </label>
          <div className="md:mt-1">
            <input
              type="text"
              name="apellidoPaterno"
              id="apellidoPaterno"
              defaultValue={otrosObject?.apellidoPaterno || ""}
              className="input input-bordered input-info rounded w-full py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium"
            />
          </div>
        </div>

        <div className="md:col-span-6 xl:col-span-3 xl:col-start-4">
          <label
            htmlFor="apellidoMaterno"
            className="block text-sm sm:text-base font-medium leading-6"
          >
            Apellido materno
          </label>
          <div className="md:mt-1">
            <input
              type="text"
              name="apellidoMaterno"
              id="apellidoMaterno"
              defaultValue={otrosObject?.apellidoMaterno || ""}
              className="input input-bordered input-info rounded w-full py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium"
            />
          </div>
        </div>

        <div className="md:col-span-6 lg:col-span-3 lg:col-start-1">
          <label
            htmlFor="estadoCivil"
            className="block text-sm sm:text-base font-medium leading-6"
          >
            Estado civil
          </label>
          <div className="md:mt-1">
            <select
              id="estadoCivil"
              name="estadoCivil"
              defaultValue={otrosObject?.estadoCivil || "Seleccione una opción"}
              className="input input-bordered input-info rounded w-full py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium"
            >
              <option>Seleccione una opción</option>
              <option>Casado</option>
              <option>Soltero</option>
              <option>Divorciado</option>
              <option>Cohabitando</option>
              <option>Viudo</option>
            </select>
          </div>
        </div>

        <div className="md:col-span-6 lg:col-span-3 lg:col-start-4">
          <label
            htmlFor="nivelEstudios"
            className="block text-sm sm:text-base font-medium leading-6"
          >
            El mas alto nivel de educación
          </label>
          <div className="md:mt-1">
            <select
              id="nivelEstudios"
              name="nivelEstudios"
              defaultValue={
                otrosObject?.nivelEstudios || "Seleccione una opción"
              }
              className="input input-bordered input-info rounded w-full py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium"
            >
              <option>Seleccione una opción</option>
              <option>Ninguno</option>
              <option>Escuela primaria (grados 1-6)</option>
              <option>Escuela secundaria (grados 7-9)</option>
              <option>Escuela preparatoria (grados 10-12)</option>
              <option>Técnico</option>
              <option>Universidad (licenciatura)</option>
              <option>Universidad (maestría)</option>
              <option>Universidad (doctorado)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOtrosDatos;
