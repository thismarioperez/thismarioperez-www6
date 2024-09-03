import { PerformanceMonitor } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
// import { useEffect } from "react";
import round from "lodash/round";
export default function Performance() {
    const {
        viewport: { dpr },
        setDpr,
    } = useThree();

    // useEffect(() => {
    //     console.log("dpr", dpr);
    // }, [dpr]);
    return (
        <PerformanceMonitor
            onChange={({ factor }) => setDpr(round(0.5 + 1.5 * factor, 1))}
            flipflops={3}
            onFallback={() => setDpr(1)}
        />
    );
}
