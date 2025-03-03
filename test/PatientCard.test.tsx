import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import PatientCard from "~/algorithms/PatientCard";
import {
  typeReportCard,
  enumPatientType,
  enumSexonacer,
  enumGenero,
  typeIrasDiagnostic,
} from "~/algorithms/utilitiesTypes";

const mockReportCard: typeReportCard = {
  primaryConditions: ["Enfermedades diarreicas agudas"],
  age: { years: 0, months: 0, days: 30 },
  symptoms: ["Diarrea", "Fiebre", "Embarazo actual"],
  dob: "2025-01-01T00:00:00.000Z",
  patientType: enumPatientType.Pediatrico,
  secondaryConditions: [],
  embarazo: false,
  diagnosis: "Bronquitis antibiotico",
  sexonacer: enumSexonacer.Mujer,
  genero: enumGenero.MujerCisgenero,
  postmenopausia: false,
  hospitalized: false,
  takenMedication: false,
  disability: false,
  migrant: false,
  indigenous: false,
  afrodescendant: false,
  evacuationCount: 12,
  vomitCount: 0,
  allergies: [],
};

describe("PatientCard Component", () => {
  it("renders patient summary correctly", () => {
    render(<PatientCard data={mockReportCard} />);

    expect(screen.getByText("Resumen del Paciente")).toBeInTheDocument();
    expect(screen.getByText("Fecha de nacimiento (edad)")).toBeInTheDocument();
    const dobElement = screen.getByText(
      /Fecha de nacimiento \(edad\)/
    ).nextSibling;
    expect(dobElement).toHaveTextContent(
      /2025-01-01 \(0 años, 0 meses, 30 días\)/
    );
    expect(screen.getByText("Sexo al nacer")).toBeInTheDocument();
    expect(screen.getByText("Mujer")).toBeInTheDocument();
    expect(screen.getByText("Identidad de género")).toBeInTheDocument();
    expect(screen.getByText("Mujer cisgénero")).toBeInTheDocument();
    expect(screen.getByText("Condición primaria")).toBeInTheDocument();
    expect(
      screen.getByText("Enfermedades diarreicas agudas")
    ).toBeInTheDocument();
  });

  it("renders symptoms correctly", () => {
    render(<PatientCard data={mockReportCard} />);

    expect(screen.getByText("Síntomas presentados")).toBeInTheDocument();
    expect(
      screen.getByText("Diarrea (12 evacuaciones en las últimas 24 horas)")
    ).toBeInTheDocument();
    expect(screen.getByText("Fiebre")).toBeInTheDocument();
    expect(screen.getByText("Embarazo actual")).toBeInTheDocument();
  });

  describe("renders allergies correctly", () => {
    const testCases = [
      {
        description: "when there are no allergies",
        data: { ...mockReportCard, allergies: [] },
        expectedAllergyText: "No alergias presentadas",
        shouldShowAllergy: false,
      },
      {
        description: "when allergies are present",
        data: { ...mockReportCard, allergies: ["Penicilina"] },
        expectedAllergyText: "Alergias presentadas",
        shouldShowAllergy: true,
      },
    ];

    testCases.forEach(
      ({ description, data, expectedAllergyText, shouldShowAllergy }) => {
        it(description, () => {
          render(<PatientCard data={data} />);

          // expect(screen.getByText(expectedAllergyText)).toBeInTheDocument();

          if (shouldShowAllergy) {
            expect(screen.getByText("Penicilina")).toBeInTheDocument();
          } else {
            expect(screen.queryByText("Penicilina")).not.toBeInTheDocument();
            expect(
              screen.queryByText("alergias presentadas")
            ).toBeInTheDocument();
          }
        });
      }
    );
  });

  it("renders no symptoms message when no symptoms are present", () => {
    const noSymptomsReportCard = { ...mockReportCard, symptoms: [] };
    render(<PatientCard data={noSymptomsReportCard} />);

    expect(screen.getByText("síntomas presentados")).toBeInTheDocument();
  });
});
