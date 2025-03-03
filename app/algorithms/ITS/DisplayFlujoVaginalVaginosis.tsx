import {
  AdditionalTreatmentFlujoVaginal,
  PrimaryTreatmentFlujoVaginal,
  RequireTreatmentFlujoVaginal,
} from "~/algorithms/ITS/utilitiesForRendering";

const DisplayFlujoVaginalVaginosis = (
  hasCervicitisFlujoCervical: boolean,
  hasDolorCervix: boolean,
  hasEdema: boolean,
  hasEritema: boolean,
  hasEscoriaciones: boolean,
  hasPrurito: boolean,
  hasBlanquecinaEspesa: boolean
) => {
  return (
    <div>
      <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
        <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
          Requiere tratamiento antibiótico para{" "}
          <span className="italic">Vaginosis y Trichomoniasis</span>
        </h3>
        <RequireTreatmentFlujoVaginal
          hasCervicitisFlujoCervical={hasCervicitisFlujoCervical}
          hasDolorCervix={hasDolorCervix}
          hasEdema={hasEdema}
          hasEritema={hasEritema}
          hasEscoriaciones={hasEscoriaciones}
          hasPrurito={hasPrurito}
          hasBlanquecinaEspesa={hasBlanquecinaEspesa}
        />
      </div>

      <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
        <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
          Tratamiento empírico
        </h3>
        <PrimaryTreatmentFlujoVaginal />

        {(hasEdema ||
          hasPrurito ||
          hasBlanquecinaEspesa ||
          hasEritema ||
          hasEscoriaciones) && <AdditionalTreatmentFlujoVaginal />}
      </div>

      <div className="bg-base-200 mt-4 px-2 py-4 border border-primary rounded-md shadow-md">
        <h3 className="text-lg font-semibold leading-7 text-primary">
          Recomendaciones adicionales
        </h3>
        <ul className="list-disc list-outside text-sm leading-6 pl-6 text-secondary">
          <li>
            Si este no es el primer episodio y se cuenta con microscopio,
            coonsiderar realizar localmente pruebas de microscopia y con envio
            de cultivo y PCR/NAATS.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DisplayFlujoVaginalVaginosis;
