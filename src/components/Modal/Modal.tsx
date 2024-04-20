import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import { type ModalProps } from "./Modal.types";
import styles from "./Modal.module.scss";

const Modal = ({ open, onClose, ...props }: ModalProps) => {
    const [isOpened, setIsOpened] = useState(open);
    const classes = classNames(styles.modal_wrapper, isOpened ? styles.opened : styles.closed);

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
                <div className={classes} onClick={handleOutsideClick} role={"dialog"} {...props}>
                    <div className={styles.modal} onClick={stopPropagation}>
                        {props.children}
                    </div>
                </div>,
                document.body,
            )}
        </div>
    );
};

export default Modal;
