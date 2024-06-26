import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Switch from "./Switch";
import userEvent from "@testing-library/user-event";

describe("Switch Component", () => {
    it("renders as unchecked by default if no checked prop is provided", () => {
        render(<Switch />);
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).not.toBeChecked();
    });

    it("renders as checked if the checked prop is true", () => {
        render(<Switch checked={true} />);
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBeChecked();
    });

    it("toggles the checked state when clicked", () => {
        render(<Switch />);
        const checkbox = screen.getByRole("checkbox");
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
        fireEvent.click(checkbox);
        expect(checkbox).not.toBeChecked();
    });

    it("does not toggle when disabled", () => {
        render(<Switch disabled />);
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBeDisabled();
        userEvent.click(checkbox);
        expect(checkbox).not.toBeChecked();
    });

    it("calls onChange when toggled", () => {
        const handleChange = jest.fn();
        render(<Switch onChange={handleChange} />);
        const checkbox = screen.getByRole("checkbox");
        fireEvent.click(checkbox);
        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("applies disabled style when disabled", () => {
        render(<Switch disabled />);
        const switchDiv = screen.getByRole("checkbox").nextSibling;
        expect(switchDiv).toHaveClass("disabled");
    });
});
