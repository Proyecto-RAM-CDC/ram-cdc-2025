import { RequireTreatmentUretritis } from "~/algorithms/ITS/utilitiesForRendering";

const DisplayUretritis = (
  hasDisuria: boolean,
  hasIritacionUretral: boolean
) => {
  return (
    <div>
      <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
        <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
          Requiere tratamiento antibiótico para{" "}
          <span className="italic">Uretritis</span>
        </h3>

        <RequireTreatmentUretritis
          hasDisuria={hasDisuria}
          hasIritacionUretral={hasIritacionUretral}
        />
      </div>

      <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
        <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
          Tratamiento empírico
        </h3>
        <p className="text-lg font-semibold pl-2 text-primary">Elección:</p>
        <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
          <li>Ceftriaxona 1 gramo IM DU mas.</li>
          <li>Doxiciclina 100 mg VO cada 12 hrs por 7 días.</li>
          <li>Metronidazol 500 mg VO cada 12 hrs por 7 días.</li>
        </ul>
      </div>

      <div className="bg-base-200 mt-4 px-2 py-4 border border-primary rounded-md shadow-md">
        <h3 className="text-lg font-semibold leading-7 text-primary">
          Recomendaciones adicionales
        </h3>
        <ul className="list-disc list-outside text-sm leading-6 pl-6 text-secondary">
          <li>
            Si se cuenta con microscopio localmento y/o este no es el primer
            episodio considerar realizar localmente pruebas de microscopia y con
            envio de cultivo y PCR/NAATS.
          </li>
          <li>Muestra secreción uretral, rectal.</li>
          <li>
            En todos los casos hacer búsqueda activa de otras ITS y solicitar
            prueba de VIH.
          </li>
          <li>Tratamiento a pareja(s) sexual(es).</li>
        </ul>
      </div>
    </div>
  );
};

export default DisplayUretritis;
