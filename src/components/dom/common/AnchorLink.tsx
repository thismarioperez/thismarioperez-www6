"use client";

import { useLenis } from "@/lib/lenis";
import React from "react";

export type TAnchorLinkProps = React.HTMLAttributes<HTMLAnchorElement> & {
    children: React.ReactNode;
    href: string;
};
const AnchorLink = ({ children, ...rest }: TAnchorLinkProps) => {
    const lenis = useLenis();

    return (
        <a
            {...rest}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                if ((e.target as HTMLAnchorElement).hash) {
                    lenis?.scrollTo((e.target as HTMLAnchorElement).hash);
                }
                if (rest.onClick) {
                    rest.onClick(e);
                }
            }}
        >
            {children}
        </a>
    );
};

export default AnchorLink;
