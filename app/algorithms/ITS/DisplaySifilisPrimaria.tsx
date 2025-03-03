import { RequireTreatmentSifilisPrimaria } from "~/algorithms/ITS/utilitiesForRendering";

const DisplaySifilisPrimaria = (
  lesionesunicas: boolean,
  hasUlcerasGenitalesDolor: boolean,
  ulcerasgenitalessindolor: boolean
) => {
  return (
    <div>
      <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
        <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
          Requiere tratamiento antibiótico para{" "}
          <span className="italic">Herpes Simple</span>
        </h3>

        <RequireTreatmentSifilisPrimaria
          lesionesunicas={lesionesunicas}
          hasUlcerasGenitalesDolor={hasUlcerasGenitalesDolor}
          ulcerasgenitalessindolor={ulcerasgenitalessindolor}
        />
      </div>

      <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
        <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
          Tratamiento para sifilis primaria
        </h3>
        <p className="text-lg font-semibold pl-2 text-primary">Elección:</p>
        <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
          <li>Solicitar VDRL/RPR y FTA/ABS.</li>
          <li>
            Penicilina benzatinica 2.4 millones de unidades IM única dosis.
          </li>
          <li>Tratamiento a pareja(s) sexual(es).</li>
        </ul>
        <p className="text-lg font-semibold pl-6 text-primary">
          Esquemas alterativos (en pacientes alérgicoa a la penicilina).
        </p>
        <ul className="list-disc list-outside text-base leading-6 pl-10 text-white font-semibold">
          <li>Doxiciclina 100 mg VO 14 días.</li>
          <li>Azitromicina 2 gramos VO.</li>
        </ul>
      </div>

      <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
        <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
          Tratamiento empírico chancroide
        </h3>
        <p className="text-lg font-semibold pl-2 text-primary">Elección:</p>
        <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
          <li>Azithromycin 1 gramo VO DU.</li>
          <li>Tratamiento a pareja(s) sexual(es).</li>
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

export default DisplaySifilisPrimaria;
