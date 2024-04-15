export interface TextFieldProps {
    value: string;
    disabled: boolean;
    error: boolean;
    label: string;
    variant: "outlined" | "filled" | "standard";
    readonly: boolean;
}
