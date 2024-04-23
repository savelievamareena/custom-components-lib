import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "./Modal";

describe("Modal Component", () => {
    it("should open when the open prop is true", () => {
        render(
            <Modal open={true} onClose={() => {}}>
                Modal Content
            </Modal>,
        );
        expect(screen.getByRole("dialog")).toHaveClass("modal_wrapper opened");
    });

    it("should not be visible when the open prop is false", () => {
        render(
            <Modal open={false} onClose={() => {}}>
                Modal Content
            </Modal>,
        );
        expect(screen.queryByRole("dialog")).not.toHaveClass("opened");
    });

    it("should call onClose when the escape key is pressed", () => {
        const onClose = jest.fn();
        render(
            <Modal open={true} onClose={onClose}>
                Modal Content
            </Modal>,
        );
        fireEvent.keyDown(document, { key: "Escape" });
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("should close when clicked outside the modal content", () => {
        const onClose = jest.fn();
        render(
            <Modal open={true} onClose={onClose}>
                Modal Content
            </Modal>,
        );
        fireEvent.click(screen.getByRole("dialog"));
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("should not close when clicked inside the modal content", () => {
        const onClose = jest.fn();
        render(
            <Modal open={true} onClose={onClose}>
                <div>Modal Content</div>
            </Modal>,
        );
        fireEvent.click(screen.getByText("Modal Content"));
        expect(onClose).not.toHaveBeenCalled();
    });
});
