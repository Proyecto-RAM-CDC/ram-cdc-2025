import PatientCard from "~/algorithms/PatientCard";
import DisplayEpididimitis from "~/algorithms/ITS/DisplayEpididimitis";
import DisplayUretritis from "~/algorithms/ITS/DisplayUretritis";
import DisplayProctitis from "~/algorithms/ITS/DisplayProctitis";
import DisplayFlujoVaginalGonorrea from "~/algorithms/ITS/DisplayFlujoVaginalGonorrea";
import DisplayFlujoVaginalVaginosis from "~/algorithms/ITS/DisplayFlujoVaginalVaginosis";
import DisplayHerpesSimple from "~/algorithms/ITS/DisplayHerpesSimple";
import DisplaySifilisPrimaria from "~/algorithms/ITS/DisplaySifilisPrimaria";
import DisplayVPH from "~/algorithms/ITS/DisplayVPH";
import DisplayDolorAbdominalBajo from "~/algorithms/ITS/DisplayDolorAbdominalBajo";
import buildPatientReportCard from "~/algorithms/BuildPatientReportCard";
import {
  checkSymptom,
  getMainConditions,
  getDiagnosis,
} from "~/algorithms/ITS/utilitiesForSyndromes";
import { ALL_ITS_SYMPTOMS } from "~/algorithms/ITS/utilitiesSymptoms";
import {
  typeReportCard,
  typePropsAlgos,
  enumCondition,
  enumRiskFactors,
} from "~/algorithms/utilitiesTypes";

const AlgorithmITS: React.FC<typePropsAlgos> = ({ loaderData }) => {
  const reportCard: typeReportCard = buildPatientReportCard(
    loaderData.clinicos,
    loaderData.visitation,
    enumCondition.Its
  );

  // ---------------------------------------------------------------------------
  // Main Conditions.
  const {
    hasEpididimitis,
    hasUretitis,
    hasSyndromaAnoRectal,
    hasSyndromaGonorrea,
    hasSyndromaVaginosis,
    hasSyndromaUlcerasConDolorMultiples,
    hasSyndromaUlcerasConDolorUnicas,
    hasSyndromaUlcerasSinDolorUnicas,
    hasSyndromaUlcerasSinDolorPlanas,
    hasSyndromaDolorAbdominalBajo,
  } = getMainConditions(reportCard);
  // ---------------------------------------------------------------------------

  // ---------------------------------------------------------------------------
  // Diagnosis.
  const {
    hasProctitis,
    hasCervicitisFlujoVaginalGonorrea,
    hasCervicitisFlujoVaginalVaginosis,
    hasHerpesSimple,
    hasSifiilisPrimaria,
    hasVph,
    hasDolorAbdominalBajo,
  } = getDiagnosis({
    hasSyndromaAnoRectal,
    hasSyndromaGonorrea,
    hasSyndromaVaginosis,
    hasSyndromaUlcerasConDolorMultiples,
    hasSyndromaUlcerasConDolorUnicas,
    hasSyndromaUlcerasSinDolorUnicas,
    hasSyndromaUlcerasSinDolorPlanas,
    hasSyndromaDolorAbdominalBajo,
  });
  // ---------------------------------------------------------------------------

  return (
    <div className="mx-4 lg:mx-12 my-6">
      <PatientCard data={reportCard} />

      {hasEpididimitis &&
        DisplayEpididimitis(
          checkSymptom(
            reportCard,
            ALL_ITS_SYMPTOMS.DOLOR_E_INFLAMACION_ESCROTAL
              .ANTECEDENTES_SIN_CONDOM
          ),
          checkSymptom(
            reportCard,
            ALL_ITS_SYMPTOMS.DOLOR_E_INFLAMACION_ESCROTAL.DOLOR_PALPACION
          ),
          checkSymptom(
            reportCard,
            ALL_ITS_SYMPTOMS.DOLOR_E_INFLAMACION_ESCROTAL
              .INFLAMACION_MEDICAMENTOS
          ),
          checkSymptom(
            reportCard,
            ALL_ITS_SYMPTOMS.DOLOR_E_INFLAMACION_ESCROTAL.INFLAMACION_AUMENTO
          ),
          checkSymptom(
            reportCard,
            ALL_ITS_SYMPTOMS.DOLOR_E_INFLAMACION_ESCROTAL.INFLAMACION_TRACTO
          ),
          checkSymptom(
            reportCard,
            ALL_ITS_SYMPTOMS.DOLOR_E_INFLAMACION_ESCROTAL.SEXO_ANAL
          ),
          checkSymptom(reportCard, enumRiskFactors.Inmunosupresion)
        )}
      {hasUretitis &&
        DisplayUretritis(
          checkSymptom(reportCard, ALL_ITS_SYMPTOMS.SECRECION_URETRAL.DISURIA),
          checkSymptom(
            reportCard,
            ALL_ITS_SYMPTOMS.SECRECION_URETRAL.IRRITACION_URETRAL
          )
        )}
      {hasProctitis &&
        DisplayProctitis(
          checkSymptom(reportCard, ALL_ITS_SYMPTOMS.CONDICIONES_RECTAL.DIARREA),
          checkSymptom(
            reportCard,
            ALL_ITS_SYMPTOMS.CONDICIONES_RECTAL.DOLOR_RECTAL
          ),
          checkSymptom(reportCard, ALL_ITS_SYMPTOMS.CONDICIONES_RECTAL.FIEBRE),
          checkSymptom(reportCard, ALL_ITS_SYMPTOMS.CONDICIONES_RECTAL.FISURAS),
          checkSymptom(
            reportCard,
            ALL_ITS_SYMPTOMS.CONDICIONES_RECTAL.HIPOTENSION
          ),
          checkSymptom(reportCard, ALL_ITS_SYMPTOMS.CONDICIONES_RECTAL.LINFAD),
          checkSymptom(
            reportCard,
            ALL_ITS_SYMPTOMS.CONDICIONES_RECTAL.RECTORRAGIA
          )
        )}
      {hasCervicitisFlujoVaginalGonorrea &&
        DisplayFlujoVaginalGonorrea(
          checkSymptom(
            reportCard,
            ALL_ITS_SYMPTOMS.FLUJO_VAGINAL.CERVICITIS_FLUJO_CERVICAL
          ),
          checkSymptom(
            reportCard,
            ALL_ITS_SYMPTOMS.FLUJO_VAGINAL.DOLOR_MOVILIZACION_CERVIX
          ),
          reportCard.embarazo
        )}
      {hasCervicitisFlujoVaginalVaginosis &&
        DisplayFlujoVaginalVaginosis(
          checkSymptom(
            reportCard,
            ALL_ITS_SYMPTOMS.FLUJO_VAGINAL.CERVICITIS_FLUJO_CERVICAL
          ),
          checkSymptom(
            reportCard,
            ALL_ITS_SYMPTOMS.FLUJO_VAGINAL.DOLOR_MOVILIZACION_CERVIX
          ),
          checkSymptom(reportCard, ALL_ITS_SYMPTOMS.FLUJO_VAGINAL.EDEMA),
          checkSymptom(reportCard, ALL_ITS_SYMPTOMS.FLUJO_VAGINAL.ERITEMA),
          checkSymptom(
            reportCard,
            ALL_ITS_SYMPTOMS.FLUJO_VAGINAL.ESCORIACIONES
          ),
          checkSymptom(reportCard, ALL_ITS_SYMPTOMS.FLUJO_VAGINAL.PRURITO),
          checkSymptom(
            reportCard,
            ALL_ITS_SYMPTOMS.FLUJO_VAGINAL.SECRECION_BLANQUECINA
          )
        )}
      {hasHerpesSimple &&
        DisplayHerpesSimple(
          checkSymptom(
            reportCard,
            ALL_ITS_SYMPTOMS.ULCERAS_GENITALES.SON_LESIONES_MULTIPLES
          ),
          checkSymptom(
            reportCard,
            ALL_ITS_SYMPTOMS.ULCERAS_GENITALES.ULCERAS_GENITALES_DOLOROSAS
          )
        )}
      {hasSifiilisPrimaria &&
        DisplaySifilisPrimaria(
          checkSymptom(
            reportCard,
            ALL_ITS_SYMPTOMS.ULCERAS_GENITALES.SON_LESIONES_UNICAS
          ),
          checkSymptom(
            reportCard,
            ALL_ITS_SYMPTOMS.ULCERAS_GENITALES.ULCERAS_GENITALES_DOLOROSAS
          ),
          checkSymptom(
            reportCard,
            ALL_ITS_SYMPTOMS.ULCERAS_GENITALES.ULCERAS_GENITALES_NO_DOLOROSAS
          )
        )}
      {hasVph &&
        DisplayVPH(
          checkSymptom(
            reportCard,
            ALL_ITS_SYMPTOMS.ULCERAS_GENITALES.ULCERAS_GENITALES_NO_DOLOROSAS
          ),
          checkSymptom(
            reportCard,
            ALL_ITS_SYMPTOMS.ULCERAS_GENITALES.ULCERAS_GENITALES_SON_PLANAS
          )
        )}
      {hasDolorAbdominalBajo &&
        DisplayDolorAbdominalBajo(
          checkSymptom(
            reportCard,
            ALL_ITS_SYMPTOMS.DOLOR_ABDOMINAL_BAJO.ANTECEDENTES_EPI
          ),
          checkSymptom(
            reportCard,
            ALL_ITS_SYMPTOMS.DOLOR_ABDOMINAL_BAJO.ANTECEDENTES_ITS
          ),
          checkSymptom(
            reportCard,
            ALL_ITS_SYMPTOMS.DOLOR_ABDOMINAL_BAJO.ANTECEDENTES_UTERINO
          ),
          checkSymptom(
            reportCard,
            ALL_ITS_SYMPTOMS.DOLOR_ABDOMINAL_BAJO.DISPAREUNIA
          ),
          checkSymptom(
            reportCard,
            ALL_ITS_SYMPTOMS.DOLOR_ABDOMINAL_BAJO.DOLOR_BILATERAL
          ),
          checkSymptom(
            reportCard,
            ALL_ITS_SYMPTOMS.DOLOR_ABDOMINAL_BAJO.DOLOR_MESTRUACION
          ),
          checkSymptom(
            reportCard,
            ALL_ITS_SYMPTOMS.DOLOR_ABDOMINAL_BAJO
              .FLUJO_VAGINAL_CERVICAL_PULURENTO
          ),
          checkSymptom(
            reportCard,
            ALL_ITS_SYMPTOMS.DOLOR_ABDOMINAL_BAJO.PAREJA_SEXUAL_DE_ITS
          ),
          reportCard.embarazo
        )}
    </div>
  );
};

export default AlgorithmITS;
