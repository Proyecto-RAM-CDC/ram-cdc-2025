import EDASPositiveResult from "~/algorithms/EDAS/EdasPositive";
import EdasNegativeResult from "~/algorithms/EDAS/EdasNegative";
import buildPatientReportCard from "~/algorithms/BuildPatientReportCard";
import PatientCard from "~/algorithms/PatientCard";
import { determineConclusion } from "~/algorithms/EDAS/utilitiesForRendering";
import {
  typeReportCard,
  typePropsAlgos,
  enumCondition,
} from "~/algorithms/utilitiesTypes";

const AlgorithmEDAS: React.FC<typePropsAlgos> = ({ loaderData }) => {
  const reportCard: typeReportCard = buildPatientReportCard(
    loaderData.clinicos,
    loaderData.visitation,
    enumCondition.Edas
  );

  const {
    hasDisenteria,
    hasFiebre,
    hasDolorAbdominal,
    hasDiarrea,
    isImmunosuppressed,
    hasSangreHeces,
    evacuationCount,
    patientType,
    hasRenalIssues,
    takenMedication,
    hospitalized,
    positive,
  } = determineConclusion(reportCard);

  return (
    <div className="mx-12">
      <PatientCard data={reportCard} />
      <div className="mb-4">
        {positive && (
          <EDASPositiveResult
            hasDisenteria={hasDisenteria}
            hasFiebre={hasFiebre}
            hasDolorAbdominal={hasDolorAbdominal}
            hasDiarrea={hasDiarrea}
            isImmunosuppressed={isImmunosuppressed}
            hasSangreHeces={hasSangreHeces}
            evacuationCount={evacuationCount}
            patientType={patientType}
            age={reportCard.age}
          />
        )}
        {!positive && (
          <EdasNegativeResult
            hasDisenteria={hasDisenteria}
            hasFiebre={hasFiebre}
            hasDolorAbdominal={hasDolorAbdominal}
            hasDiarrea={hasDiarrea}
            isImmunosuppressed={isImmunosuppressed}
            hasSangreHeces={hasSangreHeces}
            evacuationCount={evacuationCount}
            patientType={patientType}
            hasRenalIssues={hasRenalIssues}
            takenMedication={takenMedication}
            hospitalized={hospitalized}
            age={reportCard.age}
          />
        )}
      </div>
    </div>
  );
};

export default AlgorithmEDAS;
