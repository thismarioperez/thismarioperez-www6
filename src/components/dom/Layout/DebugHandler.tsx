import useDebug from "@/hooks/useDebug";
import { useCallback, useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export default function DebugHandler() {
    const [debug, setDebug] = useDebug();

    const onHotkey = useCallback(() => {
        if (debug) {
            setDebug(false);
        } else {
            setDebug(true);
        }
    }, [debug, setDebug]);

    useHotkeys("alt+shift+d", onHotkey);

    useEffect(() => {
        console.log(`Debug mode: ${debug ? "on" : "off"}`);
    }, [debug]);

    return null;
}
