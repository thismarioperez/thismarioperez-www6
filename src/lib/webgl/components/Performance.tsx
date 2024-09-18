import { PerformanceMonitor } from "@react-three/drei";
import { useEffect } from "react";
export default function Performance({
    dpr,
    setDpr,
}: {
    dpr: number;
    setDpr: (dpr: number) => void;
}) {
    useEffect(() => {
        console.log(`Dpr: updated to ${dpr}`);
    }, [dpr]);
    return (
        <PerformanceMonitor
            onIncline={() => setDpr(devicePixelRatio)}
            onDecline={() => setDpr(Math.min(devicePixelRatio, 1))}
            flipflops={2}
            onFallback={() => {
                console.log("Dpr: falling back to 1");
                setDpr(1);
            }}
        />
    );
}
