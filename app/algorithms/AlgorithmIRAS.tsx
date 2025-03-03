import { useEffect, useRef } from "react";
import { useFetcher } from "@remix-run/react";
import { useVisitationIDStore } from "~/state/store";
import PatientCard from "~/algorithms/PatientCard";
import {
  typeReportCard,
  typePropsAlgos,
  enumCondition,
} from "~/algorithms/utilitiesTypes";
import buildPatientReportCard from "~/algorithms/BuildPatientReportCard";
import { renderDiagnosisComponent } from "~/algorithms/IRAS/DisplayDiagnosis";
import { getIrasBajasOrAltas } from "~/algorithms/IRAS/utilitiesForDiagnosis";

const AlgorithmIRAS: React.FC<typePropsAlgos> = ({ loaderData }) => {
  console.log("AlgorithmIRAS.tsx loaderData: ", loaderData);

  let reportCard: typeReportCard = buildPatientReportCard(
    loaderData.clinicos,
    loaderData.visitation,
    enumCondition.Iras
  );

  console.log("AlgorithmIRAS reportCard", reportCard);

  reportCard = getIrasBajasOrAltas(loaderData.visitation, reportCard);

  const diagnosis = reportCard.diagnosis;
  const dataForServer = useRef<string | null>(JSON.stringify({ diagnosis }));
  const visitationID = useVisitationIDStore.getState().visitationID;
  const fetcher = useFetcher();

  useEffect(() => {
    fetcher.submit(
      { props: dataForServer.current },
      {
        method: "POST",
        action: `/add/revise?q=IRAS&id=${visitationID}`,
      }
    );
  }, [visitationID]);

  return (
    <div className="mx-4 lg:mx-12 my-6">
      <PatientCard data={reportCard} />
      {renderDiagnosisComponent(reportCard, loaderData.visitation)}
    </div>
  );
};

export default AlgorithmIRAS;
