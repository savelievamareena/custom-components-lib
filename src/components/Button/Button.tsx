import React, { type FC } from "react";
import { type ButtonProps } from "./Button.types";

const Button: FC<ButtonProps> = ({ children, ...props }) => {
    const classes = ["my-button", `${props.size}`];
    return (
        <button className={classes.join(" ")} {...props}>
            {children}
        </button>
    );
};

export default Button;
