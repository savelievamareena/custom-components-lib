import { ComponentProps } from "react";

export interface ButtonProps extends ComponentProps<"button"> {
    variant?: "text" | "contained" | "outlined";
    size?: "small" | "medium" | "large";
}
