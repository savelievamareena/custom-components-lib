import { type StoryObj, type Meta } from "@storybook/react";
import Modal from "./Modal";
import { type ModalProps } from "./Modal.types";

export default {
    title: "Components/Modal",
    component: Modal,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} as Meta;

export const Primary: StoryObj<ModalProps> = {
    args: {
        children: "I agree to receive emails",
        open: true,
        onClose: function () {
            console.log("test");
        },
    },
};

export const Closed: StoryObj<ModalProps> = {
    args: {
        children: "I agree to receive emails",
        open: false,
    },
};
