import useStore from "@/store";

export default function useMenuState() {
    const { menuOpen, setMenuOpen, toggleMenuOpen } = useStore((state) => ({
        menuOpen: state.menuOpen,
        setMenuOpen: state.setMenuOpen,
        toggleMenuOpen: state.toggleMenuOpen,
    }));

    return { menuOpen, setMenuOpen, toggleMenuOpen };
}
