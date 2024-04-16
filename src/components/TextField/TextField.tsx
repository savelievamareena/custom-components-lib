import React, { useEffect, useRef, useState } from "react";
import { type TextFieldProps } from "./TextField.types";
import classNames from "classnames";
import "./TextField.scss";

const TextField = ({
    value = "",
    disabled,
    error,
    variant = "standard",
    label,
    readonly,
}: TextFieldProps) => {
    const [inputValue, setInputValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleOuterDivClick = () => {
        inputRef.current?.focus();
    };

    const styles = classNames(
        "text_field_wrapper",
        error ? "error" : "",
        variant,
        disabled ? "disabled" : "",
    );

    return (
        <div className={styles} onClick={handleOuterDivClick}>
            <label
                className={inputValue || error ? "text_field_label focused" : "text_field_label"}
            >
                {label}
            </label>
            <input
                ref={inputRef}
                value={inputValue}
                className='text_field_input'
                type='text'
                disabled={disabled}
                onChange={handleInputChange}
                readOnly={readonly}
            />
        </div>
    );
};

export default TextField;
