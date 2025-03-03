import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Index from "~/routes/_public._index";

describe("Index Component", () => {
  it("renders the main heading", () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );
    const heading = screen.getByText(
      /Uso de antibióticos en unidades de primer nivel de atención/i
    );
    expect(heading).toBeInTheDocument();
  });

  it("renders the subheading", () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );
    const subheading = screen.getByText(
      /Consenso Interinstitucional del Sistema de Salud Estrategia CRAM/i
    );
    expect(subheading).toBeInTheDocument();
  });

  it("renders the 'Empezar' button", () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );
    const empezarButton = screen.getByText(/Empezar/i);
    expect(empezarButton).toBeInTheDocument();
  });

  it("renders the 'Aprende más' button", () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );
    const aprendeMasButton = screen.getByText(/Aprende más/i);
    expect(aprendeMasButton).toBeInTheDocument();
  });

  it("renders the RandomImage component", () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );
    const image = screen.getByAltText(/Random Mexico vista/i);
    expect(image).toBeInTheDocument();
  });

  it("renders the Sponsors component", () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );
    const sponsors = screen.getByText(
      /Muchísimos agradecimientos a las siguientes instituciones/i
    );
    expect(sponsors).toBeInTheDocument();
  });
});
