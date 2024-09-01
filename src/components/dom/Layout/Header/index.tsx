import { useRect } from "@studio-freight/hamo";

import Logo from "./Logo";
import MenuButton from "./MenuButton";
import { useEffect } from "react";
import useHeaderState from "@/hooks/useHeaderState";

export default function Header() {
    const [header, headerRect] = useRect();
    const { setHeaderHeight } = useHeaderState();

    useEffect(() => {
        if (headerRect) {
            setHeaderHeight(headerRect.height);
        }
    }, [headerRect]);
    return (
        <header
            className="pointer-events-auto w-full sticky top-0 left-0"
            ref={header}
        >
            <div className="relative size-full">
                <div className="absolute  top-0 left-0 size-full"></div>
                <ul className="relative w-full flex flex-row justify-between py-4 px-6 md:px-8">
                    <li>
                        <Logo />
                    </li>
                    <li className="relative">
                        <MenuButton />
                    </li>
                </ul>
            </div>
        </header>
    );
}
