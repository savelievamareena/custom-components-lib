import { type StoryObj, type Meta } from "@storybook/react";
import TextField from "./TextField";
import { type TextFieldProps } from "./TextField.types";

export default {
    title: "Components/TextField",
    component: TextField,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} as Meta;

export const Primary: StoryObj<TextFieldProps> = {
    args: {
        disabled: false,
        error: false,
        variant: "outlined",
        label: "Name",
    },
};

export const WithError: StoryObj<TextFieldProps> = {
    args: {
        disabled: false,
        error: true,
        variant: "standard",
    },
};
