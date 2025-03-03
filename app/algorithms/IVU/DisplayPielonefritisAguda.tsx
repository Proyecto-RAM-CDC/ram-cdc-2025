// File: DisplayPielonefritisAguda.tsx
// Path: app/algorithms/IVU/DisplayPielonefritisAguda.tsx
// Objective: Display the Pielonefritis Aguda syndrome and its recommendations.

import { useMemo } from "react";
import { DisplaySyndrome } from "~/algorithms/IVU/DisplaySyndrome";
import {
  typePielonefritisAgudaProps,
  typeSymptomIVU,
  typeTreatmentIVU,
} from "~/algorithms/utilitiesTypes";

export const DisplayPielonefritisAguda: React.FC<
  typePielonefritisAgudaProps
> = ({
  hasDolorLumbar,
  hasFiebre,
  hasMalEstado,
  hasDolorAnguloCostovertebral,
}) => {
  // The use of "useMemo" here means we only recalculate the symptoms when the props change.
  const symptoms: typeSymptomIVU[] = useMemo(
    () => [
      {
        id: "dolorLumbar",
        description: "Dolar lumbar - Dolor en la espalda baja.",
        condition: hasDolorLumbar,
      },
      {
        id: "hasFiebre",
        description: "Fiebre - Temperatura corporal elevada mas que 38℃.",
        condition: hasFiebre,
      },
      {
        id: "malEstado",
        description:
          "Mal estado general. El paciente se siente mal, cansado, débil o enfermo. Posiblemente con náuseas y/o vómito.",
        condition: hasMalEstado,
      },
      {
        id: "dolorAnguloCostovertebral",
        description:
          "Dolor costovertebral de la espalda, los flancos y el ángulo formado por la 12ª costilla y la columna vertebral.",
        condition: hasDolorAnguloCostovertebral,
      },
    ],
    [hasDolorLumbar, hasFiebre, hasMalEstado, hasDolorAnguloCostovertebral]
  );

  const treatments: typeTreatmentIVU[] = [
    {
      id: "ciprofloxacino",
      description: "Ciprofloxacino 750 mg VO cada 12 hrs por 7 días.",
    },
    {
      id: "levofloxacino",
      description: "Levofloxacino 750 mg VO cada 24 hrs por 5 días.",
    },
    {
      id: "cefotaxima",
      description: "Cefotaxima 1 gramo IV cada 8 hrs por 7 días.",
    },
    {
      id: "ceftriaxona",
      description: "Ceftriaxona 1 gramo IV cada 12 hrs por 7 días.",
    },
  ];

  const alternatives: typeTreatmentIVU[] = [
    {
      id: "trimetoprimSulfametoxazol",
      description:
        "Trimetoprim sulfametoxazol 160/800 mg VO cada 12 hrs por 14 días.",
    },
  ];

  return (
    <DisplaySyndrome
      title="Pielonefritis Aguda"
      symptoms={symptoms}
      treatments={treatments}
      alternatives={alternatives}
    />
  );
};

export const DisplayPielonefritisAgudaRecommendations: React.FC<{
  isEmbarazada: boolean;
}> = (props) => {
  return (
    <div className="bg-base-200 mt-4 px-2 py-4 border border-primary rounded-md shadow-md">
      <h3 className="text-base font-semibold leading-7 text-primary">
        Recomendaciones adicionales
      </h3>
      <ul className="list-disc list-outside pl-6 text-sm leading-6 text-secondary">
        <li>Solicitar urocultivo y USG renal de ser posible.</li>
        <li>Solicitar BH y VSG.</li>
        <li>
          Hay sepsis? Considerar tratamiento IV y canalizar segundo nivel de
          atención.
        </li>
        {props.isEmbarazada && (
          <li>
            En embarazo: NO Ciprofloxacino - NO Trimetoprim sulfametoxazol.
          </li>
        )}
        <li>Siempre confirmar que no hay alergias.</li>
        <li>Proporcionar datos de alarma.</li>
      </ul>
    </div>
  );
};
