import React from "react";
import classNames from "classnames";
import { type ButtonProps } from "./Button.types";
import styles from "./Button.module.scss";

const Button = ({ variant = "contained", size = "medium", className, ...props }: ButtonProps) => {
    const classes = classNames(styles.button, styles[size], styles[variant], className);

    return (
        <button className={classes} {...props}>
            {props.children}
        </button>
    );
};

export default Button;
