import { ComponentProps } from "react";

export interface TextFieldProps extends ComponentProps<"input"> {
    value: string;
    error: boolean;
    label: string;
    variant: "outlined" | "filled" | "standard";
}
