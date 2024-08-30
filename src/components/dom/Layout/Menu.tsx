import cx from "classnames";
import Link from "next/link";

import * as Themed from "@/components/dom/common/Themed";

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
                "pointer-events-auto flex flex-col items-start gap-y-4 text-black",
                className
            )}
        >
            {links.map((link, idx) => {
                return (
                    <li key={idx}>
                        {link.type === "link" ? (
                            <Link href={link.href}>
                                <Themed.ButtonText>
                                    {link.name}
                                </Themed.ButtonText>
                            </Link>
                        ) : null}
                        {link.type === "folder" ? (
                            <div className="flex flex-col gap-y-2">
                                <Themed.ButtonText>
                                    {link.name}
                                </Themed.ButtonText>
                                <hr className="w-full border-black" />
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
    return (
        <div className="fixed size-full top-0 left-0">
            <div className="relative size-full p-16">
                <div className="flex flex-col items-end">
                    <LinkRenderer links={LINKS} />
                </div>
            </div>
        </div>
    );
}
