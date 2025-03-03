import { ALL_IRAS_SYMPTOMS } from "~/algorithms/IRAS/utilitiesSymptoms";
import { typeAge } from "~/algorithms/utilitiesTypes";

const DisplayNeumoniaAdquiridaComunidad: React.FC<{
  tos: boolean;
  hasFiebre: boolean;
  disnea: boolean;
  sin_ante_hospital: boolean;
  signo_pulmon: boolean;
  signo_taquic: boolean;
  enfermo_confusion: boolean;
  incapacidad_alimentarse: boolean;
  convulsions: boolean;
  letargia: boolean;
  desnutricion: boolean;
  respiracion_rapida: boolean;
  ta_sistolica: boolean;
  age: typeAge;
  embarazo: boolean;
  allergies: string[];
}> = (props) => {
  const adultos = props.age.years >= 18;
  let adultos_score = 0;
  let nino_hospital = false;

  if (adultos) {
    const points = [
      props.enfermo_confusion,
      props.respiracion_rapida,
      props.ta_sistolica,
    ];
    const count = points.reduce((total, point) => {
      return point ? total + 1 : total;
    }, 0);

    adultos_score = props.age.years >= 65 ? count + 1 : count;
  } else {
    nino_hospital =
      props.incapacidad_alimentarse ||
      props.convulsions ||
      props.letargia ||
      props.desnutricion ||
      (props.age.years <= 0 && props.age.months <= 2);
  }

  const isAllergicToPenicillin = props.allergies.some(
    (x) => x === "Penicilinas"
  );

  if (adultos) {
    return (
      <div>
        {adultos_score <= 1 ? (
          <>
            <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
              <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
                Diagnóstico{" "}
                <span className="italic">
                  Neumonia adquirida en la comunidad (NAC)
                </span>{" "}
                con NAC leve ({adultos_score} puntos)
              </h3>
              <ul className="list-disc list-outside text-base leading-6 text-white pl-6 font-semibold">
                {props.tos && <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.TOS_INICIO}.</li>}
                {props.hasFiebre && (
                  <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.FIEBRE_BAJA}.</li>
                )}
                {props.disnea && <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.DISNEA}.</li>}
                {props.sin_ante_hospital && (
                  <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.SIN_ANTE_HOSPITAL}.</li>
                )}
                {props.signo_pulmon && (
                  <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.SIGNO_PULMON}.</li>
                )}
                {props.signo_taquic && (
                  <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.SIGNO_TAQUIC}.</li>
                )}
                {props.enfermo_confusion && (
                  <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.ENFERMO_CONFUSION}</li>
                )}
                {props.incapacidad_alimentarse && (
                  <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.INCAPACIDAD_ALIMENTARSE}</li>
                )}
                {props.convulsions && (
                  <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.CONVULSIONS}</li>
                )}
                {props.letargia && (
                  <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.LETARGIA}</li>
                )}
                {props.desnutricion && (
                  <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.DESNUTRICION}</li>
                )}
                {props.respiracion_rapida && (
                  <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.RESPIRACION_RAPIDA}</li>
                )}
                {props.ta_sistolica && (
                  <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.TA_SISTOLICA}</li>
                )}
              </ul>
            </div>

            <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
              <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
                Tratamiento ambulatorio
              </h3>
              <p className="text-lg font-semibold pl-2 text-primary">
                1ra Elección:
              </p>
              <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
                <li>Amoxicilina 500 mg vía oral cada 8 hrs por 5 días.</li>
              </ul>
              <p className="text-lg font-semibold pl-2 text-primary">
                1ra Elección (Alergias):
              </p>
              <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
                <li>
                  Doxiciclina 200 mg 1er día y después 100 mg vía oral cada 12
                  hrs por 5 días ... <span className="underline">o</span> ...
                  Claritromicina 500 mg cada 12 hrs por 5 días.
                </li>
              </ul>
              <p className="text-lg font-semibold pl-2 text-primary">
                Tratamiento empírico alternativo:
              </p>
              <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
                <li>
                  Amoxicilina con ácido 500 mg clavulánico 875/125 mg cada 8 hrs
                  por 5 días.
                </li>
              </ul>
            </div>

            <div className="bg-base-200 mt-4 px-2 py-4 border border-primary rounded-md shadow-md">
              <h3 className="text-lg font-semibold leading-7 text-primary">
                Recomendaciones adicionales
              </h3>
              <ul className="list-disc list-outside text-sm leading-6 pl-6 text-secondary">
                <li>
                  Realizar pruebas para detectar virus de influenza (durante
                  temporada de influenza o brotes) y/o SARS CoV2.
                </li>
              </ul>
              {props.embarazo && (
                <p className="text-lg font-semibold pl-2 text-primary">
                  No utilizar quinolonas (ciprofloxacin, levofloxacin,
                  moxifloxacin) o tetraciclinas (doxiciclina) en embarazo.
                </p>
              )}
            </div>
          </>
        ) : adultos_score == 2 ? (
          <>
            <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
              <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
                Diagnóstico{" "}
                <span className="italic">
                  Neumonia adquirida en la comunidad (NAC)
                </span>{" "}
                con NAC moderada (2 puntos)
              </h3>
              <ul className="list-disc list-outside text-base leading-6 text-white pl-6 font-semibold">
                {props.tos && <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.TOS_INICIO}.</li>}
                {props.hasFiebre && (
                  <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.FIEBRE_BAJA}.</li>
                )}
                {props.disnea && <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.DISNEA}.</li>}
                {props.sin_ante_hospital && (
                  <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.SIN_ANTE_HOSPITAL}.</li>
                )}
                {props.signo_pulmon && (
                  <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.SIGNO_PULMON}.</li>
                )}
                {props.signo_taquic && (
                  <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.SIGNO_TAQUIC}.</li>
                )}
                {props.enfermo_confusion && (
                  <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.ENFERMO_CONFUSION}</li>
                )}
                {props.incapacidad_alimentarse && (
                  <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.INCAPACIDAD_ALIMENTARSE}</li>
                )}
                {props.convulsions && (
                  <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.CONVULSIONS}</li>
                )}
                {props.letargia && (
                  <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.LETARGIA}</li>
                )}
                {props.desnutricion && (
                  <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.DESNUTRICION}</li>
                )}
                {props.respiracion_rapida && (
                  <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.RESPIRACION_RAPIDA}</li>
                )}
                {props.ta_sistolica && (
                  <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.TA_SISTOLICA}</li>
                )}
              </ul>
            </div>

            <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
              <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
                Tratamiento ambulatorio solo en los casos en los cuales después
                de una evaluación meticulosa de riesgo/beneficio y que no se
                encuentres otros criterios de riesgo ({"<"}90% oximetria,
                desnutricion, polifarmacia, etc.)
              </h3>
              <p className="text-lg font-semibold pl-2 text-primary">
                1ra Elección:
              </p>
              <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
                <li>
                  Amoxicilina con ácido 500 mg clavulánico 875/125 mg cada 8 hrs
                  más doxiciclina 100 mg cada 12 hrs por 5 días
                </li>
              </ul>

              <p className="text-lg font-semibold pl-2 text-primary">
                2da Elección:
              </p>
              <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
                <li>
                  Ceftriaxona 1 g IM cada 24 hrs más doxiciclina 100 mg cada 12
                  por 5 días.
                </li>
              </ul>
              <p className="text-lg font-semibold pl-2 text-primary">
                Tratamiento empírico alternativo (por ejemplo alergia a
                penicilina):
              </p>
              <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
                <li>Levofloxacino 750 mg día.</li>
                <li>O, alternativa: Moxifloxaino 400 mg día por 5 días.</li>
              </ul>
            </div>

            <div className="bg-base-200 mt-4 px-2 py-4 border border-primary rounded-md shadow-md">
              <h3 className="text-lg font-semibold leading-7 text-primary">
                Recomendaciones adicionales
              </h3>
              <ul className="list-disc list-outside text-sm leading-6 pl-6 text-secondary">
                <li>
                  Realizar pruebas para detectar virus de influenza (durante
                  temporada de influenza o brotes) y/o SARS CoV2.
                </li>
              </ul>
              {props.embarazo ? (
                <p className="text-lg font-semibold pl-2 text-primary">
                  No utilizar quinolonas (ciprofloxacin, levofloxacin,
                  moxifloxacin) o tetraciclinas (doxiciclina) en embarazo.
                </p>
              ) : null}
            </div>
          </>
        ) : (
          <>
            <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
              <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
                Diagnóstico{" "}
                <span className="italic">
                  Neumonia adquirida en la comunidad (NAC)
                </span>{" "}
                con NAC grave ({adultos_score} puntos)
              </h3>
              <ul className="list-disc list-outside text-base leading-6 text-white pl-6 font-semibold">
                {props.tos && <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.TOS_INICIO}.</li>}
                {props.hasFiebre && (
                  <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.FIEBRE_BAJA}.</li>
                )}
                {props.disnea && <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.DISNEA}.</li>}
                {props.sin_ante_hospital && (
                  <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.SIN_ANTE_HOSPITAL}.</li>
                )}
                {props.signo_pulmon && (
                  <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.SIGNO_PULMON}.</li>
                )}
                {props.signo_taquic && (
                  <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.SIGNO_TAQUIC}.</li>
                )}
                {props.enfermo_confusion && (
                  <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.ENFERMO_CONFUSION}</li>
                )}
                {props.incapacidad_alimentarse && (
                  <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.INCAPACIDAD_ALIMENTARSE}</li>
                )}
                {props.convulsions && (
                  <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.CONVULSIONS}</li>
                )}
                {props.letargia && (
                  <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.LETARGIA}</li>
                )}
                {props.desnutricion && (
                  <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.DESNUTRICION}</li>
                )}
                {props.respiracion_rapida && (
                  <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.RESPIRACION_RAPIDA}</li>
                )}
                {props.ta_sistolica && (
                  <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.TA_SISTOLICA}</li>
                )}
              </ul>
            </div>

            <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
              <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
                Tratamiento - enviar a hospitalización
              </h3>
            </div>
          </>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
          <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
            Requiere tratamiento ambulatorio para{" "}
            <span className="italic">
              Neumonia adquirida en la comunidad (NAC)
            </span>
          </h3>
          <ul className="list-disc list-outside text-base leading-6 text-white pl-6 font-semibold">
            {props.tos && <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.TOS_INICIO}.</li>}
            {props.hasFiebre && (
              <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.FIEBRE_BAJA}.</li>
            )}
            {props.disnea && <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.DISNEA}.</li>}
            {props.sin_ante_hospital && (
              <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.SIN_ANTE_HOSPITAL}.</li>
            )}
            {props.signo_pulmon && (
              <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.SIGNO_PULMON}.</li>
            )}
            {props.signo_taquic && (
              <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.SIGNO_TAQUIC}.</li>
            )}
            {props.enfermo_confusion && (
              <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.ENFERMO_CONFUSION}</li>
            )}
            {props.incapacidad_alimentarse && (
              <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.INCAPACIDAD_ALIMENTARSE}</li>
            )}
            {props.convulsions && (
              <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.CONVULSIONS}</li>
            )}
            {props.letargia && <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.LETARGIA}</li>}
            {props.desnutricion && (
              <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.DESNUTRICION}</li>
            )}
            {props.respiracion_rapida && (
              <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.RESPIRACION_RAPIDA}</li>
            )}
            {props.ta_sistolica && (
              <li>{ALL_IRAS_SYMPTOMS.NEUMONIA.TA_SISTOLICA}</li>
            )}
          </ul>
        </div>

        {nino_hospital ? (
          <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
            <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
              Enviar a 2do nivel (tratamiento hospitalario) sí no hay mejoría en
              2 días
            </h3>
          </div>
        ) : (
          <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
            <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
              Tratamiento ambulatorio
            </h3>
            <p className="text-lg font-semibold pl-2 text-primary">
              Primera Elección:
            </p>
            <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
              <li>
                Amoxicilina 90 mg/kg/día, dividido en 2-3 dosis vía oral por 5
                días.
              </li>
            </ul>
            <p className="text-lg font-semibold pl-2 text-primary">
              Segunda línea:
            </p>
            <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
              <li>
                Ceftriaxona 80 mg/kg/dosis intramuscular por 5 días. por 5 días.
              </li>
            </ul>
            {isAllergicToPenicillin ? (
              <>
                <p className="text-lg font-semibold pl-2 pt-2 text-primary">
                  Alergia a la penicilina:
                </p>
                <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
                  {((props.age.years === 0 && props.age.months >= 1) ||
                    (props.age.years >= 1 && props.age.years <= 11)) && (
                    <li>
                      Claritromicina, dosis orales, 1 mes a 11 años: 7.5 mg/kg
                      dos veces al día por 5 días.
                    </li>
                  )}
                  {props.age.years >= 12 && props.age.years <= 17 && (
                    <li>
                      Claritromicina, dosis orales, 12 años a 17 años: 250 mg a
                      500 mg dos veces al día por 5 días en total.
                    </li>
                  )}
                </ul>
              </>
            ) : null}
          </div>
        )}

        <div className="bg-base-200 mt-4 px-2 py-4 border border-primary rounded-md shadow-md">
          <h3 className="text-lg font-semibold leading-7 text-primary">
            Recomendaciones adicionales
          </h3>
          <ul className="list-disc list-outside text-sm leading-6 pl-6 text-secondary">
            <li>
              Realizar pruebas para detectar virus de influenza (durante
              temporada de influenza o brotes) y/o SARS CoV2.
            </li>
            <li>Control de fiebre.</li>
          </ul>
        </div>
      </div>
    );
  }
};

export default DisplayNeumoniaAdquiridaComunidad;
