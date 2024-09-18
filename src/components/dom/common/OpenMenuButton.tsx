import useMenuState from "@/hooks/useMenuState";

type TOpenMenuButton = React.HTMLAttributes<HTMLButtonElement>;

const OpenMenuButton = ({ onClick = () => {}, ...rest }: TOpenMenuButton) => {
    const { setMenuOpen } = useMenuState();
    const handleClick: TOpenMenuButton["onClick"] = (e) => {
        setMenuOpen(true);
        onClick(e);
    };
    return (
        <button
            type="button"
            aria-label="Open Navigation Menu"
            onClick={handleClick}
            {...rest}
        />
    );
};

export default OpenMenuButton;
