import { type StoryObj, type Meta } from "@storybook/react";
import Button from "./Button";
import { type ButtonProps } from "./Button.types";

export default {
    title: "Components/Button",
    component: Button,
} as Meta;

export const Large: StoryObj<ButtonProps> = {
    args: {
        variant: "text",
        size: "large",
        children: "LARGE",
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
        variant: "outlined",
    },
};
