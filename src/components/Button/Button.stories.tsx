import { type StoryObj, type Meta } from "@storybook/react";
import Button from "./Button";
import { type ButtonProps } from "./Button.types";
import "./Button.scss";

export default {
    title: "Components/Button",
    component: Button,
} as Meta;

export const Primary: StoryObj<ButtonProps> = {
    args: {
        variant: "text",
        size: "large",
        children: "My Button",
    },
};

export const Large: StoryObj<ButtonProps> = {
    args: {
        variant: "text",
        size: "large",
        children: "My Button",
    },
};

export const Small: StoryObj<ButtonProps> = {
    args: {
        size: "small",
        children: "My Button",
    },
};
