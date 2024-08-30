import Link from "next/link";

import { ReactComponent as Logo } from "@/svg/logo.svg";
import { ReactComponent as LogoMark } from "@/svg/logo-mark.svg";

export default function Header() {
    return (
        <header className="pointer-events-auto fixed top-0 left-0">
            <Link href="/">
                <div
                    className="w-72
                "
                >
                    <Logo className="fill-white" />
                </div>
                <div className="w-8">
                    <LogoMark className="fill-white" />
                </div>
            </Link>
        </header>
    );
}
