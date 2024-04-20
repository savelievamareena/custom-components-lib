import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Select from "./Select";
import { expect } from "@storybook/test";

describe("Select Component", () => {
    const options = [
        { option: "Option 1", id: 0 },
        { option: "Option 2", id: 1 },
        { option: "Option 3", id: 2 },
    ];

    it("renders correctly", () => {
        render(<Select label='Test Label' options={options} />);
        expect(screen.getByText("Test Label")).toBeInTheDocument();
        const optionsEl = screen.queryByRole("menu");
        expect(optionsEl).toBeNull();
    });

    // it("toggles options visibility on click", () => {
    //     render(<Select label='Click Test' options={options} />);
    //     const toggle = screen.getByRole("input");
    //     toggle.focus();
    //
    //     let optionsEl = screen.queryByRole("menu");
    //     expect(optionsEl).toBeNull();
    //
    //     fireEvent.click(toggle);
    //     expect(screen.queryByRole("menu")).toBeInTheDocument();
    //
    //     optionsEl = screen.queryByRole("menu");
    //     expect(optionsEl).toBeInTheDocument();
    //
    //     fireEvent.click(toggle);
    //
    //     optionsEl = screen.queryByRole("menu");
    //     expect(optionsEl).not.toBeInTheDocument();
    // });

    it("selects an option and updates the text field", () => {
        render(<Select label='Select Option' options={options} />);
        const handleClick = jest.fn();
        const textField = screen.getByRole("input");
        fireEvent.click(textField);
        expect(handleClick).toHaveBeenCalled();
        fireEvent.click(screen.getByText("Option 2"));
        expect(textField).toHaveValue("Option 2");
    });

    it("handles keyboard navigation", () => {
        render(<Select label='Keyboard Test' options={options} />);
        const toggle = screen.getByRole("input");
        toggle.focus();
        fireEvent.keyDown(toggle, { key: "ArrowDown" });
        fireEvent.keyDown(toggle, { key: "Enter" });
        expect(toggle).toHaveValue("Option 1"); // First option should be selected
    });

    it("closes options when clicking outside", () => {
        render(<Select label='Outside Click' options={options} />);
        fireEvent.click(screen.getByRole("input"));
        fireEvent.click(document.body);
        expect(screen.queryByText("Option 1")).toBeNull();
    });

    it("displays the label passed as a prop", () => {
        const { getByText } = render(<Select label='Test Label' options={[]} />);
        expect(getByText("Test Label")).toBeInTheDocument();
    });

    // it("renders all options passed as a prop", () => {
    //     const options = [{ option: "Option 1" }, { option: "Option 2" }];
    //     const { getByText, queryByText } = render(<Select label='Select Test' options={options} />);
    //
    //     expect(queryByText("Option 1")).toBeNull();
    //     expect(queryByText("Option 2")).toBeNull();
    //
    //     fireEvent.click(screen.getByText("Select Test"));
    //
    //     // Проверяем, что опции теперь видны
    //     expect(getByText("Option 1")).toBeInTheDocument();
    //     expect(getByText("Option 2")).toBeInTheDocument();
    // });

    // it("updates the display when an option is selected", () => {
    //     const options = [{ option: "Option 1" }, { option: "Option 2" }];
    //     const { getByText, getByRole } = render(<Select label='Select Test' options={options} />);
    //
    //     fireEvent.click(screen.getByText("Select Test"));
    //     fireEvent.click(screen.getByText("Option 2"));
    //
    //     // Проверяем, что выбранная опция отображается в текстовом поле
    //     expect(getByRole("textbox")).toHaveValue("Option 2");
    // });
});
