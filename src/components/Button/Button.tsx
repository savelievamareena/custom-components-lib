import React, { type FC } from "react";
import { type ButtonProps } from "./Button.types";
import "./Button.scss";
import classNames from "classnames";

const Button: FC<ButtonProps> = ({
    children,
    variant = "contained",
    disabled = false,
    size = "medium",
    onClick,
}) => {
    const classes = classNames("my_button", size, variant);

    return (
        <button
            className={classes}
            disabled={disabled}
            onClick={function () {
                onClick();
            }}
        >
            {children}
        </button>
    );
};

export default Button;
