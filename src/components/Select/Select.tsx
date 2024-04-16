import React, { useEffect, useRef, useState, CSSProperties } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import { TextField } from "../TextField";
import { type SelectProps } from "./Select.types";
import styles from "./Select.module.scss";

const Select = ({ label, options, ...props }: SelectProps) => {
    const [isOptionsVisible, setIsOptionsVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");

    const toggleRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<HTMLDivElement>(null);

    const [top, setTop] = useState("0px");
    const [left, setLeft] = useState("0px");
    const [bottom, setBottom] = useState("0px");

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsOptionsVisible((prevState) => !prevState);

        if (toggleRef.current && optionsRef.current) {
            const selectElement = toggleRef.current.getBoundingClientRect();
            setLeft(selectElement.left + "px");

            if (selectElement.bottom > 200) {
                const topCalculated = selectElement.top + selectElement.height;
                setTop(topCalculated + "px");
            } else {
                const bottomCalculated = selectElement.top + selectElement.height;
                setBottom(bottomCalculated + "px");
            }
        }
    };

    const handleOptionClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        if (event.currentTarget.textContent) {
            setSelectedOption(event.currentTarget.textContent);
            setIsOptionsVisible(false);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (isOptionsVisible) {
                if (event.key === "Escape") {
                    setIsOptionsVisible(false);
                }
            } else {
                if (event.key === "Enter") {
                    setIsOptionsVisible(true);

                    if (toggleRef.current && optionsRef.current) {
                        const selectElement = toggleRef.current.getBoundingClientRect();
                        setLeft(selectElement.left + "px");

                        if (selectElement.bottom > 200) {
                            const topCalculated = selectElement.top + selectElement.height;
                            setTop(topCalculated + "px");
                        } else {
                            const bottomCalculated = selectElement.top + selectElement.height;
                            setBottom(bottomCalculated + "px");
                        }
                    }
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOptionsVisible]);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                isOptionsVisible &&
                optionsRef.current &&
                !optionsRef.current.contains(event.target as Node)
            ) {
                setIsOptionsVisible(false);
            }
        };

        if (isOptionsVisible) {
            document.addEventListener("click", handleOutsideClick);
        } else {
            document.removeEventListener("click", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [isOptionsVisible]);

    const positionCalculated: CSSProperties = { left: left, position: "absolute" };
    if (top === "0px") {
        positionCalculated.bottom = bottom;
    } else {
        positionCalculated.top = top;
    }

    const classes = classNames(styles.options_wrapper, isOptionsVisible ? styles.visible : "");

    return (
        <div>
            <div onClick={handleClick} ref={toggleRef} {...props}>
                <TextField
                    value={selectedOption}
                    error={false}
                    label={label}
                    variant={"outlined"}
                    readOnly={true}
                />
            </div>

            {createPortal(
                <div className={classes} role={"menu"} ref={optionsRef} style={positionCalculated}>
                    {options.map((option, i) => {
                        return (
                            <div
                                className={styles.option}
                                data-value={option.id}
                                role={"option"}
                                key={i}
                                onClick={handleOptionClick}
                            >
                                {option.option}
                            </div>
                        );
                    })}
                </div>,
                document.body,
            )}
        </div>
    );
};

export default Select;
