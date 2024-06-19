import FooterColumn from "./components/Column";
import FooterCopyright from "./components/Copyright";
import FooterLogo from "./components/Logo";

const columns = [
    ["Solutions", "Marketing", "Analytics", "Commerce", "Insights"],
    ["Support", "Pricing", "Documentation", "Guides", "API Status"],
    ["Company", "About", "Blog", "Jobs", "Press", "Partners"],
    ["Legal", "Claim", "Privacy", "Terms"],
];

function Footer() {
    return (
      <footer
        className={`flex flex-col rounded-t-[80px] bg-primary-100 px-8 py-12`}
      >
        <div className={`container mx-auto flex flex-row justify-between py-4`}>
          <FooterLogo />
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
