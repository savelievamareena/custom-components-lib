import { type StoryObj, type Meta } from "@storybook/react";
import Checkbox from "./Checkbox";
import { type CheckboxProps } from "./Checkbox.types";

export default {
    title: "Components/Checkbox",
    component: Checkbox,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} as Meta;

export const Primary: StoryObj<CheckboxProps> = {
    args: {
        label: "I agree to receive emails",
        checked: true,
    },
};

export const Unchecked: StoryObj<CheckboxProps> = {
    args: {
        label: "I agree to receive emails",
        checked: false,
    },
};

export const DisabledChecked: StoryObj<CheckboxProps> = {
    args: {
        label: "I agree to receive emails",
        checked: true,
        disabled: true,
    },
};

export const DisabledUnchecked: StoryObj<CheckboxProps> = {
    args: {
        label: "I agree to receive emails",
        checked: false,
        disabled: true,
    },
};
