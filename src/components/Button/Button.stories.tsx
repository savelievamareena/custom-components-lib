import { type StoryObj, type Meta } from "@storybook/react";
import Button from "./Button";
import { type ButtonProps } from "./Button.types";

export default {
    title: "Components/Button",
    component: Button,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} as Meta;

export const Large: StoryObj<ButtonProps> = {
    args: {
        variant: "contained",
        size: "large",
        children: "LARGE",
        disabled: true,
    },
};

export const Medium: StoryObj<ButtonProps> = {
    args: {
        size: "medium",
        children: "MEDIUM",
        variant: "contained",
    },
};

export const Small: StoryObj<ButtonProps> = {
    args: {
        size: "small",
        children: "SMALL",
        variant: "contained",
    },
};
