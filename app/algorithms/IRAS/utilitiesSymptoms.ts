// File: utilitiesSymptoms.ts
// Path: app/algorithms/IRAS/utilitiesSymptoms.ts
// Objective: Descriptions of the possible secondary symptoms associated with IRAS.

import { typeNestedSymptomData } from "~/algorithms/utilitiesTypes";

export const ALL_IRAS_SYMPTOMS: typeNestedSymptomData = {
  BRONCHITIS: {
    TOS_INICIO: "Tos de inicio agudo o subagudo (bronquitis)",
    TOS_PERSISTENTE: "Tos que puede ser persistente (duración de semanas)",
    FIEBRE_BAJA_BRONQUITIS:
      "Fiebre (temperatura corporal elevada a más de 38℃ - bronquitis)",
    ANTE_IVR_ALTAS:
      "Antecedente o concurrencia de infección de vías respiratorias altas",
    EXPLORATION_NORMAL:
      "Exploración física - normal, sin signos de consolidación pulmonar",
  },

  CENTRO: {
    ANTE_EPOC: "Antecedente de EPOC o enfermedad pulmonar crónica",
    NO_DATOS_NEUMONIA: "No hay datos clínicos que hagan sospechar neumonía",
  },

  EPOC: {
    AUMENTO_EXPECT: "Aumento de expectoración",
    CAMBIAR_COLOR: "Puede cambiar el color",
    PURULENTO: "Puede ser purulento mayor tos, fiebre",
    ANTE_IRS: "Antecedente de infecciones respiratoria superior",
  },

  ENVIAR_SEGUNO_NIVEL: {
    TAQUEPNEA_DISNEA: "Taquepnea or disnea",
    MUSCULOS_RESP: "Uso de músculos accesorios respiratorios",
    CIANOSIS_EDEMA: "Cianosis, edema periferico",
    CONFUSION_MAREO: "Confusion, mareo",
    IMPOS_HACER_ACTIVI: "Imposibilidad de hacer sus actividades diarias",
    OXIMETRIA: "Oximetria <88-90%, arritmia",
    OXIGENO_SUPLEN: "Mayor necesidad de oxigeno suplementario",
  },

  NEUMONIA: {
    TOS_INICIO: "Tos de inicio agudo o subagudo (neumonía)",
    FIEBRE_BAJA: "Fiebre baja (neumonía)",
    DISNEA: "Disnea (neumonía)",
    SIN_ANTE_HOSPITAL:
      "Sin antecedente de hospitalización en las últimas 48 hrs",
    SIGNO_PULMON:
      "Con exploración física hay signos de consolidación pulmonar (estertores, egofonía, etc)",
    SIGNO_TAQUIC:
      "Con exploración física hay signos de taquicardia, disminución de la saturación de oxígeno",
    ENFERMO_CONFUSION: "El enfermo presenta confusión",
    RESPIRACION_RAPIDA:
      "Frecuencia respiratoria mayor o igual que 30 por minuto",
    TA_SISTOLICA:
      "T.A. sistólica menor que 90 mmHg o T.A. diastólica menor que 60 mmHg",
    INCAPACIDAD_ALIMENTARSE:
      "Incapacidad para alimentarse o beber al seno materno",
    CONVULSIONS: "Convulsiones, cianosis",
    LETARGIA: "Letargia o disminución del estado de despierto",
    DESNUTRICION: "Desnutrición y/o malnutrición",
  },

  OTITIS_MEDIA_AGUDA: {
    DOLOR_OTICO_AGUDO: "Dolor ótico agudo",
    SECRECION_PURU_OIDO: "Secreción purulenta a través del oído",
    FIEBRE_ALTAS_OMA: "Fiebre otitis media aguda",
    DOLOR_OTICO_PERS: "Persistencia del dolor ótico a pesar de analgésicos",
  },

  FARINGITIS: {
    DOLOR_FARINGEO: "Dolor faríngeo",
    AUSENCIA_TOS: "Ausencia de tos",
    ERITEMA_FARINGEO: "Eritema faríngeo",
    FIEBRE_ALTAS_FARINGITIS:
      "Fiebre (temperatura corporal elevada a más de 38℃ - faringitis)",
    ADENOPATIA: "Adenopatía cervical anterior dolorosa",
    EXUDADO: "Exudado faringoamigdalar",
  },

  SINUSITIS_SINTOMATICO: {
    DOLOR_FACIAL_MENO: "Dolor facial menos de 7 días",
    SECRECION_PURU_NASAL: "Secreción purulenta obstruccionándolas nasal",
    SENSACION_FACIAL: "Sensación de plenitud facial",
    DOLOR_AUMENTA:
      "Dolor aumenta a la palpacion o al inclinar la cabeza hacia adelante",
  },

  SINUSITIS_ANTIBIOTICO: {
    FIEBRE_ALTAS_SINUSITIS:
      "Fiebre (temperatura corporal elevada a más de 38℃ - sinusitis)",
    SINUSITIS_NO_MEJ:
      "Sinusitis no mejora con tratamiento de analgésico, descongestionantes y antihistamínico (sinusitis alérgica)",
    NASAL_PURU: "Descarga nasal purulenta",
    DOLOR_FACIAL_MAS: "Dolor facial más de 7 días",
  },

  ENVIAR_HOSPITAL_URGENTE: {
    LESIONES_OCULARES: "Lesiones oculares",
    FACIALES_VISIBLES:
      "Faciales visibles (proptosis, celuitis facial, parálisis facial)",
    DESCARGA_NASAL: "Descarga nasal purulenta",
  },
};

export const ALL_IRAS_LABELS: typeNestedSymptomData = {
  BRONCHITIS: {
    TOS_INICIO: "Tos de bronquitis",
    TOS_PERSISTENTE: "Tos que puede ser persistente (duración de semanas)",
    FIEBRE_BAJA_BRONQUITIS: "Fiebre baja (bronquitis)",
    ANTE_IVR_ALTAS:
      "Antecedente o concurrencia de infección de vías respiratorias altas",
    EXPLORE_NORMAL:
      "Exploración física normal, sin signos de consolidación pulmonar",
  },

  CENTRO: {
    ANTE_EPOC: "Antecedente de EPOC o enfermedad pulmonar crónica",
    NO_DATOS_NEUMONIA: "No hay datos clínicos que hagan sospechar neumonía",
  },

  EPOC: {
    AUMENTO_EXPECT: "Aumento de expectoración",
    CAMBIAR_COLOR: "Puede cambiar el color",
    PURULENTO: "Puede ser purulento mayor tos, fiebre",
    ANTE_IRS: "Antecedente de infecciones respiratoria superior",
  },

  ENVIAR_SEGUNO_NIVEL: {
    TAQUEPNEA_DISNEA: "Taquepnea or disnea",
    MUSCULOS_RESP: "Uso de músculos accesorios respiratorios",
    CIANOSIS_EDEMA: "Cianosis, edema periferico",
    CONFUSION_MAREO: "Confusion, mareo",
    IMPOS_HACER_ACTIVI: "Imposibilidad de hacer sus actividades diarias",
    OXIMETRIA: "Oximetria <88-90%, arritmia",
    OXIGENO_SUPLEN: "Mayor necesidad de oxigeno suplementario",
  },

  NEUMONIA: {
    TOS_INICIO: "Tos de neumonia",
    FIEBRE_BAJA: "Fiebre baja (neumonía)",
    DISNEA: "Disnea (neumonía)",
    SIN_ANTE_HOSPITAL:
      "Sin antecedente de hospitalización en las últimas 48 hrs",
    SIGNO_PULMON:
      "Con exploración física hay signos de consolidación pulmonar (estertores, egofonía, etc)",
    SIGNO_TAQUIC:
      "Con exploración física hay signos de taquicardia, disminución de la saturación de oxígeno",
    ENFERMO_CONFUSION: "El enfermo presenta confusión",
    RESPIRACION_RAPIDA:
      "Frecuencia respiratoria mayor o igual que 30 por minuto",
    TA_SISTOLICA:
      "T.A. sistólica menor que 90 mmHg o T.A. diastólica menor que 60 mmHg",
    INCAPACIDAD_ALIMENTARSE:
      "Incapacidad para alimentarse o beber al seno materno",
    CONVULSIONS: "Convulsiones, cianosis",
    LETARGIA: "Letargia o disminución del estado de despierto",
    DESNUTRICION: "Desnutrición y/o malnutrición",
  },

  OTITIS_MEDIA_AGUDA: {
    DOLOR_OTICO_AGUDO: "Dolor ótico agudo",
    SECRECION_PURU_OIDO: "Secreción purulenta a través del oído",
    FIEBRE_ALTAS_OMA: "Fiebre otitis media aguda",
    DOLOR_OTICO_PERS: "Persistencia del dolor ótico a pesar de analgésicos",
  },

  FARINGITIS: {
    DOLOR_FARINGEO: "Dolor faríngeo",
    AUSENCIA_TOS: "Ausencia de tos",
    ERITEMA_FARINGEO: "Eritema faríngeo",
    FIEBRE_ALTAS_FARINGITIS: "Fiebre altas faringitis",
    ADENOPATIA: "Adenopatía cervical anterior dolorosa",
    EXUDADO: "Exudado faringoamigdalar",
  },

  SINUSITIS_SINTOMATICO: {
    DOLOR_FACIAL_MENO: "Dolor facial menos de 7 días",
    SECRECION_PURU_NASAL: "Secreción purulenta obstruccionándolas nasal",
    SENSACION_FACIAL: "Sensación de plenitud facial",
    DOLOR_AUMENTA:
      "Dolor aumenta a la palpacion o al inclinar la cabeza hacia adelante",
  },

  SINUSITIS_ANTIBIOTICO: {
    FIEBRE_ALTAS_SINUSITIS: "Fiebre altas sinusitis",
    SINUSITIS_NO_MEJ:
      "Sinusitis no mejora con tratamiento de analgésico, descongestionantes y antihistamínico (sinusitis alérgica)",
    NASAL_PURU: "Descarga nasal purulenta",
    DOLOR_FACIAL_MAS: "Dolor facial más de 7 días",
  },

  ENVIAR_HOSPITAL_URGENTE: {
    LESIONES_OCULARES: "Lesiones oculares",
    FACIALES_VISIBLES:
      "Faciales visibles (proptosis, celuitis facial, parálisis facial)",
    DESCARGA_NASAL: "Descarga nasal purulenta",
  },
};
