import { useEffect, useState } from "react";
import { Canvas as R3FCanvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { Suspense } from "react";

import useAppState from "@/hooks/useAppState";
import useDebug from "@/hooks/useDebug";
import { RAF } from "./RAF";
import Performance from "./Performance";

const Loading = () => {
    const { setIsReady } = useAppState();

    useEffect(() => {
        return () => setIsReady(true);
    }, []);

    return null;
};

export default function Canvas({ children }: { children: React.ReactNode }) {
    const [dpr, setDpr] = useState(devicePixelRatio);
    const [debug] = useDebug();

    return (
        <div className="fixed top-0 left-0 w-[100vw] h-[100vh]" aria-hidden>
            <R3FCanvas
                gl={{
                    antialias: true,
                    precision: "highp",
                    powerPreference: "high-performance",
                    alpha: true,
                }}
                dpr={dpr}
                frameloop="never"
                eventSource={document.documentElement}
                eventPrefix="client"
            >
                <RAF />
                <Performance dpr={dpr} setDpr={setDpr} />
                <Suspense fallback={<Loading />}>{children}</Suspense>
                {debug && <Perf position="bottom-left" />}
            </R3FCanvas>
        </div>
    );
}
