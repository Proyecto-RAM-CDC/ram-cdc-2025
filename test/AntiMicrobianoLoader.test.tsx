import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import AntiMicrobianoLoader from "~/utilities/LoaderAnimation";

describe("AntiMicrobianoLoader Component", () => {
  it("renders without crashing", () => {
    const { container } = render(<AntiMicrobianoLoader />);
    expect(container).toBeInTheDocument();
  });

  it("contains the loader div", () => {
    const { container } = render(<AntiMicrobianoLoader />);
    const loaderDiv = container.querySelector(".loader");
    expect(loaderDiv).toBeInTheDocument();
  });

  it("contains the outer, middle, and inner divs", () => {
    const { container } = render(<AntiMicrobianoLoader />);
    const outerDiv = container.querySelector(".outer");
    const middleDiv = container.querySelector(".middle");
    const innerDiv = container.querySelector(".inner");

    expect(outerDiv).toBeInTheDocument();
    expect(middleDiv).toBeInTheDocument();
    expect(innerDiv).toBeInTheDocument();
  });
});
