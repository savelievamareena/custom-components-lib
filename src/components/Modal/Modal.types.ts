import { ComponentProps } from "react";

export interface ModalProps extends ComponentProps<"div"> {
    open: boolean;
    onClose: () => void;
}
