// File: buildPatientReportCard.ts
// Path: app/algorithms/buildPatientReportCard.ts
// Objective: Build a patient report card based on the patient's clinical data.

import { ALL_IRAS_SYMPTOMS } from "~/algorithms/IRAS/utilitiesSymptoms";
import { ALL_EDAS_SYMPTOMS } from "~/algorithms/EDAS/utilitiesSymptoms";
import { ALL_ITS_SYMPTOMS } from "~/algorithms/ITS/utilitiesSymptoms";
import { ALL_IVU_SYMPTOMS } from "~/algorithms/IVU/utilitiesSymptoms";
import {
  typeSymptomsData,
  typeFlatSymptomData,
  typeNestedSymptomData,
  typeReportCard,
  typeAge,
  enumCondition,
  enumPatientType,
  enumSexonacer,
  enumRiskFactors,
} from "~/algorithms/utilitiesTypes";
import {
  typeClinicosStringified,
  typeVisitationStringified,
} from "~/utilities/types";
import calculateAge from "~/algorithms/CalculateAge";

const addSecondarySymptom = (
  symptom: string,
  visitation: typeVisitationStringified,
  reportCard: typeReportCard
): typeReportCard => {
  if (!symptom || !visitation || !reportCard) {
    throw new Error("Parámetros de entrada no válidos - addSecondarySymptom");
  }

  // Check if any of the "secondaryConditions" contain the symptom string.
  const isSymptomPresent = visitation.secondaryConditions.some((condition) =>
    condition.includes(symptom)
  );

  if (isSymptomPresent) reportCard.symptoms.push(symptom);

  return reportCard;
};

const addRiskFactors = (
  visitation: typeVisitationStringified,
  reportCard: typeReportCard
): typeReportCard => {
  if (!visitation || !reportCard) {
    throw new Error("Parámetros de entrada no válidos - addRiskFactors");
  }

  // Enums here should match the expected keys in "existingConditions" on the "visitation" object.
  // These choices were made with the form elements in "NewClinicos.tsx".
  const riskFactors = [
    enumRiskFactors.Diabetes,
    enumRiskFactors.Inmunosupresion,
    enumRiskFactors.Cardiovasculares,
    enumRiskFactors.HasRenalIssues,
    enumRiskFactors.Hepaticos,
    enumRiskFactors.Embarazo,
  ];

  // Loop through risk conditions and add to "reportCard" if present.
  riskFactors.forEach((label) => {
    const isRiskPresent = visitation.existingConditions.some((element) =>
      element.includes(label)
    );

    if (isRiskPresent) reportCard.symptoms.push(label);
  });

  return reportCard;
};

const initializeReportCard = (
  visitation: typeVisitationStringified,
  clinicos: typeClinicosStringified
): typeReportCard => {
  const age: typeAge = calculateAge(clinicos);
  return {
    primaryConditions: visitation.primaryConditions,
    secondaryConditions: visitation.secondaryConditions,

    age: { ...age },
    symptoms: [],
    dob: clinicos.dob,
    patientType:
      age.years >= 65
        ? enumPatientType.AdultoMayor
        : age.years <= 5
        ? enumPatientType.Pediatrico
        : enumPatientType.Adulto,
    sexonacer: clinicos.sexonacer,
    genero: visitation.genero,
    postmenopausia:
      clinicos.sexonacer === enumSexonacer.Mujer && age.years >= 60,

    hospitalized: visitation.hospitalized,
    takenMedication: visitation.takenMedication,
    disability: visitation.disability,
    migrant: visitation.migrant,
    indigenous: clinicos.indigenous,
    afrodescendant: clinicos.afrodescendant,

    evacuationCount: visitation.evacuationCount,
    vomitCount: visitation.vomitCount,

    allergies: visitation.alergies.map(
      (allergy) => allergy.charAt(0).toUpperCase() + allergy.slice(1)
    ),

    embarazo: false,
    diagnosis: null,
  };
};

const buildPatientReportCard = (
  clinicos: typeClinicosStringified,
  visitation: typeVisitationStringified,
  condition: enumCondition
): typeReportCard => {
  // Runtime check for invalid "clinicos" and "visitation" input parameters.
  if (!clinicos || !visitation) {
    throw new Error(
      "Parámetros de entrada no válidos - buildPatientReportCard"
    );
  }

  let reportCard: typeReportCard = initializeReportCard(visitation, clinicos);

  let ALL_SYMPTOMS: typeSymptomsData;

  if (condition === "IRAS") {
    ALL_SYMPTOMS = ALL_IRAS_SYMPTOMS;
  } else if (condition === "EDAS") {
    ALL_SYMPTOMS = ALL_EDAS_SYMPTOMS;
  } else if (condition === "ITS") {
    ALL_SYMPTOMS = ALL_ITS_SYMPTOMS;
  } else if (condition === "IVU") {
    ALL_SYMPTOMS = ALL_IVU_SYMPTOMS;
  } else {
    throw new Error(`Unsupported condition: ${condition}`);
  }

  if (
    Object.values(ALL_SYMPTOMS)[0] &&
    typeof Object.values(ALL_SYMPTOMS)[0] === "string"
  ) {
    // Flat structure.
    Object.values(ALL_SYMPTOMS as typeFlatSymptomData).forEach((symptom) => {
      reportCard = addSecondarySymptom(symptom, visitation, reportCard);
    });
  } else {
    // Nested structure.
    Object.values(ALL_SYMPTOMS as typeNestedSymptomData).forEach((category) => {
      Object.values(category).forEach((symptom) => {
        reportCard = addSecondarySymptom(symptom, visitation, reportCard);
      });
    });
  }

  reportCard = addRiskFactors(visitation, reportCard);
  reportCard.embarazo = reportCard.symptoms.includes(enumRiskFactors.Embarazo);

  return reportCard;
};

export default buildPatientReportCard;
