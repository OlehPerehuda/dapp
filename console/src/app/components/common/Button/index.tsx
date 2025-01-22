import "./index.scss";

type ButtonProps = {
    label: string;
    onClick: () => void;
};

export function Button({ label, onClick }: ButtonProps) {
    return (
        <button onClick={onClick} className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3">
            {label}
        </button>
    );
};
