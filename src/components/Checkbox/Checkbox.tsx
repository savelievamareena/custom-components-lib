import React, { useState } from "react";
import { type CheckboxProps } from "./Checkbox.types";
import styles from "./Checkbox.module.scss";

const Checkbox = ({ label, ...props }: CheckboxProps) => {
    const [isChecked, setIsChecked] = useState(props.checked);

    function handleClick() {
        setIsChecked(!isChecked);
    }

    return (
        <div className={styles.checkbox_wrapper} onClick={props.disabled ? undefined : handleClick}>
            <input type='checkbox' checked={isChecked} id={"my_checkbox"} {...props} />
            <label className={props.disabled ? styles.disabled : ""}>{label}</label>
        </div>
    );
};

export default Checkbox;
