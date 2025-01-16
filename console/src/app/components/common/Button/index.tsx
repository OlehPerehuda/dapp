import "./index.scss";

type ButtonProps = {
    label: string;
    onClick: () => void;
};

export function Button({ label, onClick }: ButtonProps) {
    return (
        <button className="button" onClick={onClick}>
            <span className="button__label">
                {label}
            </span>
        </button>
    );
};
