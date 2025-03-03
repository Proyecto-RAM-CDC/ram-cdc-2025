import { useEffect, useRef } from "react";
import { useFetcher } from "@remix-run/react";
import { useVisitationIDStore } from "~/state/store";
import {
  DatosAlarma,
  AdditionalRecommendations,
  AdultoMayorTreatmentEDASn,
  NonSeriousDiarrea,
  FiebreDolorAbdominal,
  DiarreaSangre,
  DiarreaFiebre,
  FiebreNoDiarrea,
  NoFiebreNoDiarreaNoSangre,
} from "~/algorithms/EDAS/utilitiesForRendering";
import { typeEdasPropsNegative } from "~/algorithms/utilitiesTypes";

const EdasNegativeResult: React.FC<typeEdasPropsNegative> = (props) => {
  const dataForServer = useRef<string | null>(JSON.stringify(props));

  const visitationID = useVisitationIDStore.getState().visitationID;
  const fetcher = useFetcher();

  useEffect(() => {
    fetcher.submit(
      { props: dataForServer.current },
      {
        method: "POST",
        action: `/add/revise?q=EDASn&id=${visitationID}`,
      }
    );
  }, [visitationID]);

  console.log("EdasNegativeResult props", props);

  return (
    <div>
      <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary">
        <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
          No requiere tratamiento antibiótico
        </h3>
        <ul className="list-disc list-outside text-base leading-6 pl-6 text-white font-semibold">
          {!props.hasDisenteria && (
            <li>No sospecha de enfermedad por Shigella (disentería).</li>
          )}

          {<FiebreDolorAbdominal {...props} />}
          {<DiarreaSangre {...props} />}
          {<DiarreaFiebre {...props} />}
          {<NonSeriousDiarrea {...props} />}
          {<FiebreNoDiarrea {...props} />}
          {<NoFiebreNoDiarreaNoSangre {...props} />}

          {!props.isImmunosuppressed && <li>No inmunocompromiso.</li>}
        </ul>
      </div>

      <div className="bg-base-200 mt-4 px-2 py-4 border border-primary">
        {props.patientType === "Adulto mayor" && (
          <AdultoMayorTreatmentEDASn {...props} />
        )}

        <AdditionalRecommendations />

        <DatosAlarma isImmunosuppressed={props.isImmunosuppressed} />
      </div>
    </div>
  );
};

export default EdasNegativeResult;
