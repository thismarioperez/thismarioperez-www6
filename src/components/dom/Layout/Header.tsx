import Link from "next/link";

import { ReactComponent as Logo } from "@/svg/logo.svg";
import { ReactComponent as LogoMark } from "@/svg/logo-mark.svg";

export default function Header() {
    return (
        <header className="pointer-events-auto w-full sticky top-0 left-0">
            <ul className="relative w-full flex-flex-row justify-between">
                <li>
                    <Link href="/">
                        <div className="w-72">
                            <Logo className="fill-white" />
                        </div>
                        <div className="w-8">
                            <LogoMark className="fill-white" />
                        </div>
                    </Link>
                </li>
            </ul>
        </header>
    );
}
