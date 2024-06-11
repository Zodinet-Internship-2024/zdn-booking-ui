import FooterColumn from "./Column";
import FooterCopyright from "./Copyright";
import FooterLogo from "./Logo";

const columns = [
    ["Solutions", "Marketing", "Analytics", "Commerce", "Insights"],
    ["Support", "Pricing", "Documentation", "Guides", "API Status"],
    ["Company", "About", "Blog", "Jobs", "Press", "Partners"],
    ["Legal", "Claim", "Privacy", "Terms"],
];

function Footer() {
    return (
        <footer
            className={`flex flex-col bg-primary-100 rounded-t-[80px] py-12 px-30 `}
        >
            <div className={`flex flex-row justify-between py-4`}>
                <FooterLogo />
                {/* <FooterColumn /> */}
                <div className={`grid grid-cols-4 gap-4`}>
                    {columns.map((item, index) => (
                        <FooterColumn key={index} item={item} />
                    ))}
                </div>
            </div>
            <FooterCopyright />
        </footer>
    );
}

export default Footer;
