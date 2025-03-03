// File: DisplayCistitisAguda.tsx
// Path: app/algorithms/IVU/DisplayCistitisAguda.tsx
// Objective: Display the Cistitis Aguda syndrome and its recommendations.

import { useMemo } from "react";
import { DisplaySyndrome } from "~/algorithms/IVU/DisplaySyndrome";
import {
  typeCistitisAgudaProps,
  typeSymptomIVU,
  typeTreatmentIVU,
} from "~/algorithms/utilitiesTypes";

export const DisplayCistitisAguda: React.FC<typeCistitisAgudaProps> = ({
  hasDisuria,
  hasUrgencia,
  hasPolaquiuria,
  hasTenesmoVesical,
  hasAntecedenteCistitisRepetida,
}) => {
  // The use of "useMemo" here means we only recalculate the symptoms when the props change.
  const symptoms: typeSymptomIVU[] = useMemo(
    () => [
      {
        id: "hasDisuria",
        description: "Disuria - Dolor al orinar.",
        condition: hasDisuria,
      },
      {
        id: "urgencia",
        description: "Urgencia - Necesidad urgente de orinar.",
        condition: hasUrgencia,
      },
      {
        id: "polaquiuria",
        description: "Polaquiuria - Incremento de la frecuencia urinaria.",
        condition: hasPolaquiuria,
      },
      {
        id: "tenesmoVesical",
        description: "Tenesmo vesical - Sensación de no vaciar la vejiga.",
        condition: hasTenesmoVesical,
      },
      {
        id: "antecedenteCistitisRepetida",
        description: "Antecedente de cistitis de repetición.",
        condition: hasAntecedenteCistitisRepetida,
      },
    ],
    [
      hasDisuria,
      hasUrgencia,
      hasPolaquiuria,
      hasTenesmoVesical,
      hasAntecedenteCistitisRepetida,
    ]
  );

  const treatments: typeTreatmentIVU[] = [
    {
      id: "nitrofurantoina",
      description: "Nitrofurantoina 100 mg VO cada 8 hrs por 5 días.",
    },
  ];

  const alternatives: typeTreatmentIVU[] = [
    { id: "fosfomicina", description: "Fosfomicina 3 gramos VO dosis única." },
  ];

  return (
    <DisplaySyndrome
      title="Cistitis Aguda"
      symptoms={symptoms}
      treatments={treatments}
      alternatives={alternatives}
    />
  );
};

export const DisplayCistitisAgudaRecommendations: React.FC<{
  hasInfectionHistory: boolean;
  isEmbarazada: boolean;
}> = (props) => {
  return (
    <div className="bg-base-200 mt-4 px-2 py-4 border border-primary rounded-md shadow-md">
      <h3 className="text-base font-semibold leading-7 text-primary">
        Recomendaciones adicionales
      </h3>
      {props.isEmbarazada ? (
        <ul className="list-disc list-outside pl-6 text-sm leading-6 text-secondary">
          <li>En embarazo, independientemente de la repetición:</li>
          <ul className="list-disc list-outside pl-6 text-sm leading-6 text-secondary">
            <li>Investigar causas.</li>
            <li>
              Tomar urocultivo antes de tratamiento empírico, guiarse por
              patrones locales.
            </li>
          </ul>
        </ul>
      ) : !props.hasInfectionHistory ? (
        <ul className="list-disc list-outside pl-6 text-sm leading-6 text-secondary">
          <li>No repetición:</li>
          <ul className="list-disc list-outside pl-6 text-sm leading-6 text-secondary">
            <li>Investigar causas.</li>
            <li>
              Tomar urocultivo antes de tratamiento empírico, guiarse por
              patrones locales.
            </li>
          </ul>
        </ul>
      ) : (
        <ul className="list-disc list-outside pl-6 text-sm leading-6 text-secondary">
          <li>No es necesario tomar muestra para urocultivo.</li>
        </ul>
      )}

      <ul className="list-disc list-outside pl-6 mt-4 text-sm leading-6 text-secondary">
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
