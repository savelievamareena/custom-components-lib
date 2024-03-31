import React, { type FC } from "react";
import { type ButtonProps } from "./Button.types";

const Button: FC<ButtonProps> = ({ children, ...props }) => {
    return <button {...props}>{children}</button>;
};

export default Button;
