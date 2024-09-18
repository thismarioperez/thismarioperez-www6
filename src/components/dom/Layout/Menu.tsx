import { useEffect, useRef } from "react";
import cx from "classnames";

import { site, type Site as TSite } from "@site/content";
import useMenuState from "@/hooks/useMenuState";
import { gsap, useGSAP } from "@/lib/gsap";
import * as Themed from "@/components/dom/common/Themed";
import Link from "@/components/dom/common/Link";
import useParsedPathname from "@/hooks/useParsedPathname";
import { link } from "fs";

type TItems = TSite["navigation"];

const NavItemRenderer = ({
    className,
    items,
    nested,
}: {
    className?: string;
    nested?: boolean;
    items: TItems;
}) => {
    const pathname = useParsedPathname();
    return (
        <ul
            className={cx(
                "pointer-events-auto flex flex-col items-start gap-y-4",
                nested && "pl-8",
                className
            )}
        >
            {items.map((item, idx) => {
                return (
                    <li
                        key={idx}
                        className={cx(
                            "js-item text-black",
                            nested && "list-item list-disc"
                        )}
                    >
                        {item.type === "link" ? (
                            <Link
                                href={item.href}
                                data-active={
                                    item.href === pathname ? "" : undefined
                                }
                            >
                                <Themed.ButtonText className=" underline">
                                    {item.name}
                                </Themed.ButtonText>
                            </Link>
                        ) : null}
                        {item.type === "folder" ? (
                            <div className="flex flex-col gap-y-2">
                                <div className="flex flex-col gap-y-2 js-item">
                                    <Themed.ButtonText>
                                        {item.name}:
                                    </Themed.ButtonText>
                                    {/* <hr className=" w-full border-black" /> */}
                                </div>
                                <NavItemRenderer
                                    nested={true}
                                    items={item.children}
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
    const { menuOpen, setMenuOpen } = useMenuState();
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
                        duration: 0.25,
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
                        stagger: 0.05,
                    },
                    0
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
            tl.current.timeScale(5).reverse();
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
            <div className="relative size-full p-14 pt-header">
                <div
                    className="absolute top-0 left-0 size-full cursor-crosshair"
                    onClick={(e) => {
                        setMenuOpen(false);
                    }}
                ></div>
                <div className="flex flex-col items-end">
                    <nav className="js-nav w-fit p-8 bg-yellow/80 [text-shadow:_1px_1px_1px_rgb(0_0_0_/_40%)] cursor-auto relative">
                        <NavItemRenderer items={site.navigation} />
                    </nav>
                </div>
            </div>
        </div>
    );
}
