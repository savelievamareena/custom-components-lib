import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";

describe("Button Component", () => {
    it("renders with default props", () => {
        render(<Button>Default</Button>);
        const button = screen.getByRole("button", { name: "Default" });
        expect(button).toHaveClass("my_button");
        expect(button).toHaveClass("contained");
        expect(button).toHaveClass("medium");
    });

    it("applies the variant class based on props", () => {
        render(<Button variant='outlined'>Outlined</Button>);
        const button = screen.getByRole("button", { name: "Outlined" });
        expect(button).toHaveClass("outlined");
        expect(button).not.toHaveClass("contained");
    });

    it("applies the size class based on props", () => {
        render(<Button size='small'>Small</Button>);
        const button = screen.getByRole("button", { name: "Small" });
        expect(button).toHaveClass("small");
        expect(button).not.toHaveClass("medium");
    });

    it("applies additional custom className passed via props", () => {
        render(<Button className='extraClass'>With Extra Class</Button>);
        const button = screen.getByRole("button", { name: "With Extra Class" });
        expect(button).toHaveClass("extraClass");
    });

    it("passes other props to the button element", () => {
        render(<Button aria-label='Custom Aria Label'>Aria Label</Button>);
        const button = screen.getByRole("button", { name: "Custom Aria Label" });
        expect(button).toBeInTheDocument();
    });
});
