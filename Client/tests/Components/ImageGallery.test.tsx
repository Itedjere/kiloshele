import React from "react";

import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import ImageGallery from "../../src/pages/ImageGallery";

describe("ImageGallery", () => {
  it("should be an empty dom element when imgurls array is empty", () => {
    const { container } = render(<ImageGallery imgUrls={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("should equal length of images and url attribute should be correct", () => {
    const imgUrls: string[] = ["ronaldo.jpg", "messi.jpg", "kante.jpg"];

    render(<ImageGallery imgUrls={imgUrls} />);

    const images = screen.getAllByRole("img");

    console.log(images);

    expect(images).toHaveLength(imgUrls.length);
    images.forEach((img, index) => {
      expect(img).toHaveAttribute("src", imgUrls[index]);
    });
  });
});
