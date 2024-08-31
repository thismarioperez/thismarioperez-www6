"use client";

import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import TransitionComponent from "@/components/dom/Layout/TransitionComponent";
import Header from "@/components/dom/Layout/Header";
import DebugHandler from "@/components/dom/Layout/DebugHandler";
import LevaUI from "@/components/dom/Layout/LevaUI";
import Menu from "./Menu";
import { useState } from "react";
import useMenuState from "@/hooks/useMenuState";
import { gsap, useGSAP } from "@/lib/gsap";

const Noise = dynamic(() => import("@/components/dom/common/Noise"), {
    ssr: false,
});

const Experience = dynamic(() => import("@/components/canvas/Experience"), {
    ssr: false,
});

const opacity: { value: NumericRange<0, 100> } = {
    value: 20,
};

export default function Layout({ Component, pageProps }: AppProps) {
    const [noiseOpacity, setNoiseOpacity] = useState<NumericRange<0, 100>>(
        opacity.value
    );

    const { menuOpen } = useMenuState();

    useGSAP(() => {
        if (menuOpen) {
            gsap.to(opacity, {
                value: 50,
                duration: 0.5,
                ease: "power1.inOut",
                onUpdate: () => setNoiseOpacity(opacity.value),
            });
        } else {
            gsap.to(opacity, {
                value: 20,
                duration: 0.5,
                ease: "power1.inOut",
                onUpdate: () => setNoiseOpacity(opacity.value),
            });
        }
    }, [menuOpen]);

    return (
        <>
            <Noise blendMode="overlay" opacity={noiseOpacity} />
            <div className="fixed top-0 left-0 size-full">
                <Experience />
            </div>
            <div className="relative  pointer-events-none">
                <Header />
                <TransitionComponent>
                    <Component {...pageProps} />
                </TransitionComponent>
                <Menu />
            </div>
            <LevaUI />
            <DebugHandler />
        </>
    );
}
