// File: utilitiesForSyndrome.tsx
// Path: app/algorithms/IVU/utilitiesForSyndrome.tsx
// Objective: Utility functions to check for risk factors and syndromes associated with IVU.

import { ALL_IVU_SYMPTOMS } from "~/algorithms/IVU/utilitiesSymptoms";
import { typeReportCard, enumRiskFactors } from "~/algorithms/utilitiesTypes";

export const checkRiskFactors = (reportCard: typeReportCard) => {
  return {
    hasTakenMedication: reportCard.takenMedication,
    wasHospitalized: reportCard.hospitalized,
    hasInfectionHistory: reportCard.symptoms.includes(
      ALL_IVU_SYMPTOMS.INFECCION_DE_REPETICION
    ),
    hasDiabetes: reportCard.symptoms.includes(enumRiskFactors.Diabetes),
    isImmunosuppressed: reportCard.symptoms.includes(
      enumRiskFactors.Inmunosupresion
    ),
    isEmbarazada: reportCard.symptoms.includes(enumRiskFactors.Embarazo),
    isPosmenopausica: reportCard.postmenopausia,
    hasAlterationAnatomica: reportCard.symptoms.includes(
      ALL_IVU_SYMPTOMS.ALT_ANAT_FUNC_VIA_URINARIA
    ),
  };
};

export const checkCistitisAguda = (reportCard: typeReportCard) => {
  // Using "includes" here means we are checking for exact matches.
  const hasDisuria: boolean = reportCard.symptoms.includes(
    ALL_IVU_SYMPTOMS.DISURIA
  );
  const hasUrgencia: boolean = reportCard.symptoms.includes(
    ALL_IVU_SYMPTOMS.URGENCIA
  );
  const hasPolaquiuria: boolean = reportCard.symptoms.includes(
    ALL_IVU_SYMPTOMS.POLAQUIURIA
  );
  const hasTenesmoVesical: boolean = reportCard.symptoms.includes(
    ALL_IVU_SYMPTOMS.TENESMO_VESICAL
  );

  const hasCistitisAguda =
    hasDisuria || hasUrgencia || hasPolaquiuria || hasTenesmoVesical;

  return {
    hasCistitisAguda,
    hasDisuria,
    hasUrgencia,
    hasPolaquiuria,
    hasTenesmoVesical,
  };
};

export const checkPielonefritisAguda = (reportCard: typeReportCard) => {
  // Using "includes" here means we are checking for exact matches.
  const hasDolorLumbar: boolean = reportCard.symptoms.includes(
    ALL_IVU_SYMPTOMS.DOLOR_LUMBAR
  );
  const hasFiebre: boolean = reportCard.symptoms.includes(
    ALL_IVU_SYMPTOMS.FIEBRE
  );
  const hasDolorAnguloCostovertebral: boolean = reportCard.symptoms.includes(
    ALL_IVU_SYMPTOMS.DOLOR_ANGULO_COSTOVERTEBRAL
  );
  const hasMalEstado: boolean = reportCard.symptoms.includes(
    ALL_IVU_SYMPTOMS.MAL_ESTADO_GENERAL
  );

  const hasPielonefritisAguda =
    hasDolorLumbar || hasFiebre || hasMalEstado || hasDolorAnguloCostovertebral;

  return {
    hasPielonefritisAguda,
    hasDolorLumbar,
    hasFiebre,
    hasMalEstado,
    hasDolorAnguloCostovertebral,
  };
};

export const checkProstatitis = (reportCard: typeReportCard) => {
  // Using "includes" here means we are checking for exact matches.
  const hasDolorPelvico: boolean = reportCard.symptoms.includes(
    ALL_IVU_SYMPTOMS.DOLOR_PELVICO
  );
  const hasAntecedenteManipulacionViaUrinaria: boolean =
    reportCard.symptoms.includes(ALL_IVU_SYMPTOMS.ANTE_DE_MANIP_VIA_URINARIA);
  const hasAntecedenteCistitisRepetida: boolean = reportCard.symptoms.includes(
    ALL_IVU_SYMPTOMS.ANTE_DE_CISTITIS_REPITICION
  );
  const hasDolorEspaldaBaja: boolean = reportCard.symptoms.includes(
    ALL_IVU_SYMPTOMS.DOLOR_ESPALDA_BAJA
  );
  const hasDolorPerineal: boolean = reportCard.symptoms.includes(
    ALL_IVU_SYMPTOMS.DOLOR_PERINEAL
  );
  const hasDolorProstata: boolean = reportCard.symptoms.includes(
    ALL_IVU_SYMPTOMS.DOLOR_PALPACION_PROSTATA
  );

  const hasProstatitis =
    reportCard.sexonacer === "Hombre" &&
    (hasDolorPelvico ||
      hasAntecedenteManipulacionViaUrinaria ||
      hasAntecedenteCistitisRepetida ||
      hasDolorEspaldaBaja ||
      hasDolorPerineal ||
      hasDolorProstata);

  return {
    hasProstatitis,
    hasDolorPelvico,
    hasAntecedenteManipulacionViaUrinaria,
    hasAntecedenteCistitisRepetida,
    hasDolorEspaldaBaja,
    hasDolorPerineal,
    hasDolorProstata,
  };
};
