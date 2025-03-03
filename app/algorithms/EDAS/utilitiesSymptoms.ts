// File: utilitiesSymptoms.ts
// Path: app/algorithms/EDAS/utilitiesSymptoms.ts
// Objective: Descriptions of the possible secondary symptoms associated with EDAS.

import { typeFlatSymptomData } from "~/algorithms/utilitiesTypes";

export const ALL_EDAS_SYMPTOMS: typeFlatSymptomData = {
  DISENTERIA:
    "Disentería - Sospecha de enfermedad por Shigella sp. o presenta fiebre, dolor, y sangre en heces.",
  FIEBRE: "Fiebre",
  DOLOR_ABDOMINAL: "Dolor abdominal tipo cólico o tenesmo",
  DIARREA: "Diarrea",
  SANGRE_HECES: "Sangre en heces",
  VOMITO: "Vómito",
  DESHIDRATACION: "Signos o síntomas de deshidratación",
};

export const ALL_EDAS_LABELS: typeFlatSymptomData = {
  DISENTERIA:
    "Sospecha de enfermedad por Shigella sp. o presenta fiebre, dolor, y sangre en heces.",
  FIEBRE: "Temperatura corporal elevada a más de 38℃.",
  DOLOR_ABDOMINAL: "Dolor abdominal tipo cólico o tenesmo.",
  DIARREA: "Cuántas evacuaciones en 24 horas.",
  SANGRE_HECES: "Con más de 3 evacuaciones.",
  VOMITO: "Cuántos vómitos en 24 horas.",
  DESHIDRATACION: "Con mucosas secas u ojos hundidos.",
};
