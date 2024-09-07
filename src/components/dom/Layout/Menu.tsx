import { useEffect, useMemo, useRef } from "react";
import cx from "classnames";

import { getPagesForNav, getProjectsForNav } from "@/lib/mdx";
import useMenuState from "@/hooks/useMenuState";
import { gsap, useGSAP } from "@/lib/gsap";
import * as Themed from "@/components/dom/common/Themed";
import Link from "@/components/dom/common/Link";
import useAppState from "@/hooks/useAppState";

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

const pageLinks: TBaseLink[] = getPagesForNav().map((page) => {
    return {
        name: page.title,
        type: "link",
        href: page.url,
    };
});

const projectLinks: TBaseLink[] = getProjectsForNav().map((project) => {
    return {
        name: project.title,
        type: "link",
        href: project.url,
    };
});

const LINKS: TLink[] = [
    ...pageLinks,
    {
        name: "Projects",
        type: "folder",
        children: [...projectLinks],
    },
];

const LinkRenderer = ({
    className,
    links,
    isNested = false,
}: {
    className?: string;
    links: TLink[];
    isNested?: boolean;
}) => {
    return (
        <ul
            className={cx(
                "pointer-events-auto flex flex-col items-start gap-y-4",
                className
            )}
        >
            {links.map((link, idx) => {
                return (
                    <li key={idx} className="js-item ">
                        {link.type === "link" ? (
                            <Link href={link.href}>
                                <Themed.ButtonText className="text-black underline">
                                    {link.name}
                                </Themed.ButtonText>
                            </Link>
                        ) : null}
                        {link.type === "folder" ? (
                            <div className="flex flex-col gap-y-2">
                                <div className="flex flex-col gap-y-2 js-item">
                                    <Themed.ButtonText className="  text-black">
                                        {link.name}:
                                    </Themed.ButtonText>
                                    {/* <hr className=" w-full border-black" /> */}
                                </div>
                                <LinkRenderer
                                    className="pl-4"
                                    links={link.children}
                                    isNested
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
    const { headerHeight } = useAppState();

    const style = useMemo(() => {
        if (headerHeight <= 0) return undefined;
        return { paddingTop: `${headerHeight}px` };
    }, [headerHeight]);

    useGSAP(
        () => {
            gsap.set(".js-nav", {
                visibility: "hidden",
                transformOrigin: "right top",
            });
            gsap.set(".js-item", {
                opacity: 0,
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
                        scaleY: 0,
                        scaleX: 0,
                    },
                    {
                        scaleY: 1,
                        scaleX: 1,
                        ease: "power1.inOut",
                        duration: 0.5,
                    }
                )
                .fromTo(
                    ".js-item",
                    {
                        opacity: 0,
                        y: -10,
                    },
                    {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        ease: "power1.inOut",
                        stagger: 0.1,
                    },
                    "+=0.1"
                );
        },
        {
            scope: node,
        }
    );

    useEffect(() => {
        if (menuOpen) {
            tl.current.timeScale(1).play();
        } else {
            tl.current.timeScale(6).reverse();
        }
    }, [menuOpen]);

    return (
        <div
            className={cx(
                "fixed size-full top-0 left-0 z-8",
                !menuOpen && "pointer-events-none"
            )}
            ref={node}
            role="menu"
        >
            <div className="relative size-full p-14" style={style}>
                <div className="flex flex-col items-end">
                    <nav className="js-nav w-fit p-8 bg-yellow">
                        <LinkRenderer links={LINKS} />
                    </nav>
                </div>
            </div>
        </div>
    );
}
