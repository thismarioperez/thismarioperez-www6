import cx from "classnames";
import Link from "next/link";

import { gsap, useGSAP } from "@/lib/gsap";
import * as Themed from "@/components/dom/common/Themed";
import { useEffect, useRef } from "react";
import { Transition } from "react-transition-group";
import useMenuState from "@/hooks/useMenuState";

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
                "pointer-events-auto flex flex-col items-start gap-y-4 text-white",
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
                                <div className="js-item">
                                    <Themed.ButtonText>
                                        {link.name}
                                    </Themed.ButtonText>
                                    <hr className="w-full border-white" />
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
            });
            gsap.set(".js-item", {
                opacity: 0,
                y: -10,
                // x: 10,
            });
            tl.current = gsap
                .timeline({ paused: true, duration: 1 })
                .to(".js-nav", {
                    visibility: "visible",
                    duration: 0.01,
                })
                .to(".js-item", {
                    opacity: 1,
                    y: 0,
                    // x: 0,
                    ease: "power1.inOut",
                    stagger: 0.1,
                })
                .play();
        },
        {
            scope: node,
        }
    );

    useEffect(() => {
        if (menuOpen) {
            tl.current.play();
        } else {
            tl.current.reverse();
        }
    }, [menuOpen]);

    return (
        <div className="fixed size-full top-0 left-0" ref={node}>
            <div className="relative size-full p-16">
                <div className="flex flex-col items-end">
                    <nav className="js-nav w-fit">
                        <LinkRenderer links={LINKS} />
                    </nav>
                </div>
            </div>
        </div>
    );
}
