import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Checkbox from "./Checkbox";

describe("Checkbox Component", () => {
    it("renders with a label", () => {
        const labelText = "Check me";
        render(<Checkbox label={labelText} />);
        expect(screen.getByLabelText(labelText)).toBeInTheDocument();
    });

    it("toggles checked state on click", () => {
        const labelText = "Check me";
        render(<Checkbox label={labelText} />);
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).not.toBeChecked();
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
        fireEvent.click(checkbox);
        expect(checkbox).not.toBeChecked();
    });

    it("initially uses the checked prop to set the state", () => {
        const labelText = "Check me";
        render(<Checkbox label={labelText} checked />);
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBeChecked();
    });

    it("does not toggle when disabled", () => {
        const labelText = "Check me";
        render(<Checkbox label={labelText} disabled />);
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBeDisabled();
        fireEvent.click(checkbox);
        expect(checkbox).not.toBeChecked();
    });

    it("applies the disabled style when disabled", () => {
        const labelText = "Check me";
        render(<Checkbox label={labelText} disabled />);
        const label = screen.getByText(labelText);
        expect(label).toHaveClass("disabled");
    });
});
