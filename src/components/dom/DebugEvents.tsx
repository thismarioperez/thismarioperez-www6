import useDebug from "@/hooks/useDebug";
import { useCallback } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export default function DebugEvents() {
    const [debug, setDebug] = useDebug();

    const onHotkey = useCallback(() => {
        console.log("hotkey triggered");
        if (debug) {
            setDebug(false);
        } else {
            setDebug(true);
        }
    }, [debug, setDebug]);

    useHotkeys("alt+shift+d", onHotkey);

    return null;
}
