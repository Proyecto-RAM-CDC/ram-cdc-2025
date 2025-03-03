import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, beforeEach, vi } from "vitest";
import ResistanceSearch from "~/components/inDRE/ResistanceChooser";
import { Resistance } from "@prisma/client";

const mockResistanceList: Resistance[] = [
  { id: "1", resistanceMechanism: "Mechanism A" },
  { id: "2", resistanceMechanism: "Mechanism B" },
  { id: "3", resistanceMechanism: "Mechanism C" },
];

describe("ResistanceSearch Component", () => {
  let setSelectedResistance: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    setSelectedResistance = vi.fn();
  });

  const renderComponent = (
    selectedResistance: string[] = [],
    list_of_resistance_objs: Resistance[] | null = mockResistanceList
  ) => {
    render(
      <ResistanceSearch
        selectedResistance={selectedResistance}
        setSelectedResistance={setSelectedResistance}
        list_of_resistance_objs={list_of_resistance_objs}
      />
    );
  };

  it("renders the component with options", () => {
    renderComponent();

    const select = screen.getByLabelText("Nombre del Mecanismo de Resistencia");
    expect(select).toBeInTheDocument();
    expect(select).toHaveAttribute("multiple");

    mockResistanceList.forEach((resistance) => {
      expect(
        screen.getByText(resistance.resistanceMechanism)
      ).toBeInTheDocument();
    });
  });

  it("calls setSelectedResistance on selection change", () => {
    renderComponent();
    const select = screen.getByTestId("resistance-select");

    // Mock the selectedOptions property
    Object.defineProperty(select, "selectedOptions", {
      value: [{ value: "Mechanism A" }, { value: "Mechanism B" }],
      writable: true,
    });

    // Simulate triggering the "select" element's "onChange" event.
    fireEvent.change(select, {
      target: {
        selectedOptions: [{ value: "Mechanism A" }, { value: "Mechanism B" }],
      },
    });

    expect(setSelectedResistance).toHaveBeenCalledWith([
      "Mechanism A",
      "Mechanism B",
    ]);
  });

  it("handles empty resistance list gracefully", () => {
    renderComponent([], []);
    const select = screen.getByLabelText("Nombre del Mecanismo de Resistencia");
    expect(select).toBeInTheDocument();
    expect(select.children.length).toBe(0);
  });

  it("renders no options when list_of_resistance_objs is null or undefined", () => {
    renderComponent([], null);
    const select = screen.getByLabelText("Nombre del Mecanismo de Resistencia");
    expect(select.children.length).toBe(0);
  });

  it("does not call setSelectedResistance if no valid options are selected", () => {
    renderComponent();
    const select = screen.getByTestId("resistance-select");

    // Mock the selectedOptions property
    Object.defineProperty(select, "selectedOptions", {
      value: [{ value: "Mechanism A" }, { value: "Mechanism B" }],
      writable: true,
    });

    fireEvent.change(select, {
      target: { selectedOptions: [{ value: "Invalid Mechanism" }] },
    });

    expect(setSelectedResistance).not.toHaveBeenCalled();
  });

  it("displays selected resistance mechanisms", () => {
    renderComponent(["Mechanism A", "Mechanism B"]);
    const select = screen.getByLabelText(
      "Nombre del Mecanismo de Resistencia"
    ) as HTMLSelectElement;
    expect(select).toBeInTheDocument();
    expect(select.value).toBe("Mechanism A");
  });
});
