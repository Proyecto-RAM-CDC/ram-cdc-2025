import { ALL_IRAS_SYMPTOMS } from "~/algorithms/IRAS/utilitiesSymptoms";
import { typeAge } from "~/algorithms/utilitiesTypes";

const DisplaySinusitis: React.FC<{
  dolor_facial_memo: boolean;
  secrecion_puru_nasal: boolean;
  sensacion_facial: boolean;
  dolor_aumenta: boolean;
  fiebre_altas_c: boolean;
  sinusitis_no_mej: boolean;
  nasal_puru: boolean;
  dolor_facial_mas: boolean;
  age: typeAge;
}> = (props) => {
  return (
    <div>
      <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
        <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
          Requiere tratamiento antibiótico para{" "}
          <span className="italic">Otitis Media Aguda</span>
        </h3>
        <ul className="list-disc list-outside text-base leading-6 text-white pl-6 font-semibold">
          {props.dolor_facial_memo && (
            <li>{ALL_IRAS_SYMPTOMS.SINUSITIS_SINTOMATICO.DOLOR_FACIAL_MENO}</li>
          )}
          {props.secrecion_puru_nasal && (
            <li>
              {ALL_IRAS_SYMPTOMS.SINUSITIS_SINTOMATICO.SECRECION_PURU_NASAL}
            </li>
          )}
          {props.sensacion_facial && (
            <li>{ALL_IRAS_SYMPTOMS.SINUSITIS_SINTOMATICO.SENSACION_FACIAL}</li>
          )}
          {props.dolor_aumenta && (
            <li>{ALL_IRAS_SYMPTOMS.SINUSITIS_SINTOMATICO.DOLOR_AUMENTA}</li>
          )}
          {props.fiebre_altas_c && (
            <li>
              {ALL_IRAS_SYMPTOMS.SINUSITIS_ANTIBIOTICO.FIEBRE_ALTAS_SINUSITIS}
            </li>
          )}
          {props.sinusitis_no_mej && (
            <li>{ALL_IRAS_SYMPTOMS.SINUSITIS_ANTIBIOTICO.SINUSITIS_NO_MEJ}</li>
          )}
          {props.nasal_puru && (
            <li>{ALL_IRAS_SYMPTOMS.SINUSITIS_ANTIBIOTICO.NASAL_PURU}</li>
          )}
          {props.dolor_facial_mas && (
            <li>{ALL_IRAS_SYMPTOMS.SINUSITIS_ANTIBIOTICO.DOLOR_FACIAL_MAS}</li>
          )}
        </ul>
      </div>

      {props.age.years <= 5 ? (
        <>
          <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
            <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
              Tratamiento empírico
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
              Segunda línea:
            </p>
            <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
              <li>
                Amoxicilina con ácido clavulánico 80-90 mg/kg/día, de
                amoxicilina, dividido cada 8 o cada 12 hrs por 5 días.
              </li>
            </ul>
          </div>

          <div className="bg-base-200 mt-4 px-2 py-4 border border-primary rounded-md shadow-md">
            <h3 className="text-lg font-semibold leading-7 text-primary">
              Recomendaciones adicionales
            </h3>
            <ul className="list-disc list-outside text-sm leading-6 pl-6 text-secondary">
              <li>abc</li>
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
              <li>
                Amoxicilina 80-90 mg/kg/día, dividido cada 8 a 12 hrs por 5
                días.
              </li>
            </ul>
            <p className="text-lg font-semibold pl-2 text-primary">
              Segunda línea:
            </p>
            <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
              <li>
                Amoxicilina con ácido clavulánico 80-90 mg/kg/día, de
                amoxicilina, dividido cada 8 o cada 12 hrs por 5 días.
              </li>
            </ul>
          </div>

          <div className="bg-base-200 mt-4 px-2 py-4 border border-primary rounded-md shadow-md">
            <h3 className="text-lg font-semibold leading-7 text-primary">
              Recomendaciones adicionales
            </h3>
            <ul className="list-disc list-outside text-sm leading-6 pl-6 text-secondary">
              <li>abc</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default DisplaySinusitis;
