import {
  typeAge,
  typeEdasPropsPositive,
  typeEdasPropsNegative,
  typeReportCard,
  enumRiskFactors,
} from "~/algorithms/utilitiesTypes";
import { ALL_EDAS_SYMPTOMS } from "~/algorithms/EDAS/utilitiesSymptoms";

export const checkSymptoms = (reportCard: typeReportCard) => {
  const symptoms = reportCard.symptoms;
  return {
    hasDisenteria: symptoms.includes(ALL_EDAS_SYMPTOMS.DISENTERIA),
    hasFiebre: symptoms.includes(ALL_EDAS_SYMPTOMS.FIEBRE),
    hasDolorAbdominal: symptoms.includes(ALL_EDAS_SYMPTOMS.DOLOR_ABDOMINAL),
    hasDiarrea: symptoms.includes(ALL_EDAS_SYMPTOMS.DIARREA),
    hasSangreHeces: symptoms.includes(ALL_EDAS_SYMPTOMS.SANGRE_HECES),
    isImmunosuppressed: symptoms.includes(enumRiskFactors.Inmunosupresion),
    hasRenalIssues: symptoms.includes(enumRiskFactors.HasRenalIssues),
    patientType: reportCard.patientType,
    takenMedication: reportCard.takenMedication,
    hospitalized: reportCard.hospitalized,
    evacuationCount: reportCard.evacuationCount,
  };
};

export const determineConclusion = (reportCard: typeReportCard) => {
  const {
    hasDisenteria,
    hasFiebre,
    hasDolorAbdominal,
    hasDiarrea,
    hasSangreHeces,
    isImmunosuppressed,
    hasRenalIssues,
    patientType,
    takenMedication,
    hospitalized,
    evacuationCount,
  } = checkSymptoms(reportCard);

  const positive =
    hasDisenteria ||
    (hasFiebre && hasDolorAbdominal) ||
    (hasSangreHeces && hasDiarrea && evacuationCount > 3) ||
    (hasFiebre && hasDiarrea && evacuationCount > 6) ||
    isImmunosuppressed;

  const negative = !positive;

  if (!positive && !negative) {
    throw new Error(
      "No se encontró ninguna conclusión positiva o negativa para los EDA."
    );
  }

  return {
    hasDisenteria,
    hasFiebre,
    hasDolorAbdominal,
    hasDiarrea,
    isImmunosuppressed,
    hasSangreHeces,
    evacuationCount,
    patientType,
    hasRenalIssues,
    takenMedication,
    hospitalized,
    positive,
  };
};

export const DatosAlarma = ({
  isImmunosuppressed,
}: {
  isImmunosuppressed: boolean;
}) => {
  return (
    <>
      <h3 className="pt-4 text-base font-semibold leading-7 text-primary">
        Datos de alarma que requieren una gestión de segundo nivel
      </h3>
      <ul className="list-disc list-outside text-sm leading-6 pl-6 text-secondary">
        {isImmunosuppressed && <li>Inmunosupresión.</li>}
        <li>No tolera la vía oral.</li>
        <li>Deshidratación grave.</li>
        <li>Datos de abdomen agudo.</li>
        <li>Septicemia.</li>
        <li>La diarrea y/o la fiebre continúan a pesar del tratamiento.</li>
      </ul>
    </>
  );
};

export const PaediatricTreatment = ({ age }: { age: typeAge }) => {
  const ageYears = age.years;
  const ageMonths = age.months;

  return (
    <>
      <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
        <li>
          1ra elección: Ciprofloxacino 15 mg/kg dos veces al día por tres días.
        </li>
        <li>
          2da elección: Azitromicina 12 mg/kg en el día 1, después 6 mg/kg días
          2 a 5.
        </li>
        <li className="pt-4">
          Alternativo a 1ra y 2da elección: Trimetoprim sulfametoxazol.
        </li>
      </ul>
      <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
        {ageYears >= 1 ? (
          ageYears >= 12 ? (
            <li>Niño - 12 a 17 años: 960 mg dos veces al día.</li>
          ) : ageYears >= 6 && ageYears <= 11 ? (
            <li>
              Niño - 6 a 11 años: 480 mg dos veces al día. Alternativamente 24
              mg/kg dos veces al día.
            </li>
          ) : ageYears <= 5 ? (
            <li>
              Niño - 6 meses a 5 años: 240 mg dos veces al día. Alternativamente
              24 mg/kg dos veces al día.
            </li>
          ) : null
        ) : ageYears < 1 ? (
          ageMonths < 6 ? (
            <li>
              Niño - 6 semanas a 5 meses: 120 mg dos veces al día.
              Alternativamente 24 mg/kg dos veces al día.
            </li>
          ) : (
            <li>
              Niño - 6 meses a 5 años: 240 mg dos veces al día. Alternativamente
              24 mg/kg dos veces al día.
            </li>
          )
        ) : null}
      </ul>
    </>
  );
};

export const AdultTreatment = () => {
  return (
    <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
      <li>
        1ra elección: Ciprofloxacino 500 mg dos veces al día por tres días.
      </li>
      <li>2da elección: Azitromicina 500 mg una vez al día por cinco días.</li>
      <li className="pt-4">
        Alternativo a 1ra y 2da elección: Trimetoprim sulfametoxazol 160/800 mg
        dos veces al día por cinco días.
      </li>
    </ul>
  );
};

export const AdultMayorTreatmentEDAsp = () => {
  return (
    <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
      <li>
        1ra elección: Ciprofloxacino 500 mg dos veces al día por tres días.
      </li>
      <li>2da elección: Azitromicina 500 mg una vez al día por cinco días.</li>
      <li className="pt-4">
        Alternativo a 1ra y 2da elección: Trimetoprim sulfametoxazol 160/800 mg
        dos veces al día por cinco días.
      </li>
    </ul>
  );
};

export const AdditionalRecommendations = () => {
  return (
    <>
      <h3 className="text-lg font-semibold leading-7 text-primary">
        Recomendaciones adicionales
      </h3>
      <ul className="list-disc list-outside text-sm leading-6 pl-6 text-secondary">
        <li>
          Provea información a la persona y/o cuidador para identificar datos de
          alarma.
        </li>
        <li>
          Asegúrese de dar recomendaciones para hidratación (vida suero oral).
        </li>
        <li>Recomendar paracetamol para controlar en caso de fiebre.</li>
        <li>
          Recomendar regresar y revaluar si diarrea continua después de 4 dias.
        </li>
      </ul>
    </>
  );
};

export const RenderConclusion: React.FC<typeEdasPropsPositive> = (props) => {
  return (
    <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary">
      <h3 className="text-2xl underline pb-1 font-semibold leading-7 text-primary">
        Sí, requiere tratamiento antibiótico para los siguientes factores de
        riesgo
      </h3>
      <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
        {props.hasDisenteria && (
          <li>Sospecha de enfermedad por Shigella (disentería).</li>
        )}
        {props.hasFiebre && props.hasDolorAbdominal && (
          <li>Fiebre más dolor abdominal tipo cólico o tenesmo.</li>
        )}
        {props.hasDiarrea && props.hasFiebre && props.evacuationCount > 6 && (
          <li>
            {`Diarrea del viajero más fiebre mayor de 38℃ con ${props.evacuationCount} evacuaciones en las últimas 24 horas.`}
          </li>
        )}
        {props.isImmunosuppressed && <li>Inmunocompromiso.</li>}
        {props.hasDiarrea &&
          props.hasSangreHeces &&
          props.evacuationCount > 3 && (
            <li>
              Diarrea del viajero con sangre en los heces y{" "}
              {props.evacuationCount} evacuaciones en las últimas 24 horas.
            </li>
          )}
      </ul>
    </div>
  );
};

export const FiebreDolorAbdominal: React.FC<typeEdasPropsNegative> = (
  props
) => {
  if (props.hasFiebre && !props.hasDolorAbdominal)
    return (
      <li>
        Hay fiebre mayor de 38℃ pero no hay dolor abdominal tipo cólico o
        tenesmo.
      </li>
    );
  if (!props.hasFiebre && props.hasDolorAbdominal)
    return (
      <li>Hay dolor abdominal tipo cólico o tenesmo pero no hay fiebre.</li>
    );
  return (
    <li>
      No hay fiebre mayor de 38℃ ni dolor abdominal tipo cólico o tenesmo.
    </li>
  );
};

export const DiarreaSangre: React.FC<typeEdasPropsNegative> = (props) => {
  if (props.hasSangreHeces && props.hasDiarrea && props.evacuationCount < 3)
    return (
      <li>
        Hay diarrea y sangre en los heces, pero con solo {props.evacuationCount}{" "}
        evacuaciones en las últimas 24 horas.
      </li>
    );
};

export const DiarreaFiebre: React.FC<typeEdasPropsNegative> = (props) => {
  if (
    !props.hasSangreHeces &&
    props.hasDiarrea &&
    props.evacuationCount < 6 &&
    props.hasFiebre
  )
    return (
      <li>
        Hay diarrea del viajero y fiebre mayor de 38℃, pero con solo{" "}
        {props.evacuationCount} evacuaciones en las últimas 24 horas. Además no
        hay sangre en los heces.
      </li>
    );
};

export const NonSeriousDiarrea: React.FC<typeEdasPropsNegative> = (props) => {
  if (
    !props.hasSangreHeces &&
    props.hasDiarrea &&
    props.evacuationCount < 6 &&
    !props.hasFiebre
  )
    return (
      <li>
        Hay diarrea del viajero, pero con solo {props.evacuationCount}{" "}
        evacuaciones en las últimas 24 horas. Además no hay sangre en los heces
        ni fiebre mayor de 38℃.
      </li>
    );
};

export const FiebreNoDiarrea: React.FC<typeEdasPropsNegative> = (props) => {
  if (!props.hasSangreHeces && !props.hasDiarrea && props.hasFiebre)
    return (
      <li>
        Hay fiebre mayor de 38℃ solo, pero no hay diarrea ni sangre en los
        heces.
      </li>
    );
};

export const NoFiebreNoDiarreaNoSangre: React.FC<typeEdasPropsNegative> = (
  props
) => {
  if (!props.hasSangreHeces && !props.hasDiarrea && !props.hasFiebre)
    return (
      <li>
        No hay fiebre mayor de 38℃, y no hay diarrea ni sangre en los heces.
      </li>
    );
};

export const AdultoMayorTreatmentEDASn: React.FC<{
  takenMedication: boolean;
  hospitalized: boolean;
  isImmunosuppressed: boolean;
  hasRenalIssues: boolean;
}> = (props) => {
  return (
    <>
      <h3 className="text-lg font-semibold leading-7 text-primary">
        En el caso de pacientes mayores de 65 años
      </h3>
      <h4 className="text-base font-semibold leading-7 text-primary">
        <span>
          Sí el paciente presenta alguno de los siguientes factores de riesgo{" "}
        </span>
        <span className="underline">sospeche de C. difficile:</span>
      </h4>
      <ul className="list-disc list-outside text-sm leading-6 pl-6 text-secondary pb-4">
        {props.takenMedication && <li>Exposition a antibioticos reciente.</li>}
        {props.hospitalized && <li>Hospitalización reciente.</li>}
        <li>Exposition a un familiar enfermo.</li>
        <li>Consumo de inhibidores de bomba.</li>
        {props.isImmunosuppressed && <li>Inmunosupresión.</li>}
        {props.hasRenalIssues && <li>Enfermedad renal.</li>}
      </ul>
    </>
  );
};
