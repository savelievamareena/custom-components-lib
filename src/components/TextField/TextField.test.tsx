import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextField from "./TextField";

describe("TextField Component", () => {
    it("renders the input with initial text", () => {
        const initialText = "Hello";
        render(<TextField text={initialText} label='Name' />);
        expect(screen.getByRole("input")).toHaveValue(initialText);
    });

    it("updates the value when changed", () => {
        const { getByRole } = render(<TextField label='Name' />);
        const input = getByRole("input");
        fireEvent.change(input, { target: { value: "New Text" } });
        expect(input).toHaveValue("New Text");
    });

    it("displays error styles when error is true", () => {
        const { getByText } = render(<TextField error={true} label='Error Field' />);
        const label = getByText("Error Field");
        expect(label.parentElement).toHaveClass("error");
    });

    it("applies variant styles", () => {
        const { getByRole } = render(<TextField variant='outlined' label='Outlined' />);
        const input = getByRole("input");
        expect(input.parentElement).toHaveClass("outlined");
    });

    it("handles disabled state", () => {
        const { getByRole } = render(<TextField disabled label='Disabled' />);
        const input = getByRole("input");
        expect(input).toBeDisabled();
    });

    it("renders an icon when passed", () => {
        const Icon = () => <span>Icon</span>;
        render(<TextField icon={<Icon />} label='With Icon' />);
        expect(screen.getByText("Icon")).toBeInTheDocument();
    });
});
