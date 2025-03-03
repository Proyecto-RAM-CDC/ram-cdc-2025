import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import AboutPage from "~/routes/_public.about";
import { MemoryRouter } from "react-router-dom";

vi.mock("~/components/navigation/ConfirmLeaving", () => ({
  __esModule: true,
  default: ({
    onConfirm,
    onCancel,
    targetURL,
  }: {
    onConfirm: () => void;
    onCancel: () => void;
    targetURL: string;
  }) => (
    <div>
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onCancel}>Cancel</button>
      <div>{targetURL}</div>
    </div>
  ),
}));

vi.mock("~/utilities/ImageGenerator", () => ({
  __esModule: true,
  default: ({
    duration,
    classes,
    altText,
  }: {
    duration: number;
    classes: string;
    altText: string;
  }) => <img src="test-image.jpg" alt={altText} className={classes} />,
}));

vi.mock("~/utilities/Sponsors", () => ({
  __esModule: true,
  default: () => <div>Sponsors Component</div>,
}));

describe("AboutPage Component", () => {
  it("renders the AboutPage component", () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );
    expect(screen.getByText("¿Quiénes somos?")).toBeInTheDocument();
  });

  it("handles external link click with confirmation", () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );

    const externalLink: HTMLElement[] = screen.getAllByText(
      "¡Lea más en el sitio web de la Secretaría de Salud!"
    );
    expect(externalLink).toHaveLength(4);

    for (let i = 0; i < externalLink.length; i++) {
      fireEvent.click(externalLink[i]);
      expect(screen.getByText("Confirm")).toBeInTheDocument();
      expect(screen.getByText("Cancel")).toBeInTheDocument();
    }
  });

  it("renders the Sponsors component", () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );
    expect(screen.getByText("Sponsors Component")).toBeInTheDocument();
  });
});
