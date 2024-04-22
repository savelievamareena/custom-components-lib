import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { type TextFieldProps } from "./TextField.types";
import styles from "./TextField.module.scss";

const TextField = ({ text = "", error, variant = "standard", label, ...props }: TextFieldProps) => {
    const [inputValue, setInputValue] = useState(text);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setInputValue(text);
    }, [text]);

    const handleSvgClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

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
                role={"label"}
                className={classNames(styles.text_field_label, {
                    [styles.focused]: inputValue || error,
                })}
            >
                {label}
            </span>
            <input
                role={"input"}
                ref={inputRef}
                value={inputValue}
                className={styles.text_field_input}
                type='text'
                disabled={props.disabled}
                onChange={handleInputChange}
                {...props}
            />
            {props.icon && (
                <div className={styles.iconContainer} role={"button"} onClick={handleSvgClick}>
                    {props.icon}
                </div>
            )}
        </label>
    );
};

export default TextField;
