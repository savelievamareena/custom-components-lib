import React, { useState } from "react";
import { type CheckboxProps } from "./Checkbox.types";
import styles from "./Checkbox.module.scss";

const Checkbox = ({ label, checked = false, ...props }: CheckboxProps) => {
    const [isChecked, setIsChecked] = useState(checked);

    function handleClick() {
        setIsChecked((prev) => !prev);
    }

    return (
        <div
            className={styles.checkbox_wrapper}
            onClick={props.disabled ? undefined : handleClick}
            id={"my_checkbox"}
        >
            <input
                value={props.value}
                type='checkbox'
                checked={isChecked}
                id={"my_checkbox_input"}
                onChange={props.onChange}
                {...props}
            />
            <label className={props.disabled ? styles.disabled : ""} htmlFor={"my_checkbox_input"}>
                {label}
            </label>
        </div>
    );
};

export default Checkbox;
