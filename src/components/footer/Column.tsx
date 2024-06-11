interface ColumnProps {
    item: string[];
}

function FooterColumn({ item }: ColumnProps) {
    return (
        <div className={`w-56 flex flex-col gap-4`}>
            {item.map((subItem, index) => (
                <p
                    key={index}
                    className={` body-3 w-full ${
                        index == 0 ? "text-natural-400" : "text-natural-600"
                    }`}
                >
                    {subItem}
                </p>
            ))}
        </div>
    );
}

export default FooterColumn;
