import { type StoryObj, type Meta } from "@storybook/react";
import Select from "./Select";
import { type SelectProps } from "./Select.types";

export default {
    title: "Components/Select",
    component: Select,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} as Meta;

export const Primary: StoryObj<SelectProps> = {
    args: {
        label: "Age",
        options: [
            { id: 1, option: "Five" },
            { id: 2, option: "Ten" },
            { id: 3, option: "Fifteen" },
        ],
    },
};
