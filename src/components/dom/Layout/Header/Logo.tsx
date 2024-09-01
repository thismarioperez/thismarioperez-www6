import Link from "@/components/dom/common/Link";

import { ReactComponent as LogoWithText } from "@/svg/logo.svg";
import { ReactComponent as LogoMark } from "@/svg/logo-mark.svg";
import { gsap, useGSAP } from "@/lib/gsap";
import { useRef } from "react";
import useMenuState from "@/hooks/useMenuState";
export default function Logo() {
    const ref = useRef<HTMLDivElement>(null);
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
            aria-label="Home"
            className="flex flex-col items-start justify-center h-full -ml-4"
        >
            <div
                className="flex h-fit flex-row items-center relative overflow-hidden"
                ref={ref}
            >
                <LogoWithText className="fill-white js-logo-with-text w-64 md:w-80 bg-black-pure/30 backdrop-blur-3xl p-4 border border-white" />
                <LogoMark className="js-logo-mark h-full w-auto absolute -translate-x-full opacity-0 fill-white bg-black-pure/30 backdrop-blur-3xl p-4 border border-white " />
            </div>
        </Link>
    );
}
