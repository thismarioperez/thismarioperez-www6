import { useEffect, useRef } from "react";
import cx from "classnames";

import useMenuState from "@/hooks/useMenuState";
import { gsap, useGSAP } from "@/lib/gsap";
import * as Themed from "@/components/dom/common/Themed";
import Link from "@/components/dom/common/Link";

type TBaseLink = {
    name: string;
    type: "link";
    href: string;
};

type TFolder = {
    name: string;
    type: "folder";
    children: TBaseLink[];
};

type TLink = TBaseLink | TFolder;

const LINKS: TLink[] = [
    {
        name: "About",
        href: "/about",
        type: "link",
    },
    {
        name: "Projects",
        type: "folder",
        children: [
            {
                name: "Robin Knows",
                href: "/projects/robin-knows",
                type: "link",
            },
            {
                name: "FBI - Safe Online Surfing",
                href: "/projects/fbi-safe-online-surfing",
                type: "link",
            },
            {
                name: "Triptych.co",
                href: "/projects/triptych",
                type: "link",
            },
            {
                name: "Rodda Construction",
                href: "/projects/rodda-construction",
                type: "link",
            },
        ],
    },
];

const LinkRenderer = ({
    className,
    links,
}: {
    className?: string;
    links: TLink[];
}) => {
    return (
        <ul
            className={cx(
                "pointer-events-auto flex flex-col items-start gap-y-4 text-black",
                className
            )}
        >
            {links.map((link, idx) => {
                return (
                    <li key={idx}>
                        {link.type === "link" ? (
                            <Link className="js-item" href={link.href}>
                                <Themed.ButtonText>
                                    {link.name}
                                </Themed.ButtonText>
                            </Link>
                        ) : null}
                        {link.type === "folder" ? (
                            <div className="flex flex-col gap-y-2">
                                <div className="js-item flex flex-col gap-y-2">
                                    <Themed.ButtonText>
                                        {link.name}
                                    </Themed.ButtonText>
                                    <hr className="w-full border-black" />
                                </div>
                                <LinkRenderer
                                    className="pl-4"
                                    links={link.children}
                                />
                            </div>
                        ) : null}
                    </li>
                );
            })}
        </ul>
    );
};

export default function Menu() {
    const { menuOpen } = useMenuState();
    const node = useRef(null);
    const tl = useRef<gsap.core.Timeline>(gsap.timeline({ paused: true }));

    useGSAP(
        () => {
            gsap.set(".js-nav", {
                visibility: "hidden",
                transformOrigin: "right top",
            });
            gsap.set(".js-item", {
                opacity: 0,
                y: -10,
                x: 10,
            });
            tl.current = gsap
                .timeline({ paused: true })
                .to(".js-nav", {
                    visibility: "visible",
                    duration: 0.0001,
                })
                .fromTo(
                    ".js-nav",
                    {
                        scale: 0,
                    },
                    {
                        scale: 1,
                        ease: "power1.inOut",
                        duration: 0.5,
                    }
                )
                .to(".js-item", {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    ease: "power1.inOut",
                    stagger: 0.1,
                });
        },
        {
            scope: node,
        }
    );

    useEffect(() => {
        if (menuOpen) {
            tl.current.timeScale(1).delay(0.1).play();
        } else {
            tl.current.timeScale(6).delay(0).reverse();
        }
    }, [menuOpen]);

    return (
        <div className="fixed size-full top-0 left-0" ref={node}>
            <div className="relative size-full p-16">
                <div className="flex flex-col items-end">
                    <nav className="js-nav w-fit p-8 bg-black/10">
                        <LinkRenderer links={LINKS} />
                    </nav>
                </div>
            </div>
        </div>
    );
}
