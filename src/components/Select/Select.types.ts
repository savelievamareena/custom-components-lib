export interface SelectProps {
    label: string;
    options: Options[];
}

interface Options {
    id: number;
    option: string;
}
