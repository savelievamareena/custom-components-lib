import React, { useEffect, useRef, useState, CSSProperties } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import { TextField } from "../TextField";
import { type SelectProps } from "./Select.types";
import styles from "./Select.module.scss";

const Select = ({ label, options, ...props }: SelectProps) => {
    const [isOptionsVisible, setIsOptionsVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);

    const toggleRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<HTMLDivElement>(null);

    const [top, setTop] = useState("0px");
    const [left, setLeft] = useState("0px");
    const [bottom, setBottom] = useState("0px");

    const handleSelectClick = (event: React.MouseEvent) => {
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

    const handleOptionClick = (i: number) => {
        setSelectedOptionIndex(i);
        setIsOptionsVisible(false);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (isOptionsVisible) {
                if (event.key === "Escape") {
                    setIsOptionsVisible(false);
                } else {
                    if (event.key === "ArrowDown") {
                        setSelectedOptionIndex((prev) =>
                            prev === null ? 0 : prev === options.length - 1 ? 0 : prev + 1,
                        );
                    } else if (event.key === "ArrowUp") {
                        setSelectedOptionIndex((prev) =>
                            prev === null
                                ? options.length - 1
                                : prev === 0
                                  ? options.length - 1
                                  : prev - 1,
                        );
                    }

                    if (event.key === "Enter") {
                        setIsOptionsVisible(false);
                    }
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

        if (toggleRef.current) {
            toggleRef.current.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            if (toggleRef.current) {
                toggleRef.current.removeEventListener("keydown", handleKeyDown);
            }
        };
    }, [isOptionsVisible]);

    useEffect(() => {
        if (selectedOptionIndex !== null) {
            setSelectedOption(options[selectedOptionIndex].option);
        }
    }, [selectedOptionIndex]);

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
            <div onClick={handleSelectClick} ref={toggleRef} {...props}>
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
                                className={classNames(styles.option, {
                                    [styles.selected]:
                                        selectedOptionIndex !== null && i === selectedOptionIndex,
                                })}
                                role={"option"}
                                key={i}
                                onClick={() => {
                                    handleOptionClick(i);
                                }}
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
