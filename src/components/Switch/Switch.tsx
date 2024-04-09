import React, { FC, useState } from "react";
import "./Switch.scss";
import { SwitchProps } from "./Switch.types";
import classNames from "classnames";

const Switch: FC<SwitchProps> = ({ checked, onChange, disabled }) => {
    const [isChecked, setIsChecked] = useState(checked);

    const toggleSwitch = () => {
        setIsChecked(!isChecked);
    };

    const styles = classNames("switch", isChecked ? "on" : "", disabled ? "disabled" : "");

    return (
        <>
            <input
                type='checkbox'
                checked={isChecked}
                disabled={disabled}
                className='toggle_input'
                onChange={onChange}
            />
            <div className={styles} onClick={disabled ? undefined : toggleSwitch}>
                <div className='toggle'></div>
            </div>
        </>
    );
};

export default Switch;
