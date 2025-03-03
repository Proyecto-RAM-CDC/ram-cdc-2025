import { ALL_ITS_SYMPTOMS } from "~/algorithms/ITS/utilitiesSymptoms";
import { typeReportCard, enumRiskFactors } from "~/algorithms/utilitiesTypes";

export const checkSymptom = (reportCard: typeReportCard, symptom: string) => {
  return reportCard.symptoms.includes(symptom);
};

type typeMainConditions = {
  hasEpididimitis: boolean;
  hasUretitis: boolean;
  hasSyndromaAnoRectal: boolean;
  hasSyndromaGonorrea: boolean;
  hasSyndromaVaginosis: boolean;
  hasSyndromaUlcerasConDolorMultiples: boolean;
  hasSyndromaUlcerasConDolorUnicas: boolean;
  hasSyndromaUlcerasSinDolorUnicas: boolean;
  hasSyndromaUlcerasSinDolorPlanas: boolean;
  hasSyndromaDolorAbdominalBajo: boolean;
};

export const getMainConditions = (
  reportCard: typeReportCard
): typeMainConditions => {
  const hasEpididimitis = checkEpididimitis(reportCard);
  const hasUretitis = checkUretitis(reportCard);
  const hasSyndromaAnoRectal = checkSyndromaAnoRectal(reportCard);
  const hasSyndromaGonorrea = checkSyndromaGonorrea(reportCard);
  const hasSyndromaVaginosis = checkSyndromaVaginosis(reportCard);
  const hasSyndromaUlcerasConDolorMultiples =
    checkSyndromaUlcerasConDolorMultiples(reportCard);
  const hasSyndromaUlcerasConDolorUnicas =
    checkSyndromaUlcerasConDolorUnicas(reportCard);
  const hasSyndromaUlcerasSinDolorUnicas =
    checkSyndromaUlcerasSinDolorUnicas(reportCard);
  const hasSyndromaUlcerasSinDolorPlanas =
    checkSyndromaUlcerasSinDolorPlanas(reportCard);
  const hasSyndromaDolorAbdominalBajo =
    checkSyndromaDolorAbdominalBajo(reportCard);

  return {
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
  };
};

type typeGetDiagnosis = {
  hasSyndromaAnoRectal: boolean;
  hasSyndromaGonorrea: boolean;
  hasSyndromaVaginosis: boolean;
  hasSyndromaUlcerasConDolorMultiples: boolean;
  hasSyndromaUlcerasConDolorUnicas: boolean;
  hasSyndromaUlcerasSinDolorUnicas: boolean;
  hasSyndromaUlcerasSinDolorPlanas: boolean;
  hasSyndromaDolorAbdominalBajo: boolean;
};

type typeDiagnosis = {
  hasProctitis: boolean;
  hasCervicitisFlujoVaginalGonorrea: boolean;
  hasCervicitisFlujoVaginalVaginosis: boolean;
  hasHerpesSimple: boolean;
  hasSifiilisPrimaria: boolean;
  hasVph: boolean;
  hasDolorAbdominalBajo: boolean;
};

export const getDiagnosis = (props: typeGetDiagnosis): typeDiagnosis => {
  const hasProctitis = props.hasSyndromaAnoRectal;
  const hasCervicitisFlujoVaginalGonorrea = props.hasSyndromaGonorrea;
  const hasCervicitisFlujoVaginalVaginosis = props.hasSyndromaVaginosis;
  const hasHerpesSimple = props.hasSyndromaUlcerasConDolorMultiples;
  const hasSifiilisPrimaria =
    props.hasSyndromaUlcerasConDolorUnicas ||
    props.hasSyndromaUlcerasSinDolorUnicas;
  const hasVph = props.hasSyndromaUlcerasSinDolorPlanas;
  const hasDolorAbdominalBajo = props.hasSyndromaDolorAbdominalBajo;

  return {
    hasProctitis,
    hasCervicitisFlujoVaginalGonorrea,
    hasCervicitisFlujoVaginalVaginosis,
    hasHerpesSimple,
    hasSifiilisPrimaria,
    hasVph,
    hasDolorAbdominalBajo,
  };
};

const checkEpididimitis = (reportCard: typeReportCard): boolean => {
  return (
    (reportCard.sexonacer === "Hombre" &&
      checkSymptom(
        reportCard,
        ALL_ITS_SYMPTOMS.DOLOR_E_INFLAMACION_ESCROTAL.ANTECEDENTES_SIN_CONDOM
      )) ||
    checkSymptom(
      reportCard,
      ALL_ITS_SYMPTOMS.DOLOR_E_INFLAMACION_ESCROTAL.DOLOR_PALPACION
    ) ||
    checkSymptom(
      reportCard,
      ALL_ITS_SYMPTOMS.DOLOR_E_INFLAMACION_ESCROTAL.INFLAMACION_MEDICAMENTOS
    ) ||
    checkSymptom(
      reportCard,
      ALL_ITS_SYMPTOMS.DOLOR_E_INFLAMACION_ESCROTAL.INFLAMACION_AUMENTO
    ) ||
    checkSymptom(
      reportCard,
      ALL_ITS_SYMPTOMS.DOLOR_E_INFLAMACION_ESCROTAL.INFLAMACION_TRACTO
    ) ||
    checkSymptom(
      reportCard,
      ALL_ITS_SYMPTOMS.DOLOR_E_INFLAMACION_ESCROTAL.SEXO_ANAL
    ) ||
    checkSymptom(reportCard, enumRiskFactors.Inmunosupresion)
  );
};

const checkUretitis = (reportCard: typeReportCard): boolean => {
  return (
    checkSymptom(reportCard, ALL_ITS_SYMPTOMS.SECRECION_URETRAL.DISURIA) ||
    checkSymptom(
      reportCard,
      ALL_ITS_SYMPTOMS.SECRECION_URETRAL.IRRITACION_URETRAL
    )
  );
};

const checkSyndromaAnoRectal = (reportCard: typeReportCard): boolean => {
  return (
    checkSymptom(reportCard, ALL_ITS_SYMPTOMS.CONDICIONES_RECTAL.DIARREA) ||
    checkSymptom(
      reportCard,
      ALL_ITS_SYMPTOMS.CONDICIONES_RECTAL.DOLOR_RECTAL
    ) ||
    checkSymptom(reportCard, ALL_ITS_SYMPTOMS.CONDICIONES_RECTAL.FIEBRE) ||
    checkSymptom(reportCard, ALL_ITS_SYMPTOMS.CONDICIONES_RECTAL.FISURAS) ||
    checkSymptom(reportCard, ALL_ITS_SYMPTOMS.CONDICIONES_RECTAL.HIPOTENSION) ||
    checkSymptom(reportCard, ALL_ITS_SYMPTOMS.CONDICIONES_RECTAL.LINFAD) ||
    checkSymptom(reportCard, ALL_ITS_SYMPTOMS.CONDICIONES_RECTAL.RECTORRAGIA)
  );
};

const checkSyndromaGonorrea = (reportCard: typeReportCard): boolean => {
  return (
    reportCard.sexonacer === "Mujer" &&
    (checkSymptom(
      reportCard,
      ALL_ITS_SYMPTOMS.FLUJO_VAGINAL.CERVICITIS_FLUJO_CERVICAL
    ) ||
      checkSymptom(
        reportCard,
        ALL_ITS_SYMPTOMS.FLUJO_VAGINAL.DOLOR_MOVILIZACION_CERVIX
      ))
  );
};

const checkSyndromaVaginosis = (reportCard: typeReportCard): boolean => {
  return (
    reportCard.sexonacer === "Mujer" &&
    !checkSymptom(
      reportCard,
      ALL_ITS_SYMPTOMS.FLUJO_VAGINAL.CERVICITIS_FLUJO_CERVICAL
    ) &&
    !checkSymptom(
      reportCard,
      ALL_ITS_SYMPTOMS.FLUJO_VAGINAL.DOLOR_MOVILIZACION_CERVIX
    ) &&
    (checkSymptom(reportCard, ALL_ITS_SYMPTOMS.FLUJO_VAGINAL.EDEMA) ||
      checkSymptom(reportCard, ALL_ITS_SYMPTOMS.FLUJO_VAGINAL.ERITEMA) ||
      checkSymptom(reportCard, ALL_ITS_SYMPTOMS.FLUJO_VAGINAL.ESCORIACIONES) ||
      checkSymptom(reportCard, ALL_ITS_SYMPTOMS.FLUJO_VAGINAL.PRURITO) ||
      checkSymptom(
        reportCard,
        ALL_ITS_SYMPTOMS.FLUJO_VAGINAL.SECRECION_BLANQUECINA
      ))
  );
};

const checkSyndromaUlcerasConDolor = (reportCard: typeReportCard): boolean => {
  return checkSymptom(
    reportCard,
    ALL_ITS_SYMPTOMS.ULCERAS_GENITALES.ULCERAS_GENITALES_DOLOROSAS
  );
};

const checkSyndromaUlcerasConDolorMultiples = (
  reportCard: typeReportCard
): boolean => {
  return (
    checkSyndromaUlcerasConDolor(reportCard) &&
    checkSymptom(
      reportCard,
      ALL_ITS_SYMPTOMS.ULCERAS_GENITALES.SON_LESIONES_MULTIPLES
    )
  );
};

const checkSyndromaUlcerasConDolorUnicas = (
  reportCard: typeReportCard
): boolean => {
  return (
    checkSymptom(
      reportCard,
      ALL_ITS_SYMPTOMS.ULCERAS_GENITALES.ULCERAS_GENITALES_DOLOROSAS
    ) &&
    checkSymptom(
      reportCard,
      ALL_ITS_SYMPTOMS.ULCERAS_GENITALES.SON_LESIONES_UNICAS
    )
  );
};

const checkSyndromaUlcerasSinDolor = (reportCard: typeReportCard): boolean => {
  return checkSymptom(
    reportCard,
    ALL_ITS_SYMPTOMS.ULCERAS_GENITALES.ULCERAS_GENITALES_NO_DOLOROSAS
  );
};

const checkSyndromaUlcerasSinDolorUnicas = (
  reportCard: typeReportCard
): boolean => {
  return (
    checkSyndromaUlcerasSinDolor(reportCard) &&
    checkSymptom(
      reportCard,
      ALL_ITS_SYMPTOMS.ULCERAS_GENITALES.SON_LESIONES_UNICAS
    )
  );
};

const checkSyndromaUlcerasSinDolorPlanas = (
  reportCard: typeReportCard
): boolean => {
  return (
    checkSymptom(
      reportCard,
      ALL_ITS_SYMPTOMS.ULCERAS_GENITALES.ULCERAS_GENITALES_NO_DOLOROSAS
    ) &&
    checkSymptom(
      reportCard,
      ALL_ITS_SYMPTOMS.ULCERAS_GENITALES.ULCERAS_GENITALES_SON_PLANAS
    )
  );
};

const checkSyndromaDolorAbdominalBajo = (
  reportCard: typeReportCard
): boolean => {
  return (
    reportCard.sexonacer === "Mujer" &&
    (checkSymptom(
      reportCard,
      ALL_ITS_SYMPTOMS.DOLOR_ABDOMINAL_BAJO.ANTECEDENTES_EPI
    ) ||
      checkSymptom(
        reportCard,
        ALL_ITS_SYMPTOMS.DOLOR_ABDOMINAL_BAJO.ANTECEDENTES_ITS
      ) ||
      checkSymptom(
        reportCard,
        ALL_ITS_SYMPTOMS.DOLOR_ABDOMINAL_BAJO.ANTECEDENTES_UTERINO
      ) ||
      checkSymptom(
        reportCard,
        ALL_ITS_SYMPTOMS.DOLOR_ABDOMINAL_BAJO.DISPAREUNIA
      ) ||
      checkSymptom(
        reportCard,
        ALL_ITS_SYMPTOMS.DOLOR_ABDOMINAL_BAJO.DOLOR_BILATERAL
      ) ||
      checkSymptom(
        reportCard,
        ALL_ITS_SYMPTOMS.DOLOR_ABDOMINAL_BAJO.DOLOR_MESTRUACION
      ) ||
      checkSymptom(
        reportCard,
        ALL_ITS_SYMPTOMS.DOLOR_ABDOMINAL_BAJO.FLUJO_VAGINAL_CERVICAL_PULURENTO
      ) ||
      checkSymptom(
        reportCard,
        ALL_ITS_SYMPTOMS.DOLOR_ABDOMINAL_BAJO.PAREJA_SEXUAL_DE_ITS
      ))
  );
};
