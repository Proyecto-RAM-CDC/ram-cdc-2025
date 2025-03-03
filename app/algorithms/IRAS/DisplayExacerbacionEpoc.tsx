import { ALL_IRAS_SYMPTOMS } from "~/algorithms/IRAS/utilitiesSymptoms";

export const DisplayExacerbationDeEpocOnly: React.FC<{
  ante_epoc: boolean;
  no_datos_neumonia: boolean;
  embarazo: boolean;
}> = (props) => {
  return (
    <div>
      <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
        <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
          Requiere tratamiento antibiótico{" "}
          <span className="italic">exacerbación de EPOC</span>
        </h3>
        <ul className="list-disc list-outside text-base leading-6 text-white pl-6 font-semibold">
          {props.ante_epoc && <li>{ALL_IRAS_SYMPTOMS.CENTRO.ANTE_EPOC}.</li>}
          {props.no_datos_neumonia && (
            <li>{ALL_IRAS_SYMPTOMS.CENTRO.NO_DATOS_NEUMONIA}.</li>
          )}
        </ul>
      </div>

      <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
        <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
          Tratamiento empírico
        </h3>
        <p className="text-lg font-semibold pl-2 text-primary">1ra Elección:</p>
        <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
          <li>Amoxicilina 500 mg vía oral cada 8 hrs por 5 días.</li>
        </ul>
        <p className="text-lg font-semibold pl-2 text-primary">
          1ra Elección (Alergias):
        </p>
        <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
          <li>
            Doxiciclina 200 mg 1er día y después 100 mg vía oral cada 12 hrs por
            5 días ... <span className="underline">o</span> ... Claritromicina
            500 mg cada 12 hrs por 5 días.
          </li>
        </ul>
        <p className="text-lg font-semibold pl-2 text-primary">
          Tratamiento empírico alternativo:
        </p>
        <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
          <li>
            Amoxicilina con ácido 500 mg clavulánico 875/125 mg cada 8 hrs por 5
            días.
          </li>
        </ul>
        {props.embarazo && (
          <p className="text-lg font-semibold pl-2 text-primary">
            No utilizar quinolonas (ciprofloxacin, levofloxacin, moxifloxacin) o
            tetraciclinas (doxiciclina) en embarazo.
          </p>
        )}
      </div>

      <div className="bg-base-200 mt-4 px-2 py-4 border border-primary rounded-md shadow-md">
        <h3 className="text-lg font-semibold leading-7 text-primary">
          Recomendaciones adicionales
        </h3>
        <ul className="list-disc list-outside text-sm leading-6 pl-6 text-secondary">
          <li>No es necesario realizar estudios de imagen ni cultivos.</li>
          <li>
            Realizar pruebas para detectar virus de influenza (durante temporada
            de influenza o brotes) y/o SARS CoV2.
          </li>
        </ul>
      </div>
    </div>
  );
};

export const DisplayExacerbacionDeEpocHospital: React.FC<{
  taquepnea_disnea: boolean;
  musculos_resp: boolean;
  cianosis_edema: boolean;
  confusion_mareo: boolean;
  impos_hacer_activi: boolean;
  oximetria: boolean;
  oxigeno_suplen: boolean;
}> = (props) => {
  return (
    <div>
      <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
        <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
          Requiere enviar a segundo nivel/hospitalizacion
        </h3>
        <ul className="list-disc list-outside text-base leading-6 text-white pl-6 font-semibold">
          {props.taquepnea_disnea && (
            <li>{ALL_IRAS_SYMPTOMS.ENVIAR_SEGUNO_NIVEL.TAQUEPNEA_DISNEA}.</li>
          )}
          {props.musculos_resp && (
            <li>{ALL_IRAS_SYMPTOMS.ENVIAR_SEGUNO_NIVEL.MUSCULOS_RESP}.</li>
          )}
          {props.cianosis_edema && (
            <li>{ALL_IRAS_SYMPTOMS.ENVIAR_SEGUNO_NIVEL.CIANOSIS_EDEMA}.</li>
          )}
          {props.confusion_mareo && (
            <li>{ALL_IRAS_SYMPTOMS.ENVIAR_SEGUNO_NIVEL.CONFUSION_MAREO}.</li>
          )}
          {props.impos_hacer_activi && (
            <li>{ALL_IRAS_SYMPTOMS.ENVIAR_SEGUNO_NIVEL.IMPOS_HACER_ACTIVI}.</li>
          )}
          {props.oximetria && (
            <li>{ALL_IRAS_SYMPTOMS.ENVIAR_SEGUNO_NIVEL.OXIMETRIA}.</li>
          )}
          {props.oxigeno_suplen && (
            <li>{ALL_IRAS_SYMPTOMS.ENVIAR_SEGUNO_NIVEL.OXIGENO_SUPLEN}.</li>
          )}
        </ul>
      </div>
    </div>
  );
};
