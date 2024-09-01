import useMenuState from "@/hooks/useMenuState";
import { useLenis } from "@/lib/lenis";
import { useEffect } from "react";

export default function ScrollHandler() {
    const { menuOpen } = useMenuState();
    const lenis = useLenis();

    // stop lenis when menu is open
    useEffect(() => {
        if (menuOpen) {
            lenis?.stop();
        } else {
            lenis?.start();
        }
    }, [menuOpen]);

    return null;
}
