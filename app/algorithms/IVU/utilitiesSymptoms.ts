// File: utilitiesSymptoms.ts
// Path: app/algorithms/IVU/utilitiesSymptoms.ts
// Objective: Descriptions of the possible secondary symptoms associated with IVU.

import { typeFlatSymptomData } from "~/algorithms/utilitiesTypes";

export const ALL_IVU_SYMPTOMS: typeFlatSymptomData = {
  DISURIA: "Disuria",
  POLAQUIURIA: "Polaquiuria",
  HEMATURIA: "Hematuria",
  URGENCIA: "Urgencia",
  TENESMO_VESICAL: "Tenesmo vesical",
  DOLOR_LUMBAR: "Dolor lumbar",
  DOLOR_PELVICO: "Dolor pélvico",
  FIEBRE: "Fiebre",
  INFECCION_DE_REPETICION: "Infección ITU repetida",
  ALT_ANAT_FUNC_VIA_URINARIA:
    "Alteración anatómica o funcional de la vía urinary",
  ANTE_DE_MANIP_VIA_URINARIA: "Antecedente de manipulación de la vía urinaria",
  ANTE_DE_CISTITIS_REPITICION: "Antecedente de cistitis de repetición",
  DOLOR_ANGULO_COSTOVERTEBRAL: "Dolor en angulo costovertebral",
  MAL_ESTADO_GENERAL: "Mal estado general",
  DOLOR_PERINEAL: "Dolor perineal",
  DOLOR_ESPALDA_BAJA: "Dolor espalda baja",
  DOLOR_PALPACION_PROSTATA: "Dolor a la palpación de la próstata",
};

export const ALL_IVU_LABELS: typeFlatSymptomData = {
  DISURIA: "Dolor al orinar.",
  POLAQUIURIA: "Incremento de la frecuencia de urinaria.",
  HEMATURIA: "Sangre en la orina.",
  URGENCIA: "Necesidad urgente de orinar.",
  TENESMO_VESICAL: "Sensación de no vaciar la vejiga.",
  DOLOR_LUMBAR: "Dolor en la espalda baja.",
  DOLOR_PELVICO: "Dolor en la parte baja del abdomen.",
  FIEBRE: "Temperatura corporal elevada a más de 38℃.",
  INFECCION_DE_REPETICION:
    "Antecedente de infecciones de vías urinarias de repetición en los últimos 3 meses.",
  ALT_ANAT_FUNC_VIA_URINARIA:
    "Megauréter, cistocele, uréter ectópico, lesiones medulares.",
  ANTE_DE_MANIP_VIA_URINARIA:
    "Sonda vesical, biopsia prostática, estudios de urodinamia, catéter crónico.",
  ANTE_DE_CISTITIS_REPITICION:
    "Más de 3 episodios de cistitis en el último año.",
  DOLOR_ANGULO_COSTOVERTEBRAL:
    "Dolor costovertebral de la espalda, los flancos y el ángulo formado por la 12ª costilla y la columna vertebral.",
  MAL_ESTADO_GENERAL:
    "El paciente se siente mal, cansado, débil o enfermo. Posiblemente con náuseas y/o vómito.",
  DOLOR_PERINEAL: "Dolor en la zona entre el ano y los genitales.",
  DOLOR_ESPALDA_BAJA: "Dolor en la parte baja de la espalda.",
  DOLOR_PALPACION_PROSTATA: "Dolor al tacto en la próstata.",
};
