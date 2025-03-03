// File: AlgorithmIVU.tsx
// Path: app/algorithms/AlgorithmIVU.ts
// Objective: Main entry point for the IVU algorithm. It will display the patient card
// and the different possible syndromes associated with IVU.

import PatientCard from "~/algorithms/PatientCard";
import {
  DisplayCistitisAguda,
  DisplayCistitisAgudaRecommendations,
} from "~/algorithms/IVU/DisplayCistitisAguda";
import {
  DisplayPielonefritisAguda,
  DisplayPielonefritisAgudaRecommendations,
} from "~/algorithms/IVU/DisplayPielonefritisAguda";
import {
  DisplayProstatitis,
  DisplayProstatitisRecommendations,
} from "~/algorithms/IVU/DisplayProstatitis";
import {
  DisplayIvuNegativeResult,
  DisplayIvuNegativeResultRecommendations,
} from "~/algorithms/IVU/DisplayIvuNegative";
import {
  DisplayRiskFactors,
  DisplayComplicadas,
} from "~/algorithms/IVU/DisplayComplicadasRisks";
import buildPatientReportCard from "~/algorithms/BuildPatientReportCard";
import {
  checkCistitisAguda,
  checkPielonefritisAguda,
  checkProstatitis,
  checkRiskFactors,
} from "~/algorithms/IVU/utilitiesForSyndromes";
import {
  typeReportCard,
  typePropsAlgos,
  enumCondition,
} from "~/algorithms/utilitiesTypes";

const AlgorithmIVU: React.FC<typePropsAlgos> = ({ loaderData }) => {
  const reportCard: typeReportCard = buildPatientReportCard(
    loaderData.clinicos,
    loaderData.visitation,
    enumCondition.Ivu
  );

  // RISK FACTORS.
  const {
    hasTakenMedication,
    wasHospitalized,
    hasInfectionHistory,
    hasDiabetes,
    isImmunosuppressed,
    isEmbarazada,
    isPosmenopausica,
    hasAlterationAnatomica,
  } = checkRiskFactors(reportCard);

  // CISTITIS AGUDA.
  const {
    hasCistitisAguda,
    hasDisuria,
    hasUrgencia,
    hasPolaquiuria,
    hasTenesmoVesical,
  } = checkCistitisAguda(reportCard);

  // PIELONEFRITIS AGUDA.
  const {
    hasPielonefritisAguda,
    hasDolorLumbar,
    hasFiebre,
    hasMalEstado,
    hasDolorAnguloCostovertebral,
  } = checkPielonefritisAguda(reportCard);

  // PROSTATITIS AGUDA.
  const {
    hasProstatitis,
    hasDolorPelvico,
    hasAntecedenteManipulacionViaUrinaria,
    hasAntecedenteCistitisRepetida,
    hasDolorEspaldaBaja,
    hasDolorPerineal,
    hasDolorProstata,
  } = checkProstatitis(reportCard);

  return (
    <div className="mx-4 lg:mx-12 my-6">
      <PatientCard data={reportCard} />

      {hasCistitisAguda ? (
        <DisplayCistitisAguda
          hasDisuria={hasDisuria}
          hasUrgencia={hasUrgencia}
          hasPolaquiuria={hasPolaquiuria}
          hasTenesmoVesical={hasTenesmoVesical}
          hasAntecedenteCistitisRepetida={hasAntecedenteCistitisRepetida}
        />
      ) : hasPielonefritisAguda ? (
        <DisplayPielonefritisAguda
          hasDolorLumbar={hasDolorLumbar}
          hasFiebre={hasFiebre}
          hasMalEstado={hasMalEstado}
          hasDolorAnguloCostovertebral={hasDolorAnguloCostovertebral}
        />
      ) : hasProstatitis ? (
        <DisplayProstatitis
          hasDolorPelvico={hasDolorPelvico}
          hasAntecedenteManipulacionViaUrinaria={
            hasAntecedenteManipulacionViaUrinaria
          }
          hasAntecedenteCistitisRepetida={hasAntecedenteCistitisRepetida}
          hasDolorEspaldaBaja={hasDolorEspaldaBaja}
          hasDolorPerineal={hasDolorPerineal}
          hasDolorProstata={hasDolorProstata}
        />
      ) : (
        <DisplayIvuNegativeResult />
      )}

      {(hasTakenMedication || wasHospitalized || hasInfectionHistory) && (
        <DisplayRiskFactors
          hasTakenMedication={hasTakenMedication}
          wasHospitalized={wasHospitalized}
          hasInfectionHistory={hasInfectionHistory}
        />
      )}
      {(hasDiabetes ||
        isImmunosuppressed ||
        isPosmenopausica ||
        isEmbarazada ||
        hasAlterationAnatomica ||
        wasHospitalized) && (
        <DisplayComplicadas
          hasDiabetes={hasDiabetes}
          isImmunosuppressed={isImmunosuppressed}
          isPosmenopausica={isPosmenopausica}
          isEmbarazada={isEmbarazada}
          hasAlterationAnatomica={hasAlterationAnatomica}
          wasHospitalized={wasHospitalized}
        />
      )}

      {hasCistitisAguda ? (
        <DisplayCistitisAgudaRecommendations
          hasInfectionHistory={hasInfectionHistory}
          isEmbarazada={isEmbarazada}
        />
      ) : hasPielonefritisAguda ? (
        <DisplayPielonefritisAgudaRecommendations isEmbarazada={isEmbarazada} />
      ) : hasProstatitis ? (
        <DisplayProstatitisRecommendations />
      ) : (
        <DisplayIvuNegativeResultRecommendations isEmbarazada={isEmbarazada} />
      )}
    </div>
  );
};

export default AlgorithmIVU;
