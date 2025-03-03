import DisplayBronquitis from "~/algorithms/IRAS/DisplayBronquitis";
import {
  DisplayExacerbationDeEpocOnly,
  DisplayExacerbacionDeEpocHospital,
} from "~/algorithms/IRAS/DisplayExacerbacionEpoc";
import DisplayNeumoniaAdquiridaComunidad from "~/algorithms/IRAS/DisplayNeumonia";
import DisplayOtitisMediaAguda from "~/algorithms/IRAS/DisplayOtitisMediaAguda";
import DisplaySinusitis from "~/algorithms/IRAS/DisplaySinusitis";
import DisplayFaringitisAguda from "~/algorithms/IRAS/DisplayFaringitis";
import DisplayTreatmentSintomatico from "~/algorithms/IRAS/DisplayTreatmentSintomatico";
import hasSecondarySymptom from "~/algorithms/hasSecondarySymptom";
import { ALL_IRAS_SYMPTOMS } from "~/algorithms/IRAS/utilitiesSymptoms";
import { enumCondition, typeReportCard } from "~/algorithms/utilitiesTypes";
import { typeVisitationStringified } from "~/utilities/types";

const checkSymptom = (
  symptom: string,
  visitation: typeVisitationStringified
) => {
  return hasSecondarySymptom(visitation, symptom, enumCondition.Iras);
};

export const renderDiagnosisComponent = (
  reportCard: typeReportCard,
  visitation: typeVisitationStringified
) => {
  console.log("renderDiagnosisComponent diagnosis", reportCard.diagnosis);
  switch (reportCard.diagnosis) {
    case "Bronquitis antibiotico":
      return (
        <DisplayBronquitis
          tos_inicio={checkSymptom(
            ALL_IRAS_SYMPTOMS.BRONCHITIS.TOS_INICIO,
            visitation
          )}
          tos_persistent={checkSymptom(
            ALL_IRAS_SYMPTOMS.BRONCHITIS.TOS_PERSISTENTE,
            visitation
          )}
          hasFiebre={checkSymptom(
            ALL_IRAS_SYMPTOMS.BRONCHITIS.FIEBRE_BAJA_BRONQUITIS,
            visitation
          )}
          ante_ivr={checkSymptom(
            ALL_IRAS_SYMPTOMS.BRONCHITIS.ANTE_IVR_ALTAS,
            visitation
          )}
          explore_normal={checkSymptom(
            ALL_IRAS_SYMPTOMS.BRONCHITIS.EXPLORATION_NORMAL,
            visitation
          )}
        />
      );
    case "Exacerbación de EPOC":
      return (
        <DisplayExacerbationDeEpocOnly
          ante_epoc={checkSymptom(
            ALL_IRAS_SYMPTOMS.CENTRO.ANTE_EPOC,
            visitation
          )}
          no_datos_neumonia={checkSymptom(
            ALL_IRAS_SYMPTOMS.CENTRO.NO_DATOS_NEUMONIA,
            visitation
          )}
          embarazo={reportCard.embarazo}
        />
      );
    case "Exacerbación de EPOC enviar a segundo nivel":
      return (
        <DisplayExacerbacionDeEpocHospital
          taquepnea_disnea={checkSymptom(
            ALL_IRAS_SYMPTOMS.ENVIAR_SEGUNO_NIVEL.TAQUEPNEA_DISNEA,
            visitation
          )}
          musculos_resp={checkSymptom(
            ALL_IRAS_SYMPTOMS.ENVIAR_SEGUNO_NIVEL.MUSCULOS_RESP,
            visitation
          )}
          cianosis_edema={checkSymptom(
            ALL_IRAS_SYMPTOMS.ENVIAR_SEGUNO_NIVEL.CIANOSIS_EDEMA,
            visitation
          )}
          confusion_mareo={checkSymptom(
            ALL_IRAS_SYMPTOMS.ENVIAR_SEGUNO_NIVEL.CONFUSION_MAREO,
            visitation
          )}
          impos_hacer_activi={checkSymptom(
            ALL_IRAS_SYMPTOMS.ENVIAR_SEGUNO_NIVEL.IMPOS_HACER_ACTIVI,
            visitation
          )}
          oximetria={checkSymptom(
            ALL_IRAS_SYMPTOMS.ENVIAR_SEGUNO_NIVEL.OXIMETRIA,
            visitation
          )}
          oxigeno_suplen={checkSymptom(
            ALL_IRAS_SYMPTOMS.ENVIAR_SEGUNO_NIVEL.OXIGENO_SUPLEN,
            visitation
          )}
        />
      );
    case "Neumonía adquirida en la comunidad":
      return (
        <DisplayNeumoniaAdquiridaComunidad
          tos={checkSymptom(ALL_IRAS_SYMPTOMS.NEUMONIA.TOS_INICIO, visitation)}
          hasFiebre={checkSymptom(
            ALL_IRAS_SYMPTOMS.NEUMONIA.FIEBRE_BAJA,
            visitation
          )}
          disnea={checkSymptom(ALL_IRAS_SYMPTOMS.NEUMONIA.DISNEA, visitation)}
          sin_ante_hospital={checkSymptom(
            ALL_IRAS_SYMPTOMS.NEUMONIA.SIN_ANTE_HOSPITAL,
            visitation
          )}
          signo_pulmon={checkSymptom(
            ALL_IRAS_SYMPTOMS.NEUMONIA.SIGNO_PULMON,
            visitation
          )}
          signo_taquic={checkSymptom(
            ALL_IRAS_SYMPTOMS.NEUMONIA.SIGNO_TAQUIC,
            visitation
          )}
          enfermo_confusion={checkSymptom(
            ALL_IRAS_SYMPTOMS.NEUMONIA.ENFERMO_CONFUSION,
            visitation
          )}
          respiracion_rapida={checkSymptom(
            ALL_IRAS_SYMPTOMS.NEUMONIA.RESPIRACION_RAPIDA,
            visitation
          )}
          ta_sistolica={checkSymptom(
            ALL_IRAS_SYMPTOMS.NEUMONIA.TA_SISTOLICA,
            visitation
          )}
          incapacidad_alimentarse={checkSymptom(
            ALL_IRAS_SYMPTOMS.NEUMONIA.INCAPACIDAD_ALIMENTARSE,
            visitation
          )}
          convulsions={checkSymptom(
            ALL_IRAS_SYMPTOMS.NEUMONIA.CONVULSIONS,
            visitation
          )}
          letargia={checkSymptom(
            ALL_IRAS_SYMPTOMS.NEUMONIA.LETARGIA,
            visitation
          )}
          desnutricion={checkSymptom(
            ALL_IRAS_SYMPTOMS.NEUMONIA.DESNUTRICION,
            visitation
          )}
          age={reportCard.age}
          embarazo={reportCard.embarazo}
          allergies={reportCard.allergies}
        />
      );
    case "Neumonia sintomatico":
      return DisplayTreatmentSintomatico("Neumonia", reportCard.allergies);
    case "OMA antibiotico":
      return (
        <DisplayOtitisMediaAguda
          dolor_otico_agudo={checkSymptom(
            ALL_IRAS_SYMPTOMS.OTITIS_MEDIA_AGUDA.DOLOR_OTICO_AGUDO,
            visitation
          )}
          secrecion_puru_oido={checkSymptom(
            ALL_IRAS_SYMPTOMS.OTITIS_MEDIA_AGUDA.SECRECION_PURU_OIDO,
            visitation
          )}
          hasFiebre={checkSymptom(
            ALL_IRAS_SYMPTOMS.OTITIS_MEDIA_AGUDA.FIEBRE_ALTAS_OMA,
            visitation
          )}
          dolor_otico_pers={checkSymptom(
            ALL_IRAS_SYMPTOMS.OTITIS_MEDIA_AGUDA.DOLOR_OTICO_PERS,
            visitation
          )}
          age={reportCard.age}
          allergies={reportCard.allergies}
        />
      );
    case "OMA sintomatico":
      return DisplayTreatmentSintomatico(
        "Otitis Media Aguda",
        reportCard.allergies
      );
    case "Faringitis antibiotico":
      return (
        <DisplayFaringitisAguda
          dolor_faringeo={checkSymptom(
            ALL_IRAS_SYMPTOMS.ENVIAR_SEGUNO_NIVEL.DOLOR_FARINGEO,
            visitation
          )}
          ausencia_tos={checkSymptom(
            ALL_IRAS_SYMPTOMS.ENVIAR_SEGUNO_NIVEL.AUSENCIA_TOS,
            visitation
          )}
          eritema_faringeo={checkSymptom(
            ALL_IRAS_SYMPTOMS.ENVIAR_SEGUNO_NIVEL.ERITEMA_FARINGEO,
            visitation
          )}
          fiebre_altas_b={checkSymptom(
            ALL_IRAS_SYMPTOMS.ENVIAR_SEGUNO_NIVEL.FIEBRE_ALTAS_FARINGITIS,
            visitation
          )}
          adenopatia={checkSymptom(
            ALL_IRAS_SYMPTOMS.ENVIAR_SEGUNO_NIVEL.ADENOPATIA,
            visitation
          )}
          exudado={checkSymptom(
            ALL_IRAS_SYMPTOMS.ENVIAR_SEGUNO_NIVEL.EXUDADO,
            visitation
          )}
          age={reportCard.age}
        />
      );
    case "Faringitis sintomatico":
      return DisplayTreatmentSintomatico(
        "Faringitis Aguda",
        reportCard.allergies
      );
    case "Sinusitis antibiotico":
      return (
        <DisplaySinusitis
          dolor_facial_memo={checkSymptom(
            ALL_IRAS_SYMPTOMS.SINUSITIS_SINTOMATICO.DOLOR_FACIAL_MENO,
            visitation
          )}
          secrecion_puru_nasal={checkSymptom(
            ALL_IRAS_SYMPTOMS.SINUSITIS_SINTOMATICO.SECRECION_PURU_NASAL,
            visitation
          )}
          sensacion_facial={checkSymptom(
            ALL_IRAS_SYMPTOMS.SINUSITIS_SINTOMATICO.SENSACION_FACIAL,
            visitation
          )}
          dolor_aumenta={checkSymptom(
            ALL_IRAS_SYMPTOMS.SINUSITIS_SINTOMATICO.DOLOR_AUMENTA,
            visitation
          )}
          fiebre_altas_c={checkSymptom(
            ALL_IRAS_SYMPTOMS.SINUSITIS_ANTIBIOTICO.FIEBRE_ALTAS_SINUSITIS,
            visitation
          )}
          sinusitis_no_mej={checkSymptom(
            ALL_IRAS_SYMPTOMS.SINUSITIS_ANTIBIOTICO.SINUSITIS_NO_MEJ,
            visitation
          )}
          nasal_puru={checkSymptom(
            ALL_IRAS_SYMPTOMS.SINUSITIS_ANTIBIOTICO.NASAL_PURU,
            visitation
          )}
          dolor_facial_mas={checkSymptom(
            ALL_IRAS_SYMPTOMS.SINUSITIS_ANTIBIOTICO.DOLOR_FACIAL_MAS,
            visitation
          )}
          age={reportCard.age}
        />
      );
    case "Sinusitis sintomatico":
      return DisplayTreatmentSintomatico("Sinusitis", reportCard.allergies);
    default:
      return null;
  }
};
