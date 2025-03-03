import { ALL_IRAS_SYMPTOMS } from "~/algorithms/IRAS/utilitiesSymptoms";
import { typeAge } from "~/algorithms/utilitiesTypes";

const DisplayOtitisMediaAguda: React.FC<{
  dolor_otico_agudo: boolean;
  secrecion_puru_oido: boolean;
  hasFiebre: boolean;
  dolor_otico_pers: boolean;
  age: typeAge;
  allergies: string[];
}> = (props) => {
  const isAllergicToPenicillin = props.allergies.some(
    (x) => x === "Penicilinas"
  );

  return (
    <div>
      <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
        <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
          Requiere tratamiento antibiótico para{" "}
          <span className="italic">Otitis Media Aguda</span>
        </h3>
        <ul className="list-disc list-outside text-base leading-6 text-white pl-6 font-semibold">
          {props.dolor_otico_agudo && (
            <li>{ALL_IRAS_SYMPTOMS.OTITIS_MEDIA_AGUDA.DOLOR_OTICO_AGUDO}</li>
          )}
          {props.secrecion_puru_oido && (
            <li>{ALL_IRAS_SYMPTOMS.OTITIS_MEDIA_AGUDA.SECRECION_PURU_OIDO}</li>
          )}
          {props.hasFiebre && (
            <li>{ALL_IRAS_SYMPTOMS.OTITIS_MEDIA_AGUDA.FIEBRE_ALTAS_OMA}</li>
          )}
          {props.dolor_otico_pers && (
            <li>{ALL_IRAS_SYMPTOMS.OTITIS_MEDIA_AGUDA.DOLOR_OTICO_PERS}</li>
          )}
        </ul>
      </div>

      {props.age.years < 18 ? (
        <>
          <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
            <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
              Tratamiento antibiótico
            </h3>
            <p className="text-lg font-semibold pl-2 pt-2 text-primary">
              Primera línea:
            </p>
            <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
              <li>
                Amoxicilina 80-90 mg/kg/día, dividido cada 8 a 12 hrs por 5
                días.
              </li>
            </ul>
            <p className="text-lg font-semibold pl-2 pt-2 text-primary">
              Segunda línea:
            </p>
            <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
              <li>
                Amoxicilina con ácido clavulánico 80-90 mg/kg/día, de
                amoxicilina, dividido cada 8 o cada 12 hrs por 5 días.
              </li>
            </ul>
            {isAllergicToPenicillin ? (
              <>
                <p className="text-lg font-semibold pl-2 pt-2 text-primary">
                  Alergia a la penicilina:
                </p>
                <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
                  {(props.age.years === 0 && props.age.months >= 6) ||
                  props.age.years >= 1 ? (
                    <li>
                      Azithromycin 10 mg/kg/día oral día uno y después 5
                      mg/kg/día por 4 días.
                    </li>
                  ) : null}
                  {(props.age.years === 0 && props.age.months === 1) ||
                  (props.age.years >= 1 && props.age.years <= 11) ? (
                    (props.age.years === 0 && props.age.months >= 6) ||
                    props.age.years >= 1 ? (
                      <li>
                        Alternativa: Claritromicina 7.5 mg/kg/dosis cada 12 hrs
                        por 5 días.
                      </li>
                    ) : (
                      <li>
                        Claritromicina 7.5 mg/kg/dosis cada 12 hrs por 5 días.
                      </li>
                    )
                  ) : null}
                  {props.age.years >= 12 ? (
                    <li>Claritromicina 250 mg cada 12 hrs por 5 días.</li>
                  ) : null}
                </ul>
              </>
            ) : null}
          </div>

          <div className="bg-base-200 mt-4 px-2 py-4 border border-primary rounded-md shadow-md">
            <h3 className="text-lg font-semibold leading-7 text-primary">
              Recomendaciones adicionales
            </h3>
            <ul className="list-disc list-outside text-sm leading-6 pl-6 text-secondary">
              <li>
                En menores de 2 años considerar tratamiento por 7-10 días.
              </li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
            <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
              Tratamiento antibiótico
            </h3>
            <p className="text-lg font-semibold pl-2 text-primary">
              Primera línea:
            </p>
            <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
              <li>Amoxicilina 1 gr VO cada 8 hrs por 5 días.</li>
            </ul>
            <p className="text-lg font-semibold pl-2 text-primary">
              Segunda línea:
            </p>
            <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
              <li>
                Amoxicilina con ácido clavulánico 875 mg/125 mg cada 8 hrs por 5
                días.
              </li>
            </ul>
            {isAllergicToPenicillin && (
              <>
                <p className="text-lg font-semibold pl-2 text-primary">
                  Alergia a la penicilina:
                </p>
                <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
                  <li>
                    Claritromicina 500 mg vía oral cada 12 hrs por 5 días.
                  </li>
                </ul>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DisplayOtitisMediaAguda;
