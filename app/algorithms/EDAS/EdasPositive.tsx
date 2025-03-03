import { useEffect, useRef } from "react";
import { useFetcher } from "@remix-run/react";
import { useVisitationIDStore } from "~/state/store";
import {
  DatosAlarma,
  PaediatricTreatment,
  AdultTreatment,
  AdultMayorTreatmentEDAsp,
  AdditionalRecommendations,
  RenderConclusion,
} from "~/algorithms/EDAS/utilitiesForRendering";
import { typeEdasPropsPositive } from "~/algorithms/utilitiesTypes";

const EdasPositiveResult: React.FC<typeEdasPropsPositive> = (props) => {
  const dataForServer = useRef<string | null>(JSON.stringify(props));

  const visitationID = useVisitationIDStore.getState().visitationID;
  const fetcher = useFetcher();

  useEffect(() => {
    fetcher.submit(
      { props: dataForServer.current },
      {
        method: "POST",
        action: `/add/revise?q=EDASp&id=${visitationID}`,
      }
    );
  }, [visitationID]);

  console.log("EdasPositiveResult props", props);

  return (
    <div className="py-4">
      {<RenderConclusion {...props} />}

      <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary">
        <h3 className="text-2xl underline pb-1 font-semibold leading-7 text-primary">
          Tratamiento antibiótico
        </h3>
        {props.patientType === "Pediátrico" && (
          <PaediatricTreatment age={props.age} />
        )}
        {props.patientType === "Adulto" && <AdultTreatment />}
        {props.patientType === "Adulto mayor" && <AdultMayorTreatmentEDAsp />}
      </div>

      <div className="bg-base-200 mt-4 px-2 py-4 border border-primary">
        <AdditionalRecommendations />

        <DatosAlarma isImmunosuppressed={props.isImmunosuppressed} />
      </div>
    </div>
  );
};

export default EdasPositiveResult;
