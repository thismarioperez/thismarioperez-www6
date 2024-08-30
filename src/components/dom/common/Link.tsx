import { default as BaseLink, LinkProps as BaseLinkProps } from "next/link";
import useMenuState from "@/hooks/useMenuState";

export type TLink = BaseLinkProps & {
    className?: string;
    children?: React.ReactNode;
};

export default function Link(props: TLink) {
    const { setMenuOpen } = useMenuState();
    const onClick: BaseLinkProps["onClick"] = (e) => {
        setMenuOpen(false);

        if (props.onClick) {
            props.onClick(e);
        }
    };

    return <BaseLink {...props} onClick={onClick} />;
}
