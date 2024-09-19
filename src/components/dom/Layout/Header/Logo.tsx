import Link from "@/components/dom/common/Link";

import { ReactComponent as LogoWithText } from "@/svg/logo.svg";
import { ReactComponent as LogoMark } from "@/svg/logo-mark.svg";
import { gsap, useGSAP } from "@/lib/gsap";
import { useRef } from "react";
import useMenuState from "@/hooks/useMenuState";
export default function Logo() {
    const ref = useRef(null);
    const { menuOpen } = useMenuState();

    useGSAP(
        () => {
            if (menuOpen) {
                gsap.timeline({ paused: true })
                    .to(".js-logo-with-text", {
                        xPercent: -100,
                        alpha: 0,
                        ease: "power1.inOut",
                    })
                    .to(
                        ".js-logo-mark",
                        {
                            xPercent: 100,
                            alpha: 1,
                            ease: "power1.inOut",
                        },
                        0
                    )
                    .play();
            } else {
                gsap.timeline({ paused: true })
                    .to(".js-logo-with-text", {
                        xPercent: 0,
                        alpha: 1,
                        ease: "power1.inOut",
                    })
                    .to(
                        ".js-logo-mark",
                        {
                            xPercent: 0,
                            alpha: 0,
                            ease: "power1.inOut",
                        },
                        0
                    )
                    .play();
            }
        },
        {
            dependencies: [menuOpen],
            scope: ref,
        }
    );

    return (
        <Link
            href="/"
            className="relative block h-full"
            aria-label="Home"
            ref={ref}
        >
            <div className="js-logo-with-text flex flex-col items-start justify-center h-full px-4">
                <div className="flex h-fit flex-row items-center relative overflow-hidden">
                    <LogoWithText className="fill-white w-64 md:w-80" />
                </div>
            </div>
            <div className="js-logo-mark absolute top-0 left-0 -translate-x-full">
                <div className="relative h-14 w-14 p-4">
                    <LogoMark className="w-full h-auto fill-white" />
                </div>
            </div>
        </Link>
    );
}
