import { ComponentProps } from "react";

export interface SelectProps extends ComponentProps<"div"> {
    label: string;
    options: Options[];
}

interface Options {
    id: number;
    option: string;
}
