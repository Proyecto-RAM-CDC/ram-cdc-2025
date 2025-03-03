import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, beforeEach, vi } from "vitest";
import GeneSearch from "~/components/inDRE/GeneChooser";
import { Gene } from "@prisma/client";

const mockGeneList: Gene[] = [
  { id: "1", geneName: "Gene A" },
  { id: "2", geneName: "Gene B" },
  { id: "3", geneName: "Gene C" },
];

describe("GeneSearch Component", () => {
  let setSelectedGene: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    setSelectedGene = vi.fn();
  });

  const renderComponent = (
    selectedGene: string[] = [],
    list_of_genes_objs: Gene[] | null = mockGeneList
  ) => {
    render(
      <GeneSearch
        selectedGene={selectedGene}
        setSelectedGene={setSelectedGene}
        list_of_genes_objs={list_of_genes_objs}
      />
    );
  };

  it("renders the component with options", () => {
    renderComponent();

    const select = screen.getByLabelText(
      "Genes asociados a mecanismos de resistencia"
    );
    expect(select).toBeInTheDocument();
    expect(select).toHaveAttribute("multiple");

    mockGeneList.forEach((resistance) => {
      expect(screen.getByText(resistance.geneName)).toBeInTheDocument();
    });
  });

  it("calls setSelectedResistance on selection change", () => {
    renderComponent();
    const select = screen.getByTestId("gene-select");

    // Mock the selectedOptions property
    Object.defineProperty(select, "selectedOptions", {
      value: [{ value: "Gene A" }, { value: "Gene B" }],
      writable: true,
    });

    // Simulate triggering the "select" element's "onChange" event.
    fireEvent.change(select, {
      target: {
        selectedOptions: [{ value: "Gene A" }, { value: "Gene B" }],
      },
    });

    expect(setSelectedGene).toHaveBeenCalledWith(["Gene A", "Gene B"]);
  });

  it("handles empty gene list gracefully", () => {
    renderComponent([], []);
    const select = screen.getByLabelText(
      "Genes asociados a mecanismos de resistencia"
    );
    expect(select).toBeInTheDocument();
    expect(select.children.length).toBe(0);
  });

  it("renders no options when list_of_gene_objs is null or undefined", () => {
    renderComponent([], null);
    const select = screen.getByLabelText(
      "Genes asociados a mecanismos de resistencia"
    );
    expect(select.children.length).toBe(0);
  });

  it("does not call setSelectedGene if no valid options are selected", () => {
    renderComponent();
    const select = screen.getByTestId("gene-select");

    // Mock the selectedOptions property
    Object.defineProperty(select, "selectedOptions", {
      value: [{ value: "Gene A" }, { value: "Gene B" }],
      writable: true,
    });

    fireEvent.change(select, {
      target: { selectedOptions: [{ value: "Invalid Gene" }] },
    });

    expect(setSelectedGene).not.toHaveBeenCalled();
  });

  it("displays selected gene names", () => {
    renderComponent(["Gene A", "Gene B"]);
    const select = screen.getByLabelText(
      "Genes asociados a mecanismos de resistencia"
    ) as HTMLSelectElement;
    expect(select).toBeInTheDocument();
    expect(select.value).toBe("Gene A");
  });
});
