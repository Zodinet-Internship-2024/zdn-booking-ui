//
import Image from "next/image";
import Logo from "@public/images/logo.svg";
import Fa from "@public/images/socials/face.svg";
import Ins from "@public/images/socials/insta.svg";
import Tw from "@public/images/socials/tw.svg";
import Drib from "@public/images/socials/drib.svg";
import Git from "@public/images/socials/git.svg";

function FooterLogo() {
    return (
        <div className="footer-logo flex flex-col gap-12">
            <div className={`flex flex-col gap-4`}>
                <Image src={Logo} width={42} height={48} alt="logo" />
                <h4 className={`text-primary-600`}>Dự án Internship 2024</h4>
            </div>
            <div className={`flex flex-row gap-6 mb-12`}>
                <Image src={Fa} width={24} height={24} alt="facebook" />
                <Image src={Ins} width={24} height={24} alt="instagram" />
                <Image src={Tw} width={24} height={24} alt="twitter" />
                <Image src={Git} width={24} height={24} alt="githup" />
                <Image src={Drib} width={24} height={24} alt="dribble" />
            </div>
        </div>
    );
}

export default FooterLogo;
