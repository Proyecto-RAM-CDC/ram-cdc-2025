// File: DisplayProstatitis.tsx
// Path: app/algorithms/IVU/DisplayProstatitis.tsx
// Objective: Display the Prostatitis syndrome and its recommendations.

import { useMemo } from "react";
import { DisplaySyndrome } from "~/algorithms/IVU/DisplaySyndrome";
import {
  typeProstatitisProps,
  typeSymptomIVU,
  typeTreatmentIVU,
} from "~/algorithms/utilitiesTypes";

export const DisplayProstatitis: React.FC<typeProstatitisProps> = ({
  hasDolorPelvico,
  hasAntecedenteManipulacionViaUrinaria,
  hasAntecedenteCistitisRepetida,
  hasDolorEspaldaBaja,
  hasDolorPerineal,
  hasDolorProstata,
}) => {
  // The use of "useMemo" here means we only recalculate the symptoms when the props change.
  const symptoms: typeSymptomIVU[] = useMemo(
    () => [
      {
        id: "dolorPelvico",
        description: "Dolar pélvico - Dolor en la parte baja del abdomen.",
        condition: hasDolorPelvico,
      },
      {
        id: "antecedenteManipulacionViaUrinaria",
        description:
          "Antecedente de manipulación de la vía urinaria - Sonda vesical, biopsia prostática, estudios de urodinamia.",
        condition: hasAntecedenteManipulacionViaUrinaria,
      },
      {
        id: "antecedenteCistitisRepetida",
        description:
          "Antecedente de cistitis de repetición - Más de 3 episodios de cistitis en el último año.",
        condition: hasAntecedenteCistitisRepetida,
      },
      {
        id: "dolorEspaldaBaja",
        description: "Dolor espalda baja - Dolor en la espalda baja.",
        condition: hasDolorEspaldaBaja,
      },
      {
        id: "dolorPerineal",
        description:
          "Dolor perineal - Dolor en la zona entre el ano y los genitales.",
        condition: hasDolorPerineal,
      },
      {
        id: "dolorProstata",
        description: "Dolor a la palpación de la próstata.",
        condition: hasDolorProstata,
      },
    ],
    [
      hasDolorPelvico,
      hasAntecedenteManipulacionViaUrinaria,
      hasAntecedenteCistitisRepetida,
      hasDolorEspaldaBaja,
      hasDolorPerineal,
      hasDolorProstata,
    ]
  );

  const treatments: typeTreatmentIVU[] = [
    {
      id: "ciprofloxacino",
      description: "Ciprofloxacino 750 mg VO cada 12 hrs por 6 semanas.",
    },
    {
      id: "levofloxacino",
      description: "Levofloxacino 750 mg VO cada 24 hrs por 6 semanas.",
    },
    {
      id: "cefuroxima",
      description: "Cefuroxima 500 mg VO cada 12 hrs por 6 semanas.",
    },
    {
      id: "trimetoprimSulfametoxazol",
      description:
        "Trimetoprim sulfametoxazol 160/800 mg cada 12 hrs por 6 semanas.",
    },
  ];

  const alternatives: typeTreatmentIVU[] = [];

  return (
    <DisplaySyndrome
      title="Prostatitis"
      symptoms={symptoms}
      treatments={treatments}
      alternatives={alternatives}
    />
  );
};

export const DisplayProstatitisRecommendations: React.FC = () => {
  return (
    <div className="bg-base-200 mt-4 px-2 py-4 border border-primary rounded-md shadow-md">
      <h3 className="text-base font-semibold leading-7 text-primary">
        Recomendaciones adicionales
      </h3>
      <ul className="list-disc list-outside pl-6 text-sm leading-6 text-secondary">
        <li>Considerar analgésicos en caso de dolor pélvico y/o perianal.</li>
        <li>
          Ibuprofeno o diclofenaco si no contraindicaciones - e.g. ulcera
          gastrica, falla hasRenalIssues.
        </li>
        <li>
          Syndroma Prostatitis durante más de 3 meses? Considerar canalizar a
          urología sobretodo si se descarta infección.
        </li>
        <li>
          Si retención urinaria? Considerar cateter temporal. Consultar
          urología.
        </li>
        <li>Siempre confirmar que no hay alergias.</li>
      </ul>

      <ul className="list-disc list-outside pl-6 text-sm leading-6 text-secondary">
        <li>Solicitar EGO, urocultivo.</li>
        <li>Antigeno prostatico especifico.</li>
        <li>Si fiebre, considerar hemocultivos.</li>
        <li>
          Hay sepsis? Considerar tratamiento IV y canalizar segundo nivel de
          atención.
        </li>
      </ul>
    </div>
  );
};
