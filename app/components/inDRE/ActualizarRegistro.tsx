interface ActionData {
  error?: Record<string, string>;
  validation_error?: boolean;
}

interface IProps {
  isSubmitting: boolean;
  actionReturned?: ActionData;
  handleButtonClick: (value: string) => void;
  actionValue?: string;
}

const Actualizar: React.FC<IProps> = (props) => {
  return (
    <div className="grid grid-cols-12 items-start gap-2 sm:gap-4">
      <h1 className="col-start-1 col-span-12 text-lg sm:text-xl md:text-2xl text-secondary-content font-bold md:mb-2 text-right">
        Actualizar Registro
      </h1>

      <div
        className="col-start-1 col-span-12 rounded-md text-right"
        id="addNewResistance"
      >
        <label
          htmlFor="newResistanceCreator"
          className="block text-xs sm:text-sm font-medium leading-6 text-secondary-content"
        >
          ¿Agregar nuevas mecanismos de resistencia?
        </label>
        <input
          id="newResistanceCreator"
          type="text"
          name="newResistanceCreator"
          placeholder="¿Nuevas mechanismos de resistencia?"
          className="md:mt-1 input input-bordered input-info rounded-md w-full h-14 sm:h-20 py-1 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium bg-accent text-accent-content"
        />
        <p className="text-xs sm:text-xs text-secondary-content italic">
          Separe varias entradas con un punto y coma.
        </p>
      </div>

      <div className="col-start-1 col-span-12 text-right" id="addNewAntibiotic">
        <label
          htmlFor="newAntibioticCreator"
          className="block text-xs sm:text-sm font-medium leading-6 text-secondary-content"
        >
          ¿Agregar nuevo antibiótico?
        </label>
        <input
          id="newAntibioticCreator"
          type="text"
          name="newAntibioticCreator"
          placeholder="¿Nuevas antibióticos?"
          className="md:mt-1 input input-bordered input-info rounded-md w-full h-14 sm:h-20 py-1 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium bg-accent text-accent-content"
        />
        <p className="text-xs sm:text-xs text-secondary-content italic">
          Separe varias entradas con un punto y coma.
        </p>
      </div>

      <div className="col-start-1 col-span-12 text-right" id="addNewHospital">
        <label
          htmlFor="newHospitalCreator"
          className="block text-xs sm:text-sm font-medium leading-6 text-secondary-content"
        >
          ¿Agregar nuevos hospitales?
        </label>
        <input
          id="newHospitalCreator"
          type="text"
          name="newHospitalCreator"
          placeholder="¿Nuevas hospital?"
          className="md:mt-1 input input-bordered input-info rounded-md w-full h-14 sm:h-20 py-1 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium bg-accent text-accent-content"
        />
        <p className="text-xs sm:text-xs text-secondary-content italic">
          Separe varias entradas con un punto y coma.
        </p>
      </div>

      <div className="col-start-1 col-span-12 text-right" id="addNewAntibiotic">
        <label
          htmlFor="newGeneCreator"
          className="block text-xs sm:text-sm font-medium leading-6 text-secondary-content"
        >
          ¿Agregar una nueva familia de genes?
        </label>
        <input
          id="newGeneCreator"
          type="text"
          name="newGeneCreator"
          placeholder="¿Nuevas familia de genes?"
          className="md:mt-1 input input-bordered input-info rounded-md w-full h-14 sm:h-20 py-1 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium bg-accent text-accent-content"
        />
        <p className="text-xs sm:text-xs text-secondary-content italic">
          Separe varias entradas con un punto y coma.
        </p>
      </div>

      <button
        type="submit"
        onClick={() => props.handleButtonClick("updatingindre")}
        disabled={props.isSubmitting}
        className="col-start-9 col-span-4 mt-3 md:mt-1 btn btn-primary text-primary-content btn-sm py-2 px-4"
      >
        {props.isSubmitting &&
        props.actionValue !== "addingindre" &&
        props.actionValue !== ""
          ? "Autenticando ..."
          : "Actualizar"}
      </button>
    </div>
  );
};

export default Actualizar;
