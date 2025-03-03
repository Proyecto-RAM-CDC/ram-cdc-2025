import {
  RequireTreatmentDolorAbdominalBajo,
  PrimaryTreatmentDolorAbdominalBajo,
} from "~/algorithms/ITS/utilitiesForRendering";

const DisplayDolorAbdominalBajo = (
  hasEpiHistory: boolean,
  hasItsHistory: boolean,
  hasUterinoInstrumentHistory: boolean,
  hasDispareunia: boolean,
  hasDolorBilateral: boolean,
  hasDolarMenstruation: boolean,
  hasFlujoVaginalPurulento: boolean,
  hasHistoryParejaIts: boolean,
  isEmbarazada: boolean
) => {
  return (
    <div>
      <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
        <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
          Requiere tratamiento antibiótico para{" "}
          <span className="italic">Sindrome de dolor abdominal bajo</span>
        </h3>
        <h4 className="text-xl pb-1 font-semibold leading-7 text-primary">
          Enfermedad pelvica inflamatoria
        </h4>
        <RequireTreatmentDolorAbdominalBajo
          hasEpiHistory={hasEpiHistory}
          hasItsHistory={hasItsHistory}
          hasUterinoInstrumentHistory={hasUterinoInstrumentHistory}
          hasDispareunia={hasDispareunia}
          hasDolorBilateral={hasDolorBilateral}
          hasDolarMenstruation={hasDolarMenstruation}
          hasFlujoVaginalPurulento={hasFlujoVaginalPurulento}
          hasHistoryParejaIts={hasHistoryParejaIts}
        />
      </div>

      <PrimaryTreatmentDolorAbdominalBajo isEmbarazada={isEmbarazada} />

      <div className="bg-base-200 mt-4 px-2 py-4 border border-primary rounded-md shadow-md">
        <h3 className="text-lg font-semibold leading-7 text-primary">
          Derivar a segundo nivel para tratmiento IV para los siguientes
          síntomas:
        </h3>
        <ul className="list-disc list-inside text-sm leading-6 text-secondary">
          <li>Rebote abdominal a la exploración.</li>
          <li>Aborto reciente.</li>
          <li>Masa anexial papable.</li>
          <li>Fiebre.</li>
          <li>Embarazo actual.</li>
        </ul>
      </div>

      <div className="bg-base-200 mt-4 px-2 py-4 border border-primary rounded-md shadow-md">
        <h3 className="text-lg font-semibold leading-7 pl-6 text-primary">
          Recomendaciones adicionales
        </h3>
        <ul className="list-disc list-inside text-sm leading-6 text-secondary">
          <li>Retirar DIU si presente.</li>
          <li>Tratamiento a pareja(s) sexual(es).</li>
        </ul>
      </div>
    </div>
  );
};

export default DisplayDolorAbdominalBajo;
