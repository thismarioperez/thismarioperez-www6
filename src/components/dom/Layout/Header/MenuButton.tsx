import cx from "classnames";

import useMenuState from "@/hooks/useMenuState";

export default function MenuButton() {
    const { menuOpen, toggleMenuOpen } = useMenuState();

    return (
        <button
            className={cx(
                `
                group
                aspect-square
                w-14
                p-5
                relative
                -mr-4
                `
            )}
            aria-label="Open Navigation Menu"
            onClick={toggleMenuOpen}
        >
            <div className="absolute top-0 left-0 size-full bg-black-pure/30 backdrop-blur-3xl"></div>
            <div className="absolute top-0 left-0 size-full">
                <div
                    className={cx(
                        `
                        relative
                        size-full
                        after:absolute
                        after:-bottom-0
                        after:-left-0
                        after:h-4
                        after:w-4
                        after:border-b
                        after:border-l
                        after:transition-all
                        after:duration-300
                        after:ease-in-out
                        group-hover:after:-translate-x-1
                        group-hover:after:translate-y-1`,
                        menuOpen && `after:opacity-0`
                    )}
                ></div>
            </div>
            <div className="absolute top-0 left-0 size-full">
                <div
                    className={cx(
                        `
                        relative
                        size-full
                        before:absolute
                        before:-top-0
                        before:-right-0
                        before:h-2
                        before:w-2
                        before:border-t
                        before:border-r
                        before:opacity-0
                        before:transition-all
                        before:duration-300
                        before:ease-in-out
                        after:absolute
                        after:-bottom-0
                        after:-left-0
                        after:h-2
                        after:w-2
                        after:border-b
                        after:border-l
                        after:transition-all
                        after:duration-300
                        after:ease-in-out`,
                        menuOpen &&
                            `
                        before:opacity-100
                        before:h-[calc(100%)!important]
                        before:w-[calc(100%)!important]
                        after:w-[calc(100%)!important]
                        after:h-[calc(100%)!important]`
                    )}
                ></div>
            </div>
            <div className="relative block w-full h-full overflow-hidden ">
                <span
                    className={cx(
                        "absolute bg-white left-0 top-0 block w-full h-[1px] transition-all",
                        !menuOpen && "delay-200",
                        menuOpen && "opacity-0 -translate-x-full"
                    )}
                ></span>
                <span
                    className={cx(
                        "absolute bg-white left-0 top-1/2 block w-full h-[1px] transition-all",
                        !menuOpen && "delay-200",
                        menuOpen && "rotate-45"
                    )}
                ></span>
                <span
                    className={cx(
                        "absolute bg-white left-0 top-1/2 block w-full h-[1px] transition-all",
                        !menuOpen && "delay-200",
                        menuOpen && "-rotate-45"
                    )}
                ></span>
                <span
                    className={cx(
                        "absolute bg-white left-0 top-[calc(100%-1px)] translate-x-0 translate-y-0 block w-full h-[1px]  transition-all",
                        !menuOpen && "delay-200",
                        menuOpen && "opacity-0 translate-x-full"
                    )}
                ></span>
            </div>
        </button>
    );
}
