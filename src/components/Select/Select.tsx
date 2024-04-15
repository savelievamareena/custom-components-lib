import React, { useEffect, useRef, useState, CSSProperties } from "react";
import { type SelectProps } from "./Select.types";
import "./Select.scss";
import TextField from "../TextField";
import { createPortal } from "react-dom";

const Select = ({ label, options }: SelectProps) => {
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
        console.log(event.currentTarget.textContent);
        if (event.currentTarget.textContent) {
            setSelectedOption(event.currentTarget.textContent);
            setIsOptionsVisible(false);
            if (toggleRef.current) {
                toggleRef.current.focus();
            }
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (isOptionsVisible && event.key === "Escape") {
                setIsOptionsVisible(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);

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
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [isOptionsVisible]);

    const positionCalculated: CSSProperties = { left: left, position: "absolute" };
    if (top === "0px") {
        positionCalculated.bottom = bottom;
    } else {
        positionCalculated.top = top;
    }

    return (
        <div>
            <div onClick={handleClick} ref={toggleRef}>
                <TextField
                    value={selectedOption}
                    disabled={false}
                    error={false}
                    label={label}
                    variant={"outlined"}
                    readonly={true}
                />
            </div>

            {createPortal(
                <div
                    className={`options_wrapper ${isOptionsVisible ? "visible" : ""}`}
                    role={"menu"}
                    ref={optionsRef}
                    style={positionCalculated}
                >
                    {options.map((option, i) => {
                        return (
                            <div
                                className={"option"}
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
