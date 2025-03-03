import ExistingClinicoAvatar from "~/icons/ExistingClinicoAvatar";

type newClinicoType = {
  curpError: string;
  handleCheckCurp: () => void;
  handleCancel: () => void;
  newCurp: string;
};

type SelectedObj = {
  curp: string;
  dob: Date;
  sexonacer: string;
  dateAdded: Date;
  contactoId: string;
  otrosId: string;
  ocupacionId: string;
  visitationId: string;
  id: string;
};

type Selected = { selected: SelectedObj };

type existingClinicoType = {
  finalClinicos: Selected | null;
  handleContinue: () => void;
  handleCancel: () => void;
};

export function NewClinico(props: newClinicoType) {
  return (
    <div
      data-testid="new-clinico"
      className="divide-y divide-gray-200 overflow-hidden rounded-lg text-primary bg-primary-content w-11/12 shadow-md"
    >
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center">
          <ExistingClinicoAvatar className="size-32" />
          <div>
            <p className="font-bold text-base lg:text-lg">
              ¿Es este un nuevo paciente?
            </p>
            <p className="font-light text-sm">basado en CURP seleccionado</p>
          </div>
        </div>
      </div>
      <div className="px-4 py-5 sm:p-6">
        {props.curpError && (
          <div className="px-4 text-lg font-semibold text-red-500">
            {props.curpError}
          </div>
        )}

        {!props.curpError && (
          <p className="mt-2 font-semibold text-sm sm:text-base">
            ¿Le gustaría crear un nuevo paciente con CURP {props.newCurp}?
          </p>
        )}
      </div>
      <div className="px-4 py-4 sm:px-6">
        <div className="flex justify-between mt-2">
          <button
            type="button"
            onClick={props.handleCheckCurp}
            disabled={props.curpError !== "" ? true : false}
            className="btn btn-sm btn-primary font-normal w-20"
          >
            Continuar
          </button>
          <button
            type="button"
            className="btn btn-sm btn-secondary font-normal w-20"
            onClick={props.handleCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export function ExistingClinico(props: existingClinicoType) {
  return (
    <div
      data-testid="existing-clinico"
      className="divide-y divide-gray-200 overflow-hidden rounded-lg text-primary bg-primary-content w-11/12 shadow-md"
    >
      <div className="flex items-center">
        <ExistingClinicoAvatar className="size-32" />
        <div>
          <p className="font-bold text-base lg:text-lg">
            Detalles del paciente
          </p>
          <p className="font-light text-sm">basado en CURP seleccionado</p>
        </div>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <ul className="px-4 text-sm sm:text-base">
          <li className="block">
            <span className="font-semibold underline">CURP</span>:{" "}
            {props.finalClinicos?.selected.curp}
          </li>
          <li className="block mt-2">
            <span className="font-semibold underline">Fecha de naciamento</span>
            :{" "}
            {props.finalClinicos?.selected.dob
              ? new Date(props.finalClinicos.selected.dob).toLocaleDateString(
                  "es-MX",
                  {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }
                )
              : ""}
          </li>
          <li className="block mt-2">
            <span className="font-semibold underline">Sex al nacer</span>:{" "}
            {props.finalClinicos?.selected.sexonacer}
          </li>
          <li className="block mt-2">
            <span className="font-semibold underline">Primera visita</span>:{" "}
            {props.finalClinicos?.selected.dateAdded
              ? new Date(
                  props.finalClinicos.selected.dateAdded
                ).toLocaleDateString("es-MX", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
              : ""}
          </li>
        </ul>
      </div>
      <div className="px-4 py-4 sm:px-6 font-semibold text-sm sm:text-base">
        <p>¿Es este el paciente que visita?</p>
        <div className="flex justify-between mt-2">
          <button
            type="button"
            onClick={props.handleContinue}
            className="btn btn-sm btn-primary font-normal w-20"
          >
            Continuar
          </button>
          <button
            type="button"
            className="btn btn-sm btn-secondary font-normal w-20"
            onClick={props.handleCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
