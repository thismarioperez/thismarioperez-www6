import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";

import { site, type Site as TSite } from "@site/content";
import * as Themed from "@/components/dom/common/Themed";

const ICON: Record<TSite["footerLinks"][number]["icon"], JSX.Element> = {
    github: <FaGithub />,
    linkedin: <FaLinkedin />,
    email: <FaEnvelope />,
    phone: <FaPhone />,
};

export default function Footer() {
    return (
        <footer id="footer" className="px-5 py-8 relative w-full bg-yellow">
            <nav className="container mx-auto">
                <ul className="flex flex-col justify-center items-center gap-y-1">
                    {site.footerLinks.map((item, idx) => {
                        return (
                            <li key={idx} className="w-fit">
                                <a
                                    href={item.href}
                                    target={item.external ? "_blank" : "_self"}
                                    rel="noreferrer nofollow"
                                >
                                    <Themed.ButtonText className="text-black underline">
                                        <span className="flex flex-row gap-x-2 justify-center items-center">
                                            {ICON[item.icon]}
                                            <span>{item.name}</span>
                                        </span>
                                    </Themed.ButtonText>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </footer>
    );
}
