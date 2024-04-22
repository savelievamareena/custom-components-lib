import React, { useEffect, useRef, useState, CSSProperties } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import { TextField } from "../TextField";
import ArrowDown from "../../../assets/ArrowDown.svg";
import { type SelectProps } from "./Select.types";
import styles from "./Select.module.scss";

const Select = ({ label, options, ...props }: SelectProps) => {
    const [isOptionsVisible, setIsOptionsVisible] = useState(false);
    const [selectElementRect, setSelectElementRect] = useState<null | DOMRect>(null);
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);

    const toggleRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<HTMLDivElement>(null);

    const [top, setTop] = useState("0px");
    const [left, setLeft] = useState("0px");
    const [bottom, setBottom] = useState("0px");

    useEffect(() => {
        if (toggleRef.current) {
            setSelectElementRect(toggleRef.current.getBoundingClientRect());
        }
    }, [toggleRef.current, isOptionsVisible]);

    useEffect(() => {
        if (selectElementRect) {
            setLeft(`${selectElementRect.left}px`);
        }
    }, [selectElementRect]);

    useEffect(() => {
        if (selectElementRect) {
            const windowHeight = window.innerHeight;

            const spaceBelow = windowHeight - selectElementRect.bottom;
            const spaceAbove = selectElementRect.top;

            if (spaceBelow >= 200) {
                setTop(`${selectElementRect.bottom}px`);
            } else if (spaceAbove >= 200) {
                setBottom(`${windowHeight - selectElementRect.top}px`);
            }
        }
    }, [left]);

    const handleSelectClick = (event: React.MouseEvent) => {
        if (!selectedOption) {
            setSelectedOption(" ");
        }
        event.stopPropagation();
        setIsOptionsVisible((prevState) => !prevState);
    };

    const handleOptionClick = (i: number) => {
        setSelectedOptionIndex(i);
        setIsOptionsVisible(false);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!isOptionsVisible) {
                if (event.key === "Enter") {
                    setIsOptionsVisible(true);
                    return;
                }
            }

            if (event.key === "Escape") {
                setIsOptionsVisible(false);
            }

            if (event.key === "ArrowDown") {
                setSelectedOptionIndex((prev) => {
                    if (prev === null) return 0;
                    else return prev === options.length - 1 ? 0 : prev + 1;
                });
            }

            if (event.key === "ArrowUp") {
                setSelectedOptionIndex((prev) => {
                    if (prev === null) return options.length - 1;
                    else return prev === 0 ? options.length - 1 : prev - 1;
                });
            }

            if (event.key === "Enter") {
                setIsOptionsVisible(false);
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

    const classes = classNames(styles.options_wrapper, styles.visible);

    return (
        <div>
            <div role={"select"} onClick={handleSelectClick} ref={toggleRef} {...props}>
                <TextField
                    text={selectedOption}
                    icon={<ArrowDown />}
                    error={false}
                    label={label}
                    variant={"outlined"}
                    readOnly={true}
                />
            </div>

            {createPortal(
                isOptionsVisible ? (
                    <div
                        className={classes}
                        role={"menu"}
                        ref={optionsRef}
                        style={positionCalculated}
                    >
                        {options.map((option, i) => (
                            <div
                                className={classNames(styles.option, {
                                    [styles.selected]:
                                        selectedOptionIndex !== null && i === selectedOptionIndex,
                                })}
                                role={"option"}
                                key={i}
                                onClick={() => handleOptionClick(i)}
                            >
                                {option.option}
                            </div>
                        ))}
                    </div>
                ) : null,
                document.body,
            )}
        </div>
    );
};

export default Select;
