import React, { type FC } from "react";
import { type SelectProps } from "./Select.types";
import "./Select.scss";
import TextField from "../TextField";

const Select: FC<SelectProps> = ({ label, options }) => {
    // const [selectedOption, setSelectedOption] = useState("");
    // const inputRef = useRef<HTMLInputElement>(null);

    // const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

    // const handleOuterDivClick = () => {
    //     inputRef.current?.focus();
    // };

    return (
        <div>
            <TextField disabled={false} error={false} label={label} variant={"outlined"} />

            <div className={"options_wrapper"} role={"menu"}>
                {options.map((option) => {
                    return (
                        <div className={"option"} key={option.id} role={"option"}>
                            {option.option}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Select;
