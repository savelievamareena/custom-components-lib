import React, { type FC, useEffect, useState } from "react";
import { type ModalProps } from "./Modal.types";
import "./Modal.scss";
import classNames from "classnames";
import { createPortal } from "react-dom";

const Modal: FC<ModalProps> = ({ open, children, onClose }) => {
    const [isOpened, setIsOpened] = useState(open);
    const styles = classNames("modal_wrapper", isOpened ? "opened" : "");

    function handleOutsideClick() {
        setIsOpened(false);
        onClose();
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (isOpened && event.key === "Escape") {
                setIsOpened(false);
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpened, onClose]);

    useEffect(() => {
        setIsOpened(open);
    }, [open]);

    const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

    return (
        <div>
            {createPortal(
                <div className={styles} onClick={handleOutsideClick}>
                    <div className='modal' onClick={stopPropagation}>
                        {children}
                    </div>
                </div>,
                document.body,
            )}
        </div>
    );
};

export default Modal;
