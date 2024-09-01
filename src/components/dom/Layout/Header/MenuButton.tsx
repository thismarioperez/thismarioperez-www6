import cx from "classnames";

import useMenuState from "@/hooks/useMenuState";

export default function MenuButton() {
    const { menuOpen, toggleMenuOpen } = useMenuState();

    return (
        <button
            className="aspect-square w-14 p-2 relative"
            aria-label="Open Navigation Menu"
            onClick={toggleMenuOpen}
        >
            <div className="relative block w-full h-full">
                <span
                    className={cx(
                        "absolute bg-white left-0 top-[10px] block w-full h-[1px] transition-all",
                        !menuOpen && "delay-200",
                        menuOpen && "translate-y-[10px] rotate-45 "
                    )}
                ></span>
                <span
                    className={cx(
                        "absolute bg-white left-0 top-1/2 block w-full h-[1px] transition-all",
                        !menuOpen && "delay-200",
                        menuOpen && "opacity-0"
                    )}
                ></span>
                <span
                    className={cx(
                        "absolute bg-white left-0 bottom-[10px] translate-x-0 translate-y-0 block w-full h-[1px]  transition-all",
                        !menuOpen && "delay-200",
                        menuOpen && "translate-y-[-10px] -rotate-45 "
                    )}
                ></span>
            </div>
        </button>
    );
}
