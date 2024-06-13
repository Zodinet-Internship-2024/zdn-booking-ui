type TextErrorProps = {
    error?: string;
};

const TextError = ({ error }: TextErrorProps) => {
    return (
        <span
            className="inline-block h-5 text-sm text-alerts-red font-semibold w-full overflow-hidden truncate"
            title={error}
        >
            {error}
        </span>
    );
};
export default TextError;
