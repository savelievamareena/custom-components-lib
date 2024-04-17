import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { type TextFieldProps } from "./TextField.types";
import styles from "./TextField.module.scss";

const TextField = ({
    value = "",
    error,
    variant = "standard",
    label,
    ...props
}: TextFieldProps) => {
    const [inputValue, setInputValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const classes = classNames(
        styles.text_field_wrapper,
        error ? styles.error : "",
        styles[variant],
        props.disabled ? styles.disabled : "",
    );

    return (
        <label className={classes}>
            <span
                className={classNames(styles.text_field_label, {
                    [styles.focused]: inputValue || error,
                })}
            >
                {label}
            </span>
            <input
                ref={inputRef}
                value={inputValue}
                className={styles.text_field_input}
                type='text'
                disabled={props.disabled}
                onChange={handleInputChange}
                {...props}
            />
        </label>
    );
};

export default TextField;
