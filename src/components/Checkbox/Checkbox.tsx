import React, { type FC, useState } from "react";
import { type CheckboxProps } from "./Checkbox.types";
import "./Checkbox.scss";

const Checkbox: FC<CheckboxProps> = ({ label, checked, disabled, onChange }) => {
    const [isChecked, setIsChecked] = useState(checked);

    function handleClick() {
        setIsChecked(!isChecked);
    }

    return (
        <div className='checkbox_wrapper' onClick={disabled ? undefined : handleClick}>
            <input
                type='checkbox'
                checked={isChecked}
                disabled={disabled}
                onChange={onChange}
                id={"my_checkbox"}
            />
            <label>{label}</label>
        </div>
    );
};

export default Checkbox;
