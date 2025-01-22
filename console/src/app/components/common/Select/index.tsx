import { useId } from "react";

import "./index.scss";

type SelectProps = {
    value: string;
    items: { id: string; value: string }[];
    label: string;
    onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export function Select({ value, items, label, onSelect }: SelectProps) {
    const id = useId();

    return (
        <label className="label" htmlFor={id}>
            {label}:
            <select className="select" onChange={onSelect} id={id} value={value}>
                {
                    items.map(item =>
                        <option className="option" key={item.value} value={item.value}>
                            {item.value}
                        </option>
                    )
                }
            </select>
        </label>
    )
};
