// A store in Zustand is essentially the place where you store your state and any functions that
// update that state. Your components can then access the store and access the values and functions
// that use and update the state.
import { create } from "zustand";

import {
  ALL_IVU_SYMPTOMS,
  ALL_IVU_LABELS,
} from "~/algorithms/IVU/utilitiesSymptoms";
import {
  ALL_ITS_SYMPTOMS,
  ALL_ITS_LABELS,
} from "~/algorithms/ITS/utilitiesSymptoms";
import {
  ALL_IRAS_SYMPTOMS,
  ALL_IRAS_LABELS,
} from "~/algorithms/IRAS/utilitiesSymptoms";
import {
  ALL_EDAS_SYMPTOMS,
  ALL_EDAS_LABELS,
} from "~/algorithms/EDAS/utilitiesSymptoms";

// Utility function to flatten nested symptom objects
const flattenNestedSymptoms = (nestedSymptoms: object): string[] => {
  return Object.values(nestedSymptoms).flatMap((symptom) =>
    typeof symptom === "string" ? symptom : Object.values(symptom)
  );
};

const secondarySymptomsData = [
  {
    id: "01",
    primary: "IVU",
    symptoms: ALL_IVU_SYMPTOMS,
    labels: ALL_IVU_LABELS,
  },
  {
    id: "02",
    primary: "ITS",
    symptoms: ALL_ITS_SYMPTOMS,
    labels: ALL_ITS_LABELS,
  },
  {
    id: "03",
    primary: "IRAS",
    symptoms: ALL_IRAS_SYMPTOMS,
    labels: ALL_IRAS_LABELS,
  },
  {
    id: "04",
    primary: "EDAS",
    symptoms: ALL_EDAS_SYMPTOMS,
    labels: ALL_EDAS_LABELS,
  },
];

type Step = {
  id: string;
  name: string;
  description: string;
  href: string;
  status: string;
};

type StepStore = {
  steps: Step[];
  setSteps: (steps: Step[]) => void;
  handleStepChange: (id: string) => void;
};

// Note that the 'use' prefix is a convention for hooks in React.
// Every hook in React, including custom hooks, will start with 'use'.
// Hence the name 'useStepStore' is therefore a custom hook.
// Notice is uses the 'create' function from Zustand to create a state store.
// Each store contains the state and functions to manipulate that state.
export const useStepStore = create<StepStore>((set) => ({
  steps: [
    {
      id: "01",
      name: "Características del Paciente.",
      description:
        "Definir las características y factores de riesgo del paciente.",
      href: "characteristics",
      status: "current",
    },
    {
      id: "02",
      name: "La condición primaria.",
      description: "Definir la condición primaria sospechosa.",
      href: "primary",
      status: "upcoming",
    },
    {
      id: "03",
      name: "Los síntomas secundarios.",
      description:
        "Definir la condición sospechosa específica con más detalle.",
      href: "define",
      status: "upcoming",
    },
    {
      id: "04",
      name: "Revisar las Opciones de Tratamiento.",
      description: "Opciones de tratamiento, recomendaciones y más detalles.",
      href: "revise",
      status: "upcoming",
    },
  ],
  setSteps: (steps) => set({ steps }),
  handleStepChange: (id) =>
    set((state) => {
      const updatedSteps = state.steps.map((step) => {
        if (step.id === id) {
          return { ...step, status: "current" };
        } else if (step.id < id) {
          return { ...step, status: "complete" };
        } else {
          return { ...step, status: "upcoming" };
        }
      });

      return { steps: updatedSteps };
    }),
}));

export type PrimaryCondition = {
  id: number;
  enabled: boolean;
  name: string;
  detail: string;
};

type PrimaryConditionStore = {
  primaryConditions: PrimaryCondition[];
  setPrimaryConditions: (primaryConditions: PrimaryCondition[]) => void;
  handlePrimaryConditionChange: (id: number) => void;
};

export const usePrimaryConditionStore = create<PrimaryConditionStore>(
  (set) => ({
    primaryConditions: [
      {
        id: 1,
        enabled: false,
        name: "IVU",
        detail: "Infección del tracto urinario",
      },
      {
        id: 2,
        enabled: false,
        name: "ITS",
        detail: "Infecciones de transmisión sexual",
      },
      {
        id: 3,
        enabled: false,
        name: "IRAS",
        detail: "Infecciones del aparato respiratorio superior",
      },
      {
        id: 4,
        enabled: false,
        name: "EDAS",
        detail: "Enfermedades diarreicas agudas",
      },
    ],
    setPrimaryConditions: (primaryConditions) => set({ primaryConditions }),
    handlePrimaryConditionChange: (id) =>
      set((state) => {
        const updatedPrimaryConditions = state.primaryConditions.map(
          (primaryCondition) => {
            if (primaryCondition.id === id) {
              return { ...primaryCondition, enabled: true };
            } else {
              return { ...primaryCondition, enabled: false };
            }
          }
        );

        return { primaryConditions: updatedPrimaryConditions };
      }),
  })
);

export type SecondarySymptom = {
  id: string;
  primary: string;
  additional: string[];
  additional_details: string[];
  checked: boolean[];
};

type SecondarySymptomStore = {
  secondarySymptoms: SecondarySymptom[];
  setSecondarySymptoms: (secondarySymptoms: SecondarySymptom[]) => void;
  handleSecondarySymptomsClick: (
    primaryId: number,
    secondaryId: number
  ) => void;
};

export const useSecondarySymptomStore = create<SecondarySymptomStore>(
  (set) => ({
    secondarySymptoms: secondarySymptomsData.map(
      ({ id, primary, symptoms, labels }) => {
        const additional = [...flattenNestedSymptoms(symptoms), "Ninguno(a)"];
        const additional_details = [
          ...flattenNestedSymptoms(labels),
          "No se muestra ninguno de los síntomas anteriores.",
        ];
        return {
          id,
          primary,
          additional,
          additional_details,
          checked: new Array(additional.length).fill(false),
        };
      }
    ),
    setSecondarySymptoms: (secondarySymptoms) => set({ secondarySymptoms }),
    handleSecondarySymptomsClick: (primaryId, secondaryId) =>
      set((state) => {
        const updatedSecondarySymptoms = state.secondarySymptoms.map(
          (secSympt, index) => {
            if (index === primaryId) {
              const newItem = { ...secSympt };
              newItem.checked[secondaryId] = !newItem.checked[secondaryId];

              if (newItem.additional[secondaryId] === "Ninguno(a)") {
                newItem.checked.fill(false);
                newItem.checked[secondaryId] = true;
              } else {
                newItem.checked[newItem.checked.length - 1] = false;
              }
              return newItem;
            }
            return secSympt;
          }
        );

        return { secondarySymptoms: updatedSecondarySymptoms };
      }),
  })
);

type ClinicalIDStore = {
  clinicosID: string;
  setClinicalID: (id: string) => void;
};

export const useClinicalIDStore = create<ClinicalIDStore>((set) => ({
  clinicosID: "",
  setClinicalID: (clinicosID) => set({ clinicosID }),
}));

type ContactoIDStore = {
  contactoID: string;
  setContactoID: (id: string) => void;
};

export const useContactoIDStore = create<ContactoIDStore>((set) => ({
  contactoID: "",
  setContactoID: (contactoID) => set({ contactoID }),
}));

type OtrosIDStore = {
  otrosID: string;
  setOtrosID: (id: string) => void;
};

export const useOtrosIDStore = create<OtrosIDStore>((set) => ({
  otrosID: "",
  setOtrosID: (otrosID) => set({ otrosID }),
}));

type OcupacionIDStore = {
  ocupacionID: string;
  setOcupacionID: (id: string) => void;
};

export const useOcupacionIDStore = create<OcupacionIDStore>((set) => ({
  ocupacionID: "",
  setOcupacionID: (ocupacionID) => set({ ocupacionID }),
}));

type VisitationIDStore = {
  visitationID: string;
  setVisitationID: (visitationID: string) => void;
};

export const useVisitationIDStore = create<VisitationIDStore>((set) => ({
  visitationID: "",
  setVisitationID: (visitationID) => set({ visitationID }),
}));
