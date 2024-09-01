"use client";

import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import cx from "classnames";

import TransitionComponent from "@/components/dom/Layout/TransitionComponent";
import Header from "@/components/dom/Layout/Header";
import DebugHandler from "@/components/dom/Layout/DebugHandler";
import LevaUI from "@/components/dom/Layout/LevaUI";
import Menu from "./Menu";
import { Suspense } from "react";
import GSAP from "@/lib/gsap/components/GSAP";
import { ReactLenis } from "@/lib/lenis";
import ScrollHandler from "./ScrollHandler";
import useMenuState from "@/hooks/useMenuState";

const Noise = dynamic(() => import("@/components/dom/common/Noise"), {
    ssr: false,
});

const Experience = dynamic(() => import("@/components/canvas/Experience"), {
    ssr: false,
});

export default function Layout({ Component, pageProps }: AppProps) {
    const { menuOpen } = useMenuState();
    return (
        <>
            <div className="relative pointer-events-none">
                <Noise blendMode="overlay" opacity={30} />
                <Header />
                <Menu />
                <Suspense fallback={null}>
                    <ReactLenis root>
                        <div
                            className={cx(
                                "relative h-full w-full z-10 transition-all duration-1000 ease-in-out",
                                menuOpen
                                    ? "blur-3xl opacity-0 invisible"
                                    : "blur-0 opacity-100 visible"
                            )}
                        >
                            <TransitionComponent>
                                <Component {...pageProps} />
                            </TransitionComponent>
                        </div>
                        <ScrollHandler />
                    </ReactLenis>
                    <Experience />
                </Suspense>
            </div>
            <LevaUI />
            <GSAP />
            <DebugHandler />
        </>
    );
}
