import { default as BaseLink, LinkProps as BaseLinkProps } from "next/link";
import useMenuState from "@/hooks/useMenuState";
import { forwardRef, useImperativeHandle, useRef } from "react";

export type TLink = BaseLinkProps & {
    className?: string;
    children?: React.ReactNode;
};

export type TRef = HTMLAnchorElement;

const Link = forwardRef<TRef, TLink>((props, ref) => {
    const internalRef = useRef<TRef>(null);
    const { setMenuOpen } = useMenuState();
    const onClick: BaseLinkProps["onClick"] = (e) => {
        setMenuOpen(false);

        if (props.onClick) {
            props.onClick(e);
        }
    };

    useImperativeHandle(ref, () => internalRef.current!);

    return <BaseLink {...props} onClick={onClick} ref={internalRef}></BaseLink>;
});
Link.displayName = "Link";

export default Link;
