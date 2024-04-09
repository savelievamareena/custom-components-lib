import { type StoryObj, type Meta } from "@storybook/react";
import Switch from "./Switch";
import { type SwitchProps } from "./Switch.types";

export default {
    title: "Components/Switch",
    component: Switch,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} as Meta;

export const Primary: StoryObj<SwitchProps> = {
    args: {
        checked: true,
        disabled: false,
    },
};

export const Unchecked: StoryObj<SwitchProps> = {
    args: {
        checked: false,
        disabled: false,
    },
};

export const Disabled: StoryObj<SwitchProps> = {
    args: {
        checked: false,
        disabled: true,
    },
};

export const DisabledChecked: StoryObj<SwitchProps> = {
    args: {
        checked: true,
        disabled: true,
    },
};
