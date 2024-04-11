import React, { type FC, useEffect, useState } from "react";
import { type ModalProps } from "./Modal.types";
import "./Modal.scss";
import classNames from "classnames";

const Modal: FC<ModalProps> = ({ open, children, onClose }) => {
    const [isOpened, setIsOpened] = useState(open);
    const styles = classNames("modal_wrapper", isOpened ? "opened" : "");

    function handleOutsideClick() {
        setIsOpened(false);
        onClose();
    }

    useEffect(() => {
        setIsOpened(open);
    }, [open]);

    return (
        <div className={styles} onClick={handleOutsideClick}>
            <div className='modal' onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
