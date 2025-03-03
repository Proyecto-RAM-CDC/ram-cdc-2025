import { ALL_ITS_SYMPTOMS } from "~/algorithms/ITS/utilitiesSymptoms";

export const AdditionalTreatmentFlujoVaginal: React.FC = () => {
  return (
    <>
      <p className="text-lg text-primary font-semibold mt-4 pl-2">
        Ademas, la paciente presenta hasEdema vulvar, vaginal, hasPrurito,
        secreción hasBlanquecinaEspesa espesa, hasEritema, o hasEscoriaciones.
      </p>

      <p className="text-lg font-semibold pl-2 text-primary">Agregar:</p>
      <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
        <li>Fluconazole 200 mg VO dosis unica.</li>
      </ul>
      <p className="text-lg font-semibold pl-2 text-primary">
        Alternativa (a):
      </p>
      <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
        <li>
          Clotrimazol 2% crema (5 gramos) intravaginal por la noche por 3 días.
        </li>
      </ul>
      <p className="text-lg font-semibold pl-2 text-primary">
        Alternativa (b):
      </p>
      <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
        <li>
          Ovulos de fluconazole 100 mg intravaginales por la noche por 3-5
          noches.
        </li>
      </ul>
      <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
        <li>Y, nuevamente, el tratamiento de la(s) pareja(s) sexual(es).</li>
      </ul>
    </>
  );
};

export const PrimaryTreatmentFlujoVaginal: React.FC = () => {
  return (
    <>
      <p className="text-lg font-semibold pl-2 text-primary">Primario:</p>
      <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
        <li>Metronidazol 500 mg VO cada 12 hrs por 7 días.</li>
        <li>Tratamiento a pareja(s) sexual(es).</li>
      </ul>
      <p className="text-lg font-semibold pl-2 text-primary">
        Alternativa (1):
      </p>
      <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
        <li>Tinidazole 2 gramos VO por 2 días.</li>
      </ul>
      <p className="text-lg font-semibold pl-2 text-primary">
        Alternativa (2):
      </p>
      <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
        <li>
          Clindamycin crema 2% (5 gramos) intravaginal por la noche 7 días
          (Clinidamicina no cubre trichomoniasis).
        </li>
      </ul>
    </>
  );
};

export const RequireTreatmentFlujoVaginal: React.FC<{
  hasCervicitisFlujoCervical: boolean;
  hasDolorCervix: boolean;
  hasEdema: boolean;
  hasEritema: boolean;
  hasEscoriaciones: boolean;
  hasPrurito: boolean;
  hasBlanquecinaEspesa: boolean;
}> = (props) => {
  const symptomsList = [
    {
      condition: props.hasCervicitisFlujoCervical,
      text: ALL_ITS_SYMPTOMS.FLUJO_VAGINAL.CERVICITIS_FLUJO_CERVICAL,
    },
    {
      condition: props.hasDolorCervix,
      text: ALL_ITS_SYMPTOMS.FLUJO_VAGINAL.DOLOR_MOVILIZACION_CERVIX,
    },
    { condition: props.hasEdema, text: ALL_ITS_SYMPTOMS.FLUJO_VAGINAL.EDEMA },
    {
      condition: props.hasEritema,
      text: ALL_ITS_SYMPTOMS.FLUJO_VAGINAL.ERITEMA,
    },
    {
      condition: props.hasEscoriaciones,
      text: ALL_ITS_SYMPTOMS.FLUJO_VAGINAL.ESCORIACIONES,
    },
    {
      condition: props.hasPrurito,
      text: ALL_ITS_SYMPTOMS.FLUJO_VAGINAL.PRURITO,
    },
    {
      condition: props.hasBlanquecinaEspesa,
      text: ALL_ITS_SYMPTOMS.FLUJO_VAGINAL.SECRECION_BLANQUECINA,
    },
  ];
  return (
    <ul className="list-disc list-outside text-base leading-6 text-white pl-6 font-semibold">
      {symptomsList
        .filter(({ condition }) => condition)
        .map(({ text }, index) => (
          <li key={index}>{text}.</li>
        ))}
    </ul>
  );
};

export const RequireTreatmentDolorAbdominalBajo: React.FC<{
  hasEpiHistory: boolean;
  hasItsHistory: boolean;
  hasUterinoInstrumentHistory: boolean;
  hasDispareunia: boolean;
  hasDolorBilateral: boolean;
  hasDolarMenstruation: boolean;
  hasFlujoVaginalPurulento: boolean;
  hasHistoryParejaIts: boolean;
}> = (props) => {
  return (
    <ul className="list-disc list-outside text-base leading-6 text-white pl-6 font-semibold">
      {props.hasEpiHistory && (
        <li>{ALL_ITS_SYMPTOMS.DOLOR_ABDOMINAL_BAJO.ANTECEDENTES_EPI}.</li>
      )}
      {props.hasItsHistory && (
        <li>{ALL_ITS_SYMPTOMS.DOLOR_ABDOMINAL_BAJO.ANTECEDENTES_ITS}.</li>
      )}
      {props.hasUterinoInstrumentHistory && (
        <li>{ALL_ITS_SYMPTOMS.DOLOR_ABDOMINAL_BAJO.ANTECEDENTES_UTERINO}.</li>
      )}
      {props.hasDispareunia && (
        <li>{ALL_ITS_SYMPTOMS.DOLOR_ABDOMINAL_BAJO.DISPAREUNIA}.</li>
      )}
      {props.hasDolorBilateral && (
        <li>{ALL_ITS_SYMPTOMS.DOLOR_ABDOMINAL_BAJO.DOLOR_BILATERAL}.</li>
      )}
      {props.hasDolarMenstruation && (
        <li>{ALL_ITS_SYMPTOMS.DOLOR_ABDOMINAL_BAJO.DOLOR_MESTRUACION}.</li>
      )}
      {props.hasFlujoVaginalPurulento && (
        <li>
          {
            ALL_ITS_SYMPTOMS.DOLOR_ABDOMINAL_BAJO
              .FLUJO_VAGINAL_CERVICAL_PULURENTO
          }
          .
        </li>
      )}
      {props.hasHistoryParejaIts && (
        <li>{ALL_ITS_SYMPTOMS.DOLOR_ABDOMINAL_BAJO.PAREJA_SEXUAL_DE_ITS}.</li>
      )}
    </ul>
  );
};

export const PrimaryTreatmentDolorAbdominalBajo: React.FC<{
  isEmbarazada: boolean;
}> = (props) => {
  return (
    <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
      <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
        Tratamiento empírico
      </h3>
      <p className="text-lg font-semibold pl-2 text-primary">Elección:</p>
      <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
        <li>Ceftriaxona 1 gramo IM cada 12 hrs por 7-14 días.</li>
        {props.isEmbarazada ? (
          <li>
            En embarazo: no doxiciclina, usar alternativa azitromicina 1 gramo
            VO dosis unica.
          </li>
        ) : (
          <li>Doxiciclina 100 mg VO cada 12 hrs por 7-14 días.</li>
        )}

        <li>Metronidazol 500 mg VO cada 12 hrs por 7-14 días.</li>
        <li>Tratamiento a pareja(s) sexual(es).</li>
      </ul>
    </div>
  );
};

export const RequireTreatmentEpididimitis: React.FC<{
  hasRelacionesSexualesSinProtection: boolean;
  palpacion: boolean;
  medicamentos: boolean;
  aumento: boolean;
  instrumentation_tract: boolean;
  hasSexoAnal: boolean;
  isImmunosuppressed: boolean;
}> = (props) => {
  return (
    <ul className="list-disc list-outside text-base leading-6 text-white pl-6 font-semibold">
      {props.hasRelacionesSexualesSinProtection && (
        <li>
          {
            ALL_ITS_SYMPTOMS.DOLOR_E_INFLAMACION_ESCROTAL
              .ANTECEDENTES_SIN_CONDOM
          }
        </li>
      )}
      {props.palpacion && (
        <li>{ALL_ITS_SYMPTOMS.DOLOR_E_INFLAMACION_ESCROTAL.DOLOR_PALPACION}</li>
      )}
      {props.medicamentos && (
        <li>
          {
            ALL_ITS_SYMPTOMS.DOLOR_E_INFLAMACION_ESCROTAL
              .INFLAMACION_MEDICAMENTOS
          }
        </li>
      )}
      {props.aumento && (
        <li>
          {ALL_ITS_SYMPTOMS.DOLOR_E_INFLAMACION_ESCROTAL.INFLAMACION_AUMENTO}
        </li>
      )}
      {props.instrumentation_tract && (
        <li>
          {ALL_ITS_SYMPTOMS.DOLOR_E_INFLAMACION_ESCROTAL.INFLAMACION_TRACTO}
        </li>
      )}
      {props.hasSexoAnal && (
        <li>{ALL_ITS_SYMPTOMS.DOLOR_E_INFLAMACION_ESCROTAL.SEXO_ANAL}</li>
      )}
      {props.isImmunosuppressed && (
        <li>El paciente está inmunocomprometido.</li>
      )}
    </ul>
  );
};

export const RequireTreatmentHerpesSimple: React.FC<{
  hasMultipleLesions: boolean;
  hasUlcerasGenitalesDolor: boolean;
}> = (props) => {
  return (
    <ul className="list-disc list-outside text-base leading-6 text-white pl-6 font-semibold">
      {props.hasUlcerasGenitalesDolor && (
        <li>
          {ALL_ITS_SYMPTOMS.ULCERAS_GENITALES.ULCERAS_GENITALES_DOLOROSAS}.
        </li>
      )}
      {props.hasMultipleLesions && (
        <li>{ALL_ITS_SYMPTOMS.ULCERAS_GENITALES.SON_LESIONES_MULTIPLES}.</li>
      )}
    </ul>
  );
};

export const RequireTreatementProctitis: React.FC<{
  hasDiarrea: boolean;
  hasDolorRectal: boolean;
  hasFiebre: boolean;
  hasFisuras: boolean;
  hasHipotension: boolean;
  hasLinfadenopatias: boolean;
  hasRectorregia: boolean;
}> = (props) => {
  return (
    <ul className="list-disc list-outside text-base leading-6 text-white pl-6 font-semibold">
      {props.hasDiarrea && (
        <li>{ALL_ITS_SYMPTOMS.CONDICIONES_RECTAL.DIARREA}.</li>
      )}
      {props.hasDolorRectal && (
        <li>{ALL_ITS_SYMPTOMS.CONDICIONES_RECTAL.DOLOR_RECTAL}.</li>
      )}
      {props.hasFiebre && (
        <li>{ALL_ITS_SYMPTOMS.CONDICIONES_RECTAL.FIEBRE}.</li>
      )}
      {props.hasFisuras && (
        <li>{ALL_ITS_SYMPTOMS.CONDICIONES_RECTAL.FISURAS}.</li>
      )}
      {props.hasHipotension && (
        <li>{ALL_ITS_SYMPTOMS.CONDICIONES_RECTAL.HIPOTENSION}.</li>
      )}
      {props.hasLinfadenopatias && (
        <li>{ALL_ITS_SYMPTOMS.CONDICIONES_RECTAL.LINFAD}.</li>
      )}
      {props.hasRectorregia && (
        <li>{ALL_ITS_SYMPTOMS.CONDICIONES_RECTAL.RECTORRAGIA}.</li>
      )}
    </ul>
  );
};

export const RequireTreatmentSifilisPrimaria: React.FC<{
  lesionesunicas: boolean;
  hasUlcerasGenitalesDolor: boolean;
  ulcerasgenitalessindolor: boolean;
}> = (props) => {
  return (
    <ul className="list-disc list-outside text-base leading-6 text-white pl-6 font-semibold">
      {props.hasUlcerasGenitalesDolor && (
        <li>
          {ALL_ITS_SYMPTOMS.ULCERAS_GENITALES.ULCERAS_GENITALES_DOLOROSAS}.
        </li>
      )}
      {props.ulcerasgenitalessindolor && (
        <li>
          {ALL_ITS_SYMPTOMS.ULCERAS_GENITALES.ULCERAS_GENITALES_NO_DOLOROSAS}.
        </li>
      )}
      {props.lesionesunicas && (
        <li>{ALL_ITS_SYMPTOMS.ULCERAS_GENITALES.SON_LESIONES_UNICAS}.</li>
      )}
    </ul>
  );
};

export const RequireTreatmentUretritis: React.FC<{
  hasDisuria: boolean;
  hasIritacionUretral: boolean;
}> = (props) => {
  return (
    <ul className="list-disc list-outside text-base leading-6 text-white pl-6 font-semibold">
      {props.hasDisuria && (
        <li>{ALL_ITS_SYMPTOMS.SECRECION_URETRAL.DISURIA}.</li>
      )}
      {props.hasIritacionUretral && (
        <li>{ALL_ITS_SYMPTOMS.SECRECION_URETRAL.IRRITACION_URETRAL}.</li>
      )}
    </ul>
  );
};

export const RequireTreatmentVPH: React.FC<{
  hasUlcerasGenitalesSinDolor: boolean;
  hasUlcerasPlanas: boolean;
}> = (props) => {
  return (
    <ul className="list-disc list-outside text-base leading-6 text-white pl-6 font-semibold">
      {props.hasUlcerasGenitalesSinDolor && (
        <li>
          {ALL_ITS_SYMPTOMS.ULCERAS_GENITALES.ULCERAS_GENITALES_NO_DOLOROSAS}.
        </li>
      )}
      {props.hasUlcerasPlanas && (
        <li>
          {ALL_ITS_SYMPTOMS.ULCERAS_GENITALES.ULCERAS_GENITALES_SON_PLANAS}.
        </li>
      )}
    </ul>
  );
};
