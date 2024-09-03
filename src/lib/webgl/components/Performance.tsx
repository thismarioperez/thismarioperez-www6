import { PerformanceMonitor, useDetectGPU } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import round from "lodash/round";
export default function Performance({
    dpr,
    setDpr,
}: {
    dpr: number;
    setDpr: (dpr: number) => void;
}) {
    useEffect(() => {
        console.log("dpr", dpr);
    }, [dpr]);
    return (
        <PerformanceMonitor
            onIncline={() => setDpr(devicePixelRatio)}
            onDecline={() => setDpr(Math.min(devicePixelRatio, 1))}
            flipflops={2}
            onFallback={() => {
                console.log("fallback");
                setDpr(1);
            }}
        />
    );
}
