import { ComponentProps, ReactNode } from "react";

export interface TextFieldProps extends ComponentProps<"input"> {
    text: string;
    icon?: ReactNode;
    error: boolean;
    label: string;
    variant: "outlined" | "filled" | "standard";
}
