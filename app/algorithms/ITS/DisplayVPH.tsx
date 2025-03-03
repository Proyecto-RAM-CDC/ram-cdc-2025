import { RequireTreatmentVPH } from "~/algorithms/ITS/utilitiesForRendering";

const DisplayVPH = (
  hasUlcerasGenitalesSinDolor: boolean,
  hasUlcerasPlanas: boolean
) => {
  return (
    <div>
      <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
        <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
          Requiere tratamiento para <span className="italic">VPH</span>
        </h3>

        <RequireTreatmentVPH
          hasUlcerasGenitalesSinDolor={hasUlcerasGenitalesSinDolor}
          hasUlcerasPlanas={hasUlcerasPlanas}
        />
      </div>

      <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
        <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
          Exploracion
        </h3>
        <ul className="list-disc list-outside text-base leading-6 pl-2 text-white font-semibold">
          <li>Exploracion vaginal, uretral, rectal, cervical.</li>
          <li>Descartar infecciones por VPH oncogenicos.</li>
        </ul>
      </div>

      <div className="bg-base-200 mt-4 px-2 py-4 border border-primary rounded-md shadow-md">
        <h3 className="text-lg font-semibold leading-7 text-primary">
          Recomendaciones adicionales
        </h3>
        <ul className="list-disc list-outside text-sm leading-6 pl-6 text-secondary">
          <li>
            En todos los casos hacer búsqueda activa de otras ITS, solicitar
            prueba de VIH.
          </li>
          <li>Tratamiento a pareja(s) sexual(es).</li>
          <li>
            Sí úlceras recurrentes considerar PCR/NAATS e identificar etiologia.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DisplayVPH;
