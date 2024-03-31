import React from "react";

export interface ButtonProps {
    children: React.ReactNode;
    variant: "text" | "contained" | "outlined";
    disabled: boolean;
    onClick: () => void;
    size: "small" | "medium" | "large";
}
