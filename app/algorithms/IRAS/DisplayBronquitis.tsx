import { ALL_IRAS_SYMPTOMS } from "~/algorithms/IRAS/utilitiesSymptoms";

const DisplayBronquitis: React.FC<{
  tos_inicio: boolean;
  tos_persistent: boolean;
  hasFiebre: boolean;
  ante_ivr: boolean;
  explore_normal: boolean;
}> = (props) => {
  return (
    <div>
      <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
        <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
          Diagnóstico{" "}
          <span className="italic">Bronquitis Aguda No Complicada</span>
        </h3>
        <ul className="list-disc list-outside text-base leading-6 text-white pl-6 font-semibold">
          {props.tos_inicio && (
            <li>{ALL_IRAS_SYMPTOMS.BRONCHITIS.TOS_INICIO}.</li>
          )}
          {props.tos_persistent && (
            <li>{ALL_IRAS_SYMPTOMS.BRONCHITIS.TOS_PERSISTENTE}.</li>
          )}
          {props.hasFiebre && (
            <li>{ALL_IRAS_SYMPTOMS.BRONCHITIS.FIEBRE_BAJA_BRONQUITIS}.</li>
          )}
          {props.ante_ivr && (
            <li>{ALL_IRAS_SYMPTOMS.BRONCHITIS.ANTE_IVR_ALTAS}.</li>
          )}
          {props.explore_normal && (
            <li>{ALL_IRAS_SYMPTOMS.BRONCHITIS.EXPLORATION_NORMAL}.</li>
          )}
        </ul>
      </div>

      <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
        <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
          No requiere tratamiento antibiótico
        </h3>
      </div>

      <div className="bg-base-200 mt-4 px-2 py-4 border border-primary rounded-md shadow-md">
        <h3 className="text-lg font-semibold leading-7 text-primary">
          Recomendaciones adicionales
        </h3>
        <ul className="list-disc list-outside text-sm leading-6 pl-6 text-secondary">
          <li>No es necesario realizar estudios de imagen ni cultivos.</li>
          <li>
            Realizar pruebas para detectar virus de influenza (durante temporada
            de influenza o brotes) y/o SARS CoV2.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DisplayBronquitis;
