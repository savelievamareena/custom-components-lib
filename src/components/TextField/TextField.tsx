import React, { type FC, useRef, useState } from "react";
import { type TextFieldProps } from "./TextField.types";
import classNames from "classnames";
import "./TextField.scss";

const TextField: FC<TextFieldProps> = ({ disabled, error, variant, label }) => {
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleOuterDivClick = () => {
        inputRef.current?.focus();
    };

    const styles = classNames("text_field_wrapper", error ? "error" : "", variant);

    return (
        <div className={styles} onClick={handleOuterDivClick}>
            <label
                className={inputValue || error ? "text_field_label focused" : "text_field_label"}
            >
                {label}
            </label>
            <input
                ref={inputRef}
                className='text_field_input'
                type='text'
                disabled={disabled}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default TextField;
