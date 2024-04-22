import React, { useState } from "react";
import classNames from "classnames";
import { SwitchProps } from "./Switch.types";
import styles from "./Switch.module.scss";

const Switch = ({ ...props }: SwitchProps) => {
    const [isChecked, setIsChecked] = useState(props.checked);

    const toggleSwitch = () => {
        setIsChecked((prev) => !prev);
    };

    const classes = classNames(
        styles.switch,
        isChecked ? styles.on : "",
        props.disabled ? styles.disabled : "",
    );

    return (
        <>
            <input
                type='checkbox'
                checked={isChecked}
                disabled={props.disabled}
                className={styles.toggle_input}
                onChange={props.onChange}
                {...props}
            />
            <div className={classes} onClick={props.disabled ? undefined : toggleSwitch}>
                <div className={styles.toggle}></div>
            </div>
        </>
    );
};

export default Switch;
