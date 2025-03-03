import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import PrivacyPage from "~/routes/_public.privacy";
import { MemoryRouter } from "react-router-dom";

describe("PrivacyPage Component", () => {
  it("renders the PrivacyPage component", () => {
    render(
      <MemoryRouter>
        <PrivacyPage />
      </MemoryRouter>
    );
    expect(screen.getByText("Aviso de Privacidad")).toBeInTheDocument();
  });

  it("displays the correct headings and text", () => {
    render(
      <MemoryRouter>
        <PrivacyPage />
      </MemoryRouter>
    );
    expect(
      screen.getByText("Las finalidades de conocer sus datos")
    ).toBeInTheDocument();
    expect(screen.getByText("Así se protegen sus datos")).toBeInTheDocument();
    expect(screen.getByText("Transferencia de datos")).toBeInTheDocument();
    expect(
      screen.getByText(
        "¿Dónde se pueden ejercer los derechos de Acceso, Rectificación, Cancelación y Oposición de datos personales?"
      )
    ).toBeInTheDocument();
  });

  it("renders the list of required data", () => {
    render(
      <MemoryRouter>
        <PrivacyPage />
      </MemoryRouter>
    );
    expect(screen.getByText("Fecha de nacimiento.")).toBeInTheDocument();
    expect(screen.getByText("Sexo al nacer.")).toBeInTheDocument();
    expect(screen.getByText("Género.")).toBeInTheDocument();
    expect(screen.getByText("Peso.")).toBeInTheDocument();
    expect(screen.getByText("Talla.")).toBeInTheDocument();
    expect(
      screen.getByText("Condiciones crónicas y otros datos clínicos.")
    ).toBeInTheDocument();
  });

  it("renders the list of optional data", () => {
    render(
      <MemoryRouter>
        <PrivacyPage />
      </MemoryRouter>
    );
    expect(screen.getByText("CURP.")).toBeInTheDocument();
    expect(screen.getByText("Nombre.")).toBeInTheDocument();
    expect(screen.getByText("Dirección.")).toBeInTheDocument();
    expect(screen.getByText("Estado civil.")).toBeInTheDocument();
    expect(screen.getByText("Grado de estudios.")).toBeInTheDocument();
    expect(screen.getByText("Lugar de origen.")).toBeInTheDocument();
    expect(screen.getByText("Correo y celular.")).toBeInTheDocument();
  });

  it("renders the list of sensitive data", () => {
    render(
      <MemoryRouter>
        <PrivacyPage />
      </MemoryRouter>
    );
    expect(
      screen.getByText("Estado de salud presente y pasado.")
    ).toBeInTheDocument();
    expect(screen.getByText("Preferencia sexual.")).toBeInTheDocument();
  });

  it("renders the ARCO rights section", () => {
    render(
      <MemoryRouter>
        <PrivacyPage />
      </MemoryRouter>
    );
    expect(
      screen.getByText(
        "¿Dónde se pueden ejercer los derechos de Acceso, Rectificación, Cancelación y Oposición de datos personales?"
      )
    ).toBeInTheDocument();
  });
});
