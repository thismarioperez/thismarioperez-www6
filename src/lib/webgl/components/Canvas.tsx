import { useEffect, useMemo, useState } from "react";
import { Canvas as R3FCanvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { Suspense } from "react";

import useAppState from "@/hooks/useAppState";
import useDebug from "@/hooks/useDebug";
import { RAF } from "./RAF";
import Performance from "./Performance";
import { PerformanceMonitor } from "@react-three/drei";
import { useWindowSize } from "usehooks-ts";

const Loading = () => {
    const { setIsReady } = useAppState();

    useEffect(() => {
        return () => setIsReady(true);
    }, []);

    return null;
};

export default function Canvas({ children }: { children: React.ReactNode }) {
    const { width, height } = useWindowSize();
    const dpr = useMemo(
        () => Math.min(devicePixelRatio, 1),
        [devicePixelRatio, width, height]
    );
    const [debug] = useDebug();

    useEffect(() => {
        console.log(`Dpr: updated to ${dpr}`);
    }, [dpr]);

    return (
        <div className="fixed top-0 left-0  w-[100dvw] h-[100dvh]" aria-hidden>
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
                <Suspense fallback={<Loading />}>{children}</Suspense>
                {debug && <Perf position="bottom-left" />}
            </R3FCanvas>
        </div>
    );
}
