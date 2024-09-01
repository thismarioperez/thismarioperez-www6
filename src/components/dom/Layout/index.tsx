"use client";

import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import TransitionComponent from "@/components/dom/Layout/TransitionComponent";
import Header from "@/components/dom/Layout/Header";
import DebugHandler from "@/components/dom/Layout/DebugHandler";
import LevaUI from "@/components/dom/Layout/LevaUI";
import Menu from "./Menu";
import { Suspense } from "react";
import GSAP from "@/lib/gsap/components/GSAP";
import { ReactLenis } from "@/lib/lenis";

const Noise = dynamic(() => import("@/components/dom/common/Noise"), {
    ssr: false,
});

const Experience = dynamic(() => import("@/components/canvas/Experience"), {
    ssr: false,
});

export default function Layout({ Component, pageProps }: AppProps) {
    return (
        <>
            <div className="relative pointer-events-none">
                <Noise blendMode="overlay" opacity={30} />
                <Header />
                <Menu />
                <ReactLenis root>
                    <div className="relative h-full w-full z-10">
                        <TransitionComponent>
                            <Component {...pageProps} />
                        </TransitionComponent>
                    </div>
                </ReactLenis>
                <Suspense fallback={null}>
                    <Experience />
                </Suspense>
            </div>
            <LevaUI />
            <GSAP />
            <DebugHandler />
        </>
    );
}
