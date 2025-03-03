import { ALL_IRAS_SYMPTOMS } from "~/algorithms/IRAS/utilitiesSymptoms";
import { typeAge } from "~/algorithms/utilitiesTypes";

const DisplayFaringitisAguda: React.FC<{
  dolor_faringeo: boolean;
  ausencia_tos: boolean;
  eritema_faringeo: boolean;
  fiebre_altas_b: boolean;
  adenopatia: boolean;
  exudado: boolean;
  age: typeAge;
}> = (props) => {
  return (
    <div>
      <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
        <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
          Requiere tratamiento antibiótico para{" "}
          <span className="italic">Feringitis Aguda</span>
        </h3>
        <ul className="list-disc list-outside text-base leading-6 text-white pl-6 font-semibold">
          {props.dolor_faringeo && (
            <li>{ALL_IRAS_SYMPTOMS.FARINGITIS.DOLOR_FARINGEO}</li>
          )}
          {props.ausencia_tos && (
            <li>{ALL_IRAS_SYMPTOMS.FARINGITIS.AUSENCIA_TOS}</li>
          )}
          {props.eritema_faringeo && (
            <li>{ALL_IRAS_SYMPTOMS.FARINGITIS.ERITEMA_FARINGEO}</li>
          )}
          {props.fiebre_altas_b && (
            <li>{ALL_IRAS_SYMPTOMS.FARINGITIS.FIEBRE_ALTAS_FARINGITIS}</li>
          )}
          {props.adenopatia && (
            <li>{ALL_IRAS_SYMPTOMS.FARINGITIS.ADENOPATIA}</li>
          )}
          {props.exudado && <li>{ALL_IRAS_SYMPTOMS.FARINGITIS.EXUDADO}</li>}
        </ul>
      </div>

      {props.age.years < 18 ? (
        <>
          <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
            <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
              Tratamiento antibiótico
            </h3>
            <p className="text-lg font-semibold pl-2 text-primary">
              Primera línea:
            </p>
            <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
              <li>
                Amoxicilina 80-90 mg/kg/día, dividido cada 8 a 12 hrs por 5
                días.
              </li>
            </ul>
            <p className="text-lg font-semibold pl-2 text-primary">
              Alternativa general:
            </p>
            <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
              <li>Cefalexina 25 mg/kg cada 12 hrs por 5 días.</li>
            </ul>
          </div>

          <div className="bg-base-200 mt-4 px-2 py-4 border border-primary rounded-md shadow-md">
            <h3 className="text-lg font-semibold leading-7 text-primary">
              Recomendaciones adicionales
            </h3>
            <ul className="list-disc list-outside text-sm leading-6 pl-6 text-secondary">
              <li>Penicillina benzatinica IM:</li>
            </ul>
            <ul className="list-disc list-outside text-sm leading-6 pl-10 text-secondary">
              <li>
                Niños {"<"}30 kg o {"<"} 10 años: 600, 000 UI dosis unica.
              </li>
              <li>
                Niños {">"}30 kg o {">"} 10 años y adultos: 1.2 MUI dosis unica.
              </li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
            <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
              Tratamiento empírico
            </h3>
            <p className="text-lg font-semibold pl-2 text-primary">
              Primera línea:
            </p>
            <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
              <li>Amoxicilina 500 mg vía oral cada 8 hrs por 5 a 10 días.</li>
            </ul>
            <p className="text-lg font-semibold pl-2 text-primary">
              Segunda línea:
            </p>
            <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
              <li>Cefalexina 500 mg vía oral cada 8 hrs por 5 días.</li>
            </ul>
          </div>

          <div className="bg-base-200 mt-4 px-2 py-4 border border-primary rounded-md shadow-md">
            <h3 className="text-lg font-semibold leading-7 text-primary">
              Recomendaciones adicionales
            </h3>
            <ul className="list-disc list-outside text-sm leading-6 pl-6 text-secondary">
              <li>Ninguno</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default DisplayFaringitisAguda;
