import Link from "@/components/dom/common/Link";
import cx from "classnames";

import { ReactComponent as Logo } from "@/svg/logo.svg";
import { ReactComponent as LogoMark } from "@/svg/logo-mark.svg";
import useMenuState from "@/hooks/useMenuState";

export default function Header() {
    const { menuOpen, toggleMenuOpen } = useMenuState();

    return (
        <header className="pointer-events-auto w-full sticky top-0 left-0">
            <ul className="relative w-full flex flex-row justify-between">
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
                <li>
                    <button
                        className="aspect-square w-14 p-2 relative"
                        aria-label="Open Navigation Menu"
                        onClick={toggleMenuOpen}
                    >
                        <div className="relative block w-full h-full">
                            <span
                                className={cx(
                                    "absolute left-0 top-[10px] block w-full h-[1px] bg-white transition-all",
                                    menuOpen &&
                                        " translate-y-[10px] rotate-45  bg-black"
                                )}
                            ></span>
                            <span
                                className={cx(
                                    "absolute left-0 top-1/2 block w-full h-[1px] bg-white transition-all",
                                    menuOpen && "opacity-0"
                                )}
                            ></span>
                            <span
                                className={cx(
                                    "absolute left-0 bottom-[10px] translate-x-0 translate-y-0 block w-full h-[1px] bg-white transition-all",
                                    menuOpen &&
                                        "translate-y-[-10px] -rotate-45 bg-black"
                                )}
                            ></span>
                        </div>
                    </button>
                </li>
            </ul>
        </header>
    );
}
