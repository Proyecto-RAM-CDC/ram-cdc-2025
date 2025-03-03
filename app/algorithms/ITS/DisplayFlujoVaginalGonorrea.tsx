import { ALL_ITS_SYMPTOMS } from "~/algorithms/ITS/utilitiesSymptoms";

const DisplayFlujoVaginalGonorrea = (
  hasCervicitisFlujoCervical: boolean,
  hasDolorCervix: boolean,
  isEmbarazada: boolean
) => {
  return (
    <div>
      <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
        <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
          Requiere tratamiento antibiótico para{" "}
          <span className="italic">Gonorrea</span> y otras causas de{" "}
          <span className="italic">Cervicitis</span>
        </h3>
        <ul className="list-disc list-outside text-base leading-6 text-white pl-6 font-semibold">
          {hasCervicitisFlujoCervical && (
            <li>{ALL_ITS_SYMPTOMS.FLUJO_VAGINAL.CERVICITIS_FLUJO_CERVICAL}.</li>
          )}
          {hasDolorCervix && (
            <li>{ALL_ITS_SYMPTOMS.FLUJO_VAGINAL.DOLOR_MOVILIZACION_CERVIX}.</li>
          )}
        </ul>
      </div>

      <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
        <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
          Tratamiento empírico
        </h3>
        <p className="text-lg font-semibold pl-2 text-primary">Elección:</p>
        <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
          <li>Ceftriaxona 1 gramo IM DU mas.</li>
          <li>
            {isEmbarazada
              ? "En embarazo: no doxiciclina, usar alternativa azitromicina 1 gramo VO dosis unica."
              : "Doxiciclina 100 mg VO cada 12 hrs por 7 días."}
          </li>
          <li>Metronidazol 500 mg VO cada 12 hrs por 7 días.</li>
          <li>Tratamiento a pareja(s) sexual(es).</li>
        </ul>
      </div>

      <div className="bg-base-200 mt-4 px-2 py-4 border border-primary rounded-md shadow-md">
        <h3 className="text-lg font-semibold leading-7 text-primary">
          Recomendaciones adicionales
        </h3>
        <ul className="list-disc list-outside text-sm leading-6 pl-6 text-secondary">
          <li>
            Si este no es el primer episodio considerar realizar cultivo y
            PCR/NAATS.
          </li>
          <li>Considerar el algoritmo para Enfermedad Pélvica Inflamatoria.</li>
        </ul>
      </div>
    </div>
  );
};

export default DisplayFlujoVaginalGonorrea;
