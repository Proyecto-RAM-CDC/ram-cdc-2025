import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import AntiMicrobianoTable from "~/components/inDRE/AntiMicrobianoTable";

const mockAntimicrobialsList = [
  "Antimicrobial1_#ff0000",
  "Antimicrobial2_#00ff00",
  "Antimicrobial3_#0000ff",
];

describe("AntiMicrobianoTable Component", () => {
  it("renders 'Antimicrobiano' in the thead", () => {
    render(<AntiMicrobianoTable antimicrobialsList={mockAntimicrobialsList} />);
    const theadElement = screen.getByText("Antimicrobiano", {
      selector: "thead td",
    });
    expect(theadElement).toBeInTheDocument();
  });

  it("renders 'Sensible' in the thead", () => {
    render(<AntiMicrobianoTable antimicrobialsList={mockAntimicrobialsList} />);
    const theadElement = screen.getByText("Sensible", {
      selector: "thead td",
    });
    expect(theadElement).toBeInTheDocument();
  });

  it("renders 'Intermedio' in the thead", () => {
    render(<AntiMicrobianoTable antimicrobialsList={mockAntimicrobialsList} />);
    const theadElement = screen.getByText("Intermedio", {
      selector: "thead td",
    });
    expect(theadElement).toBeInTheDocument();
  });

  it("renders 'Resistente' in the thead", () => {
    render(<AntiMicrobianoTable antimicrobialsList={mockAntimicrobialsList} />);
    const theadElement = screen.getByText("Resistente", {
      selector: "thead td",
    });
    expect(theadElement).toBeInTheDocument();
  });

  it("renders 'CMI' in the thead", () => {
    render(<AntiMicrobianoTable antimicrobialsList={mockAntimicrobialsList} />);
    const theadElement = screen.getByText("CMI", {
      selector: "thead td",
    });
    expect(theadElement).toBeInTheDocument();
  });

  it("renders 'Antimicrobiano' in the tfoot", () => {
    render(<AntiMicrobianoTable antimicrobialsList={mockAntimicrobialsList} />);
    const tfootElement = screen.getByText("Antimicrobiano", {
      selector: "tfoot td",
    });
    expect(tfootElement).toBeInTheDocument();
  });

  it("renders 'Sensible' in the tfoot", () => {
    render(<AntiMicrobianoTable antimicrobialsList={mockAntimicrobialsList} />);
    const tfootElement = screen.getByText("Sensible", {
      selector: "tfoot td",
    });
    expect(tfootElement).toBeInTheDocument();
  });

  it("renders 'Intermedio' in the tfoot", () => {
    render(<AntiMicrobianoTable antimicrobialsList={mockAntimicrobialsList} />);
    const tfootElement = screen.getByText("Intermedio", {
      selector: "tfoot td",
    });
    expect(tfootElement).toBeInTheDocument();
  });

  it("renders 'Resistente' in the tfoot", () => {
    render(<AntiMicrobianoTable antimicrobialsList={mockAntimicrobialsList} />);
    const tfootElement = screen.getByText("Resistente", {
      selector: "tfoot td",
    });
    expect(tfootElement).toBeInTheDocument();
  });

  it("renders 'CMI' in the tfoot", () => {
    render(<AntiMicrobianoTable antimicrobialsList={mockAntimicrobialsList} />);
    const tfootElement = screen.getByText("CMI", {
      selector: "tfoot td",
    });
    expect(tfootElement).toBeInTheDocument();
  });

  it("displays the correct antimicrobial names and colors", () => {
    render(<AntiMicrobianoTable antimicrobialsList={mockAntimicrobialsList} />);
    mockAntimicrobialsList.forEach((antimicrobial) => {
      const [name, color] = antimicrobial.split("_");
      const antimicrobialElement = screen.getByText(name);
      expect(antimicrobialElement).toBeInTheDocument();
      expect(antimicrobialElement).toHaveStyle(`color: ${color}`);
    });
  });

  it("toggles the sensible checkbox correctly", () => {
    render(<AntiMicrobianoTable antimicrobialsList={mockAntimicrobialsList} />);
    const sensibleCheckbox = screen.getByTestId("sensible-checkbox-0");
    fireEvent.click(sensibleCheckbox);
    expect(sensibleCheckbox).toBeChecked();
  });

  it("toggles the intermedio checkbox correctly", () => {
    render(<AntiMicrobianoTable antimicrobialsList={mockAntimicrobialsList} />);
    const intermedioCheckbox = screen.getByTestId("intermedio-checkbox-0");
    fireEvent.click(intermedioCheckbox);
    expect(intermedioCheckbox).toBeChecked();
  });

  it("toggles the resistente checkbox correctly", () => {
    render(<AntiMicrobianoTable antimicrobialsList={mockAntimicrobialsList} />);
    const resistenteCheckbox = screen.getByTestId("resistente-checkbox-0");
    fireEvent.click(resistenteCheckbox);
    expect(resistenteCheckbox).toBeChecked();
  });

  it("handles CMI input change correctly", () => {
    render(<AntiMicrobianoTable antimicrobialsList={mockAntimicrobialsList} />);
    const cmiInput = screen.getByTestId("cmi-input-0");
    fireEvent.change(cmiInput, { target: { value: "1.23" } });
    expect(cmiInput).toHaveValue(1.23);
  });
});
